-- 0057: schedulable assignment due dates, reminder ledger, SMS delivery log.
--  * assignments.due_at — machine-readable ISO-8601 UTC deadline. `due` stays
--    as the human display string for backwards compatibility.
--  * assignments.group_id / created_by — one published assignment fans out to
--    a row per enrolled student; created_by routes submissions to the author.
--  * assignment_reminders — at-most-once ledger per (assignment, window).
--  * sms_messages — outbound SMS audit log (provider response, status).

ALTER TABLE assignments ADD COLUMN due_at TEXT;
ALTER TABLE assignments ADD COLUMN group_id TEXT;
ALTER TABLE assignments ADD COLUMN created_by TEXT;
CREATE INDEX IF NOT EXISTS idx_assignments_due_at ON assignments (due_at);
CREATE INDEX IF NOT EXISTS idx_assignments_group ON assignments (group_id);

CREATE TABLE IF NOT EXISTS assignment_reminders (
  assignment_id TEXT NOT NULL,
  kind TEXT NOT NULL CHECK (kind IN ('24h', '1h')),
  sent_at TEXT NOT NULL,
  PRIMARY KEY (assignment_id, kind)
);

CREATE TABLE IF NOT EXISTS sms_messages (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  to_number TEXT NOT NULL,
  body TEXT NOT NULL,
  provider TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('sent', 'failed', 'skipped')),
  error TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_sms_messages_user ON sms_messages (user_id, created_at);
