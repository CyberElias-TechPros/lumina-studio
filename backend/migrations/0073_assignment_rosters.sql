-- Explicitly confirmed instructor-to-learner roster grants; no legacy title or
-- enrollment is automatically promoted into a teaching relationship.
CREATE TABLE assignment_roster_grants (
  instructor_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  student_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  course_slug TEXT NOT NULL REFERENCES courses(slug) ON DELETE CASCADE,
  active INTEGER NOT NULL CHECK (active IN (0, 1)),
  expires_at TEXT NOT NULL,
  changed_by TEXT NOT NULL REFERENCES users(id),
  changed_at TEXT NOT NULL,
  operation_id TEXT NOT NULL,
  PRIMARY KEY (instructor_id, student_id, course_slug)
);
CREATE INDEX idx_assignment_roster_course ON assignment_roster_grants (instructor_id, course_slug, active);
CREATE TABLE assignment_roster_events (
  id TEXT PRIMARY KEY,
  instructor_id TEXT NOT NULL,
  student_id TEXT NOT NULL,
  course_slug TEXT NOT NULL,
  active INTEGER NOT NULL CHECK (active IN (0, 1)),
  expires_at TEXT NOT NULL,
  actor_id TEXT NOT NULL,
  occurred_at TEXT NOT NULL
);
