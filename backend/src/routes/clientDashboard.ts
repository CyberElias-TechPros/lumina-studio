import { Hono } from "hono";
import type { AppEnv } from "../types";
import { base64UrlDecode, base64UrlEncode } from "../lib/crypto";
import { paginate, parsePagination } from "../lib/pagination";
import { requireAuth, requireAnyRole } from "../lib/auth";

const CLI_COLS: Record<string, { table: string; columns: string }> = {
  tickets: {
    table: "cli_tickets",
    columns: "id, title, reference, date_label AS dateLabel, sla, status",
  },
  proposals: {
    table: "cli_proposals",
    columns: "id, title, amount, scope, status",
  },
  documents: {
    table: "cli_documents",
    columns: "id, title, type, size, updated, status",
  },
  contracts: {
    table: "cli_contracts",
    columns: "id, name, reference, amount, date_label AS dateLabel, status",
  },
  invoices: {
    table: "cli_invoices",
    columns: "id, title, reference, amount, status",
  },
  threads: {
    table: "cli_threads",
    columns: "id, title, from_label AS fromLabel, time_label AS timeLabel, status",
  },
  milestones: {
    table: "cli_milestones",
    columns: "id, title, date_label AS dateLabel, status",
  },
  tasks: {
    table: "cli_tasks",
    columns: "id, title, kind, detail, status",
  },
};

function registerLists(router: Hono<{ Bindings: AppEnv }>, collections: typeof CLI_COLS) {
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

export const clientDashboard = new Hono<{ Bindings: AppEnv }>();
clientDashboard.use("*", requireAuth, requireAnyRole(["admin", "instructor"]));
registerLists(clientDashboard, CLI_COLS);
