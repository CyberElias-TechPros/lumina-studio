-- 0031_director.sql — Director dashboard (hub KPIs, OKRs + key results, operations branches, report modules + saved reports).
CREATE TABLE dir_hub (
  id TEXT PRIMARY KEY,
  metric TEXT NOT NULL DEFAULT '',
  value_label TEXT NOT NULL DEFAULT '',
  delta TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE dir_okrs (
  id TEXT PRIMARY KEY,
  objective_label TEXT NOT NULL DEFAULT '',
  kr_label TEXT NOT NULL DEFAULT '',
  pct INTEGER NOT NULL DEFAULT 0,
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE dir_branches (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  utilization TEXT NOT NULL DEFAULT '',
  cost TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE dir_modules (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  detail TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE dir_saved (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  detail TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX idx_dir_hub_sort ON dir_hub (sort_order);
CREATE INDEX idx_dir_okrs_sort ON dir_okrs (sort_order);
CREATE INDEX idx_dir_branches_sort ON dir_branches (sort_order);
CREATE INDEX idx_dir_modules_sort ON dir_modules (sort_order);
CREATE INDEX idx_dir_saved_sort ON dir_saved (sort_order);
