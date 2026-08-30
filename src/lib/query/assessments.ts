import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiQuery, usePaginatedQuery, flattenPages } from "@/lib/query/hooks";
import {
  fetchAssessments,
  fetchAssessment,
  fetchAssessmentAttempts,
  submitAssessment,
} from "@/lib/api/assessments";
import type { Assessment } from "@/data/learning";

export const assessmentKeys = {
  all: ["assessments"] as const,
  detail: (id: string) => ["assessments", id] as const,
  attempts: (id: string) => ["assessments", id, "attempts"] as const,
};

export function useAssessments() {
  return usePaginatedQuery<Assessment>(assessmentKeys.all, fetchAssessments);
}

export function useAssessment(id: string) {
  return useApiQuery<Assessment>(assessmentKeys.detail(id), () => fetchAssessment(id), {
    enabled: id.length > 0,
  });
}

export function useAssessmentAttempts(id: string) {
  return useApiQuery(assessmentKeys.attempts(id), () => fetchAssessmentAttempts(id), {
    enabled: id.length > 0,
  });
}

export function useAssessmentItems(): Assessment[] {
  return flattenPages(useAssessments().data?.pages);
}

export function useSubmitAssessment(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (answers: number[]) => submitAssessment(id, answers),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: assessmentKeys.detail(id) });
      void queryClient.invalidateQueries({ queryKey: assessmentKeys.all });
    },
  });
}
