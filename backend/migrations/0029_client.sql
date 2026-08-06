-- 0029_client.sql — Client dashboard (support tickets, proposals, documents, contracts, invoices, messaging threads, project milestones, project tasks).
CREATE TABLE cli_tickets (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  reference TEXT NOT NULL DEFAULT '',
  date_label TEXT NOT NULL DEFAULT '',
  sla TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE cli_proposals (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  amount TEXT NOT NULL DEFAULT '',
  scope TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE cli_documents (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  type TEXT NOT NULL DEFAULT '',
  size TEXT NOT NULL DEFAULT '',
  updated TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE cli_contracts (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  reference TEXT NOT NULL DEFAULT '',
  amount TEXT NOT NULL DEFAULT '',
  date_label TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE cli_invoices (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  reference TEXT NOT NULL DEFAULT '',
  amount TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE cli_threads (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  from_label TEXT NOT NULL DEFAULT '',
  time_label TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE cli_milestones (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  date_label TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE cli_tasks (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  kind TEXT NOT NULL DEFAULT '',
  detail TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX idx_cli_tickets_sort ON cli_tickets (sort_order);
CREATE INDEX idx_cli_proposals_sort ON cli_proposals (sort_order);
CREATE INDEX idx_cli_documents_sort ON cli_documents (sort_order);
CREATE INDEX idx_cli_contracts_sort ON cli_contracts (sort_order);
CREATE INDEX idx_cli_invoices_sort ON cli_invoices (sort_order);
CREATE INDEX idx_cli_threads_sort ON cli_threads (sort_order);
CREATE INDEX idx_cli_milestones_sort ON cli_milestones (sort_order);
CREATE INDEX idx_cli_tasks_sort ON cli_tasks (sort_order);
