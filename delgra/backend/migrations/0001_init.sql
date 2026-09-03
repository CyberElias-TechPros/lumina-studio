-- Delgra Ledger — initial schema (Cloudflare D1 / SQLite)
--
-- CONVENTIONS
--   * Money is stored as INTEGER kobo (1 NGN = 100 kobo). Floats are never used
--     for currency anywhere in this system; all arithmetic is integer.
--   * Timestamps are ISO-8601 UTC strings (TEXT) so they sort lexicographically.
--   * `status` columns hold only *user-driven* lifecycle states. Derived states
--     (e.g. invoice "overdue") are computed from dates at read time and are never
--     persisted, which removes the stale-status class of bug.
--   * Single-tenant by design: one database == one business. Users are staff of
--     that business. See docs/adr/0001-single-tenant.md.

PRAGMA foreign_keys = ON;

-- ---------------------------------------------------------------- users/auth

CREATE TABLE IF NOT EXISTS users (
  id              TEXT PRIMARY KEY,
  name            TEXT NOT NULL,
  email           TEXT NOT NULL UNIQUE COLLATE NOCASE,
  password_hash   TEXT NOT NULL,
  role            TEXT NOT NULL DEFAULT 'staff'
                    CHECK (role IN ('owner','manager','staff','viewer')),
  phone           TEXT,
  is_active       INTEGER NOT NULL DEFAULT 1,
  must_change_password INTEGER NOT NULL DEFAULT 0,
  failed_attempts INTEGER NOT NULL DEFAULT 0,
  locked_until    TEXT,
  last_login_at   TEXT,
  created_at      TEXT NOT NULL,
  updated_at      TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS sessions (
  token_hash  TEXT PRIMARY KEY,
  user_id     TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at  TEXT NOT NULL,
  expires_at  TEXT NOT NULL,
  last_seen_at TEXT NOT NULL,
  user_agent  TEXT,
  ip          TEXT
);
CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_expires ON sessions(expires_at);

-- ------------------------------------------------------------- business setup

-- Exactly one row (id = 'business'). Holds the printable invoice identity.
CREATE TABLE IF NOT EXISTS business (
  id                  TEXT PRIMARY KEY DEFAULT 'business',
  name                TEXT NOT NULL DEFAULT 'DELGRA LTD',
  legal_name          TEXT,
  rc_number           TEXT,          -- CAC registration number
  tin                 TEXT,          -- tax identification number
  address_line1       TEXT,
  address_line2       TEXT,
  city                TEXT,
  state               TEXT,
  country             TEXT DEFAULT 'Nigeria',
  phone               TEXT,
  email               TEXT,
  website             TEXT,
  logo_key            TEXT,          -- R2 object key
  currency            TEXT NOT NULL DEFAULT 'NGN',
  currency_symbol     TEXT NOT NULL DEFAULT '₦',
  -- numbering: {PREFIX}-{YEAR}-{SEQ} e.g. DEL-2026-TF-01 -> prefix/seq below
  invoice_prefix      TEXT NOT NULL DEFAULT 'DEL',
  invoice_series      TEXT NOT NULL DEFAULT 'TF',
  waybill_prefix      TEXT NOT NULL DEFAULT 'WB',
  waybill_series      TEXT NOT NULL DEFAULT 'TF',
  purchase_prefix     TEXT NOT NULL DEFAULT 'PO',
  payment_terms_days  INTEGER NOT NULL DEFAULT 14,
  -- tax is OFF by default (owner decision) but stays configurable
  tax_enabled         INTEGER NOT NULL DEFAULT 0,
  tax_rate_bp         INTEGER NOT NULL DEFAULT 750,   -- basis points: 750 = 7.50%
  tax_label           TEXT NOT NULL DEFAULT 'VAT',
  -- bank block printed on documents
  bank_name           TEXT,
  bank_account_name   TEXT,
  bank_account_number TEXT,
  invoice_notes       TEXT,
  invoice_footer      TEXT,
  created_at          TEXT NOT NULL,
  updated_at          TEXT NOT NULL
);

-- Monotonic per-key sequence used for document numbers. Kept in its own table
-- so numbering is atomic inside a transaction and survives edits to `business`.
CREATE TABLE IF NOT EXISTS counters (
  key        TEXT PRIMARY KEY,
  value      INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL
);

-- --------------------------------------------------------------- directories

CREATE TABLE IF NOT EXISTS customers (
  id             TEXT PRIMARY KEY,
  name           TEXT NOT NULL,
  contact_person TEXT,
  email          TEXT,
  phone          TEXT,
  alt_phone      TEXT,
  address_line1  TEXT,
  city           TEXT,
  state          TEXT,
  rc_number      TEXT,
  tax_id         TEXT,
  customer_type  TEXT NOT NULL DEFAULT 'individual'
                   CHECK (customer_type IN ('individual','company','government')),
  notes          TEXT,
  is_active      INTEGER NOT NULL DEFAULT 1,
  created_at     TEXT NOT NULL,
  updated_at     TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_customers_name ON customers(name);
CREATE INDEX IF NOT EXISTS idx_customers_active ON customers(is_active);

CREATE TABLE IF NOT EXISTS suppliers (
  id             TEXT PRIMARY KEY,
  name           TEXT NOT NULL,
  contact_person TEXT,
  email          TEXT,
  phone          TEXT,
  address_line1  TEXT,
  city           TEXT,
  state          TEXT,
  notes          TEXT,
  is_active      INTEGER NOT NULL DEFAULT 1,
  created_at     TEXT NOT NULL,
  updated_at     TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_suppliers_name ON suppliers(name);

-- ----------------------------------------------------------------- inventory

-- `condition_grade` models the fairly-used equipment trade (A = like new ... D = for parts).
CREATE TABLE IF NOT EXISTS products (
  id              TEXT PRIMARY KEY,
  sku             TEXT NOT NULL UNIQUE COLLATE NOCASE,
  name            TEXT NOT NULL,
  description     TEXT,
  category        TEXT,
  condition_grade TEXT NOT NULL DEFAULT 'new'
                    CHECK (condition_grade IN ('new','grade_a','grade_b','grade_c','grade_d')),
  unit            TEXT NOT NULL DEFAULT 'unit',
  cost_price      INTEGER NOT NULL DEFAULT 0,   -- kobo
  sale_price      INTEGER NOT NULL DEFAULT 0,   -- kobo
  quantity        INTEGER NOT NULL DEFAULT 0,
  reorder_level   INTEGER NOT NULL DEFAULT 0,
  track_stock     INTEGER NOT NULL DEFAULT 1,
  is_active       INTEGER NOT NULL DEFAULT 1,
  created_at      TEXT NOT NULL,
  updated_at      TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_products_name ON products(name);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);

-- Append-only ledger of stock changes. `products.quantity` is the cached sum;
-- the ledger is the source of truth for how it got there.
CREATE TABLE IF NOT EXISTS stock_movements (
  id             TEXT PRIMARY KEY,
  product_id     TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  direction      TEXT NOT NULL CHECK (direction IN ('in','out','adjust')),
  quantity       INTEGER NOT NULL,           -- always positive
  unit_cost      INTEGER NOT NULL DEFAULT 0, -- kobo, for 'in'
  reference_type TEXT,                       -- purchase|invoice|manual|return
  reference_id   TEXT,
  note           TEXT,
  created_by     TEXT REFERENCES users(id) ON DELETE SET NULL,
  created_at     TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_stock_product ON stock_movements(product_id);
CREATE INDEX IF NOT EXISTS idx_stock_created ON stock_movements(created_at);

-- ----------------------------------------------------------------- purchases

CREATE TABLE IF NOT EXISTS purchases (
  id          TEXT PRIMARY KEY,
  number      TEXT NOT NULL UNIQUE,
  supplier_id TEXT REFERENCES suppliers(id) ON DELETE SET NULL,
  order_date  TEXT NOT NULL,
  due_date    TEXT,
  status      TEXT NOT NULL DEFAULT 'draft'
                CHECK (status IN ('draft','ordered','received','paid','cancelled')),
  subtotal    INTEGER NOT NULL DEFAULT 0,   -- kobo
  discount    INTEGER NOT NULL DEFAULT 0,   -- kobo
  shipping    INTEGER NOT NULL DEFAULT 0,   -- kobo
  total       INTEGER NOT NULL DEFAULT 0,   -- kobo
  paid_amount INTEGER NOT NULL DEFAULT 0,   -- kobo
  notes       TEXT,
  created_by  TEXT REFERENCES users(id) ON DELETE SET NULL,
  created_at  TEXT NOT NULL,
  updated_at  TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_purchases_supplier ON purchases(supplier_id);
CREATE INDEX IF NOT EXISTS idx_purchases_status ON purchases(status);

CREATE TABLE IF NOT EXISTS purchase_items (
  id          TEXT PRIMARY KEY,
  purchase_id TEXT NOT NULL REFERENCES purchases(id) ON DELETE CASCADE,
  product_id  TEXT REFERENCES products(id) ON DELETE SET NULL,
  description TEXT NOT NULL,
  quantity    INTEGER NOT NULL CHECK (quantity > 0),
  unit_cost   INTEGER NOT NULL DEFAULT 0,   -- kobo
  amount      INTEGER NOT NULL DEFAULT 0,   -- kobo
  sort_order  INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_purchase_items_parent ON purchase_items(purchase_id);

CREATE TABLE IF NOT EXISTS purchase_payments (
  id          TEXT PRIMARY KEY,
  purchase_id TEXT NOT NULL REFERENCES purchases(id) ON DELETE CASCADE,
  amount      INTEGER NOT NULL CHECK (amount > 0),  -- kobo
  method      TEXT NOT NULL DEFAULT 'transfer',
  reference   TEXT,
  paid_at     TEXT NOT NULL,
  note        TEXT,
  created_by  TEXT REFERENCES users(id) ON DELETE SET NULL,
  created_at  TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_purchase_payments_parent ON purchase_payments(purchase_id);

-- ------------------------------------------------------------------ invoices

CREATE TABLE IF NOT EXISTS invoices (
  id              TEXT PRIMARY KEY,
  number          TEXT NOT NULL UNIQUE,
  customer_id     TEXT NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
  issue_date      TEXT NOT NULL,
  due_date        TEXT NOT NULL,
  status          TEXT NOT NULL DEFAULT 'draft'
                    CHECK (status IN ('draft','sent','partial','paid','void')),
  subtotal        INTEGER NOT NULL DEFAULT 0,   -- kobo
  discount        INTEGER NOT NULL DEFAULT 0,   -- kobo
  tax_enabled     INTEGER NOT NULL DEFAULT 0,
  tax_rate_bp     INTEGER NOT NULL DEFAULT 0,   -- basis points
  tax_amount      INTEGER NOT NULL DEFAULT 0,   -- kobo
  shipping        INTEGER NOT NULL DEFAULT 0,   -- kobo
  total           INTEGER NOT NULL DEFAULT 0,   -- kobo
  paid_amount     INTEGER NOT NULL DEFAULT 0,   -- kobo
  currency        TEXT NOT NULL DEFAULT 'NGN',
  po_number       TEXT,
  notes           TEXT,
  terms           TEXT,
  void_reason     TEXT,
  voided_at       TEXT,
  created_by      TEXT REFERENCES users(id) ON DELETE SET NULL,
  created_at      TEXT NOT NULL,
  updated_at      TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_invoices_customer ON invoices(customer_id);
CREATE INDEX IF NOT EXISTS idx_invoices_status ON invoices(status);
CREATE INDEX IF NOT EXISTS idx_invoices_issue_date ON invoices(issue_date);
CREATE INDEX IF NOT EXISTS idx_invoices_due_date ON invoices(due_date);

CREATE TABLE IF NOT EXISTS invoice_items (
  id          TEXT PRIMARY KEY,
  invoice_id  TEXT NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
  product_id  TEXT REFERENCES products(id) ON DELETE SET NULL,
  description TEXT NOT NULL,
  quantity    INTEGER NOT NULL CHECK (quantity > 0),
  unit_price  INTEGER NOT NULL DEFAULT 0,   -- kobo
  amount      INTEGER NOT NULL DEFAULT 0,   -- kobo (qty * unit_price)
  sort_order  INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_invoice_items_parent ON invoice_items(invoice_id);

CREATE TABLE IF NOT EXISTS payments (
  id          TEXT PRIMARY KEY,
  invoice_id  TEXT NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
  amount      INTEGER NOT NULL CHECK (amount > 0),   -- kobo
  method      TEXT NOT NULL DEFAULT 'transfer'
                CHECK (method IN ('transfer','cash','card','pos','cheque','mobile','other')),
  reference   TEXT,
  paid_at     TEXT NOT NULL,
  note        TEXT,
  created_by  TEXT REFERENCES users(id) ON DELETE SET NULL,
  created_at  TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_payments_invoice ON payments(invoice_id);
CREATE INDEX IF NOT EXISTS idx_payments_date ON payments(paid_at);

-- ------------------------------------------------------------------ waybills

CREATE TABLE IF NOT EXISTS waybills (
  id              TEXT PRIMARY KEY,
  number          TEXT NOT NULL UNIQUE,
  invoice_id      TEXT REFERENCES invoices(id) ON DELETE SET NULL,
  customer_id     TEXT NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
  waybill_date    TEXT NOT NULL,
  carrier         TEXT,
  tracking_number TEXT,
  origin          TEXT,
  destination     TEXT,
  receiver_name   TEXT,
  receiver_phone  TEXT,
  status          TEXT NOT NULL DEFAULT 'pending'
                    CHECK (status IN ('pending','in_transit','delivered','exception','cancelled')),
  charges         INTEGER NOT NULL DEFAULT 0,  -- kobo
  charges_paid_by TEXT NOT NULL DEFAULT 'sender'
                    CHECK (charges_paid_by IN ('sender','receiver')),
  pieces          INTEGER NOT NULL DEFAULT 1,
  notes           TEXT,
  delivered_at    TEXT,
  created_by      TEXT REFERENCES users(id) ON DELETE SET NULL,
  created_at      TEXT NOT NULL,
  updated_at      TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_waybills_customer ON waybills(customer_id);
CREATE INDEX IF NOT EXISTS idx_waybills_invoice ON waybills(invoice_id);
CREATE INDEX IF NOT EXISTS idx_waybills_status ON waybills(status);
CREATE INDEX IF NOT EXISTS idx_waybills_date ON waybills(waybill_date);

CREATE TABLE IF NOT EXISTS waybill_items (
  id            TEXT PRIMARY KEY,
  waybill_id    TEXT NOT NULL REFERENCES waybills(id) ON DELETE CASCADE,
  product_id    TEXT REFERENCES products(id) ON DELETE SET NULL,
  description   TEXT NOT NULL,
  quantity      INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
  serial_number TEXT,
  weight_kg     REAL,
  note          TEXT,
  sort_order    INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_waybill_items_parent ON waybill_items(waybill_id);

-- ------------------------------------------------------------------ expenses

CREATE TABLE IF NOT EXISTS expenses (
  id             TEXT PRIMARY KEY,
  expense_date   TEXT NOT NULL,
  category       TEXT NOT NULL DEFAULT 'other',
  description    TEXT NOT NULL,
  amount         INTEGER NOT NULL CHECK (amount > 0),  -- kobo
  payment_method TEXT NOT NULL DEFAULT 'transfer',
  reference      TEXT,
  supplier_id    TEXT REFERENCES suppliers(id) ON DELETE SET NULL,
  created_by     TEXT REFERENCES users(id) ON DELETE SET NULL,
  created_at     TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_expenses_date ON expenses(expense_date);
CREATE INDEX IF NOT EXISTS idx_expenses_category ON expenses(category);

-- ------------------------------------------------- attachments / sharing / audit

CREATE TABLE IF NOT EXISTS documents (
  id           TEXT PRIMARY KEY,
  entity_type  TEXT NOT NULL
                 CHECK (entity_type IN ('invoice','waybill','purchase','expense','product','business')),
  entity_id    TEXT NOT NULL,
  filename     TEXT NOT NULL,
  stored_key   TEXT NOT NULL,
  content_type TEXT NOT NULL,
  size_bytes   INTEGER NOT NULL,
  uploaded_by  TEXT REFERENCES users(id) ON DELETE SET NULL,
  created_at   TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_documents_entity ON documents(entity_type, entity_id);

-- Tokenised read-only links so a customer can view an invoice/waybill without an account.
CREATE TABLE IF NOT EXISTS share_links (
  id          TEXT PRIMARY KEY,
  entity_type TEXT NOT NULL CHECK (entity_type IN ('invoice','waybill')),
  entity_id   TEXT NOT NULL,
  token       TEXT NOT NULL UNIQUE,
  created_by  TEXT REFERENCES users(id) ON DELETE SET NULL,
  created_at  TEXT NOT NULL,
  expires_at  TEXT,
  revoked_at  TEXT,
  view_count  INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_share_token ON share_links(token);

CREATE TABLE IF NOT EXISTS audit_log (
  id          TEXT PRIMARY KEY,
  actor_id    TEXT REFERENCES users(id) ON DELETE SET NULL,
  actor_name  TEXT,
  action      TEXT NOT NULL,
  entity_type TEXT,
  entity_id   TEXT,
  summary     TEXT,
  ip          TEXT,
  created_at  TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_audit_created ON audit_log(created_at);
CREATE INDEX IF NOT EXISTS idx_audit_entity ON audit_log(entity_type, entity_id);

-- One row for the seeded business profile.
INSERT OR IGNORE INTO business (id, name, created_at, updated_at)
VALUES ('business', 'DELGRA LTD', '1970-01-01T00:00:00.000Z', '1970-01-01T00:00:00.000Z');
