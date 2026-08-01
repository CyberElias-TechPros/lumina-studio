CREATE TABLE payments (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  reference TEXT NOT NULL,
  email TEXT NOT NULL DEFAULT '',
  amount INTEGER NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'NGN',
  status TEXT NOT NULL DEFAULT 'pending',
  provider TEXT NOT NULL DEFAULT 'paystack',
  description TEXT NOT NULL DEFAULT '',
  paid_at TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE UNIQUE INDEX idx_payments_reference ON payments(reference);
CREATE INDEX idx_payments_user ON payments(user_id);
