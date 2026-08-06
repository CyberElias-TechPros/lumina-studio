-- 0023 seeds — Alumni dashboard, mirroring the static app pages.

INSERT INTO alu_hub (id, metric, value_label, delta, sort_order) VALUES ('alu-hb-01', 'Connections', '86', '+12 this month', 1);
INSERT INTO alu_hub (id, metric, value_label, delta, sort_order) VALUES ('alu-hb-02', 'Events RSVP''d', '3', 'reunion Sep 6', 2);
INSERT INTO alu_hub (id, metric, value_label, delta, sort_order) VALUES ('alu-hb-03', 'Jobs referred', '4', '2 hired', 3);
INSERT INTO alu_hub (id, metric, value_label, delta, sort_order) VALUES ('alu-hb-04', 'Lifetime giving', '₦480k', '2 scholarships', 4);

INSERT INTO alu_events (id, title, date_label, location, going, status, sort_order) VALUES ('alu-ev-01', 'Cohort 12 reunion', 'Sep 6 · 15:00', 'Lagos campus courtyard', 74, 'Going', 1);
INSERT INTO alu_events (id, title, date_label, location, going, status, sort_order) VALUES ('alu-ev-02', 'Career day + hiring fair', 'Sep 14 · 10:00', 'Main hall + online', 210, 'Interested', 2);
INSERT INTO alu_events (id, title, date_label, location, going, status, sort_order) VALUES ('alu-ev-03', 'Alumni × students: speed mentoring', 'Sep 28 · 14:00', 'Online', 56, 'RSVP', 3);
INSERT INTO alu_events (id, title, date_label, location, going, status, sort_order) VALUES ('alu-ev-04', 'Founder stories: fintech edition', 'Oct 12 · 18:00', 'Online', 88, 'Save', 4);

INSERT INTO alu_members (id, name, cohort, role_label, city, conn, sort_order) VALUES ('alu-mb-01', 'Amina Suleiman', 'Cloud Eng. · 2023', 'SRE @ Paystack', 'Lagos', 1, 1);
INSERT INTO alu_members (id, name, cohort, role_label, city, conn, sort_order) VALUES ('alu-mb-02', 'David Osei', 'Full-Stack · 2024', 'Frontend @ Andela', 'Accra', 0, 2);
INSERT INTO alu_members (id, name, cohort, role_label, city, conn, sort_order) VALUES ('alu-mb-03', 'Blessing Ade', 'Data Science · 2022', 'ML Eng @ Kuda', 'Lagos', 2, 3);
INSERT INTO alu_members (id, name, cohort, role_label, city, conn, sort_order) VALUES ('alu-mb-04', 'Ibrahim Musa', 'DevOps · 2024', 'Platform @ Flutterwave', 'Abuja', 0, 4);

INSERT INTO alu_stories (id, name, cohort, company, role, excerpt, initials, tone, sort_order) VALUES ('alu-sr-01', 'Tunde Bakare', 'Cohort 12', 'Paystack', 'Platform Engineer', 'Three months after demo day I had a Paystack offer. The mock interviews my mentor ran were harder than the real thing.', 'TB', 'bg-gradient-learning', 1);
INSERT INTO alu_stories (id, name, cohort, company, role, excerpt, initials, tone, sort_order) VALUES ('alu-sr-02', 'Chiamaka Eze', 'Cohort 10', 'Flutterwave', 'Product Designer', 'The portfolio sprint review caught everything I''d have missed. My design case study still opens doors two years later.', 'CE', 'bg-gradient-erp', 2);
INSERT INTO alu_stories (id, name, cohort, company, role, excerpt, initials, tone, sort_order) VALUES ('alu-sr-03', 'Ibrahim Sule', 'Cohort 11', 'Andela', 'DevOps Engineer', 'Cohort 11''s CI/CD module was brutal — and it''s exactly why I aced Andela''s take-home in one weekend.', 'IS', 'bg-gradient-services', 3);
INSERT INTO alu_stories (id, name, cohort, company, role, excerpt, initials, tone, sort_order) VALUES ('alu-sr-04', 'Funke Adeyemi', 'Cohort 9', 'Interswitch', 'Backend Engineer', 'I went from working at a cyber café in Surulere to shipping payment rails. CEA''s lab nights were everything.', 'FA', 'bg-gradient-career', 4);
INSERT INTO alu_stories (id, name, cohort, company, role, excerpt, initials, tone, sort_order) VALUES ('alu-sr-05', 'Ngozi Umeh', 'Cohort 12', 'Kuda', 'Data Analyst', 'The SQL mid-term humbled me. I retook it, passed, and now I query Kuda''s core ledger every single day.', 'NU', 'bg-gradient-learning', 5);
INSERT INTO alu_stories (id, name, cohort, company, role, excerpt, initials, tone, sort_order) VALUES ('alu-sr-06', 'Samuel Adebayo', 'Cohort 8', 'Terragon', 'Data Engineer', 'My capstone on streaming ingestion is still in production at Terragon. Yes, the exact one from class.', 'SA', 'bg-gradient-erp', 6);

INSERT INTO alu_milestones (id, label, value, sort_order) VALUES ('alu-ml-01', 'Stories published', '214', 1);
INSERT INTO alu_milestones (id, label, value, sort_order) VALUES ('alu-ml-02', 'Companies represented', '86', 2);
INSERT INTO alu_milestones (id, label, value, sort_order) VALUES ('alu-ml-03', 'Readers this quarter', '38k', 3);
INSERT INTO alu_milestones (id, label, value, sort_order) VALUES ('alu-ml-04', 'Graduates hired via stories', '47', 4);

INSERT INTO alu_jobs (id, role, company, period, place, current, description, sort_order) VALUES ('alu-jb-01', 'Frontend Engineer', 'Kuda', '2025 – present', 'Lekki, Lagos', 1, 'Building onboarding flows and the design system used by 3.4m customers.', 1);
INSERT INTO alu_jobs (id, role, company, period, place, current, description, sort_order) VALUES ('alu-jb-02', 'Junior Software Developer', 'Interswitch', '2024 – 2025', 'Victoria Island, Lagos', 0, 'Shipped payment integrations for 14 partners in my first year.', 2);
INSERT INTO alu_jobs (id, role, company, period, place, current, description, sort_order) VALUES ('alu-jb-03', 'Software Engineering Intern', 'Zuri', '2024', 'Remote', 0, 'Full-stack internship; ended with a production dashboard for a Lagos logistics startup.', 3);

INSERT INTO alu_achievements (id, title, org, year, sort_order) VALUES ('alu-ac-01', 'Full-Stack Diploma — Distinction', 'CEA · Cohort 12', '2024', 1);
INSERT INTO alu_achievements (id, title, org, year, sort_order) VALUES ('alu-ac-02', 'AWS Cloud Practitioner', 'Amazon Web Services', '2025', 2);
INSERT INTO alu_achievements (id, title, org, year, sort_order) VALUES ('alu-ac-03', 'Cohort 12 Class Representative', 'CEA Student Life', '2024', 3);

INSERT INTO alu_skills (id, name, sort_order) VALUES ('alu-sk-01', 'TypeScript', 1);
INSERT INTO alu_skills (id, name, sort_order) VALUES ('alu-sk-02', 'React', 2);
INSERT INTO alu_skills (id, name, sort_order) VALUES ('alu-sk-03', 'Node.js', 3);
INSERT INTO alu_skills (id, name, sort_order) VALUES ('alu-sk-04', 'Tailwind CSS', 4);
INSERT INTO alu_skills (id, name, sort_order) VALUES ('alu-sk-05', 'PostgreSQL', 5);
INSERT INTO alu_skills (id, name, sort_order) VALUES ('alu-sk-06', 'Docker', 6);
INSERT INTO alu_skills (id, name, sort_order) VALUES ('alu-sk-07', 'CI/CD', 7);
INSERT INTO alu_skills (id, name, sort_order) VALUES ('alu-sk-08', 'Design systems', 8);
INSERT INTO alu_skills (id, name, sort_order) VALUES ('alu-sk-09', 'REST APIs', 9);

INSERT INTO alu_commitments (id, mentee, track, cadence, next_label, status, sort_order) VALUES ('alu-cm-01', 'Ada Okafor', 'Backend specialisation', 'Fortnightly 1:1', 'Aug 21 · 16:00', 'Active', 1);
INSERT INTO alu_commitments (id, mentee, track, cadence, next_label, status, sort_order) VALUES ('alu-cm-02', 'Tobi Adeyemi', 'DevOps', 'Weekly group session', 'Aug 22 · 11:00', 'Active', 2);
INSERT INTO alu_commitments (id, mentee, track, cadence, next_label, status, sort_order) VALUES ('alu-cm-03', 'Zainab Yusuf', 'Product design', 'Async messaging', 'Ongoing', 'Active', 3);

INSERT INTO alu_ways (id, title, detail, sort_order) VALUES ('alu-wy-01', 'Scholarship fund', 'Fund a student''s term — ₦700k covers a full scholarship', 1);
INSERT INTO alu_ways (id, title, detail, sort_order) VALUES ('alu-wy-02', 'Mentor a learner', '2 hours a month, online or on campus', 2);
INSERT INTO alu_ways (id, title, detail, sort_order) VALUES ('alu-wy-03', 'Host an internship', 'Open a seat in your team for a final-year learner', 3);
INSERT INTO alu_ways (id, title, detail, sort_order) VALUES ('alu-wy-04', 'Speaker at career day', 'Share your journey at the Sep 14 event', 4);

INSERT INTO alu_impact (id, value, label, sort_order) VALUES ('alu-im-01', '2', 'scholarships funded', 1);
INSERT INTO alu_impact (id, value, label, sort_order) VALUES ('alu-im-02', '3', 'mentees guided to jobs', 2);
INSERT INTO alu_impact (id, value, label, sort_order) VALUES ('alu-im-03', '1', 'internship hosted', 3);