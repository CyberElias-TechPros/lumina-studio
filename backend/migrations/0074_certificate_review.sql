-- Certificate issuance is based on a recorded administrative attestation,
-- not inferred from enrollment or legacy seed data.
CREATE TABLE certificate_issuances (
  certificate_id TEXT PRIMARY KEY REFERENCES certificates(id) ON DELETE CASCADE,
  issued_by TEXT NOT NULL REFERENCES users(id),
  evidence_ref TEXT NOT NULL,
  issued_at TEXT NOT NULL
);
CREATE TABLE certificate_revocations (
  certificate_id TEXT PRIMARY KEY REFERENCES certificates(id) ON DELETE CASCADE,
  revoked_by TEXT NOT NULL REFERENCES users(id),
  reason TEXT NOT NULL,
  revoked_at TEXT NOT NULL,
  operation_id TEXT NOT NULL UNIQUE
);
-- Keep a minimal event record independent of certificate deletion.
CREATE TABLE certificate_events (
  id TEXT PRIMARY KEY,
  certificate_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  course_slug TEXT NOT NULL,
  action TEXT NOT NULL CHECK (action IN ('issued','revoked')),
  actor_id TEXT NOT NULL,
  occurred_at TEXT NOT NULL
);
CREATE INDEX idx_certificate_events_cert ON certificate_events(certificate_id);
