import { Hono } from "hono";
import type { AppEnv } from "../types";
import { base64UrlDecode, base64UrlEncode } from "../lib/crypto";
import { paginate, parsePagination } from "../lib/pagination";
import { requireAuth, requireAnyRole } from "../lib/auth";
import { ApiError } from "../lib/errors";

const SUPPLIER_STAFF = ["supplier", "admin"];
const PARTNER_STAFF = ["partner", "admin"];

export const supplierDashboard = new Hono<{ Bindings: AppEnv }>();
export const partnerDashboard = new Hono<{ Bindings: AppEnv }>();

supplierDashboard.use("*", requireAuth, requireAnyRole(SUPPLIER_STAFF));
partnerDashboard.use("*", requireAuth, requireAnyRole(PARTNER_STAFF));

const SUP_COLS: Record<string, { table: string; columns: string }> = {
  orders: {
    table: "sup_orders",
    columns: "id, ref, items, amount, due_label AS dueLabel, status",
  },
  deliveries: {
    table: "sup_deliveries",
    columns: "id, po_label AS poLabel, when_label AS whenLabel, to_label AS toLabel, status",
  },
  invoices: {
    table: "sup_invoices",
    columns:
      "id, ref, amount, issued_label AS issuedLabel, paid_label AS paidLabel, status",
  },
  performance: {
    table: "sup_performance",
    columns: "id, metric, value_label AS valueLabel",
  },
  certs: {
    table: "sup_certs",
    columns: "id, title, detail, verified",
  },
  conversations: {
    table: "sup_conversations",
    columns: "id, name, preview, time_label AS timeLabel, unread",
  },
};

const PTN_COLS: Record<string, { table: string; columns: string }> = {
  agreements: {
    table: "ptn_agreements",
    columns: "id, title, detail, status, renew_label AS renewLabel",
  },
  collaborations: {
    table: "ptn_collaborations",
    columns: "id, title, detail, status",
  },
  referrals: {
    table: "ptn_referrals",
    columns: "id, name, status, value_label AS valueLabel",
  },
  resources: {
    table: "ptn_resources",
    columns: "id, title, kind, detail",
  },
  reports: {
    table: "ptn_reports",
    columns: "id, title, detail, kind, value_label AS valueLabel",
  },
  conversations: {
    table: "ptn_conversations",
    columns: "id, name, preview, time_label AS timeLabel, unread",
  },
};

function registerLists(router: Hono<{ Bindings: AppEnv }>, cols: typeof SUP_COLS): void {
  for (const [key, { table, columns }] of Object.entries(cols)) {
    router.get(`/${key}`, async (c) => {
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
}

interface ThreadRow {
  id: string;
  from_label: string;
  body: string;
  time_label: string;
}

function registerConversationDetail(
  router: Hono<{ Bindings: AppEnv }>,
  table: string,
  threadTable: string,
  label: string,
): void {
  router.get("/conversations/:id", async (c) => {
    const convo = await c.env.DB.prepare(
      `SELECT id, name, preview, time_label AS timeLabel, unread FROM ${table} WHERE id = ?`,
    )
      .bind(c.req.param("id"))
      .first();
    if (!convo) throw ApiError.notFound(`${label} not found.`);
    const thread = await c.env.DB.prepare(
      `SELECT id, from_label AS fromLabel, body, time_label AS timeLabel FROM ${threadTable} WHERE conversation_id = ? ORDER BY sort_order ASC`,
    )
      .bind(convo.id as string)
      .all<ThreadRow>();
    return c.json({ ...convo, thread: thread.results });
  });
}

registerLists(supplierDashboard, SUP_COLS);
registerConversationDetail(supplierDashboard, "sup_conversations", "sup_threads", "Conversation");

registerLists(partnerDashboard, PTN_COLS);
registerConversationDetail(partnerDashboard, "ptn_conversations", "ptn_threads", "Conversation");
