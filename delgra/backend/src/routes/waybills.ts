import { Hono } from "hono";
import { waybillItemSchema, waybillSchema, waybillStatusSchema } from "../lib/validate.ts";
import { clientIp, requireCap } from "../lib/auth.ts";
import { AppError } from "../lib/errors.ts";
import { isoNow, newId } from "../lib/ids.ts";
import { writeAudit } from "../lib/audit.ts";
import { listMeta, pickSort } from "../lib/list.ts";
import { allocateNumber } from "../lib/numbering.ts";
import { getBusiness } from "../lib/business.ts";
import { canTransitionWaybill, type WaybillStatus } from "../lib/totals.ts";
import { toKoboSafe } from "../lib/money.ts";
import { renderDocumentPdf, pdfFilename } from "../lib/pdf.ts";
import type { Env, SessionUser } from "../lib/env.ts";

type AppEnv = { Bindings: Env; Variables: { user: SessionUser; requestId: string } };

const waybills = new Hono<AppEnv>();

interface WaybillRow {
  id: string;
  number: string;
  invoice_id: string | null;
  invoice_number: string | null;
  customer_id: string;
  customer_name: string;
  waybill_date: string;
  carrier: string | null;
  tracking_number: string | null;
  origin: string | null;
  destination: string | null;
  receiver_name: string | null;
  receiver_phone: string | null;
  status: WaybillStatus;
  charges: number;
  charges_paid_by: string;
  pieces: number;
  notes: string | null;
  delivered_at: string | null;
  created_at: string;
  updated_at: string;
  created_by_name: string | null;
}

function serialize(row: WaybillRow) {
  return {
    id: row.id,
    number: row.number,
    invoiceId: row.invoice_id,
    invoiceNumber: row.invoice_number,
    customerId: row.customer_id,
    customerName: row.customer_name,
    waybillDate: row.waybill_date,
    carrier: row.carrier,
    trackingNumber: row.tracking_number,
    origin: row.origin,
    destination: row.destination,
    receiverName: row.receiver_name,
    receiverPhone: row.receiver_phone,
    status: row.status,
    charges: toKoboSafe(row.charges),
    chargesPaidBy: row.charges_paid_by,
    pieces: row.pieces,
    notes: row.notes,
    deliveredAt: row.delivered_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    createdByName: row.created_by_name,
  };
}

const SELECT_WAYBILL = `
  SELECT w.*, c.name AS customer_name, i.number AS invoice_number, u.name AS created_by_name
    FROM waybills w
    JOIN customers c ON c.id = w.customer_id
    LEFT JOIN invoices i ON i.id = w.invoice_id
    LEFT JOIN users u ON u.id = w.created_by`;

const SORTABLE = ["waybill_date", "number", "customer_name", "status"] as const;

waybills.get("/", requireCap("read:waybills"), async (c) => {
  const page = Math.max(1, Number.parseInt(c.req.query("page") ?? "1", 10) || 1);
  const limit = Math.min(200, Math.max(1, Number.parseInt(c.req.query("limit") ?? "25", 10) || 25));
  const offset = (page - 1) * limit;

  const q = (c.req.query("q") ?? "").trim().slice(0, 120).replace(/[%_\\]/g, " ");
  const status = (c.req.query("status") ?? "").trim();
  const customerId = (c.req.query("customerId") ?? "").trim();
  const invoiceId = (c.req.query("invoiceId") ?? "").trim();
  const from = (c.req.query("from") ?? "").trim();
  const to = (c.req.query("to") ?? "").trim();
  const sort = pickSort(c.req.query("sort") ?? undefined, SORTABLE, "waybill_date");
  const dir = c.req.query("dir") === "asc" ? "ASC" : "DESC";

  const where: string[] = [];
  const params: (string | number)[] = [];

  if (q) {
    where.push(`(w.number LIKE ? OR c.name LIKE ? OR w.tracking_number LIKE ? OR w.destination LIKE ?)`);
    const like = `%${q}%`;
    params.push(like, like, like, like);
  }
  if (status && ["pending", "in_transit", "delivered", "exception", "cancelled"].includes(status)) {
    where.push(`w.status = ?`);
    params.push(status);
  }
  if (customerId) {
    where.push(`w.customer_id = ?`);
    params.push(customerId);
  }
  if (invoiceId) {
    where.push(`w.invoice_id = ?`);
    params.push(invoiceId);
  }
  if (/^\d{4}-\d{2}-\d{2}$/.test(from)) {
    where.push(`w.waybill_date >= ?`);
    params.push(from);
  }
  if (/^\d{4}-\d{2}-\d{2}$/.test(to)) {
    where.push(`w.waybill_date <= ?`);
    params.push(to);
  }

  const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";
  const countRow = await c.env.DB.prepare(
    `SELECT COUNT(*) AS n FROM waybills w JOIN customers c ON c.id = w.customer_id ${whereSql}`,
  )
    .bind(...params)
    .first<{ n: number }>();

  const orderColumn =
    sort === "customer_name" ? "c.name" : sort === "number" ? "w.number" : sort === "status" ? "w.status" : "w.waybill_date";

  const rows = await c.env.DB.prepare(
    `${SELECT_WAYBILL} ${whereSql} ORDER BY ${orderColumn} ${dir}, w.id ASC LIMIT ? OFFSET ?`,
  )
    .bind(...params, limit, offset)
    .all<WaybillRow>();

  return c.json({ data: rows.results.map(serialize), meta: listMeta(page, limit, countRow?.n ?? 0) });
});

waybills.get("/:id", requireCap("read:waybills"), async (c) => {
  const row = await c.env.DB.prepare(`${SELECT_WAYBILL} WHERE w.id = ?`)
    .bind(c.req.param("id"))
    .first<WaybillRow>();
  if (!row) throw AppError.notFound("Waybill");

  const items = await c.env.DB.prepare(
    `SELECT id, product_id, description, quantity, serial_number, weight_kg, note
       FROM waybill_items WHERE waybill_id = ? ORDER BY sort_order, rowid`,
  )
    .bind(row.id)
    .all();

  return c.json({
    waybill: serialize(row),
    items: (items.results as Array<Record<string, unknown>>).map((r) => ({
      id: r.id,
      productId: r.product_id,
      description: r.description,
      quantity: r.quantity,
      serialNumber: r.serial_number,
      weightKg: r.weight_kg,
      note: r.note,
    })),
  });
});

waybills.post("/", requireCap("write:waybills"), async (c) => {
  const input = waybillSchema.parse(await c.req.json());

  const customer = await c.env.DB.prepare(`SELECT id, name FROM customers WHERE id = ?`)
    .bind(input.customerId)
    .first<{ id: string; name: string }>();
  if (!customer) throw AppError.validation("That customer does not exist.", { customerId: "Unknown customer." });

  if (input.invoiceId) {
    const invoice = await c.env.DB.prepare(
      `SELECT id, customer_id, status FROM invoices WHERE id = ?`,
    )
      .bind(input.invoiceId)
      .first<{ id: string; customer_id: string; status: string }>();
    if (!invoice) throw AppError.validation("That invoice does not exist.", { invoiceId: "Unknown invoice." });
    if (invoice.customer_id !== input.customerId) {
      throw AppError.validation("That invoice belongs to a different customer.", {
        invoiceId: "Invoice/customer mismatch.",
      });
    }
  }

  const business = await getBusiness(c.env);
  const id = newId();
  const now = isoNow();
  const user = c.get("user");
  const alloc = allocateNumber(
    c.env.DB,
    "waybill",
    { prefix: business.waybillPrefix, series: business.waybillSeries },
    input.waybillDate,
    "WB",
  );

  const stmts: D1PreparedStatement[] = [
    alloc.ensure,
    c.env.DB.prepare(
      `INSERT INTO waybills
         (id, number, invoice_id, customer_id, waybill_date, carrier, tracking_number, origin,
          destination, receiver_name, receiver_phone, status, charges, charges_paid_by,
          pieces, notes, delivered_at, created_by, created_at, updated_at)
       VALUES (?, ${alloc.fragment}, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    ).bind(
      id,
      ...alloc.fragmentParams,
      input.invoiceId || null,
      input.customerId,
      input.waybillDate,
      input.carrier || null,
      input.trackingNumber || null,
      input.origin || null,
      input.destination || null,
      input.receiverName || customer.name,
      input.receiverPhone || null,
      input.status,
      input.charges ?? 0,
      input.chargesPaidBy,
      input.pieces,
      input.notes || null,
      input.status === "delivered" ? now : null,
      user.id,
      now,
      now,
    ),
    alloc.bump,
  ];

  input.items.forEach((item, index) => {
    stmts.push(
      c.env.DB.prepare(
        `INSERT INTO waybill_items (id, waybill_id, product_id, description, quantity, serial_number, weight_kg, note, sort_order)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      ).bind(
        newId(),
        id,
        item.productId || null,
        item.description,
        item.quantity,
        item.serialNumber || null,
        item.weightKg ?? null,
        item.note || null,
        index,
      ),
    );
  });

  try {
    await c.env.DB.batch(stmts);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    if (/UNIQUE/i.test(message)) {
      throw AppError.conflict("A waybill with that number already exists. Try again.");
    }
    throw err;
  }

  await writeAudit(c.env, {
    actor: user,
    action: "waybill.create",
    entityType: "waybill",
    entityId: id,
    summary: `${customer.name}${input.destination ? ` → ${input.destination}` : ""}`,
    ip: clientIp(c),
  });

  const created = await c.env.DB.prepare(`${SELECT_WAYBILL} WHERE w.id = ?`).bind(id).first<WaybillRow>();
  return c.json({ waybill: serialize(created!) }, 201);
});

waybills.patch("/:id", requireCap("write:waybills"), async (c) => {
  const id = c.req.param("id");
  const current = await c.env.DB.prepare(`${SELECT_WAYBILL} WHERE w.id = ?`).bind(id).first<WaybillRow>();
  if (!current) throw AppError.notFound("Waybill");

  const raw = (await c.req.json()) as Record<string, unknown>;
  const merged = {
    customerId: current.customer_id,
    invoiceId: current.invoice_id,
    waybillDate: current.waybill_date,
    carrier: current.carrier ?? "",
    trackingNumber: current.tracking_number ?? "",
    origin: current.origin ?? "",
    destination: current.destination ?? "",
    receiverName: current.receiver_name ?? "",
    receiverPhone: current.receiver_phone ?? "",
    status: current.status,
    charges: current.charges,
    chargesPaidBy: current.charges_paid_by,
    pieces: current.pieces,
    notes: current.notes ?? "",
    ...(raw.items ? {} : { items: [] }),
    ...raw,
  };
  const input = waybillSchema.parse(merged);
  const user = c.get("user");

  if (input.status !== current.status && !canTransitionWaybill(current.status, input.status)) {
    throw AppError.conflict(`Cannot move a waybill from "${current.status}" to "${input.status}".`);
  }

  const now = isoNow();
  const stmts: D1PreparedStatement[] = [
    c.env.DB.prepare(
      `UPDATE waybills SET
         invoice_id = ?, customer_id = ?, waybill_date = ?, carrier = ?, tracking_number = ?,
         origin = ?, destination = ?, receiver_name = ?, receiver_phone = ?, status = ?,
         charges = ?, charges_paid_by = ?, pieces = ?, notes = ?, delivered_at = ?, updated_at = ?
       WHERE id = ?`,
    ).bind(
      input.invoiceId || null,
      input.customerId,
      input.waybillDate,
      input.carrier || null,
      input.trackingNumber || null,
      input.origin || null,
      input.destination || null,
      input.receiverName || null,
      input.receiverPhone || null,
      input.status,
      input.charges ?? 0,
      input.chargesPaidBy,
      input.pieces,
      input.notes || null,
      input.status === "delivered" ? (current.delivered_at ?? now) : null,
      now,
      id,
    ),
  ];

  // Items are only replaced when the client actually sent some; otherwise an
  // update to the tracking number would wipe the consignment list.
  if (Array.isArray(raw.items) && raw.items.length > 0) {
    const items = raw.items.map((item) => waybillItemSchema.parse(item));
    stmts.push(c.env.DB.prepare(`DELETE FROM waybill_items WHERE waybill_id = ?`).bind(id));
    items.forEach((item, index) => {
      stmts.push(
        c.env.DB.prepare(
          `INSERT INTO waybill_items (id, waybill_id, product_id, description, quantity, serial_number, weight_kg, note, sort_order)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        ).bind(
          newId(),
          id,
          item.productId || null,
          item.description,
          item.quantity,
          item.serialNumber || null,
          item.weightKg ?? null,
          item.note || null,
          index,
        ),
      );
    });
  }

  await c.env.DB.batch(stmts);

  await writeAudit(c.env, {
    actor: user,
    action: raw.status ? `waybill.status.${input.status}` : "waybill.update",
    entityType: "waybill",
    entityId: id,
    summary: current.number,
    ip: clientIp(c),
  });

  const updated = await c.env.DB.prepare(`${SELECT_WAYBILL} WHERE w.id = ?`).bind(id).first<WaybillRow>();
  return c.json({ waybill: serialize(updated!) });
});

/** Fast path for the "mark delivered" button on the list view. */
waybills.post("/:id/status", requireCap("write:waybills"), async (c) => {
  const id = c.req.param("id");
  const current = await c.env.DB.prepare(`${SELECT_WAYBILL} WHERE w.id = ?`).bind(id).first<WaybillRow>();
  if (!current) throw AppError.notFound("Waybill");

  const input = waybillStatusSchema.parse(await c.req.json());
  if (!canTransitionWaybill(current.status, input.status)) {
    throw AppError.conflict(`Cannot move a waybill from "${current.status}" to "${input.status}".`);
  }

  const now = isoNow();
  await c.env.DB.prepare(
    `UPDATE waybills SET status = ?, delivered_at = ?, notes = COALESCE(?, notes), updated_at = ? WHERE id = ?`,
  )
    .bind(
      input.status,
      input.status === "delivered" ? (current.delivered_at ?? now) : null,
      input.note || null,
      now,
      id,
    )
    .run();

  await writeAudit(c.env, {
    actor: c.get("user"),
    action: `waybill.status.${input.status}`,
    entityType: "waybill",
    entityId: id,
    summary: `${current.number}${input.note ? ` · ${input.note}` : ""}`,
    ip: clientIp(c),
  });

  const updated = await c.env.DB.prepare(`${SELECT_WAYBILL} WHERE w.id = ?`).bind(id).first<WaybillRow>();
  return c.json({ waybill: serialize(updated!) });
});

waybills.delete("/:id", requireCap("delete:waybills"), async (c) => {
  const id = c.req.param("id");
  const current = await c.env.DB.prepare(`${SELECT_WAYBILL} WHERE w.id = ?`).bind(id).first<WaybillRow>();
  if (!current) throw AppError.notFound("Waybill");

  if (current.status === "delivered") {
    throw AppError.conflict("A delivered waybill cannot be deleted. Cancel it instead to keep the record.");
  }

  await c.env.DB.batch([
    c.env.DB.prepare(`DELETE FROM waybill_items WHERE waybill_id = ?`).bind(id),
    c.env.DB.prepare(`DELETE FROM waybills WHERE id = ?`).bind(id),
  ]);

  await writeAudit(c.env, {
    actor: c.get("user"),
    action: "waybill.delete",
    entityType: "waybill",
    entityId: id,
    summary: current.number,
    ip: clientIp(c),
  });

  return c.json({ ok: true });
});

waybills.get("/:id/pdf", requireCap("read:waybills"), async (c) => {
  const row = await c.env.DB.prepare(`${SELECT_WAYBILL} WHERE w.id = ?`)
    .bind(c.req.param("id"))
    .first<WaybillRow>();
  if (!row) throw AppError.notFound("Waybill");

  const business = await getBusiness(c.env);
  const [items, customer] = await Promise.all([
    c.env.DB.prepare(
      `SELECT description, quantity, serial_number, weight_kg FROM waybill_items WHERE waybill_id = ? ORDER BY sort_order, rowid`,
    )
      .bind(row.id)
      .all<{ description: string; quantity: number; serial_number: string | null; weight_kg: number | null }>(),
    c.env.DB.prepare(
      `SELECT name, contact_person, address_line1, city, state, phone, email FROM customers WHERE id = ?`,
    )
      .bind(row.customer_id)
      .first<Record<string, unknown>>(),
  ]);

  const pdf = await renderDocumentPdf({
    kind: "waybill",
    title: "Waybill",
    number: row.number,
    issueDate: row.waybill_date,
    dueDate: null,
    status: row.status,
    business,
    counterpartyLabel: "Consignee",
    counterparty: {
      name: row.receiver_name || String(customer?.name ?? ""),
      contactPerson: (customer?.contact_person as string) ?? null,
      addressLine1: row.destination ?? (customer?.address_line1 as string) ?? null,
      city: (customer?.city as string) ?? null,
      state: (customer?.state as string) ?? null,
      phone: row.receiver_phone ?? (customer?.phone as string) ?? null,
      email: (customer?.email as string) ?? null,
    },
    lines: items.results.map((i) => ({
      description: i.description,
      quantity: i.quantity,
      unitPrice: 0,
      amount: 0,
    })),
    extraColumns: [
      {
        header: "Serial / weight",
        values: items.results.map((i) =>
          [i.serial_number, i.weight_kg ? `${i.weight_kg} kg` : null].filter(Boolean).join(" · ") || "—",
        ),
      },
    ],
    subtotal: 0,
    shipping: row.charges,
    total: row.charges,
    notes: row.notes,
    meta: [
      ...(row.carrier ? ([["Carrier", row.carrier]] as Array<[string, string]>) : []),
      ...(row.tracking_number ? ([["Tracking no.", row.tracking_number]] as Array<[string, string]>) : []),
      ...(row.origin ? ([["Origin", row.origin]] as Array<[string, string]>) : []),
      ...(row.destination ? ([["Destination", row.destination]] as Array<[string, string]>) : []),
      ...(row.invoice_number ? ([["Invoice", row.invoice_number]] as Array<[string, string]>) : []),
      ["Pieces", String(row.pieces)],
      ["Freight payable by", row.charges_paid_by === "receiver" ? "Receiver" : "Sender"],
    ],
  });

  c.header("content-type", "application/pdf");
  c.header("content-disposition", `inline; filename="${pdfFilename("Waybill", row.number)}"`);
  c.header("cache-control", "private, max-age=60");
  return c.body(pdf as unknown as ArrayBuffer);
});

export default waybills;
