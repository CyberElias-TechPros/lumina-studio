import { Hono } from "hono";
import type { AppEnv } from "../types";
import { ApiError } from "../lib/errors";
import { base64UrlDecode, base64UrlEncode } from "../lib/crypto";
import { paginate, parsePagination, type Paginated } from "../lib/pagination";
import { requireAuth, requireStudent } from "../lib/auth";

export interface ApiAssessment {
  id: string;
  title: string;
  course: string;
  kind: string;
  questions: number;
  duration: string;
  due: string;
  status: string;
  score?: number;
  max?: number;
  attempts: number;
  attemptsLeft: number;
  window: string;
}

interface AssessmentRow {
  id: string;
  title: string;
  course: string;
  kind: string;
  questions: number;
  duration: string;
  due: string;
  status: string;
  score: number | null;
  max: number | null;
  attempts: number;
  attempts_left: number;
  window: string;
}

const SELECT = `
  SELECT id, title, course, kind, questions, duration, due, status,
         score, max, attempts, attempts_left, window
    FROM assessments
`;

function mapRow(row: AssessmentRow): ApiAssessment {
  return {
    id: row.id,
    title: row.title,
    course: row.course,
    kind: row.kind,
    questions: row.questions,
    duration: row.duration,
    due: row.due,
    status: row.status,
    ...(row.score !== null ? { score: row.score } : {}),
    ...(row.max !== null ? { max: row.max } : {}),
    attempts: row.attempts,
    attemptsLeft: row.attempts_left,
    window: row.window,
  };
}

export const assessments = new Hono<{ Bindings: AppEnv }>();

assessments.use("*", requireAuth, requireStudent);

assessments.get("/", async (c) => {
  const { cursor, limit } = parsePagination(c);
  const userId = c.get("authUser").id;
  const total = await c.env.DB.prepare(
    `SELECT COUNT(*) AS n FROM assessments WHERE user_id = ?`,
  )
    .bind(userId)
    .first<{ n: number }>();
  const rows = await c.env.DB.prepare(
    `${SELECT} WHERE user_id = ? ${cursor ? "AND id > ?" : ""} ORDER BY id ASC LIMIT ?`,
  )
    .bind(userId, ...(cursor ? [base64UrlDecode(cursor) ?? ""] : []), limit)
    .all<AssessmentRow>();
  const items = rows.results.map(mapRow);
  const result: Paginated<ApiAssessment> = paginate(items, total?.n ?? 0, (last) =>
    base64UrlEncode(last.id),
  );
  return c.json(result);
});

assessments.get("/:id", async (c) => {
  const userId = c.get("authUser").id;
  const row = await c.env.DB.prepare(`${SELECT} WHERE user_id = ? AND id = ?`)
    .bind(userId, c.req.param("id"))
    .first<AssessmentRow>();
  if (!row) throw ApiError.notFound("Assessment not found.");
  return c.json(mapRow(row));
});
