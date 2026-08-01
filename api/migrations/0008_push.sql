-- Phase 5: push notification subscriptions (Web Push / VAPID).
-- The push service (FCM/APNs/WebPushProvider) handles delivery; this table
-- stores the browser subscription so the worker can encrypt and send via the
-- standard Web Push protocol (RFC 8291) using VAPID keys from env.

CREATE TABLE push_subscriptions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  endpoint TEXT NOT NULL,
  p256dh TEXT NOT NULL,
  auth TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);
CREATE UNIQUE INDEX idx_push_subscriptions_endpoint ON push_subscriptions(endpoint);
CREATE INDEX idx_push_subscriptions_user ON push_subscriptions(user_id);
