/**
 * Scheduled (cron) jobs. Wired from `scheduled()` in src/index.ts and the
 * `triggers.crons` block in wrangler.jsonc:
 *
 *   every 15 min  → reconcile-payments   (Paystack verify for stuck "pending" sessions)
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

export type JobName = "reconcile-payments" | "enrollment-reminders" | "cleanup";

export const CRON_SCHEDULE: Record<string, JobName[]> = {
  "*/15 * * * *": ["reconcile-payments"],
  "0 * * * *": ["enrollment-reminders"],
  "0 2 * * *": ["cleanup"],
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
    `SELECT r.ref, r.first_name, r.email, r.program_title, r.program_kind, r.fee_total,
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
