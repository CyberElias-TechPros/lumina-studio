import type { Context } from "hono";
import type { AppEnv } from "../types";
import { ApiError } from "./errors";
import { isoNow } from "./crypto";
import { sendEmail } from "./email";
import { TUITION_POLICY } from "../../../src/data/academy/tuition-policy";

export { TUITION_POLICY };
export const TUITION_STAFF = ["admin", "admissions", "finance"];
export const PLACEMENT_STAFF = ["admin", "admissions"];

export interface TuitionRow {
  id: string;
  ref: string;
  email: string;
  first_name: string;
  last_name: string;
  program_slug: string;
  program_title: string;
  program_kind: "short" | "long";
  fee_total: number;
  payment_plan: string;
  deposit_amount: number;
  paid_amount: number;
  payment_status: string;
  stage: string;
  cohort_id: string | null;
  policy_version: string | null;
  offer_status: string;
  offer_version: number;
  offer_expires_at: string | null;
  accepted_offer_version: number | null;
  accepted_offer_at: string | null;
  balance_due_at: string | null;
  equipment_agreement: string | null;
  activated_user_id: string | null;
  activated_at: string | null;
}

export function tuitionDue(
  row: Pick<TuitionRow, "fee_total" | "program_kind" | "payment_plan">,
): number {
  return row.program_kind === "long" && row.payment_plan === "full-10-off"
    ? Math.round(row.fee_total * 0.9)
    : row.fee_total;
}

/** A reference is an identifier, never an authentication credential. */
export async function requireApplicantAccess(c: Context<{ Bindings: AppEnv }>, ref: string) {
  const user = c.get("authUser");
  const row = await c.env.DB.prepare("SELECT * FROM registrations WHERE ref = ?")
    .bind(ref)
    .first<TuitionRow>();
  if (!row) throw ApiError.notFound("Application not found.");
  if (TUITION_STAFF.includes(user.roleKey)) return row;
  if (user.email.toLowerCase() !== row.email.toLowerCase())
    throw ApiError.notFound("Application not found for this account.");
  const verified = await c.env.DB.prepare("SELECT email_verified_at FROM users WHERE id = ?")
    .bind(user.id)
    .first<{ email_verified_at: string | null }>();
  if (!verified?.email_verified_at)
    throw new ApiError(
      403,
      "EMAIL_VERIFICATION_REQUIRED",
      "Verify your application email using a sign-in link to view this record.",
    );
  return row;
}

export async function checkoutEligibility(
  db: AppEnv["DB"],
  row: TuitionRow,
): Promise<{ allowed: boolean; reason: string }> {
  if (row.stage === "declined" || row.offer_status === "cancelled")
    return {
      allowed: false,
      reason: "This offer is closed. Contact CEA about any money already paid.",
    };
  if (!["held", "confirmed"].includes(row.offer_status) || !row.cohort_id)
    return {
      allowed: false,
      reason: "Awaiting a confirmed timetable, equipment arrangement and place. Do not pay yet.",
    };
  if (row.accepted_offer_version !== row.offer_version)
    return { allowed: false, reason: "Review and accept your course offer before payment." };
  if (row.offer_status === "held" && (!row.offer_expires_at || row.offer_expires_at <= isoNow()))
    return {
      allowed: false,
      reason: "Your offer hold has expired. Ask CEA to check the place before paying.",
    };
  const cohort = await db
    .prepare("SELECT status FROM cohorts WHERE id = ?")
    .bind(row.cohort_id)
    .first<{ status: string }>();
  if (!cohort || !["scheduled", "running"].includes(cohort.status))
    return {
      allowed: false,
      reason: "This cohort is not available for payment. CEA will review your placement.",
    };
  const proof = await db
    .prepare(
      "SELECT 1 AS x FROM payment_proofs WHERE registration_ref = ? AND status = 'pending_review'",
    )
    .bind(row.ref)
    .first();
  if (proof)
    return {
      allowed: false,
      reason: "Your transfer is under review. Do not pay again while it is being matched.",
    };
  if (row.paid_amount >= tuitionDue(row))
    return { allowed: false, reason: "Your tuition is fully paid. No further payment is needed." };
  return { allowed: true, reason: "Your accepted offer is ready for payment." };
}

export async function assertCheckout(db: AppEnv["DB"], row: TuitionRow) {
  const result = await checkoutEligibility(db, row);
  if (!result.allowed) throw new ApiError(409, "CHECKOUT_NOT_READY", result.reason);
}

/** Atomic conditional insert/update: no role changes, no guessed curriculum, no progress resets. */
export async function activateTuition(env: AppEnv, ref?: string): Promise<number> {
  const now = isoNow();
  const eligible = `FROM registrations r
    JOIN users u ON lower(u.email) = lower(r.email) AND u.email_verified_at IS NOT NULL
      AND u.status = 'active' AND u.role_key = 'student'
    JOIN cohorts c ON c.id = r.cohort_id AND c.program_slug = r.program_slug AND c.status IN ('scheduled', 'running')
    JOIN courses course ON course.slug = r.program_slug
    WHERE r.offer_status = 'confirmed' AND r.stage != 'declined'
      AND r.accepted_offer_version = r.offer_version
      AND (r.activated_user_id IS NULL OR r.activated_user_id = u.id)
      AND r.paid_amount >= CASE WHEN r.payment_plan IN ('50-50', 'deposit-monthly') THEN r.deposit_amount
        WHEN r.program_kind = 'long' AND r.payment_plan = 'full-10-off' THEN round(r.fee_total * 0.9) ELSE r.fee_total END
      ${ref ? "AND r.ref = ?" : ""}`;
  const args = ref ? [ref] : [];
  const statements = [
    env.DB.prepare(
      `INSERT OR IGNORE INTO enrollments (id, user_id, course_slug, pct, enrolled_at)
      SELECT 'tuition:' || r.id, u.id, r.program_slug, 0, ? ${eligible}`,
    ).bind(now, ...args),
    env.DB.prepare(
      `UPDATE registrations SET activated_user_id = (SELECT id FROM users WHERE lower(email) = lower(registrations.email) AND role_key = 'student'),
      activated_at = COALESCE(activated_at, ?), stage = 'enrolled', updated_at = ?
      WHERE ref IN (SELECT r.ref ${eligible})`,
    ).bind(now, now, ...args),
    env.DB.prepare(
      `UPDATE applications SET status = 'enrolled', user_id = (SELECT activated_user_id FROM registrations WHERE ref = applications.ref), updated_at = ?
      WHERE ref IN (SELECT ref FROM registrations WHERE activated_at IS NOT NULL AND offer_status = 'confirmed' AND stage = 'enrolled' ${ref ? "AND ref = ?" : ""})`,
    ).bind(now, ...args),
  ];
  const result = await env.DB.batch(statements);
  return result[0]?.meta.changes ?? 0;
}

export function notificationStatement(
  db: AppEnv["DB"],
  input: {
    id: string;
    ref: string;
    to: string;
    subject: string;
    html: string;
    offerIssueId?: string;
    balanceDueAt?: string;
  },
) {
  const values = [input.id, input.ref, input.to, input.subject, input.html, isoNow()];
  const source = input.offerIssueId
    ? "SELECT ?, ?, ?, ?, ?, ? FROM registrations WHERE ref = ? AND offer_issue_id = ?"
    : input.balanceDueAt
      ? "SELECT ?, ?, ?, ?, ?, ? FROM registrations WHERE ref = ? AND balance_due_at = ?"
      : "VALUES (?, ?, ?, ?, ?, ?)";
  if (input.offerIssueId) values.push(input.ref, input.offerIssueId);
  else if (input.balanceDueAt) values.push(input.ref, input.balanceDueAt);
  return db
    .prepare(
      `INSERT OR IGNORE INTO tuition_notifications (id, registration_ref, recipient, subject, html, created_at) ${source}`,
    )
    .bind(...values);
}

/** Retryable email outbox. The receipt itself is always available even if email fails. */
export async function deliverTuitionNotifications(env: AppEnv): Promise<string> {
  if (
    env.APP_ENV === "production" &&
    (!env.EMAIL_API_KEY || !env.EMAIL_PROVIDER || env.EMAIL_PROVIDER === "console")
  )
    return "skipped: real email provider not configured";
  const now = isoNow();
  const rows = await env.DB.prepare(
    `SELECT id, recipient, subject, html FROM tuition_notifications
    WHERE sent_at IS NULL AND (lease_until IS NULL OR lease_until < ?) AND (next_attempt_at IS NULL OR next_attempt_at <= ?)
    ORDER BY created_at ASC LIMIT 20`,
  )
    .bind(now, now)
    .all<{ id: string; recipient: string; subject: string; html: string }>();
  let sent = 0;
  for (const row of rows.results) {
    const lease = new Date(Date.now() + 5 * 60_000).toISOString();
    const claimed = await env.DB.prepare(
      `UPDATE tuition_notifications SET lease_until = ?, attempts = attempts + 1
      WHERE id = ? AND sent_at IS NULL AND (lease_until IS NULL OR lease_until < ?)`,
    )
      .bind(lease, row.id, now)
      .run();
    if (!claimed.meta.changes) continue;
    try {
      const result = await sendEmail(
        { env },
        { to: row.recipient, subject: row.subject, html: row.html },
      );
      if (!result.sent)
        throw new Error(result.error ?? "Email provider did not accept the message.");
      await env.DB.prepare(
        "UPDATE tuition_notifications SET sent_at = ?, lease_until = NULL, last_error = '' WHERE id = ?",
      )
        .bind(isoNow(), row.id)
        .run();
      sent++;
    } catch {
      await env.DB.prepare(
        "UPDATE tuition_notifications SET lease_until = NULL, last_error = 'Delivery failed; retry scheduled', next_attempt_at = ? WHERE id = ?",
      )
        .bind(new Date(Date.now() + 30 * 60_000).toISOString(), row.id)
        .run();
    }
  }
  return `sent ${sent}; checked ${rows.results.length}`;
}
