-- Bind web-push delivery to the session that most recently registered the browser.
-- Legacy subscriptions remain in place but are inactive until re-registered.
ALTER TABLE push_subscriptions ADD COLUMN session_id TEXT REFERENCES sessions(id) ON DELETE CASCADE;
CREATE INDEX IF NOT EXISTS idx_push_subscriptions_session ON push_subscriptions(session_id);
