-- No legacy room or participant is automatically granted access.
CREATE TABLE chat_room_members (room_id TEXT NOT NULL REFERENCES realtime_rooms(id) ON DELETE CASCADE, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE, active INTEGER NOT NULL CHECK(active IN (0,1)), expires_at TEXT NOT NULL, changed_at TEXT NOT NULL, changed_by TEXT NOT NULL REFERENCES users(id), operation_id TEXT NOT NULL, PRIMARY KEY(room_id, user_id));
CREATE INDEX idx_chat_room_members_user ON chat_room_members(user_id, active, expires_at, room_id);
CREATE TABLE chat_room_member_events (id TEXT PRIMARY KEY, room_id TEXT NOT NULL, user_id TEXT NOT NULL, active INTEGER NOT NULL CHECK(active IN (0,1)), expires_at TEXT NOT NULL, changed_at TEXT NOT NULL, changed_by TEXT NOT NULL REFERENCES users(id));
CREATE INDEX idx_chat_member_events_room ON chat_room_member_events(room_id, changed_at);
