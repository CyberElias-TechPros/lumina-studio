-- 0025_growth.sql — Growth dashboard (hub KPIs, simulator scenarios, funnel stages, experiments, cohort retention grid, channel attribution, referral campaigns, SEO keyword clusters).
CREATE TABLE grw_hub (
  id TEXT PRIMARY KEY,
  metric TEXT NOT NULL DEFAULT '',
  value_label TEXT NOT NULL DEFAULT '',
  delta TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE grw_simulations (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  spend TEXT NOT NULL DEFAULT '',
  conversion_pct INTEGER NOT NULL DEFAULT 0,
  learners INTEGER NOT NULL DEFAULT 0,
  cac TEXT NOT NULL DEFAULT '',
  revenue TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE grw_funnel (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  visitors INTEGER NOT NULL DEFAULT 0,
  percentage INTEGER NOT NULL DEFAULT 0,
  delta TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE grw_experiments (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  hypothesis TEXT NOT NULL DEFAULT '',
  variant TEXT NOT NULL DEFAULT '',
  result TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE grw_cohorts (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  w1 INTEGER,
  w2 INTEGER,
  w3 INTEGER,
  w4 INTEGER,
  w5 INTEGER,
  w6 INTEGER,
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE grw_channels (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  cac TEXT NOT NULL DEFAULT '',
  ltv TEXT NOT NULL DEFAULT '',
  roas TEXT NOT NULL DEFAULT '',
  spend TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE grw_referrals (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  reward TEXT NOT NULL DEFAULT '',
  invites INTEGER NOT NULL DEFAULT 0,
  conversions INTEGER NOT NULL DEFAULT 0,
  paid_out TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE grw_seo (
  id TEXT PRIMARY KEY,
  keyword TEXT NOT NULL DEFAULT '',
  volume INTEGER NOT NULL DEFAULT 0,
  rank TEXT NOT NULL DEFAULT '',
  trend TEXT NOT NULL DEFAULT '',
  priority TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX idx_grw_hub_sort ON grw_hub (sort_order);
CREATE INDEX idx_grw_simulations_sort ON grw_simulations (sort_order);
CREATE INDEX idx_grw_funnel_sort ON grw_funnel (sort_order);
CREATE INDEX idx_grw_experiments_sort ON grw_experiments (sort_order);
CREATE INDEX idx_grw_cohorts_sort ON grw_cohorts (sort_order);
CREATE INDEX idx_grw_channels_sort ON grw_channels (sort_order);
CREATE INDEX idx_grw_referrals_sort ON grw_referrals (sort_order);
CREATE INDEX idx_grw_seo_sort ON grw_seo (sort_order);
