-- Participant-authorized direct conversations and atomic message delivery.
-- Legacy message_threads remains read-only historical storage; new messaging uses these tables.

CREATE TABLE direct_conversations (
  id TEXT PRIMARY KEY,
  subject TEXT NOT NULL DEFAULT '',
  kind TEXT NOT NULL DEFAULT 'support',
  created_by TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE INDEX idx_direct_conversations_updated ON direct_conversations(updated_at DESC);

CREATE TABLE direct_participants (
  conversation_id TEXT NOT NULL REFERENCES direct_conversations(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  unread_count INTEGER NOT NULL DEFAULT 0,
  last_read_at TEXT NOT NULL DEFAULT '',
  PRIMARY KEY (conversation_id, user_id)
);
CREATE INDEX idx_direct_participants_user ON direct_participants(user_id, conversation_id);

CREATE TABLE direct_messages (
  id TEXT PRIMARY KEY,
  conversation_id TEXT NOT NULL REFERENCES direct_conversations(id) ON DELETE CASCADE,
  sender_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  sender_name TEXT NOT NULL DEFAULT '',
  body TEXT NOT NULL,
  created_at TEXT NOT NULL
);
CREATE INDEX idx_direct_messages_conv ON direct_messages(conversation_id, created_at ASC);
