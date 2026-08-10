-- 0039_ownership.sql - Row-level ownership for employer-facing data.
-- Job postings and interviews gain an owner so employers only see their own;
-- admin/HR continue to see everything.

ALTER TABLE job_postings ADD COLUMN created_by TEXT NOT NULL DEFAULT '';

ALTER TABLE interviews ADD COLUMN created_by TEXT NOT NULL DEFAULT '';

CREATE INDEX idx_job_postings_owner ON job_postings (created_by);
CREATE INDEX idx_interviews_owner ON interviews (created_by);
