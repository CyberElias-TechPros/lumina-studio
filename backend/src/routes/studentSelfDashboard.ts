import { Hono } from "hono";
import type { AppEnv } from "../types";
import { base64UrlDecode, base64UrlEncode } from "../lib/crypto";
import { paginate, parsePagination } from "../lib/pagination";
import { requireAuth, requireAnyRole } from "../lib/auth";

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
    columns: "id, name, detail, tags, featured",
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

function registerLists(router: Hono<{ Bindings: AppEnv }>, collections: typeof STU_SELF_COLS) {
  for (const [key, { table, columns }] of Object.entries(collections)) {
    router.get(`/${key}`, async (c) => {
      const { cursor, limit } = parsePagination(c);
      const total = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM ${table}`).first<{
        n: number;
      }>();
      const rows = await c.env.DB.prepare(
        `SELECT ${columns} FROM ${table} ${cursor ? "WHERE id > ?" : ""} ORDER BY sort_order ASC, id ASC LIMIT ?`,
      )
        .bind(...(cursor ? [base64UrlDecode(cursor) ?? ""] : []), limit)
        .all();
      return c.json(
        paginate(rows.results, total?.n ?? 0, (last) => base64UrlEncode(String(last.id))),
      );
    });
  }
}

export const studentSelfDashboard = new Hono<{ Bindings: AppEnv }>();
studentSelfDashboard.use("*", requireAuth, requireAnyRole(["admin", "student", "instructor"]));
registerLists(studentSelfDashboard, STU_SELF_COLS);
