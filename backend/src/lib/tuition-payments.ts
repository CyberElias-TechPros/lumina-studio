import type { AppEnv } from "../types";
import { isoNow } from "./crypto";
import { escapeHtml } from "./email-templates";
import { activateTuition, type TuitionRow } from "./tuition";

/** One atomic financial transition; provider retries and late failures cannot reverse a credit. */
export async function markTuitionPayment(
  c: { env: AppEnv },
  reference: string,
  outcome: "success" | "failed",
  paidKobo?: number,
): Promise<void> {
  const db = c.env.DB;
  const payment = await db
    .prepare("SELECT * FROM registration_payments WHERE reference = ?")
    .bind(reference)
    .first<{
      id: string;
      registration_ref: string;
      kind: string;
      amount: number;
      status: string;
      proof_id: string | null;
    }>();
  if (!payment) return;
  const row = await db
    .prepare("SELECT * FROM registrations WHERE ref = ?")
    .bind(payment.registration_ref)
    .first<TuitionRow>();
  if (!row) return;
  if (outcome === "success" && (!Number.isSafeInteger(paidKobo) || paidKobo! <= 0)) return;
  if (outcome === "success" && payment.status === "success") {
    await activateTuition(c.env, row.ref).catch(() => undefined);
    return;
  }
  const now = isoNow();
  const scope = now.slice(0, 4);
  // All conditions are reevaluated INSIDE the serialised D1 batch, not just by the earlier read.
  const eligible = `reference = ? AND status != 'success' AND
    (proof_id IS NULL OR EXISTS (SELECT 1 FROM payment_proofs pp WHERE pp.id = registration_payments.proof_id AND pp.status = 'pending_review'))`;
  const opening = db
    .prepare(
      `UPDATE registrations SET opening_paid_amount = max(0, paid_amount -
    COALESCE((SELECT SUM(COALESCE(received_kobo, amount * 100)) / 100.0 FROM registration_payments WHERE registration_ref = ? AND status = 'success'), 0))
    WHERE ref = ? AND opening_paid_amount IS NULL`,
    )
    .bind(row.ref, row.ref);
  if (outcome === "failed") {
    await db.batch([
      db
        .prepare(
          `UPDATE registration_payments SET status = 'failed' WHERE reference = ? AND status = 'pending'`,
        )
        .bind(reference),
      db
        .prepare(
          `UPDATE registrations SET payment_status = 'failed', updated_at = ? WHERE ref = ? AND paid_amount = 0
        AND NOT EXISTS (SELECT 1 FROM registration_payments WHERE registration_ref = ? AND status = 'success')`,
        )
        .bind(now, row.ref, row.ref),
    ]);
    return;
  }
  const actual = paidKobo! / 100;
  const mismatch = paidKobo !== Math.round(payment.amount * 100) ? "provider_amount_mismatch" : "";
  const creditTotal = `COALESCE(opening_paid_amount, 0) + COALESCE((SELECT SUM(COALESCE(received_kobo, amount * 100)) / 100.0
    FROM registration_payments WHERE registration_ref = registrations.ref AND status = 'success'), 0)`;
  const due = `CASE WHEN program_kind = 'long' AND payment_plan = 'full-10-off' THEN round(fee_total * 0.9) ELSE fee_total END`;
  await db.batch([
    opening,
    db
      .prepare("INSERT OR IGNORE INTO receipt_counters(scope, last_value) VALUES (?, 0)")
      .bind(scope),
    db
      .prepare(
        `UPDATE receipt_counters SET last_value = last_value + 1 WHERE scope = ?
      AND EXISTS (SELECT 1 FROM registration_payments WHERE ${eligible} AND receipt_no IS NULL)`,
      )
      .bind(scope, reference),
    db
      .prepare(
        `INSERT OR IGNORE INTO registration_events (id, registration_ref, event, detail, at)
      SELECT ?, ?, 'payment_confirmed', ?, ? FROM registration_payments WHERE ${eligible}`,
      )
      .bind(
        `payment:${reference}:success`,
        row.ref,
        `${actual} NGN received (${payment.kind}); ref ${reference}`,
        now,
        reference,
      ),
    db
      .prepare(
        `UPDATE registration_payments SET status = 'success', received_kobo = ?, paid_at = ?,
      method = COALESCE(method, 'paystack'), exception = ?,
      receipt_no = COALESCE(receipt_no, 'CEA-RCPT-' || ? || '-' || printf('%04d', (SELECT last_value FROM receipt_counters WHERE scope = ?)))
      WHERE ${eligible}`,
      )
      .bind(paidKobo, now, mismatch, scope, scope, reference),
    db
      .prepare(
        `UPDATE registrations SET paid_amount = ${creditTotal},
      payment_status = CASE WHEN ${creditTotal} >= ${due} THEN 'paid' WHEN ${creditTotal} > 0 THEN 'deposit_paid' ELSE payment_status END,
      paid_at = COALESCE((SELECT MAX(paid_at) FROM registration_payments WHERE registration_ref = registrations.ref AND status = 'success'), paid_at), updated_at = ?
      WHERE ref = ?`,
      )
      .bind(now, row.ref),
    db
      .prepare(
        `UPDATE registrations SET offer_status = 'confirmed' WHERE ref = ? AND offer_status = 'held'
      AND offer_expires_at > ? AND accepted_offer_version = offer_version AND paid_amount >=
      CASE WHEN payment_plan IN ('50-50', 'deposit-monthly') THEN deposit_amount ELSE ${due} END`,
      )
      .bind(row.ref, now),
    db
      .prepare(
        `UPDATE payment_proofs SET status = 'confirmed', reviewed_at = ? WHERE id = ? AND status = 'pending_review'
      AND EXISTS (SELECT 1 FROM registration_payments WHERE reference = ? AND status = 'success')`,
      )
      .bind(now, payment.proof_id, reference),
    // INSERT SELECT prevents a concurrent rejected proof from generating a receipt email.
    db
      .prepare(
        `INSERT OR IGNORE INTO tuition_notifications (id, registration_ref, recipient, subject, html, created_at)
      SELECT ?, ?, ?, ?, ?, ? FROM registration_payments WHERE reference = ? AND status = 'success'`,
      )
      .bind(
        `receipt:${reference}`,
        row.ref,
        row.email,
        `Payment recorded — ${row.ref}`,
        `<p>Hi ${escapeHtml(row.first_name)},</p><p>We recorded ₦${actual.toLocaleString("en-NG")} for ${escapeHtml(row.program_title)}.</p><p>This confirms this payment, not necessarily the whole tuition fee. View your secure receipt, remaining balance and learning-access status at <a href="${escapeHtml((c.env.APP_URL || "https://www.cea.ng").replace(/\/+$/, ""))}/apply/status/${row.ref}">your application</a>. Sign in using your application email.</p>`,
        now,
        reference,
      ),
  ]);
  // Access is retryable independently of settlement; a failed activation must not undo money.
  await activateTuition(c.env, row.ref).catch(() => undefined);
}
