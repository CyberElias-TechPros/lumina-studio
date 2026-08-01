-- Phase 4: recruitment, marketing, design, localization suites (merged from _p4_*.sql).
CREATE TABLE job_postings (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  applicants INTEGER NOT NULL DEFAULT 0,
  views INTEGER NOT NULL DEFAULT 0,
  posted TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'active',
  detail TEXT NOT NULL DEFAULT '',
  tone TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE pipeline_candidates (
  id TEXT PRIMARY KEY,
  job_id TEXT NOT NULL DEFAULT '',
  name TEXT NOT NULL DEFAULT '',
  stage TEXT NOT NULL DEFAULT '',
  detail TEXT NOT NULL DEFAULT '',
  score INTEGER NOT NULL DEFAULT 0,
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX idx_pipeline_candidates_job ON pipeline_candidates(job_id);

CREATE TABLE interviews (
  id TEXT PRIMARY KEY,
  candidate TEXT NOT NULL DEFAULT '',
  role TEXT NOT NULL DEFAULT '',
  date TEXT NOT NULL DEFAULT '',
  mode TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'pending',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE talent_candidates (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  program TEXT NOT NULL DEFAULT '',
  score INTEGER NOT NULL DEFAULT 0,
  stage TEXT NOT NULL DEFAULT '',
  match INTEGER NOT NULL DEFAULT 0,
  skills TEXT NOT NULL DEFAULT '[]',
  available TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE marketing_kpis (
  id TEXT PRIMARY KEY,
  page TEXT NOT NULL DEFAULT '',
  label TEXT NOT NULL DEFAULT '',
  value TEXT NOT NULL DEFAULT '',
  delta TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE campaigns (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  channel TEXT NOT NULL DEFAULT '',
  spend INTEGER NOT NULL DEFAULT 0,
  leads INTEGER NOT NULL DEFAULT 0,
  roas REAL NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'draft',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE email_campaigns (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  recipients INTEGER NOT NULL DEFAULT 0,
  open_rate INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'draft',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE social_posts (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  channel TEXT NOT NULL DEFAULT '',
  date TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'draft',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE landing_pages (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  conversion REAL NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'draft',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE seo_keywords (
  id TEXT PRIMARY KEY,
  keyword TEXT NOT NULL DEFAULT '',
  position INTEGER NOT NULL DEFAULT 0,
  delta TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE content_calendar (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  channel TEXT NOT NULL DEFAULT '',
  date TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'draft',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE leads (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  score INTEGER NOT NULL DEFAULT 0,
  detail TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE marketing_reports (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  published TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE funnel_stages (
  id TEXT PRIMARY KEY,
  stage TEXT NOT NULL DEFAULT '',
  value INTEGER NOT NULL DEFAULT 0,
  pct REAL NOT NULL DEFAULT 0,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE design_components (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  detail TEXT NOT NULL DEFAULT '',
  states INTEGER NOT NULL DEFAULT 0,
  usage INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'draft',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX idx_design_components_status ON design_components(status);

CREATE TABLE design_flows (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  steps_count INTEGER NOT NULL DEFAULT 0,
  decisions_count INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'draft',
  flow_steps TEXT NOT NULL DEFAULT '[]',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX idx_design_flows_status ON design_flows(status);

CREATE TABLE design_prototypes (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  version TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'draft',
  feedback_count INTEGER NOT NULL DEFAULT 0,
  owner TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX idx_design_prototypes_status ON design_prototypes(status);

CREATE TABLE design_tokens (
  id TEXT PRIMARY KEY,
  kind TEXT NOT NULL DEFAULT 'color',
  name TEXT NOT NULL,
  value TEXT NOT NULL DEFAULT '',
  hex TEXT NOT NULL DEFAULT '',
  family TEXT NOT NULL DEFAULT '',
  deprecated INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'Active',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX idx_design_tokens_kind ON design_tokens(kind);

CREATE TABLE design_versions (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  change TEXT NOT NULL DEFAULT '',
  editor TEXT NOT NULL DEFAULT '',
  "when" TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'Stable',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX idx_design_versions_status ON design_versions(status);

CREATE TABLE collaboration_threads (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  detail TEXT NOT NULL DEFAULT '',
  author TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'Open',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX idx_collaboration_threads_status ON collaboration_threads(status);

CREATE TABLE design_exports (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  format TEXT NOT NULL DEFAULT '',
  size TEXT NOT NULL DEFAULT '',
  owner TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'Queued',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX idx_design_exports_status ON design_exports(status);

CREATE TABLE system_components (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  variants INTEGER NOT NULL DEFAULT 0,
  states INTEGER NOT NULL DEFAULT 0,
  usage INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'draft',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX idx_system_components_status ON system_components(status);

CREATE TABLE design_kpis (
  id TEXT PRIMARY KEY,
  value INTEGER NOT NULL DEFAULT 0,
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX idx_design_kpis_sort ON design_kpis(sort_order);

CREATE TABLE localization_projects (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  path TEXT NOT NULL DEFAULT '',
  tone TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE glossary_terms (
  id TEXT PRIMARY KEY,
  term TEXT NOT NULL DEFAULT '',
  definition TEXT NOT NULL DEFAULT '',
  usage TEXT NOT NULL DEFAULT '',
  cultural_notes TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'In review',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE style_guides (
  id TEXT PRIMARY KEY,
  market TEXT NOT NULL DEFAULT '',
  dos TEXT NOT NULL DEFAULT '[]',
  donts TEXT NOT NULL DEFAULT '[]',
  status TEXT NOT NULL DEFAULT 'In review',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE translation_memory (
  id TEXT PRIMARY KEY,
  source TEXT NOT NULL DEFAULT '',
  target TEXT NOT NULL DEFAULT '',
  locale TEXT NOT NULL DEFAULT '',
  match_pct INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'Draft',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX idx_translation_memory_locale ON translation_memory(locale);

CREATE TABLE dialect_groups (
  id TEXT PRIMARY KEY,
  group_name TEXT NOT NULL DEFAULT '',
  variants TEXT NOT NULL DEFAULT '[]',
  coverage INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'Draft',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX idx_dialect_groups_status ON dialect_groups(status);

CREATE TABLE copy_variants (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  code TEXT NOT NULL DEFAULT '',
  tone_notes TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'Draft',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX idx_copy_variants_code ON copy_variants(code);

CREATE TABLE localization_markets (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  conversion TEXT NOT NULL DEFAULT '',
  engagement TEXT NOT NULL DEFAULT '',
  pct INTEGER NOT NULL DEFAULT 0,
  trend TEXT NOT NULL DEFAULT '',
  tone TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE preview_blocks (
  id TEXT PRIMARY KEY,
  en TEXT NOT NULL DEFAULT '',
  yo TEXT NOT NULL DEFAULT '',
  en_sub TEXT NOT NULL DEFAULT '',
  yo_sub TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE localization_stats (
  id TEXT PRIMARY KEY,
  page TEXT NOT NULL DEFAULT '',
  label TEXT NOT NULL DEFAULT '',
  value TEXT NOT NULL DEFAULT '',
  delta TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX idx_localization_stats_page ON localization_stats(page);
