-- 0027_department.sql — Department dashboard (hub KPIs, reports, quality observations, faculty, enrollment cohorts, curriculum programs, calendar events, approvals queue).
CREATE TABLE dep_hub (
  id TEXT PRIMARY KEY,
  metric TEXT NOT NULL DEFAULT '',
  value_label TEXT NOT NULL DEFAULT '',
  delta TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE dep_reports (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  detail TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE dep_observations (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  detail TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE dep_faculty (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  courses INTEGER NOT NULL DEFAULT 0,
  students INTEGER NOT NULL DEFAULT 0,
  workload TEXT NOT NULL DEFAULT '',
  rating TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE dep_cohorts (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  enrolled INTEGER NOT NULL DEFAULT 0,
  capacity INTEGER NOT NULL DEFAULT 0,
  pct INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE dep_programs (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  version TEXT NOT NULL DEFAULT '',
  year TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE dep_events (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  date_label TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE dep_approvals (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  requester TEXT NOT NULL DEFAULT '',
  date_label TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX idx_dep_hub_sort ON dep_hub (sort_order);
CREATE INDEX idx_dep_reports_sort ON dep_reports (sort_order);
CREATE INDEX idx_dep_observations_sort ON dep_observations (sort_order);
CREATE INDEX idx_dep_faculty_sort ON dep_faculty (sort_order);
CREATE INDEX idx_dep_cohorts_sort ON dep_cohorts (sort_order);
CREATE INDEX idx_dep_programs_sort ON dep_programs (sort_order);
CREATE INDEX idx_dep_events_sort ON dep_events (sort_order);
CREATE INDEX idx_dep_approvals_sort ON dep_approvals (sort_order);
