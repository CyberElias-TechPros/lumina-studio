import { Hono } from "hono";
import { requireCap } from "../lib/auth.ts";
import { toKoboSafe } from "../lib/money.ts";
import { getBusiness } from "../lib/business.ts";
import type { Env, SessionUser } from "../lib/env.ts";

type AppEnv = { Bindings: Env; Variables: { user: SessionUser; requestId: string } };

const dashboard = new Hono<AppEnv>();

/**
 * The landing screen. Every figure is one aggregate query — no per-row loops —
 * and every derived state (overdue, low stock) is computed here rather than
 * stored, so nothing on the dashboard can go stale.
 */
dashboard.get("/", requireCap("read:dashboard"), async (c) => {
  const business = await getBusiness(c.env);
  const today = new Date().toISOString().slice(0, 10);
  const monthStart = `${today.slice(0, 7)}-01`;

  const [sales, receivables, counts, activity] = await Promise.all([
    c.env.DB.prepare(
      `SELECT
         COALESCE(SUM(CASE WHEN issue_date >= ? THEN total ELSE 0 END), 0) AS month_billed,
         COALESCE(SUM(CASE WHEN issue_date >= ? THEN 1 ELSE 0 END), 0) AS month_invoice_count,
         COALESCE(SUM(total), 0) AS all_billed
       FROM invoices WHERE status != 'void'`,
    )
      .bind(monthStart, monthStart)
      .first<{ month_billed: number; month_invoice_count: number; all_billed: number }>(),

    c.env.DB.prepare(
      `SELECT
         COALESCE(SUM(MAX(total - paid_amount, 0)), 0) AS outstanding,
         COALESCE(SUM(CASE WHEN due_date < ? AND status IN ('sent','partial') AND paid_amount < total
                           THEN MAX(total - paid_amount, 0) ELSE 0 END), 0) AS overdue,
         COALESCE(SUM(CASE WHEN status = 'paid' THEN paid_amount ELSE 0 END), 0) AS collected
       FROM invoices WHERE status != 'void' AND status != 'draft'`,
    )
      .bind(today)
      .first<{ outstanding: number; overdue: number; collected: number }>(),

    c.env.DB.prepare(
      `SELECT
         (SELECT COUNT(*) FROM customers WHERE is_active = 1) AS customers,
         (SELECT COUNT(*) FROM invoices WHERE status = 'draft') AS drafts,
         (SELECT COUNT(*) FROM invoices WHERE status IN ('sent','partial')) AS open_invoices,
         (SELECT COUNT(*) FROM waybills WHERE status = 'in_transit') AS in_transit,
         (SELECT COUNT(*) FROM waybills WHERE status = 'pending') AS pending_waybills,
         (SELECT COUNT(*) FROM waybills WHERE status = 'exception') AS exceptions,
         (SELECT COUNT(*) FROM products WHERE track_stock = 1 AND is_active = 1 AND quantity <= reorder_level) AS low_stock,
         (SELECT COUNT(*) FROM products WHERE track_stock = 1 AND is_active = 1 AND quantity <= 0) AS out_of_stock,
         (SELECT COALESCE(SUM(cost_price * MAX(quantity, 0)), 0) FROM products WHERE is_active = 1) AS stock_value,
         (SELECT COALESCE(SUM(MAX(total - paid_amount, 0)), 0) FROM purchases WHERE status NOT IN ('cancelled','draft')) AS payables`,
    ).first<Record<string, number>>(),

    c.env.DB.prepare(
      `SELECT id, actor_name, action, entity_type, entity_id, summary, created_at
         FROM audit_log ORDER BY created_at DESC, rowid DESC LIMIT 12`,
    ).all(),
  ]);

  const [monthCash, lowStockItems] = await Promise.all([
    c.env.DB.prepare(
      `SELECT COALESCE(SUM(amount), 0) AS collected FROM payments WHERE paid_at >= ?`,
    )
      .bind(monthStart)
      .first<{ collected: number }>(),
    c.env.DB.prepare(
      `SELECT id, sku, name, quantity, reorder_level FROM products
        WHERE track_stock = 1 AND is_active = 1 AND quantity <= reorder_level
        ORDER BY quantity ASC LIMIT 6`,
    ).all(),
  ]);

  return c.json({
    business: { name: business.name, currency: business.currency, currencySymbol: business.currencySymbol },
    period: { monthStart, today },
    money: {
      monthBilled: toKoboSafe(sales?.month_billed ?? 0),
      monthCollected: toKoboSafe(monthCash?.collected ?? 0),
      monthInvoiceCount: sales?.month_invoice_count ?? 0,
      outstanding: toKoboSafe(receivables?.outstanding ?? 0),
      overdue: toKoboSafe(receivables?.overdue ?? 0),
      collected: toKoboSafe(receivables?.collected ?? 0),
      payables: toKoboSafe(counts?.payables ?? 0),
      stockValue: toKoboSafe(counts?.stock_value ?? 0),
    },
    counts: {
      customers: counts?.customers ?? 0,
      drafts: counts?.drafts ?? 0,
      openInvoices: counts?.open_invoices ?? 0,
      inTransit: counts?.in_transit ?? 0,
      pendingWaybills: counts?.pending_waybills ?? 0,
      exceptions: counts?.exceptions ?? 0,
      lowStock: counts?.low_stock ?? 0,
      outOfStock: counts?.out_of_stock ?? 0,
    },
    lowStockItems: (lowStockItems.results as Array<Record<string, unknown>>).map((r) => ({
      id: r.id,
      sku: r.sku,
      name: r.name,
      quantity: r.quantity,
      reorderLevel: r.reorder_level,
    })),
    activity: (activity.results as Array<Record<string, unknown>>).map((a) => ({
      id: a.id,
      actorName: a.actor_name,
      action: a.action,
      entityType: a.entity_type,
      entityId: a.entity_id,
      summary: a.summary,
      createdAt: a.created_at,
    })),
  });
});

export default dashboard;
