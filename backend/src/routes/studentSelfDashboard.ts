import { Hono } from "hono";
import { z } from "zod";
import type { AppEnv } from "../types";
import { base64UrlDecode, base64UrlEncode } from "../lib/crypto";
import { paginate, parsePagination } from "../lib/pagination";
import { requireAuth, requireAnyRole } from "../lib/auth";
import { parseBody } from "../lib/validate";
import { ApiError } from "../lib/errors";

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
      const user = c.get("authUser");
      const userId = user.id;
      const isAdmin = user.roleKey === "admin";
      const isProjectCollection = key === "projects";

      if (!isAdmin && key === "records") {
        // The legacy stu_records table is shared demo data. Return only this
        // learner's real check-ins, including an empty result when none exist.
        let cursorDate: string | undefined;
        let cursorId: string | undefined;
        if (cursor) {
          try {
            const decoded = base64UrlDecode(cursor);
            const parsed: unknown = decoded ? JSON.parse(decoded) : null;
            if (
              !Array.isArray(parsed) ||
              parsed.length !== 2 ||
              typeof parsed[0] !== "string" ||
              !/^\d{4}-\d{2}-\d{2}$/.test(parsed[0]) ||
              typeof parsed[1] !== "string" ||
              !parsed[1] ||
              parsed[1].length > 200
            ) {
              throw new Error("invalid cursor");
            }
            [cursorDate, cursorId] = parsed;
          } catch {
            throw ApiError.validation({ cursor: ["Invalid attendance cursor."] });
          }
        }
        const total = await c.env.DB.prepare(
          `SELECT COUNT(*) AS n FROM attendance WHERE user_id = ? AND note LIKE 'QR check-in · %'`,
        )
          .bind(userId)
          .first<{ n: number }>();
        const rows = await c.env.DB.prepare(
          `SELECT id, date, status, note FROM attendance
             WHERE user_id = ? AND note LIKE 'QR check-in · %'
             ${cursorDate ? "AND (date < ? OR (date = ? AND id < ?))" : ""}
            ORDER BY date DESC, id DESC LIMIT ?`,
        )
          .bind(userId, ...(cursorDate ? [cursorDate, cursorDate, cursorId] : []), limit + 1)
          .all<{ id: string; date: string; status: string; note: string }>();
        const hasMore = rows.results.length > limit;
        const page = rows.results.slice(0, limit);
        const last = page.at(-1);
        const items = page.map((row) => ({
          id: row.id,
          dateLabel: row.date,
          course: row.note.replace(/^QR check-in · /, ""),
          status: row.status.charAt(0).toUpperCase() + row.status.slice(1),
        }));
        return c.json({
          items,
          total: total?.n ?? 0,
          ...(hasMore && last
            ? { nextCursor: base64UrlEncode(JSON.stringify([last.date, last.id])) }
            : {}),
        });
      }
      if (!isAdmin && !isProjectCollection) {
        // The remaining legacy tables contain no learner ownership field.
        throw new ApiError(
          503,
          "STUDENT_DATA_UNAVAILABLE",
          "This information is unavailable until learner-specific records are connected.",
        );
      }
      const scopedProjects = isProjectCollection && !isAdmin;
      const ownershipWhere = scopedProjects ? " WHERE user_id = ?" : "";
      const cursorWhere = cursor ? `${scopedProjects ? " AND" : " WHERE"} id > ?` : "";
      const count = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM ${table}${ownershipWhere}`)
        .bind(...(scopedProjects ? [userId] : []))
        .first<{ n: number }>();
      const rows = await c.env.DB.prepare(
        `SELECT ${columns} FROM ${table}${ownershipWhere}${cursorWhere}
         ORDER BY ${isProjectCollection ? "id" : "sort_order ASC, id"} ASC LIMIT ?`,
      )
        .bind(
          ...(scopedProjects ? [userId] : []),
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
