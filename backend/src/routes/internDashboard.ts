import { Hono } from "hono";
import type { AppEnv } from "../types";
import { base64UrlDecode, base64UrlEncode } from "../lib/crypto";
import { paginate, parsePagination } from "../lib/pagination";
import { requireAuth, requireAnyRole } from "../lib/auth";
import { ApiError } from "../lib/errors";

export const internDashboard = new Hono<{ Bindings: AppEnv }>();

internDashboard.use("*", requireAuth, requireAnyRole(["intern", "admin"]));

const COLS: Record<string, { table: string; columns: string }> = {
  tasks: {
    table: "int_tasks",
    columns: "id, title, status, due_label AS dueLabel, category",
  },
  timesheets: {
    table: "int_timesheets",
    columns: "id, week_label AS weekLabel, hours, status",
  },
  "mentor-sessions": {
    table: "int_mentor_sessions",
    columns: "id, title, date_text AS dateText, duration_text AS durationText, status",
  },
  milestones: {
    table: "int_milestones",
    columns: "id, title, progress_pct AS progressPct, status",
  },
  skills: {
    table: "int_skills",
    columns: "id, name, mastery",
  },
  resources: {
    table: "int_resources",
    columns: "id, title, kind",
  },
  evaluations: {
    table: "int_evaluations",
    columns: "id, kind, score, status",
  },
  projects: {
    table: "int_projects",
    columns: "id, title, category, artifacts, views, status",
  },
  conversations: {
    table: "int_conversations",
    columns: "id, name, preview, time_label AS timeLabel, unread",
  },
};

for (const [key, { table, columns }] of Object.entries(COLS)) {
  internDashboard.get(`/${key}`, async (c) => {
    const { cursor, limit } = parsePagination(c);
    const total = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM ${table}`).first<{
      n: number;
    }>();
    const rows = await c.env.DB.prepare(
      `SELECT ${columns} FROM ${table} ${cursor ? "WHERE id > ?" : ""} ORDER BY id ASC LIMIT ?`,
    )
      .bind(...(cursor ? [base64UrlDecode(cursor) ?? ""] : []), limit)
      .all();
    return c.json(paginate(rows.results, total?.n ?? 0, (last) => base64UrlEncode(String(last.id))));
  });
}

interface ConversationRow {
  id: string;
  name: string;
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

internDashboard.get("/conversations/:id", async (c) => {
  const convo = await c.env.DB.prepare(
    `SELECT id, name, preview, time_label AS timeLabel, unread FROM int_conversations WHERE id = ?`,
  )
    .bind(c.req.param("id"))
    .first<ConversationRow>();
  if (!convo) throw ApiError.notFound("Conversation not found.");
  const thread = await c.env.DB.prepare(
    `SELECT id, from_label AS fromLabel, body, time_label AS timeLabel FROM int_threads WHERE conversation_id = ? ORDER BY sort_order ASC`,
  )
    .bind(convo.id)
    .all<ThreadRow>();
  return c.json({ ...convo, thread: thread.results });
});