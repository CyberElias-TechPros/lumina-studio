-- 0040_submissions_columns.sql - Add owner/scoping columns to submissions.
-- The submit + grade endpoints reference student_user_id, assignment_id,
-- feedback and graded_at, which were never added to the DDL. Backfill with
-- sane defaults so existing seed rows keep working.

ALTER TABLE submissions ADD COLUMN student_user_id TEXT REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE submissions ADD COLUMN assignment_id TEXT;

ALTER TABLE submissions ADD COLUMN feedback TEXT NOT NULL DEFAULT '';

ALTER TABLE submissions ADD COLUMN graded_at TEXT;

ALTER TABLE submissions ADD COLUMN graded_by TEXT REFERENCES users(id) ON DELETE SET NULL;

CREATE INDEX idx_submissions_assignment ON submissions (assignment_id);

