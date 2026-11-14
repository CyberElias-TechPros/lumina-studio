-- Existing links have unknown provenance and remain inactive until a verified
-- account-bound invitation is accepted. No legacy links are deleted.
ALTER TABLE parent_invitations ADD COLUMN accepted_claim_id TEXT;
ALTER TABLE parent_students ADD COLUMN verified_invitation_id TEXT REFERENCES parent_invitations(id) ON DELETE SET NULL;
CREATE VIEW verified_parent_students AS
  SELECT ps.parent_id, ps.student_id
    FROM parent_students ps JOIN parent_invitations pi ON pi.id = ps.verified_invitation_id
   WHERE pi.status = 'accepted' AND pi.guardian_user_id = ps.parent_id
     AND pi.accepted_by = ps.parent_id AND pi.student_id = ps.student_id
     AND pi.accepted_claim_id IS NOT NULL;
