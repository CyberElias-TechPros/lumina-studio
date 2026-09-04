import { Hono } from "hono";
import { purchaseSchema, purchasePaymentSchema } from "../lib/validate.ts";
import { clientIp, requireCap } from "../lib/auth.ts";
import { AppError } from "../lib/errors.ts";
import { isoNow, newId } from "../lib/ids.ts";
import { writeAudit } from "../lib/audit.ts";
import { listMeta } from "../lib/list.ts";
import { allocateNumber } from "../lib/numbering.ts";
import { getBusiness } from "../lib/business.ts";
import { toKoboSafe } from "../lib/money.ts";
import { stockStatements, reversalStatements } from "../lib/stock.ts";
import type { Env, SessionUser } from "../lib/env.ts";

type AppEnv = { Bindings: Env; Variables: { user: SessionUser; requestId: string } };

const purchases = new Hono<AppEnv>();
const MAX_ITEMS = 40;

interface PurchaseRow {
  id: string;
  number: string;
  supplier_id: string | null;
  supplier_name: string | null;
  order_date: string;
  due_date: string | null;
  status: string;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  paid_amount: number;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

function serialize(row: PurchaseRow) {
  const total = toKoboSafe(row.total);
  const paid = toKoboSafe(row.paid_amount);
  return {
    id: row.id,
    number: row.number,
    supplierId: row.supplier_id,
    supplierName: row.supplier_name,
    orderDate: row.order_date,
    dueDate: row.due_date,
    status: row.status,
    subtotal: toKoboSafe(row.subtotal),
    discount: toKoboSafe(row.discount),
    shipping: toKoboSafe(row.shipping),
    total,
    paidAmount: paid,
    balance: Math.max(total - paid, 0),
    notes: row.notes,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

const SELECT_PURCHASE = `
  SELECT p.*, s.name AS supplier_name
    FROM purchases p LEFT JOIN suppliers s ON s.id = p.supplier_id`;

purchases.get("/", requireCap("read:purchases"), async (c) => {
  const page = Math.max(1, Number.parseInt(c.req.query("page") ?? "1", 10) || 1);
  const limit = Math.min(200, Math.max(1, Number.parseInt(c.req.query("limit") ?? "25", 10) || 25));
  const q = (c.req.query("q") ?? "").trim().slice(0, 120).replace(/[%_\\]/g, " ");
  const status = (c.req.query("status") ?? "").trim();

  const where: string[] = [];
  const params: (string | number)[] = [];
  if (q) {
    const like = `%${q}%`;
    where.push(`(p.number LIKE ? OR s.name LIKE ?)`);
    params.push(like, like);
  }
  if (["draft", "ordered", "received", "paid", "cancelled"].includes(status)) {
    where.push(`p.status = ?`);
    params.push(status);
  }
  const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";

  const countRow = await c.env.DB.prepare(
    `SELECT COUNT(*) AS n FROM purchases p LEFT JOIN suppliers s ON s.id = p.supplier_id ${whereSql}`,
  )
    .bind(...params)
    .first<{ n: number }>();

  const rows = await c.env.DB.prepare(
    `${SELECT_PURCHASE} ${whereSql} ORDER BY p.order_date DESC, p.id DESC LIMIT ? OFFSET ?`,
  )
    .bind(...params, limit, (page - 1) * limit)
    .all<PurchaseRow>();

  return c.json({ data: rows.results.map(serialize), meta: listMeta(page, limit, countRow?.n ?? 0) });
});

purchases.get("/:id", requireCap("read:purchases"), async (c) => {
  const row = await c.env.DB.prepare(`${SELECT_PURCHASE} WHERE p.id = ?`)
    .bind(c.req.param("id"))
    .first<PurchaseRow>();
  if (!row) throw AppError.notFound("Purchase order");

  const [items, payments] = await Promise.all([
    c.env.DB.prepare(
      `SELECT id, product_id, description, quantity, unit_cost, amount FROM purchase_items
        WHERE purchase_id = ? ORDER BY sort_order, rowid`,
    )
      .bind(row.id)
      .all(),
    c.env.DB.prepare(
      `SELECT id, amount, method, reference, paid_at, note, created_at FROM purchase_payments
        WHERE purchase_id = ? ORDER BY paid_at DESC`,
    )
      .bind(row.id)
      .all(),
  ]);

  return c.json({
    purchase: serialize(row),
    items: (items.results as Array<Record<string, unknown>>).map((i) => ({
      id: i.id,
      productId: i.product_id,
      description: i.description,
      quantity: i.quantity,
      unitCost: toKoboSafe(Number(i.unit_cost)),
      amount: toKoboSafe(Number(i.amount)),
    })),
    payments: (payments.results as Array<Record<string, unknown>>).map((p) => ({
      id: p.id,
      amount: toKoboSafe(Number(p.amount)),
      method: p.method,
      reference: p.reference,
      paidAt: p.paid_at,
      note: p.note,
      createdAt: p.created_at,
    })),
  });
});

purchases.post("/", requireCap("write:purchases"), async (c) => {
  const input = purchaseSchema.parse(await c.req.json());
  if (input.items.length > MAX_ITEMS) {
    throw AppError.validation(`A purchase order can hold at most ${MAX_ITEMS} lines.`, { items: "Too many lines." });
  }
  if (input.supplierId) {
    const exists = await c.env.DB.prepare(`SELECT id FROM suppliers WHERE id = ?`).bind(input.supplierId).first();
    if (!exists) throw AppError.validation("That supplier does not exist.", { supplierId: "Unknown supplier." });
  }

  const subtotal = input.items.reduce((sum, i) => sum + i.quantity * i.unitCost, 0);
  const discount = Math.min(Math.max(input.discount ?? 0, 0), subtotal);
  const shipping = Math.max(input.shipping ?? 0, 0);
  const total = subtotal - discount + shipping;

  const business = await getBusiness(c.env);
  const id = newId();
  const now = isoNow();
  const user = c.get("user");
  const alloc = allocateNumber(
    c.env.DB,
    "purchase",
    { prefix: business.purchasePrefix, series: business.invoiceSeries },
    input.orderDate,
    "PO",
  );

  const stmts: D1PreparedStatement[] = [
    alloc.ensure,
    c.env.DB.prepare(
      `INSERT INTO purchases
         (id, number, supplier_id, order_date, due_date, status, subtotal, discount, shipping,
          total, paid_amount, notes, created_by, created_at, updated_at)
       VALUES (?, ${alloc.fragment}, ?, ?, ?, ?, ?, ?, ?, ?, 0, ?, ?, ?, ?)`,
    ).bind(
      id,
      ...alloc.fragmentParams,
      input.supplierId || null,
      input.orderDate,
      input.dueDate || null,
      input.status,
      subtotal,
      discount,
      shipping,
      total,
      input.notes || null,
      user.id,
      now,
      now,
    ),
    alloc.bump,
  ];

  input.items.forEach((item, index) => {
    stmts.push(
      c.env.DB.prepare(
        `INSERT INTO purchase_items (id, purchase_id, product_id, description, quantity, unit_cost, amount, sort_order)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      ).bind(
        newId(),
        id,
        item.productId || null,
        item.description,
        item.quantity,
        item.unitCost,
        item.quantity * item.unitCost,
        index,
      ),
    );
  });

  // Receiving goods is what puts stock on the shelf.
  if (input.status === "received") {
    const productLines = await trackedLines(c.env.DB, input.items);
    stmts.push(
      ...stockStatements(c.env.DB, {
        referenceType: "purchase",
        referenceId: id,
        createdById: user.id,
        movements: productLines.map((p) => ({ ...p, direction: "in" as const })),
      }),
    );
  }

  await c.env.DB.batch(stmts);

  await writeAudit(c.env, {
    actor: user,
    action: "purchase.create",
    entityType: "purchase",
    entityId: id,
    summary: `total ${total / 100}`,
    ip: clientIp(c),
  });

  const created = await c.env.DB.prepare(`${SELECT_PURCHASE} WHERE p.id = ?`).bind(id).first<PurchaseRow>();
  return c.json({ purchase: serialize(created!) }, 201);
});

async function trackedLines(
  db: D1Database,
  items: Array<{ productId?: string | null; quantity: number; unitCost: number }>,
): Promise<Array<{ productId: string; quantity: number; unitCost: number }>> {
  const out: Array<{ productId: string; quantity: number; unitCost: number }> = [];
  for (const item of items) {
    if (!item.productId) continue;
    const row = await db
      .prepare(`SELECT id FROM products WHERE id = ? AND track_stock = 1`)
      .bind(item.productId)
      .first<{ id: string }>();
    if (!row) continue;
    const existing = out.find((o) => o.productId === item.productId);
    if (existing) {
      existing.quantity += item.quantity;
      existing.unitCost = item.unitCost;
    } else {
      out.push({ productId: item.productId, quantity: item.quantity, unitCost: item.unitCost });
    }
  }
  return out;
}

purchases.patch("/:id", requireCap("write:purchases"), async (c) => {
  const id = c.req.param("id");
  const current = await c.env.DB.prepare(`${SELECT_PURCHASE} WHERE p.id = ?`).bind(id).first<PurchaseRow>();
  if (!current) throw AppError.notFound("Purchase order");
  if (current.status === "cancelled") throw AppError.conflict("A cancelled order cannot be edited.");

  const raw = (await c.req.json()) as Record<string, unknown>;
  const user = c.get("user");

  const nextStatus = typeof raw.status === "string" ? raw.status : current.status;
  if (!["draft", "ordered", "received", "paid", "cancelled"].includes(nextStatus)) {
    throw AppError.validation("Unknown purchase status.", { status: "Invalid." });
  }

  const items = raw.items
    ? purchaseSchema.shape.items.parse(raw.items)
    : (
        await c.env.DB.prepare(
          `SELECT product_id, description, quantity, unit_cost FROM purchase_items WHERE purchase_id = ?`,
        )
          .bind(id)
          .all<{ product_id: string | null; description: string; quantity: number; unit_cost: number }>()
      ).results.map((r) => ({
        productId: r.product_id,
        description: r.description,
        quantity: r.quantity,
        unitCost: r.unit_cost,
      }));

  if (items.length === 0) throw AppError.validation("A purchase order needs at least one line.", { items: "Required." });
  if (items.length > MAX_ITEMS) throw AppError.validation(`At most ${MAX_ITEMS} lines.`, { items: "Too many lines." });

  const normalised = items.map((i) => ({
    productId: i.productId ?? null,
    description: i.description,
    quantity: i.quantity,
    unitCost: Math.round(i.unitCost),
  }));

  const subtotal = normalised.reduce((sum, i) => sum + i.quantity * i.unitCost, 0);
  const discount = Math.min(Math.max(Number(raw.discount ?? current.discount), 0), subtotal);
  const shipping = Math.max(Number(raw.shipping ?? current.shipping), 0);
  const total = subtotal - discount + shipping;
  const now = isoNow();

  const wasReceived = current.status === "received" || current.status === "paid";
  const isReceived = nextStatus === "received" || nextStatus === "paid";

  const stmts: D1PreparedStatement[] = [
    c.env.DB.prepare(
      `UPDATE purchases SET supplier_id = ?, order_date = ?, due_date = ?, status = ?,
         subtotal = ?, discount = ?, shipping = ?, total = ?, notes = ?, updated_at = ?
       WHERE id = ?`,
    ).bind(
      raw.supplierId !== undefined ? raw.supplierId || null : current.supplier_id,
      typeof raw.orderDate === "string" ? raw.orderDate : current.order_date,
      raw.dueDate !== undefined ? raw.dueDate || null : current.due_date,
      nextStatus,
      subtotal,
      discount,
      shipping,
      total,
      raw.notes !== undefined ? raw.notes || null : current.notes,
      now,
      id,
    ),
  ];

  if (raw.items) {
    stmts.push(c.env.DB.prepare(`DELETE FROM purchase_items WHERE purchase_id = ?`).bind(id));
    normalised.forEach((item, index) => {
      stmts.push(
        c.env.DB.prepare(
          `INSERT INTO purchase_items (id, purchase_id, product_id, description, quantity, unit_cost, amount, sort_order)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        ).bind(
          newId(),
          id,
          item.productId,
          item.description,
          item.quantity,
          item.unitCost,
          item.quantity * item.unitCost,
          index,
        ),
      );
    });
  }

  if (!wasReceived && isReceived) {
    const lines = await trackedLines(c.env.DB, normalised);
    stmts.push(
      ...stockStatements(c.env.DB, {
        referenceType: "purchase",
        referenceId: id,
        createdById: user.id,
        movements: lines.map((p) => ({ ...p, direction: "in" as const })),
      }),
    );
  } else if (wasReceived && !isReceived) {
    stmts.push(
      ...reversalStatements(c.env.DB, {
        referenceType: "purchase",
        referenceId: id,
        createdById: user.id,
        note: `PO ${current.number} ${nextStatus}`,
      }),
    );
  }

  await c.env.DB.batch(stmts);

  await writeAudit(c.env, {
    actor: user,
    action: raw.status ? `purchase.status.${nextStatus}` : "purchase.update",
    entityType: "purchase",
    entityId: id,
    summary: current.number,
    ip: clientIp(c),
  });

  const updated = await c.env.DB.prepare(`${SELECT_PURCHASE} WHERE p.id = ?`).bind(id).first<PurchaseRow>();
  return c.json({ purchase: serialize(updated!) });
});

purchases.post("/:id/payments", requireCap("pay:purchases"), async (c) => {
  const id = c.req.param("id");
  const current = await c.env.DB.prepare(`${SELECT_PURCHASE} WHERE p.id = ?`).bind(id).first<PurchaseRow>();
  if (!current) throw AppError.notFound("Purchase order");

  const input = purchasePaymentSchema.parse(await c.req.json());
  const balance = Math.max(current.total - current.paid_amount, 0);
  if (input.amount > balance) {
    throw AppError.validation(`Payment exceeds the balance of ${balance / 100}.`, { amount: "Too high." });
  }

  const newPaid = current.paid_amount + input.amount;
  const newStatus = newPaid >= current.total ? "paid" : current.status === "draft" ? "ordered" : current.status;
  const now = isoNow();

  await c.env.DB.batch([
    c.env.DB.prepare(
      `INSERT INTO purchase_payments (id, purchase_id, amount, method, reference, paid_at, note, created_by, created_at)
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
    c.env.DB.prepare(`UPDATE purchases SET paid_amount = ?, status = ?, updated_at = ? WHERE id = ?`).bind(
      newPaid,
      newStatus,
      now,
      id,
    ),
  ]);

  await writeAudit(c.env, {
    actor: c.get("user"),
    action: "purchase.payment",
    entityType: "purchase",
    entityId: id,
    summary: `${current.number} · +${input.amount / 100}`,
    ip: clientIp(c),
  });

  const updated = await c.env.DB.prepare(`${SELECT_PURCHASE} WHERE p.id = ?`).bind(id).first<PurchaseRow>();
  return c.json({ purchase: serialize(updated!) }, 201);
});

purchases.delete("/:id", requireCap("delete:purchases"), async (c) => {
  const id = c.req.param("id");
  const current = await c.env.DB.prepare(`${SELECT_PURCHASE} WHERE p.id = ?`).bind(id).first<PurchaseRow>();
  if (!current) throw AppError.notFound("Purchase order");

  if (current.status === "received" || current.status === "paid") {
    throw AppError.conflict("A received order cannot be deleted. Cancel it to reverse the stock.");
  }

  await c.env.DB.batch([
    c.env.DB.prepare(`DELETE FROM purchase_items WHERE purchase_id = ?`).bind(id),
    c.env.DB.prepare(`DELETE FROM purchase_payments WHERE purchase_id = ?`).bind(id),
    c.env.DB.prepare(`DELETE FROM purchases WHERE id = ?`).bind(id),
  ]);

  await writeAudit(c.env, {
    actor: c.get("user"),
    action: "purchase.delete",
    entityType: "purchase",
    entityId: id,
    summary: current.number,
    ip: clientIp(c),
  });
  return c.json({ ok: true });
});

export default purchases;
