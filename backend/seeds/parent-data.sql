-- Seed: parent account + parent → student links (runs after lms-data.sql).
INSERT OR IGNORE INTO users (id, name, email, role_key, status)
VALUES ('00000000-0000-4000-8000-000000000020', 'Emeka Okafor', 'parent@cea.ng', 'parent', 'active');

INSERT OR IGNORE INTO parent_students (parent_id, student_id)
VALUES ('00000000-0000-4000-8000-000000000020', '00000000-0000-4000-8000-000000000001');

-- Student-bound invoices so the parent finance ledger has live rows.
INSERT OR IGNORE INTO invoices (id, party, amount, due, status, user_id, sort_order)
VALUES ('INV-P01', 'Tuition — Term 2 2025/26', 1650000, '2026-05-15', 'paid', '00000000-0000-4000-8000-000000000001', 0);

INSERT OR IGNORE INTO invoices (id, party, amount, due, status, user_id, sort_order)
VALUES ('INV-P02', 'Tuition — Term 3 2025/26 instalment', 820000, '2026-08-10', 'sent', '00000000-0000-4000-8000-000000000001', 1);