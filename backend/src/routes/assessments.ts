import { Hono } from "hono";
import type { AppEnv } from "../types";
import { ApiError } from "../lib/errors";
import { base64UrlDecode, base64UrlEncode, isoNow } from "../lib/crypto";
import { paginate, parsePagination, type Paginated } from "../lib/pagination";
import { parseBody } from "../lib/validate";
import { z } from "zod";
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
  const total = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM assessments WHERE user_id = ?`)
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

assessments.get("/:id/attempts", async (c) => {
  const userId = c.get("authUser").id;
  const assessmentId = c.req.param("id");
  const assessment = await c.env.DB.prepare(
    `SELECT id FROM assessments WHERE user_id = ? AND id = ?`,
  )
    .bind(userId, assessmentId)
    .first<{ id: string }>();
  if (!assessment) throw ApiError.notFound("Assessment not found.");
  const attempts = await c.env.DB.prepare(
    `SELECT id, score, max, submitted_at AS submittedAt
       FROM assessment_attempts
      WHERE assessment_id = ? AND user_id = ?
      ORDER BY submitted_at DESC`,
  )
    .bind(assessmentId, userId)
    .all<{ id: string; score: number; max: number; submittedAt: string }>();
  return c.json({ items: attempts.results, total: attempts.results.length });
});

assessments.get("/:id", async (c) => {
  const userId = c.get("authUser").id;
  const row = await c.env.DB.prepare(`${SELECT} WHERE user_id = ? AND id = ?`)
    .bind(userId, c.req.param("id"))
    .first<AssessmentRow>();
  if (!row) throw ApiError.notFound("Assessment not found.");
  return c.json(mapRow(row));
});

const submitSchema = z.object({
  answers: z.array(z.number().int().min(-1).max(3)).min(1).max(5),
});

/** Student submits answers for an available assessment; scoring happens on the server. */
assessments.post("/:id/submit", async (c) => {
  const userId = c.get("authUser").id;
  const assessmentId = c.req.param("id");
  const { answers } = await parseBody(c, submitSchema);
  const row = await c.env.DB.prepare(`${SELECT} WHERE user_id = ? AND id = ?`)
    .bind(userId, assessmentId)
    .first<AssessmentRow>();
  if (!row) throw ApiError.notFound("Assessment not found.");
  if (row.status !== "available") throw ApiError.conflict("This assessment is not available.");
  if (row.attempts_left < 1) throw ApiError.conflict("No attempts remain for this assessment.");

  // The current security knowledge check has five single-choice questions.
  // Answers are kept server-side so the client cannot submit a fabricated score.
  const answerKey = [1, 0, 2, 0, 2];
  const max = Math.min(Math.max(row.questions, 1), answerKey.length);
  const score = answerKey
    .slice(0, max)
    .reduce((total, answer, index) => total + (answers[index] === answer ? 1 : 0), 0);
  const now = isoNow();
  const attemptId = crypto.randomUUID();
  const results = await c.env.DB.batch([
    c.env.DB.prepare(
      `UPDATE assessments
          SET status = 'done', score = ?, max = ?, attempts_left = attempts_left - 1,
              due = ?, window = 'Closed'
        WHERE id = ? AND user_id = ? AND status = 'available' AND attempts_left > 0`,
    ).bind(score, max, `Done · ${score}/${max}`, assessmentId, userId),
    c.env.DB.prepare(
      `INSERT INTO assessment_attempts
        (id, assessment_id, user_id, answers, score, max, submitted_at)
       SELECT ?, ?, ?, ?, ?, ?, ? WHERE changes() = 1`,
    ).bind(attemptId, assessmentId, userId, JSON.stringify(answers), score, max, now),
  ]);
  if (results[0]?.meta.changes !== 1 || results[1]?.meta.changes !== 1) {
    throw ApiError.conflict("This assessment has already been submitted.");
  }

  return c.json({
    ok: true,
    id: assessmentId,
    status: "done",
    score,
    max,
    attemptsLeft: Math.max(row.attempts_left - 1, 0),
    submittedAt: now,
  });
});
