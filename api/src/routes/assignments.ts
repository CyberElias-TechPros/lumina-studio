import { Hono } from "hono";
import type { AppEnv } from "../types";
import { ApiError } from "../lib/errors";
import { base64UrlDecode, base64UrlEncode } from "../lib/crypto";
import { paginate, parsePagination, type Paginated } from "../lib/pagination";
import { requireAuth, requireStudent } from "../lib/auth";

export interface ApiAssignment {
  id: string;
  title: string;
  course: string;
  description: string;
  due: string;
  status: string;
  score?: number;
  max: number;
  weight: number;
  submissions: unknown;
  rubric: unknown;
}

interface AssignmentRow {
  id: string;
  title: string;
  course: string;
  description: string;
  due: string;
  status: string;
  score: number | null;
  max: number;
  weight: number;
  submissions: string;
  rubric: string;
}

const SELECT = `
  SELECT id, title, course, description, due, status, score, max, weight, submissions, rubric
    FROM assignments
`;

function mapRow(row: AssignmentRow): ApiAssignment {
  return {
    id: row.id,
    title: row.title,
    course: row.course,
    description: row.description,
    due: row.due,
    status: row.status,
    ...(row.score !== null ? { score: row.score } : {}),
    max: row.max,
    weight: row.weight,
    submissions: JSON.parse(row.submissions),
    rubric: JSON.parse(row.rubric),
  };
}

export const assignments = new Hono<{ Bindings: AppEnv }>();

assignments.use("*", requireAuth, requireStudent);

assignments.get("/", async (c) => {
  const { cursor, limit } = parsePagination(c);
  const userId = c.get("authUser").id;
  const total = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM assignments WHERE user_id = ?`)
    .bind(userId)
    .first<{ n: number }>();
  const rows = await c.env.DB.prepare(
    `${SELECT} WHERE user_id = ? ${cursor ? "AND id > ?" : ""} ORDER BY id ASC LIMIT ?`,
  )
    .bind(userId, ...(cursor ? [base64UrlDecode(cursor) ?? ""] : []), limit)
    .all<AssignmentRow>();
  const items = rows.results.map(mapRow);
  const result: Paginated<ApiAssignment> = paginate(items, total?.n ?? 0, (last) =>
    base64UrlEncode(last.id),
  );
  return c.json(result);
});

assignments.get("/:id", async (c) => {
  const userId = c.get("authUser").id;
  const row = await c.env.DB.prepare(`${SELECT} WHERE user_id = ? AND id = ?`)
    .bind(userId, c.req.param("id"))
    .first<AssignmentRow>();
  if (!row) throw ApiError.notFound("Assignment not found.");
  return c.json(mapRow(row));
});
