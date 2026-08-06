-- 0018_supplier_partner.sql — Supplier dashboard (orders, deliveries, invoices, performance, certs, conversations) and Partner dashboard (agreements, collaborations, referrals, resources, reports, conversations).

CREATE TABLE sup_orders (
  id TEXT PRIMARY KEY,
  supplier_id TEXT NOT NULL DEFAULT '',
  ref TEXT NOT NULL DEFAULT '',
  items TEXT NOT NULL DEFAULT '',
  amount INTEGER NOT NULL DEFAULT 0,
  due_label TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'pending',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE sup_deliveries (
  id TEXT PRIMARY KEY,
  supplier_id TEXT NOT NULL DEFAULT '',
  po_label TEXT NOT NULL DEFAULT '',
  when_label TEXT NOT NULL DEFAULT '',
  to_label TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'scheduled',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE sup_invoices (
  id TEXT PRIMARY KEY,
  supplier_id TEXT NOT NULL DEFAULT '',
  ref TEXT NOT NULL DEFAULT '',
  amount INTEGER NOT NULL DEFAULT 0,
  issued_label TEXT NOT NULL DEFAULT '',
  paid_label TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'awaiting payment',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE sup_performance (
  id TEXT PRIMARY KEY,
  supplier_id TEXT NOT NULL DEFAULT '',
  metric TEXT NOT NULL DEFAULT '',
  value_label TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE sup_certs (
  id TEXT PRIMARY KEY,
  supplier_id TEXT NOT NULL DEFAULT '',
  title TEXT NOT NULL DEFAULT '',
  detail TEXT NOT NULL DEFAULT '',
  verified INTEGER NOT NULL DEFAULT 1,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE sup_conversations (
  id TEXT PRIMARY KEY,
  supplier_id TEXT NOT NULL DEFAULT '',
  name TEXT NOT NULL DEFAULT '',
  preview TEXT NOT NULL DEFAULT '',
  time_label TEXT NOT NULL DEFAULT '',
  unread INTEGER NOT NULL DEFAULT 0,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE sup_threads (
  id TEXT PRIMARY KEY,
  conversation_id TEXT NOT NULL DEFAULT '',
  from_label TEXT NOT NULL DEFAULT '',
  body TEXT NOT NULL DEFAULT '',
  time_label TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE ptn_agreements (
  id TEXT PRIMARY KEY,
  partner_id TEXT NOT NULL DEFAULT '',
  title TEXT NOT NULL DEFAULT '',
  detail TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'draft',
  renew_label TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE ptn_collaborations (
  id TEXT PRIMARY KEY,
  partner_id TEXT NOT NULL DEFAULT '',
  title TEXT NOT NULL DEFAULT '',
  detail TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'in discussion',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE ptn_referrals (
  id TEXT PRIMARY KEY,
  partner_id TEXT NOT NULL DEFAULT '',
  name TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'contacted',
  value_label TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE ptn_resources (
  id TEXT PRIMARY KEY,
  partner_id TEXT NOT NULL DEFAULT '',
  title TEXT NOT NULL DEFAULT '',
  kind TEXT NOT NULL DEFAULT 'logo',
  detail TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE ptn_reports (
  id TEXT PRIMARY KEY,
  partner_id TEXT NOT NULL DEFAULT '',
  title TEXT NOT NULL DEFAULT '',
  detail TEXT NOT NULL DEFAULT '',
  kind TEXT NOT NULL DEFAULT 'report',
  value_label TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE ptn_conversations (
  id TEXT PRIMARY KEY,
  partner_id TEXT NOT NULL DEFAULT '',
  name TEXT NOT NULL DEFAULT '',
  preview TEXT NOT NULL DEFAULT '',
  time_label TEXT NOT NULL DEFAULT '',
  unread INTEGER NOT NULL DEFAULT 0,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE ptn_threads (
  id TEXT PRIMARY KEY,
  conversation_id TEXT NOT NULL DEFAULT '',
  from_label TEXT NOT NULL DEFAULT '',
  body TEXT NOT NULL DEFAULT '',
  time_label TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX idx_sup_orders_supplier ON sup_orders (supplier_id);
CREATE INDEX idx_sup_deliveries_supplier ON sup_deliveries (supplier_id);
CREATE INDEX idx_sup_invoices_supplier ON sup_invoices (supplier_id);
CREATE INDEX idx_sup_conversations_supplier ON sup_conversations (supplier_id);
CREATE INDEX idx_sup_threads_conversation ON sup_threads (conversation_id);
CREATE INDEX idx_ptn_agreements_partner ON ptn_agreements (partner_id);
CREATE INDEX idx_ptn_collaborations_partner ON ptn_collaborations (partner_id);
CREATE INDEX idx_ptn_referrals_partner ON ptn_referrals (partner_id);
CREATE INDEX idx_ptn_conversations_partner ON ptn_conversations (partner_id);
CREATE INDEX idx_ptn_threads_conversation ON ptn_threads (conversation_id);
