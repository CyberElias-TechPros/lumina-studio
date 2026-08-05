-- 0015_it.sql — IT support suite: tickets, knowledge base, assets, licenses, monitoring, maintenance, remote sessions, templates, accounts.

CREATE TABLE it_tickets (
  id TEXT PRIMARY KEY,
  subject TEXT NOT NULL DEFAULT '',
  reporter TEXT NOT NULL DEFAULT '',
  priority TEXT NOT NULL DEFAULT 'P3',
  sla TEXT NOT NULL DEFAULT '',
  elapsed TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'queued',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE it_ticket_events (
  id TEXT PRIMARY KEY,
  ticket_id TEXT NOT NULL DEFAULT '',
  event TEXT NOT NULL DEFAULT '',
  when_text TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX idx_it_events_ticket ON it_ticket_events (ticket_id);

CREATE TABLE it_articles (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  views INTEGER NOT NULL DEFAULT 0,
  helpful_pct INTEGER NOT NULL DEFAULT 0,
  category TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE it_assets (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  assigned_to TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'in use',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE it_licenses (
  id TEXT PRIMARY KEY,
  product TEXT NOT NULL DEFAULT '',
  seats INTEGER NOT NULL DEFAULT 0,
  used INTEGER NOT NULL DEFAULT 0,
  renews TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'active',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE it_services (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  uptime TEXT NOT NULL DEFAULT '',
  latency TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'healthy',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE it_windows (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  window_text TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'scheduled',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE it_sessions (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  detail TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'upcoming',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE it_templates (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  uses INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE it_accounts (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  role TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'active',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX idx_it_tickets_status ON it_tickets (status);
CREATE INDEX idx_it_assets_category ON it_assets (category);
