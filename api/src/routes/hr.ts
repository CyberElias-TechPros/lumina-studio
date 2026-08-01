import { Hono } from "hono";
import type { AppEnv } from "../types";
import { base64UrlDecode, base64UrlEncode } from "../lib/crypto";
import { paginate, parsePagination, type Paginated } from "../lib/pagination";
import { requireAuth, requireHr } from "../lib/auth";

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

export const hr = new Hono<{ Bindings: AppEnv }>();

hr.use("*", requireAuth, requireHr);

hr.get("/employees", async (c) => {
  const { cursor, limit } = parsePagination(c);
  const total = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM employees`)
    .first<{ n: number }>();
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
  const total = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM leave_requests`)
    .first<{ n: number }>();
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
