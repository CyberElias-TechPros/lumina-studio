-- 0038_parent_invitations.sql — Parent portal invitations: token-based guardian links.

CREATE TABLE parent_invitations (
  id TEXT PRIMARY KEY,
  token TEXT NOT NULL UNIQUE,
  student_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  student_name TEXT NOT NULL DEFAULT '',
  guardian_name TEXT NOT NULL DEFAULT '',
  note TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'pending',
  accepted_by TEXT,
  accepted_at TEXT,
  expires_at TEXT NOT NULL,
  created_by TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX idx_parent_invitations_token ON parent_invitations (token);
CREATE INDEX idx_parent_invitations_student ON parent_invitations (student_id);
CREATE INDEX idx_parent_invitations_status ON parent_invitations (status);
