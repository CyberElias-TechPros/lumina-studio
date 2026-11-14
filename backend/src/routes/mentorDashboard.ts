import { Hono } from "hono";
import type { AppEnv } from "../types";
import { base64UrlDecode, base64UrlEncode } from "../lib/crypto";
import { paginate, parsePagination } from "../lib/pagination";
import { requireAuth, requireAnyRole } from "../lib/auth";
import { ApiError } from "../lib/errors";

export const mentorDashboard = new Hono<{ Bindings: AppEnv }>();

mentorDashboard.use("*", requireAuth, requireAnyRole(["mentor", "admin"]));

const COLS: Record<string, { table: string; columns: string }> = {
  mentees: {
    table: "mnt_mentees",
    columns: "id, name, track, cohort, since_date AS sinceDate, status",
  },
  sessions: {
    table: "mnt_sessions",
    columns: "id, title, datetime_text AS datetimeText, mode, status",
  },
  goals: {
    table: "mnt_goals",
    columns:
      "id, mentee_id AS menteeId, title, progress_pct AS progressPct, due_date AS dueDate, status",
  },
  requests: {
    table: "mnt_requests",
    columns: "id, requester_name AS requesterName, track, why, status",
  },
  availability: {
    table: "mnt_availability",
    columns: "id, day, hours, is_open AS isOpen",
  },
  conversations: {
    table: "mnt_conversations",
    columns: "id, name, track, preview, time_label AS timeLabel, unread",
  },
};

for (const [key, { table, columns }] of Object.entries(COLS)) {
  mentorDashboard.get(`/${key}`, async (c) => {
    const { cursor, limit } = parsePagination(c);
    const user = c.get("authUser");
    const scoped = user.roleKey !== "admin";
    const conditions = [scoped ? "mentor_id = ?" : "", cursor ? "id > ?" : ""].filter(Boolean);
    const countWhere = scoped ? "WHERE mentor_id = ?" : "";
    const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
    const total = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM ${table} ${countWhere}`)
      .bind(...(scoped ? [user.id] : []))
      .first<{ n: number }>();
    const rows = await c.env.DB.prepare(
      `SELECT ${columns} FROM ${table} ${where} ORDER BY id ASC LIMIT ?`,
    )
      .bind(...(scoped ? [user.id] : []), ...(cursor ? [base64UrlDecode(cursor) ?? ""] : []), limit)
      .all();
    return c.json(
      paginate(rows.results, total?.n ?? 0, (last) => base64UrlEncode(String(last.id))),
    );
  });
}

interface ResourceRow {
  id: string;
  groupTitle: string;
  itemsJson: string;
}

mentorDashboard.get("/resources", async (c) => {
  const { cursor, limit } = parsePagination(c);
  const user = c.get("authUser");
  const scoped = user.roleKey !== "admin";
  const conditions = [scoped ? "mentor_id = ?" : "", cursor ? "id > ?" : ""].filter(Boolean);
  const total = await c.env.DB.prepare(
    `SELECT COUNT(*) AS n FROM mnt_resources ${scoped ? "WHERE mentor_id = ?" : ""}`,
  )
    .bind(...(scoped ? [user.id] : []))
    .first<{ n: number }>();
  const rows = await c.env.DB.prepare(
    `SELECT id, group_title AS groupTitle, items_json AS itemsJson FROM mnt_resources ${conditions.length ? `WHERE ${conditions.join(" AND ")}` : ""} ORDER BY id ASC LIMIT ?`,
  )
    .bind(...(scoped ? [user.id] : []), ...(cursor ? [base64UrlDecode(cursor) ?? ""] : []), limit)
    .all<ResourceRow>();
  const items = rows.results.map((r) => ({
    id: r.id,
    groupTitle: r.groupTitle,
    items: JSON.parse(r.itemsJson) as string[],
  }));
  return c.json(paginate(items, total?.n ?? 0, (last) => base64UrlEncode(last.id)));
});

interface SessionRow {
  id: string;
  title: string;
  datetime_text: string;
  mode: string;
  status: string;
  notes: string;
}

interface ActionRow {
  id: string;
  title: string;
  done: number;
  sort_order: number;
}

mentorDashboard.get("/sessions/:id", async (c) => {
  const session = await c.env.DB.prepare(
    `SELECT id, title, datetime_text AS datetimeText, mode, status, notes FROM mnt_sessions WHERE id = ? ${c.get("authUser").roleKey === "admin" ? "" : "AND mentor_id = ?"}`,
  )
    .bind(
      c.req.param("id"),
      ...(c.get("authUser").roleKey === "admin" ? [] : [c.get("authUser").id]),
    )
    .first<SessionRow>();
  if (!session) throw ApiError.notFound("Session not found.");
  const actions = await c.env.DB.prepare(
    `SELECT id, title, done FROM mnt_session_actions WHERE session_id = ? ORDER BY sort_order ASC`,
  )
    .bind(session.id)
    .all<ActionRow>();
  return c.json({ ...session, actions: actions.results });
});

interface MenteeRow {
  id: string;
  name: string;
  track: string;
  cohort: string;
  since_date: string;
  status: string;
}

interface GoalRow {
  id: string;
  title: string;
  progress_pct: number;
  due_date: string;
  status: string;
}

mentorDashboard.get("/mentees/:id", async (c) => {
  const mentee = await c.env.DB.prepare(
    `SELECT id, name, track, cohort, since_date AS sinceDate, status FROM mnt_mentees WHERE id = ? ${c.get("authUser").roleKey === "admin" ? "" : "AND mentor_id = ?"}`,
  )
    .bind(
      c.req.param("id"),
      ...(c.get("authUser").roleKey === "admin" ? [] : [c.get("authUser").id]),
    )
    .first<MenteeRow>();
  if (!mentee) throw ApiError.notFound("Mentee not found.");
  const goals = await c.env.DB.prepare(
    `SELECT id, title, progress_pct AS progressPct, due_date AS dueDate, status FROM mnt_goals WHERE mentee_id = ? ${c.get("authUser").roleKey === "admin" ? "" : "AND mentor_id = ?"} ORDER BY id ASC`,
  )
    .bind(mentee.id, ...(c.get("authUser").roleKey === "admin" ? [] : [c.get("authUser").id]))
    .all<GoalRow>();
  return c.json({ ...mentee, goals: goals.results });
});

interface PortfolioRow {
  id: string;
  project_name: string;
  status: string;
  stars: number;
  feedback: string;
}

mentorDashboard.get("/mentees/:id/portfolio", async (c) => {
  const menteeId = c.req.param("id");
  const user = c.get("authUser");
  const mentee = await c.env.DB.prepare(
    `SELECT id FROM mnt_mentees WHERE id = ? ${user.roleKey === "admin" ? "" : "AND mentor_id = ?"}`,
  )
    .bind(menteeId, ...(user.roleKey === "admin" ? [] : [user.id]))
    .first();
  if (!mentee) throw ApiError.notFound("Mentee not found.");
  const projects = await c.env.DB.prepare(
    `SELECT id, project_name AS projectName, status, stars, feedback FROM mnt_portfolio WHERE mentee_id = ? ORDER BY id ASC`,
  )
    .bind(menteeId)
    .all<PortfolioRow>();
  return c.json({ items: projects.results, total: projects.results.length });
});

interface SkillRow {
  id: string;
  skill_name: string;
  endorsed: number;
}

mentorDashboard.get("/mentees/:id/skills", async (c) => {
  const menteeId = c.req.param("id");
  const user = c.get("authUser");
  const mentee = await c.env.DB.prepare(
    `SELECT id FROM mnt_mentees WHERE id = ? ${user.roleKey === "admin" ? "" : "AND mentor_id = ?"}`,
  )
    .bind(menteeId, ...(user.roleKey === "admin" ? [] : [user.id]))
    .first();
  if (!mentee) throw ApiError.notFound("Mentee not found.");
  const skills = await c.env.DB.prepare(
    `SELECT id, skill_name AS skillName, endorsed FROM mnt_skills WHERE mentee_id = ? ORDER BY id ASC`,
  )
    .bind(menteeId)
    .all<SkillRow>();
  return c.json({ items: skills.results, total: skills.results.length });
});

interface ApplicationRow {
  id: string;
  role: string;
  company: string;
  stage: string;
  applied_date: string;
}

mentorDashboard.get("/mentees/:id/career", async (c) => {
  const menteeId = c.req.param("id");
  const user = c.get("authUser");
  const mentee = await c.env.DB.prepare(
    `SELECT id FROM mnt_mentees WHERE id = ? ${user.roleKey === "admin" ? "" : "AND mentor_id = ?"}`,
  )
    .bind(menteeId, ...(user.roleKey === "admin" ? [] : [user.id]))
    .first();
  if (!mentee) throw ApiError.notFound("Mentee not found.");
  const applications = await c.env.DB.prepare(
    `SELECT id, role, company, stage, applied_date AS appliedDate FROM mnt_applications WHERE mentee_id = ? ORDER BY id ASC`,
  )
    .bind(menteeId)
    .all<ApplicationRow>();
  return c.json({ items: applications.results, total: applications.results.length });
});

interface ConversationRow {
  id: string;
  name: string;
  track: string;
  preview: string;
  time_label: string;
  unread: number;
}

interface ThreadRow {
  id: string;
  from_label: string;
  body: string;
  time_label: string;
}

mentorDashboard.get("/conversations/:id", async (c) => {
  const convo = await c.env.DB.prepare(
    `SELECT id, name, track, preview, time_label AS timeLabel, unread FROM mnt_conversations WHERE id = ? ${c.get("authUser").roleKey === "admin" ? "" : "AND mentor_id = ?"}`,
  )
    .bind(
      c.req.param("id"),
      ...(c.get("authUser").roleKey === "admin" ? [] : [c.get("authUser").id]),
    )
    .first<ConversationRow>();
  if (!convo) throw ApiError.notFound("Conversation not found.");
  const thread = await c.env.DB.prepare(
    `SELECT id, from_label AS fromLabel, body, time_label AS timeLabel FROM mnt_threads WHERE conversation_id = ? ORDER BY sort_order ASC`,
  )
    .bind(convo.id)
    .all<ThreadRow>();
  return c.json({ ...convo, thread: thread.results });
});
