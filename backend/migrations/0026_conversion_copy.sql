-- 0026_conversion_copy.sql — Conversion copy dashboard (hub KPIs, asset library, style-guide rules, email sequences, briefs, conversion funnel, ad sets, A/B tests, landing-page sections).
CREATE TABLE ccp_hub (
  id TEXT PRIMARY KEY,
  metric TEXT NOT NULL DEFAULT '',
  value_label TEXT NOT NULL DEFAULT '',
  delta TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE ccp_assets (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT '',
  variants INTEGER NOT NULL DEFAULT 0,
  last_used TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE ccp_rules (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT '',
  detail TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE ccp_sequences (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  emails INTEGER NOT NULL DEFAULT 0,
  open_rate TEXT NOT NULL DEFAULT '',
  click_rate TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE ccp_briefs (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  requester TEXT NOT NULL DEFAULT '',
  date_label TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE ccp_analytics (
  id TEXT PRIMARY KEY,
  stage TEXT NOT NULL DEFAULT '',
  visits TEXT NOT NULL DEFAULT '',
  conversion TEXT NOT NULL DEFAULT '',
  delta TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE ccp_ads (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  channel TEXT NOT NULL DEFAULT '',
  ctr TEXT NOT NULL DEFAULT '',
  variants INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE ccp_tests (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  result TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE ccp_sections (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  copy TEXT NOT NULL DEFAULT '',
  conversion TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX idx_ccp_hub_sort ON ccp_hub (sort_order);
CREATE INDEX idx_ccp_assets_sort ON ccp_assets (sort_order);
CREATE INDEX idx_ccp_rules_sort ON ccp_rules (sort_order);
CREATE INDEX idx_ccp_sequences_sort ON ccp_sequences (sort_order);
CREATE INDEX idx_ccp_briefs_sort ON ccp_briefs (sort_order);
CREATE INDEX idx_ccp_analytics_sort ON ccp_analytics (sort_order);
CREATE INDEX idx_ccp_ads_sort ON ccp_ads (sort_order);
CREATE INDEX idx_ccp_tests_sort ON ccp_tests (sort_order);
CREATE INDEX idx_ccp_sections_sort ON ccp_sections (sort_order);
