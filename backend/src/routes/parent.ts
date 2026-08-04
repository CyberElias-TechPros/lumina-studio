import { Hono } from "hono";
import type { AppEnv } from "../types";
import { requireAuth, requireParent } from "../lib/auth";
import { ApiError } from "../lib/errors";

interface StudentSummary {
  studentId: string;
  name: string;
  email: string;
  course: string;
  courseDetail: string;
  pct: number;
  gpa: string;
  due: number;
  dueCount: number;
}

interface GradebookRow {
  course_name: string;
  units: number;
  letter: string;
  pct: number;
  trend: string;
  items: string;
}

interface EnrollmentRow {
  course_slug: string;
  pct: number;
  title: string;
  cohort: string;
}

/** 4.0-scale GPA derived from the student's gradebook percentages. */
function gpaFromPcts(pcts: number[]): string {
  if (pcts.length === 0) return "0.0";
  const scale = (pct: number): number => {
    if (pct >= 90) return 4.0;
    if (pct >= 85) return 3.7;
    if (pct >= 80) return 3.3;
    if (pct >= 75) return 3.0;
    if (pct >= 70) return 2.7;
    if (pct >= 65) return 2.3;
    if (pct >= 60) return 2.0;
    if (pct >= 55) return 1.7;
    if (pct >= 50) return 1.3;
    return 1.0;
  };
  const avg = pcts.reduce((sum, p) => sum + scale(p), 0) / pcts.length;
  return avg.toFixed(1);
}

async function loadStudentIds(db: AppEnv["DB"], parentId: string): Promise<string[]> {
  const rows = await db
    .prepare(`SELECT student_id FROM parent_students WHERE parent_id = ? ORDER BY student_id ASC`)
    .bind(parentId)
    .all<{ student_id: string }>();
  return rows.results.map((r) => r.student_id);
}

async function loadGradebook(db: AppEnv["DB"], userId: string): Promise<GradebookRow[]> {
  const rows = await db
    .prepare(
      `SELECT course_name, units, letter, pct, trend, items
         FROM gradebook WHERE user_id = ? ORDER BY sort_order ASC`,
    )
    .bind(userId)
    .all<GradebookRow>();
  return rows.results;
}

async function loadEnrollments(db: AppEnv["DB"], userId: string): Promise<EnrollmentRow[]> {
  const rows = await db
    .prepare(
      `SELECT e.course_slug, e.pct, c.title, c.cohort
         FROM enrollments e JOIN courses c ON c.slug = e.course_slug
        WHERE e.user_id = ? ORDER BY e.pct DESC`,
    )
    .bind(userId)
    .all<EnrollmentRow>();
  return rows.results;
}

async function loadOutstanding(db: AppEnv["DB"], userId: string): Promise<{
  total: number;
  count: number;
}> {
  const row = await db
    .prepare(
      `SELECT COALESCE(SUM(amount), 0) AS total, COUNT(*) AS n FROM invoices
        WHERE user_id = ? AND status NOT IN ('paid', 'refunded', 'void')`,
    )
    .bind(userId)
    .first<{ total: number; n: number }>();
  return { total: row?.total ?? 0, count: row?.n ?? 0 };
}

export const parent = new Hono<{ Bindings: AppEnv }>();

parent.use("*", requireAuth, requireParent);

/** Parent: overview of every linked learner (progress, GPA, outstanding bills). */
parent.get("/students", async (c) => {
  const authUser = c.get("authUser");
  const studentIds = await loadStudentIds(c.env.DB, authUser.id);
  const items: StudentSummary[] = [];
  for (const studentId of studentIds) {
    const student = await c.env.DB.prepare(`SELECT name, email FROM users WHERE id = ?`)
      .bind(studentId)
      .first<{ name: string; email: string }>();
    if (!student) continue;
    const [gradebook, enrollments, outstanding] = await Promise.all([
      loadGradebook(c.env.DB, studentId),
      loadEnrollments(c.env.DB, studentId),
      loadOutstanding(c.env.DB, studentId),
    ]);
    const primary = enrollments[0];
    items.push({
      studentId,
      name: student.name,
      email: student.email,
      course: primary?.title ?? "",
      courseDetail: primary ? `${primary.title} · Cohort ${primary.cohort}` : "",
      pct: primary?.pct ?? 0,
      gpa: gpaFromPcts(gradebook.map((g) => g.pct)),
      due: outstanding.total,
      dueCount: outstanding.count,
    });
  }
  return c.json({ items, total: items.length });
});

/** Parent: full profile + gradebook for one linked learner. */
parent.get("/students/:id", async (c) => {
  const authUser = c.get("authUser");
  const studentId = c.req.param("id");
  const owned = await c.env.DB.prepare(
    `SELECT 1 FROM parent_students WHERE parent_id = ? AND student_id = ?`,
  )
    .bind(authUser.id, studentId)
    .first<{ 1: number }>();
  if (!owned) {
    throw ApiError.forbidden("You can only view your own children's records.");
  }

  const student = await c.env.DB.prepare(`SELECT name, email FROM users WHERE id = ?`)
    .bind(studentId)
    .first<{ name: string; email: string }>();
  if (!student) throw ApiError.notFound("Student not found.");

  const [gradebook, enrollments, outstanding] = await Promise.all([
    loadGradebook(c.env.DB, studentId),
    loadEnrollments(c.env.DB, studentId),
    loadOutstanding(c.env.DB, studentId),
  ]);

  return c.json({
    studentId,
    name: student.name,
    email: student.email,
    gpa: gpaFromPcts(gradebook.map((g) => g.pct)),
    due: outstanding.total,
    dueCount: outstanding.count,
    courses: enrollments.map((e) => ({
      slug: e.course_slug,
      title: e.title,
      cohort: e.cohort,
      pct: e.pct,
    })),
    gradebook: gradebook.map((g) => ({
      courseName: g.course_name,
      units: g.units,
      letter: g.letter,
      pct: g.pct,
      trend: g.trend,
      items: JSON.parse(g.items) as unknown,
    })),
  });
});

interface BillingRow {
  id: string;
  party: string;
  amount: number;
  due: string;
  status: string;
}

/** Parent: billing ledger + totals for one linked learner. */
parent.get("/students/:id/finance", async (c) => {
  const authUser = c.get("authUser");
  const studentId = c.req.param("id");
  const owned = await c.env.DB.prepare(
    `SELECT 1 FROM parent_students WHERE parent_id = ? AND student_id = ?`,
  )
    .bind(authUser.id, studentId)
    .first<{ 1: number }>();
  if (!owned) {
    throw ApiError.forbidden("You can only view your own children's records.");
  }

  const rows = await c.env.DB.prepare(
    `SELECT id, party, amount, due, status FROM invoices
      WHERE user_id = ? ORDER BY sort_order ASC, id ASC`,
  )
    .bind(studentId)
    .all<BillingRow>();

  let paidTotal = 0;
  let outstandingTotal = 0;
  let outstandingCount = 0;
  const items = rows.results.map((r) => {
    if (r.status.toLowerCase() === "paid") {
      paidTotal += r.amount;
    } else {
      outstandingTotal += r.amount;
      outstandingCount += 1;
    }
    return { id: r.id, party: r.party, amount: r.amount, due: r.due, status: r.status };
  });

  return c.json({
    studentId,
    items,
    totals: { paid: paidTotal, outstanding: outstandingTotal, count: outstandingCount },
  });
});

interface AttendanceRow {
  id: string;
  date: string;
  status: string;
  note: string;
}

/** Parent: attendance summary + recent records for one linked learner. */
parent.get("/students/:id/attendance", async (c) => {
  const authUser = c.get("authUser");
  const studentId = c.req.param("id");
  const owned = await c.env.DB.prepare(
    `SELECT 1 FROM parent_students WHERE parent_id = ? AND student_id = ?`,
  )
    .bind(authUser.id, studentId)
    .first<{ 1: number }>();
  if (!owned) {
    throw ApiError.forbidden("You can only view your own children's records.");
  }

  const rows = await c.env.DB.prepare(
    `SELECT id, date, status, note FROM attendance
      WHERE user_id = ? ORDER BY date ASC`,
  )
    .bind(studentId)
    .all<AttendanceRow>();

  const counts = { present: 0, late: 0, excused: 0, absent: 0 };
  for (const row of rows.results) {
    const key = row.status.toLowerCase() as keyof typeof counts;
    if (key in counts) counts[key] += 1;
  }
  const total = rows.results.length;
  const pct = total === 0 ? 100 : Math.round(((counts.present + counts.late) / total) * 100);

  return c.json({
    studentId,
    pct,
    counts,
    total,
    items: rows.results.map((r) => ({ id: r.id, date: r.date, status: r.status, note: r.note })),
  });
});
