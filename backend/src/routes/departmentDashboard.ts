import { Hono } from "hono";
import type { AppEnv } from "../types";
import { base64UrlDecode, base64UrlEncode } from "../lib/crypto";
import { paginate, parsePagination } from "../lib/pagination";
import { requireAuth, requireAnyRole } from "../lib/auth";

const DEP_COLS: Record<string, { table: string; columns: string }> = {
  overview: {
    table: "dep_hub",
    columns: "id, metric, value_label AS valueLabel, delta",
  },
  reports: {
    table: "dep_reports",
    columns: "id, title, detail, status",
  },
  observations: {
    table: "dep_observations",
    columns: "id, title, detail, status",
  },
  faculty: {
    table: "dep_faculty",
    columns: "id, name, courses, students, workload, rating",
  },
  cohorts: {
    table: "dep_cohorts",
    columns: "id, name, enrolled, capacity, pct, status",
  },
  programs: {
    table: "dep_programs",
    columns: "id, name, version, year, status",
  },
  events: {
    table: "dep_events",
    columns: "id, title, date_label AS dateLabel, status",
  },
  approvals: {
    table: "dep_approvals",
    columns: "id, title, requester, date_label AS dateLabel, status",
  },
};

function registerLists(router: Hono<{ Bindings: AppEnv }>, collections: typeof DEP_COLS) {
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

export const departmentDashboard = new Hono<{ Bindings: AppEnv }>();
departmentDashboard.use("*", requireAuth, requireAnyRole(["department", "admin"]));
registerLists(departmentDashboard, DEP_COLS);
