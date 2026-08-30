-- 0049_alumni_event_rsvps.sql — Persist alumni event RSVP choices per user.
CREATE TABLE IF NOT EXISTS alu_event_rsvps (
  id TEXT PRIMARY KEY,
  event_id TEXT NOT NULL REFERENCES alu_events(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TEXT NOT NULL,
  UNIQUE (event_id, user_id)
);
CREATE INDEX IF NOT EXISTS idx_alu_event_rsvps_user ON alu_event_rsvps (user_id, event_id);
