import { Hono } from "hono";
import type { AppEnv } from "../types";
import { base64UrlDecode, base64UrlEncode } from "../lib/crypto";
import { paginate, parsePagination } from "../lib/pagination";
import { requireAuth, requireAnyRole } from "../lib/auth";

const NGO_COLS: Record<string, { table: string; columns: string }> = {
  overview: {
    table: "ngo_hub",
    columns: "id, metric, value_label AS valueLabel, delta",
  },
  funds: {
    table: "ngo_funds",
    columns: "id, name, scholars, amount, status",
  },
  programs: {
    table: "ngo_programs",
    columns: "id, name, location, beneficiaries, status",
  },
  expenses: {
    table: "ngo_expenses",
    columns: "id, title, amount, pct, status",
  },
  teams: {
    table: "ngo_teams",
    columns: "id, name, volunteers, slots, status",
  },
  transactions: {
    table: "ngo_transactions",
    columns: "id, title, amount, date_label AS dateLabel, status",
  },
  reports: {
    table: "ngo_reports",
    columns: "id, title, detail, status",
  },
  metrics: {
    table: "ngo_metrics",
    columns: "id, label, value, delta",
  },
  threads: {
    table: "ngo_threads",
    columns: "id, title, from_label AS fromLabel, time_label AS timeLabel, status",
  },
};

function registerLists(router: Hono<{ Bindings: AppEnv }>, collections: typeof NGO_COLS) {
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

export const ngoDashboard = new Hono<{ Bindings: AppEnv }>();
ngoDashboard.use("*", requireAuth, requireAnyRole(["admin", "instructor", "student"]));
registerLists(ngoDashboard, NGO_COLS);
