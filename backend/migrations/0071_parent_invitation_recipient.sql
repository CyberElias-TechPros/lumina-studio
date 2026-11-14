-- Bind new invitations to an existing intended parent account. Legacy pending
-- invitations remain unbound and must be reissued after identity review.
ALTER TABLE parent_invitations ADD COLUMN guardian_user_id TEXT REFERENCES users(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS idx_parent_invitations_guardian ON parent_invitations(guardian_user_id);
