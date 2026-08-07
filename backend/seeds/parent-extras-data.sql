-- Seed: Parent extras (communication contacts + meetings).
INSERT OR IGNORE INTO par_contacts (id, name, role, kind, sort_order) VALUES ('par-cn-01', 'Mr. Adeyemi', 'Full-Stack instructor', 'Message', 1);
INSERT OR IGNORE INTO par_contacts (id, name, role, kind, sort_order) VALUES ('par-cn-02', 'Ms. Chidera', 'Cloud & DevOps instructor', 'Message', 2);
INSERT OR IGNORE INTO par_contacts (id, name, role, kind, sort_order) VALUES ('par-cn-03', 'Mrs. Obi', 'Ada''s mentor', 'Video', 3);
INSERT OR IGNORE INTO par_contacts (id, name, role, kind, sort_order) VALUES ('par-cn-04', 'Registrar''s office', 'Records & billing', 'Mail', 4);
INSERT OR IGNORE INTO par_meetings (id, title, date_label, status, sort_order) VALUES ('par-mt-01', 'Parent–teacher meeting', 'Sep 5–9, 2026', 'Booking open', 1);
INSERT OR IGNORE INTO par_meetings (id, title, date_label, status, sort_order) VALUES ('par-mt-02', 'Mentor check-in (Mrs. Obi)', 'Aug 21, 16:00', 'Confirmed', 2);
INSERT OR IGNORE INTO par_meetings (id, title, date_label, status, sort_order) VALUES ('par-mt-03', 'Career day webinar', 'Sep 14, 18:00', 'RSVP', 3);
