import { Hono } from "hono";
import type { AppEnv } from "../types";
import { base64UrlDecode, base64UrlEncode } from "../lib/crypto";
import { paginate, parsePagination } from "../lib/pagination";
import { requireAuth, requireAnyRole } from "../lib/auth";

const PAR_EXT_COLS: Record<string, { table: string; columns: string }> = {
  contacts: {
    table: "par_contacts",
    columns: "id, name, role, kind",
  },
  meetings: {
    table: "par_meetings",
    columns: "id, title, date_label AS dateLabel, status",
  },
};

function registerLists(router: Hono<{ Bindings: AppEnv }>, collections: typeof PAR_EXT_COLS) {
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

export const parentExtrasDashboard = new Hono<{ Bindings: AppEnv }>();
parentExtrasDashboard.use(
  "*",
  requireAuth,
  requireAnyRole(["admin", "parent", "student", "instructor"]),
);
registerLists(parentExtrasDashboard, PAR_EXT_COLS);
