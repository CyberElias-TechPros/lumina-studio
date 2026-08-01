-- 0002_student_lms.sql — Phase 3 student LMS: assignments, assessments,
-- calendar events, message threads. Assignments/assessments/threads are
-- per-user; calendar events are shared. JSON columns for submissions,
-- rubric, and thread messages mirror the programs/courses pattern.

CREATE TABLE assignments (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  course TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  due TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'pending',
  score INTEGER,
  max INTEGER NOT NULL DEFAULT 100,
  weight INTEGER NOT NULL DEFAULT 0,
  submissions TEXT NOT NULL DEFAULT '[]',
  rubric TEXT NOT NULL DEFAULT '[]'
);
CREATE INDEX idx_assignments_user ON assignments(user_id);

CREATE TABLE assessments (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  course TEXT NOT NULL DEFAULT '',
  kind TEXT NOT NULL DEFAULT 'quiz',
  questions INTEGER NOT NULL DEFAULT 0,
  duration TEXT NOT NULL DEFAULT '',
  due TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'scheduled',
  score INTEGER,
  max INTEGER,
  attempts INTEGER NOT NULL DEFAULT 1,
  attempts_left INTEGER NOT NULL DEFAULT 0,
  window TEXT NOT NULL DEFAULT ''
);
CREATE INDEX idx_assessments_user ON assessments(user_id);

CREATE TABLE calendar_events (
  id TEXT PRIMARY KEY,
  date TEXT NOT NULL,
  day TEXT NOT NULL,
  title TEXT NOT NULL,
  kind TEXT NOT NULL DEFAULT 'event',
  time TEXT NOT NULL DEFAULT '',
  location TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE message_threads (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT '',
  unread INTEGER NOT NULL DEFAULT 0,
  last_text TEXT NOT NULL DEFAULT '',
  last_time TEXT NOT NULL DEFAULT '',
  last_mine INTEGER NOT NULL DEFAULT 0,
  messages TEXT NOT NULL DEFAULT '[]'
);
CREATE INDEX idx_message_threads_user ON message_threads(user_id);
