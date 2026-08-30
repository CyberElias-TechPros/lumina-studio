import { Hono } from "hono";
import type { AppEnv } from "../types";
import { base64UrlDecode, base64UrlEncode } from "../lib/crypto";
import { paginate, parsePagination } from "../lib/pagination";
import { requireAuth, requireAnyRole } from "../lib/auth";
import { z } from "zod";
import { parseBody } from "../lib/validate";

const CLI_COLS: Record<string, { table: string; columns: string }> = {
  tickets: {
    table: "cli_tickets",
    columns: "id, title, description, reference, date_label AS dateLabel, sla, status",
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
      const userScoped = key === "tickets";
      const ownershipWhere = userScoped ? " WHERE (client_id = ? OR client_id IS NULL)" : "";
      const cursorWhere = cursor ? `${userScoped ? " AND" : " WHERE"} id > ?` : "";
      const total = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM ${table}${ownershipWhere}`)
        .bind(...(userScoped ? [c.get("authUser").id] : []))
        .first<{
          n: number;
        }>();
      const rows = await c.env.DB.prepare(
        `SELECT ${columns} FROM ${table}${ownershipWhere}${cursorWhere} ORDER BY sort_order ASC, id ASC LIMIT ?`,
      )
        .bind(
          ...(userScoped ? [c.get("authUser").id] : []),
          ...(cursor ? [base64UrlDecode(cursor) ?? ""] : []),
          limit,
        )
        .all();
      return c.json(
        paginate(rows.results, total?.n ?? 0, (last) => base64UrlEncode(String(last.id))),
      );
    });
  }
}

export const clientDashboard = new Hono<{ Bindings: AppEnv }>();
clientDashboard.use("*", requireAuth, requireAnyRole(["client", "admin"]));
registerLists(clientDashboard, CLI_COLS);

const ticketSchema = z.object({
  title: z.string().trim().min(1, "Ticket title is required.").max(200),
  description: z.string().trim().max(1_000).optional(),
});

/** Client/admin: create a support ticket owned by the current portal account. */
clientDashboard.post("/tickets", async (c) => {
  const input = await parseBody(c, ticketSchema);
  const id = `cli-ticket-${crypto.randomUUID()}`;
  const reference = `TK-${String(Date.now()).slice(-6)}`;
  const dateLabel = new Date().toLocaleDateString("en-GB", {
    month: "short",
    day: "numeric",
  });
  await c.env.DB.prepare(
    `INSERT INTO cli_tickets (id, title, description, reference, date_label, sla, status, sort_order, client_id)
     VALUES (?, ?, ?, ?, ?, 'SLA: 24h', 'Open', ?, ?)`,
  )
    .bind(
      id,
      input.title,
      input.description ?? "",
      reference,
      dateLabel,
      Date.now(),
      c.get("authUser").id,
    )
    .run();
  return c.json(
    {
      ticket: {
        id,
        title: input.title,
        description: input.description ?? "",
        reference,
        dateLabel,
        sla: "SLA: 24h",
        status: "Open",
      },
    },
    201,
  );
});
