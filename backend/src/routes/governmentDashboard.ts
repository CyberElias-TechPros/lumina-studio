import { Hono } from "hono";
import type { AppEnv } from "../types";
import { base64UrlDecode, base64UrlEncode } from "../lib/crypto";
import { paginate, parsePagination } from "../lib/pagination";
import { requireAuth, requireAnyRole } from "../lib/auth";

const GOVT_COLS: Record<string, { table: string; columns: string }> = {
  overview: {
    table: "govt_overview",
    columns: "id, metric, value_label AS valueLabel, delta",
  },
  calendar: {
    table: "govt_calendar",
    columns: "id, title, date_label AS dateLabel, status",
  },
  changes: {
    table: "govt_changes",
    columns: "id, title, detail, status",
  },
  documents: {
    table: "govt_docs",
    columns: "id, title, version_label AS versionLabel, status",
  },
  facts: {
    table: "govt_facts",
    columns: "id, label, value",
  },
  reports: {
    table: "govt_reports",
    columns: "id, title, detail, status",
  },
  threads: {
    table: "govt_threads",
    columns: "id, title, from_label AS fromLabel, time_label AS timeLabel, status",
  },
  checks: {
    table: "govt_checks",
    columns: "id, title, detail, status",
  },
  audits: {
    table: "govt_audits",
    columns: "id, title, detail, status",
  },
  filings: {
    table: "govt_filings",
    columns: "id, title, detail, status",
  },
  courses: {
    table: "govt_courses",
    columns: "id, title, detail, status",
  },
};

function registerLists(router: Hono<{ Bindings: AppEnv }>, collections: typeof GOVT_COLS) {
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

export const governmentDashboard = new Hono<{ Bindings: AppEnv }>();
governmentDashboard.use("*", requireAuth, requireAnyRole(["government", "admin"]));
registerLists(governmentDashboard, GOVT_COLS);
