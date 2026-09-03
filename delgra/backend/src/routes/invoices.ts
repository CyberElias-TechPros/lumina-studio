import { Hono } from "hono";
import { invoiceSchema, invoiceUpdateSchema, paymentSchema } from "../lib/validate.ts";
import { clientIp, requireCap } from "../lib/auth.ts";
import { can } from "../lib/permissions.ts";
import { AppError } from "../lib/errors.ts";
import { isoNow, newId } from "../lib/ids.ts";
import { writeAudit } from "../lib/audit.ts";
import { listMeta, pickSort } from "../lib/list.ts";
import { allocateNumber } from "../lib/numbering.ts";
import { getBusiness } from "../lib/business.ts";
import { computeInvoiceTotals, canTransitionInvoice, displayStatus, type InvoiceStatus } from "../lib/totals.ts";
import { toKoboSafe } from "../lib/money.ts";
import { renderDocumentPdf, pdfFilename } from "../lib/pdf.ts";
import { stockStatements, reversalStatements } from "../lib/stock.ts";
import type { Env, SessionUser } from "../lib/env.ts";

type AppEnv = { Bindings: Env; Variables: { user: SessionUser; requestId: string } };

const invoices = new Hono<AppEnv>();

/** Hard cap keeps every invoice write inside one D1 batch (100 statements). */
const MAX_ITEMS = 40;

interface InvoiceRow {
  id: string;
  number: string;
  customer_id: string;
  customer_name: string;
  issue_date: string;
  due_date: string;
  status: InvoiceStatus;
  subtotal: number;
  discount: number;
  tax_enabled: number;
  tax_rate_bp: number;
  tax_amount: number;
  shipping: number;
  total: number;
  paid_amount: number;
  currency: string;
  po_number: string | null;
  notes: string | null;
  terms: string | null;
  void_reason: string | null;
  voided_at: string | null;
  created_at: string;
  updated_at: string;
  created_by_name: string | null;
}

function serialize(row: InvoiceRow) {
  const paid = toKoboSafe(row.paid_amount);
  const total = toKoboSafe(row.total);
  const derived = displayStatus({
    status: row.status,
    due_date: row.due_date,
    total,
    paid_amount: paid,
  });
  return {
    id: row.id,
    number: row.number,
    customerId: row.customer_id,
    customerName: row.customer_name,
    issueDate: row.issue_date,
    dueDate: row.due_date,
    status: row.status,
    displayStatus: derived,
    isOverdue: derived === "overdue",
    subtotal: toKoboSafe(row.subtotal),
    discount: toKoboSafe(row.discount),
    taxEnabled: Boolean(row.tax_enabled),
    taxRateBp: row.tax_rate_bp,
    taxAmount: toKoboSafe(row.tax_amount),
    shipping: toKoboSafe(row.shipping),
    total,
    paidAmount: paid,
    balance: Math.max(total - paid, 0),
    currency: row.currency,
    poNumber: row.po_number,
    notes: row.notes,
    terms: row.terms,
    voidReason: row.void_reason,
    voidedAt: row.voided_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    createdByName: row.created_by_name,
  };
}

const SELECT_INVOICE = `
  SELECT i.*, c.name AS customer_name, u.name AS created_by_name
    FROM invoices i
    JOIN customers c ON c.id = i.customer_id
    LEFT JOIN users u ON u.id = i.created_by`;

const SORTABLE = ["issue_date", "due_date", "total", "paid_amount", "number", "customer_name"] as const;

invoices.get("/", requireCap("read:invoices"), async (c) => {
  const page = Math.max(1, Number.parseInt(c.req.query("page") ?? "1", 10) || 1);
  const limit = Math.min(200, Math.max(1, Number.parseInt(c.req.query("limit") ?? "25", 10) || 25));
  const offset = (page - 1) * limit;

  const q = (c.req.query("q") ?? "").trim().slice(0, 120).replace(/[%_\\]/g, " ");
  const status = (c.req.query("status") ?? "").trim();
  const customerId = (c.req.query("customerId") ?? "").trim();
  const from = (c.req.query("from") ?? "").trim();
  const to = (c.req.query("to") ?? "").trim();
  const sort = pickSort(c.req.query("sort") ?? undefined, SORTABLE, "issue_date");
  const dir = c.req.query("dir") === "asc" ? "ASC" : "DESC";

  const where: string[] = [];
  const params: (string | number)[] = [];

  if (q) {
    where.push(`(i.number LIKE ? OR c.name LIKE ? OR i.po_number LIKE ?)`);
    const like = `%${q}%`;
    params.push(like, like, like);
  }
  if (customerId) {
    where.push(`i.customer_id = ?`);
    params.push(customerId);
  }
  if (/^\d{4}-\d{2}-\d{2}$/.test(from)) {
    where.push(`i.issue_date >= ?`);
    params.push(from);
  }
  if (/^\d{4}-\d{2}-\d{2}$/.test(to)) {
    where.push(`i.issue_date <= ?`);
    params.push(to);
  }

  // `overdue` is derived, so it becomes a real predicate rather than a stored
  // value: outstanding (sent/partial, not fully paid) and past due.
  if (status === "overdue") {
    where.push(`i.status IN ('sent','partial')`);
    where.push(`i.due_date < date('now')`);
    where.push(`(i.total = 0 OR i.paid_amount < i.total)`);
  } else if (status === "unpaid") {
    where.push(`i.status IN ('sent','partial') AND i.paid_amount < i.total`);
  } else if (["draft", "sent", "partial", "paid", "void"].includes(status)) {
    where.push(`i.status = ?`);
    params.push(status);
  }

  const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";

  const countRow = await c.env.DB.prepare(
    `SELECT COUNT(*) AS n FROM invoices i JOIN customers c ON c.id = i.customer_id ${whereSql}`,
  )
    .bind(...params)
    .first<{ n: number }>();
  const total = countRow?.n ?? 0;

  const orderColumn = sort === "customer_name" ? "c.name" : sort === "number" ? "i.number" : `i.${sort}`;

  const rows = await c.env.DB.prepare(
    `${SELECT_INVOICE} ${whereSql} ORDER BY ${orderColumn} ${dir}, i.id ASC LIMIT ? OFFSET ?`,
  )
    .bind(...params, limit, offset)
    .all<InvoiceRow>();

  return c.json({ data: rows.results.map(serialize), meta: listMeta(page, limit, total) });
});

invoices.get("/:id", requireCap("read:invoices"), async (c) => {
  const row = await c.env.DB.prepare(`${SELECT_INVOICE} WHERE i.id = ?`)
    .bind(c.req.param("id"))
    .first<InvoiceRow>();
  if (!row) throw AppError.notFound("Invoice");

  const [items, payments, waybills, customer] = await Promise.all([
    c.env.DB.prepare(
      `SELECT id, product_id, description, quantity, unit_price, amount, sort_order
         FROM invoice_items WHERE invoice_id = ? ORDER BY sort_order, rowid`,
    )
      .bind(row.id)
      .all(),
    c.env.DB.prepare(
      `SELECT p.id, p.amount, p.method, p.reference, p.paid_at, p.note, p.created_at, u.name AS created_by_name
         FROM payments p LEFT JOIN users u ON u.id = p.created_by
        WHERE p.invoice_id = ? ORDER BY p.paid_at DESC, p.created_at DESC`,
    )
      .bind(row.id)
      .all(),
    c.env.DB.prepare(
      `SELECT id, number, waybill_date, status, carrier, tracking_number FROM waybills WHERE invoice_id = ? ORDER BY waybill_date DESC`,
    )
      .bind(row.id)
      .all(),
    c.env.DB.prepare(
      `SELECT id, name, contact_person, email, phone, address_line1, city, state, rc_number, tax_id, customer_type
         FROM customers WHERE id = ?`,
    )
      .bind(row.customer_id)
      .first(),
  ]);

  return c.json({
    invoice: serialize(row),
    items: (items.results as Array<Record<string, unknown>>).map((r) => ({
      id: r.id,
      productId: r.product_id,
      description: r.description,
      quantity: r.quantity,
      unitPrice: toKoboSafe(Number(r.unit_price)),
      amount: toKoboSafe(Number(r.amount)),
    })),
    payments: (payments.results as Array<Record<string, unknown>>).map((r) => ({
      id: r.id,
      amount: toKoboSafe(Number(r.amount)),
      method: r.method,
      reference: r.reference,
      paidAt: r.paid_at,
      note: r.note,
      createdAt: r.created_at,
      createdByName: r.created_by_name,
    })),
    waybills: (waybills.results as Array<Record<string, unknown>>).map((r) => ({
      id: r.id,
      number: r.number,
      waybillDate: r.waybill_date,
      status: r.status,
      carrier: r.carrier,
      trackingNumber: r.tracking_number,
    })),
    customer: customer
      ? {
          id: (customer as Record<string, unknown>).id,
          name: (customer as Record<string, unknown>).name,
          contactPerson: (customer as Record<string, unknown>).contact_person,
          email: (customer as Record<string, unknown>).email,
          phone: (customer as Record<string, unknown>).phone,
          addressLine1: (customer as Record<string, unknown>).address_line1,
          city: (customer as Record<string, unknown>).city,
          state: (customer as Record<string, unknown>).state,
          rcNumber: (customer as Record<string, unknown>).rc_number,
          taxId: (customer as Record<string, unknown>).tax_id,
          customerType: (customer as Record<string, unknown>).customer_type,
        }
      : null,
  });
});

/** Shared read-back used after every write. */
async function loadInvoice(db: D1Database, id: string): Promise<InvoiceRow> {
  const row = await db.prepare(`${SELECT_INVOICE} WHERE i.id = ?`).bind(id).first<InvoiceRow>();
  if (!row) throw AppError.notFound("Invoice");
  return row;
}

invoices.post("/", requireCap("write:invoices"), async (c) => {
  const input = invoiceSchema.parse(await c.req.json());
  if (input.items.length > MAX_ITEMS) {
    throw AppError.validation(`An invoice can hold at most ${MAX_ITEMS} line items.`, {
      items: `Too many line items (max ${MAX_ITEMS}).`,
    });
  }
  if (input.dueDate < input.issueDate) {
    throw AppError.validation("Due date cannot be before the issue date.", { dueDate: "Must be on or after the issue date." });
  }

  const customer = await c.env.DB.prepare(`SELECT id, name FROM customers WHERE id = ?`)
    .bind(input.customerId)
    .first<{ id: string; name: string }>();
  if (!customer) throw AppError.validation("That customer does not exist.", { customerId: "Unknown customer." });

  const business = await getBusiness(c.env);

  // Tax defaults come from the business profile; an explicit per-invoice value wins.
  const taxEnabled = input.taxEnabled ?? business.taxEnabled;
  const taxRateBp = input.taxRateBp ?? business.taxRateBp;

  const totals = computeInvoiceTotals({
    items: input.items.map((i) => ({ description: i.description, quantity: i.quantity, unitPrice: i.unitPrice })),
    discount: input.discount ?? 0,
    shipping: input.shipping ?? 0,
    taxEnabled,
    taxRateBp,
    paidAmount: 0,
  });

  const id = newId();
  const now = isoNow();
  const user = c.get("user");
  const alloc = allocateNumber(c.env.DB, "invoice", { prefix: business.invoicePrefix, series: business.invoiceSeries }, input.issueDate, "INV");

  const stmts: D1PreparedStatement[] = [
    alloc.ensure,
    c.env.DB.prepare(
      `INSERT INTO invoices
         (id, number, customer_id, issue_date, due_date, status, subtotal, discount,
          tax_enabled, tax_rate_bp, tax_amount, shipping, total, paid_amount, currency,
          po_number, notes, terms, created_by, created_at, updated_at)
       VALUES (?, ${alloc.fragment}, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, ?, ?, ?, ?, ?, ?, ?)`,
    ).bind(
      id,
      ...alloc.fragmentParams,
      input.customerId,
      input.issueDate,
      input.dueDate,
      input.status,
      totals.subtotal,
      totals.discount,
      totals.taxEnabled ? 1 : 0,
      totals.taxRateBp,
      totals.taxAmount,
      totals.shipping,
      totals.total,
      business.currency,
      input.poNumber || null,
      input.notes || business.invoiceNotes || null,
      input.terms || null,
      user.id,
      now,
      now,
    ),
    alloc.bump,
  ];

  input.items.forEach((item, index) => {
    stmts.push(
      c.env.DB.prepare(
        `INSERT INTO invoice_items (id, invoice_id, product_id, description, quantity, unit_price, amount, sort_order)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      ).bind(
        newId(),
        id,
        item.productId || null,
        item.description,
        item.quantity,
        item.unitPrice,
        item.quantity * item.unitPrice,
        index,
      ),
    );
  });

  // A "sent" invoice commits stock; a draft does not.
  if (input.status === "sent") {
    const productItems = await resolveProductQuantities(c.env.DB, input.items);
    stmts.push(
      ...stockStatements(c.env.DB, {
        referenceType: "invoice",
        referenceId: id,
        createdById: user.id,
        movements: productItems.map((p) => ({ ...p, direction: "out" as const })),
      }),
    );
  }

  if (stmts.length > 100) {
    throw AppError.validation(`Too many line items for one save (max ${MAX_ITEMS}).`, { items: "Reduce the number of lines." });
  }

  try {
    await c.env.DB.batch(stmts);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    if (/UNIQUE/i.test(message)) {
      throw AppError.conflict("An invoice with that number already exists. Try again.", { number: "Duplicate invoice number." });
    }
    throw err;
  }

  await writeAudit(c.env, {
    actor: user,
    action: "invoice.create",
    entityType: "invoice",
    entityId: id,
    summary: `${customer.name} · total ${totals.total / 100}`,
    ip: clientIp(c),
  });

  const created = await loadInvoice(c.env.DB, id);
  return c.json({ invoice: serialize(created) }, 201);
});

/**
 * Resolve which invoice lines map to a tracked product, so only real stock lines
 * move inventory. Free-text lines (delivery fee, labour) never touch stock.
 */
async function resolveProductQuantities(
  db: D1Database,
  items: Array<{ productId?: string | null; quantity: number }>,
): Promise<Array<{ productId: string; quantity: number; unitCost: number }>> {
  const ids = [...new Set(items.map((i) => i.productId).filter((v): v is string => Boolean(v)))];
  if (ids.length === 0) return [];

  const tracked = new Set<string>();
  for (const pid of ids) {
    const row = await db
      .prepare(`SELECT id FROM products WHERE id = ? AND track_stock = 1 AND is_active = 1`)
      .bind(pid)
      .first<{ id: string }>();
    if (row) tracked.add(pid);
  }

  const out: Array<{ productId: string; quantity: number; unitCost: number }> = [];
  for (const item of items) {
    if (item.productId && tracked.has(item.productId)) {
      const existing = out.find((o) => o.productId === item.productId);
      if (existing) existing.quantity += item.quantity;
      else out.push({ productId: item.productId, quantity: item.quantity, unitCost: 0 });
    }
  }
  return out;
}

invoices.patch("/:id", requireCap("write:invoices"), async (c) => {
  const id = c.req.param("id");
  const current = await loadInvoice(c.env.DB, id);

  if (current.status === "void") {
    throw AppError.conflict("A voided invoice cannot be edited. Un-void it first.");
  }

  const patch = invoiceUpdateSchema.parse(await c.req.json());
  const user = c.get("user");

  // Items are replaced wholesale when supplied: partial line editing invites
  // duplicates, and an invoice is small enough that a full replace is cheap.
  const existingItems = patch.items
    ? null
    : await c.env.DB.prepare(
        `SELECT product_id, description, quantity, unit_price FROM invoice_items WHERE invoice_id = ?`,
      )
        .bind(id)
        .all<{ product_id: string | null; description: string; quantity: number; unit_price: number }>();

  const items = (patch.items ??
    (existingItems?.results ?? []).map((r) => ({
      productId: r.product_id,
      description: r.description,
      quantity: r.quantity,
      unitPrice: r.unit_price,
    }))) as Array<{ productId?: string | null; description: string; quantity: number; unitPrice: number }>;

  if (items.length === 0) throw AppError.validation("An invoice needs at least one line item.", { items: "Required." });
  if (items.length > MAX_ITEMS) {
    throw AppError.validation(`An invoice can hold at most ${MAX_ITEMS} line items.`, { items: `Too many line items.` });
  }

  const business = await getBusiness(c.env);
  const issueDate = patch.issueDate ?? current.issue_date;
  const dueDate = patch.dueDate ?? current.due_date;
  if (dueDate < issueDate) {
    throw AppError.validation("Due date cannot be before the issue date.", { dueDate: "Must be on or after the issue date." });
  }
  if (patch.customerId) {
    const exists = await c.env.DB.prepare(`SELECT id FROM customers WHERE id = ?`).bind(patch.customerId).first();
    if (!exists) throw AppError.validation("That customer does not exist.", { customerId: "Unknown customer." });
  }

  const taxEnabled = patch.taxEnabled ?? Boolean(current.tax_enabled);
  const taxRateBp = patch.taxRateBp ?? current.tax_rate_bp;

  const totals = computeInvoiceTotals({
    items,
    discount: patch.discount ?? current.discount,
    shipping: patch.shipping ?? current.shipping,
    taxEnabled,
    taxRateBp,
    paidAmount: current.paid_amount,
  });

  // A status change to `void` must carry a reason and reverse stock.
  const nextStatus: InvoiceStatus = patch.status ?? current.status;
  if (patch.status === "void") {
    // Voiding is a distinct, destructive capability: it must not be reachable
    // through the general `write:invoices` edit path, or any staff member could
    // cancel a customer-facing document.
    if (!can(user.role, "void:invoices")) {
      throw AppError.forbidden(`Your role (${user.role}) cannot void invoices.`);
    }
    if (!(patch.voidReason && patch.voidReason.trim())) {
      throw AppError.validation("Give a reason for voiding this invoice.", { voidReason: "Required." });
    }
  }
  if (patch.status && !canTransitionInvoice(current.status, patch.status)) {
    throw AppError.conflict(`Cannot change an invoice from "${current.status}" to "${patch.status}".`);
  }

  const now = isoNow();
  const stmts: D1PreparedStatement[] = [
    c.env.DB.prepare(
      `UPDATE invoices SET
         customer_id = ?, issue_date = ?, due_date = ?, status = ?,
         subtotal = ?, discount = ?, tax_enabled = ?, tax_rate_bp = ?, tax_amount = ?,
         shipping = ?, total = ?, po_number = ?, notes = ?, terms = ?,
         void_reason = ?, voided_at = ?, updated_at = ?
       WHERE id = ?`,
    ).bind(
      patch.customerId ?? current.customer_id,
      issueDate,
      dueDate,
      nextStatus,
      totals.subtotal,
      totals.discount,
      totals.taxEnabled ? 1 : 0,
      totals.taxRateBp,
      totals.taxAmount,
      totals.shipping,
      totals.total,
      patch.poNumber !== undefined ? patch.poNumber || null : current.po_number,
      patch.notes !== undefined ? patch.notes || null : current.notes,
      patch.terms !== undefined ? patch.terms || null : current.terms,
      nextStatus === "void" ? (patch.voidReason ?? null) : null,
      nextStatus === "void" ? now : null,
      now,
      id,
    ),
  ];

  if (patch.items) {
    stmts.push(c.env.DB.prepare(`DELETE FROM invoice_items WHERE invoice_id = ?`).bind(id));
    items.forEach((item, index) => {
      stmts.push(
        c.env.DB.prepare(
          `INSERT INTO invoice_items (id, invoice_id, product_id, description, quantity, unit_price, amount, sort_order)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        ).bind(
          newId(),
          id,
          item.productId || null,
          item.description,
          item.quantity,
          item.unitPrice,
          item.quantity * item.unitPrice,
          index,
        ),
      );
    });
  }

  // Stock reconciliation across the status transition.
  const wasCommitted = current.status === "sent" || current.status === "partial" || current.status === "paid";
  const isCommitted = nextStatus === "sent" || nextStatus === "partial" || nextStatus === "paid";
  if (wasCommitted && !isCommitted) {
    stmts.push(
      ...reversalStatements(c.env.DB, {
        referenceType: "invoice",
        referenceId: id,
        createdById: user.id,
        note: `Invoice ${current.number} ${nextStatus}`,
      }),
    );
  } else if (!wasCommitted && isCommitted) {
    const productItems = await resolveProductQuantities(c.env.DB, items);
    stmts.push(
      ...stockStatements(c.env.DB, {
        referenceType: "invoice",
        referenceId: id,
        createdById: user.id,
        movements: productItems.map((p) => ({ ...p, direction: "out" as const })),
      }),
    );
  } else if (wasCommitted && isCommitted && patch.items) {
    // Items changed while committed: reverse the old effect, then apply the new.
    stmts.push(
      ...reversalStatements(c.env.DB, {
        referenceType: "invoice",
        referenceId: id,
        createdById: user.id,
        note: `Invoice ${current.number} items edited`,
      }),
    );
    const productItems = await resolveProductQuantities(c.env.DB, items);
    stmts.push(
      ...stockStatements(c.env.DB, {
        referenceType: "invoice",
        referenceId: `${id}:edit-${Date.now()}`,
        createdById: user.id,
        movements: productItems.map((p) => ({ ...p, direction: "out" as const })),
      }),
    );
  }

  if (stmts.length > 100) {
    throw AppError.validation(`Too many line items for one save (max ${MAX_ITEMS}).`, { items: "Reduce the number of lines." });
  }

  await c.env.DB.batch(stmts);

  await writeAudit(c.env, {
    actor: user,
    action: patch.status ? `invoice.status.${patch.status}` : "invoice.update",
    entityType: "invoice",
    entityId: id,
    summary: current.number,
    ip: clientIp(c),
  });

  return c.json({ invoice: serialize(await loadInvoice(c.env.DB, id)) });
});

invoices.delete("/:id", requireCap("delete:invoices"), async (c) => {
  const id = c.req.param("id");
  const current = await loadInvoice(c.env.DB, id);

  // Only an un-issued invoice can be destroyed. Anything a customer has seen is
  // voided instead, preserving the audit trail and the number sequence.
  if (current.status !== "draft") {
    throw AppError.conflict("Only draft invoices can be deleted. Void it instead to keep the record.");
  }

  await c.env.DB.batch([
    c.env.DB.prepare(`DELETE FROM invoice_items WHERE invoice_id = ?`).bind(id),
    c.env.DB.prepare(`UPDATE waybills SET invoice_id = NULL WHERE invoice_id = ?`).bind(id),
    c.env.DB.prepare(`DELETE FROM invoices WHERE id = ?`).bind(id),
  ]);

  await writeAudit(c.env, {
    actor: c.get("user"),
    action: "invoice.delete",
    entityType: "invoice",
    entityId: id,
    summary: current.number,
    ip: clientIp(c),
  });

  return c.json({ ok: true });
});

/* ---------------------------------------------------------------- payments */

invoices.post("/:id/payments", requireCap("receive:payments"), async (c) => {
  const id = c.req.param("id");
  const current = await loadInvoice(c.env.DB, id);
  if (current.status === "void") throw AppError.conflict("A voided invoice cannot take payments.");
  if (current.status === "draft") {
    throw AppError.conflict("Mark the invoice as sent before recording a payment.");
  }

  const input = paymentSchema.parse(await c.req.json());
  const balance = Math.max(current.total - current.paid_amount, 0);
  if (input.amount > balance) {
    throw AppError.validation(
      `Payment exceeds the outstanding balance of ${balance / 100}.`,
      { amount: `Balance due is ${balance / 100}.` },
    );
  }

  const newPaid = current.paid_amount + input.amount;
  const newStatus: InvoiceStatus = newPaid >= current.total ? "paid" : "partial";
  const now = isoNow();

  await c.env.DB.batch([
    c.env.DB.prepare(
      `INSERT INTO payments (id, invoice_id, amount, method, reference, paid_at, note, created_by, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    ).bind(
      newId(),
      id,
      input.amount,
      input.method,
      input.reference || null,
      input.paidAt,
      input.note || null,
      c.get("user").id,
      now,
    ),
    c.env.DB.prepare(
      `UPDATE invoices SET paid_amount = ?, status = ?, updated_at = ? WHERE id = ?`,
    ).bind(newPaid, newStatus, now, id),
  ]);

  await writeAudit(c.env, {
    actor: c.get("user"),
    action: "payment.record",
    entityType: "invoice",
    entityId: id,
    summary: `${current.number} · +${input.amount / 100} via ${input.method}`,
    ip: clientIp(c),
  });

  return c.json({ invoice: serialize(await loadInvoice(c.env.DB, id)) }, 201);
});

invoices.delete("/:id/payments/:paymentId", requireCap("delete:payments"), async (c) => {
  const id = c.req.param("id");
  const paymentId = c.req.param("paymentId");

  const payment = await c.env.DB.prepare(
    `SELECT id, amount FROM payments WHERE id = ? AND invoice_id = ?`,
  )
    .bind(paymentId, id)
    .first<{ id: string; amount: number }>();
  if (!payment) throw AppError.notFound("Payment");

  const current = await loadInvoice(c.env.DB, id);
  const newPaid = Math.max(current.paid_amount - payment.amount, 0);
  const newStatus: InvoiceStatus = newPaid <= 0 ? "sent" : newPaid >= current.total ? "paid" : "partial";
  const now = isoNow();

  await c.env.DB.batch([
    c.env.DB.prepare(`DELETE FROM payments WHERE id = ?`).bind(paymentId),
    c.env.DB.prepare(`UPDATE invoices SET paid_amount = ?, status = ?, updated_at = ? WHERE id = ?`).bind(
      newPaid,
      newStatus,
      now,
      id,
    ),
  ]);

  await writeAudit(c.env, {
    actor: c.get("user"),
    action: "payment.delete",
    entityType: "invoice",
    entityId: id,
    summary: `${current.number} · -${payment.amount / 100}`,
    ip: clientIp(c),
  });

  return c.json({ invoice: serialize(await loadInvoice(c.env.DB, id)) });
});

/* --------------------------------------------------------------- documents */

invoices.get("/:id/pdf", requireCap("read:invoices"), async (c) => {
  const row = await loadInvoice(c.env.DB, c.req.param("id"));
  const business = await getBusiness(c.env);

  const [items, customer] = await Promise.all([
    c.env.DB.prepare(
      `SELECT description, quantity, unit_price, amount FROM invoice_items WHERE invoice_id = ? ORDER BY sort_order, rowid`,
    )
      .bind(row.id)
      .all<{ description: string; quantity: number; unit_price: number; amount: number }>(),
    c.env.DB.prepare(
      `SELECT name, contact_person, address_line1, city, state, phone, email, rc_number FROM customers WHERE id = ?`,
    )
      .bind(row.customer_id)
      .first<Record<string, unknown>>(),
  ]);

  const pdf = await renderDocumentPdf({
    kind: "invoice",
    title: row.status === "draft" ? "Proforma Invoice" : "Invoice",
    number: row.number,
    issueDate: row.issue_date,
    dueDate: row.due_date,
    status: displayStatus({
      status: row.status,
      due_date: row.due_date,
      total: row.total,
      paid_amount: row.paid_amount,
    }),
    business,
    counterpartyLabel: "Bill to",
    counterparty: {
      name: String(customer?.name ?? ""),
      contactPerson: (customer?.contact_person as string) ?? null,
      addressLine1: (customer?.address_line1 as string) ?? null,
      city: (customer?.city as string) ?? null,
      state: (customer?.state as string) ?? null,
      phone: (customer?.phone as string) ?? null,
      email: (customer?.email as string) ?? null,
      rcNumber: (customer?.rc_number as string) ?? null,
    },
    lines: items.results.map((i) => ({
      description: i.description,
      quantity: i.quantity,
      unitPrice: i.unit_price,
      amount: i.amount,
    })),
    subtotal: row.subtotal,
    discount: row.discount,
    taxLabel: business.taxLabel,
    taxAmount: row.tax_amount,
    shipping: row.shipping,
    total: row.total,
    paidAmount: row.paid_amount,
    balance: Math.max(row.total - row.paid_amount, 0),
    notes: row.notes,
    terms: row.terms,
    meta: row.po_number ? [["Customer PO", row.po_number]] : [],
  });

  c.header("content-type", "application/pdf");
  c.header("content-disposition", `inline; filename="${pdfFilename("Invoice", row.number)}"`);
  c.header("cache-control", "private, max-age=60");
  return c.body(pdf as unknown as ArrayBuffer);
});

export default invoices;
