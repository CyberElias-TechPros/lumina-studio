/**
 * Live data for the /portal/* role landing pages.
 *
 *   GET /v1/portal/summary?portal=<slug>
 *
 * Each portal slug maps to a metric group. Org-wide groups (finance,
 * admissions, platform, growth, teaching) are only computed for roles that
 * are allowed to see them; everyone else gets their personal summary with
 * `restricted: true`, so no portal can leak data a role shouldn't see.
 * Every metric is computed from real tables — nothing is fabricated; a
 * metric whose source is unavailable is simply omitted.
 */
import { Hono } from "hono";
import type { AppEnv } from "../types";
import { isoNow } from "../lib/crypto";
import { readiness } from "./system";

export type PortalGroup =
  | "learner"
  | "parent"
  | "teaching"
  | "finance"
  | "admissions"
  | "platform"
  | "growth"
  | "community";

export const PORTAL_GROUPS: Record<string, PortalGroup> = {
  student: "learner",
  intern: "learner",
  alumni: "learner",
  "career-services": "community",
  parent: "parent",
  instructor: "teaching",
  mentor: "teaching",
  "academic-board": "teaching",
  quality: "teaching",
  "department-head": "teaching",
  registrar: "admissions",
  admissions: "admissions",
  receptionist: "admissions",
  accountant: "finance",
  finance: "finance",
  executive: "finance",
  director: "finance",
  admin: "platform",
  developer: "platform",
  devops: "platform",
  security: "platform",
  data: "platform",
  "it-support": "platform",
  marketing: "growth",
  growth: "growth",
  copywriter: "growth",
  "global-copywriter": "growth",
  "product-marketing": "growth",
  "behavioral-designer": "growth",
  "visual-designer": "growth",
  employer: "community",
  client: "community",
  partner: "community",
  supplier: "community",
  ngo: "community",
  government: "community",
  volunteer: "community",
  hr: "community",
  operations: "community",
};

/** Roles allowed to see each org-wide group (admin + director see all). */
const GROUP_ROLES: Record<PortalGroup, string[] | "any"> = {
  learner: "any",
  parent: ["parent"],
  community: "any",
  teaching: ["instructor", "mentor", "department"],
  finance: ["finance"],
  admissions: ["admissions", "receptionist"],
  platform: ["dev", "it"],
  growth: [
    "marketing",
    "growth",
    "conversion-copy",
    "localization",
    "product-marketing",
    "behavioral-design",
    "design",
  ],
};

export interface PortalMetric {
  key: string;
  label: string;
  value: number;
  format: "number" | "naira" | "percent";
  hint?: string;
}

type Ctx = { env: AppEnv; userId: string; roleKey: string; now: string };

async function num(db: D1Database, sql: string, ...args: unknown[]): Promise<number | null> {
  try {
    const row = await db
      .prepare(sql)
      .bind(...args)
      .first<{ n: number | null }>();
    return Number(row?.n ?? 0);
  } catch {
    return null; // table missing in this deployment → omit metric
  }
}

function daysAgo(n: number): string {
  return new Date(Date.now() - n * 86_400_000).toISOString();
}
function daysAhead(n: number): string {
  return new Date(Date.now() + n * 86_400_000).toISOString();
}

type Spec = [
  key: string,
  label: string,
  format: PortalMetric["format"],
  value: Promise<number | null>,
  hint?: string,
];

async function collect(specs: Spec[]): Promise<PortalMetric[]> {
  const values = await Promise.all(specs.map((s) => s[3]));
  return specs.flatMap((s, i) =>
    values[i] === null
      ? []
      : [
          {
            key: s[0],
            label: s[1],
            format: s[2],
            value: values[i] as number,
            ...(s[4] ? { hint: s[4] } : {}),
          },
        ],
  );
}

const GROUP_METRICS: Record<PortalGroup, (c: Ctx) => Promise<PortalMetric[]>> = {
  learner: ({ env, userId, now }) =>
    collect([
      [
        "courses",
        "Enrolled courses",
        "number",
        num(env.DB, `SELECT COUNT(*) AS n FROM enrollments WHERE user_id = ?`, userId),
      ],
      [
        "pending",
        "Assignments to do",
        "number",
        num(
          env.DB,
          `SELECT COUNT(*) AS n FROM assignments WHERE user_id = ? AND status IN ('pending','draft')`,
          userId,
        ),
      ],
      [
        "dueWeek",
        "Due in 7 days",
        "number",
        num(
          env.DB,
          `SELECT COUNT(*) AS n FROM assignments WHERE user_id = ? AND status IN ('pending','draft') AND due_at > ? AND due_at <= ?`,
          userId,
          now,
          daysAhead(7),
        ),
      ],
      [
        "certificates",
        "Certificates",
        "number",
        num(env.DB, `SELECT COUNT(*) AS n FROM certificates WHERE user_id = ?`, userId),
      ],
      [
        "unread",
        "Unread notifications",
        "number",
        num(
          env.DB,
          `SELECT COUNT(*) AS n FROM notifications WHERE user_id = ? AND read_at IS NULL`,
          userId,
        ),
      ],
    ]),
  parent: ({ env, userId, now }) =>
    collect([
      [
        "children",
        "Linked learners",
        "number",
        num(env.DB, `SELECT COUNT(*) AS n FROM parent_students WHERE parent_id = ?`, userId),
      ],
      [
        "pending",
        "Assignments outstanding",
        "number",
        num(
          env.DB,
          `SELECT COUNT(*) AS n FROM assignments WHERE status IN ('pending','draft') AND user_id IN (SELECT student_id FROM parent_students WHERE parent_id = ?)`,
          userId,
        ),
      ],
      [
        "dueWeek",
        "Due in 7 days",
        "number",
        num(
          env.DB,
          `SELECT COUNT(*) AS n FROM assignments WHERE status IN ('pending','draft') AND due_at > ? AND due_at <= ? AND user_id IN (SELECT student_id FROM parent_students WHERE parent_id = ?)`,
          now,
          daysAhead(7),
          userId,
        ),
      ],
      [
        "certificates",
        "Certificates earned",
        "number",
        num(
          env.DB,
          `SELECT COUNT(*) AS n FROM certificates WHERE user_id IN (SELECT student_id FROM parent_students WHERE parent_id = ?)`,
          userId,
        ),
      ],
    ]),
  teaching: ({ env, userId, roleKey, now }) => {
    const all = roleKey === "admin" || roleKey === "director" || roleKey === "department";
    return collect([
      [
        "courses",
        all ? "Courses running" : "Courses you teach",
        "number",
        all
          ? num(env.DB, `SELECT COUNT(*) AS n FROM courses`)
          : num(env.DB, `SELECT COUNT(*) AS n FROM instructor_courses WHERE user_id = ?`, userId),
      ],
      [
        "toGrade",
        "Submissions to grade",
        "number",
        all
          ? num(
              env.DB,
              `SELECT COUNT(*) AS n FROM submissions WHERE status IN ('submitted','pending')`,
            )
          : num(
              env.DB,
              `SELECT COUNT(*) AS n FROM submissions WHERE user_id = ? AND status IN ('submitted','pending')`,
              userId,
            ),
      ],
      [
        "learners",
        "Active learners",
        "number",
        num(env.DB, `SELECT COUNT(DISTINCT user_id) AS n FROM enrollments`),
      ],
      [
        "live",
        "Upcoming live classes",
        "number",
        num(env.DB, `SELECT COUNT(*) AS n FROM live_sessions WHERE status = 'scheduled'`),
      ],
      [
        "dueWeek",
        "Assignments due this week",
        "number",
        num(
          env.DB,
          `SELECT COUNT(DISTINCT COALESCE(group_id, id)) AS n FROM assignments WHERE due_at > ? AND due_at <= ?${all ? "" : " AND created_by = ?"}`,
          now,
          daysAhead(7),
          ...(all ? [] : [userId]),
        ),
      ],
    ]);
  },
  finance: ({ env }) =>
    collect([
      [
        "collected30",
        "Collected (30 days)",
        "naira",
        num(
          env.DB,
          `SELECT (SELECT COALESCE(SUM(amount),0) FROM registration_payments WHERE status = 'success' AND paid_at > ?) + (SELECT COALESCE(SUM(amount),0) FROM payments WHERE status = 'success' AND paid_at > ?) AS n`,
          daysAgo(30),
          daysAgo(30),
        ),
      ],
      [
        "outstanding",
        "Outstanding balances",
        "naira",
        num(
          env.DB,
          `SELECT COALESCE(SUM(fee_total - paid_amount),0) AS n FROM registrations WHERE payment_status = 'deposit_paid'`,
        ),
        "Deposit paid, balance due",
      ],
      [
        "pending",
        "Pending payment sessions",
        "number",
        num(
          env.DB,
          `SELECT (SELECT COUNT(*) FROM registration_payments WHERE status = 'pending') + (SELECT COUNT(*) FROM payments WHERE status = 'pending') AS n`,
        ),
      ],
      [
        "review",
        "Payments flagged for review",
        "number",
        num(env.DB, `SELECT COUNT(*) AS n FROM payments WHERE status = 'review'`),
        "Amount mismatch — check in Paystack",
      ],
      [
        "invoices",
        "Open invoices",
        "number",
        num(env.DB, `SELECT COUNT(*) AS n FROM invoices WHERE status != 'paid'`),
      ],
    ]),
  admissions: ({ env }) =>
    collect([
      [
        "new7",
        "New registrations (7 days)",
        "number",
        num(env.DB, `SELECT COUNT(*) AS n FROM registrations WHERE created_at > ?`, daysAgo(7)),
      ],
      [
        "screening",
        "Awaiting screening",
        "number",
        num(env.DB, `SELECT COUNT(*) AS n FROM registrations WHERE stage = 'submitted'`),
      ],
      [
        "unpaid",
        "Unpaid registrations",
        "number",
        num(
          env.DB,
          `SELECT COUNT(*) AS n FROM registrations WHERE payment_status IN ('unpaid','failed') AND stage != 'declined'`,
        ),
      ],
      [
        "enrolled30",
        "Enrolled (30 days)",
        "number",
        num(
          env.DB,
          `SELECT COUNT(*) AS n FROM registrations WHERE stage = 'enrolled' AND updated_at > ?`,
          daysAgo(30),
        ),
      ],
      [
        "applications",
        "Applications on file",
        "number",
        num(env.DB, `SELECT COUNT(*) AS n FROM applications`),
      ],
    ]),
  platform: async ({ env, now }) => {
    const metrics = await collect([
      [
        "users",
        "Active accounts",
        "number",
        num(env.DB, `SELECT COUNT(*) AS n FROM users WHERE status = 'active'`),
      ],
      [
        "signups7",
        "Sign-ups (7 days)",
        "number",
        num(env.DB, `SELECT COUNT(*) AS n FROM users WHERE created_at > ?`, daysAgo(7)),
      ],
      [
        "sessions",
        "Live sessions",
        "number",
        num(
          env.DB,
          `SELECT COUNT(*) AS n FROM sessions WHERE revoked_at IS NULL AND expires_at > ?`,
          now,
        ),
      ],
      [
        "jobErrors",
        "Failed jobs (7 days)",
        "number",
        num(
          env.DB,
          `SELECT COUNT(*) AS n FROM job_runs WHERE status = 'error' AND started_at > ?`,
          daysAgo(7),
        ),
      ],
    ]);
    const r = readiness(env);
    metrics.push({
      key: "integrations",
      label: "Integrations configured",
      format: "percent",
      value: Math.round(
        (Object.values(r.checks).filter(Boolean).length / Object.keys(r.checks).length) * 100,
      ),
      hint: r.ready ? "Required keys present" : `Missing: ${r.missingRequired.join(", ")}`,
    });
    return metrics;
  },
  growth: async ({ env }) => {
    const [total30, paid30] = await Promise.all([
      num(env.DB, `SELECT COUNT(*) AS n FROM registrations WHERE created_at > ?`, daysAgo(30)),
      num(
        env.DB,
        `SELECT COUNT(*) AS n FROM registrations WHERE created_at > ? AND payment_status IN ('paid','deposit_paid')`,
        daysAgo(30),
      ),
    ]);
    const metrics = await collect([
      ["leads", "Leads captured", "number", num(env.DB, `SELECT COUNT(*) AS n FROM leads`)],
      [
        "newsletter",
        "Newsletter sign-ups",
        "number",
        num(env.DB, `SELECT COUNT(*) AS n FROM leads WHERE detail LIKE 'Newsletter%'`),
      ],
      ["registrations30", "Registrations (30 days)", "number", Promise.resolve(total30)],
    ]);
    if (total30 !== null && paid30 !== null) {
      metrics.push({
        key: "conversion30",
        label: "Registration → paid (30 days)",
        format: "percent",
        value: total30 === 0 ? 0 : Math.round((paid30 / total30) * 100),
      });
    }
    return metrics;
  },
  community: ({ env, now }) =>
    collect([
      [
        "learners",
        "Active learners",
        "number",
        num(env.DB, `SELECT COUNT(DISTINCT user_id) AS n FROM enrollments`),
      ],
      [
        "programs",
        "Programmes offered",
        "number",
        num(env.DB, `SELECT COUNT(*) AS n FROM programs`),
      ],
      [
        "certificates",
        "Certificates issued",
        "number",
        num(env.DB, `SELECT COUNT(*) AS n FROM certificates`),
      ],
      [
        "live",
        "Upcoming live classes",
        "number",
        num(
          env.DB,
          `SELECT COUNT(*) AS n FROM live_sessions WHERE status = 'scheduled' AND (starts_at = '' OR starts_at > ?)`,
          now,
        ),
      ],
    ]),
};

export function canSeeGroup(roleKey: string, group: PortalGroup): boolean {
  if (roleKey === "admin" || roleKey === "director") return true;
  const allowed = GROUP_ROLES[group];
  return allowed === "any" || allowed.includes(roleKey);
}

export const portal = new Hono<{ Bindings: AppEnv }>();

portal.get("/summary", async (c) => {
  const user = c.get("authUser");
  const slug = (c.req.query("portal") ?? "").toLowerCase();
  const requested: PortalGroup = PORTAL_GROUPS[slug] ?? "learner";
  const allowed = canSeeGroup(user.roleKey, requested);
  const group: PortalGroup = allowed ? requested : user.roleKey === "parent" ? "parent" : "learner";
  const ctx: Ctx = { env: c.env, userId: user.id, roleKey: user.roleKey, now: isoNow() };
  const [metrics, activity] = await Promise.all([
    GROUP_METRICS[group](ctx),
    c.env.DB.prepare(
      `SELECT id, title, body, time, engine, read_at FROM notifications
        WHERE user_id = ? ORDER BY time DESC LIMIT 6`,
    )
      .bind(user.id)
      .all<{
        id: string;
        title: string;
        body: string;
        time: string;
        engine: string;
        read_at: string | null;
      }>()
      .then((r) => r.results ?? [])
      .catch(() => []),
  ]);
  return c.json({
    portal: slug,
    group,
    restricted: !allowed,
    generatedAt: ctx.now,
    metrics,
    activity: activity.map((a) => ({
      id: a.id,
      title: a.title,
      body: a.body,
      time: a.time,
      engine: a.engine,
      read: Boolean(a.read_at),
    })),
  });
});
