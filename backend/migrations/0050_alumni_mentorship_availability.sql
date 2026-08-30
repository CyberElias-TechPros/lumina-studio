-- 0050_alumni_mentorship_availability.sql — Persist alumni mentor availability.
CREATE TABLE IF NOT EXISTS alu_mentor_availability (
  user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  skill TEXT NOT NULL,
  weekly_hours INTEGER NOT NULL,
  format TEXT NOT NULL,
  bio TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft',
  updated_at TEXT NOT NULL
);
