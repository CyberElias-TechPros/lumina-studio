import { useApiQuery, usePaginatedQuery, flattenPages } from "@/lib/query/hooks";
import { fetchAssessments, fetchAssessment } from "@/lib/api/assessments";
import type { Assessment } from "@/data/learning";

export const assessmentKeys = {
  all: ["assessments"] as const,
  detail: (id: string) => ["assessments", id] as const,
};

export function useAssessments() {
  return usePaginatedQuery<Assessment>(assessmentKeys.all, fetchAssessments);
}

export function useAssessment(id: string) {
  return useApiQuery<Assessment>(assessmentKeys.detail(id), () => fetchAssessment(id), {
    enabled: id.length > 0,
  });
}

export function useAssessmentItems(): Assessment[] {
  return flattenPages(useAssessments().data?.pages);
}
