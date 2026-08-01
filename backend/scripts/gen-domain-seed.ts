/**
 * Generates api/seeds/domain-data.sql + api/seeds/domain.ts from the canonical
 * collections in ../../src/data/{learning,dashboard,recruitment,marketing,
 * design,localization}.ts.
 * Run: npm run gen:seed (from api/).
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  learningCourses,
  courseBuilder,
  submissions,
  instructorGradebook,
  liveSessions,
} from "../../src/data/learning";
import {
  employees,
  leaveRequests,
  invoices,
  expenses,
  systemUsers,
  auditLog,
  notifications,
  payrollChanges,
  paymentBatches,
  payments,
} from "../../src/data/dashboard";
import {
  postings,
  pipelineCandidates,
  interviews,
  talentCandidates,
} from "../../src/data/recruitment";
import {
  marketingKpis,
  campaigns,
  emailCampaigns,
  socialPosts,
  landingPages,
  seoKeywords,
  contentCalendar,
  leads,
  marketingReports,
  funnelStages,
} from "../../src/data/marketing";
import {
  designComponents,
  designFlows,
  designPrototypes,
  designTokens,
  designVersions,
  collaborationThreads,
  designExports,
  systemComponents,
  designKpis,
} from "../../src/data/design";
import {
  localizationProjects,
  glossaryTerms,
  styleGuides,
  translationMemory,
  dialects,
  variants,
  localizationMarkets,
  previewBlocks,
  localizationStats,
} from "../../src/data/localization";

const OUT_DIR = resolve(dirname(fileURLToPath(import.meta.url)), "..", "seeds");

const DEMO_INSTRUCTOR_ID = "00000000-0000-4000-8000-000000000002";
const DEMO_STUDENT_ID = "00000000-0000-4000-8000-000000000001";
const DEMO_ADMIN_ID = "00000000-0000-4000-8000-000000000003";
const DEMO_HR_ID = "00000000-0000-4000-8000-000000000004";
const DEMO_FINANCE_ID = "00000000-0000-4000-8000-000000000005";

function sqlString(value: string): string {
  return `'${value.replace(/'/g, "''").replace(/\\/g, "\\\\")}'`;
}

function jsonString(value: unknown): string {
  return sqlString(JSON.stringify(value));
}

const statements: string[] = [];

statements.push(
  `INSERT OR IGNORE INTO users (id, name, email, role_key, status) ` +
    `VALUES (${sqlString(DEMO_ADMIN_ID)}, 'Aisha Bakare', 'admin@cea.ng', 'admin', 'active');`,
);
statements.push(
  `INSERT OR IGNORE INTO users (id, name, email, role_key, status) ` +
    `VALUES (${sqlString(DEMO_HR_ID)}, 'Fatima Bello', 'hr@cea.ng', 'hr', 'active');`,
);
statements.push(
  `INSERT OR IGNORE INTO users (id, name, email, role_key, status) ` +
    `VALUES (${sqlString(DEMO_FINANCE_ID)}, 'Musa Ibrahim', 'finance@cea.ng', 'finance', 'active');`,
);

const DEMO_PASSWORD_HASH =
  "pbkdf2$100000$Ji2F9wTwR5Xqenb7vFV/AQ==$9BO5Y8tQuzR2g447yIJWQ7AtcmF38eaCRuxQturwFoU=";
for (const email of ["admin@cea.ng", "hr@cea.ng", "finance@cea.ng"]) {
  statements.push(
    `UPDATE users SET password_hash = ${sqlString(DEMO_PASSWORD_HASH)} ` +
      `WHERE email = '${email}' AND password_hash IS NULL;`,
  );
}

const seededCourses = [
  ...learningCourses.map((c) => ({
    slug: c.slug,
    title: c.title,
    cohort: c.cohort,
    status: "published",
    modules: c.modules,
  })),
  {
    slug: courseBuilder.slug,
    title: courseBuilder.title,
    cohort: courseBuilder.cohort,
    status: courseBuilder.status,
    modules: courseBuilder.modules,
  },
];
for (const course of seededCourses) {
  statements.push(
    `INSERT OR IGNORE INTO instructor_courses (id, user_id, title, cohort, status, modules, sort_order) ` +
      `VALUES (${sqlString(course.slug)}, ${sqlString(DEMO_INSTRUCTOR_ID)}, ` +
      `${sqlString(course.title)}, ${sqlString(course.cohort)}, ${sqlString(course.status)}, ` +
      `${jsonString(course.modules)}, ${seededCourses.indexOf(course)});`,
  );
}

for (const s of submissions) {
  statements.push(
    `INSERT OR IGNORE INTO submissions (id, user_id, student, title, submitted, status, score, ` +
      `late, file, size) ` +
      `VALUES (${sqlString(s.id)}, ${sqlString(DEMO_INSTRUCTOR_ID)}, ` +
      `${sqlString(s.student)}, ${sqlString(s.title)}, ${sqlString(s.submitted)}, ` +
      `${sqlString(s.status)}, ${s.score ?? "NULL"}, ${s.late ? 1 : 0}, ` +
      `${sqlString(s.file)}, ${sqlString(s.size)});`,
  );
}

for (const row of instructorGradebook) {
  statements.push(
    `INSERT OR IGNORE INTO instructor_gradebook (id, user_id, student, quiz, lab, assignment, ` +
      `midterm, total, letter, at_risk) ` +
      `VALUES (${sqlString(`ig-${row.student.replace(/\s+/g, "-")}`)}, ` +
      `${sqlString(DEMO_INSTRUCTOR_ID)}, ${sqlString(row.student)}, ${row.quiz}, ${row.lab}, ` +
      `${row.assignment}, ${row.midterm}, ${row.total}, ${sqlString(row.letter)}, ` +
      `${row.atRisk ? 1 : 0});`,
  );
}

for (const e of employees) {
  statements.push(
    `INSERT OR IGNORE INTO employees (id, name, role, dept, status, joined, sort_order) ` +
      `VALUES (${sqlString(`emp-${employees.indexOf(e) + 1}`)}, ${sqlString(e.name)}, ` +
      `${sqlString(e.role)}, ${sqlString(e.dept)}, ${sqlString(e.status)}, ` +
      `${sqlString(e.joined)}, ${employees.indexOf(e)});`,
  );
}

for (const r of leaveRequests) {
  statements.push(
    `INSERT OR IGNORE INTO leave_requests (id, employee, type, from_date, to_date, status, sort_order) ` +
      `VALUES (${sqlString(`lv-${leaveRequests.indexOf(r) + 1}`)}, ${sqlString(r.name)}, ` +
      `${sqlString(r.type)}, ${sqlString(r.from)}, ${sqlString(r.to)}, ` +
      `${sqlString(r.status)}, ${leaveRequests.indexOf(r)});`,
  );
}

for (const inv of invoices) {
  statements.push(
    `INSERT OR IGNORE INTO invoices (id, party, amount, due, status, sort_order) ` +
      `VALUES (${sqlString(inv.id)}, ${sqlString(inv.party)}, ${inv.amount}, ` +
      `${sqlString(inv.due)}, ${sqlString(inv.status)}, ${invoices.indexOf(inv)});`,
  );
}

for (const x of expenses) {
  statements.push(
    `INSERT OR IGNORE INTO expenses (id, category, amount, sort_order) ` +
      `VALUES (${sqlString(`exp-${expenses.indexOf(x) + 1}`)}, ${sqlString(x.category)}, ` +
      `${x.amount}, ${expenses.indexOf(x)});`,
  );
}

for (const u of systemUsers) {
  statements.push(
    `INSERT OR IGNORE INTO admin_users (id, name, email, role, status, last_seen, sort_order) ` +
      `VALUES (${sqlString(`au-${systemUsers.indexOf(u) + 1}`)}, ${sqlString(u.name)}, ` +
      `${sqlString(u.email)}, ${sqlString(u.role)}, ${sqlString(u.status)}, ` +
      `${sqlString(u.lastSeen)}, ${systemUsers.indexOf(u)});`,
  );
}

for (const a of auditLog) {
  statements.push(
    `INSERT OR IGNORE INTO audit_log (id, actor, action, time, severity, sort_order) ` +
      `VALUES (${sqlString(`al-${auditLog.indexOf(a) + 1}`)}, ${sqlString(a.actor)}, ` +
      `${sqlString(a.action)}, ${sqlString(a.time)}, ${sqlString(a.severity)}, ` +
      `${auditLog.indexOf(a)});`,
  );
}

for (const n of notifications) {
  statements.push(
    `INSERT OR IGNORE INTO notifications (id, user_id, title, body, time, engine, sort_order) ` +
      `VALUES (${sqlString(`ntf-${notifications.indexOf(n) + 1}`)}, NULL, ` +
      `${sqlString(n.title)}, ${sqlString(n.body)}, ${sqlString(n.time)}, ` +
      `${sqlString(n.engine)}, ${notifications.indexOf(n)});`,
  );
}

for (const p of payrollChanges) {
  statements.push(
    `INSERT OR IGNORE INTO payroll_changes (id, title, detail, status, sort_order) ` +
      `VALUES (${sqlString(`pc-${payrollChanges.indexOf(p) + 1}`)}, ${sqlString(p.title)}, ` +
      `${sqlString(p.detail)}, ${sqlString(p.status)}, ${payrollChanges.indexOf(p)});`,
  );
}

for (const b of paymentBatches) {
  statements.push(
    `INSERT OR IGNORE INTO payment_batches (id, batch, amount, count, date, status, sort_order) ` +
      `VALUES (${sqlString(`pb-${paymentBatches.indexOf(b) + 1}`)}, ${sqlString(b.batch)}, ` +
      `${b.amount}, ${b.count}, ${sqlString(b.date)}, ${sqlString(b.status)}, ` +
      `${paymentBatches.indexOf(b)});`,
  );
}

for (const p of payments) {
  statements.push(
    `INSERT OR IGNORE INTO payments (id, user_id, reference, email, amount, currency, status, ` +
      `provider, description, paid_at, sort_order) ` +
      `VALUES (${sqlString(p.id)}, ${sqlString(DEMO_STUDENT_ID)}, ${sqlString(p.reference)}, ` +
      `${sqlString(p.email)}, ${p.amount}, ${sqlString(p.currency)}, ${sqlString(p.status)}, ` +
      `${sqlString(p.provider)}, ${sqlString(p.description)}, ` +
      `${p.paidAt ? sqlString(p.paidAt) : "NULL"}, ${payments.indexOf(p)});`,
  );
}

/* ---------------- Phase 4: recruitment ---------------- */

for (const r of postings) {
  statements.push(
    `INSERT OR IGNORE INTO job_postings (id, title, applicants, views, posted, status, detail, ` +
      `tone, sort_order) ` +
      `VALUES (${sqlString(`post-${postings.indexOf(r) + 1}`)}, ${sqlString(r.title)}, ` +
      `${r.applicants}, ${r.views}, ${sqlString(r.posted)}, ${sqlString(r.status)}, ` +
      `${sqlString(r.detail)}, ${sqlString(r.tone)}, ${postings.indexOf(r)});`,
  );
}

for (const c of pipelineCandidates) {
  statements.push(
    `INSERT OR IGNORE INTO pipeline_candidates (id, job_id, name, stage, detail, score, ` +
      `sort_order) ` +
      `VALUES (${sqlString(`cand-${pipelineCandidates.indexOf(c) + 1}`)}, ` +
      `${sqlString("post-4")}, ${sqlString(c.name)}, ${sqlString(c.stage)}, ` +
      `${sqlString(c.detail)}, ${c.score}, ${pipelineCandidates.indexOf(c)});`,
  );
}

for (const i of interviews) {
  statements.push(
    `INSERT OR IGNORE INTO interviews (id, candidate, role, date, mode, status, sort_order) ` +
      `VALUES (${sqlString(`ivw-${interviews.indexOf(i) + 1}`)}, ${sqlString(i.candidate)}, ` +
      `${sqlString(i.role)}, ${sqlString(i.date)}, ${sqlString(i.mode)}, ` +
      `${sqlString(i.status)}, ${interviews.indexOf(i)});`,
  );
}

for (const t of talentCandidates) {
  statements.push(
    `INSERT OR IGNORE INTO talent_candidates (id, name, program, score, stage, match, skills, ` +
      `available, sort_order) ` +
      `VALUES (${sqlString(`talent-${talentCandidates.indexOf(t) + 1}`)}, ${sqlString(t.name)}, ` +
      `${sqlString(t.program)}, ${t.score}, ${sqlString(t.stage)}, ${t.match}, ` +
      `${jsonString(t.skills)}, ${sqlString(t.available)}, ${talentCandidates.indexOf(t)});`,
  );
}

/* ---------------- Phase 4: marketing ---------------- */

for (const k of marketingKpis) {
  statements.push(
    `INSERT OR IGNORE INTO marketing_kpis (id, page, label, value, delta, sort_order) ` +
      `VALUES (${sqlString(`kpi-${marketingKpis.indexOf(k) + 1}`)}, ${sqlString(k.page)}, ` +
      `${sqlString(k.label)}, ${sqlString(k.value)}, ${sqlString(k.delta)}, ` +
      `${marketingKpis.indexOf(k)});`,
  );
}

for (const c of campaigns) {
  statements.push(
    `INSERT OR IGNORE INTO campaigns (id, name, channel, spend, leads, roas, status, sort_order) ` +
      `VALUES (${sqlString(`camp-${campaigns.indexOf(c) + 1}`)}, ${sqlString(c.name)}, ` +
      `${sqlString(c.channel)}, ${c.spend}, ${c.leads}, ${c.roas}, ${sqlString(c.status)}, ` +
      `${campaigns.indexOf(c)});`,
  );
}

for (const e of emailCampaigns) {
  statements.push(
    `INSERT OR IGNORE INTO email_campaigns (id, title, recipients, open_rate, status, sort_order) ` +
      `VALUES (${sqlString(`emc-${emailCampaigns.indexOf(e) + 1}`)}, ${sqlString(e.title)}, ` +
      `${e.recipients}, ${e.openRate}, ${sqlString(e.status)}, ${emailCampaigns.indexOf(e)});`,
  );
}

for (const s of socialPosts) {
  statements.push(
    `INSERT OR IGNORE INTO social_posts (id, title, channel, date, status, sort_order) ` +
      `VALUES (${sqlString(`soc-${socialPosts.indexOf(s) + 1}`)}, ${sqlString(s.title)}, ` +
      `${sqlString(s.channel)}, ${sqlString(s.date)}, ${sqlString(s.status)}, ` +
      `${socialPosts.indexOf(s)});`,
  );
}

for (const l of landingPages) {
  statements.push(
    `INSERT OR IGNORE INTO landing_pages (id, title, conversion, status, sort_order) ` +
      `VALUES (${sqlString(`lp-${landingPages.indexOf(l) + 1}`)}, ${sqlString(l.title)}, ` +
      `${l.conversion}, ${sqlString(l.status)}, ${landingPages.indexOf(l)});`,
  );
}

for (const s of seoKeywords) {
  statements.push(
    `INSERT OR IGNORE INTO seo_keywords (id, keyword, position, delta, sort_order) ` +
      `VALUES (${sqlString(`seo-${seoKeywords.indexOf(s) + 1}`)}, ${sqlString(s.keyword)}, ` +
      `${s.position}, ${sqlString(s.delta)}, ${seoKeywords.indexOf(s)});`,
  );
}

for (const c of contentCalendar) {
  statements.push(
    `INSERT OR IGNORE INTO content_calendar (id, title, channel, date, status, sort_order) ` +
      `VALUES (${sqlString(`cc-${contentCalendar.indexOf(c) + 1}`)}, ${sqlString(c.title)}, ` +
      `${sqlString(c.channel)}, ${sqlString(c.date)}, ${sqlString(c.status)}, ` +
      `${contentCalendar.indexOf(c)});`,
  );
}

for (const l of leads) {
  statements.push(
    `INSERT OR IGNORE INTO leads (id, name, score, detail, sort_order) ` +
      `VALUES (${sqlString(`lead-${leads.indexOf(l) + 1}`)}, ${sqlString(l.name)}, ` +
      `${l.score}, ${sqlString(l.detail)}, ${leads.indexOf(l)});`,
  );
}

for (const r of marketingReports) {
  statements.push(
    `INSERT OR IGNORE INTO marketing_reports (id, title, published, sort_order) ` +
      `VALUES (${sqlString(`rpt-${marketingReports.indexOf(r) + 1}`)}, ${sqlString(r.title)}, ` +
      `${sqlString(r.published)}, ${marketingReports.indexOf(r)});`,
  );
}

for (const f of funnelStages) {
  statements.push(
    `INSERT OR IGNORE INTO funnel_stages (id, stage, value, pct, sort_order) ` +
      `VALUES (${sqlString(`fun-${funnelStages.indexOf(f) + 1}`)}, ${sqlString(f.stage)}, ` +
      `${f.value}, ${f.pct}, ${funnelStages.indexOf(f)});`,
  );
}

/* ---------------- Phase 4: design ---------------- */

for (const c of designComponents) {
  statements.push(
    `INSERT OR IGNORE INTO design_components (id, name, detail, states, usage, status, sort_order) ` +
      `VALUES (${sqlString(`cmp-${designComponents.indexOf(c) + 1}`)}, ${sqlString(c.t)}, ` +
      `${sqlString(c.d)}, ${c.states}, ${c.usage}, ${sqlString(c.status)}, ` +
      `${designComponents.indexOf(c)});`,
  );
}

for (const f of designFlows) {
  statements.push(
    `INSERT OR IGNORE INTO design_flows (id, name, steps_count, decisions_count, status, ` +
      `flow_steps, sort_order) ` +
      `VALUES (${sqlString(`flw-${designFlows.indexOf(f) + 1}`)}, ${sqlString(f.t)}, ` +
      `${f.steps}, ${f.decisions}, ${sqlString(f.status)}, ${jsonString(f.list)}, ` +
      `${designFlows.indexOf(f)});`,
  );
}

for (const p of designPrototypes) {
  statements.push(
    `INSERT OR IGNORE INTO design_prototypes (id, name, version, status, feedback_count, owner, ` +
      `sort_order) ` +
      `VALUES (${sqlString(`prt-${designPrototypes.indexOf(p) + 1}`)}, ${sqlString(p.t)}, ` +
      `${sqlString(p.version)}, ${sqlString(p.status)}, ${p.feedback}, ${sqlString(p.owner)}, ` +
      `${designPrototypes.indexOf(p)});`,
  );
}

for (const t of designTokens) {
  statements.push(
    `INSERT OR IGNORE INTO design_tokens (id, kind, name, value, hex, family, deprecated, status, ` +
      `sort_order) ` +
      `VALUES (${sqlString(`tkn-${designTokens.indexOf(t) + 1}`)}, ${sqlString(t.kind)}, ` +
      `${sqlString(t.t)}, ${sqlString(t.v)}, ${t.hex ? sqlString(t.hex) : "''"}, ` +
      `${t.family ? sqlString(t.family) : "''"}, ${t.deprecated ? 1 : 0}, ` +
      `${t.status ? sqlString(t.status) : "''"}, ${designTokens.indexOf(t)});`,
  );
}

for (const v of designVersions) {
  statements.push(
    `INSERT OR IGNORE INTO design_versions (id, title, change, editor, "when", status, sort_order) ` +
      `VALUES (${sqlString(`ver-${designVersions.indexOf(v) + 1}`)}, ${sqlString(v.t)}, ` +
      `${sqlString(v.change)}, ${sqlString(v.editor)}, ${sqlString(v.when)}, ` +
      `${sqlString(v.status)}, ${designVersions.indexOf(v)});`,
  );
}

for (const t of collaborationThreads) {
  statements.push(
    `INSERT OR IGNORE INTO collaboration_threads (id, title, detail, author, status, sort_order) ` +
      `VALUES (${sqlString(`thr-${collaborationThreads.indexOf(t) + 1}`)}, ${sqlString(t.t)}, ` +
      `${sqlString(t.d)}, ${sqlString(t.author)}, ${sqlString(t.status)}, ` +
      `${collaborationThreads.indexOf(t)});`,
  );
}

for (const x of designExports) {
  statements.push(
    `INSERT OR IGNORE INTO design_exports (id, title, format, size, owner, status, sort_order) ` +
      `VALUES (${sqlString(`exp-${designExports.indexOf(x) + 1}`)}, ${sqlString(x.t)}, ` +
      `${sqlString(x.format)}, ${sqlString(x.size)}, ${sqlString(x.owner)}, ` +
      `${sqlString(x.status)}, ${designExports.indexOf(x)});`,
  );
}

for (const s of systemComponents) {
  statements.push(
    `INSERT OR IGNORE INTO system_components (id, name, variants, states, usage, status, ` +
      `sort_order) ` +
      `VALUES (${sqlString(`sys-${systemComponents.indexOf(s) + 1}`)}, ${sqlString(s.t)}, ` +
      `${s.variants}, ${s.states}, ${s.usage}, ${sqlString(s.status)}, ` +
      `${systemComponents.indexOf(s)});`,
  );
}

for (const k of designKpis) {
  statements.push(
    `INSERT OR IGNORE INTO design_kpis (id, value, sort_order) ` +
      `VALUES (${sqlString(k.id)}, ${k.value}, ${designKpis.indexOf(k)});`,
  );
}

/* ---------------- Phase 4: localization ---------------- */

for (const p of localizationProjects) {
  statements.push(
    `INSERT OR IGNORE INTO localization_projects (id, name, description, path, tone, sort_order) ` +
      `VALUES (${sqlString(p.id)}, ${sqlString(p.name)}, ${sqlString(p.desc)}, ` +
      `${sqlString(p.path)}, ${sqlString(p.tone)}, ${localizationProjects.indexOf(p)});`,
  );
}

for (const t of glossaryTerms) {
  statements.push(
    `INSERT OR IGNORE INTO glossary_terms (id, term, definition, usage, cultural_notes, status, ` +
      `sort_order) ` +
      `VALUES (${sqlString(t.id)}, ${sqlString(t.term)}, ${sqlString(t.definition)}, ` +
      `${sqlString(t.usage)}, ${sqlString(t.culturalNotes)}, ${sqlString(t.status)}, ` +
      `${glossaryTerms.indexOf(t)});`,
  );
}

for (const g of styleGuides) {
  statements.push(
    `INSERT OR IGNORE INTO style_guides (id, market, dos, donts, status, sort_order) ` +
      `VALUES (${sqlString(g.id)}, ${sqlString(g.market)}, ${jsonString(g.dos)}, ` +
      `${jsonString(g.donts)}, ${sqlString(g.status)}, ${styleGuides.indexOf(g)});`,
  );
}

for (const t of translationMemory) {
  statements.push(
    `INSERT OR IGNORE INTO translation_memory (id, source, target, locale, match_pct, status, ` +
      `sort_order) ` +
      `VALUES (${sqlString(t.id)}, ${sqlString(t.source)}, ${sqlString(t.target)}, ` +
      `${sqlString(t.locale)}, ${t.match}, ${sqlString(t.status)}, ` +
      `${translationMemory.indexOf(t)});`,
  );
}

for (const d of dialects) {
  statements.push(
    `INSERT OR IGNORE INTO dialect_groups (id, group_name, variants, coverage, status, sort_order) ` +
      `VALUES (${sqlString(d.id)}, ${sqlString(d.group)}, ${jsonString(d.variants)}, ` +
      `${d.coverage}, ${sqlString(d.status)}, ${dialects.indexOf(d)});`,
  );
}

for (const v of variants) {
  statements.push(
    `INSERT OR IGNORE INTO copy_variants (id, name, code, tone_notes, status, sort_order) ` +
      `VALUES (${sqlString(v.id)}, ${sqlString(v.name)}, ${sqlString(v.code)}, ` +
      `${sqlString(v.toneNotes)}, ${sqlString(v.status)}, ${variants.indexOf(v)});`,
  );
}

for (const m of localizationMarkets) {
  statements.push(
    `INSERT OR IGNORE INTO localization_markets (id, name, conversion, engagement, pct, trend, ` +
      `tone, sort_order) ` +
      `VALUES (${sqlString(m.id)}, ${sqlString(m.name)}, ${sqlString(m.conversion)}, ` +
      `${sqlString(m.engagement)}, ${m.pct}, ${sqlString(m.trend)}, ${sqlString(m.tone)}, ` +
      `${localizationMarkets.indexOf(m)});`,
  );
}

for (const b of previewBlocks) {
  statements.push(
    `INSERT OR IGNORE INTO preview_blocks (id, en, yo, en_sub, yo_sub, sort_order) ` +
      `VALUES (${sqlString(b.id)}, ${sqlString(b.en)}, ${sqlString(b.yo)}, ${sqlString(b.enSub)}, ` +
      `${sqlString(b.yoSub)}, ${previewBlocks.indexOf(b)});`,
  );
}

for (const s of localizationStats) {
  statements.push(
    `INSERT OR IGNORE INTO localization_stats (id, page, label, value, delta, sort_order) ` +
      `VALUES (${sqlString(s.id)}, ${sqlString(s.page)}, ${sqlString(s.label)}, ` +
      `${sqlString(s.value)}, ${sqlString(s.delta)}, ${localizationStats.indexOf(s)});`,
  );
}

for (const s of liveSessions) {
  statements.push(
    `INSERT OR IGNORE INTO live_sessions (id, title, instructor, cohort, status, starts_at, ` +
      `sort_order) ` +
      `VALUES (${sqlString(s.id)}, ${sqlString(s.title)}, ${sqlString(s.instructor)}, ` +
      `${sqlString(s.cohort)}, ${sqlString(s.status)}, ${sqlString(s.startsAt)}, ` +
      `${liveSessions.indexOf(s)});`,
  );
}

const sql = statements.join("\n") + "\n";

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(resolve(OUT_DIR, "domain-data.sql"), sql, "utf8");

const tsModule = `/* GENERATED by scripts/gen-domain-seed.ts — do not edit. Re-run: npm run gen:seed */
export const seedDomainSql = String.raw\`${sql.replace(/`/g, "\\`").replace(/\$\{/g, "\\${")}\`;
`;

writeFileSync(resolve(OUT_DIR, "domain.ts"), tsModule, "utf8");

console.log(`Wrote seeds/domain-data.sql and seeds/domain.ts (${statements.length} statements).`);
