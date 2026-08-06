-- 0024_dev.sql — Dev dashboard (hub KPIs, API playground endpoints, deployments, git PRs, monitoring errors, tasks, dependencies, code reviews, env vars, job queues, docs). Feature flags already served via /v1/flags.

CREATE TABLE dev_hub (
  id TEXT PRIMARY KEY,
  metric TEXT NOT NULL DEFAULT '',
  value_label TEXT NOT NULL DEFAULT '',
  delta TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE dev_endpoints (
  id TEXT PRIMARY KEY,
  endpoint TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE dev_deploys (
  id TEXT PRIMARY KEY,
  version_label TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT '',
  time_label TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE dev_prs (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  branch TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE dev_errors (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  count_label TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE dev_tasks (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  detail TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE dev_deps (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  version TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE dev_reviews (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  detail TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE dev_vars (
  id TEXT PRIMARY KEY,
  key TEXT NOT NULL DEFAULT '',
  value TEXT NOT NULL DEFAULT '',
  env TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE dev_queues (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  detail TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE dev_docs (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  updated_label TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX idx_dev_hub_sort ON dev_hub (sort_order);
CREATE INDEX idx_dev_endpoints_sort ON dev_endpoints (sort_order);
CREATE INDEX idx_dev_deploys_sort ON dev_deploys (sort_order);
CREATE INDEX idx_dev_prs_sort ON dev_prs (sort_order);
CREATE INDEX idx_dev_errors_sort ON dev_errors (sort_order);
CREATE INDEX idx_dev_tasks_sort ON dev_tasks (sort_order);
CREATE INDEX idx_dev_deps_sort ON dev_deps (sort_order);
CREATE INDEX idx_dev_reviews_sort ON dev_reviews (sort_order);
CREATE INDEX idx_dev_vars_sort ON dev_vars (sort_order);
CREATE INDEX idx_dev_queues_sort ON dev_queues (sort_order);
CREATE INDEX idx_dev_docs_sort ON dev_docs (sort_order);