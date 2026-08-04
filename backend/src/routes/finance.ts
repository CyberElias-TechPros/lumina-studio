import { Hono } from "hono";
import type { AppEnv } from "../types";
import { z } from "zod";
import { base64UrlDecode, base64UrlEncode, isoNow } from "../lib/crypto";
import { paginate, parsePagination, type Paginated } from "../lib/pagination";
import { requireAuth, requireFinance } from "../lib/auth";
import { ApiError } from "../lib/errors";
import { parseBody } from "../lib/validate";

export interface ApiInvoice {
  id: string;
  party: string;
  amount: number;
  due: string;
  status: string;
}

export interface ApiExpense {
  id: string;
  category: string;
  amount: number;
}

export interface ApiPaymentBatch {
  id: string;
  batch: string;
  amount: number;
  count: number;
  date: string;
  status: string;
}

interface InvoiceRow {
  id: string;
  party: string;
  amount: number;
  due: string;
  status: string;
}

interface ExpenseRow {
  id: string;
  category: string;
  amount: number;
}

interface PaymentBatchRow {
  id: string;
  batch: string;
  amount: number;
  count: number;
  date: string;
  status: string;
}

export const finance = new Hono<{ Bindings: AppEnv }>();

finance.get("/invoices", requireAuth, requireFinance, async (c) => {
  const { cursor, limit } = parsePagination(c);
  const total = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM invoices`).first<{ n: number }>();
  const rows = await c.env.DB.prepare(
    `SELECT id, party, amount, due, status FROM invoices
      ${cursor ? "WHERE id > ?" : ""} ORDER BY id ASC LIMIT ?`,
  )
    .bind(...(cursor ? [base64UrlDecode(cursor) ?? ""] : []), limit)
    .all<InvoiceRow>();
  const items: ApiInvoice[] = rows.results.map((r) => ({ ...r }));
  const result: Paginated<ApiInvoice> = paginate(items, total?.n ?? 0, (last) =>
    base64UrlEncode(last.id),
  );
  return c.json(result);
});

finance.get("/expenses", requireAuth, requireFinance, async (c) => {
  const { cursor, limit } = parsePagination(c);
  const total = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM expenses`).first<{ n: number }>();
  const rows = await c.env.DB.prepare(
    `SELECT id, category, amount FROM expenses
      ${cursor ? "WHERE id > ?" : ""} ORDER BY id ASC LIMIT ?`,
  )
    .bind(...(cursor ? [base64UrlDecode(cursor) ?? ""] : []), limit)
    .all<ExpenseRow>();
  const items: ApiExpense[] = rows.results.map((r) => ({ ...r }));
  const result: Paginated<ApiExpense> = paginate(items, total?.n ?? 0, (last) =>
    base64UrlEncode(last.id),
  );
  return c.json(result);
});

finance.get("/payments", requireAuth, requireFinance, async (c) => {
  const { cursor, limit } = parsePagination(c);
  const total = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM payment_batches`).first<{
    n: number;
  }>();
  const rows = await c.env.DB.prepare(
    `SELECT id, batch, amount, count, date, status FROM payment_batches
      ${cursor ? "WHERE id > ?" : ""} ORDER BY id ASC LIMIT ?`,
  )
    .bind(...(cursor ? [base64UrlDecode(cursor) ?? ""] : []), limit)
    .all<PaymentBatchRow>();
  const items: ApiPaymentBatch[] = rows.results.map((r) => ({ ...r }));
  const result: Paginated<ApiPaymentBatch> = paginate(items, total?.n ?? 0, (last) =>
    base64UrlEncode(last.id),
  );
  return c.json(result);
});

const invoiceActionSchema = z.object({
  status: z.enum(["paid", "refunded", "void"], { message: "Invalid invoice status." }),
});

/** Finance: mark an invoice paid, refunded, or void. */
finance.patch("/invoices/:id", requireAuth, requireFinance, async (c) => {
  const { status } = await parseBody(c, invoiceActionSchema);
  const id = c.req.param("id");
  const row = await c.env.DB.prepare(`SELECT id FROM invoices WHERE id = ?`)
    .bind(id)
    .first<{ id: string }>();
  if (!row) throw ApiError.notFound("Invoice not found.");
  await c.env.DB.prepare(`UPDATE invoices SET status = ? WHERE id = ?`).bind(status, id).run();
  return c.json({ ok: true, id, status });
});

const expenseActionSchema = z.object({
  status: z.enum(["approved", "rejected"], { message: "Invalid expense status." }),
});

/** Finance: approve or reject an expense claim. */
finance.patch("/expenses/:id", requireAuth, requireFinance, async (c) => {
  const { status } = await parseBody(c, expenseActionSchema);
  const id = c.req.param("id");
  const row = await c.env.DB.prepare(`SELECT id FROM expenses WHERE id = ?`)
    .bind(id)
    .first<{ id: string }>();
  if (!row) throw ApiError.notFound("Expense not found.");
  await c.env.DB.prepare(`UPDATE expenses SET status = ? WHERE id = ?`).bind(status, id).run();
  return c.json({ ok: true, id, status });
});

/**
 * Finance/admin: run payroll — applies pending payroll changes (draft →
 * approved → done) and records a payment batch on the run ledger.
 */
finance.post("/payroll/run", requireAuth, requireFinance, async (c) => {
  const pending = await c.env.DB.prepare(
    `SELECT id FROM payroll_changes WHERE status IN ('draft', 'approved') ORDER BY id ASC`,
  ).all<{ id: string }>();
  const processed = pending.results.length;

  let batch: { id: string; batch: string; count: number; date: string; status: string } | null =
    null;
  if (processed > 0) {
    for (const row of pending.results) {
      await c.env.DB.prepare(`UPDATE payroll_changes SET status = 'applied' WHERE id = ?`)
        .bind(row.id)
        .run();
    }
    const now = isoNow();
    batch = {
      id: crypto.randomUUID(),
      batch: `Payroll · ${new Date().toLocaleString("en-GB", { month: "short", year: "numeric" })}`,
      count: processed,
      date: now,
      status: "paid",
    };
    await c.env.DB.prepare(
      `INSERT INTO payment_batches (id, batch, amount, count, date, status, sort_order) VALUES (?, ?, 0, ?, ?, ?, 0)`,
    )
      .bind(batch.id, batch.batch, batch.count, batch.date, batch.status)
      .run();
  }
  return c.json({ ok: true, processed, batch, ranAt: isoNow() });
});
