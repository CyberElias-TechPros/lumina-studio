import { apiFetch } from "@/lib/api/client";
import type { Paginated } from "@/lib/api/types";
import type { LearningCourse, GradebookCourse } from "@/data/learning";

export function fetchCourses(): Promise<Paginated<LearningCourse>> {
  return apiFetch<Paginated<LearningCourse>>("/v1/courses");
}

export function fetchCourse(slug: string): Promise<LearningCourse> {
  return apiFetch<LearningCourse>(`/v1/courses/${slug}`);
}

export function fetchGradebook(): Promise<Paginated<GradebookCourse>> {
  return apiFetch<Paginated<GradebookCourse>>("/v1/courses/gradebook");
}

export interface LessonCompletion {
  ok: boolean;
  pct: number;
  doneLessons: number;
  totalLessons: number;
  lessonsThisWeek: number;
  streakDays: number;
}

export async function completeLesson(course: string, lesson: string): Promise<LessonCompletion> {
  const result = await apiFetch<LessonCompletion>(
    `/v1/courses/${encodeURIComponent(course)}/lessons/${encodeURIComponent(lesson)}/complete`,
    { method: "POST", body: {} },
  );
  if (result.ok !== true)
    throw new Error("Completion was not confirmed. Refresh before trying again.");
  return result;
}
