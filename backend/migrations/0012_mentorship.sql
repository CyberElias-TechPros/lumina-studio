-- 0012_mentorship.sql — mentor profiles + student mentor requests (rule-based match).

CREATE TABLE mentor_profiles (
  id TEXT PRIMARY KEY,
  userId TEXT,
  name TEXT NOT NULL DEFAULT '',
  focus TEXT NOT NULL DEFAULT '',
  bio TEXT NOT NULL DEFAULT '',
  skills TEXT NOT NULL DEFAULT '[]',
  areas TEXT NOT NULL DEFAULT '[]',
  availability TEXT NOT NULL DEFAULT 'open',
  rating REAL NOT NULL DEFAULT 0,
  sessions_count INTEGER NOT NULL DEFAULT 0,
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX idx_mentor_profiles_user ON mentor_profiles (userId);

CREATE TABLE mentor_requests (
  id TEXT PRIMARY KEY,
  userId TEXT NOT NULL DEFAULT '',
  studentName TEXT NOT NULL DEFAULT '',
  goal TEXT NOT NULL DEFAULT '',
  program TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX idx_mentor_requests_user ON mentor_requests (userId);
CREATE INDEX idx_mentor_requests_status ON mentor_requests (status);