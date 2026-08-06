-- 0022_product_marketing.sql — Product marketing dashboard (hub KPIs, GTM phases/tasks/gates, positioning statements, message house, competitive intel, feature comparison, launch calendar, readiness, market research studies + findings, messaging matrix, campaign briefs, monthly analytics).

CREATE TABLE pm_hub (
  id TEXT PRIMARY KEY,
  metric TEXT NOT NULL DEFAULT '',
  value_label TEXT NOT NULL DEFAULT '',
  delta TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE pm_phases (
  id TEXT PRIMARY KEY,
  launch TEXT NOT NULL DEFAULT '',
  phase TEXT NOT NULL DEFAULT '',
  pct INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE pm_tasks (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  owner TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE pm_gates (
  id TEXT PRIMARY KEY,
  phase TEXT NOT NULL DEFAULT '',
  gate TEXT NOT NULL DEFAULT '',
  owner TEXT NOT NULL DEFAULT '',
  due_label TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE pm_statements (
  id TEXT PRIMARY KEY,
  product TEXT NOT NULL DEFAULT '',
  statement TEXT NOT NULL DEFAULT '',
  audience TEXT NOT NULL DEFAULT '',
  pain TEXT NOT NULL DEFAULT '',
  benefit TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE pm_messagehouse (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL DEFAULT '',
  value TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE pm_competitors (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  focus TEXT NOT NULL DEFAULT '',
  strength TEXT NOT NULL DEFAULT '',
  weakness TEXT NOT NULL DEFAULT '',
  notes TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE pm_features (
  id TEXT PRIMARY KEY,
  capability TEXT NOT NULL DEFAULT '',
  cea INTEGER NOT NULL DEFAULT 1,
  skilledge INTEGER NOT NULL DEFAULT 0,
  aptbridge INTEGER NOT NULL DEFAULT 0,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE pm_launches (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  date_label TEXT NOT NULL DEFAULT '',
  phase TEXT NOT NULL DEFAULT '',
  owner TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE pm_readiness (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL DEFAULT '',
  pct INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE pm_studies (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  detail TEXT NOT NULL DEFAULT '',
  sample TEXT NOT NULL DEFAULT '',
  method TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE pm_findings (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  tag TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE pm_matrix (
  id TEXT PRIMARY KEY,
  product TEXT NOT NULL DEFAULT '',
  audience TEXT NOT NULL DEFAULT '',
  message TEXT NOT NULL DEFAULT '',
  proof TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE pm_briefs (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  objective TEXT NOT NULL DEFAULT '',
  audience TEXT NOT NULL DEFAULT '',
  channels TEXT NOT NULL DEFAULT '',
  metric TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE pm_months (
  id TEXT PRIMARY KEY,
  month TEXT NOT NULL DEFAULT '',
  roi TEXT NOT NULL DEFAULT '',
  win_rate TEXT NOT NULL DEFAULT '',
  pipeline TEXT NOT NULL DEFAULT '',
  pct INTEGER NOT NULL DEFAULT 0,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX idx_pm_hub_sort ON pm_hub (sort_order);
CREATE INDEX idx_pm_phases_sort ON pm_phases (sort_order);
CREATE INDEX idx_pm_tasks_sort ON pm_tasks (sort_order);
CREATE INDEX idx_pm_gates_sort ON pm_gates (sort_order);
CREATE INDEX idx_pm_statements_sort ON pm_statements (sort_order);
CREATE INDEX idx_pm_messagehouse_sort ON pm_messagehouse (sort_order);
CREATE INDEX idx_pm_competitors_sort ON pm_competitors (sort_order);
CREATE INDEX idx_pm_features_sort ON pm_features (sort_order);
CREATE INDEX idx_pm_launches_sort ON pm_launches (sort_order);
CREATE INDEX idx_pm_readiness_sort ON pm_readiness (sort_order);
CREATE INDEX idx_pm_studies_sort ON pm_studies (sort_order);
CREATE INDEX idx_pm_findings_sort ON pm_findings (sort_order);
CREATE INDEX idx_pm_matrix_sort ON pm_matrix (sort_order);
CREATE INDEX idx_pm_briefs_sort ON pm_briefs (sort_order);
CREATE INDEX idx_pm_months_sort ON pm_months (sort_order);