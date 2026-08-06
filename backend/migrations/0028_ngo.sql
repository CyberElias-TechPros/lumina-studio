-- 0028_ngo.sql — NGO partnership dashboard (hub KPIs, scholarship funds, community programs, program budget expense lines, volunteer teams, donation transactions, impact reports, partner metrics, messaging threads).
CREATE TABLE ngo_hub (
  id TEXT PRIMARY KEY,
  metric TEXT NOT NULL DEFAULT '',
  value_label TEXT NOT NULL DEFAULT '',
  delta TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE ngo_funds (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  scholars TEXT NOT NULL DEFAULT '',
  amount TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE ngo_programs (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  location TEXT NOT NULL DEFAULT '',
  beneficiaries TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE ngo_expenses (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  amount TEXT NOT NULL DEFAULT '',
  pct TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE ngo_teams (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  volunteers INTEGER NOT NULL DEFAULT 0,
  slots TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE ngo_transactions (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  amount TEXT NOT NULL DEFAULT '',
  date_label TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE ngo_reports (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  detail TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE ngo_metrics (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL DEFAULT '',
  value TEXT NOT NULL DEFAULT '',
  delta TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE ngo_threads (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  from_label TEXT NOT NULL DEFAULT '',
  time_label TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX idx_ngo_hub_sort ON ngo_hub (sort_order);
CREATE INDEX idx_ngo_funds_sort ON ngo_funds (sort_order);
CREATE INDEX idx_ngo_programs_sort ON ngo_programs (sort_order);
CREATE INDEX idx_ngo_expenses_sort ON ngo_expenses (sort_order);
CREATE INDEX idx_ngo_teams_sort ON ngo_teams (sort_order);
CREATE INDEX idx_ngo_transactions_sort ON ngo_transactions (sort_order);
CREATE INDEX idx_ngo_reports_sort ON ngo_reports (sort_order);
CREATE INDEX idx_ngo_metrics_sort ON ngo_metrics (sort_order);
CREATE INDEX idx_ngo_threads_sort ON ngo_threads (sort_order);
