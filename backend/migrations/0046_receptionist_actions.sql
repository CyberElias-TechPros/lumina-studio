-- 0046_receptionist_actions.sql — persist visitor check-in details and host notifications.

ALTER TABLE rec_inside ADD COLUMN host_label TEXT NOT NULL DEFAULT '';
ALTER TABLE rec_inside ADD COLUMN phone TEXT NOT NULL DEFAULT '';
ALTER TABLE rec_inside ADD COLUMN purpose TEXT NOT NULL DEFAULT '';
ALTER TABLE rec_queue ADD COLUMN notified INTEGER NOT NULL DEFAULT 0;
