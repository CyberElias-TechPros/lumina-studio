import { Hono } from "hono";
import { clientIp, requireCap, requireSession } from "../lib/auth.ts";
import { AppError } from "../lib/errors.ts";
import { isoNow, newId, randomToken } from "../lib/ids.ts";
import { writeAudit } from "../lib/audit.ts";
import { checkRateLimit } from "../lib/rate-limit.ts";
import { getBusiness } from "../lib/business.ts";
import { toKoboSafe } from "../lib/money.ts";
import { displayStatus, type InvoiceStatus } from "../lib/totals.ts";
import { renderDocumentPdf, pdfFilename } from "../lib/pdf.ts";
import type { Env, SessionUser } from "../lib/env.ts";

type AppEnv = { Bindings: Env; Variables: { user: SessionUser; requestId: string } };

const share = new Hono<AppEnv>();

/**
 * Tokenised read-only links.
 *
 * A customer gets a URL like `/share/<token>` that shows one invoice or waybill
 * with no account and no password. The token is 256 bits of randomness, scoped to
 * exactly one document, revocable, expirable, and rate-limited — so it grants no
 * more than the single PDF the customer would have been emailed anyway.
 *
 * These routes are mounted *outside* the session gate in index.ts.
 */

interface ShareRow {
  id: string;
  entity_type: "invoice" | "waybill";
  entity_id: string;
  token: string;
  created_at: string;
  expires_at: string | null;
  revoked_at: string | null;
  view_count: number;
}

async function resolveShare(db: D1Database, token: string): Promise<ShareRow> {
  if (!token || token.length < 20 || token.length > 128) throw AppError.notFound("Shared document");

  const row = await db.prepare(`SELECT * FROM share_links WHERE token = ?`).bind(token).first<ShareRow>();
  if (!row) throw AppError.notFound("Shared document");
  if (row.revoked_at) throw AppError.notFound("This link has been revoked.");
  if (row.expires_at && row.expires_at <= isoNow()) throw AppError.notFound("This link has expired.");
  return row;
}

async function renderSharedPayload(db: D1Database, row: ShareRow) {
  const business = await getBusiness({ DB: db });

  if (row.entity_type === "invoice") {
    const invoice = await db
      .prepare(
        `SELECT i.*, c.name AS customer_name, c.contact_person, c.address_line1, c.city, c.state,
                c.phone, c.email, c.rc_number
           FROM invoices i JOIN customers c ON c.id = i.customer_id WHERE i.id = ?`,
      )
      .bind(row.entity_id)
      .first<Record<string, unknown>>();
    if (!invoice) throw AppError.notFound("Shared document");

    const items = await db
      .prepare(`SELECT description, quantity, unit_price, amount FROM invoice_items WHERE invoice_id = ? ORDER BY sort_order, rowid`)
      .bind(row.entity_id)
      .all<Record<string, unknown>>();

    const total = toKoboSafe(Number(invoice.total));
    const paid = toKoboSafe(Number(invoice.paid_amount));
    const status = displayStatus({
      status: invoice.status as InvoiceStatus,
      due_date: String(invoice.due_date),
      total,
      paid_amount: paid,
    });

    return {
      business: {
        name: business.name,
        addressLines: [business.addressLine1, business.addressLine2, business.city, business.state].filter(Boolean),
        phone: business.phone,
        email: business.email,
        currencySymbol: business.currencySymbol,
        bankName: business.bankName,
        bankAccountName: business.bankAccountName,
        bankAccountNumber: business.bankAccountNumber,
      },
      document: {
        type: "invoice" as const,
        number: invoice.number,
        title: invoice.status === "draft" ? "Proforma Invoice" : "Invoice",
        status,
        issueDate: invoice.issue_date,
        dueDate: invoice.due_date,
        customerName: invoice.customer_name,
        contactPerson: invoice.contact_person,
        addressLine1: invoice.address_line1,
        city: invoice.city,
        state: invoice.state,
        phone: invoice.phone,
        email: invoice.email,
        items: items.results.map((i) => ({
          description: i.description,
          quantity: i.quantity,
          unitPrice: toKoboSafe(Number(i.unit_price)),
          amount: toKoboSafe(Number(i.amount)),
        })),
        subtotal: toKoboSafe(Number(invoice.subtotal)),
        discount: toKoboSafe(Number(invoice.discount)),
        taxLabel: business.taxLabel,
        taxAmount: toKoboSafe(Number(invoice.tax_amount)),
        shipping: toKoboSafe(Number(invoice.shipping)),
        total,
        paidAmount: paid,
        balance: Math.max(total - paid, 0),
        notes: invoice.notes,
        terms: invoice.terms,
      },
      raw: invoice,
    };
  }

  const waybill = await db
    .prepare(
      `SELECT w.*, c.name AS customer_name, c.phone, c.email
         FROM waybills w JOIN customers c ON c.id = w.customer_id WHERE w.id = ?`,
    )
    .bind(row.entity_id)
    .first<Record<string, unknown>>();
  if (!waybill) throw AppError.notFound("Shared document");

  const items = await db
    .prepare(`SELECT description, quantity, serial_number, weight_kg FROM waybill_items WHERE waybill_id = ? ORDER BY sort_order, rowid`)
    .bind(row.entity_id)
    .all<Record<string, unknown>>();

  return {
    business: {
      name: business.name,
      addressLines: [business.addressLine1, business.addressLine2, business.city, business.state].filter(Boolean),
      phone: business.phone,
      email: business.email,
      currencySymbol: business.currencySymbol,
      bankName: business.bankName,
      bankAccountName: business.bankAccountName,
      bankAccountNumber: business.bankAccountNumber,
    },
    document: {
      type: "waybill" as const,
      number: waybill.number,
      title: "Waybill",
      status: waybill.status,
      issueDate: waybill.waybill_date,
      dueDate: null,
      customerName: waybill.receiver_name || waybill.customer_name,
      carrier: waybill.carrier,
      trackingNumber: waybill.tracking_number,
      origin: waybill.origin,
      destination: waybill.destination,
      receiverPhone: waybill.receiver_phone,
      pieces: waybill.pieces,
      charges: toKoboSafe(Number(waybill.charges)),
      chargesPaidBy: waybill.charges_paid_by,
      items: items.results.map((i) => ({
        description: i.description,
        quantity: i.quantity,
        serialNumber: i.serial_number,
        weightKg: i.weight_kg,
      })),
      notes: waybill.notes,
    },
    raw: waybill,
  };
}

share.get("/:token", async (c) => {
  const token = c.req.param("token");
  const ip = clientIp(c) ?? "unknown";
  const rl = await checkRateLimit(c.env, "shareView", ip);
  if (!rl.allowed) throw AppError.rateLimited(rl.resetSeconds);

  const row = await resolveShare(c.env.DB, token);
  const payload = await renderSharedPayload(c.env.DB, row);

  // Count the view without exposing the counter to the client.
  await c.env.DB.prepare(`UPDATE share_links SET view_count = view_count + 1 WHERE id = ?`).bind(row.id).run();

  return c.json({ business: payload.business, document: payload.document });
});

share.get("/:token/pdf", async (c) => {
  const token = c.req.param("token");
  const ip = clientIp(c) ?? "unknown";
  const rl = await checkRateLimit(c.env, "shareView", ip);
  if (!rl.allowed) throw AppError.rateLimited(rl.resetSeconds);

  const row = await resolveShare(c.env.DB, token);
  const payload = await renderSharedPayload(c.env.DB, row);
  const business = await getBusiness(c.env);

  const doc = payload.document as Record<string, unknown>;
  const pdf = await renderDocumentPdf({
    kind: row.entity_type,
    title: String(doc.title),
    number: String(doc.number),
    issueDate: String(doc.issueDate),
    dueDate: (doc.dueDate as string) ?? null,
    status: String(doc.status),
    business,
    counterpartyLabel: row.entity_type === "invoice" ? "Bill to" : "Consignee",
    counterparty: {
      name: String(doc.customerName ?? ""),
      addressLine1: (doc.addressLine1 as string) ?? (doc.destination as string) ?? null,
      city: (doc.city as string) ?? null,
      state: (doc.state as string) ?? null,
      phone: (doc.phone as string) ?? (doc.receiverPhone as string) ?? null,
      email: (doc.email as string) ?? null,
    },
    lines:
      row.entity_type === "invoice"
        ? (doc.items as Array<Record<string, unknown>>).map((i) => ({
            description: String(i.description),
            quantity: Number(i.quantity),
            unitPrice: Number(i.unitPrice),
            amount: Number(i.amount),
          }))
        : (doc.items as Array<Record<string, unknown>>).map((i) => ({
            description: String(i.description),
            quantity: Number(i.quantity),
            unitPrice: 0,
            amount: 0,
          })),
    subtotal: Number(doc.subtotal ?? 0),
    discount: Number(doc.discount ?? 0),
    taxLabel: String(doc.taxLabel ?? business.taxLabel),
    taxAmount: Number(doc.taxAmount ?? 0),
    shipping: row.entity_type === "waybill" ? Number(doc.charges ?? 0) : Number(doc.shipping ?? 0),
    total: row.entity_type === "waybill" ? Number(doc.charges ?? 0) : Number(doc.total ?? 0),
    paidAmount: row.entity_type === "invoice" ? Number(doc.paidAmount ?? 0) : undefined,
    balance: row.entity_type === "invoice" ? Number(doc.balance ?? 0) : undefined,
    notes: (doc.notes as string) ?? null,
    terms: (doc.terms as string) ?? null,
    meta:
      row.entity_type === "waybill"
        ? ([
            ...(doc.carrier ? ([["Carrier", String(doc.carrier)]] as Array<[string, string]>) : []),
            ...(doc.trackingNumber ? ([["Tracking no.", String(doc.trackingNumber)]] as Array<[string, string]>) : []),
            ...(doc.origin ? ([["Origin", String(doc.origin)]] as Array<[string, string]>) : []),
            ...(doc.destination ? ([["Destination", String(doc.destination)]] as Array<[string, string]>) : []),
            ["Pieces", String(doc.pieces ?? 1)],
          ] as Array<[string, string]>)
        : [],
  });

  c.header("content-type", "application/pdf");
  c.header("content-disposition", `inline; filename="${pdfFilename(String(doc.title), String(doc.number))}"`);
  return c.body(pdf as unknown as ArrayBuffer);
});

/* ------------------------------------------- management (authenticated) */

/**
 * Management routes.
 *
 * These live at `/v1/share-links`, NOT under `/v1/share/manage`: the public
 * `GET /v1/share/:token` route is registered first and would otherwise swallow
 * the literal path segment "manage" and treat it as a token.
 *
 * Mounted inside the authenticated group in index.ts, so `requireSession` is
 * already applied; the capability check is layered on top.
 */
const manage = new Hono<AppEnv>();
manage.use("*", requireSession());
manage.use("*", requireCap("read:shares"));

manage.get("/", async (c) => {
  const entityType = c.req.query("entityType");
  const entityId = c.req.query("entityId");
  const where: string[] = [];
  const params: string[] = [];
  if (entityType) {
    where.push(`entity_type = ?`);
    params.push(entityType);
  }
  if (entityId) {
    where.push(`entity_id = ?`);
    params.push(entityId);
  }
  const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";
  const rows = await c.env.DB.prepare(
    `SELECT s.id, s.entity_type, s.entity_id, s.token, s.created_at, s.expires_at, s.revoked_at, s.view_count,
            COALESCE(i.number, w.number) AS document_number
       FROM share_links s
       LEFT JOIN invoices i ON s.entity_type = 'invoice' AND i.id = s.entity_id
       LEFT JOIN waybills w ON s.entity_type = 'waybill' AND w.id = s.entity_id
      ${whereSql}
      ORDER BY s.created_at DESC LIMIT 100`,
  )
    .bind(...params)
    .all<Record<string, unknown>>();

  const appUrl = c.env.APP_URL ?? "";
  return c.json({
    data: rows.results.map((r) => ({
      id: r.id,
      entityType: r.entity_type,
      entityId: r.entity_id,
      documentNumber: r.document_number,
      token: r.token,
      url: `${appUrl}/share/${r.token}`,
      createdAt: r.created_at,
      expiresAt: r.expires_at,
      revokedAt: r.revoked_at,
      viewCount: r.view_count,
      active: !r.revoked_at && (!r.expires_at || String(r.expires_at) > isoNow()),
    })),
  });
});

manage.post("/", requireCap("write:shares"), async (c) => {
  const body = (await c.req.json()) as { entityType?: unknown; entityId?: unknown; expiresInDays?: unknown };
  const entityType = body.entityType;
  const entityId = typeof body.entityId === "string" ? body.entityId : "";

  if (entityType !== "invoice" && entityType !== "waybill") {
    throw AppError.validation("entityType must be 'invoice' or 'waybill'.", { entityType: "Invalid." });
  }
  if (!entityId) throw AppError.validation("entityId is required.", { entityId: "Required." });

  const table = entityType === "invoice" ? "invoices" : "waybills";
  const target = await c.env.DB.prepare(`SELECT id FROM ${table} WHERE id = ?`).bind(entityId).first();
  if (!target) throw AppError.notFound("Document");

  const days = Number(body.expiresInDays ?? 30);
  const expiresAt =
    Number.isFinite(days) && days > 0
      ? new Date(Date.now() + Math.min(days, 365) * 86_400_000).toISOString()
      : null;

  const id = newId();
  const token = randomToken(32);
  await c.env.DB.prepare(
    `INSERT INTO share_links (id, entity_type, entity_id, token, created_by, created_at, expires_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
  )
    .bind(id, entityType, entityId, token, c.get("user").id, isoNow(), expiresAt)
    .run();

  await writeAudit(c.env, {
    actor: c.get("user"),
    action: "share.create",
    entityType,
    entityId,
    ip: clientIp(c),
  });

  const appUrl = c.env.APP_URL ?? "";
  return c.json({ id, token, url: `${appUrl}/share/${token}`, expiresAt }, 201);
});

manage.post("/:id/revoke", requireCap("write:shares"), async (c) => {
  const id = c.req.param("id");
  const row = await c.env.DB.prepare(`SELECT id, entity_type, entity_id FROM share_links WHERE id = ?`)
    .bind(id)
    .first<{ id: string; entity_type: string; entity_id: string }>();
  if (!row) throw AppError.notFound("Share link");

  await c.env.DB.prepare(`UPDATE share_links SET revoked_at = ? WHERE id = ?`).bind(isoNow(), id).run();
  await writeAudit(c.env, {
    actor: c.get("user"),
    action: "share.revoke",
    entityType: row.entity_type,
    entityId: row.entity_id,
    ip: clientIp(c),
  });
  return c.json({ ok: true });
});

export { manage as shareLinks };
export default share;
