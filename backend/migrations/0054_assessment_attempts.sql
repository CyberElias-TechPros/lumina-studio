-- 0054_assessment_attempts.sql — Durable assessment submission history.
CREATE TABLE IF NOT EXISTS assessment_attempts (
  id TEXT PRIMARY KEY,
  assessment_id TEXT NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  answers TEXT NOT NULL,
  score INTEGER NOT NULL,
  max INTEGER NOT NULL,
  submitted_at TEXT NOT NULL,
  UNIQUE (assessment_id, user_id, id)
);
CREATE INDEX IF NOT EXISTS idx_assessment_attempts_user ON assessment_attempts (user_id, assessment_id, submitted_at);
