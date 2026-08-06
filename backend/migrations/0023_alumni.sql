-- 0023_alumni.sql — Alumni dashboard (hub KPIs, events, network directory, success stories + milestones, profile jobs/achievements/skills, mentorship commitments, give-back ways + impact).

CREATE TABLE alu_hub (
  id TEXT PRIMARY KEY,
  metric TEXT NOT NULL DEFAULT '',
  value_label TEXT NOT NULL DEFAULT '',
  delta TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE alu_events (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  date_label TEXT NOT NULL DEFAULT '',
  location TEXT NOT NULL DEFAULT '',
  going INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE alu_members (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  cohort TEXT NOT NULL DEFAULT '',
  role_label TEXT NOT NULL DEFAULT '',
  city TEXT NOT NULL DEFAULT '',
  conn INTEGER NOT NULL DEFAULT 0,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE alu_stories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  cohort TEXT NOT NULL DEFAULT '',
  company TEXT NOT NULL DEFAULT '',
  role TEXT NOT NULL DEFAULT '',
  excerpt TEXT NOT NULL DEFAULT '',
  initials TEXT NOT NULL DEFAULT '',
  tone TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE alu_milestones (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL DEFAULT '',
  value TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE alu_jobs (
  id TEXT PRIMARY KEY,
  role TEXT NOT NULL DEFAULT '',
  company TEXT NOT NULL DEFAULT '',
  period TEXT NOT NULL DEFAULT '',
  place TEXT NOT NULL DEFAULT '',
  current INTEGER NOT NULL DEFAULT 0,
  description TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE alu_achievements (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  org TEXT NOT NULL DEFAULT '',
  year TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE alu_skills (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE alu_commitments (
  id TEXT PRIMARY KEY,
  mentee TEXT NOT NULL DEFAULT '',
  track TEXT NOT NULL DEFAULT '',
  cadence TEXT NOT NULL DEFAULT '',
  next_label TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE alu_ways (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  detail TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE alu_impact (
  id TEXT PRIMARY KEY,
  value TEXT NOT NULL DEFAULT '',
  label TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX idx_alu_hub_sort ON alu_hub (sort_order);
CREATE INDEX idx_alu_events_sort ON alu_events (sort_order);
CREATE INDEX idx_alu_members_sort ON alu_members (sort_order);
CREATE INDEX idx_alu_stories_sort ON alu_stories (sort_order);
CREATE INDEX idx_alu_milestones_sort ON alu_milestones (sort_order);
CREATE INDEX idx_alu_jobs_sort ON alu_jobs (sort_order);
CREATE INDEX idx_alu_achievements_sort ON alu_achievements (sort_order);
CREATE INDEX idx_alu_skills_sort ON alu_skills (sort_order);
CREATE INDEX idx_alu_commitments_sort ON alu_commitments (sort_order);
CREATE INDEX idx_alu_ways_sort ON alu_ways (sort_order);
CREATE INDEX idx_alu_impact_sort ON alu_impact (sort_order);