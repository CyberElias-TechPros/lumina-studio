-- 0048_admin_key_rotations.sql — Persist one-time service-token rotation records.
-- The plaintext token is never stored; only its SHA-256 digest is retained.
CREATE TABLE IF NOT EXISTS adm_key_rotations (
  id TEXT PRIMARY KEY,
  key_id TEXT NOT NULL REFERENCES adm_keys(id) ON DELETE CASCADE,
  token_hash TEXT NOT NULL,
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_adm_key_rotations_key ON adm_key_rotations (key_id, created_at);
