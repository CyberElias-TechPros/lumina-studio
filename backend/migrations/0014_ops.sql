-- 0014_ops.sql — operations suite: inventory, branches, facilities, vendors, tasks, workflows.

CREATE TABLE inventory_items (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT '',
  qty INTEGER NOT NULL DEFAULT 0,
  unit TEXT NOT NULL DEFAULT '',
  reorder_point INTEGER NOT NULL DEFAULT 0,
  auto_reorder INTEGER NOT NULL DEFAULT 0,
  unit_price INTEGER NOT NULL DEFAULT 0,
  location TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE purchase_orders (
  id TEXT PRIMARY KEY,
  vendor TEXT NOT NULL DEFAULT '',
  items TEXT NOT NULL DEFAULT '',
  amount INTEGER NOT NULL DEFAULT 0,
  eta TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'open',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE branches (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  location TEXT NOT NULL DEFAULT '',
  capacity INTEGER NOT NULL DEFAULT 0,
  occupied INTEGER NOT NULL DEFAULT 0,
  staff_onsite INTEGER NOT NULL DEFAULT 0,
  cost_seat_day INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'healthy',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE facility_rooms (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  block TEXT NOT NULL DEFAULT '',
  seats INTEGER NOT NULL DEFAULT 0,
  next_event TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'available',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE maintenance_jobs (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  detail TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'open',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE vendors (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT '',
  rating REAL NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE vendor_contracts (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  renews TEXT NOT NULL DEFAULT '',
  value_yr INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE ops_tasks (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  assignee TEXT NOT NULL DEFAULT '',
  detail TEXT NOT NULL DEFAULT '',
  done INTEGER NOT NULL DEFAULT 0,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE workflows (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  trigger_detail TEXT NOT NULL DEFAULT '',
  stats TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'active',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX idx_inventory_category ON inventory_items (category);
CREATE INDEX idx_branches_status ON branches (status);
CREATE INDEX idx_ops_tasks_done ON ops_tasks (done);
