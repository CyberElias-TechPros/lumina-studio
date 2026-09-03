import { Hono } from "hono";
import { customerSchema } from "../lib/validate.ts";
import { requireCap } from "../lib/auth.ts";
import { AppError } from "../lib/errors.ts";
import { isoNow, newId } from "../lib/ids.ts";
import { writeAudit } from "../lib/audit.ts";
import { clientIp } from "../lib/auth.ts";
import { listMeta, pickSort } from "../lib/list.ts";
import type { Env, SessionUser } from "../lib/env.ts";
import { toKoboSafe } from "../lib/money.ts";
import { displayStatus } from "../lib/totals.ts";

type AppEnv = { Bindings: Env; Variables: { user: SessionUser; requestId: string } };

const customers = new Hono<AppEnv>();

const SORTABLE = ["name", "created_at", "outstanding", "last_invoice"] as const;

/**
 * GET /v1/customers — search, filter, sort, paginate.
 *
 * Outstanding balance is computed in SQL with a correlated aggregate rather than
 * an N+1 loop over invoices, and the derived `overdue` flag is resolved in JS so
 * it stays consistent with the rest of the API.
 */
customers.get("/", requireCap("read:customers"), async (c) => {
  const page = Math.max(1, Number.parseInt(c.req.query("page") ?? "1", 10) || 1);
  const limit = Math.min(200, Math.max(1, Number.parseInt(c.req.query("limit") ?? "25", 10) || 25));
  const offset = (page - 1) * limit;
  const q = (c.req.query("q") ?? "").trim().slice(0, 120).replace(/[%_\\]/g, " ");
  const status = c.req.query("status") ?? "";
  const sort = pickSort(c.req.query("sort") ?? undefined, SORTABLE, "created_at");
  const dir = c.req.query("dir") === "asc" ? "ASC" : "DESC";
  const activeOnly = c.req.query("active") === "true";

  const where: string[] = [];
  const params: (string | number)[] = [];

  if (q) {
    where.push(`(c.name LIKE ? OR c.email LIKE ? OR c.phone LIKE ? OR c.contact_person LIKE ?)`);
    const like = `%${q}%`;
    params.push(like, like, like, like);
  }
  if (activeOnly) where.push(`c.is_active = 1`);

  const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";

  const base = `
    SELECT
      c.id, c.name, c.contact_person, c.email, c.phone, c.alt_phone,
      c.address_line1, c.city, c.state, c.rc_number, c.tax_id,
      c.customer_type, c.notes, c.is_active, c.created_at, c.updated_at,
      COALESCE(inv.invoice_count, 0) AS invoice_count,
      COALESCE(inv.last_invoice_date, '') AS last_invoice_date,
      COALESCE(inv.billed, 0) AS billed,
      COALESCE(inv.paid, 0) AS paid,
      MAX(COALESCE(inv.billed, 0) - COALESCE(inv.paid, 0), 0) AS outstanding
    FROM customers c
    LEFT JOIN (
      SELECT customer_id,
             COUNT(*) AS invoice_count,
             MAX(issue_date) AS last_invoice_date,
             SUM(total) AS billed,
             SUM(paid_amount) AS paid
        FROM invoices
       WHERE status != 'void'
       GROUP BY customer_id
    ) inv ON inv.customer_id = c.id
    ${whereSql}`;

  // `status` filters on a computed money column, so it is applied as a WHERE on
  // an outer query. Using HAVING here would be wrong: without GROUP BY SQLite
  // treats the whole result as one group and collapses the list to a single row.
  const outerWhere: string[] = [];
  if (status === "owing") outerWhere.push(`outstanding > 0`);
  if (status === "clear") outerWhere.push(`outstanding = 0`);
  const outerWhereSql = outerWhere.length ? `WHERE ${outerWhere.join(" AND ")}` : "";

  // Columns are unqualified here: ordering happens on the outer projection.
  const orderColumn =
    sort === "outstanding"
      ? "outstanding"
      : sort === "last_invoice"
        ? "last_invoice_date"
        : sort === "name"
          ? "name"
          : "created_at";

  const paged = `SELECT * FROM (${base}) ${outerWhereSql}`;

  const countRow = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM (${paged})`)
    .bind(...params)
    .first<{ n: number }>();
  const total = countRow?.n ?? 0;

  const rows = await c.env.DB.prepare(
    `${paged} ORDER BY ${orderColumn} ${dir}, id ASC LIMIT ? OFFSET ?`,
  )
    .bind(...params, limit, offset)
    .all<CustomerRow>();

  return c.json({
    data: rows.results.map(serialize),
    meta: listMeta(page, limit, total),
  });
});

interface CustomerRow {
  id: string;
  name: string;
  contact_person: string | null;
  email: string | null;
  phone: string | null;
  alt_phone: string | null;
  address_line1: string | null;
  city: string | null;
  state: string | null;
  rc_number: string | null;
  tax_id: string | null;
  customer_type: string;
  notes: string | null;
  is_active: number;
  created_at: string;
  updated_at: string;
  invoice_count: number;
  last_invoice_date: string;
  billed: number;
  paid: number;
  outstanding: number;
}

function serialize(row: CustomerRow) {
  return {
    id: row.id,
    name: row.name,
    contactPerson: row.contact_person,
    email: row.email,
    phone: row.phone,
    altPhone: row.alt_phone,
    addressLine1: row.address_line1,
    city: row.city,
    state: row.state,
    rcNumber: row.rc_number,
    taxId: row.tax_id,
    customerType: row.customer_type,
    notes: row.notes,
    isActive: Boolean(row.is_active),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    stats: {
      invoiceCount: row.invoice_count,
      lastInvoiceDate: row.last_invoice_date || null,
      billed: toKoboSafe(row.billed),
      paid: toKoboSafe(row.paid),
      outstanding: toKoboSafe(row.outstanding),
    },
  };
}

customers.get("/:id", requireCap("read:customers"), async (c) => {
  const row = await c.env.DB.prepare(
    `SELECT
       c.*,
       COALESCE(inv.invoice_count, 0) AS invoice_count,
       COALESCE(inv.last_invoice_date, '') AS last_invoice_date,
       COALESCE(inv.billed, 0) AS billed,
       COALESCE(inv.paid, 0) AS paid,
       MAX(COALESCE(inv.billed, 0) - COALESCE(inv.paid, 0), 0) AS outstanding
     FROM customers c
     LEFT JOIN (
       SELECT customer_id, COUNT(*) AS invoice_count, MAX(issue_date) AS last_invoice_date,
              SUM(total) AS billed, SUM(paid_amount) AS paid
         FROM invoices WHERE status != 'void' GROUP BY customer_id
     ) inv ON inv.customer_id = c.id
     WHERE c.id = ?
     GROUP BY c.id`,
  )
    .bind(c.req.param("id"))
    .first<CustomerRow>();
  if (!row) throw AppError.notFound("Customer");

  const [invoices, waybills] = await Promise.all([
    c.env.DB.prepare(
      `SELECT id, number, issue_date, due_date, status, total, paid_amount
         FROM invoices WHERE customer_id = ? ORDER BY issue_date DESC, id DESC LIMIT 10`,
    )
      .bind(row.id)
      .all(),
    c.env.DB.prepare(
      `SELECT id, number, waybill_date, carrier, tracking_number, destination, status
         FROM waybills WHERE customer_id = ? ORDER BY waybill_date DESC, id DESC LIMIT 10`,
    )
      .bind(row.id)
      .all(),
  ]);

  return c.json({
    customer: serialize(row),
    invoices: (invoices.results as Array<Record<string, unknown>>).map((r) => ({
      id: r.id,
      number: r.number,
      issueDate: r.issue_date,
      dueDate: r.due_date,
      status: displayStatus({
        status: r.status as "draft" | "sent" | "partial" | "paid" | "void",
        due_date: String(r.due_date),
        total: Number(r.total),
        paid_amount: Number(r.paid_amount),
      }),
      total: toKoboSafe(Number(r.total)),
      paidAmount: toKoboSafe(Number(r.paid_amount)),
      balance: Math.max(toKoboSafe(Number(r.total)) - toKoboSafe(Number(r.paid_amount)), 0),
    })),
    waybills: (waybills.results as Array<Record<string, unknown>>).map((r) => ({
      id: r.id,
      number: r.number,
      waybillDate: r.waybill_date,
      carrier: r.carrier,
      trackingNumber: r.tracking_number,
      destination: r.destination,
      status: r.status,
    })),
  });
});

customers.post("/", requireCap("write:customers"), async (c) => {
  const input = customerSchema.parse(await c.req.json());
  const id = newId();
  const now = isoNow();

  const result = await c.env.DB.prepare(
    `INSERT INTO customers (id, name, contact_person, email, phone, alt_phone, address_line1,
       city, state, rc_number, tax_id, customer_type, notes, is_active, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  )
    .bind(
      id,
      input.name,
      input.contactPerson || null,
      input.email || null,
      input.phone || null,
      input.altPhone || null,
      input.addressLine1 || null,
      input.city || null,
      input.state || null,
      input.rcNumber || null,
      input.taxId || null,
      input.customerType,
      input.notes || null,
      input.isActive ? 1 : 0,
      now,
      now,
    )
    .run();

  if (!result.success) throw AppError.conflict("That customer could not be saved.");

  await writeAudit(c.env, {
    actor: c.get("user"),
    action: "customer.create",
    entityType: "customer",
    entityId: id,
    summary: input.name,
    ip: clientIp(c),
  });

  return c.json({ id }, 201);
});

customers.patch("/:id", requireCap("write:customers"), async (c) => {
  const id = c.req.param("id");
  const existing = await c.env.DB.prepare(`SELECT id, name FROM customers WHERE id = ?`)
    .bind(id)
    .first<{ id: string; name: string }>();
  if (!existing) throw AppError.notFound("Customer");

  // A PATCH must accept a partial body; re-validating the merged record keeps
  // the schema authoritative without forcing the client to resend every field.
  const current = await c.env.DB.prepare(`SELECT * FROM customers WHERE id = ?`).bind(id).first<Record<string, unknown>>();
  const merged = {
    name: current?.name,
    contactPerson: current?.contact_person ?? "",
    email: current?.email ?? "",
    phone: current?.phone ?? "",
    altPhone: current?.alt_phone ?? "",
    addressLine1: current?.address_line1 ?? "",
    city: current?.city ?? "",
    state: current?.state ?? "",
    rcNumber: current?.rc_number ?? "",
    taxId: current?.tax_id ?? "",
    customerType: current?.customer_type ?? "individual",
    notes: current?.notes ?? "",
    isActive: Boolean(current?.is_active),
    ...(await c.req.json()),
  };
  const input = customerSchema.parse(merged);

  await c.env.DB.prepare(
    `UPDATE customers SET name = ?, contact_person = ?, email = ?, phone = ?, alt_phone = ?,
       address_line1 = ?, city = ?, state = ?, rc_number = ?, tax_id = ?, customer_type = ?,
       notes = ?, is_active = ?, updated_at = ?
     WHERE id = ?`,
  )
    .bind(
      input.name,
      input.contactPerson || null,
      input.email || null,
      input.phone || null,
      input.altPhone || null,
      input.addressLine1 || null,
      input.city || null,
      input.state || null,
      input.rcNumber || null,
      input.taxId || null,
      input.customerType,
      input.notes || null,
      input.isActive ? 1 : 0,
      isoNow(),
      id,
    )
    .run();

  await writeAudit(c.env, {
    actor: c.get("user"),
    action: "customer.update",
    entityType: "customer",
    entityId: id,
    summary: input.name,
    ip: clientIp(c),
  });

  return c.json({ ok: true });
});

/**
 * DELETE is a soft delete whenever the customer has invoices or waybills —
 * `ON DELETE RESTRICT` on those FKs would otherwise reject the request, and
 * silently detaching financial history would be worse. Hard delete only when
 * nothing references the record.
 */
customers.delete("/:id", requireCap("delete:customers"), async (c) => {
  const id = c.req.param("id");
  const existing = await c.env.DB.prepare(`SELECT id, name FROM customers WHERE id = ?`)
    .bind(id)
    .first<{ id: string; name: string }>();
  if (!existing) throw AppError.notFound("Customer");

  const refs = await c.env.DB.prepare(
    `SELECT
       (SELECT COUNT(*) FROM invoices WHERE customer_id = ?) AS invoices,
       (SELECT COUNT(*) FROM waybills WHERE customer_id = ?) AS waybills`,
  )
    .bind(id, id)
    .first<{ invoices: number; waybills: number }>();

  const referenced = (refs?.invoices ?? 0) + (refs?.waybills ?? 0);
  if (referenced > 0) {
    await c.env.DB.prepare(`UPDATE customers SET is_active = 0, updated_at = ? WHERE id = ?`)
      .bind(isoNow(), id)
      .run();
    await writeAudit(c.env, {
      actor: c.get("user"),
      action: "customer.archive",
      entityType: "customer",
      entityId: id,
      summary: `${existing.name} archived (${referenced} linked records)`,
      ip: clientIp(c),
    });
    return c.json({ ok: true, archived: true, referenced });
  }

  await c.env.DB.prepare(`DELETE FROM customers WHERE id = ?`).bind(id).run();
  await writeAudit(c.env, {
    actor: c.get("user"),
    action: "customer.delete",
    entityType: "customer",
    entityId: id,
    summary: existing.name,
    ip: clientIp(c),
  });
  return c.json({ ok: true, archived: false });
});

/**
 * CSV export of the customer book. Streams a plain text/csv response so a
 * 10 000-row export does not have to be materialised as JSON first.
 */
customers.get("/export/csv", requireCap("export:data"), async (c) => {
  const rows = await c.env.DB.prepare(
    `SELECT c.name, c.contact_person, c.email, c.phone, c.city, c.state, c.customer_type,
            COALESCE(inv.billed,0) AS billed, COALESCE(inv.paid,0) AS paid,
            MAX(COALESCE(inv.billed,0) - COALESCE(inv.paid,0), 0) AS outstanding,
            c.is_active, c.created_at
       FROM customers c
       LEFT JOIN (SELECT customer_id, SUM(total) AS billed, SUM(paid_amount) AS paid
                    FROM invoices WHERE status != 'void' GROUP BY customer_id) inv
         ON inv.customer_id = c.id
      GROUP BY c.id
      ORDER BY c.name ASC`,
  ).all();

  const header = [
    "Name","Contact person","Email","Phone","City","State","Type",
    "Billed","Paid","Outstanding","Active","Created",
  ];
  const lines = [header.join(",")];
  for (const row of rows.results as Array<Record<string, unknown>>) {
    lines.push(
      [
        row.name, row.contact_person, row.email, row.phone, row.city, row.state,
        row.customer_type,
        (Number(row.billed) / 100).toFixed(2),
        (Number(row.paid) / 100).toFixed(2),
        (Number(row.outstanding) / 100).toFixed(2),
        row.is_active ? "yes" : "no",
        row.created_at,
      ]
        .map(csvCell)
        .join(","),
    );
  }

  c.header("content-type", "text/csv; charset=utf-8");
  c.header("content-disposition", `attachment; filename="delgra-customers.csv"`);
  return c.body(lines.join("\n"));
});

/** RFC 4180 escaping: quote when the value contains a comma, quote, or newline. */
export function csvCell(value: unknown): string {
  if (value === null || value === undefined) return "";
  const s = String(value);
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export default customers;
