import { useApiQuery, usePaginatedQuery, flattenPages } from "@/lib/query/hooks";
import { fetchAssignments, fetchAssignment } from "@/lib/api/assignments";
import type { StudentAssignment } from "@/data/learning";

export const assignmentKeys = {
  all: ["assignments"] as const,
  detail: (id: string) => ["assignments", id] as const,
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
