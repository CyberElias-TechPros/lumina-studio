import { Hono } from "hono";
import type { AppEnv } from "../types";
import { base64UrlDecode, base64UrlEncode } from "../lib/crypto";
import { paginate, parsePagination, type Paginated } from "../lib/pagination";
import { requireAuth, requireFinance } from "../lib/auth";

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

export const finance = new Hono<{ Bindings: AppEnv }>();

finance.get("/invoices", requireAuth, requireFinance, async (c) => {
  const { cursor, limit } = parsePagination(c);
  const total = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM invoices`)
    .first<{ n: number }>();
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
  const total = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM expenses`)
    .first<{ n: number }>();
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
