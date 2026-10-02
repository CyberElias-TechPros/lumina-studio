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
  /** Ledger fields (migration 0062) — null on legacy rows. */
  spentOn?: string | null;
  vendor?: string | null;
  description?: string | null;
  method?: string | null;
  proofUrl?: string | null;
  recordedBy?: string | null;
  status?: string;
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
  spent_on: string | null;
  vendor: string | null;
  description: string | null;
  method: string | null;
  proof_url: string | null;
  recorded_by: string | null;
  status: string | null;
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
    `SELECT id, category, amount, spent_on, vendor, description, method, proof_url, recorded_by, status
       FROM expenses
      ${cursor ? "WHERE id > ?" : ""} ORDER BY COALESCE(spent_on, '') DESC, id ASC LIMIT ?`,
  )
    .bind(...(cursor ? [base64UrlDecode(cursor) ?? ""] : []), limit)
    .all<ExpenseRow>();
  const items: ApiExpense[] = rows.results.map((r) => ({
    id: r.id,
    category: r.category,
    amount: r.amount,
    spentOn: r.spent_on,
    vendor: r.vendor,
    description: r.description,
    method: r.method,
    proofUrl: r.proof_url,
    recordedBy: r.recorded_by,
    status: r.status ?? "pending",
  }));
  const result: Paginated<ApiExpense> = paginate(items, total?.n ?? 0, (last) =>
    base64UrlEncode(last.id),
  );
  return c.json(result);
});

const createPaymentBatchSchema = z.object({
  batch: z.string().trim().min(1, "Batch name is required.").max(160),
  amount: z.number().int().min(0).max(100_000_000),
  count: z.number().int().min(1).max(100_000),
  date: z.string().trim().min(1).max(40),
});

/** Finance: register a payment batch for later reconciliation. */
finance.post("/payments", requireAuth, requireFinance, async (c) => {
  const input = await parseBody(c, createPaymentBatchSchema);
  const id = `BATCH-${crypto.randomUUID()}`;
  await c.env.DB.prepare(
    `INSERT INTO payment_batches (id, batch, amount, count, date, status, sort_order) VALUES (?, ?, ?, ?, ?, 'Pending approval', 0)`,
  )
    .bind(id, input.batch, input.amount, input.count, input.date)
    .run();
  return c.json({ batch: { id, ...input, status: "Pending approval" } }, 201);
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

const createInvoiceSchema = z.object({
  party: z.string().trim().min(1, "Customer or learner name is required.").max(160),
  amount: z.number().int().min(1).max(100_000_000),
  due: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Due date must use YYYY-MM-DD format."),
});

/** Finance: create a draft invoice in the receivables ledger. */
finance.post("/invoices", requireAuth, requireFinance, async (c) => {
  const input = await parseBody(c, createInvoiceSchema);
  const id = `INV-${crypto.randomUUID()}`;
  await c.env.DB.prepare(
    `INSERT INTO invoices (id, party, amount, due, status, sort_order) VALUES (?, ?, ?, ?, 'Draft', 0)`,
  )
    .bind(id, input.party, input.amount, input.due)
    .run();
  return c.json({ invoice: { id, ...input, status: "Draft" } }, 201);
});

const invoiceActionSchema = z.object({
  status: z.enum(["sent", "paid", "refunded", "void"], { message: "Invalid invoice status." }),
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

const recordExpenseSchema = z.object({
  spentOn: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD."),
  category: z.string().trim().min(2, "Pick a category.").max(60),
  amount: z.number().int().min(1).max(100_000_000),
  vendor: z.string().trim().max(120).optional(),
  description: z.string().trim().max(300).optional(),
  method: z.enum(["transfer", "cash", "card", "paystack", "other"]).default("transfer"),
  /** R2/Drive link to the receipt photo. */
  proofUrl: z.string().trim().url("Enter a valid link.").max(300).optional(),
});

/** Finance: record money actually spent (the ledger the P&L reads). */
finance.post("/expenses", requireAuth, requireFinance, async (c) => {
  const actor = c.get("authUser");
  const input = await parseBody(c, recordExpenseSchema);
  const id = `EXP-${crypto.randomUUID()}`;
  await c.env.DB.prepare(
    `INSERT INTO expenses (id, category, amount, sort_order, status, spent_on, vendor, description, method, proof_url, recorded_by, created_at)
     VALUES (?, ?, ?, 0, 'approved', ?, ?, ?, ?, ?, ?, ?)`,
  )
    .bind(
      id,
      input.category,
      input.amount,
      input.spentOn,
      input.vendor ?? null,
      input.description ?? null,
      input.method,
      input.proofUrl ?? null,
      actor?.email ?? "finance",
      isoNow(),
    )
    .run();
  return c.json({ ok: true, id }, 201);
});

/**
 * Finance: monthly P&L as CSV — income (confirmed payments) minus recorded
 * expenses, with a category breakdown. Opens straight in Excel/Sheets, and is
 * the report that replaces Wave for a Nigerian business.
 */
finance.get("/pnl.csv", requireAuth, requireFinance, async (c) => {
  // Mounted at the root of /v1 (see src/index.ts), so this is GET /v1/pnl.csv.
  const month = (c.req.query("month") ?? new Date().toISOString().slice(0, 7)).trim();
  if (!/^\d{4}-\d{2}$/.test(month)) throw ApiError.validation({ month: ["Use YYYY-MM."] });
  const from = `${month}-01`;
  const to = `${month}-31`;

  const income = await c.env.DB.prepare(
    `SELECT COALESCE(p.method, 'paystack') AS method, SUM(p.amount) AS total, COUNT(*) AS n
       FROM registration_payments p
      WHERE p.status = 'success' AND p.paid_at >= ? AND p.paid_at <= ?
      GROUP BY COALESCE(p.method, 'paystack')`,
  )
    .bind(`${from}T00:00:00.000Z`, `${to}T23:59:59.999Z`)
    .all<{ method: string; total: number; n: number }>();

  const expenses = await c.env.DB.prepare(
    `SELECT category, SUM(amount) AS total, COUNT(*) AS n
       FROM expenses WHERE spent_on >= ? AND spent_on <= ?
      GROUP BY category ORDER BY total DESC`,
  )
    .bind(from, to)
    .all<{ category: string; total: number; n: number }>();

  const incomeTotal = income.results.reduce((sum, r) => sum + (r.total ?? 0), 0);
  const expenseTotal = expenses.results.reduce((sum, r) => sum + (r.total ?? 0), 0);
  const csvCell = (value: string | number) => {
    const text = String(value);
    return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
  };
  const lines: string[] = [
    `Cyber Elias Academy Ltd — profit & loss, ${month}`,
    "",
    "INCOME (confirmed payments)",
    "Method,Payments,Amount (NGN)",
    ...income.results.map((r) => [csvCell(r.method), r.n, r.total].join(",")),
    ["TOTAL", income.results.reduce((n, r) => n + r.n, 0), incomeTotal].join(","),
    "",
    "EXPENSES",
    "Category,Entries,Amount (NGN)",
    ...expenses.results.map((r) => [csvCell(r.category), r.n, r.total].join(",")),
    ["TOTAL", expenses.results.reduce((n, r) => n + r.n, 0), expenseTotal].join(","),
    "",
    ["NET", "", incomeTotal - expenseTotal].join(","),
  ];
  return new Response(`${lines.join("\n")}\n`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="cea-pnl-${month}.csv"`,
    },
  });
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
