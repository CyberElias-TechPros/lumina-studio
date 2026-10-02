-- 0062_receipts_expenses.sql
-- Sequential receipts and a real expense ledger.
--
-- Receipts: `CEA-RCPT-<year>-<seq>` allocated from `receipt_counters` at the
-- moment a payment is confirmed (Paystack webhook, verification, or finance
-- confirming a bank transfer). Until now the confirmation emails had no
-- reference a student could quote back.
--
-- Expenses: the demo `expenses` table only had (category, amount, sort_order).
-- These columns make it a ledger you can actually file: date, vendor, method,
-- the receipt photo, who recorded it, and the P&L reads from it.

ALTER TABLE registration_payments ADD COLUMN receipt_no TEXT;
ALTER TABLE registration_payments ADD COLUMN method TEXT;
ALTER TABLE registration_payments ADD COLUMN payer_name TEXT;
ALTER TABLE registration_payments ADD COLUMN reviewed_by TEXT;
ALTER TABLE registration_payments ADD COLUMN reviewed_at TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS idx_registration_payments_receipt
  ON registration_payments (receipt_no) WHERE receipt_no IS NOT NULL;

CREATE TABLE IF NOT EXISTS receipt_counters (
  /** Counter scope, e.g. "2026". */
  scope TEXT PRIMARY KEY,
  last_value INTEGER NOT NULL DEFAULT 0
);

ALTER TABLE expenses ADD COLUMN spent_on TEXT;
ALTER TABLE expenses ADD COLUMN vendor TEXT;
ALTER TABLE expenses ADD COLUMN description TEXT;
ALTER TABLE expenses ADD COLUMN method TEXT;
ALTER TABLE expenses ADD COLUMN proof_url TEXT;
ALTER TABLE expenses ADD COLUMN recorded_by TEXT;
ALTER TABLE expenses ADD COLUMN created_at TEXT;

CREATE INDEX IF NOT EXISTS idx_expenses_spent_on ON expenses (spent_on);
