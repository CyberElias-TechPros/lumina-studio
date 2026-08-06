-- 0019_volunteer_receptionist.sql — Volunteer dashboard (opportunities, signups, impact, hours, groups, certs, monthly hours) + receptionist dashboard (appointments, visitor queue/on-site, deliveries, inquiries, calls, staff directory, tasks, handover).

CREATE TABLE vol_opportunities (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  date_label TEXT NOT NULL DEFAULT '',
  location_label TEXT NOT NULL DEFAULT '',
  slots_filled INTEGER NOT NULL DEFAULT 0,
  slots_total INTEGER NOT NULL DEFAULT 0,
  priority INTEGER NOT NULL DEFAULT 0,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE vol_signups (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  detail TEXT NOT NULL DEFAULT '',
  hours INTEGER,
  attended INTEGER NOT NULL DEFAULT 0,
  upcoming INTEGER NOT NULL DEFAULT 0,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE vol_metrics (
  id TEXT PRIMARY KEY,
  metric TEXT NOT NULL DEFAULT '',
  value_label TEXT NOT NULL DEFAULT '',
  detail TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE vol_hours (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  date_label TEXT NOT NULL DEFAULT '',
  hours INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pending',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE vol_groups (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  members INTEGER NOT NULL DEFAULT 0,
  online INTEGER NOT NULL DEFAULT 0,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE vol_certs (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  detail TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE vol_months (
  id TEXT PRIMARY KEY,
  month TEXT NOT NULL DEFAULT '',
  pct INTEGER NOT NULL DEFAULT 0,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE rec_appointments (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  detail TEXT NOT NULL DEFAULT '',
  who TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'confirmed',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE rec_queue (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  host_label TEXT NOT NULL DEFAULT '',
  purpose TEXT NOT NULL DEFAULT '',
  time_label TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE rec_inside (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  since_label TEXT NOT NULL DEFAULT '',
  badge_label TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE rec_deliveries (
  id TEXT PRIMARY KEY,
  carrier TEXT NOT NULL DEFAULT '',
  item TEXT NOT NULL DEFAULT '',
  time_label TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'routed',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE rec_inquiries (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  topic TEXT NOT NULL DEFAULT '',
  time_label TEXT NOT NULL DEFAULT '',
  stage TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE rec_calls (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  topic TEXT NOT NULL DEFAULT '',
  time_label TEXT NOT NULL DEFAULT '',
  kind TEXT NOT NULL DEFAULT 'answered',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE rec_staff (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  role TEXT NOT NULL DEFAULT '',
  extension TEXT NOT NULL DEFAULT '',
  office TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE rec_tasks (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  time_label TEXT NOT NULL DEFAULT '',
  done INTEGER NOT NULL DEFAULT 0,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE rec_handover (
  id TEXT PRIMARY KEY,
  note TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX idx_vol_opportunities_sort ON vol_opportunities (sort_order);
CREATE INDEX idx_vol_signups_sort ON vol_signups (sort_order);
CREATE INDEX idx_vol_hours_sort ON vol_hours (sort_order);
CREATE INDEX idx_vol_groups_sort ON vol_groups (sort_order);
CREATE INDEX idx_vol_months_sort ON vol_months (sort_order);
CREATE INDEX idx_rec_appointments_sort ON rec_appointments (sort_order);
CREATE INDEX idx_rec_deliveries_sort ON rec_deliveries (sort_order);
CREATE INDEX idx_rec_calls_sort ON rec_calls (sort_order);
CREATE INDEX idx_rec_tasks_sort ON rec_tasks (sort_order);
