-- 0052_alumni_connections.sql — Persist alumni connection requests.
CREATE TABLE IF NOT EXISTS alu_connections (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  member_id TEXT NOT NULL REFERENCES alu_members(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TEXT NOT NULL,
  UNIQUE (user_id, member_id)
);
CREATE INDEX IF NOT EXISTS idx_alu_connections_user ON alu_connections (user_id, status);
