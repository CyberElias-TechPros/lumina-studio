-- 0045_volunteer_signup_constraints.sql — prevent duplicate opportunity reservations.

CREATE UNIQUE INDEX IF NOT EXISTS idx_vol_signups_opportunity_user
  ON vol_signups (opportunity_id, user_id)
  WHERE opportunity_id IS NOT NULL AND user_id IS NOT NULL;
