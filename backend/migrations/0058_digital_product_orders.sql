-- 0058: Digital product shop.
--
-- One-off digital products (templates, planners, spreadsheets) sold to any
-- visitor through the public shop. There is no user-account requirement at
-- checkout — Google's Merchant Center feed and the buy buttons expect a
-- guest checkout — so the order row carries the buyer's email directly
-- rather than a users.id foreign key. Payment sessions still go through
-- Paystack (provider='paystack'); the row doubles as the delivery ticket
-- when the status flips to 'success'.

CREATE TABLE IF NOT EXISTS digital_product_orders (
  id TEXT PRIMARY KEY,
  reference TEXT NOT NULL UNIQUE,
  product_id TEXT NOT NULL,
  product_slug TEXT NOT NULL,
  product_title TEXT NOT NULL,
  amount INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'NGN',
  buyer_email TEXT NOT NULL,
  buyer_name TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'success', 'failed', 'review')),
  provider TEXT NOT NULL DEFAULT 'paystack',
  download_url TEXT NOT NULL DEFAULT '',
  download_count INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL,
  paid_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_digital_orders_email ON digital_product_orders (buyer_email);
CREATE INDEX IF NOT EXISTS idx_digital_orders_product ON digital_product_orders (product_slug);
CREATE INDEX IF NOT EXISTS idx_digital_orders_status ON digital_product_orders (status);
