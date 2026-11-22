-- Bind live class sessions to canonical courses, cohorts, and verified instructor users.
ALTER TABLE live_sessions ADD COLUMN course_slug TEXT NOT NULL DEFAULT '';
ALTER TABLE live_sessions ADD COLUMN cohort_id TEXT NOT NULL DEFAULT '';
ALTER TABLE live_sessions ADD COLUMN instructor_user_id TEXT NOT NULL DEFAULT '';
ALTER TABLE live_sessions ADD COLUMN meeting_url TEXT NOT NULL DEFAULT '';
CREATE INDEX idx_live_sessions_course ON live_sessions(course_slug);
CREATE INDEX idx_live_sessions_instructor ON live_sessions(instructor_user_id);
