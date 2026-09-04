import { Hono } from "hono";
import { supplierSchema } from "../lib/validate.ts";
import { clientIp, requireCap } from "../lib/auth.ts";
import { AppError } from "../lib/errors.ts";
import { isoNow, newId } from "../lib/ids.ts";
import { writeAudit } from "../lib/audit.ts";
import { listMeta } from "../lib/list.ts";
import { toKoboSafe } from "../lib/money.ts";
import type { Env, SessionUser } from "../lib/env.ts";

type AppEnv = { Bindings: Env; Variables: { user: SessionUser; requestId: string } };

const suppliers = new Hono<AppEnv>();

interface SupplierRow {
  id: string;
  name: string;
  contact_person: string | null;
  email: string | null;
  phone: string | null;
  address_line1: string | null;
  city: string | null;
  state: string | null;
  notes: string | null;
  is_active: number;
  created_at: string;
  updated_at: string;
  purchase_count: number;
  last_order_date: string | null;
  spent: number;
  owed: number;
}

function serialize(row: SupplierRow) {
  return {
    id: row.id,
    name: row.name,
    contactPerson: row.contact_person,
    email: row.email,
    phone: row.phone,
    addressLine1: row.address_line1,
    city: row.city,
    state: row.state,
    notes: row.notes,
    isActive: Boolean(row.is_active),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    stats: {
      purchaseCount: row.purchase_count ?? 0,
      lastOrderDate: row.last_order_date ?? null,
      spent: toKoboSafe(row.spent ?? 0),
      owed: toKoboSafe(row.owed ?? 0),
    },
  };
}

const SELECT_SUPPLIER = `
  SELECT s.*,
         COALESCE(p.purchase_count, 0) AS purchase_count,
         p.last_order_date,
         COALESCE(p.spent, 0) AS spent,
         COALESCE(p.owed, 0) AS owed
    FROM suppliers s
    LEFT JOIN (
      SELECT supplier_id, COUNT(*) AS purchase_count, MAX(order_date) AS last_order_date,
             SUM(paid_amount) AS spent,
             SUM(MAX(total - paid_amount, 0)) AS owed
        FROM purchases WHERE status NOT IN ('cancelled','draft') GROUP BY supplier_id
    ) p ON p.supplier_id = s.id`;

suppliers.get("/", requireCap("read:suppliers"), async (c) => {
  const page = Math.max(1, Number.parseInt(c.req.query("page") ?? "1", 10) || 1);
  const limit = Math.min(200, Math.max(1, Number.parseInt(c.req.query("limit") ?? "25", 10) || 25));
  const q = (c.req.query("q") ?? "").trim().slice(0, 120).replace(/[%_\\]/g, " ");

  const where: string[] = [];
  const params: (string | number)[] = [];
  if (q) {
    where.push(`(s.name LIKE ? OR s.email LIKE ? OR s.phone LIKE ?)`);
    const like = `%${q}%`;
    params.push(like, like, like);
  }
  if (c.req.query("active") === "true") where.push(`s.is_active = 1`);
  const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";

  const countRow = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM suppliers s ${whereSql}`)
    .bind(...params)
    .first<{ n: number }>();
  const rows = await c.env.DB.prepare(
    `${SELECT_SUPPLIER} ${whereSql} ORDER BY s.name ASC, s.id ASC LIMIT ? OFFSET ?`,
  )
    .bind(...params, limit, (page - 1) * limit)
    .all<SupplierRow>();

  return c.json({ data: rows.results.map(serialize), meta: listMeta(page, limit, countRow?.n ?? 0) });
});

suppliers.get("/:id", requireCap("read:suppliers"), async (c) => {
  const row = await c.env.DB.prepare(`${SELECT_SUPPLIER} WHERE s.id = ?`)
    .bind(c.req.param("id"))
    .first<SupplierRow>();
  if (!row) throw AppError.notFound("Supplier");

  const purchases = await c.env.DB.prepare(
    `SELECT id, number, order_date, status, total, paid_amount FROM purchases
      WHERE supplier_id = ? ORDER BY order_date DESC LIMIT 20`,
  )
    .bind(row.id)
    .all();

  return c.json({
    supplier: serialize(row),
    purchases: (purchases.results as Array<Record<string, unknown>>).map((p) => ({
      id: p.id,
      number: p.number,
      orderDate: p.order_date,
      status: p.status,
      total: toKoboSafe(Number(p.total)),
      paidAmount: toKoboSafe(Number(p.paid_amount)),
      balance: Math.max(toKoboSafe(Number(p.total)) - toKoboSafe(Number(p.paid_amount)), 0),
    })),
  });
});

suppliers.post("/", requireCap("write:suppliers"), async (c) => {
  const input = supplierSchema.parse(await c.req.json());
  const id = newId();
  const now = isoNow();
  await c.env.DB.prepare(
    `INSERT INTO suppliers (id, name, contact_person, email, phone, address_line1, city, state, notes, is_active, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  )
    .bind(
      id,
      input.name,
      input.contactPerson || null,
      input.email || null,
      input.phone || null,
      input.addressLine1 || null,
      input.city || null,
      input.state || null,
      input.notes || null,
      input.isActive ? 1 : 0,
      now,
      now,
    )
    .run();

  await writeAudit(c.env, {
    actor: c.get("user"),
    action: "supplier.create",
    entityType: "supplier",
    entityId: id,
    summary: input.name,
    ip: clientIp(c),
  });
  return c.json({ id }, 201);
});

suppliers.patch("/:id", requireCap("write:suppliers"), async (c) => {
  const id = c.req.param("id");
  const current = await c.env.DB.prepare(`SELECT * FROM suppliers WHERE id = ?`).bind(id).first<Record<string, unknown>>();
  if (!current) throw AppError.notFound("Supplier");

  const input = supplierSchema.parse({
    name: current.name,
    contactPerson: current.contact_person ?? "",
    email: current.email ?? "",
    phone: current.phone ?? "",
    addressLine1: current.address_line1 ?? "",
    city: current.city ?? "",
    state: current.state ?? "",
    notes: current.notes ?? "",
    isActive: Boolean(current.is_active),
    ...(await c.req.json()),
  });

  await c.env.DB.prepare(
    `UPDATE suppliers SET name = ?, contact_person = ?, email = ?, phone = ?, address_line1 = ?,
       city = ?, state = ?, notes = ?, is_active = ?, updated_at = ? WHERE id = ?`,
  )
    .bind(
      input.name,
      input.contactPerson || null,
      input.email || null,
      input.phone || null,
      input.addressLine1 || null,
      input.city || null,
      input.state || null,
      input.notes || null,
      input.isActive ? 1 : 0,
      isoNow(),
      id,
    )
    .run();

  await writeAudit(c.env, {
    actor: c.get("user"),
    action: "supplier.update",
    entityType: "supplier",
    entityId: id,
    summary: input.name,
    ip: clientIp(c),
  });
  return c.json({ ok: true });
});

suppliers.delete("/:id", requireCap("delete:suppliers"), async (c) => {
  const id = c.req.param("id");
  const current = await c.env.DB.prepare(`SELECT id, name FROM suppliers WHERE id = ?`)
    .bind(id)
    .first<{ id: string; name: string }>();
  if (!current) throw AppError.notFound("Supplier");

  const refs = await c.env.DB.prepare(
    `SELECT (SELECT COUNT(*) FROM purchases WHERE supplier_id = ?) AS purchases,
            (SELECT COUNT(*) FROM expenses WHERE supplier_id = ?) AS expenses`,
  )
    .bind(id, id)
    .first<{ purchases: number; expenses: number }>();

  if ((refs?.purchases ?? 0) + (refs?.expenses ?? 0) > 0) {
    await c.env.DB.prepare(`UPDATE suppliers SET is_active = 0, updated_at = ? WHERE id = ?`)
      .bind(isoNow(), id)
      .run();
    return c.json({ ok: true, archived: true });
  }

  await c.env.DB.prepare(`DELETE FROM suppliers WHERE id = ?`).bind(id).run();
  await writeAudit(c.env, {
    actor: c.get("user"),
    action: "supplier.delete",
    entityType: "supplier",
    entityId: id,
    summary: current.name,
    ip: clientIp(c),
  });
  return c.json({ ok: true, archived: false });
});

export default suppliers;
