import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiQuery, usePaginatedQuery, flattenPages } from "@/lib/query/hooks";
import {
  fetchAssignments,
  fetchAssignment,
  fetchAssignmentSubmission,
  submitAssignment,
} from "@/lib/api/assignments";
import type { StudentAssignment } from "@/data/learning";

export const assignmentKeys = {
  all: ["assignments"] as const,
  detail: (id: string) => ["assignments", id] as const,
  submission: (id: string) => ["assignments", id, "submission"] as const,
};

export function useAssignments() {
  return usePaginatedQuery<StudentAssignment>(assignmentKeys.all, fetchAssignments);
}

export function useAssignment(id: string) {
  return useApiQuery<StudentAssignment>(assignmentKeys.detail(id), () => fetchAssignment(id), {
    enabled: id.length > 0,
  });
}

export function useAssignmentItems(): StudentAssignment[] {
  return flattenPages(useAssignments().data?.pages);
}

export function useAssignmentSubmission(id: string) {
  return useApiQuery(assignmentKeys.submission(id), () => fetchAssignmentSubmission(id), {
    enabled: id.length > 0,
  });
}

export function useSubmitAssignment(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: { body?: string; file?: string; size?: string }) =>
      submitAssignment(id, input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: assignmentKeys.detail(id) });
      void queryClient.invalidateQueries({ queryKey: assignmentKeys.submission(id) });
      void queryClient.invalidateQueries({ queryKey: assignmentKeys.all });
    },
  });
}
