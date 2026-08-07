-- 0030_admin_systems.sql — Admin systems dashboard (hub KPIs, API keys, backups, integrations, rate-limit rules).
CREATE TABLE adm_hub (
  id TEXT PRIMARY KEY,
  metric TEXT NOT NULL DEFAULT '',
  value_label TEXT NOT NULL DEFAULT '',
  delta TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE adm_keys (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  scope TEXT NOT NULL DEFAULT '',
  last_used TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE adm_backups (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  detail TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE adm_integrations (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  detail TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE adm_rules (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  value_label TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX idx_adm_hub_sort ON adm_hub (sort_order);
CREATE INDEX idx_adm_keys_sort ON adm_keys (sort_order);
CREATE INDEX idx_adm_backups_sort ON adm_backups (sort_order);
CREATE INDEX idx_adm_integrations_sort ON adm_integrations (sort_order);
CREATE INDEX idx_adm_rules_sort ON adm_rules (sort_order);
