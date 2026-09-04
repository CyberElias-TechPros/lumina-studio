import { Hono } from "hono";
import { productSchema, stockAdjustSchema } from "../lib/validate.ts";
import { clientIp, requireCap } from "../lib/auth.ts";
import { AppError } from "../lib/errors.ts";
import { isoNow, newId } from "../lib/ids.ts";
import { writeAudit } from "../lib/audit.ts";
import { listMeta, pickSort } from "../lib/list.ts";
import { toKoboSafe } from "../lib/money.ts";
import type { Env, SessionUser } from "../lib/env.ts";

type AppEnv = { Bindings: Env; Variables: { user: SessionUser; requestId: string } };

const products = new Hono<AppEnv>();

const SORTABLE = ["name", "sku", "quantity", "sale_price", "created_at"] as const;

const SELECT_PRODUCT = `
  SELECT p.*,
         (SELECT COUNT(*) FROM stock_movements m WHERE m.product_id = p.id) AS movement_count
    FROM products p`;

interface ProductRow {
  id: string;
  sku: string;
  name: string;
  description: string | null;
  category: string | null;
  condition_grade: string;
  unit: string;
  cost_price: number;
  sale_price: number;
  quantity: number;
  reorder_level: number;
  track_stock: number;
  is_active: number;
  created_at: string;
  updated_at: string;
  movement_count: number;
}

function serialize(row: ProductRow) {
  const quantity = row.quantity;
  return {
    id: row.id,
    sku: row.sku,
    name: row.name,
    description: row.description,
    category: row.category,
    conditionGrade: row.condition_grade,
    unit: row.unit,
    costPrice: toKoboSafe(row.cost_price),
    salePrice: toKoboSafe(row.sale_price),
    quantity,
    reorderLevel: row.reorder_level,
    trackStock: Boolean(row.track_stock),
    isActive: Boolean(row.is_active),
    // Derived, not stored: `lowStock` cannot go stale the way a flag column would.
    lowStock: Boolean(row.track_stock) && quantity <= row.reorder_level,
    outOfStock: Boolean(row.track_stock) && quantity <= 0,
    stockValue: toKoboSafe(row.cost_price * Math.max(quantity, 0)),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

products.get("/", requireCap("read:products"), async (c) => {
  const page = Math.max(1, Number.parseInt(c.req.query("page") ?? "1", 10) || 1);
  const limit = Math.min(200, Math.max(1, Number.parseInt(c.req.query("limit") ?? "25", 10) || 25));
  const offset = (page - 1) * limit;

  const q = (c.req.query("q") ?? "").trim().slice(0, 120).replace(/[%_\\]/g, " ");
  const category = (c.req.query("category") ?? "").trim();
  const filter = (c.req.query("filter") ?? "").trim();
  const sort = pickSort(c.req.query("sort") ?? undefined, SORTABLE, "created_at");
  const dir = c.req.query("dir") === "asc" ? "ASC" : "DESC";

  const where: string[] = [];
  const params: (string | number)[] = [];

  if (q) {
    where.push(`(p.name LIKE ? OR p.sku LIKE ? OR p.description LIKE ?)`);
    const like = `%${q}%`;
    params.push(like, like, like);
  }
  if (category) {
    where.push(`p.category = ?`);
    params.push(category);
  }
  if (filter === "low") where.push(`p.track_stock = 1 AND p.quantity <= p.reorder_level`);
  if (filter === "out") where.push(`p.track_stock = 1 AND p.quantity <= 0`);
  if (filter === "active") where.push(`p.is_active = 1`);

  const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";
  const countRow = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM products p ${whereSql}`)
    .bind(...params)
    .first<{ n: number }>();

  const rows = await c.env.DB.prepare(
    `${SELECT_PRODUCT} ${whereSql} ORDER BY p.${sort} ${dir}, p.id ASC LIMIT ? OFFSET ?`,
  )
    .bind(...params, limit, offset)
    .all<ProductRow>();

  return c.json({ data: rows.results.map(serialize), meta: listMeta(page, limit, countRow?.n ?? 0) });
});

/** Category list for the filter dropdown, straight from the data. */
products.get("/categories", requireCap("read:products"), async (c) => {
  const rows = await c.env.DB.prepare(
    `SELECT category, COUNT(*) AS n FROM products WHERE category IS NOT NULL AND category != ''
      GROUP BY category ORDER BY category`,
  ).all<{ category: string; n: number }>();
  return c.json({ categories: rows.results });
});

products.get("/:id", requireCap("read:products"), async (c) => {
  const row = await c.env.DB.prepare(`${SELECT_PRODUCT} WHERE p.id = ?`)
    .bind(c.req.param("id"))
    .first<ProductRow>();
  if (!row) throw AppError.notFound("Product");

  const movements = await c.env.DB.prepare(
    `SELECT m.id, m.direction, m.quantity, m.unit_cost, m.reference_type, m.reference_id, m.note, m.created_at,
            u.name AS created_by_name
       FROM stock_movements m LEFT JOIN users u ON u.id = m.created_by
      WHERE m.product_id = ? ORDER BY m.created_at DESC, m.rowid DESC LIMIT 50`,
  )
    .bind(row.id)
    .all();

  return c.json({
    product: serialize(row),
    movements: (movements.results as Array<Record<string, unknown>>).map((m) => ({
      id: m.id,
      direction: m.direction,
      quantity: m.quantity,
      unitCost: toKoboSafe(Number(m.unit_cost ?? 0)),
      referenceType: m.reference_type,
      referenceId: m.reference_id,
      note: m.note,
      createdAt: m.created_at,
      createdByName: m.created_by_name,
    })),
  });
});

products.post("/", requireCap("write:products"), async (c) => {
  const input = productSchema.parse(await c.req.json());

  const dupe = await c.env.DB.prepare(`SELECT id FROM products WHERE sku = ?`).bind(input.sku).first();
  if (dupe) throw AppError.conflict(`SKU "${input.sku}" is already in use.`, { sku: "Already exists." });

  const id = newId();
  const now = isoNow();

  await c.env.DB.prepare(
    `INSERT INTO products
       (id, sku, name, description, category, condition_grade, unit, cost_price, sale_price,
        quantity, reorder_level, track_stock, is_active, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  )
    .bind(
      id,
      input.sku,
      input.name,
      input.description || null,
      input.category || null,
      input.conditionGrade,
      input.unit || "unit",
      input.costPrice,
      input.salePrice,
      input.quantity,
      input.reorderLevel,
      input.trackStock ? 1 : 0,
      input.isActive ? 1 : 0,
      now,
      now,
    )
    .run();

  // Opening stock is itself a ledger entry, so the history starts complete.
  if (input.trackStock && input.quantity > 0) {
    await c.env.DB.prepare(
      `INSERT INTO stock_movements
         (id, product_id, direction, quantity, unit_cost, reference_type, reference_id, note, created_by, created_at)
       VALUES (?, ?, 'in', ?, ?, 'manual', ?, 'Opening stock', ?, ?)`,
    )
      .bind(newId(), id, input.quantity, input.costPrice, id, c.get("user").id, now)
      .run();
  }

  await writeAudit(c.env, {
    actor: c.get("user"),
    action: "product.create",
    entityType: "product",
    entityId: id,
    summary: `${input.sku} · ${input.name}`,
    ip: clientIp(c),
  });

  return c.json({ id }, 201);
});

products.patch("/:id", requireCap("write:products"), async (c) => {
  const id = c.req.param("id");
  const current = await c.env.DB.prepare(`SELECT * FROM products WHERE id = ?`).bind(id).first<ProductRow>();
  if (!current) throw AppError.notFound("Product");

  const raw = (await c.req.json()) as Record<string, unknown>;
  const merged = {
    sku: current.sku,
    name: current.name,
    description: current.description ?? "",
    category: current.category ?? "",
    conditionGrade: current.condition_grade,
    unit: current.unit,
    costPrice: current.cost_price,
    salePrice: current.sale_price,
    quantity: current.quantity,
    reorderLevel: current.reorder_level,
    trackStock: Boolean(current.track_stock),
    isActive: Boolean(current.is_active),
    ...raw,
  };
  const input = productSchema.parse(merged);

  if (input.sku !== current.sku) {
    const dupe = await c.env.DB.prepare(`SELECT id FROM products WHERE sku = ? AND id != ?`)
      .bind(input.sku, id)
      .first();
    if (dupe) throw AppError.conflict(`SKU "${input.sku}" is already in use.`, { sku: "Already exists." });
  }

  // Editing `quantity` directly is a stock adjustment, so it must also be
  // written to the ledger or the history would contradict the balance — and it
  // must obey the same floor as the dedicated /stock endpoint, otherwise a cut
  // below zero could be smuggled through a generic edit.
  if (input.quantity < 0) {
    throw AppError.validation("Quantity cannot be negative.", { quantity: "Must be 0 or more." });
  }
  if (Boolean(current.track_stock) && !input.trackStock) {
    // Turning tracking off is allowed; turning it on with a negative figure is not.
    if (input.quantity < 0) throw AppError.validation("Quantity cannot be negative.", { quantity: "Invalid." });
  }
  const quantityChanged = input.quantity !== current.quantity;
  const delta = input.quantity - current.quantity;

  const stmts: D1PreparedStatement[] = [
    c.env.DB.prepare(
      `UPDATE products SET sku = ?, name = ?, description = ?, category = ?, condition_grade = ?,
         unit = ?, cost_price = ?, sale_price = ?, quantity = ?, reorder_level = ?,
         track_stock = ?, is_active = ?, updated_at = ?
       WHERE id = ?`,
    ).bind(
      input.sku,
      input.name,
      input.description || null,
      input.category || null,
      input.conditionGrade,
      input.unit || "unit",
      input.costPrice,
      input.salePrice,
      input.quantity,
      input.reorderLevel,
      input.trackStock ? 1 : 0,
      input.isActive ? 1 : 0,
      isoNow(),
      id,
    ),
  ];

  if (quantityChanged && delta !== 0) {
    stmts.push(
      c.env.DB.prepare(
        `INSERT INTO stock_movements
           (id, product_id, direction, quantity, unit_cost, reference_type, reference_id, note, created_by, created_at)
         VALUES (?, ?, ?, ?, ?, 'manual', ?, 'Corrected via product edit', ?, ?)`,
      ).bind(
        newId(),
        id,
        delta > 0 ? "in" : "out",
        Math.abs(delta),
        input.costPrice,
        id,
        c.get("user").id,
        isoNow(),
      ),
    );
  }

  await c.env.DB.batch(stmts);

  await writeAudit(c.env, {
    actor: c.get("user"),
    action: "product.update",
    entityType: "product",
    entityId: id,
    summary: `${input.sku}${quantityChanged ? ` · qty ${current.quantity} → ${input.quantity}` : ""}`,
    ip: clientIp(c),
  });

  return c.json({ ok: true });
});

/** Explicit stock in/out, e.g. goods received without a purchase order. */
products.post("/:id/stock", requireCap("adjust:stock"), async (c) => {
  const id = c.req.param("id");
  const current = await c.env.DB.prepare(`SELECT * FROM products WHERE id = ?`).bind(id).first<ProductRow>();
  if (!current) throw AppError.notFound("Product");
  if (!current.track_stock) {
    throw AppError.conflict("Stock tracking is off for this product.");
  }

  const input = stockAdjustSchema.parse(await c.req.json());
  if (input.direction === "out" && input.quantity > current.quantity) {
    throw AppError.validation(`Only ${current.quantity} in stock.`, { quantity: "Exceeds available stock." });
  }

  const now = isoNow();
  const newQuantity =
    input.direction === "in"
      ? current.quantity + input.quantity
      : input.direction === "out"
        ? Math.max(0, current.quantity - input.quantity)
        : input.quantity;

  // An `adjust` records the movement needed to reach the new figure, so the
  // ledger still explains the balance.
  const movementQty = Math.abs(newQuantity - current.quantity);

  const stmts: D1PreparedStatement[] = [];
  if (movementQty > 0) {
    stmts.push(
      c.env.DB.prepare(
        `INSERT INTO stock_movements
           (id, product_id, direction, quantity, unit_cost, reference_type, reference_id, note, created_by, created_at)
         VALUES (?, ?, ?, ?, ?, 'manual', ?, ?, ?, ?)`,
      ).bind(
        newId(),
        id,
        newQuantity > current.quantity ? "in" : "out",
        movementQty,
        input.unitCost ?? current.cost_price,
        id,
        input.note || "Manual adjustment",
        c.get("user").id,
        now,
      ),
    );
  }
  stmts.push(
    c.env.DB.prepare(`UPDATE products SET quantity = ?, updated_at = ? WHERE id = ?`).bind(newQuantity, now, id),
  );

  await c.env.DB.batch(stmts);

  await writeAudit(c.env, {
    actor: c.get("user"),
    action: "stock.adjust",
    entityType: "product",
    entityId: id,
    summary: `${current.sku} · ${current.quantity} → ${newQuantity}`,
    ip: clientIp(c),
  });

  return c.json({ quantity: newQuantity });
});

products.delete("/:id", requireCap("delete:products"), async (c) => {
  const id = c.req.param("id");
  const current = await c.env.DB.prepare(`SELECT id, sku, name FROM products WHERE id = ?`)
    .bind(id)
    .first<{ id: string; sku: string; name: string }>();
  if (!current) throw AppError.notFound("Product");

  // A product referenced by invoices, purchases or waybills is deactivated, not
  // destroyed — those rows keep their description and the FK stays intact.
  const refs = await c.env.DB.prepare(
    `SELECT
       (SELECT COUNT(*) FROM invoice_items WHERE product_id = ?) AS invoices,
       (SELECT COUNT(*) FROM purchase_items WHERE product_id = ?) AS purchases,
       (SELECT COUNT(*) FROM waybill_items WHERE product_id = ?) AS waybills`,
  )
    .bind(id, id, id)
    .first<{ invoices: number; purchases: number; waybills: number }>();

  const referenced = (refs?.invoices ?? 0) + (refs?.purchases ?? 0) + (refs?.waybills ?? 0);
  if (referenced > 0) {
    await c.env.DB.prepare(`UPDATE products SET is_active = 0, updated_at = ? WHERE id = ?`)
      .bind(isoNow(), id)
      .run();
    await writeAudit(c.env, {
      actor: c.get("user"),
      action: "product.archive",
      entityType: "product",
      entityId: id,
      summary: `${current.sku} archived (${referenced} linked records)`,
      ip: clientIp(c),
    });
    return c.json({ ok: true, archived: true, referenced });
  }

  await c.env.DB.batch([
    c.env.DB.prepare(`DELETE FROM stock_movements WHERE product_id = ?`).bind(id),
    c.env.DB.prepare(`DELETE FROM products WHERE id = ?`).bind(id),
  ]);

  await writeAudit(c.env, {
    actor: c.get("user"),
    action: "product.delete",
    entityType: "product",
    entityId: id,
    summary: current.sku,
    ip: clientIp(c),
  });
  return c.json({ ok: true, archived: false });
});

export default products;
