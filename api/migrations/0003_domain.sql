CREATE TABLE instructor_courses (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  cohort TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'draft',
  modules TEXT NOT NULL DEFAULT '[]',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX idx_instructor_courses_user ON instructor_courses(user_id);

CREATE TABLE submissions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  student TEXT NOT NULL,
  title TEXT NOT NULL DEFAULT '',
  submitted TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'pending',
  score INTEGER,
  late INTEGER NOT NULL DEFAULT 0,
  file TEXT NOT NULL DEFAULT '',
  size TEXT NOT NULL DEFAULT ''
);
CREATE INDEX idx_submissions_user ON submissions(user_id);

CREATE TABLE instructor_gradebook (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  student TEXT NOT NULL,
  quiz INTEGER NOT NULL DEFAULT 0,
  lab INTEGER NOT NULL DEFAULT 0,
  assignment INTEGER NOT NULL DEFAULT 0,
  midterm INTEGER NOT NULL DEFAULT 0,
  total INTEGER NOT NULL DEFAULT 0,
  letter TEXT NOT NULL DEFAULT '',
  at_risk INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX idx_instructor_gradebook_user ON instructor_gradebook(user_id);

CREATE TABLE employees (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT '',
  dept TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'active',
  joined TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE leave_requests (
  id TEXT PRIMARY KEY,
  employee TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT '',
  from_date TEXT NOT NULL DEFAULT '',
  to_date TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'pending',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE invoices (
  id TEXT PRIMARY KEY,
  party TEXT NOT NULL,
  amount INTEGER NOT NULL DEFAULT 0,
  due TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'pending',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE expenses (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL,
  amount INTEGER NOT NULL DEFAULT 0,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE admin_users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL DEFAULT '',
  role TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'active',
  last_seen TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE audit_log (
  id TEXT PRIMARY KEY,
  actor TEXT NOT NULL DEFAULT '',
  action TEXT NOT NULL DEFAULT '',
  time TEXT NOT NULL DEFAULT '',
  severity TEXT NOT NULL DEFAULT 'info',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE notifications (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL DEFAULT '',
  body TEXT NOT NULL DEFAULT '',
  time TEXT NOT NULL DEFAULT '',
  engine TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX idx_notifications_user ON notifications(user_id);
