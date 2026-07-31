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
