import { Hono } from "hono";
import type { AppEnv } from "../types";
import { base64UrlDecode, base64UrlEncode } from "../lib/crypto";
import { paginate, parsePagination } from "../lib/pagination";
import { requireAuth, requireAnyRole } from "../lib/auth";

const INS_EXT_COLS: Record<string, { table: string; columns: string }> = {
  overview: {
    table: "ins_hub",
    columns: "id, metric, value_label AS valueLabel, delta",
  },
  classes: {
    table: "ins_classes",
    columns: "id, time_label AS timeLabel, title, place",
  },
  announcements: {
    table: "ins_announcements",
    columns: "id, title, audience, date_label AS dateLabel, pinned, status",
  },
  queue: {
    table: "ins_queue",
    columns: "id, student, item, course, submitted, due",
  },
  revisions: {
    table: "ins_revisions",
    columns: "id, version, title, author, date_label AS dateLabel",
  },
};

function registerLists(router: Hono<{ Bindings: AppEnv }>, collections: typeof INS_EXT_COLS) {
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

export const instructorExtrasDashboard = new Hono<{ Bindings: AppEnv }>();
instructorExtrasDashboard.use("*", requireAuth, requireAnyRole(["admin", "instructor"]));
registerLists(instructorExtrasDashboard, INS_EXT_COLS);
