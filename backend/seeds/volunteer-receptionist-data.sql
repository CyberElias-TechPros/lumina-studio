-- 0019 seeds — Volunteer dashboard (OfficeMate-style student volunteer) + receptionist front desk, mirroring the static app pages.

INSERT OR IGNORE INTO vol_opportunities (id, title, date_label, location_label, slots_filled, slots_total, priority, sort_order) VALUES ('vol-opp-01', 'Career fair booth support', 'Aug 20', 'Ikeja HQ', 4, 6, 0, 1);
INSERT OR IGNORE INTO vol_opportunities (id, title, date_label, location_label, slots_filled, slots_total, priority, sort_order) VALUES ('vol-opp-02', 'Mentor hour for Cohort 15', 'Weekly · online', 'Online', 2, 5, 1, 2);
INSERT OR IGNORE INTO vol_opportunities (id, title, date_label, location_label, slots_filled, slots_total, priority, sort_order) VALUES ('vol-opp-03', 'Community outreach — Abeokuta', 'Sep 5 · with NGO partner', 'Abeokuta', 10, 15, 0, 3);

INSERT OR IGNORE INTO vol_signups (id, title, detail, hours, attended, upcoming, sort_order) VALUES ('vol-sg-01', 'Career fair booth support', 'Jul 18 · 6h · attended', 6, 1, 0, 1);
INSERT OR IGNORE INTO vol_signups (id, title, detail, hours, attended, upcoming, sort_order) VALUES ('vol-sg-02', 'Community outreach — Ikeja', 'Jun 28 · 5h · attended', 5, 1, 0, 2);
INSERT OR IGNORE INTO vol_signups (id, title, detail, hours, attended, upcoming, sort_order) VALUES ('vol-sg-03', 'Mentor hour Cohort 15', 'Next · Aug 14', NULL, 0, 1, 3);

INSERT OR IGNORE INTO vol_metrics (id, metric, value_label, detail, sort_order) VALUES ('vol-mt-01', 'Learners mentored', '14', 'across 3 cohorts', 1);
INSERT OR IGNORE INTO vol_metrics (id, metric, value_label, detail, sort_order) VALUES ('vol-mt-02', 'Outreach events', '6', '640 people reached', 2);
INSERT OR IGNORE INTO vol_metrics (id, metric, value_label, detail, sort_order) VALUES ('vol-mt-03', 'Hours served', '47', 'estimated ₦2.3m value', 3);
INSERT OR IGNORE INTO vol_metrics (id, metric, value_label, detail, sort_order) VALUES ('vol-mt-04', 'Communities', '2', 'Ikeja + Abeokuta', 4);

INSERT OR IGNORE INTO vol_hours (id, title, date_label, hours, status, sort_order) VALUES ('vol-hr-01', 'Career fair booth', 'Jul 18 · 10:00–16:00', 6, 'approved', 1);
INSERT OR IGNORE INTO vol_hours (id, title, date_label, hours, status, sort_order) VALUES ('vol-hr-02', 'Community outreach', 'Jun 28 · 09:00–14:00', 5, 'approved', 2);
INSERT OR IGNORE INTO vol_hours (id, title, date_label, hours, status, sort_order) VALUES ('vol-hr-03', 'Alumni event support', 'Jun 10 · 12:00–16:00', 4, 'pending', 3);

INSERT OR IGNORE INTO vol_groups (id, name, members, online, sort_order) VALUES ('vol-gr-01', 'Ikeja volunteers', 34, 3, 1);
INSERT OR IGNORE INTO vol_groups (id, name, members, online, sort_order) VALUES ('vol-gr-02', 'Outreach squad', 18, 5, 2);
INSERT OR IGNORE INTO vol_groups (id, name, members, online, sort_order) VALUES ('vol-gr-03', 'Mentor hours', 22, 2, 3);

INSERT OR IGNORE INTO vol_certs (id, title, detail, sort_order) VALUES ('vol-ct-01', 'Volunteer appreciation — 40h', 'Issued Jul 31 · #CEA-VOL-042', 1);
INSERT OR IGNORE INTO vol_certs (id, title, detail, sort_order) VALUES ('vol-ct-02', 'Outreach champion', 'Issued Jun 30 · #CEA-VOL-031', 2);

INSERT OR IGNORE INTO vol_months (id, month, pct, sort_order) VALUES ('vol-mo-01', 'July', 34, 1);
INSERT OR IGNORE INTO vol_months (id, month, pct, sort_order) VALUES ('vol-mo-02', 'June', 42, 2);
INSERT OR IGNORE INTO vol_months (id, month, pct, sort_order) VALUES ('vol-mo-03', 'May', 12, 3);
INSERT OR IGNORE INTO vol_months (id, month, pct, sort_order) VALUES ('vol-mo-04', 'April', 8, 4);

INSERT OR IGNORE INTO rec_appointments (id, title, detail, who, status, sort_order) VALUES ('rec-ap-01', 'Mr. Adeyemi — meeting room 2', '10:00 · 45 min', 'Oluwaseun Adebayo', 'arrived', 1);
INSERT OR IGNORE INTO rec_appointments (id, title, detail, who, status, sort_order) VALUES ('rec-ap-02', 'Registrar — records room', '10:30 · 30 min', 'Mrs. Ngozi Eze', 'confirmed', 2);
INSERT OR IGNORE INTO rec_appointments (id, title, detail, who, status, sort_order) VALUES ('rec-ap-03', 'HR — interview room A', '11:15 · 60 min', 'Tobi Adeyemi', 'confirmed', 3);
INSERT OR IGNORE INTO rec_appointments (id, title, detail, who, status, sort_order) VALUES ('rec-ap-04', 'Career office — counselling', '13:00 · 30 min', 'Zainab Yusuf', 'available', 4);

INSERT OR IGNORE INTO rec_queue (id, name, host_label, purpose, time_label, sort_order) VALUES ('rec-qq-01', 'Oluwaseun Adebayo', 'Mr. Adeyemi', 'Meeting', '10:00', 1);
INSERT OR IGNORE INTO rec_queue (id, name, host_label, purpose, time_label, sort_order) VALUES ('rec-qq-02', 'Mrs. Ngozi Eze', 'Registrar', 'Records', '10:30', 2);

INSERT OR IGNORE INTO rec_inside (id, name, since_label, badge_label, sort_order) VALUES ('rec-qn-01', 'Oluwaseun Adebayo', 'In since 10:02 · 1h 12m', 'Green · visitor', 1);
INSERT OR IGNORE INTO rec_inside (id, name, since_label, badge_label, sort_order) VALUES ('rec-qn-02', 'Mrs. Ngozi Eze', 'In since 10:31 · 43m', 'Green · visitor', 2);
INSERT OR IGNORE INTO rec_inside (id, name, since_label, badge_label, sort_order) VALUES ('rec-qn-03', 'Ada Okafor', 'In since 09:00 · resident', 'Blue · student', 3);

INSERT OR IGNORE INTO rec_deliveries (id, carrier, item, time_label, status, sort_order) VALUES ('rec-dl-01', 'OfficeMate Ltd', 'Printer toner ×6', 'Aug 3 · 10:20', 'awaiting pickup', 1);
INSERT OR IGNORE INTO rec_deliveries (id, carrier, item, time_label, status, sort_order) VALUES ('rec-dl-02', 'Books2Africa', 'Textbooks (42 cartons)', 'Aug 3 · 09:10', 'with library', 2);
INSERT OR IGNORE INTO rec_deliveries (id, carrier, item, time_label, status, sort_order) VALUES ('rec-dl-03', 'DHL', 'Server part', 'Aug 2 · 16:30', 'with IT', 3);

INSERT OR IGNORE INTO rec_inquiries (id, name, topic, time_label, stage, sort_order) VALUES ('rec-inq-01', 'Bola Johnson', 'Full-Stack programme', 'Aug 3 · 09:15', 'Follow-up booked', 1);
INSERT OR IGNORE INTO rec_inquiries (id, name, topic, time_label, stage, sort_order) VALUES ('rec-inq-02', 'Femi Alabi', 'Scholarship eligibility', 'Aug 2 · 14:40', 'Sent to admissions', 2);
INSERT OR IGNORE INTO rec_inquiries (id, name, topic, time_label, stage, sort_order) VALUES ('rec-inq-03', 'Chiamaka Obi', 'Campus tour + brochure', 'Aug 1 · 11:05', 'Tour booked', 3);

INSERT OR IGNORE INTO rec_calls (id, name, topic, time_label, kind, sort_order) VALUES ('rec-cl-01', 'Mrs. Okafor (parent)', 'Billing question', '10:12 · 6 min', 'answered', 1);
INSERT OR IGNORE INTO rec_calls (id, name, topic, time_label, kind, sort_order) VALUES ('rec-cl-02', 'TechHub Ltd', 'Partnership inquiry', '09:40 · 4 min', 'answered', 2);
INSERT OR IGNORE INTO rec_calls (id, name, topic, time_label, kind, sort_order) VALUES ('rec-cl-03', 'Unknown', 'Missed — voicemail', '09:05', 'missed', 3);
INSERT OR IGNORE INTO rec_calls (id, name, topic, time_label, kind, sort_order) VALUES ('rec-cl-04', 'NGO partner', 'Program update', '08:30 · 8 min', 'answered', 4);

INSERT OR IGNORE INTO rec_staff (id, name, role, extension, office, sort_order) VALUES ('rec-st-01', 'Mr. Adeyemi', 'Instructor · Backend', 'Ext 210', 'Block B, R12', 1);
INSERT OR IGNORE INTO rec_staff (id, name, role, extension, office, sort_order) VALUES ('rec-st-02', 'Ms. Chidera', 'Instructor · DevOps', 'Ext 211', 'Block B, R13', 2);
INSERT OR IGNORE INTO rec_staff (id, name, role, extension, office, sort_order) VALUES ('rec-st-03', 'Mrs. Obi', 'Mentor coordinator', 'Ext 134', 'Block A, R04', 3);
INSERT OR IGNORE INTO rec_staff (id, name, role, extension, office, sort_order) VALUES ('rec-st-04', 'Registrar''s office', 'Records & billing', 'Ext 100', 'Block A, R01', 4);

INSERT OR IGNORE INTO rec_tasks (id, title, time_label, done, sort_order) VALUES ('rec-ts-01', 'Morning mail to registrar', '08:30 · done', 1, 1);
INSERT OR IGNORE INTO rec_tasks (id, title, time_label, done, sort_order) VALUES ('rec-ts-02', 'Verify visitor badges after lunch', '13:00', 0, 2);
INSERT OR IGNORE INTO rec_tasks (id, title, time_label, done, sort_order) VALUES ('rec-ts-03', 'Update phone log follow-ups', '15:00', 0, 3);
INSERT OR IGNORE INTO rec_tasks (id, title, time_label, done, sort_order) VALUES ('rec-ts-04', 'Handover notes + desk report', '17:00', 0, 4);

INSERT OR IGNORE INTO rec_handover (id, note, sort_order) VALUES ('rec-hv-01', 'Oluwaseun waiting — remind Mr. Adeyemi', 1);
INSERT OR IGNORE INTO rec_handover (id, note, sort_order) VALUES ('rec-hv-02', 'Printer toner at desk for IT pickup', 2);
INSERT OR IGNORE INTO rec_handover (id, note, sort_order) VALUES ('rec-hv-03', 'Tour group booked 14:30 (12 people)', 3);