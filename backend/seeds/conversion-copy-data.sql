-- 0026 seeds -- Conversion copy dashboard, mirroring the static app pages.

INSERT OR IGNORE INTO ccp_hub (id, metric, value_label, delta, sort_order) VALUES ('ccp-hb-01', 'Assets', '214', '112 email · 64 page', 1);
INSERT OR IGNORE INTO ccp_hub (id, metric, value_label, delta, sort_order) VALUES ('ccp-hb-02', 'Variants', '38', 'A/B ready', 2);
INSERT OR IGNORE INTO ccp_hub (id, metric, value_label, delta, sort_order) VALUES ('ccp-hb-03', 'Reused (30d)', '142', 'pull count', 3);
INSERT OR IGNORE INTO ccp_hub (id, metric, value_label, delta, sort_order) VALUES ('ccp-hb-04', 'Drafts', '7', 'in progress', 4);

INSERT OR IGNORE INTO ccp_assets (id, title, category, variants, last_used, status, sort_order) VALUES ('ccp-as-01', 'Enrolment page H1 set', 'Page', 12, 'Jul 28', 'Active', 1);
INSERT OR IGNORE INTO ccp_assets (id, title, category, variants, last_used, status, sort_order) VALUES ('ccp-as-02', 'Cohort 17 launch email', 'Email', 4, 'Jul 20', 'Active', 2);
INSERT OR IGNORE INTO ccp_assets (id, title, category, variants, last_used, status, sort_order) VALUES ('ccp-as-03', 'Scholarship hero copy', 'Page', 3, 'review pending', 'Draft', 3);

INSERT OR IGNORE INTO ccp_rules (id, name, category, detail, status, sort_order) VALUES ('ccp-rl-01', 'Tone', 'Voice', 'Confident, warm, zero hype…', 'Enforced', 1);
INSERT OR IGNORE INTO ccp_rules (id, name, category, detail, status, sort_order) VALUES ('ccp-rl-02', 'Formatting', 'Grammar', 'Sentences ≤ 20 words…', 'Enforced', 2);
INSERT OR IGNORE INTO ccp_rules (id, name, category, detail, status, sort_order) VALUES ('ccp-rl-03', 'Localization', 'Voice', 'English + pidgin variants…', 'Draft', 3);

INSERT OR IGNORE INTO ccp_sequences (id, title, emails, open_rate, click_rate, status, sort_order) VALUES ('ccp-sq-01', 'Application follow-up', 5, '42%', '9.1%', 'Live', 1);
INSERT OR IGNORE INTO ccp_sequences (id, title, emails, open_rate, click_rate, status, sort_order) VALUES ('ccp-sq-02', 'Cohort 17 nurture', 7, '38%', '7.4%', 'Live', 2);
INSERT OR IGNORE INTO ccp_sequences (id, title, emails, open_rate, click_rate, status, sort_order) VALUES ('ccp-sq-03', 'Scholarship reminder', 3, '—', '—', 'Testing', 3);

INSERT OR IGNORE INTO ccp_briefs (id, title, requester, date_label, status, sort_order) VALUES ('ccp-br-01', 'Cohort 17 landing refresh', 'Marketing', 'Jul 31', 'In progress', 1);
INSERT OR IGNORE INTO ccp_briefs (id, title, requester, date_label, status, sort_order) VALUES ('ccp-br-02', 'Scholarship campaign copy', 'NGO partner', 'Jul 28', 'In review', 2);
INSERT OR IGNORE INTO ccp_briefs (id, title, requester, date_label, status, sort_order) VALUES ('ccp-br-03', 'Alumni referral email', 'Career services', 'Jul 25', 'Done', 3);

INSERT OR IGNORE INTO ccp_analytics (id, stage, visits, conversion, delta, sort_order) VALUES ('ccp-an-01', 'Organic → application', '18.4k', '5.4%', '+0.8 pts', 1);
INSERT OR IGNORE INTO ccp_analytics (id, stage, visits, conversion, delta, sort_order) VALUES ('ccp-an-02', 'Paid → application', '22.1k', '3.1%', '+0.4 pts', 2);
INSERT OR IGNORE INTO ccp_analytics (id, stage, visits, conversion, delta, sort_order) VALUES ('ccp-an-03', 'Application → enrolment', '1,612', '26.4%', '−1.2 pts', 3);

INSERT OR IGNORE INTO ccp_ads (id, name, channel, ctr, variants, status, sort_order) VALUES ('ccp-ad-01', 'Cohort 17 launch', 'Meta', '2.1%', 4, 'Running', 1);
INSERT OR IGNORE INTO ccp_ads (id, name, channel, ctr, variants, status, sort_order) VALUES ('ccp-ad-02', 'Scholarship search', 'Google', '3.4%', 3, 'Running', 2);
INSERT OR IGNORE INTO ccp_ads (id, name, channel, ctr, variants, status, sort_order) VALUES ('ccp-ad-03', 'Day in the life', 'TikTok', '1.2%', 2, 'Paused', 3);

INSERT OR IGNORE INTO ccp_tests (id, title, result, status, sort_order) VALUES ('ccp-tt-01', 'Enrolment H1 · A vs B', 'B wins +12% · deployed', 'Winner', 1);
INSERT OR IGNORE INTO ccp_tests (id, title, result, status, sort_order) VALUES ('ccp-tt-02', 'Email subject · A vs B', 'A wins +8% opens · deployed', 'Winner', 2);
INSERT OR IGNORE INTO ccp_tests (id, title, result, status, sort_order) VALUES ('ccp-tt-03', 'Scholarship hero · A vs B', 'Running · 4,200 visits', 'Running', 3);

INSERT OR IGNORE INTO ccp_sections (id, title, copy, conversion, status, sort_order) VALUES ('ccp-sc-01', 'Hero', 'Cohort 17 applications open — pay in installments', '6.2%', 'Active', 1);
INSERT OR IGNORE INTO ccp_sections (id, title, copy, conversion, status, sort_order) VALUES ('ccp-sc-02', 'Social proof', '1,240+ alumni placed in tech roles', '4.8%', 'Active', 2);
INSERT OR IGNORE INTO ccp_sections (id, title, copy, conversion, status, sort_order) VALUES ('ccp-sc-03', 'FAQ', '12 questions · updated by admissions', 'Saves 31% of tickets', 'Active', 3);