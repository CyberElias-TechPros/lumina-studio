import { Hono } from "hono";
import type { AppEnv } from "../types";
import { z } from "zod";
import { base64UrlDecode, base64UrlEncode } from "../lib/crypto";
import { paginate, parsePagination, type Paginated } from "../lib/pagination";
import { requireAuth, requireHr } from "../lib/auth";
import { ApiError } from "../lib/errors";
import { parseBody } from "../lib/validate";

export interface ApiEmployee {
  id: string;
  name: string;
  role: string;
  dept: string;
  status: string;
  joined: string;
}

export interface ApiLeaveRequest {
  id: string;
  employee: string;
  type: string;
  from: string;
  to: string;
  status: string;
}

export interface ApiPayrollChange {
  id: string;
  title: string;
  detail: string;
  status: string;
}

interface EmployeeRow {
  id: string;
  name: string;
  role: string;
  dept: string;
  status: string;
  joined: string;
}

interface LeaveRow {
  id: string;
  employee: string;
  type: string;
  from_date: string;
  to_date: string;
  status: string;
}

interface PayrollRow {
  id: string;
  title: string;
  detail: string;
  status: string;
}

export const hr = new Hono<{ Bindings: AppEnv }>();

hr.use("*", requireAuth, requireHr);

hr.get("/employees", async (c) => {
  const { cursor, limit } = parsePagination(c);
  const total = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM employees`).first<{
    n: number;
  }>();
  const rows = await c.env.DB.prepare(
    `SELECT id, name, role, dept, status, joined FROM employees
      ${cursor ? "WHERE id > ?" : ""} ORDER BY id ASC LIMIT ?`,
  )
    .bind(...(cursor ? [base64UrlDecode(cursor) ?? ""] : []), limit)
    .all<EmployeeRow>();
  const items: ApiEmployee[] = rows.results.map((r) => ({ ...r }));
  const result: Paginated<ApiEmployee> = paginate(items, total?.n ?? 0, (last) =>
    base64UrlEncode(last.id),
  );
  return c.json(result);
});

hr.get("/leave-requests", async (c) => {
  const { cursor, limit } = parsePagination(c);
  const total = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM leave_requests`).first<{
    n: number;
  }>();
  const rows = await c.env.DB.prepare(
    `SELECT id, employee, type, from_date, to_date, status FROM leave_requests
      ${cursor ? "WHERE id > ?" : ""} ORDER BY id ASC LIMIT ?`,
  )
    .bind(...(cursor ? [base64UrlDecode(cursor) ?? ""] : []), limit)
    .all<LeaveRow>();
  const items: ApiLeaveRequest[] = rows.results.map((r) => ({
    id: r.id,
    employee: r.employee,
    type: r.type,
    from: r.from_date,
    to: r.to_date,
    status: r.status,
  }));
  const result: Paginated<ApiLeaveRequest> = paginate(items, total?.n ?? 0, (last) =>
    base64UrlEncode(last.id),
  );
  return c.json(result);
});

hr.get("/payroll-changes", async (c) => {
  const { cursor, limit } = parsePagination(c);
  const total = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM payroll_changes`).first<{
    n: number;
  }>();
  const rows = await c.env.DB.prepare(
    `SELECT id, title, detail, status FROM payroll_changes
      ${cursor ? "WHERE id > ?" : ""} ORDER BY id ASC LIMIT ?`,
  )
    .bind(...(cursor ? [base64UrlDecode(cursor) ?? ""] : []), limit)
    .all<PayrollRow>();
  const items: ApiPayrollChange[] = rows.results.map((r) => ({ ...r }));
  const result: Paginated<ApiPayrollChange> = paginate(items, total?.n ?? 0, (last) =>
    base64UrlEncode(last.id),
  );
  return c.json(result);
});

const leaveDecisionSchema = z.object({
  status: z.enum(["approved", "rejected"], { message: "Invalid decision." }),
});

/** HR/admin: approve or reject a leave request. */
hr.patch("/leave-requests/:id", async (c) => {
  const { status } = await parseBody(c, leaveDecisionSchema);
  const id = c.req.param("id");
  const row = await c.env.DB.prepare(`SELECT id FROM leave_requests WHERE id = ?`)
    .bind(id)
    .first<{ id: string }>();
  if (!row) throw ApiError.notFound("Leave request not found.");
  await c.env.DB.prepare(`UPDATE leave_requests SET status = ? WHERE id = ?`)
    .bind(status, id)
    .run();
  return c.json({ ok: true, id, status });
});

const payrollSchema = z.object({
  title: z.string().trim().min(1, "Title is required.").max(200),
  detail: z.string().trim().max(1_000).optional(),
  status: z.enum(["draft", "approved", "applied"]).optional().default("draft"),
});

/** HR/admin: create a payroll change record. */
hr.post("/payroll-changes", async (c) => {
  const body = await parseBody(c, payrollSchema);
  const id = crypto.randomUUID();
  await c.env.DB.prepare(
    `INSERT INTO payroll_changes (id, title, detail, status, sort_order) VALUES (?, ?, ?, ?, 0)`,
  )
    .bind(id, body.title, body.detail ?? "", body.status)
    .run();
  return c.json({ ok: true, id, ...body }, 201);
});

const payrollPatchSchema = z.object({
  status: z.enum(["draft", "approved", "applied"], { message: "Invalid status." }),
});

/** HR/admin: approve or apply a payroll change. */
hr.patch("/payroll-changes/:id", async (c) => {
  const { status } = await parseBody(c, payrollPatchSchema);
  const id = c.req.param("id");
  const row = await c.env.DB.prepare(`SELECT id FROM payroll_changes WHERE id = ?`)
    .bind(id)
    .first<{ id: string }>();
  if (!row) throw ApiError.notFound("Payroll change not found.");
  await c.env.DB.prepare(`UPDATE payroll_changes SET status = ? WHERE id = ?`)
    .bind(status, id)
    .run();
  return c.json({ ok: true, id, status });
});
