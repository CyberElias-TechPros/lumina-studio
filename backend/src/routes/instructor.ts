import { Hono } from "hono";
import type { AppEnv } from "../types";
import { z } from "zod";
import { ApiError } from "../lib/errors";
import { base64UrlDecode, base64UrlEncode, isoNow } from "../lib/crypto";
import { paginate, parsePagination, type Paginated } from "../lib/pagination";
import { requireAuth, requireAnyRole } from "../lib/auth";
import { parseBody } from "../lib/validate";

const requireInstructorOrAdmin = requireAnyRole(["instructor", "admin"]);

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

instructor.use("*", requireAuth, requireAnyRole(["instructor", "admin"]));

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

const createLessonSchema = z.object({
  moduleId: z.string().trim().min(1, "Module is required.").max(100),
  title: z.string().trim().min(1, "Lesson title is required.").max(200),
  type: z.enum(["video", "live", "reading", "lab", "article", "quiz", "assignment"]),
  duration: z.string().trim().max(40).optional(),
  videoUrl: z.string().trim().url("Video URL must be a valid URL.").max(2_000).optional(),
  materials: z.string().trim().max(10_000).optional(),
  published: z.boolean().default(false),
});

/** Instructor/admin: append a lesson to one of the caller's course modules. */
instructor.post("/courses/:slug/lessons", async (c) => {
  const userId = c.get("authUser").id;
  const body = await parseBody(c, createLessonSchema);
  const row = await c.env.DB.prepare(
    `SELECT id, title, cohort, status, modules FROM instructor_courses
      WHERE user_id = ? AND id = ?`,
  )
    .bind(userId, c.req.param("slug"))
    .first<CourseRow>();
  if (!row) throw ApiError.notFound("Course not found.");

  const modules = JSON.parse(row.modules) as Array<{
    id: string;
    title: string;
    lessons: Array<Record<string, unknown>>;
  }>;
  const module = modules.find((candidate) => candidate.id === body.moduleId);
  if (!module) throw ApiError.notFound("Module not found in this course.");

  const lesson = {
    id: `lesson-${crypto.randomUUID()}`,
    title: body.title,
    type: body.type,
    duration: body.duration ?? "",
    status: body.published ? "published" : "draft",
    ...(body.videoUrl ? { videoUrl: body.videoUrl } : {}),
    ...(body.materials ? { materials: body.materials } : {}),
  };
  module.lessons.push(lesson);
  await c.env.DB.prepare(`UPDATE instructor_courses SET modules = ? WHERE id = ? AND user_id = ?`)
    .bind(JSON.stringify(modules), row.id, userId)
    .run();

  return c.json(
    {
      ok: true,
      courseId: row.id,
      moduleId: body.moduleId,
      lesson,
    },
    201,
  );
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

const gradeSchema = z.object({
  score: z.number().int().min(0, "Score must be 0 or more.").max(10_000, "Score is too large."),
  feedback: z.string().trim().max(5_000, "Feedback is too long.").optional(),
});

/**
 * Grade a submission (instructor/admin). The grader must own the submission
 * or teach a course the submitting student is enrolled in.
 */
instructor.patch("/submissions/:id", requireAuth, requireInstructorOrAdmin, async (c) => {
  const grader = c.get("authUser");
  const { score, feedback } = await parseBody(c, gradeSchema);
  const id = c.req.param("id");

  const sub = await c.env.DB.prepare(
    `SELECT s.id, s.user_id, s.student_user_id, s.assignment_id, s.status,
            a.id AS linked_assignment
       FROM submissions s
       LEFT JOIN assignments a ON a.id = s.assignment_id
      WHERE s.id = ?`,
  )
    .bind(id)
    .first<{
      id: string;
      user_id: string;
      student_user_id: string | null;
      assignment_id: string | null;
      status: string;
      linked_assignment: string | null;
    }>();
  if (!sub) throw ApiError.notFound("Submission not found.");

  const teaches = sub.student_user_id
    ? await c.env.DB.prepare(
        `SELECT 1 FROM enrollments e
           JOIN courses c ON c.slug = e.course_slug
           JOIN instructor_courses ic ON ic.user_id = ? AND ic.title = c.title
          WHERE e.user_id = ? LIMIT 1`,
      )
        .bind(grader.id, sub.student_user_id)
        .first<{ "1": number }>()
    : null;
  if (sub.user_id !== grader.id && !teaches) {
    throw ApiError.forbidden("You don't teach this student's course.");
  }

  const now = isoNow();
  await c.env.DB.prepare(
    `UPDATE submissions SET score = ?, feedback = ?, status = 'graded', graded_by = ?, graded_at = ?
      WHERE id = ?`,
  )
    .bind(score, feedback ?? "", grader.id, now, id)
    .run();
  if (sub.linked_assignment) {
    await c.env.DB.prepare(`UPDATE assignments SET score = ?, status = 'graded' WHERE id = ?`)
      .bind(score, sub.linked_assignment)
      .run();
  }
  return c.json({
    id,
    score,
    status: "graded",
    ...(feedback ? { feedback } : {}),
    gradedBy: grader.id,
    gradedAt: now,
  });
});
