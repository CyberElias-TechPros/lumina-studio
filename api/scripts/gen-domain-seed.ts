/**
 * Generates api/seeds/domain.sql + api/seeds/domain.ts from the canonical
 * collections in ../../src/data/learning.ts (instructor data) and
 * ../../src/data/dashboard.ts (HR, finance, admin, notifications).
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
} from "../../src/data/dashboard";

const OUT_DIR = resolve(dirname(fileURLToPath(import.meta.url)), "..", "seeds");

const DEMO_INSTRUCTOR_ID = "00000000-0000-4000-8000-000000000002";
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

const sql = statements.join("\n") + "\n";

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(resolve(OUT_DIR, "domain.sql"), sql, "utf8");

const tsModule = `/* GENERATED by scripts/gen-domain-seed.ts — do not edit. Re-run: npm run gen:seed */
export const seedDomainSql = String.raw\`${sql.replace(/`/g, "\\`").replace(/\$\{/g, "\\${")}\`;
`;

writeFileSync(resolve(OUT_DIR, "domain.ts"), tsModule, "utf8");

console.log(`Wrote seeds/domain.sql and seeds/domain.ts (${statements.length} statements).`);
