import { Hono } from "hono";
import type { AppEnv } from "../types";
import { base64UrlDecode, base64UrlEncode } from "../lib/crypto";
import { paginate, parsePagination } from "../lib/pagination";
import { requireAuth, requireAnyRole } from "../lib/auth";

export const ops = new Hono<{ Bindings: AppEnv }>();

ops.use("*", requireAuth, requireAnyRole(["admin", "instructor"]));

const COLS: Record<string, string> = {
  inventory: "id, name, category, qty, unit, reorder_point AS reorderPoint, auto_reorder AS autoReorder, unit_price AS unitPrice, location",
  "purchase-orders": "id, vendor, items, amount, eta, status",
  branches: "id, name, location, capacity, occupied, staff_onsite AS staffOnsite, cost_seat_day AS costSeatDay, status",
  rooms: "id, name, block, seats, next_event AS nextEvent, status",
  maintenance: "id, title, detail, status",
  vendors: "id, name, category, rating, status",
  contracts: "id, title, renews, value_yr AS valueYr, status",
  tasks: "id, title, assignee, detail, done",
  workflows: "id, name, trigger_detail AS triggerDetail, stats, status",
};

const TABLES: Record<string, string> = {
  inventory: "inventory_items",
  "purchase-orders": "purchase_orders",
  branches: "branches",
  rooms: "facility_rooms",
  maintenance: "maintenance_jobs",
  vendors: "vendors",
  contracts: "vendor_contracts",
  tasks: "ops_tasks",
  workflows: "workflows",
};

for (const [key, columns] of Object.entries(COLS)) {
  ops.get(`/${key}`, async (c) => {
    const { cursor, limit } = parsePagination(c);
    const table = TABLES[key];
    const total = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM ${table}`).first<{ n: number }>();
    const rows = await c.env.DB.prepare(
      `SELECT ${columns} FROM ${table} ${cursor ? "WHERE id > ?" : ""} ORDER BY id ASC LIMIT ?`,
    )
      .bind(...(cursor ? [base64UrlDecode(cursor) ?? ""] : []), limit)
      .all();
    const items = rows.results;
    return c.json(paginate(items, total?.n ?? 0, (last) => base64UrlEncode(String(last.id))));
  });
}
