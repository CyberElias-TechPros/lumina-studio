import { Hono } from "hono";
import { reportsQuerySchema } from "../lib/validate.ts";
import { requireCap } from "../lib/auth.ts";
import { AppError } from "../lib/errors.ts";
import { toKoboSafe } from "../lib/money.ts";
import { getBusiness } from "../lib/business.ts";
import { csvCell } from "./customers.ts";
import type { Env, SessionUser } from "../lib/env.ts";

type AppEnv = { Bindings: Env; Variables: { user: SessionUser; requestId: string } };

const reports = new Hono<AppEnv>();

function range(c: ContextLike): { from: string; to: string } {
  const parsed = reportsQuerySchema.parse({ from: c.req.query("from"), to: c.req.query("to") });
  if (parsed.to < parsed.from) {
    throw AppError.validation("The end date is before the start date.", { to: "Must be on or after the start date." });
  }
  return parsed;
}

type ContextLike = { req: { query: (key: string) => string | undefined } };

/**
 * Profit & loss for a period.
 *
 * COGS is derived from the stock ledger for units sold in the window rather than
 * from a stored cost on the invoice line, so restating historic margins stays
 * possible. Where a sold line has no product link, its cost is reported as
 * unknown instead of being silently treated as zero.
 */
reports.get("/profit-loss", requireCap("read:reports"), async (c) => {
  const { from, to } = range(c);
  const business = await getBusiness(c.env);

  const [revenue, collections, cogs, expenses, discounts] = await Promise.all([
    c.env.DB.prepare(
      `SELECT COALESCE(SUM(total), 0) AS billed, COALESCE(SUM(subtotal), 0) AS subtotal,
              COALESCE(SUM(tax_amount), 0) AS tax, COALESCE(SUM(shipping), 0) AS shipping,
              COUNT(*) AS invoice_count
         FROM invoices WHERE status != 'void' AND issue_date BETWEEN ? AND ?`,
    )
      .bind(from, to)
      .first<Record<string, number>>(),
    c.env.DB.prepare(`SELECT COALESCE(SUM(amount), 0) AS collected FROM payments WHERE paid_at BETWEEN ? AND ?`)
      .bind(from, to)
      .first<{ collected: number }>(),
    c.env.DB.prepare(
      `SELECT COALESCE(SUM(m.quantity * COALESCE(p.cost_price, 0)), 0) AS cogs,
              COALESCE(SUM(CASE WHEN p.id IS NULL THEN 1 ELSE 0 END), 0) AS unmapped_lines
         FROM stock_movements m
         LEFT JOIN products p ON p.id = m.product_id
        WHERE m.direction = 'out' AND m.reference_type = 'invoice'
          AND date(m.created_at) BETWEEN ? AND ?`,
    )
      .bind(from, to)
      .first<{ cogs: number; unmapped_lines: number }>(),
    c.env.DB.prepare(
      `SELECT COALESCE(SUM(amount), 0) AS total, COUNT(*) AS n FROM expenses WHERE expense_date BETWEEN ? AND ?`,
    )
      .bind(from, to)
      .first<{ total: number; n: number }>(),
    c.env.DB.prepare(
      `SELECT COALESCE(SUM(discount), 0) AS total FROM invoices WHERE status != 'void' AND issue_date BETWEEN ? AND ?`,
    )
      .bind(from, to)
      .first<{ total: number }>(),
  ]);

  const billed = toKoboSafe(revenue?.billed ?? 0);
  const cogsValue = toKoboSafe(cogs?.cogs ?? 0);
  const opex = toKoboSafe(expenses?.total ?? 0);
  const grossProfit = billed - cogsValue;
  const netProfit = grossProfit - opex;

  return c.json({
    period: { from, to },
    currency: business.currency,
    currencySymbol: business.currencySymbol,
    revenue: {
      billed,
      subtotal: toKoboSafe(revenue?.subtotal ?? 0),
      tax: toKoboSafe(revenue?.tax ?? 0),
      shipping: toKoboSafe(revenue?.shipping ?? 0),
      discountsGiven: toKoboSafe(discounts?.total ?? 0),
      invoiceCount: revenue?.invoice_count ?? 0,
      collected: toKoboSafe(collections?.collected ?? 0),
    },
    costs: {
      cogs: cogsValue,
      operatingExpenses: opex,
      expenseCount: expenses?.n ?? 0,
      unmappedCostLines: cogs?.unmapped_lines ?? 0,
    },
    result: {
      grossProfit,
      grossMarginBp: billed > 0 ? Math.round((grossProfit / billed) * 10_000) : 0,
      netProfit,
      netMarginBp: billed > 0 ? Math.round((netProfit / billed) * 10_000) : 0,
    },
  });
});

/** Monthly revenue/collections series, for the dashboard chart. */
reports.get("/monthly", requireCap("read:reports"), async (c) => {
  const { from, to } = range(c);
  const rows = await c.env.DB.prepare(
    `SELECT strftime('%Y-%m', issue_date) AS month,
            COALESCE(SUM(total), 0) AS billed,
            COUNT(*) AS invoices
       FROM invoices WHERE status != 'void' AND issue_date BETWEEN ? AND ?
      GROUP BY month ORDER BY month`,
  )
    .bind(from, to)
    .all<{ month: string; billed: number; invoices: number }>();

  const paid = await c.env.DB.prepare(
    `SELECT strftime('%Y-%m', paid_at) AS month, COALESCE(SUM(amount), 0) AS collected
       FROM payments WHERE paid_at BETWEEN ? AND ? GROUP BY month`,
  )
    .bind(from, to)
    .all<{ month: string; collected: number }>();
  const paidMap = new Map(paid.results.map((r) => [r.month, r.collected]));

  const spent = await c.env.DB.prepare(
    `SELECT strftime('%Y-%m', expense_date) AS month, COALESCE(SUM(amount), 0) AS spent
       FROM expenses WHERE expense_date BETWEEN ? AND ? GROUP BY month`,
  )
    .bind(from, to)
    .all<{ month: string; spent: number }>();
  const spentMap = new Map(spent.results.map((r) => [r.month, r.spent]));

  const months = [...new Set([...rows.results.map((r) => r.month), ...paidMap.keys(), ...spentMap.keys()])].sort();

  return c.json({
    series: months.map((month) => {
      const row = rows.results.find((r) => r.month === month);
      return {
        month,
        billed: toKoboSafe(row?.billed ?? 0),
        collected: toKoboSafe(paidMap.get(month) ?? 0),
        expenses: toKoboSafe(spentMap.get(month) ?? 0),
        invoices: row?.invoices ?? 0,
      };
    }),
  });
});

/** Receivables ageing buckets — the single most important cash-control view. */
reports.get("/receivables", requireCap("read:reports"), async (c) => {
  const rows = await c.env.DB.prepare(
    `SELECT c.id, c.name,
            COALESCE(SUM(CASE WHEN julianday('now') - julianday(i.due_date) <= 0  THEN bal ELSE 0 END), 0) AS current_bucket,
            COALESCE(SUM(CASE WHEN julianday('now') - julianday(i.due_date) BETWEEN 1 AND 30 THEN bal ELSE 0 END), 0) AS d1_30,
            COALESCE(SUM(CASE WHEN julianday('now') - julianday(i.due_date) BETWEEN 31 AND 60 THEN bal ELSE 0 END), 0) AS d31_60,
            COALESCE(SUM(CASE WHEN julianday('now') - julianday(i.due_date) BETWEEN 61 AND 90 THEN bal ELSE 0 END), 0) AS d61_90,
            COALESCE(SUM(CASE WHEN julianday('now') - julianday(i.due_date) > 90 THEN bal ELSE 0 END), 0) AS d90_plus,
            COALESCE(SUM(bal), 0) AS total
       FROM (
         SELECT customer_id, due_date, MAX(total - paid_amount, 0) AS bal
           FROM invoices
          WHERE status IN ('sent','partial') AND paid_amount < total
       ) i
       JOIN customers c ON c.id = i.customer_id
      GROUP BY c.id, c.name
      HAVING total > 0
      ORDER BY total DESC`,
  ).all<Record<string, number | string>>();

  const data = rows.results.map((r) => ({
    customerId: r.id,
    customerName: r.name,
    current: toKoboSafe(Number(r.current_bucket)),
    days1to30: toKoboSafe(Number(r.d1_30)),
    days31to60: toKoboSafe(Number(r.d31_60)),
    days61to90: toKoboSafe(Number(r.d61_90)),
    over90: toKoboSafe(Number(r.d90_plus)),
    total: toKoboSafe(Number(r.total)),
  }));

  const totals = data.reduce(
    (acc, r) => ({
      current: acc.current + r.current,
      days1to30: acc.days1to30 + r.days1to30,
      days31to60: acc.days31to60 + r.days31to60,
      days61to90: acc.days61to90 + r.days61to90,
      over90: acc.over90 + r.over90,
      total: acc.total + r.total,
    }),
    { current: 0, days1to30: 0, days31to60: 0, days61to90: 0, over90: 0, total: 0 },
  );

  return c.json({ rows: data, totals });
});

reports.get("/top-customers", requireCap("read:reports"), async (c) => {
  const { from, to } = range(c);
  const rows = await c.env.DB.prepare(
    `SELECT c.id, c.name, COUNT(i.id) AS invoices,
            COALESCE(SUM(i.total), 0) AS billed,
            COALESCE(SUM(i.paid_amount), 0) AS paid
       FROM customers c
       JOIN invoices i ON i.customer_id = c.id AND i.status != 'void' AND i.issue_date BETWEEN ? AND ?
      GROUP BY c.id, c.name
      ORDER BY billed DESC LIMIT 20`,
  )
    .bind(from, to)
    .all<{ id: string; name: string; invoices: number; billed: number; paid: number }>();

  return c.json({
    rows: rows.results.map((r) => ({
      customerId: r.id,
      customerName: r.name,
      invoices: r.invoices,
      billed: toKoboSafe(r.billed),
      paid: toKoboSafe(r.paid),
      outstanding: Math.max(toKoboSafe(r.billed) - toKoboSafe(r.paid), 0),
    })),
  });
});

reports.get("/expenses", requireCap("read:reports"), async (c) => {
  const { from, to } = range(c);
  const rows = await c.env.DB.prepare(
    `SELECT category, COUNT(*) AS n, COALESCE(SUM(amount), 0) AS total
       FROM expenses WHERE expense_date BETWEEN ? AND ?
      GROUP BY category ORDER BY total DESC`,
  )
    .bind(from, to)
    .all<{ category: string; n: number; total: number }>();

  const total = rows.results.reduce((sum, r) => sum + r.total, 0);
  return c.json({
    rows: rows.results.map((r) => ({
      category: r.category,
      count: r.n,
      total: toKoboSafe(r.total),
      shareBp: total > 0 ? Math.round((r.total / total) * 10_000) : 0,
    })),
    total: toKoboSafe(total),
  });
});

/** Stock on hand with valuation and a slow-mover signal. */
reports.get("/stock", requireCap("read:reports"), async (c) => {
  const rows = await c.env.DB.prepare(
    `SELECT p.id, p.sku, p.name, p.category, p.condition_grade, p.quantity, p.reorder_level,
            p.cost_price, p.sale_price,
            (SELECT MAX(date(created_at)) FROM stock_movements m
              WHERE m.product_id = p.id AND m.direction = 'out' AND m.reference_type = 'invoice') AS last_sold
       FROM products p WHERE p.is_active = 1
      ORDER BY (p.cost_price * MAX(p.quantity, 0)) DESC`,
  ).all<Record<string, unknown>>();

  const data = rows.results.map((r) => {
    const quantity = Number(r.quantity ?? 0);
    const cost = Number(r.cost_price ?? 0);
    const sale = Number(r.sale_price ?? 0);
    return {
      id: r.id,
      sku: r.sku,
      name: r.name,
      category: r.category,
      conditionGrade: r.condition_grade,
      quantity,
      reorderLevel: Number(r.reorder_level ?? 0),
      unitCost: toKoboSafe(cost),
      unitPrice: toKoboSafe(sale),
      stockValue: toKoboSafe(cost * Math.max(quantity, 0)),
      potentialRevenue: toKoboSafe(sale * Math.max(quantity, 0)),
      lastSold: r.last_sold ?? null,
    };
  });

  return c.json({
    rows: data,
    totals: {
      stockValue: toKoboSafe(data.reduce((s, r) => s + r.stockValue, 0)),
      potentialRevenue: toKoboSafe(data.reduce((s, r) => s + r.potentialRevenue, 0)),
      units: data.reduce((s, r) => s + Math.max(r.quantity, 0), 0),
    },
  });
});

/** Waybill performance: throughput and exceptions by carrier. */
reports.get("/logistics", requireCap("read:reports"), async (c) => {
  const { from, to } = range(c);
  const rows = await c.env.DB.prepare(
    `SELECT COALESCE(NULLIF(carrier, ''), 'Unassigned') AS carrier,
            COUNT(*) AS shipments,
            COALESCE(SUM(CASE WHEN status = 'delivered' THEN 1 ELSE 0 END), 0) AS delivered,
            COALESCE(SUM(CASE WHEN status = 'in_transit' THEN 1 ELSE 0 END), 0) AS in_transit,
            COALESCE(SUM(CASE WHEN status = 'exception' THEN 1 ELSE 0 END), 0) AS exceptions,
            COALESCE(SUM(charges), 0) AS charges,
            AVG(CASE WHEN delivered_at IS NOT NULL
                     THEN julianday(delivered_at) - julianday(waybill_date) END) AS avg_days
       FROM waybills WHERE waybill_date BETWEEN ? AND ?
      GROUP BY carrier ORDER BY shipments DESC`,
  )
    .bind(from, to)
    .all<Record<string, unknown>>();

  return c.json({
    rows: rows.results.map((r) => ({
      carrier: r.carrier,
      shipments: Number(r.shipments ?? 0),
      delivered: Number(r.delivered ?? 0),
      inTransit: Number(r.in_transit ?? 0),
      exceptions: Number(r.exceptions ?? 0),
      charges: toKoboSafe(Number(r.charges ?? 0)),
      avgDeliveryDays: r.avg_days === null ? null : Math.round(Number(r.avg_days) * 10) / 10,
    })),
  });
});

/** CSV of every invoice in a period, for the accountant. */
reports.get("/invoices.csv", requireCap("export:data"), async (c) => {
  const { from, to } = range(c);
  const rows = await c.env.DB.prepare(
    `SELECT i.number, i.issue_date, i.due_date, i.status, c.name AS customer,
            i.subtotal, i.discount, i.tax_amount, i.shipping, i.total, i.paid_amount
       FROM invoices i JOIN customers c ON c.id = i.customer_id
      WHERE i.issue_date BETWEEN ? AND ?
      ORDER BY i.issue_date DESC, i.number DESC`,
  )
    .bind(from, to)
    .all<Record<string, unknown>>();

  const lines = [
    [
      "Invoice", "Issue date", "Due date", "Status", "Customer",
      "Subtotal", "Discount", "Tax", "Shipping", "Total", "Paid", "Balance",
    ].join(","),
  ];
  for (const r of rows.results) {
    const total = Number(r.total ?? 0);
    const paid = Number(r.paid_amount ?? 0);
    lines.push(
      [
        r.number, r.issue_date, r.due_date, r.status, r.customer,
        (Number(r.subtotal ?? 0) / 100).toFixed(2),
        (Number(r.discount ?? 0) / 100).toFixed(2),
        (Number(r.tax_amount ?? 0) / 100).toFixed(2),
        (Number(r.shipping ?? 0) / 100).toFixed(2),
        (total / 100).toFixed(2),
        (paid / 100).toFixed(2),
        (Math.max(total - paid, 0) / 100).toFixed(2),
      ]
        .map(csvCell)
        .join(","),
    );
  }

  c.header("content-type", "text/csv; charset=utf-8");
  c.header("content-disposition", `attachment; filename="delgra-invoices-${from}-to-${to}.csv"`);
  return c.body(lines.join("\n"));
});

export default reports;
