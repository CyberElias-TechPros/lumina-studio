-- Phase 4.5: realtime chat rooms, live classes (chat/polls/whiteboard), R2 uploads.
-- Realtime fan-out runs through the RealtimeRoom Durable Object; these tables
-- persist history and class content so clients can rehydrate via REST.

CREATE TABLE realtime_rooms (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  kind TEXT NOT NULL DEFAULT 'chat',
  created_at TEXT NOT NULL DEFAULT '',
  created_by TEXT REFERENCES users(id) ON DELETE SET NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX idx_realtime_rooms_kind ON realtime_rooms(kind);

CREATE TABLE realtime_messages (
  id TEXT PRIMARY KEY,
  room_id TEXT NOT NULL DEFAULT '',
  channel TEXT NOT NULL DEFAULT 'chat',
  user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
  user_name TEXT NOT NULL DEFAULT '',
  body TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX idx_realtime_messages_room ON realtime_messages(room_id, sort_order);

CREATE TABLE live_sessions (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  instructor TEXT NOT NULL DEFAULT '',
  cohort TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'scheduled',
  starts_at TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE live_polls (
  id TEXT PRIMARY KEY,
  class_id TEXT NOT NULL DEFAULT '',
  question TEXT NOT NULL DEFAULT '',
  options TEXT NOT NULL DEFAULT '[]',
  status TEXT NOT NULL DEFAULT 'open',
  created_by TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX idx_live_polls_class ON live_polls(class_id);

CREATE TABLE live_poll_votes (
  id TEXT PRIMARY KEY,
  poll_id TEXT NOT NULL DEFAULT '',
  user_id TEXT NOT NULL DEFAULT '',
  option TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE UNIQUE INDEX idx_live_poll_votes_unique ON live_poll_votes(poll_id, user_id);
CREATE INDEX idx_live_poll_votes_poll ON live_poll_votes(poll_id);

CREATE TABLE live_whiteboard_ops (
  id TEXT PRIMARY KEY,
  class_id TEXT NOT NULL DEFAULT '',
  user_id TEXT NOT NULL DEFAULT '',
  user_name TEXT NOT NULL DEFAULT '',
  op TEXT NOT NULL DEFAULT '{}',
  op_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX idx_live_whiteboard_class ON live_whiteboard_ops(class_id, sort_order);
