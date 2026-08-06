-- 0021_behavioral.sql — Behavioral design dashboard (hub KPIs, interventions, flow designer flows + flow steps, nudge campaigns, A/B tests, analytics results, funnel stages, segments, habit programs, habit check-ins).

CREATE TABLE bd_hub (
  id TEXT PRIMARY KEY,
  metric TEXT NOT NULL DEFAULT '',
  value_label TEXT NOT NULL DEFAULT '',
  delta TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE bd_interventions (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  goal TEXT NOT NULL DEFAULT '',
  mechanism TEXT NOT NULL DEFAULT '',
  effort TEXT NOT NULL DEFAULT 'Low',
  evidence TEXT NOT NULL DEFAULT '',
  tests_run INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE bd_flows (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  stage INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE bd_flow_steps (
  id TEXT PRIMARY KEY,
  flow_id TEXT NOT NULL DEFAULT '',
  step_no INTEGER NOT NULL DEFAULT 1,
  title TEXT NOT NULL DEFAULT '',
  subtitle TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE bd_campaigns (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  trigger TEXT NOT NULL DEFAULT '',
  channel TEXT NOT NULL DEFAULT '',
  sends TEXT NOT NULL DEFAULT '',
  opt_out TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE bd_tests (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  variants INTEGER NOT NULL DEFAULT 2,
  sample_label TEXT NOT NULL DEFAULT '',
  lift_label TEXT NOT NULL DEFAULT '',
  sig_label TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE bd_results (
  id TEXT PRIMARY KEY,
  metric TEXT NOT NULL DEFAULT '',
  baseline TEXT NOT NULL DEFAULT '',
  change_label TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE bd_funnel_stages (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  users INTEGER NOT NULL DEFAULT 0,
  percent REAL NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE bd_segments (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  size INTEGER NOT NULL DEFAULT 0,
  traits TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE bd_programs (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  goal TEXT NOT NULL DEFAULT '',
  streak INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE bd_checkins (
  id TEXT PRIMARY KEY,
  learner TEXT NOT NULL DEFAULT '',
  cycle TEXT NOT NULL DEFAULT '',
  streak INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX idx_bd_hub_sort ON bd_hub (sort_order);
CREATE INDEX idx_bd_interventions_sort ON bd_interventions (sort_order);
CREATE INDEX idx_bd_flows_sort ON bd_flows (sort_order);
CREATE INDEX idx_bd_flow_steps_sort ON bd_flow_steps (sort_order);
CREATE INDEX idx_bd_campaigns_sort ON bd_campaigns (sort_order);
CREATE INDEX idx_bd_tests_sort ON bd_tests (sort_order);
CREATE INDEX idx_bd_results_sort ON bd_results (sort_order);
CREATE INDEX idx_bd_funnel_stages_sort ON bd_funnel_stages (sort_order);
CREATE INDEX idx_bd_segments_sort ON bd_segments (sort_order);
CREATE INDEX idx_bd_programs_sort ON bd_programs (sort_order);
CREATE INDEX idx_bd_checkins_sort ON bd_checkins (sort_order);