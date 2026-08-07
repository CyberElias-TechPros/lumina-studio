-- 0036_student_self.sql — Student self-service (attendance hub + records + policy, portfolio hub + projects + skills + CV files, reports hub + templates).
CREATE TABLE stu_att_hub (
  id TEXT PRIMARY KEY,
  metric TEXT NOT NULL DEFAULT '',
  value_label TEXT NOT NULL DEFAULT '',
  delta TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE stu_records (
  id TEXT PRIMARY KEY,
  date_label TEXT NOT NULL DEFAULT '',
  course TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE stu_policy (
  id TEXT PRIMARY KEY,
  rule TEXT NOT NULL DEFAULT '',
  value_label TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE stu_portfolio_hub (
  id TEXT PRIMARY KEY,
  metric TEXT NOT NULL DEFAULT '',
  value_label TEXT NOT NULL DEFAULT '',
  delta TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE stu_projects (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  detail TEXT NOT NULL DEFAULT '',
  tags TEXT NOT NULL DEFAULT '',
  featured INTEGER NOT NULL DEFAULT 0,
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE stu_skills (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  pct INTEGER NOT NULL DEFAULT 0,
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE stu_cv (
  id TEXT PRIMARY KEY,
  filename TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE stu_reports_hub (
  id TEXT PRIMARY KEY,
  metric TEXT NOT NULL DEFAULT '',
  value_label TEXT NOT NULL DEFAULT '',
  delta TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE stu_templates (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT '',
  usage TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX idx_stu_att_hub_sort ON stu_att_hub (sort_order);
CREATE INDEX idx_stu_records_sort ON stu_records (sort_order);
CREATE INDEX idx_stu_policy_sort ON stu_policy (sort_order);
CREATE INDEX idx_stu_portfolio_hub_sort ON stu_portfolio_hub (sort_order);
CREATE INDEX idx_stu_projects_sort ON stu_projects (sort_order);
CREATE INDEX idx_stu_skills_sort ON stu_skills (sort_order);
CREATE INDEX idx_stu_cv_sort ON stu_cv (sort_order);
CREATE INDEX idx_stu_reports_hub_sort ON stu_reports_hub (sort_order);
CREATE INDEX idx_stu_templates_sort ON stu_templates (sort_order);
