import { Hono } from "hono";
import type { AppEnv } from "../types";
import { base64UrlDecode, base64UrlEncode } from "../lib/crypto";
import { paginate, parsePagination } from "../lib/pagination";
import { requireAuth, requireAnyRole } from "../lib/auth";
import { ApiError } from "../lib/errors";

export const it = new Hono<{ Bindings: AppEnv }>();

it.use("*", requireAuth, requireAnyRole(["admin", "instructor"]));

const COLS: Record<string, { table: string; columns: string }> = {
  tickets: {
    table: "it_tickets",
    columns: "id, subject, reporter, priority, sla, elapsed, status",
  },
  articles: { table: "it_articles", columns: "id, title, views, helpful_pct AS helpfulPct, category" },
  assets: { table: "it_assets", columns: "id, name, assigned_to AS assignedTo, category, status" },
  licenses: { table: "it_licenses", columns: "id, product, seats, used AS inUse, renews, status" },
  services: { table: "it_services", columns: "id, name, uptime, latency, status" },
  windows: { table: "it_windows", columns: "id, title, window_text AS windowText, status" },
  sessions: { table: "it_sessions", columns: "id, name, detail, status" },
  templates: { table: "it_templates", columns: "id, title, uses, status" },
  accounts: { table: "it_accounts", columns: "id, name, role, status" },
};

for (const [key, { table, columns }] of Object.entries(COLS)) {
  it.get(`/${key}`, async (c) => {
    const { cursor, limit } = parsePagination(c);
    const total = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM ${table}`).first<{
      n: number;
    }>();
    const rows = await c.env.DB.prepare(
      `SELECT ${columns} FROM ${table} ${cursor ? "WHERE id > ?" : ""} ORDER BY id ASC LIMIT ?`,
    )
      .bind(...(cursor ? [base64UrlDecode(cursor) ?? ""] : []), limit)
      .all();
    return c.json(paginate(rows.results, total?.n ?? 0, (last) => base64UrlEncode(String(last.id))));
  });
}

interface TicketRow {
  id: string;
  subject: string;
  reporter: string;
  priority: string;
  sla: string;
  elapsed: string;
  status: string;
}

interface TicketEventRow {
  event: string;
  when_text: string;
}

it.get("/tickets/:id", async (c) => {
  const ticket = await c.env.DB.prepare(
    `SELECT id, subject, reporter, priority, sla, elapsed, status FROM it_tickets WHERE id = ?`,
  )
    .bind(c.req.param("id"))
    .first<TicketRow>();
  if (!ticket) throw ApiError.notFound("Ticket not found.");
  const events = await c.env.DB.prepare(
    `SELECT event, when_text AS whenText FROM it_ticket_events WHERE ticket_id = ? ORDER BY sort_order ASC`,
  )
    .bind(ticket.id)
    .all<TicketEventRow>();
  return c.json({ ...ticket, events: events.results });
});