import { Hono } from "hono";
import type { AppEnv } from "../types";
import { base64UrlDecode, base64UrlEncode } from "../lib/crypto";
import { paginate, parsePagination } from "../lib/pagination";
import { requireAuth, requireAnyRole } from "../lib/auth";

const ADM_EXT_COLS: Record<string, { table: string; columns: string }> = {
  docOverview: {
    table: "adm_doc_hub",
    columns: "id, metric, value_label AS valueLabel, delta",
  },
  checks: {
    table: "adm_doc_checks",
    columns: "id, name, detail, status",
  },
  commOverview: {
    table: "adm_comm_hub",
    columns: "id, metric, value_label AS valueLabel, delta",
  },
  templates: {
    table: "adm_comm_templates",
    columns: "id, title, usage, status",
  },
};

function registerLists(router: Hono<{ Bindings: AppEnv }>, collections: typeof ADM_EXT_COLS) {
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

export const admissionsExtrasDashboard = new Hono<{ Bindings: AppEnv }>();
admissionsExtrasDashboard.use("*", requireAuth, requireAnyRole(["admin", "instructor"]));
registerLists(admissionsExtrasDashboard, ADM_EXT_COLS);
