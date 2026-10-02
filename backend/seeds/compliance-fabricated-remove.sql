-- Removes the invented compliance rows that earlier seeds (0020 —
-- seeds/government-data.sql, applied to production before 2 Oct 2026) wrote into
-- D1. Safe to run once; safe to re-run (idempotent).
--
--   cd backend
--   npx wrangler d1 execute DB --remote --file seeds/compliance-fabricated-remove.sql
--   npx wrangler d1 execute DB --local  --file seeds/compliance-fabricated-remove.sql
--
-- Why: the government workspace showed a wrong RC number, a fictional NUC
-- licence, a fake audit score ("92/100"), three-figure staff certification
-- counts, a Federal Ministry of Education thread and — most dangerously —
-- "Annual returns 2025 · Filed". None of it was real. See
-- docs/free-automation-plan-2026-10.md §11 for what replaces it.

-- Filings: the false "Filed" claims (the dangerous ones).
DELETE FROM govt_filings;

-- Deadlines and reports with invented dates and statuses.
DELETE FROM govt_calendar;
DELETE FROM govt_reports;

-- Invented audits, findings and reconciliation checks.
DELETE FROM govt_audits;
DELETE FROM govt_checks;

-- Correspondence that never happened.
DELETE FROM govt_threads;

-- Staff certification counts (CEA has not run these programmes).
DELETE FROM govt_courses;

-- Documents that do not exist as versioned artefacts.
DELETE FROM govt_docs
 WHERE id IN ('govt-dc-01', 'govt-dc-02', 'govt-dc-03');
INSERT OR IGNORE INTO govt_docs (id, title, version_label, status, sort_order) VALUES ('govt-dc-01', 'Privacy policy', 'Published · cea.ng/privacy', 'Published', 1);
INSERT OR IGNORE INTO govt_docs (id, title, version_label, status, sort_order) VALUES ('govt-dc-02', 'Terms of service', 'Published · cea.ng/terms', 'Published', 2);
INSERT OR IGNORE INTO govt_docs (id, title, version_label, status, sort_order) VALUES ('govt-dc-03', 'Refund & transfer policy', 'Published · cea.ng/refunds', 'Published', 3);

-- Regulatory watch-items: replace invented "CEA compliant" claims with neutral
-- tracking rows.
DELETE FROM govt_changes;
INSERT OR IGNORE INTO govt_changes (id, title, detail, status, sort_order) VALUES ('govt-ch-01', 'Nigeria Data Protection Act 2023', 'NDPC enforcement · applies to student records', 'Track', 1);
INSERT OR IGNORE INTO govt_changes (id, title, detail, status, sort_order) VALUES ('govt-ch-02', 'Companies and Allied Matters Act 2020', 'Annual return within 42 days of AGM', 'Track', 2);
INSERT OR IGNORE INTO govt_changes (id, title, detail, status, sort_order) VALUES ('govt-ch-03', 'Company income tax / VAT', 'NRS (formerly FIRS) filing calendar', 'Track', 3);

-- Facts and headline metrics: swap the wrong registration data for the real one.
DELETE FROM govt_facts;
INSERT OR IGNORE INTO govt_facts (id, label, value, sort_order) VALUES ('govt-ft-01', 'Legal name', 'Cyber Elias Academy Ltd', 1);
INSERT OR IGNORE INTO govt_facts (id, label, value, sort_order) VALUES ('govt-ft-02', 'Registration', 'RC 8413776 · CAC', 2);
INSERT OR IGNORE INTO govt_facts (id, label, value, sort_order) VALUES ('govt-ft-03', 'TIN', '1086525399', 3);
INSERT OR IGNORE INTO govt_facts (id, label, value, sort_order) VALUES ('govt-ft-04', 'Branches', '1 · Port Harcourt', 4);

DELETE FROM govt_overview;
INSERT OR IGNORE INTO govt_overview (id, metric, value_label, delta, sort_order) VALUES ('govt-ov-01', 'CAC registration', 'RC 8413776', 'Cyber Elias Academy Ltd', 1);
INSERT OR IGNORE INTO govt_overview (id, metric, value_label, delta, sort_order) VALUES ('govt-ov-02', 'Tax identification', '1086525399', 'TIN · NRS (formerly FIRS)', 2);
INSERT OR IGNORE INTO govt_overview (id, metric, value_label, delta, sort_order) VALUES ('govt-ov-03', 'Branches', '1', 'Port Harcourt', 3);
INSERT OR IGNORE INTO govt_overview (id, metric, value_label, delta, sort_order) VALUES ('govt-ov-04', 'Filings tracked here', '0', 'add real deadlines — see plan §11', 4);

-- Verify afterwards: every remaining row should be verifiable or explicitly a
-- watch-item. Nothing should claim a filing, an audit or an accreditation.
--   SELECT 'filings' AS t, COUNT(*) FROM govt_filings
--   UNION ALL SELECT 'audits', COUNT(*) FROM govt_audits
--   UNION ALL SELECT 'reports', COUNT(*) FROM govt_reports;
