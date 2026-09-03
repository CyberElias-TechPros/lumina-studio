import { Hono } from "hono";
import { expenseSchema } from "../lib/validate.ts";
import { clientIp, requireCap } from "../lib/auth.ts";
import { AppError } from "../lib/errors.ts";
import { isoNow, newId } from "../lib/ids.ts";
import { writeAudit } from "../lib/audit.ts";
import { listMeta } from "../lib/list.ts";
import { toKoboSafe } from "../lib/money.ts";
import type { Env, SessionUser } from "../lib/env.ts";

type AppEnv = { Bindings: Env; Variables: { user: SessionUser; requestId: string } };

const expenses = new Hono<AppEnv>();

/** Default categories; a business can type any other value. */
export const EXPENSE_CATEGORIES = [
  "transport",
  "logistics",
  "rent",
  "utilities",
  "salaries",
  "tools",
  "repairs",
  "marketing",
  "bank-charges",
  "customs",
  "maintenance",
  "other",
];

expenses.get("/categories", requireCap("read:expenses"), async (c) => {
  const rows = await c.env.DB.prepare(
    `SELECT category, COUNT(*) AS n, SUM(amount) AS total FROM expenses GROUP BY category ORDER BY category`,
  ).all<{ category: string; n: number; total: number }>();

  const used = new Map(rows.results.map((r) => [r.category, { count: r.n, total: toKoboSafe(r.total) }]));
  const categories = [...new Set([...EXPENSE_CATEGORIES, ...used.keys()])].map((name) => ({
    name,
    count: used.get(name)?.count ?? 0,
    total: used.get(name)?.total ?? 0,
  }));
  return c.json({ categories });
});

expenses.get("/", requireCap("read:expenses"), async (c) => {
  const page = Math.max(1, Number.parseInt(c.req.query("page") ?? "1", 10) || 1);
  const limit = Math.min(200, Math.max(1, Number.parseInt(c.req.query("limit") ?? "25", 10) || 25));
  const q = (c.req.query("q") ?? "").trim().slice(0, 120).replace(/[%_\\]/g, " ");
  const category = (c.req.query("category") ?? "").trim();
  const from = (c.req.query("from") ?? "").trim();
  const to = (c.req.query("to") ?? "").trim();

  const where: string[] = [];
  const params: (string | number)[] = [];
  if (q) {
    where.push(`(e.description LIKE ? OR e.reference LIKE ?)`);
    params.push(`%${q}%`, `%${q}%`);
  }
  if (category) {
    where.push(`e.category = ?`);
    params.push(category);
  }
  if (/^\d{4}-\d{2}-\d{2}$/.test(from)) {
    where.push(`e.expense_date >= ?`);
    params.push(from);
  }
  if (/^\d{4}-\d{2}-\d{2}$/.test(to)) {
    where.push(`e.expense_date <= ?`);
    params.push(to);
  }
  const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";

  const countRow = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM expenses e ${whereSql}`)
    .bind(...params)
    .first<{ n: number }>();
  const sumRow = await c.env.DB.prepare(`SELECT COALESCE(SUM(amount),0) AS total FROM expenses e ${whereSql}`)
    .bind(...params)
    .first<{ total: number }>();

  const rows = await c.env.DB.prepare(
    `SELECT e.*, s.name AS supplier_name, u.name AS created_by_name
       FROM expenses e
       LEFT JOIN suppliers s ON s.id = e.supplier_id
       LEFT JOIN users u ON u.id = e.created_by
      ${whereSql}
      ORDER BY e.expense_date DESC, e.rowid DESC LIMIT ? OFFSET ?`,
  )
    .bind(...params, limit, (page - 1) * limit)
    .all<Record<string, unknown>>();

  return c.json({
    data: rows.results.map((r) => ({
      id: r.id,
      expenseDate: r.expense_date,
      category: r.category,
      description: r.description,
      amount: toKoboSafe(Number(r.amount)),
      paymentMethod: r.payment_method,
      reference: r.reference,
      supplierId: r.supplier_id,
      supplierName: r.supplier_name,
      createdByName: r.created_by_name,
      createdAt: r.created_at,
    })),
    meta: listMeta(page, limit, countRow?.n ?? 0),
    totals: { amount: toKoboSafe(sumRow?.total ?? 0) },
  });
});

expenses.post("/", requireCap("write:expenses"), async (c) => {
  const input = expenseSchema.parse(await c.req.json());
  if (input.supplierId) {
    const exists = await c.env.DB.prepare(`SELECT id FROM suppliers WHERE id = ?`).bind(input.supplierId).first();
    if (!exists) throw AppError.validation("That supplier does not exist.", { supplierId: "Unknown supplier." });
  }

  const id = newId();
  await c.env.DB.prepare(
    `INSERT INTO expenses (id, expense_date, category, description, amount, payment_method, reference, supplier_id, created_by, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  )
    .bind(
      id,
      input.expenseDate,
      input.category,
      input.description,
      input.amount,
      input.paymentMethod,
      input.reference || null,
      input.supplierId || null,
      c.get("user").id,
      isoNow(),
    )
    .run();

  await writeAudit(c.env, {
    actor: c.get("user"),
    action: "expense.create",
    entityType: "expense",
    entityId: id,
    summary: `${input.category} · ${input.amount / 100}`,
    ip: clientIp(c),
  });
  return c.json({ id }, 201);
});

expenses.patch("/:id", requireCap("write:expenses"), async (c) => {
  const id = c.req.param("id");
  const current = await c.env.DB.prepare(`SELECT * FROM expenses WHERE id = ?`).bind(id).first<Record<string, unknown>>();
  if (!current) throw AppError.notFound("Expense");

  const input = expenseSchema.parse({
    expenseDate: current.expense_date,
    category: current.category,
    description: current.description,
    amount: Number(current.amount),
    paymentMethod: current.payment_method,
    reference: current.reference ?? "",
    supplierId: current.supplier_id,
    ...(await c.req.json()),
  });

  await c.env.DB.prepare(
    `UPDATE expenses SET expense_date = ?, category = ?, description = ?, amount = ?,
       payment_method = ?, reference = ?, supplier_id = ? WHERE id = ?`,
  )
    .bind(
      input.expenseDate,
      input.category,
      input.description,
      input.amount,
      input.paymentMethod,
      input.reference || null,
      input.supplierId || null,
      id,
    )
    .run();

  await writeAudit(c.env, {
    actor: c.get("user"),
    action: "expense.update",
    entityType: "expense",
    entityId: id,
    summary: input.description,
    ip: clientIp(c),
  });
  return c.json({ ok: true });
});

expenses.delete("/:id", requireCap("delete:expenses"), async (c) => {
  const id = c.req.param("id");
  const current = await c.env.DB.prepare(`SELECT id, description FROM expenses WHERE id = ?`)
    .bind(id)
    .first<{ id: string; description: string }>();
  if (!current) throw AppError.notFound("Expense");

  await c.env.DB.prepare(`DELETE FROM expenses WHERE id = ?`).bind(id).run();
  await writeAudit(c.env, {
    actor: c.get("user"),
    action: "expense.delete",
    entityType: "expense",
    entityId: id,
    summary: current.description,
    ip: clientIp(c),
  });
  return c.json({ ok: true });
});

export default expenses;
