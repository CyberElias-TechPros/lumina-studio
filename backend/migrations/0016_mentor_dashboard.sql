-- 0016_mentor_dashboard.sql — Mentor dashboard: mentees, sessions, goals, requests, availability, resources, portfolio, skills, applications.

CREATE TABLE mnt_mentees (
  id TEXT PRIMARY KEY,
  mentor_id TEXT NOT NULL DEFAULT '',
  name TEXT NOT NULL DEFAULT '',
  track TEXT NOT NULL DEFAULT '',
  cohort TEXT NOT NULL DEFAULT '',
  since_date TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'active',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE mnt_sessions (
  id TEXT PRIMARY KEY,
  mentor_id TEXT NOT NULL DEFAULT '',
  mentee_id TEXT NOT NULL DEFAULT '',
  title TEXT NOT NULL DEFAULT '',
  datetime_text TEXT NOT NULL DEFAULT '',
  mode TEXT NOT NULL DEFAULT 'Video',
  status TEXT NOT NULL DEFAULT 'upcoming',
  notes TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE mnt_session_actions (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL DEFAULT '',
  title TEXT NOT NULL DEFAULT '',
  done INTEGER NOT NULL DEFAULT 0,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE mnt_goals (
  id TEXT PRIMARY KEY,
  mentee_id TEXT NOT NULL DEFAULT '',
  mentor_id TEXT NOT NULL DEFAULT '',
  title TEXT NOT NULL DEFAULT '',
  progress_pct INTEGER NOT NULL DEFAULT 0,
  due_date TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'on track',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE mnt_requests (
  id TEXT PRIMARY KEY,
  mentor_id TEXT NOT NULL DEFAULT '',
  requester_name TEXT NOT NULL DEFAULT '',
  track TEXT NOT NULL DEFAULT '',
  why TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'pending',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE mnt_availability (
  id TEXT PRIMARY KEY,
  mentor_id TEXT NOT NULL DEFAULT '',
  day TEXT NOT NULL DEFAULT '',
  hours TEXT NOT NULL DEFAULT '',
  is_open INTEGER NOT NULL DEFAULT 0,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE mnt_resources (
  id TEXT PRIMARY KEY,
  mentor_id TEXT NOT NULL DEFAULT '',
  group_title TEXT NOT NULL DEFAULT '',
  items_json TEXT NOT NULL DEFAULT '[]',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE mnt_portfolio (
  id TEXT PRIMARY KEY,
  mentee_id TEXT NOT NULL DEFAULT '',
  project_name TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT '',
  stars INTEGER NOT NULL DEFAULT 0,
  feedback TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE mnt_skills (
  id TEXT PRIMARY KEY,
  mentee_id TEXT NOT NULL DEFAULT '',
  skill_name TEXT NOT NULL DEFAULT '',
  endorsed INTEGER NOT NULL DEFAULT 0,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE mnt_applications (
  id TEXT PRIMARY KEY,
  mentee_id TEXT NOT NULL DEFAULT '',
  role TEXT NOT NULL DEFAULT '',
  company TEXT NOT NULL DEFAULT '',
  stage TEXT NOT NULL DEFAULT '',
  applied_date TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE mnt_conversations (
  id TEXT PRIMARY KEY,
  mentor_id TEXT NOT NULL DEFAULT '',
  name TEXT NOT NULL DEFAULT '',
  track TEXT NOT NULL DEFAULT '',
  preview TEXT NOT NULL DEFAULT '',
  time_label TEXT NOT NULL DEFAULT '',
  unread INTEGER NOT NULL DEFAULT 0,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE mnt_threads (
  id TEXT PRIMARY KEY,
  conversation_id TEXT NOT NULL DEFAULT '',
  from_label TEXT NOT NULL DEFAULT '',
  body TEXT NOT NULL DEFAULT '',
  time_label TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX idx_mnt_conversations_mentor ON mnt_conversations (mentor_id);
CREATE INDEX idx_mnt_threads_conversation ON mnt_threads (conversation_id);

CREATE INDEX idx_mnt_mentees_mentor ON mnt_mentees (mentor_id);
CREATE INDEX idx_mnt_sessions_mentor ON mnt_sessions (mentor_id);
CREATE INDEX idx_mnt_goals_mentor ON mnt_goals (mentor_id);
CREATE INDEX idx_mnt_requests_mentor ON mnt_requests (mentor_id);
CREATE INDEX idx_mnt_portfolio_mentee ON mnt_portfolio (mentee_id);
CREATE INDEX idx_mnt_skills_mentee ON mnt_skills (mentee_id);
CREATE INDEX idx_mnt_applications_mentee ON mnt_applications (mentee_id);
