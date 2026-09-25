import { Hono } from "hono";
import type { AppEnv } from "../types";
import { z } from "zod";
import { ApiError } from "../lib/errors";
import { base64UrlDecode, base64UrlEncode, isoNow } from "../lib/crypto";
import { paginate, parsePagination, type Paginated } from "../lib/pagination";
import { requireAuth, requireStudent } from "../lib/auth";
import { parseBody } from "../lib/validate";

export interface ApiAssignment {
  id: string;
  title: string;
  course: string;
  description: string;
  due: string;
  /** ISO-8601 UTC deadline when known (null for legacy free-text dues). */
  dueAt: string | null;
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
  due_at: string | null;
  created_by: string | null;
  status: string;
  score: number | null;
  max: number;
  weight: number;
  submissions: string;
  rubric: string;
}

const SELECT = `
  SELECT id, title, course, description, due, due_at, created_by, status, score, max, weight, submissions, rubric
    FROM assignments
`;

function mapRow(row: AssignmentRow): ApiAssignment {
  return {
    id: row.id,
    title: row.title,
    course: row.course,
    description: row.description,
    due: row.due,
    dueAt: row.due_at,
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

const submitSchema = z.object({
  body: z.string().trim().max(20_000, "Submission is too long.").optional(),
  file: z.string().trim().max(2_000, "Invalid file reference.").optional(),
  size: z.string().trim().max(100, "Invalid size.").optional(),
});

/** Student submits work for their own assignment. Creates/updates a submission row. */
assignments.post("/:id/submit", async (c) => {
  const user = c.get("authUser");
  const assignmentId = c.req.param("id");
  const input = await parseBody(c, submitSchema);
  const row = await c.env.DB.prepare(`${SELECT} WHERE user_id = ? AND id = ?`)
    .bind(user.id, assignmentId)
    .first<AssignmentRow>();
  if (!row) throw ApiError.notFound("Assignment not found.");
  if (row.status === "graded") {
    throw ApiError.conflict("This assignment has already been graded.");
  }

  const now = isoNow();
  // Only a machine-readable deadline can make a submission late; legacy
  // free-text dues ("Sun · 23:59") are never compared as strings.
  const late = row.due_at && row.due_at < now ? 1 : 0;
  const submissionId = crypto.randomUUID();
  await c.env.DB.prepare(
    `INSERT INTO submissions
       (id, user_id, student_user_id, assignment_id, student, title, submitted, status, late, file, size, feedback)
     VALUES (?, ?, ?, ?, ?, ?, ?, 'submitted', ?, ?, ?, '')`,
  )
    .bind(
      submissionId,
      // Route the submission to the authoring instructor's queue when known.
      row.created_by ?? user.id,
      user.id,
      assignmentId,
      user.name,
      row.title,
      now,
      late,
      input.file ?? "",
      input.size ?? "",
    )
    .run();

  const submissions = JSON.parse(row.submissions) as unknown[];
  submissions.push({
    at: now,
    file: input.file ?? "",
    size: input.size ?? "",
    body: input.body ?? "",
  });
  await c.env.DB.prepare(
    `UPDATE assignments SET status = 'submitted', submitted_at = ?, submissions = ? WHERE id = ?`,
  )
    .bind(now, JSON.stringify(submissions), assignmentId)
    .run();

  return c.json(
    {
      id: submissionId,
      assignmentId,
      status: "submitted",
      submittedAt: now,
      late: late === 1,
      file: input.file ?? "",
      size: input.size ?? "",
    },
    201,
  );
});

/** Student's own submission state for an assignment. */
assignments.get("/:id/submission", async (c) => {
  const user = c.get("authUser");
  const assignmentId = c.req.param("id");
  const row = await c.env.DB.prepare(
    `SELECT id, status, score, feedback, submitted, graded_at, late, file, size
       FROM submissions WHERE assignment_id = ? AND student_user_id = ?`,
  )
    .bind(assignmentId, user.id)
    .first<{
      id: string;
      status: string;
      score: number | null;
      feedback: string;
      submitted: string;
      graded_at: string | null;
      late: number;
      file: string;
      size: string;
    }>();
  if (!row) throw ApiError.notFound("No submission yet for this assignment.");
  return c.json({
    id: row.id,
    status: row.status,
    ...(row.score !== null ? { score: row.score } : {}),
    ...(row.feedback ? { feedback: row.feedback } : {}),
    submittedAt: row.submitted,
    ...(row.graded_at ? { gradedAt: row.graded_at } : {}),
    late: row.late === 1,
    file: row.file,
    size: row.size,
  });
});
