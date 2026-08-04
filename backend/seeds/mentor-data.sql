-- Seed: mentor profiles + a sample student request for rule-based matching.
INSERT OR IGNORE INTO mentor_profiles (id, userId, name, focus, bio, skills, areas, availability, rating, sessions_count, sort_order) VALUES
  ('mentor-1', NULL, 'Ngozi Umeh', 'Data Systems', 'Senior data engineer who helps learners turn messy data projects into portfolio pieces.', '["python","sql","pandas","airflow"]', '["data","data-science","engineering"]', '2 slots/week', 4.9, 142, 0),
  ('mentor-2', NULL, 'Tomi Bakare', 'Full-Stack Engineering', 'Staff engineer focusing on typed backends, APIs and shipping production-quality React.', '["typescript","react","node","databases"]', '["software","web","full-stack","backend"]', 'Open', 4.8, 218, 1),
  ('mentor-3', NULL, 'Halima Sani', 'Product & UX Design', 'Product designer mentoring learners through portfolios, case studies and design critique.', '["figma","research","prototyping","ux"]', '["design","product","ux"]', '2 slots/week', 4.7, 96, 2),
  ('mentor-4', NULL, 'Zainab Kabir', 'Cloud & DevOps', 'Cloud engineer focused on CI/CD, containerisation and career pivots into DevOps.', '["aws","docker","kubernetes","ci-cd"]', '["devops","cloud","infra"]', 'Slots after 4pm GMT', 4.6, 73, 3);

INSERT OR IGNORE INTO mentor_requests (id, userId, studentName, goal, program, status, created_at, sort_order) VALUES
  ('mreq-1', '00000000-0000-4000-8000-000000000001', 'Chiamaka Obi', 'Prepare for backend engineering interviews', 'Backend & APIs', 'pending', '2026-08-01T09:00:00Z', 0);