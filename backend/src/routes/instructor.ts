import { Hono } from "hono";
import type { AppEnv } from "../types";
import { ApiError } from "../lib/errors";
import { base64UrlDecode, base64UrlEncode } from "../lib/crypto";
import { paginate, parsePagination, type Paginated } from "../lib/pagination";
import { requireAuth, requireInstructor } from "../lib/auth";

export interface ApiInstructorGradebookRow {
  id: string;
  student: string;
  quiz: number;
  lab: number;
  assignment: number;
  midterm: number;
  total: number;
  letter: string;
  atRisk: boolean;
}

export interface ApiInstructorCourse {
  id: string;
  title: string;
  cohort: string;
  status: string;
  modules: unknown;
}

export interface ApiSubmission {
  id: string;
  student: string;
  title: string;
  submitted: string;
  status: string;
  score?: number;
  late: boolean;
  file: string;
  size: string;
}

interface GradebookRow {
  id: string;
  student: string;
  quiz: number;
  lab: number;
  assignment: number;
  midterm: number;
  total: number;
  letter: string;
  at_risk: number;
}

interface CourseRow {
  id: string;
  title: string;
  cohort: string;
  status: string;
  modules: string;
}

interface SubmissionRow {
  id: string;
  student: string;
  title: string;
  submitted: string;
  status: string;
  score: number | null;
  late: number;
  file: string;
  size: string;
}

export const instructor = new Hono<{ Bindings: AppEnv }>();

instructor.use("*", requireAuth, requireInstructor);

instructor.get("/gradebook", async (c) => {
  const { cursor, limit } = parsePagination(c);
  const userId = c.get("authUser").id;
  const total = await c.env.DB.prepare(
    `SELECT COUNT(*) AS n FROM instructor_gradebook WHERE user_id = ?`,
  )
    .bind(userId)
    .first<{ n: number }>();
  const rows = await c.env.DB.prepare(
    `SELECT id, student, quiz, lab, assignment, midterm, total, letter, at_risk
       FROM instructor_gradebook WHERE user_id = ? ${cursor ? "AND id > ?" : ""}
      ORDER BY id ASC LIMIT ?`,
  )
    .bind(userId, ...(cursor ? [base64UrlDecode(cursor) ?? ""] : []), limit)
    .all<GradebookRow>();
  const items: ApiInstructorGradebookRow[] = rows.results.map((r) => ({
    id: r.id,
    student: r.student,
    quiz: r.quiz,
    lab: r.lab,
    assignment: r.assignment,
    midterm: r.midterm,
    total: r.total,
    letter: r.letter,
    atRisk: r.at_risk === 1,
  }));
  const result: Paginated<ApiInstructorGradebookRow> = paginate(items, total?.n ?? 0, (last) =>
    base64UrlEncode(last.id),
  );
  return c.json(result);
});

instructor.get("/courses", async (c) => {
  const { cursor, limit } = parsePagination(c);
  const userId = c.get("authUser").id;
  const total = await c.env.DB.prepare(
    `SELECT COUNT(*) AS n FROM instructor_courses WHERE user_id = ?`,
  )
    .bind(userId)
    .first<{ n: number }>();
  const rows = await c.env.DB.prepare(
    `SELECT id, title, cohort, status, modules FROM instructor_courses
      WHERE user_id = ? ${cursor ? "AND id > ?" : ""} ORDER BY id ASC LIMIT ?`,
  )
    .bind(userId, ...(cursor ? [base64UrlDecode(cursor) ?? ""] : []), limit)
    .all<CourseRow>();
  const items: ApiInstructorCourse[] = rows.results.map((r) => ({
    id: r.id,
    title: r.title,
    cohort: r.cohort,
    status: r.status,
    modules: JSON.parse(r.modules),
  }));
  const result: Paginated<ApiInstructorCourse> = paginate(items, total?.n ?? 0, (last) =>
    base64UrlEncode(last.id),
  );
  return c.json(result);
});

instructor.get("/courses/:slug", async (c) => {
  const userId = c.get("authUser").id;
  const row = await c.env.DB.prepare(
    `SELECT id, title, cohort, status, modules FROM instructor_courses
      WHERE user_id = ? AND id = ?`,
  )
    .bind(userId, c.req.param("slug"))
    .first<CourseRow>();
  if (!row) throw ApiError.notFound("Course not found.");
  return c.json({
    id: row.id,
    title: row.title,
    cohort: row.cohort,
    status: row.status,
    modules: JSON.parse(row.modules),
  });
});

instructor.get("/assignments", async (c) => {
  const { cursor, limit } = parsePagination(c);
  const userId = c.get("authUser").id;
  const total = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM submissions WHERE user_id = ?`)
    .bind(userId)
    .first<{ n: number }>();
  const rows = await c.env.DB.prepare(
    `SELECT id, student, title, submitted, status, score, late, file, size
       FROM submissions WHERE user_id = ? ${cursor ? "AND id > ?" : ""}
      ORDER BY id ASC LIMIT ?`,
  )
    .bind(userId, ...(cursor ? [base64UrlDecode(cursor) ?? ""] : []), limit)
    .all<SubmissionRow>();
  const items: ApiSubmission[] = rows.results.map((r) => ({
    id: r.id,
    student: r.student,
    title: r.title,
    submitted: r.submitted,
    status: r.status,
    ...(r.score !== null ? { score: r.score } : {}),
    late: r.late === 1,
    file: r.file,
    size: r.size,
  }));
  const result: Paginated<ApiSubmission> = paginate(items, total?.n ?? 0, (last) =>
    base64UrlEncode(last.id),
  );
  return c.json(result);
});

instructor.get("/assignments/:id", async (c) => {
  const userId = c.get("authUser").id;
  const row = await c.env.DB.prepare(
    `SELECT id, student, title, submitted, status, score, late, file, size
       FROM submissions WHERE user_id = ? AND id = ?`,
  )
    .bind(userId, c.req.param("id"))
    .first<SubmissionRow>();
  if (!row) throw ApiError.notFound("Submission not found.");
  return c.json({
    id: row.id,
    student: row.student,
    title: row.title,
    submitted: row.submitted,
    status: row.status,
    ...(row.score !== null ? { score: row.score } : {}),
    late: row.late === 1,
    file: row.file,
    size: row.size,
  });
});
