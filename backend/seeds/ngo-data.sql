-- 0028 seeds -- NGO partnership dashboard, mirroring the static app pages.

INSERT OR IGNORE INTO ngo_hub (id, metric, value_label, delta, sort_order) VALUES ('ngo-hb-01', 'Scholarships funded', '38', '₦12.4m disbursed', 1);
INSERT OR IGNORE INTO ngo_hub (id, metric, value_label, delta, sort_order) VALUES ('ngo-hb-02', 'Programs', '3', '2 ongoing', 2);
INSERT OR IGNORE INTO ngo_hub (id, metric, value_label, delta, sort_order) VALUES ('ngo-hb-03', 'Volunteers', '86', '14 active', 3);
INSERT OR IGNORE INTO ngo_hub (id, metric, value_label, delta, sort_order) VALUES ('ngo-hb-04', 'Impact (2026)', '1,240', 'beneficiaries', 4);

INSERT OR IGNORE INTO ngo_funds (id, name, scholars, amount, status, sort_order) VALUES ('ngo-fd-01', 'Girls in Tech · Cohort 16', '18 scholars', '₦1.2m in tuition', 'Active', 1);
INSERT OR IGNORE INTO ngo_funds (id, name, scholars, amount, status, sort_order) VALUES ('ngo-fd-02', 'Merit scholar pool', '12 scholars', '₦840k in tuition', 'Active', 2);
INSERT OR IGNORE INTO ngo_funds (id, name, scholars, amount, status, sort_order) VALUES ('ngo-fd-03', 'Refugee STEM fund', '8 applicants', 'selection in progress', 'Selecting', 3);

INSERT OR IGNORE INTO ngo_programs (id, name, location, beneficiaries, status, sort_order) VALUES ('ngo-pr-01', 'STEM Saturdays', 'Lagos', '480 beneficiaries', 'Ongoing', 1);
INSERT OR IGNORE INTO ngo_programs (id, name, location, beneficiaries, status, sort_order) VALUES ('ngo-pr-02', 'Girls Code Bootcamp', 'Abuja', '320 beneficiaries', 'Ongoing', 2);
INSERT OR IGNORE INTO ngo_programs (id, name, location, beneficiaries, status, sort_order) VALUES ('ngo-pr-03', 'Digital Literacy Drive', 'Port Harcourt', 'planned Oct', 'Planned', 3);

INSERT OR IGNORE INTO ngo_expenses (id, title, amount, pct, status, sort_order) VALUES ('ngo-ex-01', 'Facilitator stipends', '₦1.8m', '36%', 'On track', 1);
INSERT OR IGNORE INTO ngo_expenses (id, title, amount, pct, status, sort_order) VALUES ('ngo-ex-02', 'Learning materials', '₦940k', '19%', 'On track', 2);
INSERT OR IGNORE INTO ngo_expenses (id, title, amount, pct, status, sort_order) VALUES ('ngo-ex-03', 'Logistics & venues', '₦720k', '14%', 'On track', 3);
INSERT OR IGNORE INTO ngo_expenses (id, title, amount, pct, status, sort_order) VALUES ('ngo-ex-04', 'Contingency', '₦240k', '5%', 'Unspent', 4);

INSERT OR IGNORE INTO ngo_teams (id, name, volunteers, slots, status, sort_order) VALUES ('ngo-tm-01', 'STEM Saturdays · facilitators', 12, '8 slots left', 'Recruiting', 1);
INSERT OR IGNORE INTO ngo_teams (id, name, volunteers, slots, status, sort_order) VALUES ('ngo-tm-02', 'Girls Code · mentors', 9, '3 slots left', 'Recruiting', 2);
INSERT OR IGNORE INTO ngo_teams (id, name, volunteers, slots, status, sort_order) VALUES ('ngo-tm-03', 'Digital Literacy · coordinators', 6, 'full', 'Filled', 3);

INSERT OR IGNORE INTO ngo_transactions (id, title, amount, date_label, status, sort_order) VALUES ('ngo-tr-01', 'Global Giving grant', '₦18.0m inbound', 'Jul 14', 'Received', 1);
INSERT OR IGNORE INTO ngo_transactions (id, title, amount, date_label, status, sort_order) VALUES ('ngo-tr-02', 'Scholarship disbursement', '₦2.4m outbound', 'Jul 02', 'Disbursed', 2);
INSERT OR IGNORE INTO ngo_transactions (id, title, amount, date_label, status, sort_order) VALUES ('ngo-tr-03', 'Crowdfund · drive 2026', '₦6.1m raised · 84% of target', 'Ongoing', 'Ongoing', 3);

INSERT OR IGNORE INTO ngo_reports (id, title, detail, status, sort_order) VALUES ('ngo-rp-01', 'Impact report · H1 2026', '740 beneficiaries · ₦8.2m deployed', 'Published', 1);
INSERT OR IGNORE INTO ngo_reports (id, title, detail, status, sort_order) VALUES ('ngo-rp-02', 'Girls Code Bootcamp report', '320 graduates · 91% completion', 'Published', 2);
INSERT OR IGNORE INTO ngo_reports (id, title, detail, status, sort_order) VALUES ('ngo-rp-03', 'Q3 draft · STEM Saturdays', 'In review · due Aug 15', 'Draft', 3);

INSERT OR IGNORE INTO ngo_metrics (id, label, value, delta, sort_order) VALUES ('ngo-mt-01', 'Cost per beneficiary', '₦6,600', 'down 12% YoY', 1);
INSERT OR IGNORE INTO ngo_metrics (id, label, value, delta, sort_order) VALUES ('ngo-mt-02', 'Retention', '87%', 'of scholars re-engage', 2);
INSERT OR IGNORE INTO ngo_metrics (id, label, value, delta, sort_order) VALUES ('ngo-mt-03', 'Outcome rate', '91%', 'of goals met', 3);

INSERT OR IGNORE INTO ngo_threads (id, title, from_label, time_label, status, sort_order) VALUES ('ngo-th-01', 'Scholarship cohort 16 disbursement', 'CEA finance', 'Jul 29 · 11:02', 'Open', 1);
INSERT OR IGNORE INTO ngo_threads (id, title, from_label, time_label, status, sort_order) VALUES ('ngo-th-02', 'Impact report H1 review', 'CEA programs', 'Jul 22 · 09:18', 'Closed', 2);
INSERT OR IGNORE INTO ngo_threads (id, title, from_label, time_label, status, sort_order) VALUES ('ngo-th-03', 'STEM Saturdays venue change', 'CEA ops', 'Jul 18 · 15:44', 'Closed', 3);