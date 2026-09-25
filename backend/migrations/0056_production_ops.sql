-- 0056: production operations.
--  * webhook_events — idempotency ledger for signed provider webhooks so a
--    retried/replayed Paystack delivery is processed at most once.
--  * job_runs — audit log for scheduled (cron) jobs, surfaced to admins.
--  * users.deleted_at — account deletion (NDPR/GDPR right to erasure). Users
--    are anonymised, not hard-deleted, so financial records keep integrity.
--  * data_requests — log of export/erasure requests (compliance evidence).

CREATE TABLE IF NOT EXISTS webhook_events (
  id TEXT PRIMARY KEY,
  provider TEXT NOT NULL,
  event TEXT NOT NULL DEFAULT '',
  reference TEXT NOT NULL DEFAULT '',
  received_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_webhook_events_reference ON webhook_events (reference);

CREATE TABLE IF NOT EXISTS job_runs (
  id TEXT PRIMARY KEY,
  job TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('ok', 'error')),
  detail TEXT NOT NULL DEFAULT '',
  started_at TEXT NOT NULL,
  finished_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_job_runs_job ON job_runs (job, started_at);

ALTER TABLE users ADD COLUMN deleted_at TEXT;

CREATE TABLE IF NOT EXISTS data_requests (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  kind TEXT NOT NULL CHECK (kind IN ('export', 'erasure')),
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_data_requests_user ON data_requests (user_id);
