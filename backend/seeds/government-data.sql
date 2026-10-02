-- 0020 seeds — Government/compliance dashboard.
--
-- HONESTY RULE (2 Oct 2026): this suite used to ship invented regulatory
-- content — a wrong RC number (RC 1423784), a fictional NUC licence, a fake
-- "92/100 compliance score", "Annual returns 2025 · Filed", a Federal Ministry
-- of Education thread, an audit finding and staff certification counts. None of
-- it was true, and a false "Filed" on a compliance screen is worse than an
-- empty one.
--
-- Only two kinds of row belong here now:
--   1. verifiable facts about the registered company (RC 8413776, TIN
--      1086525399, one branch in Port Harcourt); and
--   2. neutral regulatory watch-items that make no claim about CEA's status.
--
-- Filings, audits, reports, checks, threads and staff certifications are left
-- EMPTY on purpose: real deadlines get tracked per
-- docs/free-automation-plan-2026-10.md §11 (compliance_deadlines + reminder
-- job). Do not re-seed invented rows to make the pages look busy.
--
-- Existing production rows: run seeds/compliance-fabricated-remove.sql once —
-- deleting rows from this file does NOT remove what a previous seed inserted.

INSERT OR IGNORE INTO govt_overview (id, metric, value_label, delta, sort_order) VALUES ('govt-ov-01', 'CAC registration', 'RC 8413776', 'Cyber Elias Academy Ltd', 1);
INSERT OR IGNORE INTO govt_overview (id, metric, value_label, delta, sort_order) VALUES ('govt-ov-02', 'Tax identification', '1086525399', 'TIN · NRS (formerly FIRS)', 2);
INSERT OR IGNORE INTO govt_overview (id, metric, value_label, delta, sort_order) VALUES ('govt-ov-03', 'Branches', '1', 'Port Harcourt', 3);
INSERT OR IGNORE INTO govt_overview (id, metric, value_label, delta, sort_order) VALUES ('govt-ov-04', 'Filings tracked here', '0', 'add real deadlines — see plan §11', 4);

INSERT OR IGNORE INTO govt_changes (id, title, detail, status, sort_order) VALUES ('govt-ch-01', 'Nigeria Data Protection Act 2023', 'NDPC enforcement · applies to student records', 'Track', 1);
INSERT OR IGNORE INTO govt_changes (id, title, detail, status, sort_order) VALUES ('govt-ch-02', 'Companies and Allied Matters Act 2020', 'Annual return within 42 days of AGM', 'Track', 2);
INSERT OR IGNORE INTO govt_changes (id, title, detail, status, sort_order) VALUES ('govt-ch-03', 'Company income tax / VAT', 'NRS (formerly FIRS) filing calendar', 'Track', 3);

INSERT OR IGNORE INTO govt_docs (id, title, version_label, status, sort_order) VALUES ('govt-dc-01', 'Privacy policy', 'Published · cea.ng/privacy', 'Published', 1);
INSERT OR IGNORE INTO govt_docs (id, title, version_label, status, sort_order) VALUES ('govt-dc-02', 'Terms of service', 'Published · cea.ng/terms', 'Published', 2);
INSERT OR IGNORE INTO govt_docs (id, title, version_label, status, sort_order) VALUES ('govt-dc-03', 'Refund & transfer policy', 'Published · cea.ng/refunds', 'Published', 3);

INSERT OR IGNORE INTO govt_facts (id, label, value, sort_order) VALUES ('govt-ft-01', 'Legal name', 'Cyber Elias Academy Ltd', 1);
INSERT OR IGNORE INTO govt_facts (id, label, value, sort_order) VALUES ('govt-ft-02', 'Registration', 'RC 8413776 · CAC', 2);
INSERT OR IGNORE INTO govt_facts (id, label, value, sort_order) VALUES ('govt-ft-03', 'TIN', '1086525399', 3);
INSERT OR IGNORE INTO govt_facts (id, label, value, sort_order) VALUES ('govt-ft-04', 'Branches', '1 · Port Harcourt', 4);

-- Deliberately empty: no filings, calendar deadlines, audits, findings, checks,
-- reports, threads or staff certifications have been recorded in this system.
-- govt_filings / govt_calendar / govt_reports / govt_threads / govt_checks /
-- govt_audits / govt_courses have no seed rows.
