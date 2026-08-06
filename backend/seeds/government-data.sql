-- 0020 seeds — Government/compliance dashboard, mirroring the static app pages.

INSERT INTO govt_overview (id, metric, value_label, delta, sort_order) VALUES ('govt-ov-01', 'Compliance score', '92', 'of 100', 1);
INSERT INTO govt_overview (id, metric, value_label, delta, sort_order) VALUES ('govt-ov-02', 'Open findings', '1', 'low priority', 2);
INSERT INTO govt_overview (id, metric, value_label, delta, sort_order) VALUES ('govt-ov-03', 'Filings (year)', '14', '0 overdue', 3);
INSERT INTO govt_overview (id, metric, value_label, delta, sort_order) VALUES ('govt-ov-04', 'Next review', '2027', 'Feb · on track', 4);

INSERT INTO govt_calendar (id, title, date_label, status, sort_order) VALUES ('govt-cl-01', 'Audit inspection', 'Sep 18 · on-site', 'Scheduled', 1);
INSERT INTO govt_calendar (id, title, date_label, status, sort_order) VALUES ('govt-cl-02', 'Tuition fee schedule filing', 'Aug 30 · online', 'Upcoming', 2);
INSERT INTO govt_calendar (id, title, date_label, status, sort_order) VALUES ('govt-cl-03', 'Q3 enrolment census', 'Oct 15 · online', 'Upcoming', 3);

INSERT INTO govt_changes (id, title, detail, status, sort_order) VALUES ('govt-ch-01', 'NDPR enforcement guidelines v2', 'Effective Aug 01 · CEA compliant', 'Compliant', 1);
INSERT INTO govt_changes (id, title, detail, status, sort_order) VALUES ('govt-ch-02', 'Tuition fee disclosure rules', 'Effective Jul 01 · CEA compliant', 'Compliant', 2);
INSERT INTO govt_changes (id, title, detail, status, sort_order) VALUES ('govt-ch-03', 'Student data retention policy', 'Effective Oct 01 · CEA reviewing', 'In review', 3);

INSERT INTO govt_docs (id, title, version_label, status, sort_order) VALUES ('govt-dc-01', 'Academic policy handbook', 'v4.2 · Jul 2026', 'Current', 1);
INSERT INTO govt_docs (id, title, version_label, status, sort_order) VALUES ('govt-dc-02', 'Tuition & fees policy', 'v2.1 · Jan 2026', 'Current', 2);
INSERT INTO govt_docs (id, title, version_label, status, sort_order) VALUES ('govt-dc-03', 'Student conduct code', 'v3.0 · Sep 2025', 'Reviewing', 3);

INSERT INTO govt_facts (id, label, value, sort_order) VALUES ('govt-ft-01', 'Registration', 'RC 1423784 · CAC', 1);
INSERT INTO govt_facts (id, label, value, sort_order) VALUES ('govt-ft-02', 'Licence', 'MBBS/PC/2024/0142 · NUC', 2);
INSERT INTO govt_facts (id, label, value, sort_order) VALUES ('govt-ft-03', 'Branches', '3 · Lagos, Abuja, Port Harcourt', 3);
INSERT INTO govt_facts (id, label, value, sort_order) VALUES ('govt-ft-04', 'Academic board', 'Constituted · 11 members', 4);

INSERT INTO govt_reports (id, title, detail, status, sort_order) VALUES ('govt-rp-01', 'Annual compliance report · 2025/26', 'Fiscal year close · filed', 'Filed', 1);
INSERT INTO govt_reports (id, title, detail, status, sort_order) VALUES ('govt-rp-02', 'Student enrolment census · Q2', 'Due Aug 15 · ready', 'Ready', 2);
INSERT INTO govt_reports (id, title, detail, status, sort_order) VALUES ('govt-rp-03', 'Financial statement · audited', 'FY 2025 · approved', 'Filed', 3);

INSERT INTO govt_threads (id, title, from_label, time_label, status, sort_order) VALUES ('govt-th-01', 'Re: accreditation evidence — awaiting 2 documents', 'CEA compliance office', 'Jul 30 · 14:02', 'Open', 1);
INSERT INTO govt_threads (id, title, from_label, time_label, status, sort_order) VALUES ('govt-th-02', 'Q2 census filing confirmation', 'Federal Ministry of Education', 'Jul 14 · 09:30', 'Closed', 2);
INSERT INTO govt_threads (id, title, from_label, time_label, status, sort_order) VALUES ('govt-th-03', 'Facilities audit scheduling', 'CEA compliance office', 'Jul 08 · 11:12', 'Closed', 3);

INSERT INTO govt_checks (id, title, detail, status, sort_order) VALUES ('govt-ck-01', 'Enrolment vs census', 'Matches filed Q2 census', 'Pass', 1);
INSERT INTO govt_checks (id, title, detail, status, sort_order) VALUES ('govt-ck-02', 'Financials vs audited', 'Matches audited FY25 statement', 'Pass', 2);
INSERT INTO govt_checks (id, title, detail, status, sort_order) VALUES ('govt-ck-03', 'Facilities register', '1 of 18 pending re-certification', 'Flagged', 3);

INSERT INTO govt_audits (id, title, detail, status, sort_order) VALUES ('govt-ad-01', 'Institutional audit · FY 2025', 'Completed Mar 12 · 92/100', 'Closed', 1);
INSERT INTO govt_audits (id, title, detail, status, sort_order) VALUES ('govt-ad-02', 'Facilities compliance check', 'Scheduled Sep 18', 'Planned', 2);
INSERT INTO govt_audits (id, title, detail, status, sort_order) VALUES ('govt-ad-03', 'Financial record inspection', 'Finding #2 · remediation due Aug 30', 'Open', 3);

INSERT INTO govt_filings (id, title, detail, status, sort_order) VALUES ('govt-fl-01', 'Q2 enrolment census', 'Filed Jul 14 · ref FED-2026-0142', 'Filed', 1);
INSERT INTO govt_filings (id, title, detail, status, sort_order) VALUES ('govt-fl-02', 'Tuition fee schedule', 'Due Aug 30 · drafted', 'Draft', 2);
INSERT INTO govt_filings (id, title, detail, status, sort_order) VALUES ('govt-fl-03', 'Annual returns 2025', 'Filed Apr 02 · ref FED-2026-0089', 'Filed', 3);

INSERT INTO govt_courses (id, title, detail, status, sort_order) VALUES ('govt-cr-01', 'Data protection (NDPR)', '88 staff certified', 'Current', 1);
INSERT INTO govt_courses (id, title, detail, status, sort_order) VALUES ('govt-cr-02', 'Child safeguarding', '214 staff certified', 'Current', 2);
INSERT INTO govt_courses (id, title, detail, status, sort_order) VALUES ('govt-cr-03', 'Academic integrity', '46 certified · 12 pending', 'Renewing', 3);