-- New opt-in, admin-reviewed adult mentoring workflow. No legacy seeded
-- directory or dashboard record is copied into these tables.
CREATE TABLE mentoring_eligibility (
  user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  active INTEGER NOT NULL CHECK (active IN (0,1)),
  expires_at TEXT NOT NULL,
  review_ref TEXT NOT NULL,
  changed_by TEXT NOT NULL REFERENCES users(id),
  changed_at TEXT NOT NULL,
  operation_id TEXT NOT NULL
);
CREATE TABLE mentoring_eligibility_events (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  active INTEGER NOT NULL CHECK (active IN (0,1)),
  expires_at TEXT NOT NULL,
  review_ref TEXT NOT NULL,
  actor_id TEXT NOT NULL,
  occurred_at TEXT NOT NULL
);
CREATE TABLE mentoring_profiles (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  focus TEXT NOT NULL,
  bio TEXT NOT NULL,
  visible INTEGER NOT NULL CHECK (visible IN (0,1)),
  consent_version TEXT NOT NULL,
  consent_at TEXT NOT NULL,
  revision TEXT NOT NULL,
  approved_by TEXT REFERENCES users(id),
  approved_at TEXT,
  approval_operation_id TEXT,
  review_ref TEXT,
  updated_at TEXT NOT NULL
);
CREATE TABLE mentoring_profile_events (
  id TEXT PRIMARY KEY,
  profile_id TEXT NOT NULL,
  actor_id TEXT NOT NULL,
  action TEXT NOT NULL CHECK (action IN ('submitted','withdrawn','approved','approval_reset')),
  revision TEXT NOT NULL,
  consent_version TEXT NOT NULL,
  review_ref TEXT NOT NULL DEFAULT '',
  occurred_at TEXT NOT NULL
);
CREATE TABLE mentoring_requests (
  id TEXT PRIMARY KEY,
  learner_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  mentor_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  profile_id TEXT NOT NULL REFERENCES mentoring_profiles(id),
  goal TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending','accepted','declined','cancelled')),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  operation_id TEXT NOT NULL
);
CREATE INDEX idx_mentoring_requests_learner ON mentoring_requests(learner_id,created_at);
CREATE INDEX idx_mentoring_requests_mentor ON mentoring_requests(mentor_id,created_at);
CREATE UNIQUE INDEX idx_mentoring_pending_pair ON mentoring_requests(learner_id,mentor_id) WHERE status IN ('pending','accepted');
CREATE TABLE mentoring_request_events (
  id TEXT PRIMARY KEY,
  request_id TEXT NOT NULL,
  actor_id TEXT NOT NULL,
  action TEXT NOT NULL CHECK (action IN ('created','accepted','declined','cancelled')),
  occurred_at TEXT NOT NULL
);
CREATE INDEX idx_mentoring_request_events ON mentoring_request_events(request_id);
