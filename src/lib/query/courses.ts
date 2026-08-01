import { useApiQuery, usePaginatedQuery, flattenPages } from "@/lib/query/hooks";
import { fetchCourses, fetchCourse, fetchGradebook } from "@/lib/api/courses";
import type { LearningCourse, GradebookCourse } from "@/data/learning";

export const courseKeys = {
  all: ["courses"] as const,
  detail: (slug: string) => ["courses", slug] as const,
  gradebook: ["courses", "gradebook"] as const,
};

/** Catalog of courses with the current user's progress merged. */
export function useCourses() {
  return usePaginatedQuery<LearningCourse>(courseKeys.all, fetchCourses);
}

/** Single course detail. */
export function useCourse(slug: string) {
  return useApiQuery<LearningCourse>(courseKeys.detail(slug), () => fetchCourse(slug), {
    enabled: slug.length > 0,
  });
}

/** Student gradebook rows. */
export function useGradebook() {
  return usePaginatedQuery<GradebookCourse>(courseKeys.gradebook, fetchGradebook);
}

export function useGradebookItems(): GradebookCourse[] {
  return flattenPages(useGradebook().data?.pages);
}
