-- 0051_mentor_request_targets.sql — Track the mentor targeted by a request.
ALTER TABLE mentor_requests ADD COLUMN mentor_id TEXT NOT NULL DEFAULT '';
CREATE INDEX IF NOT EXISTS idx_mentor_requests_mentor ON mentor_requests (mentor_id);
