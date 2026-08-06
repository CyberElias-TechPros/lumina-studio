-- 0017_intern.sql — Intern dashboard: tasks, timesheets, mentor sessions, milestones, skills, resources, evaluations, projects, conversations.

CREATE TABLE int_tasks (
  id TEXT PRIMARY KEY,
  intern_id TEXT NOT NULL DEFAULT '',
  title TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'assigned',
  due_label TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE int_timesheets (
  id TEXT PRIMARY KEY,
  intern_id TEXT NOT NULL DEFAULT '',
  week_label TEXT NOT NULL DEFAULT '',
  hours INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pending',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE int_mentor_sessions (
  id TEXT PRIMARY KEY,
  intern_id TEXT NOT NULL DEFAULT '',
  title TEXT NOT NULL DEFAULT '',
  date_text TEXT NOT NULL DEFAULT '',
  duration_text TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'completed',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE int_milestones (
  id TEXT PRIMARY KEY,
  intern_id TEXT NOT NULL DEFAULT '',
  title TEXT NOT NULL DEFAULT '',
  progress_pct INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'not started',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE int_skills (
  id TEXT PRIMARY KEY,
  intern_id TEXT NOT NULL DEFAULT '',
  name TEXT NOT NULL DEFAULT '',
  mastery TEXT NOT NULL DEFAULT 'learning',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE int_resources (
  id TEXT PRIMARY KEY,
  intern_id TEXT NOT NULL DEFAULT '',
  title TEXT NOT NULL DEFAULT '',
  kind TEXT NOT NULL DEFAULT 'link',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE int_evaluations (
  id TEXT PRIMARY KEY,
  intern_id TEXT NOT NULL DEFAULT '',
  kind TEXT NOT NULL DEFAULT 'self',
  score REAL NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'submitted',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE int_projects (
  id TEXT PRIMARY KEY,
  intern_id TEXT NOT NULL DEFAULT '',
  title TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT '',
  artifacts INTEGER NOT NULL DEFAULT 0,
  views INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'submitted',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE int_conversations (
  id TEXT PRIMARY KEY,
  intern_id TEXT NOT NULL DEFAULT '',
  name TEXT NOT NULL DEFAULT '',
  preview TEXT NOT NULL DEFAULT '',
  time_label TEXT NOT NULL DEFAULT '',
  unread INTEGER NOT NULL DEFAULT 0,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE int_threads (
  id TEXT PRIMARY KEY,
  conversation_id TEXT NOT NULL DEFAULT '',
  from_label TEXT NOT NULL DEFAULT '',
  body TEXT NOT NULL DEFAULT '',
  time_label TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX idx_int_tasks_intern ON int_tasks (intern_id);
CREATE INDEX idx_int_timesheets_intern ON int_timesheets (intern_id);
CREATE INDEX idx_int_milestones_intern ON int_milestones (intern_id);
CREATE INDEX idx_int_mentor_sessions_intern ON int_mentor_sessions (intern_id);
CREATE INDEX idx_int_conversations_intern ON int_conversations (intern_id);
CREATE INDEX idx_int_threads_conversation ON int_threads (conversation_id);