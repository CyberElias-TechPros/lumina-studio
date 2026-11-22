-- Server-verified gadget orders created from fresh Afkit catalogue snapshots.
CREATE TABLE gadget_orders (
  ref TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  delivery_address TEXT NOT NULL DEFAULT '',
  notes TEXT NOT NULL DEFAULT '',
  items_json TEXT NOT NULL,
  subtotal_kobo INTEGER NOT NULL,
  observed_at TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending_confirmation' CHECK(status IN ('pending_confirmation', 'confirmed', 'fulfilled', 'cancelled')),
  admin_note TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE INDEX idx_gadget_orders_status ON gadget_orders(status, created_at DESC);
CREATE INDEX idx_gadget_orders_email ON gadget_orders(customer_email, created_at DESC);
