-- 0044_volunteer_signups.sql — ownership for volunteer commitments.

ALTER TABLE vol_signups ADD COLUMN user_id TEXT REFERENCES users(id) ON DELETE CASCADE;
ALTER TABLE vol_signups ADD COLUMN opportunity_id TEXT REFERENCES vol_opportunities(id) ON DELETE SET NULL;
ALTER TABLE vol_hours ADD COLUMN user_id TEXT REFERENCES users(id) ON DELETE CASCADE;
CREATE INDEX IF NOT EXISTS idx_vol_signups_user ON vol_signups (user_id, sort_order);
CREATE INDEX IF NOT EXISTS idx_vol_hours_user ON vol_hours (user_id, sort_order);
