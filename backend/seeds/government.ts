/*
 * Seed wrapper for government-data.sql (manual — mirrors the SQL file).
 *
 * Honest-content rewrite (2 Oct 2026): verifiable company facts and neutral
 * regulatory watch-items only. No invented filings, audits, reports, threads,
 * certifications or accreditation claims — see
 * docs/free-automation-plan-2026-10.md §11.
 *
 * NOTE: this must stay a plain template literal with REAL newlines — the test
 * helper (`test/helpers.ts` → `execStatements`) splits on "\n" and executes one
 * statement per line, so a single long escaped line silently seeds nothing.
 * Keep in sync with seeds/government-data.sql.
 */
export const seedGovernmentSql = `-- Seed: Government/compliance dashboard.
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
`;
