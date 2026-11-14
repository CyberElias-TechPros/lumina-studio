-- Publication references are scoped to the author and retained for reconciliation.
-- The operation row, assignments and in-app notifications are committed together.
CREATE TABLE assignment_publications (
  author_id TEXT NOT NULL REFERENCES users(id),
  request_key TEXT NOT NULL,
  request_hash TEXT NOT NULL,
  group_id TEXT NOT NULL UNIQUE,
  course_title TEXT NOT NULL,
  due TEXT NOT NULL,
  due_at TEXT NOT NULL,
  recipients INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL,
  PRIMARY KEY (author_id, request_key)
);
