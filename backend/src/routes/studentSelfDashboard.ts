import { Hono } from "hono";
import { z } from "zod";
import type { AppEnv } from "../types";
import { base64UrlDecode, base64UrlEncode } from "../lib/crypto";
import { paginate, parsePagination } from "../lib/pagination";
import { requireAuth, requireAnyRole } from "../lib/auth";
import { parseBody } from "../lib/validate";

const STU_SELF_COLS: Record<string, { table: string; columns: string }> = {
  attendance: {
    table: "stu_att_hub",
    columns: "id, metric, value_label AS valueLabel, delta",
  },
  records: {
    table: "stu_records",
    columns: "id, date_label AS dateLabel, course, status",
  },
  policy: {
    table: "stu_policy",
    columns: "id, rule, value_label AS valueLabel",
  },
  portfolio: {
    table: "stu_portfolio_hub",
    columns: "id, metric, value_label AS valueLabel, delta",
  },
  projects: {
    table: "stu_projects",
    columns: "id, name, detail, tags, featured, url",
  },
  skills: {
    table: "stu_skills",
    columns: "id, name, pct",
  },
  cv: {
    table: "stu_cv",
    columns: "id, filename",
  },
  reportKpis: {
    table: "stu_reports_hub",
    columns: "id, metric, value_label AS valueLabel, delta",
  },
  templates: {
    table: "stu_templates",
    columns: "id, name, category, usage",
  },
};

function parseProjectTags(value: unknown): string[] {
  if (Array.isArray(value)) return value.filter((tag): tag is string => typeof tag === "string");
  if (typeof value !== "string") return [];
  try {
    const parsed: unknown = JSON.parse(value);
    return Array.isArray(parsed)
      ? parsed.filter((tag): tag is string => typeof tag === "string")
      : [];
  } catch {
    return value
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }
}

const createProjectSchema = z.object({
  name: z.string().trim().min(1, "Project name is required.").max(160),
  detail: z.string().trim().min(1, "Project description is required.").max(2_000),
  tags: z.array(z.string().trim().min(1).max(40)).max(12).default([]),
  url: z.string().trim().url("Live URL must be valid.").max(2_000).optional(),
});

function registerLists(router: Hono<{ Bindings: AppEnv }>, collections: typeof STU_SELF_COLS) {
  for (const [key, { table, columns }] of Object.entries(collections)) {
    router.get(`/${key}`, async (c) => {
      const { cursor, limit } = parsePagination(c);
      const userId = c.get("authUser").id;
      const isProjectCollection = key === "projects";
      if (key === "records") {
        const liveRows = await c.env.DB.prepare(
          `SELECT id, date, status, note FROM attendance
             WHERE user_id = ? AND note LIKE 'QR check-in · %'
            ORDER BY date DESC, id DESC LIMIT ?`,
        )
          .bind(userId, limit)
          .all<{ id: string; date: string; status: string; note: string }>();
        if (liveRows.results.length > 0) {
          const liveItems = liveRows.results.map((row) => ({
            id: row.id,
            dateLabel: row.date,
            course: row.note.replace(/^QR check-in · /, ""),
            status: row.status.charAt(0).toUpperCase() + row.status.slice(1),
          }));
          return c.json(
            paginate(liveItems, liveRows.results.length, (last) =>
              base64UrlEncode(String(last.id)),
            ),
          );
        }
      }
      const ownershipWhere = isProjectCollection ? " WHERE (user_id = ? OR user_id IS NULL)" : "";
      const cursorWhere = cursor ? `${isProjectCollection ? " AND" : " WHERE"} id > ?` : "";
      const count = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM ${table}${ownershipWhere}`)
        .bind(...(isProjectCollection ? [userId] : []))
        .first<{ n: number }>();
      const rows = await c.env.DB.prepare(
        `SELECT ${columns} FROM ${table}${ownershipWhere}${cursorWhere}
         ORDER BY sort_order ASC, id ASC LIMIT ?`,
      )
        .bind(
          ...(isProjectCollection ? [userId] : []),
          ...(cursor ? [base64UrlDecode(cursor) ?? ""] : []),
          limit,
        )
        .all();
      const items = isProjectCollection
        ? rows.results.map((row) => ({
            ...row,
            tags: parseProjectTags(row.tags),
            featured: Number(row.featured ?? 0),
            url: typeof row.url === "string" ? row.url : "",
          }))
        : rows.results;
      return c.json(paginate(items, count?.n ?? 0, (last) => base64UrlEncode(String(last.id))));
    });
  }
}

export const studentSelfDashboard = new Hono<{ Bindings: AppEnv }>();
studentSelfDashboard.use("*", requireAuth, requireAnyRole(["student", "admin"]));
registerLists(studentSelfDashboard, STU_SELF_COLS);

studentSelfDashboard.post("/projects", requireAnyRole(["student"]), async (c) => {
  const body = await parseBody(c, createProjectSchema);
  const userId = c.get("authUser").id;
  const nextOrder = await c.env.DB.prepare(
    `SELECT COALESCE(MAX(sort_order), 0) + 1 AS n FROM stu_projects WHERE user_id = ?`,
  )
    .bind(userId)
    .first<{ n: number }>();
  const project = {
    id: `student-project-${crypto.randomUUID()}`,
    name: body.name,
    detail: body.detail,
    tags: body.tags,
    featured: 0,
    url: body.url ?? "",
  };
  await c.env.DB.prepare(
    `INSERT INTO stu_projects (id, name, detail, tags, featured, sort_order, user_id, url)
     VALUES (?, ?, ?, ?, 0, ?, ?, ?)`,
  )
    .bind(
      project.id,
      project.name,
      project.detail,
      JSON.stringify(project.tags),
      nextOrder?.n ?? 1,
      userId,
      project.url,
    )
    .run();
  return c.json(project, 201);
});
