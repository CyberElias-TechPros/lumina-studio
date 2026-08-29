-- 0043_notification_preferences.sql — per-user notification delivery preferences.

CREATE TABLE IF NOT EXISTS notification_preferences (
  user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  app_enabled INTEGER NOT NULL DEFAULT 1,
  email_enabled INTEGER NOT NULL DEFAULT 1,
  sms_enabled INTEGER NOT NULL DEFAULT 0,
  quiet_start TEXT NOT NULL DEFAULT '21:00',
  quiet_end TEXT NOT NULL DEFAULT '08:00',
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
