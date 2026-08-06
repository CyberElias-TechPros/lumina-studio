-- 0020_government.sql — Government/compliance dashboard (overview KPIs, calendar, changes, docs, institution facts, reports, messaging threads, integrity issues, audit reports, filings, training).

CREATE TABLE govt_overview (
  id TEXT PRIMARY KEY,
  metric TEXT NOT NULL DEFAULT '',
  value_label TEXT NOT NULL DEFAULT '',
  delta TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE govt_calendar (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  date_label TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE govt_changes (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  detail TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE govt_docs (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  version_label TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE govt_facts (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL DEFAULT '',
  value TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE govt_reports (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  detail TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE govt_threads (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  from_label TEXT NOT NULL DEFAULT '',
  time_label TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE govt_checks (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  detail TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE govt_audits (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  detail TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE govt_filings (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  detail TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE govt_courses (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  detail TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX idx_govt_overview_sort ON govt_overview (sort_order);
CREATE INDEX idx_govt_calendar_sort ON govt_calendar (sort_order);
CREATE INDEX idx_govt_changes_sort ON govt_changes (sort_order);
CREATE INDEX idx_govt_docs_sort ON govt_docs (sort_order);
CREATE INDEX idx_govt_facts_sort ON govt_facts (sort_order);
CREATE INDEX idx_govt_reports_sort ON govt_reports (sort_order);
CREATE INDEX idx_govt_threads_sort ON govt_threads (sort_order);
CREATE INDEX idx_govt_checks_sort ON govt_checks (sort_order);
CREATE INDEX idx_govt_audits_sort ON govt_audits (sort_order);
CREATE INDEX idx_govt_filings_sort ON govt_filings (sort_order);
CREATE INDEX idx_govt_courses_sort ON govt_courses (sort_order);