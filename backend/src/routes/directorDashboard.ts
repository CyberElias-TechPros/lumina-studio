import { Hono } from "hono";
import type { AppEnv } from "../types";
import { base64UrlDecode, base64UrlEncode } from "../lib/crypto";
import { paginate, parsePagination } from "../lib/pagination";
import { requireAuth, requireAnyRole } from "../lib/auth";

const DIR_COLS: Record<string, { table: string; columns: string }> = {
  overview: {
    table: "dir_hub",
    columns: "id, metric, value_label AS valueLabel, delta",
  },
  okrs: {
    table: "dir_okrs",
    columns: "id, objective_label AS objectiveLabel, kr_label AS krLabel, pct",
  },
  branches: {
    table: "dir_branches",
    columns: "id, name, utilization, cost, status",
  },
  modules: {
    table: "dir_modules",
    columns: "id, name, detail",
  },
  saved: {
    table: "dir_saved",
    columns: "id, name, detail",
  },
};

function registerLists(router: Hono<{ Bindings: AppEnv }>, collections: typeof DIR_COLS) {
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

export const directorDashboard = new Hono<{ Bindings: AppEnv }>();
directorDashboard.use("*", requireAuth, requireAnyRole(["director", "admin"]));
registerLists(directorDashboard, DIR_COLS);
