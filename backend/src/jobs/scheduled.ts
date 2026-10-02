/**
 * Scheduled (cron) jobs. Wired from `scheduled()` in src/index.ts and the
 * `triggers.crons` block in wrangler.jsonc:
 *
 *   every 15 min  → reconcile-payments   (Paystack verify for stuck "pending" sessions)
 *                 → assignment-reminders (24h + 1h before due_at; app + email + opted-in SMS)
 *   hourly        → enrollment-reminders (unpaid registrations after 24h; balance nudges weekly)
 *   daily 02:00   → cleanup              (expired tokens/sessions, old ledgers)
 *
 * Every job is idempotent and bounded (LIMITs) so a retried or overlapping
 * invocation can't double-send or run away. Runs are recorded in `job_runs`.
 */
import type { AppEnv } from "../types";
import { isoNow } from "../lib/crypto";
import { sendEmail, appUrl } from "../lib/email";
import { emailLayout, escapeHtml } from "../lib/email-templates";
import { verifyPaystackTransaction } from "../lib/paystack";
import { reportError } from "../lib/monitoring";
import { markPayment, feeDueFor } from "../routes/enrollments";
import { parseDueText } from "../lib/due-dates";
import { sendSms, sendUserSms } from "../lib/sms";

export type JobName =
  | "reconcile-payments"
  | "enrollment-reminders"
  | "assignment-reminders"
  | "compliance-reminders"
  | "cleanup";

export const CRON_SCHEDULE: Record<string, JobName[]> = {
  "*/15 * * * *": ["reconcile-payments", "assignment-reminders"],
  "0 * * * *": ["enrollment-reminders"],
  "0 2 * * *": ["compliance-reminders", "cleanup"],
};

function isoMinutesAgo(minutes: number): string {
  return new Date(Date.now() - minutes * 60_000).toISOString();
}

const naira = (n: number) => `₦${Math.round(n).toLocaleString("en-NG")}`;

/* ---------------- reconcile-payments ---------------- */

export async function reconcilePayments(env: AppEnv): Promise<string> {
  if (!env.PAYSTACK_SECRET_KEY) return "skipped: PAYSTACK_SECRET_KEY not configured";
  const ctx = { env };
  let checked = 0;
  let settled = 0;

  const regPending = await env.DB.prepare(
    `SELECT reference FROM registration_payments
      WHERE status = 'pending' AND created_at < ? AND created_at > ?
      ORDER BY created_at ASC LIMIT 25`,
  )
    .bind(isoMinutesAgo(15), isoMinutesAgo(60 * 24 * 3))
    .all<{ reference: string }>();
  for (const { reference } of regPending.results ?? []) {
    checked += 1;
    const remote = await verifyPaystackTransaction(env, reference);
    if (remote?.status === "success") {
      await markPayment(ctx, reference, "success", remote.amount);
      settled += 1;
    } else if (remote?.status === "failed" || remote?.status === "abandoned") {
      await markPayment(ctx, reference, "failed");
      settled += 1;
    }
  }

  // Generic checkout payments (routes/payments.ts). They carry no created_at,
  // so bound by row count; the webhook remains the primary path.
  const payPending = await env.DB.prepare(
    `SELECT reference, amount FROM payments WHERE status = 'pending' AND provider = 'paystack'
      ORDER BY rowid DESC LIMIT 25`,
  ).all<{ reference: string; amount: number }>();
  for (const row of payPending.results ?? []) {
    checked += 1;
    const remote = await verifyPaystackTransaction(env, row.reference);
    if (!remote) continue;
    if (remote.status === "success") {
      const status = row.amount > 0 && remote.amount < row.amount * 100 ? "review" : "success";
      await env.DB.prepare(`UPDATE payments SET status = ?, paid_at = ? WHERE reference = ?`)
        .bind(status, isoNow(), row.reference)
        .run();
      settled += 1;
    } else if (remote.status === "failed" || remote.status === "abandoned") {
      await env.DB.prepare(`UPDATE payments SET status = 'failed' WHERE reference = ?`)
        .bind(row.reference)
        .run();
      settled += 1;
    }
  }
  return `checked ${checked}, settled ${settled}`;
}

/* ---------------- enrollment-reminders ---------------- */

interface ReminderRow {
  ref: string;
  first_name: string;
  email: string;
  program_title: string;
  program_kind: "short" | "long";
  fee_total: number;
  payment_plan: string;
  paid_amount: number;
  phone?: string;
}

async function logRegistrationEvent(env: AppEnv, ref: string, event: string, detail: string) {
  await env.DB.prepare(
    `INSERT INTO registration_events (id, registration_ref, event, detail, at) VALUES (?, ?, ?, ?, ?)`,
  )
    .bind(crypto.randomUUID(), ref, event, detail, isoNow())
    .run();
}

export async function enrollmentReminders(env: AppEnv): Promise<string> {
  const ctx = { env };
  let unpaid = 0;
  let balance = 0;

  // 1) Registered 24h+ ago, still unpaid, never reminded → one reminder.
  const unpaidRows = await env.DB.prepare(
    `SELECT r.ref, r.first_name, r.email, r.phone, r.program_title, r.program_kind, r.fee_total,
            r.payment_plan, r.paid_amount
       FROM registrations r
      WHERE r.payment_status IN ('unpaid', 'failed') AND r.stage != 'declined'
        AND r.payment_method = 'paystack'
        AND r.created_at < ? AND r.created_at > ?
        AND NOT EXISTS (SELECT 1 FROM registration_events e
                         WHERE e.registration_ref = r.ref AND e.event = 'reminder_unpaid')
      LIMIT 50`,
  )
    .bind(isoMinutesAgo(60 * 24), isoMinutesAgo(60 * 24 * 14))
    .all<ReminderRow>();
  for (const r of unpaidRows.results ?? []) {
    // Log first so a crash mid-send can never cause a duplicate reminder.
    await logRegistrationEvent(env, r.ref, "reminder_unpaid", "Automated payment reminder");
    await sendEmail(ctx, {
      to: r.email,
      subject: `Complete your enrollment — ${r.program_title}`,
      html: emailLayout({
        heading: "Your seat is waiting",
        bodyHtml: `<p>Hi ${escapeHtml(r.first_name)},</p>
<p>You registered for <strong>${escapeHtml(r.program_title)}</strong> (ref ${escapeHtml(r.ref)}) but we haven't received your payment yet. Seats are confirmed in payment order.</p>`,
        cta: { label: "Complete payment", url: appUrl(ctx, `/apply/status/${r.ref}`) },
        footnote: "Need help or a different payment plan? Reply to this email or WhatsApp us.",
      }),
    }).catch(() => undefined);
    // Applicants gave a phone number on the form and have no account yet, so
    // this transactional SMS goes straight to that number.
    if (r.phone) {
      await sendSms(env, {
        to: r.phone,
        body: `CEA: Hi ${r.first_name.slice(0, 20)}, your seat for ${r.program_title.slice(0, 40)} (ref ${r.ref}) is reserved pending payment. Pay: ${appUrl(ctx, `/apply/status/${r.ref}`)}`,
      }).catch(() => undefined);
    }
    unpaid += 1;
  }

  // 2) Deposit paid, balance outstanding → at most one nudge every 7 days.
  const depositRows = await env.DB.prepare(
    `SELECT r.ref, r.first_name, r.email, r.program_title, r.program_kind, r.fee_total,
            r.payment_plan, r.paid_amount
       FROM registrations r
      WHERE r.payment_status = 'deposit_paid' AND r.stage != 'declined'
        AND NOT EXISTS (SELECT 1 FROM registration_events e
                         WHERE e.registration_ref = r.ref AND e.event = 'reminder_balance'
                           AND e.at > ?)
        AND r.paid_at < ?
      LIMIT 50`,
  )
    .bind(isoMinutesAgo(60 * 24 * 7), isoMinutesAgo(60 * 24 * 7))
    .all<ReminderRow>();
  for (const r of depositRows.results ?? []) {
    const remaining = Math.max(
      0,
      feeDueFor(r.program_kind, r.fee_total, r.payment_plan) - r.paid_amount,
    );
    if (remaining <= 0) continue;
    await logRegistrationEvent(env, r.ref, "reminder_balance", `Balance ${remaining} NGN`);
    await sendEmail(ctx, {
      to: r.email,
      subject: `Balance reminder — ${r.program_title}`,
      html: emailLayout({
        heading: "Balance reminder",
        bodyHtml: `<p>Hi ${escapeHtml(r.first_name)},</p>
<p>Thanks for your deposit on <strong>${escapeHtml(r.program_title)}</strong>. Your outstanding balance is <strong>${naira(remaining)}</strong>.</p>`,
        cta: { label: "Pay balance", url: appUrl(ctx, `/apply/status/${r.ref}`) },
      }),
    }).catch(() => undefined);
    balance += 1;
  }
  return `unpaid reminders ${unpaid}, balance reminders ${balance}`;
}

/* ---------------- assignment-reminders ---------------- */

export async function assignmentReminders(env: AppEnv, ref: Date = new Date()): Promise<string> {
  const ctx = { env };
  const nowIso = ref.toISOString();

  // 1) Backfill machine-readable deadlines from unambiguous legacy text.
  //    Relative text ("Today 23:59") is never guessed; unparseable rows get
  //    due_at = '' so they're not rescanned every tick.
  const legacy = await env.DB.prepare(
    `SELECT id, due FROM assignments WHERE due_at IS NULL LIMIT 200`,
  ).all<{ id: string; due: string }>();
  let backfilled = 0;
  const updates = (legacy.results ?? []).map((r) => {
    const parsed = parseDueText(r.due, ref, { allowRelative: false });
    if (parsed) backfilled += 1;
    return env.DB.prepare(`UPDATE assignments SET due_at = ? WHERE id = ?`).bind(
      parsed ?? "",
      r.id,
    );
  });
  if (updates.length) await env.DB.batch(updates);

  // 2) Send each reminder window at most once per assignment row.
  let sent = 0;
  const windows: { kind: "24h" | "1h"; from: number; to: number }[] = [
    { kind: "24h", from: 60, to: 24 * 60 },
    { kind: "1h", from: 0, to: 60 },
  ];
  for (const w of windows) {
    const from = new Date(ref.getTime() + w.from * 60_000).toISOString();
    const to = new Date(ref.getTime() + w.to * 60_000).toISOString();
    const due = await env.DB.prepare(
      `SELECT a.id, a.user_id, a.title, a.course, a.due, a.due_at, u.email, u.name,
              COALESCE(p.email_enabled, 1) AS email_enabled, COALESCE(p.app_enabled, 1) AS app_enabled
         FROM assignments a
         JOIN users u ON u.id = a.user_id AND u.status = 'active'
         LEFT JOIN notification_preferences p ON p.user_id = a.user_id
        WHERE a.due_at != '' AND a.due_at > ? AND a.due_at <= ?
          AND a.status IN ('pending', 'draft')
          AND NOT EXISTS (SELECT 1 FROM assignment_reminders r WHERE r.assignment_id = a.id AND r.kind = ?)
        LIMIT 100`,
    )
      .bind(from, to, w.kind)
      .all<{
        id: string;
        user_id: string;
        title: string;
        course: string;
        due: string;
        due_at: string;
        email: string;
        name: string;
        email_enabled: number;
        app_enabled: number;
      }>();
    for (const a of due.results ?? []) {
      const claimed = await env.DB.prepare(
        `INSERT OR IGNORE INTO assignment_reminders (assignment_id, kind, sent_at) VALUES (?, ?, ?)`,
      )
        .bind(a.id, w.kind, nowIso)
        .run();
      if (claimed.meta.changes !== 1) continue; // another run got it
      const when = w.kind === "1h" ? "in under an hour" : "within 24 hours";
      if (a.app_enabled === 1) {
        await env.DB.prepare(
          `INSERT INTO notifications (id, user_id, title, body, time, engine) VALUES (?, ?, ?, ?, ?, 'learning')`,
        )
          .bind(
            `ntf-${crypto.randomUUID().slice(0, 12)}`,
            a.user_id,
            `Due ${when}: ${a.title}`,
            `${a.course} · ${a.due} WAT`,
            nowIso,
          )
          .run();
      }
      if (a.email_enabled === 1) {
        await sendEmail(ctx, {
          to: a.email,
          subject: `Reminder: "${a.title}" is due ${when}`,
          html: emailLayout({
            heading: `Assignment due ${when}`,
            bodyHtml: `<p>Hi ${escapeHtml(a.name)},</p>
<p><strong>${escapeHtml(a.title)}</strong> (${escapeHtml(a.course)}) is due <strong>${escapeHtml(a.due)} WAT</strong>. Late submissions are flagged to your instructor.</p>`,
            cta: { label: "Open assignment", url: appUrl(ctx, `/app/assignments/${a.id}`) },
          }),
        }).catch(() => undefined);
      }
      await sendUserSms(
        env,
        a.user_id,
        `CEA reminder: "${a.title.slice(0, 60)}" is due ${a.due} WAT.`,
        { urgent: w.kind === "1h", now: ref },
      ).catch(() => undefined);
      sent += 1;
    }
  }
  return `backfilled ${backfilled}/${legacy.results?.length ?? 0}, reminders ${sent}`;
}

/* ---------------- compliance-reminders ---------------- */

/**
 * Regulatory deadlines (CAC annual returns, tax, licences). Sends the
 * 30/14/7/3/1/0-day warnings to the office inbox, once per bucket per deadline.
 *
 * Deliberately data-driven: the date comes from the row a human entered after
 * reading the portal, never from a hardcoded assumption about when a return is
 * "probably" due.
 */
export async function complianceReminders(env: AppEnv, today: Date = new Date()): Promise<string> {
  const { REMINDER_BUCKETS, daysUntil } = await import("../routes/compliance");
  const rows = await env.DB.prepare(
    `SELECT id, title, authority, due_on, notes FROM compliance_deadlines WHERE status = 'open' ORDER BY due_on ASC LIMIT 50`,
  ).all<{ id: string; title: string; authority: string; due_on: string; notes: string | null }>();

  let sent = 0;
  let overdue = 0;
  for (const row of rows.results) {
    const days = daysUntil(row.due_on, today);
    if (days < 0) overdue += 1;
    // Only the buckets that apply (and, when overdue, only the 0-day notice).
    const bucket =
      days < 0 ? 0 : (REMINDER_BUCKETS as readonly number[]).includes(days) ? days : null;
    if (bucket === null) continue;
    const already = await env.DB.prepare(
      `SELECT 1 AS x FROM compliance_reminder_log WHERE deadline_id = ? AND bucket = ?`,
    )
      .bind(row.id, bucket)
      .first<{ x: number }>();
    if (already) continue;

    const label =
      days > 0
        ? `${days} day${days === 1 ? "" : "s"} left`
        : days === 0
          ? "due today"
          : `overdue by ${Math.abs(days)} day${Math.abs(days) === 1 ? "" : "s"}`;
    const to = env.CONTACT_INBOX || env.EMAIL_REPLY_TO || "help@cea.ng";
    const ctx = { env } as unknown as { env: AppEnv };
    try {
      await sendEmail(ctx, {
        to,
        subject: `[Compliance] ${row.title} — ${label}`,
        html: emailLayout({
          heading: `${label}: ${row.title}`,
          bodyHtml: `<p><strong>${row.authority}</strong> · due ${row.due_on} (${label}).</p>
            ${row.notes ? `<p>${escapeHtml(row.notes)}</p>` : ""}
            <p>Open CEA-OS → Compliance to mark it filed and attach the acknowledgement.</p>`,
          cta: { label: "Open compliance", url: `${appUrl(ctx, "/app/government/calendar")}` },
        }),
      });
      sent += 1;
    } catch {
      // Best effort: if email fails, don't record the bucket so tomorrow retries.
      continue;
    }
    await env.DB.prepare(
      `INSERT OR REPLACE INTO compliance_reminder_log (deadline_id, bucket, sent_at) VALUES (?, ?, ?)`,
    )
      .bind(row.id, bucket, isoNow())
      .run();
  }
  return `${rows.results.length} open deadlines, ${sent} reminders sent, ${overdue} overdue`;
}

/* ---------------- cleanup ---------------- */

export async function cleanup(env: AppEnv): Promise<string> {
  const now = isoNow();
  const week = isoMinutesAgo(60 * 24 * 7);
  const month = isoMinutesAgo(60 * 24 * 30);
  const quarter = isoMinutesAgo(60 * 24 * 90);
  const results = await env.DB.batch([
    env.DB.prepare(`DELETE FROM magic_links WHERE expires_at < ?`).bind(week),
    env.DB.prepare(
      `DELETE FROM sessions WHERE expires_at < ? OR (revoked_at IS NOT NULL AND revoked_at < ?)`,
    ).bind(month, month),
    env.DB.prepare(`DELETE FROM webhook_events WHERE received_at < ?`).bind(quarter),
    env.DB.prepare(`DELETE FROM job_runs WHERE started_at < ?`).bind(quarter),
  ]);
  const [links, sessions, hooks, runs] = results.map((r) => r.meta.changes ?? 0);
  return `at ${now}: magic_links ${links}, sessions ${sessions}, webhook_events ${hooks}, job_runs ${runs}`;
}

/* ---------------- runner ---------------- */

const JOBS: Record<JobName, (env: AppEnv) => Promise<string>> = {
  "reconcile-payments": reconcilePayments,
  "enrollment-reminders": enrollmentReminders,
  "assignment-reminders": (env) => assignmentReminders(env),
  "compliance-reminders": (env) => complianceReminders(env),
  cleanup,
};

export async function runJob(
  env: AppEnv,
  job: JobName,
): Promise<{ status: "ok" | "error"; detail: string }> {
  const startedAt = isoNow();
  let status: "ok" | "error" = "ok";
  let detail: string;
  try {
    detail = await JOBS[job](env);
  } catch (err) {
    status = "error";
    detail = err instanceof Error ? err.message : String(err);
    console.error(`[cron] ${job} failed`, err);
    await reportError(env, err, { tags: { job } });
  }
  await env.DB.prepare(
    `INSERT INTO job_runs (id, job, status, detail, started_at, finished_at) VALUES (?, ?, ?, ?, ?, ?)`,
  )
    .bind(crypto.randomUUID(), job, status, detail.slice(0, 1000), startedAt, isoNow())
    .run()
    .catch(() => undefined);
  return { status, detail };
}

export function isJobName(value: string): value is JobName {
  return value in JOBS;
}

export async function handleScheduled(controller: ScheduledController, env: AppEnv): Promise<void> {
  const jobs = CRON_SCHEDULE[controller.cron] ?? [];
  for (const job of jobs) await runJob(env, job);
}
