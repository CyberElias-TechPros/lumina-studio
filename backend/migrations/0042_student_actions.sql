-- 0042_student_actions.sql — real student attendance sessions and portfolio projects.

CREATE TABLE IF NOT EXISTS attendance_sessions (
  id TEXT PRIMARY KEY,
  course TEXT NOT NULL,
  code_hash TEXT NOT NULL UNIQUE,
  starts_at TEXT NOT NULL,
  closes_at TEXT NOT NULL,
  created_by TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS attendance_checkins (
  session_id TEXT NOT NULL REFERENCES attendance_sessions(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  attendance_id TEXT NOT NULL REFERENCES attendance(id) ON DELETE CASCADE,
  checked_in_at TEXT NOT NULL,
  PRIMARY KEY (session_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_attendance_sessions_window
  ON attendance_sessions (closes_at, starts_at);
CREATE INDEX IF NOT EXISTS idx_attendance_checkins_user
  ON attendance_checkins (user_id, checked_in_at);

ALTER TABLE stu_projects ADD COLUMN user_id TEXT REFERENCES users(id) ON DELETE CASCADE;
ALTER TABLE stu_projects ADD COLUMN url TEXT NOT NULL DEFAULT '';
CREATE INDEX IF NOT EXISTS idx_stu_projects_user_sort ON stu_projects (user_id, sort_order);
