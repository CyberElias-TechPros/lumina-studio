import { Hono } from "hono";
import type { AppEnv } from "../types";
import { base64UrlDecode, base64UrlEncode } from "../lib/crypto";
import { paginate, parsePagination } from "../lib/pagination";
import { requireAuth, requireAnyRole } from "../lib/auth";

const HR_TRN_COLS: Record<string, { table: string; columns: string }> = {
  overview: {
    table: "hr_hub",
    columns: "id, metric, value_label AS valueLabel, delta",
  },
  programs: {
    table: "hr_programs",
    columns: "id, name, detail, status",
  },
};

function registerLists(router: Hono<{ Bindings: AppEnv }>, collections: typeof HR_TRN_COLS) {
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

export const hrTrainingDashboard = new Hono<{ Bindings: AppEnv }>();
hrTrainingDashboard.use("*", requireAuth, requireAnyRole(["hr", "admin"]));
registerLists(hrTrainingDashboard, HR_TRN_COLS);
