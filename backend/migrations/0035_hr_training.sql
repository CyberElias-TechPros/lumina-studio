-- 0035_hr_training.sql — HR training (hub KPIs + learning programs).
CREATE TABLE hr_hub (
  id TEXT PRIMARY KEY,
  metric TEXT NOT NULL DEFAULT '',
  value_label TEXT NOT NULL DEFAULT '',
  delta TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE hr_programs (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  detail TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX idx_hr_hub_sort ON hr_hub (sort_order);
CREATE INDEX idx_hr_programs_sort ON hr_programs (sort_order);
