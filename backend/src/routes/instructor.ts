import { Hono, type Context } from "hono";
import type { AppEnv } from "../types";
import { z } from "zod";
import { ApiError } from "../lib/errors";
import { base64UrlDecode, base64UrlEncode, isoNow, sha256Hex } from "../lib/crypto";
import { paginate, parsePagination, type Paginated } from "../lib/pagination";
import { requireAuth, requireAnyRole } from "../lib/auth";
import { parseBody } from "../lib/validate";
import { formatDueWat } from "../lib/due-dates";
import { sendUserSms } from "../lib/sms";

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
  const row = await c.env.DB.prepare(
    `SELECT s.id, s.student, s.title, s.submitted, s.status, s.score, s.late, s.file, s.size,
            s.body, s.feedback, a.max, a.rubric,
            CASE WHEN s.assignment_id IS NULL THEN 1 ELSE s.id = (
              SELECT id FROM submissions WHERE assignment_id = s.assignment_id AND student_user_id = s.student_user_id
              ORDER BY submitted DESC, rowid DESC LIMIT 1
            ) END AS is_latest
       FROM submissions s LEFT JOIN assignments a ON a.id = s.assignment_id AND a.user_id = s.student_user_id
      WHERE s.user_id = ? AND s.id = ?`,
  )
    .bind(c.get("authUser").id, c.req.param("id"))
    .first<
      SubmissionRow & {
        body: string;
        feedback: string;
        max: number | null;
        rubric: string | null;
        is_latest: number;
      }
    >();
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
    body: row.body,
    feedback: row.feedback,
    max: row.max,
    rubric: row.rubric ? JSON.parse(row.rubric) : [],
    isLatest: row.is_latest === 1,
  });
});

const gradeSchema = z.object({
  score: z.number().int().min(0, "Score must be 0 or more.").max(10_000, "Score is too large."),
  feedback: z.string().trim().max(5_000, "Feedback is too long.").optional(),
});

/**
 * Grade a submission (instructor/admin). The grader must own the submission
 * as recorded by the submission handoff; course titles are not authorization.
 */
async function gradeSubmissionHandler(c: Context<{ Bindings: AppEnv }>) {
  const grader = c.get("authUser");
  const { score, feedback } = await parseBody(c, gradeSchema);
  const id = c.req.param("id");

  const sub = await c.env.DB.prepare(
    `SELECT s.id, s.user_id, s.student_user_id, s.assignment_id, s.status,
            a.id AS linked_assignment, a.max AS assignment_max, a.course AS assignment_course
       FROM submissions s
       LEFT JOIN assignments a ON a.id = s.assignment_id AND a.user_id = s.student_user_id
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
      assignment_max: number | null;
      assignment_course: string | null;
    }>();
  if (!sub) throw ApiError.notFound("Submission not found.");
  if (sub.assignment_id && !sub.linked_assignment) {
    throw ApiError.conflict(
      "This submission needs assignment ownership reconciliation before grading.",
    );
  }

  if (sub.user_id !== grader.id) {
    throw ApiError.forbidden("This submission is not assigned to you.");
  }

  if (sub.assignment_max !== null && score > sub.assignment_max) {
    throw ApiError.validation({ score: [`Score must not exceed ${sub.assignment_max}.`] });
  }
  const now = isoNow();
  // Grade only the latest attempt, rechecked atomically with the assignment update.
  const results = await c.env.DB.batch([
    c.env.DB.prepare(
      `UPDATE submissions SET score = ?, feedback = ?, status = 'graded', graded_by = ?, graded_at = ?
       WHERE id = ? AND (assignment_id IS NULL OR id = (
         SELECT id FROM submissions WHERE assignment_id = ? AND student_user_id = ?
         ORDER BY submitted DESC, rowid DESC LIMIT 1
       ))`,
    ).bind(score, feedback ?? "", grader.id, now, id, sub.assignment_id, sub.student_user_id),
    c.env.DB.prepare(
      `UPDATE assignments SET score = ?, status = 'graded' WHERE id = ?
       AND EXISTS (SELECT 1 FROM submissions WHERE id = ? AND graded_at = ? AND graded_by = ?)
       AND ? = (SELECT id FROM submissions WHERE assignment_id = ? AND student_user_id = ?
         ORDER BY submitted DESC, rowid DESC LIMIT 1)`,
    ).bind(
      score,
      sub.linked_assignment,
      id,
      now,
      grader.id,
      id,
      sub.assignment_id,
      sub.student_user_id,
    ),
  ]);
  if (results[0]?.meta.changes !== 1)
    throw ApiError.conflict("A newer submission exists. Refresh the grading queue before grading.");

  return c.json({
    id,
    score,
    status: "graded",
    ...(feedback ? { feedback } : {}),
    gradedBy: grader.id,
    gradedAt: now,
  });
}

instructor.patch("/submissions/:id", requireAuth, requireInstructorOrAdmin, gradeSubmissionHandler);
instructor.post(
  "/submissions/:id/grade",
  requireAuth,
  requireInstructorOrAdmin,
  gradeSubmissionHandler,
);

/* Explicit, administrator-confirmed roster grants. These do not infer cohort
 * membership from course names or existing instructor_courses records. */
const rosterInput = z.object({
  instructorId: z.string().trim().min(1).max(200),
  studentId: z.string().trim().min(1).max(200),
  courseSlug: z.string().trim().min(1).max(200),
  active: z.boolean(),
  expiresAt: z.string().optional(),
});
instructor.get("/assignment-roster", requireAnyRole(["admin"]), async (c) => {
  const query = z
    .object({
      instructorId: z.string().min(1).max(200),
      studentId: z.string().min(1).max(200),
      courseSlug: z.string().min(1).max(200),
    })
    .safeParse(c.req.query());
  if (!query.success) throw ApiError.validation({});
  const row = await c.env.DB.prepare(
    `SELECT active, expires_at, changed_at FROM assignment_roster_grants
    WHERE instructor_id = ? AND student_id = ? AND course_slug = ?`,
  )
    .bind(query.data.instructorId, query.data.studentId, query.data.courseSlug)
    .first<{ active: number; expires_at: string; changed_at: string }>();
  return c.json({
    grant: row
      ? {
          active: row.active === 1 && row.expires_at > isoNow(),
          expiresAt: row.expires_at,
          changedAt: row.changed_at,
        }
      : null,
  });
});
instructor.put("/assignment-roster", requireAnyRole(["admin"]), async (c) => {
  const input = await parseBody(c, rosterInput);
  const actor = c.get("authUser").id;
  const now = isoNow();
  const operationId = crypto.randomUUID();
  const expiresAt = input.expiresAt ? new Date(input.expiresAt) : null;
  if (
    input.active &&
    (!expiresAt ||
      Number.isNaN(expiresAt.getTime()) ||
      expiresAt.getTime() <= Date.now() ||
      expiresAt.getTime() > Date.now() + 366 * 86400000)
  ) {
    throw ApiError.validation({ expiresAt: ["Choose an expiration within the next year."] });
  }
  const expiry = input.active ? expiresAt!.toISOString() : "";
  const results = await c.env.DB.batch([
    c.env.DB.prepare(
      `INSERT INTO assignment_roster_grants
      (instructor_id, student_id, course_slug, active, expires_at, changed_by, changed_at, operation_id)
      SELECT ?, ?, ?, ?, ?, ?, ?, ?
      WHERE (? = 0 AND EXISTS (SELECT 1 FROM assignment_roster_grants
                WHERE instructor_id = ? AND student_id = ? AND course_slug = ?))
         OR (? = 1 AND EXISTS (SELECT 1 FROM users t WHERE t.id = ? AND t.role_key = 'instructor' AND t.status = 'active')
             AND EXISTS (SELECT 1 FROM users s JOIN enrollments e ON e.user_id = s.id
                          WHERE s.id = ? AND s.role_key = 'student' AND s.status = 'active' AND e.course_slug = ?))
      ON CONFLICT(instructor_id, student_id, course_slug) DO UPDATE SET
        active = excluded.active, expires_at = excluded.expires_at, changed_by = excluded.changed_by,
        changed_at = excluded.changed_at, operation_id = excluded.operation_id`,
    ).bind(
      input.instructorId,
      input.studentId,
      input.courseSlug,
      input.active ? 1 : 0,
      expiry,
      actor,
      now,
      operationId,
      input.active ? 1 : 0,
      input.instructorId,
      input.studentId,
      input.courseSlug,
      input.active ? 1 : 0,
      input.instructorId,
      input.studentId,
      input.courseSlug,
    ),
    c.env.DB.prepare(
      `INSERT INTO assignment_roster_events
      (id, instructor_id, student_id, course_slug, active, expires_at, actor_id, occurred_at)
      SELECT operation_id, instructor_id, student_id, course_slug, active, expires_at, changed_by, changed_at
      FROM assignment_roster_grants WHERE operation_id = ?`,
    ).bind(operationId),
  ]);
  if (!results[0]?.meta.changes)
    throw ApiError.conflict("Roster entry not found or accounts and enrollment are not eligible.");
  return c.json({ ok: true });
});

instructor.get("/assignment-roster/courses", async (c) => {
  const rows = await c.env.DB.prepare(
    `SELECT c.slug, c.title, COUNT(*) AS recipients
    FROM assignment_roster_grants r JOIN courses c ON c.slug = r.course_slug
    JOIN users s ON s.id = r.student_id AND s.role_key = 'student' AND s.status = 'active'
    JOIN enrollments e ON e.user_id = s.id AND e.course_slug = c.slug
    WHERE r.instructor_id = ? AND r.active = 1 AND r.expires_at > ?
    GROUP BY c.slug, c.title ORDER BY c.title, c.slug LIMIT 201`,
  )
    .bind(c.get("authUser").id, isoNow())
    .all<{ slug: string; title: string; recipients: number }>();
  return c.json({ items: rows.results.slice(0, 200), truncated: rows.results.length > 200 });
});

/* ---------------- Publish assignments (schedulable deadlines) ---------------- */

const publishAssignmentSchema = z.object({
  idempotencyKey: z.string().uuid().optional(),
  courseSlug: z.string().trim().min(1, "Choose a course."),
  title: z.string().trim().min(3, "Title must be at least 3 characters.").max(200),
  description: z.string().trim().max(10_000).optional().default(""),
  dueAt: z
    .string()
    .trim()
    .refine((v) => !Number.isNaN(Date.parse(v)), "Enter a valid due date and time."),
  max: z.number().int().min(1).max(1000).optional().default(100),
  weight: z.number().int().min(0).max(100).optional().default(0),
  notify: z.boolean().optional().default(true),
});

/**
 * Publish to an instructor's confirmed roster or an admin's eligible course enrollments.
 * Each student gets their own row (the student LMS reads per-user rows) sharing a group_id,
 * with a machine-readable `due_at` that drives reminders and lateness.
 */
instructor.post("/assignments", requireAuth, requireInstructorOrAdmin, async (c) => {
  const author = c.get("authUser");
  const input = await parseBody(c, publishAssignmentSchema);
  const dueAt = new Date(input.dueAt).toISOString();
  const requestKey = input.idempotencyKey ?? crypto.randomUUID();
  const requestHash = await sha256Hex(
    JSON.stringify({
      courseSlug: input.courseSlug,
      title: input.title,
      description: input.description,
      dueAt,
      max: input.max,
      weight: input.weight,
      notify: input.notify,
    }),
  );
  type Publication = {
    request_hash: string;
    group_id: string;
    recipients: number;
    due: string;
    due_at: string;
    course_title: string;
  };
  const existing = await c.env.DB.prepare(
    `SELECT request_hash,group_id,recipients,due,due_at,course_title FROM assignment_publications WHERE author_id=? AND request_key=?`,
  )
    .bind(author.id, requestKey)
    .first<Publication>();
  const responseFor = (row: Publication) => {
    if (row.request_hash !== requestHash)
      throw ApiError.conflict(
        "This publication reference was already used for different details. Reconcile the original before starting a new assignment.",
      );
    return c.json(
      {
        groupId: row.group_id,
        recipients: row.recipients,
        due: row.due,
        dueAt: row.due_at,
        course: row.course_title,
      },
      201,
    );
  };
  if (existing) return responseFor(existing);
  if (dueAt <= isoNow()) {
    throw ApiError.validation({ dueAt: ["The due date must be in the future."] });
  }
  const course = await c.env.DB.prepare(`SELECT slug, title FROM courses WHERE slug = ?`)
    .bind(input.courseSlug)
    .first<{ slug: string; title: string }>();
  if (!course) throw ApiError.validation({ courseSlug: ["That course does not exist."] });

  // Each publication is a single D1 transaction, including inbox notifications.
  // Do not infer current cohort membership or teaching relationships from titles.
  const groupId = `asg-${crypto.randomUUID()}`;
  const due = formatDueWat(dueAt);
  const now = isoNow();
  const statements = [
    c.env.DB.prepare(
      `INSERT INTO assignment_publications (author_id,request_key,request_hash,group_id,course_title,due,due_at,created_at)
      VALUES (?,?,?,?,?,?,?,?) ON CONFLICT(author_id,request_key) DO NOTHING`,
    ).bind(author.id, requestKey, requestHash, groupId, course.title, due, dueAt, now),
    c.env.DB.prepare(
      `INSERT INTO assignments
         (id, user_id, title, course, description, due, due_at, group_id, created_by, status, max, weight)
       SELECT ? || '-' || e.user_id, e.user_id, ?, ?, ?, ?, ?, ?, ?, 'pending', ?, ?
         FROM enrollments e JOIN users u ON u.id = e.user_id
        WHERE e.course_slug = ? AND u.status = 'active' AND u.role_key = 'student'
          AND EXISTS (SELECT 1 FROM assignment_publications WHERE group_id = ?)
          AND (? = 1 OR EXISTS (SELECT 1 FROM assignment_roster_grants r
            WHERE r.instructor_id = ? AND r.student_id = e.user_id AND r.course_slug = e.course_slug AND r.active = 1 AND r.expires_at > ?))
          AND (SELECT COUNT(*) FROM enrollments en JOIN users un ON un.id = en.user_id
                WHERE en.course_slug = ? AND un.status = 'active' AND un.role_key = 'student'
                  AND (? = 1 OR EXISTS (SELECT 1 FROM assignment_roster_grants rn
                    WHERE rn.instructor_id = ? AND rn.student_id = en.user_id AND rn.course_slug = en.course_slug AND rn.active = 1 AND rn.expires_at > ?))) <= 500`,
    ).bind(
      groupId,
      input.title,
      course.title,
      input.description,
      due,
      dueAt,
      groupId,
      author.id,
      input.max,
      input.weight,
      course.slug,
      groupId,
      author.roleKey === "admin" ? 1 : 0,
      author.id,
      now,
      course.slug,
      author.roleKey === "admin" ? 1 : 0,
      author.id,
      now,
    ),
  ];
  if (input.notify) {
    statements.push(
      c.env.DB.prepare(
        `INSERT INTO notifications (id, user_id, title, body, time, engine)
       SELECT 'ntf-' || lower(hex(randomblob(16))), user_id, ?, ?, ?, 'learning'
         FROM assignments WHERE group_id = ?`,
      ).bind(`New assignment: ${input.title}`, `${course.title} · due ${due} WAT`, now, groupId),
    );
  }
  statements.push(
    c.env.DB.prepare(
      `UPDATE assignment_publications SET recipients=(SELECT COUNT(*) FROM assignments WHERE group_id=?) WHERE group_id=?`,
    ).bind(groupId, groupId),
    c.env.DB.prepare(`DELETE FROM assignment_publications WHERE group_id=? AND recipients=0`).bind(
      groupId,
    ),
  );
  const results = await c.env.DB.batch(statements);
  const recipientCount = results[1]?.meta.changes ?? 0;
  if (recipientCount === 0) {
    const prior = await c.env.DB.prepare(
      `SELECT request_hash,group_id,recipients,due,due_at,course_title FROM assignment_publications WHERE author_id=? AND request_key=?`,
    )
      .bind(author.id, requestKey)
      .first<Publication>();
    if (prior) return responseFor(prior);
    throw ApiError.conflict(
      "No eligible learners, or this course exceeds the 500-recipient limit. Review enrollments before publishing.",
    );
  }

  if (input.notify) {
    // Only send generic SMS hints and limit concurrency. Provider acceptance is
    // not delivery; SMS is outside the database transaction and may fail.
    const task = (async () => {
      const recipients = await c.env.DB.prepare(
        "SELECT user_id FROM assignments WHERE group_id = ?",
      )
        .bind(groupId)
        .all<{ user_id: string }>();
      for (let i = 0; i < recipients.results.length; i += 10) {
        await Promise.allSettled(
          recipients.results
            .slice(i, i + 10)
            .map((recipient) =>
              sendUserSms(
                c.env,
                recipient.user_id,
                "CEA: You have a new assignment. Sign in to view details.",
              ),
            ),
        );
      }
    })().catch(() => undefined);
    try {
      c.executionCtx.waitUntil(task);
    } catch {
      await task;
    }
  }

  return c.json({ groupId, recipients: recipientCount, due, dueAt, course: course.title }, 201);
});

/** A signed-in author can recover a committed publication after losing a response. */
instructor.get(
  "/assignment-publications/:key",
  requireAuth,
  requireInstructorOrAdmin,
  async (c) => {
    const parsed = z.string().uuid().safeParse(c.req.param("key"));
    if (!parsed.success) throw ApiError.validation({ key: ["Invalid publication reference."] });
    const row = await c.env.DB.prepare(
      `SELECT group_id,recipients,due,due_at,course_title FROM assignment_publications WHERE author_id=? AND request_key=?`,
    )
      .bind(c.get("authUser").id, parsed.data)
      .first<{
        group_id: string;
        recipients: number;
        due: string;
        due_at: string;
        course_title: string;
      }>();
    return c.json({
      publication: row
        ? {
            groupId: row.group_id,
            recipients: row.recipients,
            due: row.due,
            dueAt: row.due_at,
            course: row.course_title,
          }
        : null,
    });
  },
);

/** Move a published assignment's deadline (all recipients). Resets reminders. */
instructor.patch(
  "/assignments/groups/:groupId",
  requireAuth,
  requireInstructorOrAdmin,
  async (c) => {
    const author = c.get("authUser");
    const { dueAt: raw } = await parseBody(
      c,
      z.object({
        dueAt: z.string().refine((v) => !Number.isNaN(Date.parse(v)), "Enter a valid date."),
      }),
    );
    const dueAt = new Date(raw).toISOString();
    const groupId = c.req.param("groupId");
    const exists = await c.env.DB.prepare(`SELECT 1 FROM assignments WHERE group_id = ? LIMIT 1`)
      .bind(groupId)
      .first();
    if (!exists) throw ApiError.notFound("Assignment not found.");
    // Check the entire group inside both statements' transaction. A single
    // foreign or unowned legacy row makes an instructor edit fail closed.
    const isAdmin = author.roleKey === "admin" ? 1 : 0;
    const guard = `(? = 1 OR NOT EXISTS (
      SELECT 1 FROM assignments a WHERE a.group_id = ? AND a.created_by IS NOT ?
    ))`;
    const results = await c.env.DB.batch([
      c.env.DB.prepare(
        `UPDATE assignments SET due_at = ?, due = ? WHERE group_id = ? AND ${guard}`,
      ).bind(dueAt, formatDueWat(dueAt), groupId, isAdmin, groupId, author.id),
      c.env.DB.prepare(
        `DELETE FROM assignment_reminders WHERE assignment_id IN (SELECT id FROM assignments WHERE group_id = ?) AND ${guard}`,
      ).bind(groupId, isAdmin, groupId, author.id),
    ]);
    if (!results[0]?.meta.changes) {
      throw ApiError.forbidden(
        "Only the author of every assignment in this group can change its deadline.",
      );
    }
    return c.json({ groupId, dueAt, due: formatDueWat(dueAt) });
  },
);
