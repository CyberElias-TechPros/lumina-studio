-- 0060_payment_proofs.sql
-- Bank-transfer proof capture (Phase 1, see docs/free-automation-plan-2026-10.md §6).
--
-- Students who choose "Direct bank transfer" (UBA 1028649972) notify the
-- academy from their status page instead of WhatsApp. Every proof lands in
-- `pending_review`; only a signed-in admin or finance user can confirm it, and
-- confirming goes through the same `markPayment()` path as Paystack — so a
-- screenshot can never silently mark money as received.

CREATE TABLE IF NOT EXISTS payment_proofs (
  id TEXT PRIMARY KEY,
  registration_ref TEXT NOT NULL,
  registration_id TEXT NOT NULL,
  /** deposit | full — mirrors registration_payments.kind */
  kind TEXT NOT NULL,
  /** NGN the student says they transferred. */
  amount INTEGER NOT NULL,
  /** NGN the funnel expected at submission time, for the reviewer's diff. */
  expected_amount INTEGER NOT NULL,
  sender_name TEXT NOT NULL,
  bank_name TEXT,
  bank_reference TEXT,
  /** YYYY-MM-DD the transfer left the student's bank. */
  paid_on TEXT,
  note TEXT,
  /** Optional link to the receipt image (R2 URL, Drive link, …). */
  receipt_url TEXT,
  /** pending_review | confirmed | rejected */
  status TEXT NOT NULL DEFAULT 'pending_review',
  submitted_at TEXT NOT NULL,
  reviewed_at TEXT,
  reviewed_by TEXT
);

CREATE INDEX IF NOT EXISTS idx_payment_proofs_status ON payment_proofs(status);
CREATE INDEX IF NOT EXISTS idx_payment_proofs_ref ON payment_proofs(registration_ref);
