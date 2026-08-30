-- 0053_backup_restore_requests.sql — Audit and queue administrator restore requests.
CREATE TABLE IF NOT EXISTS adm_backup_restores (
  id TEXT PRIMARY KEY,
  backup_id TEXT NOT NULL REFERENCES adm_backups(id) ON DELETE CASCADE,
  requested_by TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'queued',
  requested_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_adm_backup_restores_backup ON adm_backup_restores (backup_id, requested_at);
