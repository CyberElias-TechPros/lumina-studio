import { Hono } from "hono";
import type { AppEnv } from "../types";
import { base64UrlDecode, base64UrlEncode } from "../lib/crypto";
import { paginate, parsePagination } from "../lib/pagination";
import { requireAuth, requireAnyRole } from "../lib/auth";

const ADM_SYS_COLS: Record<string, { table: string; columns: string }> = {
  overview: {
    table: "adm_hub",
    columns: "id, metric, value_label AS valueLabel, delta",
  },
  keys: {
    table: "adm_keys",
    columns: "id, name, scope, last_used AS lastUsed, status",
  },
  backups: {
    table: "adm_backups",
    columns: "id, name, detail, status",
  },
  integrations: {
    table: "adm_integrations",
    columns: "id, name, detail, status",
  },
  rules: {
    table: "adm_rules",
    columns: "id, name, value_label AS valueLabel, status",
  },
};

function registerLists(router: Hono<{ Bindings: AppEnv }>, collections: typeof ADM_SYS_COLS) {
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

export const adminSystemsDashboard = new Hono<{ Bindings: AppEnv }>();
adminSystemsDashboard.use("*", requireAuth, requireAnyRole(["admin", "instructor"]));
registerLists(adminSystemsDashboard, ADM_SYS_COLS);
