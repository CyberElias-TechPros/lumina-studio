import { Hono } from "hono";
import type { AppEnv } from "../types";
import { ApiError } from "../lib/errors";
import { requireAuth } from "../lib/auth";
import { buildCourse, loadEnrollmentPct, loadProgressMap } from "./courses";

interface StatsRow {
  lessons_this_week: number;
  lessons_goal: number;
  study_hours: string;
  streak_days: number;
  next_deadline_due: string | null;
  next_deadline_title: string | null;
}

function weeklyGoalNote(done: number, goal: number): string {
  const deficit = goal - done;
  return deficit <= 0
    ? `You've hit this week's goal of ${goal} lessons — great pace.`
    : `You're ${deficit} lesson${deficit === 1 ? "" : "s"} behind this week's goal of ${goal}. A short study block this evening closes the gap.`;
}

export const dashboard = new Hono<{ Bindings: AppEnv }>();

dashboard.get("/student", requireAuth, async (c) => {
  const user = c.get("authUser");
  if (user.roleKey !== "student") {
    throw ApiError.forbidden("Only students can access the student dashboard.");
  }

  const [enrollments, stats, progress] = await Promise.all([
    loadEnrollmentPct(c.env.DB, user.id),
    c.env.DB.prepare(
      `SELECT lessons_this_week, lessons_goal, study_hours, streak_days,
              next_deadline_due, next_deadline_title
         FROM student_stats WHERE user_id = ?`,
    )
      .bind(user.id)
      .first<StatsRow>(),
    loadProgressMap(c.env.DB, user.id),
  ]);

  const enrolledSlugs = [...enrollments.keys()];
  const placeholder = enrolledSlugs.map(() => "?").join(", ");
  const rows =
    enrolledSlugs.length > 0
      ? await c.env.DB.prepare(
          `SELECT slug, title, subtitle, cohort, instructor, tone, modules
             FROM courses WHERE slug IN (${placeholder})`,
        )
          .bind(...enrolledSlugs)
          .all<{
            slug: string;
            title: string;
            subtitle: string;
            cohort: string;
            instructor: string;
            tone: string;
            modules: string;
          }>()
      : { results: [] as Array<{
          slug: string;
          title: string;
          subtitle: string;
          cohort: string;
          instructor: string;
          tone: string;
          modules: string;
        }> };

  let totalLessons = 0;
  let doneLessons = 0;
  const courses = rows.results
    .map((row) => {
      const parsed = JSON.parse(row.modules) as {
        lessons: { id: string; title: string; status: string }[];
      }[];
      const count = parsed.reduce((n, m) => n + m.lessons.length, 0);
      totalLessons += count;
      const byLesson = progress.get(row.slug) ?? new Map<string, string>();
      const done = [...byLesson.values()].filter((s) => s === "done").length;
      doneLessons += done;
      const nextUp = parsed
        .flatMap((m) => m.lessons)
        .find((l) => byLesson.get(l.id) === "in-progress")?.title;
      return {
        ...buildCourse(
          {
            slug: row.slug,
            title: row.title,
            subtitle: row.subtitle,
            cohort: row.cohort,
            instructor: row.instructor,
            tone: row.tone,
            modules: row.modules,
          },
          enrollments.get(row.slug) ?? 0,
          byLesson,
        ),
        ...(nextUp ? { nextUp } : {}),
      };
    })
    .sort((a, b) => a.title.localeCompare(b.title));

  const pctValues = [...enrollments.values()];
  const overallProgress =
    pctValues.length > 0
      ? Math.round(pctValues.reduce((sum, p) => sum + p, 0) / pctValues.length)
      : 0;
  const lessonsThisWeek = stats?.lessons_this_week ?? 0;
  const lessonsGoal = stats?.lessons_goal ?? 8;

  return c.json({
    kpis: {
      enrolled: enrollments.size,
      overallProgress,
      lessonsThisWeek,
      lessonsGoal,
      studyHours: stats?.study_hours ?? "0h",
      streakDays: stats?.streak_days ?? 0,
    },
    summary: { doneLessons, totalLessons },
    weeklyGoal: {
      done: lessonsThisWeek,
      goal: lessonsGoal,
      note: weeklyGoalNote(lessonsThisWeek, lessonsGoal),
    },
    nextDeadline:
      stats?.next_deadline_due && stats?.next_deadline_title
        ? { due: stats.next_deadline_due, title: stats.next_deadline_title }
        : null,
    courses,
  });
});
