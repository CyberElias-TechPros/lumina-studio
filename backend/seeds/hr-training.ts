/* Seed wrapper for hr-training-data.sql (manual — mirrors the SQL file). */
export const seedHrTrainingSql = String.raw`-- Seed: HR training.
INSERT OR IGNORE INTO hr_hub (id, metric, value_label, delta, sort_order) VALUES ('hr-hb-01', 'Programs', '8', '3 mandatory', 1), ('hr-hb-02', 'Completions', '142', 'this year', 2), ('hr-hb-03', 'Hours trained', '640h', 'staff-wide', 3), ('hr-hb-04', 'Due (90d)', '3', 'safety course', 4);
INSERT OR IGNORE INTO hr_programs (id, name, detail, status, sort_order) VALUES ('hr-pr-01', 'Instructor pedagogy bootcamp', '18 enrolled · 12 complete', 'Ongoing', 1), ('hr-pr-02', 'Safety & first aid', 'All staff due Q4', 'Scheduled', 2), ('hr-pr-03', 'Cybersecurity awareness', '94 enrolled · 80 complete', 'Ongoing', 3);
`;