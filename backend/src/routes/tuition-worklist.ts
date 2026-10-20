import { Hono } from "hono";
import { z } from "zod";
import type { AppEnv } from "../types";
import { requireAuth, requireAnyRole, requireAdmin } from "../lib/auth";
import { ApiError } from "../lib/errors";
import { parseBody } from "../lib/validate";
import { isoNow } from "../lib/crypto";
import { escapeHtml } from "../lib/email-templates";
import {
  TUITION_POLICY,
  PLACEMENT_STAFF,
  requireApplicantAccess,
  activateTuition,
  notificationStatement,
  tuitionDue,
  type TuitionRow,
} from "../lib/tuition";

export const tuitionWorklist = new Hono<{ Bindings: AppEnv }>();
const offerSchema = z.object({
  cohortId: z.string().min(1).max(80),
  balanceDueAt: z.string().datetime({ offset: true }),
  equipment: z.string().trim().min(12).max(1000),
  eligibilityConfirmed: z.literal(true),
});

/** One accountable owner queue; no fictional seat counts, no separate CRM. */
tuitionWorklist.get("/admin/worklist", requireAuth, requireAdmin, async (c) => {
  const now = isoNow();
  const page = z.coerce
    .number()
    .int()
    .min(1)
    .max(10000)
    .parse(c.req.query("page") ?? "1");
  const rows = await c.env.DB.prepare(
    `SELECT r.*, c.label AS cohort_label, c.status AS cohort_status,
    (SELECT COUNT(*) FROM payment_proofs WHERE registration_ref = r.ref AND status = 'pending_review') AS pending_proofs,
    (SELECT COUNT(*) FROM registration_payments WHERE registration_ref = r.ref AND (exception != '' OR status = 'pending')) AS payment_exceptions,
    (SELECT COUNT(*) FROM tuition_notifications WHERE registration_ref = r.ref AND sent_at IS NULL AND attempts > 0) AS failed_messages
    FROM registrations r LEFT JOIN cohorts c ON c.id = r.cohort_id
    WHERE (r.stage != 'declined' OR r.paid_amount > 0) AND (
      (r.paid_amount > 0 AND (r.activated_at IS NULL OR c.status = 'cancelled' OR r.stage = 'declined'))
      OR r.offer_status = 'awaiting' OR (r.offer_status = 'held' AND r.offer_expires_at <= strftime('%Y-%m-%dT%H:%M:%fZ','now'))
      OR r.paid_amount > CASE WHEN r.program_kind='long' AND r.payment_plan='full-10-off' THEN round(r.fee_total*0.9) ELSE r.fee_total END
      OR (r.payment_status = 'deposit_paid' AND r.balance_due_at <= strftime('%Y-%m-%dT%H:%M:%fZ','now','+3 days'))
      OR EXISTS (SELECT 1 FROM payment_proofs WHERE registration_ref=r.ref AND status='pending_review')
      OR EXISTS (SELECT 1 FROM registration_payments WHERE registration_ref=r.ref AND (exception!='' OR status='pending'))
      OR EXISTS (SELECT 1 FROM tuition_notifications WHERE registration_ref=r.ref AND sent_at IS NULL AND attempts>0))
    ORDER BY CASE WHEN r.paid_amount > 0 AND r.activated_at IS NULL THEN 0 ELSE 1 END, r.created_at ASC, r.ref ASC LIMIT 101 OFFSET ?`,
  )
    .bind((page - 1) * 100)
    .all<
      TuitionRow & {
        phone: string;
        created_at: string;
        cohort_label: string | null;
        cohort_status: string | null;
        pending_proofs: number;
        payment_exceptions: number;
        failed_messages: number;
      }
    >();
  const items = rows.results
    .slice(0, 100)
    .map((r) => {
      const reasons: string[] = [];
      if (r.pending_proofs) reasons.push("Verify transfer against bank statement");
      if (r.payment_exceptions) reasons.push("Review pending or mismatched payment");
      if (
        r.paid_amount > 0 &&
        (!r.activated_at || r.cohort_status === "cancelled" || r.stage === "declined")
      )
        reasons.push("Paid learner needs placement / access review");
      if (r.paid_amount > tuitionDue(r))
        reasons.push("Excess payment — arrange reconciliation / refund");
      if (r.offer_status === "awaiting")
        reasons.push("Confirm a deliverable place or retain interest only");
      if (r.offer_status === "held" && r.offer_expires_at && r.offer_expires_at <= now)
        reasons.push("Expired offer — check payment before releasing the place");
      if (
        r.paid_amount > 0 &&
        r.paid_amount < tuitionDue(r) &&
        r.balance_due_at &&
        r.balance_due_at <= new Date(Date.now() + 3 * 86400000).toISOString()
      )
        reasons.push("Balance due — send a reminder or agree an extension");
      if (r.failed_messages) reasons.push("Notification delivery needs attention");
      return {
        ref: r.ref,
        name: `${r.first_name} ${r.last_name}`,
        email: r.email,
        phone: r.phone,
        programSlug: r.program_slug,
        programTitle: r.program_title,
        offerStatus: r.offer_status,
        cohortLabel: r.cohort_label,
        paid: r.paid_amount,
        balance: Math.max(0, tuitionDue(r) - r.paid_amount),
        balanceDueAt: r.balance_due_at,
        createdAt: r.created_at,
        reasons,
        active: Boolean(r.activated_at),
      };
    })
    .filter((r) => r.reasons.length);
  const assignments = await c.env.DB.prepare(
    "SELECT COUNT(*) AS n FROM submissions WHERE status IN ('submitted', 'pending')",
  ).first<{ n: number }>();
  return c.json({
    items,
    limit: 100,
    page,
    nextPage: rows.results.length > 100 ? page + 1 : null,
    ungradedAssignments: assignments?.n ?? 0,
    asOf: now,
  });
});

tuitionWorklist.get("/mine", requireAuth, async (c) => {
  const user = c.get("authUser");
  const verified = await c.env.DB.prepare("SELECT email_verified_at FROM users WHERE id = ?")
    .bind(user.id)
    .first<{ email_verified_at: string | null }>();
  if (!verified?.email_verified_at)
    throw new ApiError(
      403,
      "EMAIL_VERIFICATION_REQUIRED",
      "Verify your email to view applications.",
    );
  await activateTuition(c.env);
  const rows = await c.env.DB.prepare(
    `SELECT ref, program_title AS programTitle, offer_status AS offerStatus, paid_amount AS paidAmount, activated_at AS activatedAt
    FROM registrations WHERE lower(email) = lower(?) ORDER BY created_at DESC LIMIT 50`,
  )
    .bind(user.email)
    .all();
  return c.json({ items: rows.results });
});

tuitionWorklist.post("/:ref/offer", requireAuth, requireAnyRole(PLACEMENT_STAFF), async (c) => {
  const ref = c.req.param("ref").toUpperCase();
  const input = await parseBody(c, offerSchema);
  const row = await c.env.DB.prepare("SELECT * FROM registrations WHERE ref = ?")
    .bind(ref)
    .first<TuitionRow>();
  if (!row) throw ApiError.notFound("Application not found.");
  if (row.program_kind !== "short")
    throw new ApiError(
      409,
      "ASSISTED_OFFER_ONLY",
      "Longer packages need a separately reviewed agreement. This checkout is for short courses.",
    );
  if (row.activated_at || row.stage === "declined")
    throw new ApiError(
      409,
      "OFFER_LOCKED",
      "Do not replace an active or declined agreement. Review it with the learner first.",
    );
  const cohort = await c.env.DB.prepare("SELECT * FROM cohorts WHERE id = ?")
    .bind(input.cohortId)
    .first<{
      id: string;
      program_slug: string;
      capacity: number | null;
      enrollment_open: number;
      start_date: string;
      end_date: string | null;
      start_time: string | null;
      days: string;
      mode: string;
      status: string;
      label: string;
      updated_at: string;
    }>();
  const now = isoNow();
  if (
    !cohort ||
    !cohort.enrollment_open ||
    cohort.program_slug !== row.program_slug ||
    cohort.status !== "scheduled" ||
    !cohort.capacity ||
    !cohort.start_time ||
    !cohort.end_date ||
    cohort.start_date <= now.slice(0, 10)
  ) {
    throw new ApiError(
      409,
      "COHORT_NOT_READY",
      "Choose a future, open, capacity-checked cohort for this exact course.",
    );
  }
  const course = await c.env.DB.prepare("SELECT slug FROM courses WHERE slug = ?")
    .bind(row.program_slug)
    .first();
  if (!course)
    throw new ApiError(
      409,
      "CURRICULUM_NOT_READY",
      "The matching academy curriculum must be installed before issuing an offer.",
    );
  const due = new Date(input.balanceDueAt).toISOString();
  const start = new Date(`${cohort.start_date}T${cohort.start_time}:00+01:00`).toISOString();
  const midpoint =
    (Date.parse(start) + Date.parse(`${cohort.end_date}T${cohort.start_time}:00+01:00`)) / 2;
  if (due < start || Date.parse(due) >= midpoint)
    throw ApiError.validation({
      balanceDueAt: [
        "Set the agreed balance date after the course starts and before the midpoint of its confirmed dates. Choose an earlier date if the second half of teaching starts sooner.",
      ],
    });
  const expires = new Date(
    Math.min(Date.now() + 48 * 3600000, new Date(start).getTime()),
  ).toISOString();
  const issueId = crypto.randomUUID();
  // Count money/pending attempts even after expiry. An unchecked transfer must never lose its seat automatically.
  const result = await c.env.DB.batch([
    c.env.DB.prepare(
      `UPDATE registrations SET cohort_id = ?, offer_status = 'held', offer_expires_at = ?,
    offer_version = offer_version + 1, accepted_offer_version = NULL, accepted_offer_at = NULL,
    equipment_agreement = ?, balance_due_at = ?, stage = 'offer', updated_at = ?, offer_issue_id = ?
    WHERE ref = ? AND activated_at IS NULL AND offer_version = ?
      AND NOT EXISTS (SELECT 1 FROM registration_payments WHERE registration_ref = registrations.ref AND status = 'pending')
      AND NOT EXISTS (SELECT 1 FROM payment_proofs WHERE registration_ref = registrations.ref AND status = 'pending_review')
      AND EXISTS (SELECT 1 FROM cohorts WHERE id = ? AND enrollment_open = 1 AND status = 'scheduled' AND updated_at = ?)
      AND (SELECT COUNT(*) FROM registrations r WHERE r.cohort_id = ? AND r.ref != ? AND
        (r.paid_amount > 0 OR r.offer_status = 'confirmed' OR (r.offer_status = 'held' AND r.offer_expires_at > ?)
         OR EXISTS (SELECT 1 FROM payment_proofs p WHERE p.registration_ref = r.ref AND p.status = 'pending_review')
         OR EXISTS (SELECT 1 FROM registration_payments p WHERE p.registration_ref = r.ref AND p.status = 'pending')))
        < (SELECT capacity FROM cohorts WHERE id = ?)`,
    ).bind(
      cohort.id,
      expires,
      input.equipment,
      due,
      now,
      issueId,
      ref,
      row.offer_version,
      cohort.id,
      cohort.updated_at,
      cohort.id,
      ref,
      now,
      cohort.id,
    ),
    c.env.DB.prepare(
      `INSERT OR IGNORE INTO tuition_offer_history (registration_ref, version, snapshot, issued_at)
      SELECT ref, offer_version, json_object('feeTotal', fee_total, 'paymentPlan', payment_plan, 'deposit', deposit_amount,
        'cohortId', cohort_id, 'cohort', (SELECT json_object('label',label,'start',start_date,'end',end_date,'days',days,'time',start_time,'mode',mode) FROM cohorts WHERE id = registrations.cohort_id),
        'equipment', equipment_agreement, 'balanceDueAt', balance_due_at, 'expiresAt', offer_expires_at, 'policyVersion', ?, 'policy', json(?)), updated_at
      FROM registrations WHERE ref = ? AND offer_issue_id = ?`,
    ).bind(TUITION_POLICY.version, JSON.stringify(TUITION_POLICY), ref, issueId),
    c.env.DB.prepare(
      "UPDATE applications SET status = 'offer', updated_at = ? WHERE ref = ? AND EXISTS (SELECT 1 FROM registrations WHERE ref = ? AND offer_issue_id = ?)",
    ).bind(now, ref, ref, issueId),
    c.env.DB.prepare(
      "INSERT INTO registration_events (id, registration_ref, event, detail, at) SELECT ?, ?, 'offer_issued', ?, ? FROM registrations WHERE ref = ? AND offer_issue_id = ?",
    ).bind(
      crypto.randomUUID(),
      ref,
      `Offer ${row.offer_version + 1}; cohort ${cohort.id}; eligibility/equipment checked by ${c.get("authUser").email}`,
      now,
      ref,
      issueId,
    ),
    notificationStatement(c.env.DB, {
      id: `offer:${ref}:${row.offer_version + 1}`,
      ref,
      offerIssueId: issueId,
      to: row.email,
      subject: `Review your course offer — ${ref}`,
      html: `<p>Your ${escapeHtml(row.program_title)} offer is ready for review. ${escapeHtml(cohort.label)} starts ${cohort.start_date}, ${escapeHtml(cohort.days)} at ${cohort.start_time} WAT.</p><p>Full tuition: ₦${tuitionDue(row).toLocaleString("en-NG")}. Balance date: ${due}. Hold expires: ${expires}.</p><p>Equipment/practice: ${escapeHtml(input.equipment)}</p><p>Review the offer and policy before paying at <a href="${escapeHtml((c.env.APP_URL || "https://www.cea.ng").replace(/\/+$/, ""))}/apply/status/${ref}">your secure application page</a>.</p>`,
    }),
  ]);
  if (!result[0]?.meta.changes)
    throw new ApiError(
      409,
      "PLACE_UNAVAILABLE",
      "The cohort is full, payment needs reconciliation, or the offer changed. Reload before trying again.",
    );
  return c.json({ ok: true, version: row.offer_version + 1, expiresAt: expires });
});

tuitionWorklist.post("/:ref/offer/accept", requireAuth, async (c) => {
  const ref = c.req.param("ref").toUpperCase();
  const row = await requireApplicantAccess(c, ref);
  // Staff cannot accept a learner's agreement on the learner's behalf.
  if (c.get("authUser").email.toLowerCase() !== row.email.toLowerCase())
    throw ApiError.forbidden("The applicant must accept their own offer.");
  const input = await parseBody(
    c,
    z.object({
      version: z.number().int().positive(),
      policyVersion: z.literal(TUITION_POLICY.version),
      consent: z.literal(true),
    }),
  );
  const now = isoNow();
  const result = await c.env.DB.batch([
    c.env.DB.prepare(
      `UPDATE registrations SET accepted_offer_version = ?, accepted_offer_at = COALESCE(accepted_offer_at, ?), policy_version = ?,
    offer_status = CASE WHEN paid_amount >= CASE WHEN payment_plan = '50-50' THEN deposit_amount ELSE fee_total END THEN 'confirmed' ELSE offer_status END, updated_at = ?
    WHERE ref = ? AND offer_version = ? AND offer_status IN ('held', 'confirmed') AND offer_expires_at > ?
      AND EXISTS (SELECT 1 FROM cohorts WHERE id = registrations.cohort_id AND status IN ('scheduled','running'))`,
    ).bind(input.version, now, input.policyVersion, now, ref, input.version, now),
    c.env.DB.prepare(
      "INSERT OR IGNORE INTO registration_events (id, registration_ref, event, detail, at) SELECT ?, ?, 'offer_accepted', ?, ? FROM registrations WHERE ref = ? AND accepted_offer_version = ? AND offer_version = ?",
    ).bind(
      `accepted:${ref}:${input.version}`,
      ref,
      `Policy ${input.policyVersion}; offer ${input.version}`,
      now,
      ref,
      input.version,
      input.version,
    ),
    c.env.DB.prepare(
      "UPDATE tuition_offer_history SET accepted_at = COALESCE(accepted_at, (SELECT accepted_offer_at FROM registrations WHERE ref = ? AND accepted_offer_version = ?)) WHERE registration_ref = ? AND version = ?",
    ).bind(ref, input.version, ref, input.version),
  ]);
  if (!result[0]?.meta.changes)
    throw new ApiError(
      409,
      "OFFER_CHANGED",
      "This offer changed or expired. Reload to review the current offer.",
    );
  await activateTuition(c.env, ref);
  return c.json({ ok: true });
});

tuitionWorklist.post("/:ref/activate", requireAuth, requireAdmin, async (c) => {
  const row = await requireApplicantAccess(c, c.req.param("ref").toUpperCase());
  await activateTuition(c.env, row.ref);
  const fresh = await c.env.DB.prepare("SELECT activated_at FROM registrations WHERE ref = ?")
    .bind(row.ref)
    .first<{ activated_at: string | null }>();
  return c.json({ ok: true, active: Boolean(fresh?.activated_at) });
});

/** A later, fee-free deadline is an audited concession, never a new charge or an earlier due date. */
tuitionWorklist.post("/:ref/balance-extension", requireAuth, requireAdmin, async (c) => {
  const ref = c.req.param("ref").toUpperCase();
  const row = await requireApplicantAccess(c, ref);
  const input = await parseBody(
    c,
    z.object({
      previousDueAt: z.string().datetime({ offset: true }),
      dueAt: z.string().datetime({ offset: true }),
      reason: z.string().trim().min(8).max(1000),
    }),
  );
  const due = new Date(input.dueAt).toISOString();
  const previous = new Date(input.previousDueAt).toISOString();
  const now = isoNow();
  if (
    !row.balance_due_at ||
    previous !== row.balance_due_at ||
    due <= previous ||
    due <= now ||
    row.paid_amount <= 0 ||
    row.paid_amount >= tuitionDue(row) ||
    row.stage === "declined"
  )
    throw new ApiError(
      409,
      "EXTENSION_NOT_ELIGIBLE",
      "Reload the agreed balance. Only a later, future date for an existing part-paid agreement can be recorded here; no fee or penalty may be added.",
    );
  const id = `balance-extension:${ref}:${due}`;
  const detail = JSON.stringify({
    previousDueAt: previous,
    dueAt: due,
    reason: input.reason,
    by: c.get("authUser").email,
    fee: 0,
  });
  const results = await c.env.DB.batch([
    c.env.DB.prepare(
      "UPDATE registrations SET balance_due_at=?, updated_at=? WHERE ref=? AND balance_due_at=? AND stage!='declined'",
    ).bind(due, now, ref, previous),
    c.env.DB.prepare(
      "INSERT OR IGNORE INTO registration_events(id,registration_ref,event,detail,at) SELECT ?,?,'balance_extension',?,? FROM registrations WHERE ref=? AND balance_due_at=?",
    ).bind(id, ref, detail, now, ref, due),
    notificationStatement(c.env.DB, {
      id,
      ref,
      to: row.email,
      balanceDueAt: due,
      subject: `Your tuition balance extension — ${ref}`,
      html: `<p>Your balance due date has been extended from ${escapeHtml(previous)} to ${escapeHtml(due)}. No fee or penalty has been added.</p><p>${escapeHtml(input.reason)}</p><p>Review your application for the current balance and receipt.</p>`,
    }),
  ]);
  if (!results[0]?.meta.changes)
    throw new ApiError(
      409,
      "AGREEMENT_CHANGED",
      "The agreement changed. Reload it before granting an extension.",
    );
  return c.json({ ok: true, dueAt: due });
});
