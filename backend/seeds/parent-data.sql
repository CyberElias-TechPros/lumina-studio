-- Seed: parent account + parent → student links (runs after lms-data.sql).
INSERT OR IGNORE INTO users (id, name, email, role_key, status)
VALUES ('00000000-0000-4000-8000-000000000020', 'Emeka Okafor', 'parent@cea.ng', 'parent', 'active');

INSERT OR IGNORE INTO parent_students (parent_id, student_id)
VALUES ('00000000-0000-4000-8000-000000000020', '00000000-0000-4000-8000-000000000001');