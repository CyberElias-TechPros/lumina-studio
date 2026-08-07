-- 0033_admissions_extras.sql — Admissions extras (document checks + KPIs, communication templates + KPIs).
CREATE TABLE adm_doc_hub (
  id TEXT PRIMARY KEY,
  metric TEXT NOT NULL DEFAULT '',
  value_label TEXT NOT NULL DEFAULT '',
  delta TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE adm_doc_checks (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  detail TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE adm_comm_hub (
  id TEXT PRIMARY KEY,
  metric TEXT NOT NULL DEFAULT '',
  value_label TEXT NOT NULL DEFAULT '',
  delta TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE adm_comm_templates (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  usage TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX idx_adm_doc_hub_sort ON adm_doc_hub (sort_order);
CREATE INDEX idx_adm_doc_checks_sort ON adm_doc_checks (sort_order);
CREATE INDEX idx_adm_comm_hub_sort ON adm_comm_hub (sort_order);
CREATE INDEX idx_adm_comm_templates_sort ON adm_comm_templates (sort_order);
