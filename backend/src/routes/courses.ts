import { Hono } from "hono";
import type { AppEnv } from "../types";
import { ApiError } from "../lib/errors";
import { base64UrlDecode, base64UrlEncode } from "../lib/crypto";
import { paginate, parsePagination, type Paginated } from "../lib/pagination";
import { requireAuth } from "../lib/auth";

export interface ApiLesson {
  id: string;
  title: string;
  type: string;
  duration: string;
  status: string;
  body?: string;
}

export interface ApiModule {
  id: string;
  title: string;
  lessons: ApiLesson[];
}

export interface ApiCourse {
  slug: string;
  title: string;
  subtitle: string;
  cohort: string;
  instructor: string;
  pct: number;
  tone: string;
  modules: ApiModule[];
}

interface CourseRow {
  slug: string;
  title: string;
  subtitle: string;
  cohort: string;
  instructor: string;
  tone: string;
  modules: string;
}

interface ProgressRow {
  course_slug: string;
  lesson_id: string;
  status: string;
}

const COURSE_SELECT = `
  SELECT slug, title, subtitle, cohort, instructor, tone, modules
    FROM courses
`;

/** Template statuses are 'preview' or 'locked'; progress overrides them. */
function mergeStatus(templateStatus: string, progressStatus: string | undefined): string {
  if (progressStatus) return progressStatus;
  return templateStatus === "preview" ? "preview" : "locked";
}

export async function loadProgressMap(
  db: AppEnv["DB"],
  userId: string,
): Promise<Map<string, Map<string, string>>> {
  const rows = await db
    .prepare(`SELECT course_slug, lesson_id, status FROM lesson_progress WHERE user_id = ?`)
    .bind(userId)
    .all<ProgressRow>();
  const map = new Map<string, Map<string, string>>();
  for (const row of rows.results) {
    const byLesson = map.get(row.course_slug) ?? new Map<string, string>();
    byLesson.set(row.lesson_id, row.status);
    map.set(row.course_slug, byLesson);
  }
  return map;
}

export function buildCourse(
  row: CourseRow,
  pct: number,
  progressByLesson: Map<string, string> | undefined,
): ApiCourse {
  const modules = JSON.parse(row.modules) as ApiModule[];
  for (const mod of modules) {
    for (const lesson of mod.lessons) {
      lesson.status = mergeStatus(lesson.status, progressByLesson?.get(lesson.id));
    }
  }
  return {
    slug: row.slug,
    title: row.title,
    subtitle: row.subtitle,
    cohort: row.cohort,
    instructor: row.instructor,
    pct,
    tone: row.tone,
    modules,
  };
}

export async function loadEnrollmentPct(
  db: AppEnv["DB"],
  userId: string,
): Promise<Map<string, number>> {
  const rows = await db
    .prepare(`SELECT course_slug, pct FROM enrollments WHERE user_id = ?`)
    .bind(userId)
    .all<{ course_slug: string; pct: number }>();
  return new Map(rows.results.map((r) => [r.course_slug, r.pct]));
}

export const courses = new Hono<{ Bindings: AppEnv }>();

courses.use("*", requireAuth);

courses.get("/", async (c) => {
  const { cursor, limit } = parsePagination(c);
  const userId = c.get("authUser").id;
  const total = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM courses`).first<{ n: number }>();
  const rows = await c.env.DB.prepare(
    `${COURSE_SELECT} ${cursor ? "WHERE slug > ?" : ""} ORDER BY slug ASC LIMIT ?`,
  )
    .bind(...(cursor ? [base64UrlDecode(cursor) ?? ""] : []), limit)
    .all<CourseRow>();
  const [enrollments, progress] = await Promise.all([
    loadEnrollmentPct(c.env.DB, userId),
    loadProgressMap(c.env.DB, userId),
  ]);
  const items = rows.results.map((row) =>
    buildCourse(row, enrollments.get(row.slug) ?? 0, progress.get(row.slug)),
  );
  const result: Paginated<ApiCourse> = paginate(items, total?.n ?? 0, (last) =>
    base64UrlEncode(last.slug),
  );
  return c.json(result);
});

// NOTE: /gradebook must stay registered before /:slug (Hono matches in order).
courses.get("/gradebook", async (c) => {  const user = c.get("authUser");
  if (user.roleKey !== "student") {
    throw ApiError.forbidden("Only students can access the gradebook.");
  }
  const { cursor, limit } = parsePagination(c);
  const total = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM gradebook WHERE user_id = ?`)
    .bind(user.id)
    .first<{ n: number }>();
  const rows = await c.env.DB.prepare(
    `SELECT course_name, units, letter, pct, trend, items
       FROM gradebook
      WHERE user_id = ? ${cursor ? "AND course_name > ?" : ""}
      ORDER BY course_name ASC LIMIT ?`,
  )
    .bind(user.id, ...(cursor ? [base64UrlDecode(cursor) ?? ""] : []), limit)
    .all<{
      course_name: string;
      units: number;
      letter: string;
      pct: number;
      trend: string;
      items: string;
    }>();
  const items = rows.results.map((r) => ({
    name: r.course_name,
    units: r.units,
    letter: r.letter,
    pct: r.pct,
    trend: r.trend,
    items: JSON.parse(r.items) as unknown,
  }));
  const result: Paginated<unknown> = paginate(items, total?.n ?? 0, (last) =>
    base64UrlEncode((last as { name: string }).name),
  );
  return c.json(result);
});

courses.get("/:slug", async (c) => {
  const userId = c.get("authUser").id;
  const row = await c.env.DB.prepare(`${COURSE_SELECT} WHERE slug = ?`)
    .bind(c.req.param("slug"))
    .first<CourseRow>();
  if (!row) throw ApiError.notFound("Course not found.");
  const [enrollments, progress] = await Promise.all([
    loadEnrollmentPct(c.env.DB, userId),
    loadProgressMap(c.env.DB, userId),
  ]);
  return c.json(buildCourse(row, enrollments.get(row.slug) ?? 0, progress.get(row.slug)));
});

/** Enroll the caller in a course. Idempotent per (user, course). */
courses.post("/:slug/enroll", async (c) => {
  const user = c.get("authUser");
  const slug = c.req.param("slug");
  const course = await c.env.DB.prepare(`SELECT slug FROM courses WHERE slug = ?`)
    .bind(slug)
    .first<{ slug: string }>();
  if (!course) throw ApiError.notFound("Course not found.");

  const existing = await c.env.DB.prepare(
    `SELECT id FROM enrollments WHERE user_id = ? AND course_slug = ?`,
  )
    .bind(user.id, slug)
    .first<{ id: string }>();
  if (existing) throw ApiError.conflict("You are already enrolled in this course.");

  await c.env.DB.prepare(
    `INSERT INTO enrollments (id, user_id, course_slug, pct, enrolled_at) VALUES (?, ?, ?, 0, ?)`,
  )
    .bind(crypto.randomUUID(), user.id, slug, new Date().toISOString())
    .run();
  return c.json({ ok: true, enrolled: true, courseSlug: slug }, 201);
});

/** Mark a lesson complete — updates progress, enrollment %, and weekly stats. */
courses.post("/:slug/lessons/:lessonId/complete", async (c) => {
  const user = c.get("authUser");
  const slug = c.req.param("slug");
  const lessonId = c.req.param("lessonId");
  const now = new Date().toISOString();

  const course = await c.env.DB.prepare(`${COURSE_SELECT} WHERE slug = ?`)
    .bind(slug)
    .first<CourseRow>();
  if (!course) throw ApiError.notFound("Course not found.");
  const modules = JSON.parse(course.modules) as ApiModule[];
  const lessonExists = modules.some((m) => m.lessons.some((l) => l.id === lessonId));
  if (!lessonExists) throw ApiError.notFound("Lesson not found in this course.");

  await c.env.DB.prepare(
    `INSERT INTO lesson_progress (id, user_id, course_slug, lesson_id, status, completed_at)
     VALUES (?, ?, ?, ?, 'done', ?)
     ON CONFLICT (user_id, course_slug, lesson_id) DO UPDATE SET status = 'done', completed_at = ?`,
  )
    .bind(crypto.randomUUID(), user.id, slug, lessonId, now, now)
    .run();

  const progress = await loadProgressMap(c.env.DB, user.id);
  const byLesson = progress.get(slug);
  const done = byLesson ? [...byLesson.values()].filter((s) => s === "done").length : 0;
  const total = modules.reduce((sum, m) => sum + m.lessons.length, 0);
  const pct = total > 0 ? Math.min(100, Math.round((done / total) * 100)) : 0;

  await c.env.DB.prepare(
    `INSERT INTO enrollments (id, user_id, course_slug, pct, enrolled_at) VALUES (?, ?, ?, ?, ?)
     ON CONFLICT (user_id, course_slug) DO UPDATE SET pct = excluded.pct`,
  )
    .bind(crypto.randomUUID(), user.id, slug, pct, now)
    .run();

  const weekAgo = new Date(Date.now() - 7 * 86_400_000).toISOString();
  const weekly = await c.env.DB.prepare(
    `SELECT COUNT(*) AS n FROM lesson_progress WHERE user_id = ? AND completed_at >= ? AND status = 'done'`,
  )
    .bind(user.id, weekAgo)
    .first<{ n: number }>();
  const streak = await computeStreak(c.env.DB, user.id);

  await c.env.DB.prepare(
    `INSERT INTO student_stats (user_id, lessons_this_week, streak_days) VALUES (?, ?, ?)
     ON CONFLICT (user_id) DO UPDATE SET lessons_this_week = excluded.lessons_this_week, streak_days = excluded.streak_days`,
  )
    .bind(user.id, weekly?.n ?? 0, streak)
    .run();

  return c.json({
    ok: true,
    pct,
    doneLessons: done,
    totalLessons: total,
    lessonsThisWeek: weekly?.n ?? 0,
    streakDays: streak,
  });
});

/** Consecutive days with at least one completed lesson, ending today (or yesterday). */
async function computeStreak(db: AppEnv["DB"], userId: string): Promise<number> {
  const rows = await db
    .prepare(
      `SELECT DISTINCT substr(completed_at, 1, 10) AS day FROM lesson_progress
        WHERE user_id = ? AND status = 'done' AND completed_at IS NOT NULL
        ORDER BY day DESC LIMIT 400`,
    )
    .bind(userId)
    .all<{ day: string }>();
  const days = new Set(rows.results.map((r) => r.day));
  let streak = 0;
  const cursor = new Date();
  if (!days.has(cursor.toISOString().slice(0, 10))) {
    cursor.setDate(cursor.getDate() - 1);
  }
  while (days.has(cursor.toISOString().slice(0, 10))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}
