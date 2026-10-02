-- Revokes every demo login created by scripts/gen-demo-users.ts.
-- npx wrangler d1 execute DB --remote --file seeds/demo-users-remove.sql

DELETE FROM sessions WHERE user_id IN (SELECT id FROM users WHERE id LIKE 'demo-%');
DELETE FROM users WHERE id LIKE 'demo-%';
