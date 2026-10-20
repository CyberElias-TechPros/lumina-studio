-- Native FCM registrations are distinct from browser Web Push subscriptions.
-- Session binding makes logout, password reset, MFA and suspension visible to
-- delivery eligibility without trusting the phone to send a final cleanup call.
CREATE TABLE native_push_devices (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  session_id TEXT NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  device_secret_hash TEXT NOT NULL,
  token TEXT NOT NULL UNIQUE,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE INDEX idx_native_push_user ON native_push_devices(user_id);
CREATE INDEX idx_native_push_session ON native_push_devices(session_id);
