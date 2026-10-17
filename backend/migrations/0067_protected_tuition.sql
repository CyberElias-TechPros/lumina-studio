-- Additive, schema-only. Do not infer real cohorts, paid identities or accepted policies.
ALTER TABLE registrations ADD COLUMN policy_version TEXT;
ALTER TABLE registrations ADD COLUMN consent_at TEXT;
ALTER TABLE registrations ADD COLUMN consent_whatsapp INTEGER NOT NULL DEFAULT 0;
ALTER TABLE registrations ADD COLUMN submission_key TEXT;
ALTER TABLE registrations ADD COLUMN submission_hash TEXT;
ALTER TABLE registrations ADD COLUMN opening_paid_amount INTEGER;
ALTER TABLE registrations ADD COLUMN offer_status TEXT NOT NULL DEFAULT 'awaiting';
ALTER TABLE registrations ADD COLUMN offer_expires_at TEXT;
ALTER TABLE registrations ADD COLUMN offer_version INTEGER NOT NULL DEFAULT 0;
ALTER TABLE registrations ADD COLUMN accepted_offer_version INTEGER;
ALTER TABLE registrations ADD COLUMN accepted_offer_at TEXT;
ALTER TABLE registrations ADD COLUMN balance_due_at TEXT;
ALTER TABLE registrations ADD COLUMN equipment_agreement TEXT;
ALTER TABLE registrations ADD COLUMN activated_user_id TEXT REFERENCES users(id);
ALTER TABLE registrations ADD COLUMN activated_at TEXT;
CREATE UNIQUE INDEX idx_registration_submission ON registrations(submission_key) WHERE submission_key IS NOT NULL;
CREATE INDEX idx_registration_activation ON registrations(activated_at, paid_amount);

ALTER TABLE cohorts ADD COLUMN enrollment_open INTEGER NOT NULL DEFAULT 0;
ALTER TABLE cohorts ADD COLUMN start_time TEXT;
ALTER TABLE cohorts ADD COLUMN session_minutes INTEGER;

ALTER TABLE registration_payments ADD COLUMN received_kobo INTEGER;
ALTER TABLE registration_payments ADD COLUMN exception TEXT NOT NULL DEFAULT '';
ALTER TABLE registration_payments ADD COLUMN proof_id TEXT REFERENCES payment_proofs(id);
ALTER TABLE registration_payments ADD COLUMN checkout_key TEXT;
ALTER TABLE registration_payments ADD COLUMN authorization_url TEXT;
CREATE UNIQUE INDEX idx_registration_payment_proof ON registration_payments(proof_id) WHERE proof_id IS NOT NULL;
CREATE UNIQUE INDEX idx_registration_checkout_key ON registration_payments(registration_ref, checkout_key) WHERE checkout_key IS NOT NULL;

CREATE TABLE tuition_notifications (
  id TEXT PRIMARY KEY,
  registration_ref TEXT NOT NULL REFERENCES registrations(ref),
  recipient TEXT NOT NULL,
  subject TEXT NOT NULL,
  html TEXT NOT NULL,
  created_at TEXT NOT NULL,
  attempts INTEGER NOT NULL DEFAULT 0,
  sent_at TEXT,
  last_error TEXT NOT NULL DEFAULT '',
  lease_until TEXT,
  next_attempt_at TEXT
);
CREATE INDEX idx_tuition_notifications_pending ON tuition_notifications(sent_at, next_attempt_at);

ALTER TABLE registration_payments ADD COLUMN verified_bank_reference TEXT;
CREATE UNIQUE INDEX idx_tuition_bank_credit ON registration_payments(verified_bank_reference) WHERE verified_bank_reference IS NOT NULL;

CREATE TABLE tuition_offer_history (
  registration_ref TEXT NOT NULL REFERENCES registrations(ref),
  version INTEGER NOT NULL,
  snapshot TEXT NOT NULL,
  issued_at TEXT NOT NULL,
  accepted_at TEXT,
  PRIMARY KEY (registration_ref, version)
);

-- Idempotent issuance guard keeps the offer, timeline and delivery intent atomic.
ALTER TABLE registrations ADD COLUMN offer_issue_id TEXT;
