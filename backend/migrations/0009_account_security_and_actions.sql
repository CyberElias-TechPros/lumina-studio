-- 0009_account_security_and_actions.sql
-- Phase 6: account security (verification, MFA, devices, passwords, resets),
-- write actions (LMS, admin, HR, finance, recruitment), certificates, and
-- per-user invoices. Adds only new columns/tables — no destructive changes.

ALTER TABLE users ADD COLUMN email_verified_at TEXT;
ALTER TABLE users ADD COLUMN mfa_secret TEXT;
ALTER TABLE users ADD COLUMN mfa_enabled INTEGER NOT NULL DEFAULT 0;
ALTER TABLE users ADD COLUMN recovery_codes TEXT NOT NULL DEFAULT '[]';

ALTER TABLE sessions ADD COLUMN device_label TEXT NOT NULL DEFAULT '';
ALTER TABLE sessions ADD COLUMN created_ip TEXT NOT NULL DEFAULT '';
ALTER TABLE sessions ADD COLUMN mfa_pending INTEGER NOT NULL DEFAULT 0;

ALTER TABLE magic_links ADD COLUMN kind TEXT NOT NULL DEFAULT 'magic-link';

ALTER TABLE applications ADD COLUMN note TEXT NOT NULL DEFAULT '';

ALTER TABLE assignments ADD COLUMN submitted_at TEXT;

ALTER TABLE submissions ADD COLUMN assignment_id TEXT;
ALTER TABLE submissions ADD COLUMN student_user_id TEXT;
ALTER TABLE submissions ADD COLUMN feedback TEXT NOT NULL DEFAULT '';
ALTER TABLE submissions ADD COLUMN graded_by TEXT;
ALTER TABLE submissions ADD COLUMN graded_at TEXT;
CREATE INDEX idx_submissions_assignment ON submissions(assignment_id);

ALTER TABLE notifications ADD COLUMN read_at TEXT;

ALTER TABLE invoices ADD COLUMN user_id TEXT REFERENCES users(id) ON DELETE CASCADE;
CREATE INDEX idx_invoices_user ON invoices(user_id);

ALTER TABLE expenses ADD COLUMN status TEXT NOT NULL DEFAULT 'pending';

CREATE TABLE certificates (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  course_slug TEXT NOT NULL DEFAULT '',
  title TEXT NOT NULL DEFAULT '',
  code TEXT NOT NULL UNIQUE,
  issued_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX idx_certificates_user ON certificates(user_id);
