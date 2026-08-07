-- 0032_instructor_extras.sql — Instructor extras (hub KPIs, announcements, today's classes, grading queue, lesson revision history).
CREATE TABLE ins_hub (
  id TEXT PRIMARY KEY,
  metric TEXT NOT NULL DEFAULT '',
  value_label TEXT NOT NULL DEFAULT '',
  delta TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE ins_announcements (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  audience TEXT NOT NULL DEFAULT '',
  date_label TEXT NOT NULL DEFAULT '',
  pinned INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE ins_classes (
  id TEXT PRIMARY KEY,
  time_label TEXT NOT NULL DEFAULT '',
  title TEXT NOT NULL DEFAULT '',
  place TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE ins_queue (
  id TEXT PRIMARY KEY,
  student TEXT NOT NULL DEFAULT '',
  item TEXT NOT NULL DEFAULT '',
  course TEXT NOT NULL DEFAULT '',
  submitted TEXT NOT NULL DEFAULT '',
  due TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE ins_revisions (
  id TEXT PRIMARY KEY,
  version TEXT NOT NULL DEFAULT '',
  title TEXT NOT NULL DEFAULT '',
  author TEXT NOT NULL DEFAULT '',
  date_label TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX idx_ins_hub_sort ON ins_hub (sort_order);
CREATE INDEX idx_ins_announcements_sort ON ins_announcements (sort_order);
CREATE INDEX idx_ins_classes_sort ON ins_classes (sort_order);
CREATE INDEX idx_ins_queue_sort ON ins_queue (sort_order);
CREATE INDEX idx_ins_revisions_sort ON ins_revisions (sort_order);
