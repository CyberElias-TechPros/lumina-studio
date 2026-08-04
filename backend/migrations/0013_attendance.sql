-- Attendance registry for learners (parent portal: attendance records).
CREATE TABLE IF NOT EXISTS attendance (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  date TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'present',
  note TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_attendance_user ON attendance(user_id, date);