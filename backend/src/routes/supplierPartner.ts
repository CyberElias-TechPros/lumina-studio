import { Hono } from "hono";
import { z } from "zod";
import type { AppEnv } from "../types";
import { base64UrlDecode, base64UrlEncode } from "../lib/crypto";
import { paginate, parsePagination } from "../lib/pagination";
import { requireAuth, requireAnyRole } from "../lib/auth";
import { ApiError } from "../lib/errors";
import { parseBody } from "../lib/validate";

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
    columns: "id, ref, amount, issued_label AS issuedLabel, paid_label AS paidLabel, status",
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
      return c.json(
        paginate(rows.results, total?.n ?? 0, (last) => base64UrlEncode(String(last.id))),
      );
    });
  }
}

interface ThreadRow {
  id: string;
  from_label: string;
  body: string;
  time_label: string;
}

const sendMessageSchema = z.object({
  body: z.string().trim().min(1, "Message cannot be empty.").max(5_000),
});

function registerConversationMessages(
  router: Hono<{ Bindings: AppEnv }>,
  table: string,
  threadTable: string,
): void {
  router.post("/conversations/:id/messages", async (c) => {
    const body = await parseBody(c, sendMessageSchema);
    const conversationId = c.req.param("id");
    const conversation = await c.env.DB.prepare(`SELECT id FROM ${table} WHERE id = ?`)
      .bind(conversationId)
      .first<{ id: string }>();
    if (!conversation) throw ApiError.notFound("Conversation not found.");
    const nextOrder = await c.env.DB.prepare(
      `SELECT COALESCE(MAX(sort_order), -1) + 1 AS n FROM ${threadTable} WHERE conversation_id = ?`,
    )
      .bind(conversationId)
      .first<{ n: number }>();
    const message = {
      id: `${threadTable}-${crypto.randomUUID()}`,
      conversationId,
      fromLabel: "You",
      body: body.body,
      timeLabel: "Just now",
    };
    await c.env.DB.prepare(
      `INSERT INTO ${threadTable} (id, conversation_id, from_label, body, time_label, sort_order)
       VALUES (?, ?, 'You', ?, 'Just now', ?)`,
    )
      .bind(message.id, conversationId, message.body, nextOrder?.n ?? 0)
      .run();
    await c.env.DB.prepare(
      `UPDATE ${table} SET preview = ?, time_label = ?, unread = 0 WHERE id = ?`,
    )
      .bind(message.body, message.timeLabel, conversationId)
      .run();
    return c.json(message, 201);
  });
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

const supplierOrderActionSchema = z.object({
  status: z.enum(["confirmed", "completed"], { message: "Invalid order status." }),
});

/** Supplier/admin: confirm or complete a purchase order. */
supplierDashboard.patch("/orders/:id", async (c) => {
  const { status } = await parseBody(c, supplierOrderActionSchema);
  const id = c.req.param("id");
  const order = await c.env.DB.prepare(`SELECT id, status FROM sup_orders WHERE id = ?`)
    .bind(id)
    .first<{ id: string; status: string }>();
  if (!order) throw ApiError.notFound("Order not found.");
  if (status === "confirmed" && order.status !== "pending confirm") {
    throw ApiError.conflict("Only pending orders can be confirmed.");
  }
  if (status === "completed" && order.status !== "confirmed") {
    throw ApiError.conflict("Only confirmed orders can be completed.");
  }
  await c.env.DB.prepare(`UPDATE sup_orders SET status = ? WHERE id = ?`).bind(status, id).run();
  return c.json({ ok: true, id, status });
});

registerConversationDetail(supplierDashboard, "sup_conversations", "sup_threads", "Conversation");
registerConversationMessages(supplierDashboard, "sup_conversations", "sup_threads");

registerLists(partnerDashboard, PTN_COLS);

const partnerAgreementSchema = z.object({
  title: z.string().trim().min(1, "Agreement title is required.").max(160),
  detail: z.string().trim().max(240).optional(),
});

/** Partner/admin: create a draft MOU request. */
partnerDashboard.post("/agreements", async (c) => {
  const input = await parseBody(c, partnerAgreementSchema);
  const id = `ptn-agreement-${crypto.randomUUID()}`;
  await c.env.DB.prepare(
    `INSERT INTO ptn_agreements (id, partner_id, title, detail, status, renew_label, sort_order)
     VALUES (?, '', ?, ?, 'draft', '', ?)`,
  )
    .bind(id, input.title, input.detail ?? "MOU request submitted for review", Date.now())
    .run();
  return c.json(
    {
      agreement: {
        id,
        ...input,
        detail: input.detail ?? "MOU request submitted for review",
        status: "draft",
        renewLabel: "",
      },
    },
    201,
  );
});

const partnerCollaborationSchema = z.object({
  title: z.string().trim().min(1, "Event title is required.").max(160),
  detail: z.string().trim().min(1, "Event details are required.").max(240),
});

/** Partner/admin: propose a co-branded event. */
partnerDashboard.post("/collaborations", async (c) => {
  const input = await parseBody(c, partnerCollaborationSchema);
  const id = `ptn-collaboration-${crypto.randomUUID()}`;
  await c.env.DB.prepare(
    `INSERT INTO ptn_collaborations (id, partner_id, title, detail, status, sort_order)
     VALUES (?, '', ?, ?, 'in discussion', ?)`,
  )
    .bind(id, input.title, input.detail, Date.now())
    .run();
  return c.json({ collaboration: { id, ...input, status: "in discussion" } }, 201);
});

const partnerReferralSchema = z.object({
  name: z.string().trim().min(1, "Referral name is required.").max(160),
});

/** Partner/admin: add a referral to the partner pipeline. */
partnerDashboard.post("/referrals", async (c) => {
  const input = await parseBody(c, partnerReferralSchema);
  const id = `ptn-referral-${crypto.randomUUID()}`;
  await c.env.DB.prepare(
    `INSERT INTO ptn_referrals (id, partner_id, name, status, value_label, sort_order)
     VALUES (?, '', ?, 'Contacted', 'Pending', ?)`,
  )
    .bind(id, input.name, Date.now())
    .run();
  return c.json({ referral: { id, ...input, status: "Contacted", valueLabel: "Pending" } }, 201);
});

registerConversationDetail(partnerDashboard, "ptn_conversations", "ptn_threads", "Conversation");
registerConversationMessages(partnerDashboard, "ptn_conversations", "ptn_threads");
