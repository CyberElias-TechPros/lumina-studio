-- 0047_client_ticket_ownership.sql — scope newly created client support tickets.

ALTER TABLE cli_tickets ADD COLUMN client_id TEXT REFERENCES users(id) ON DELETE CASCADE;
ALTER TABLE cli_tickets ADD COLUMN description TEXT NOT NULL DEFAULT '';
CREATE INDEX IF NOT EXISTS idx_cli_tickets_client ON cli_tickets (client_id, sort_order);
