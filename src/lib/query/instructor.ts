import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiQuery, usePaginatedQuery, flattenPages } from "@/lib/query/hooks";
import {
  fetchInstructorGradebook,
  fetchInstructorCourses,
  fetchInstructorCourse,
  fetchInstructorAssignments,
  fetchInstructorAssignment,
  gradeSubmission,
  type InstructorCourse,
} from "@/lib/api/instructor";
import type { InstructorGradebookRow, InstructorSubmission } from "@/data/learning";

export const instructorKeys = {
  gradebook: ["instructor", "gradebook"] as const,
  courses: ["instructor", "courses"] as const,
  course: (slug: string) => ["instructor", "courses", slug] as const,
  assignments: ["instructor", "assignments"] as const,
  assignment: (id: string) => ["instructor", "assignments", id] as const,
};

export function useInstructorGradebook() {
  return usePaginatedQuery<InstructorGradebookRow>(
    instructorKeys.gradebook,
    fetchInstructorGradebook,
  );
}

export function useInstructorGradebookRows(): InstructorGradebookRow[] {
  return flattenPages(useInstructorGradebook().data?.pages);
}

export function useInstructorCourses() {
  return usePaginatedQuery<InstructorCourse>(instructorKeys.courses, fetchInstructorCourses);
}

export function useInstructorCourse(slug: string) {
  return useApiQuery<InstructorCourse>(
    instructorKeys.course(slug),
    () => fetchInstructorCourse(slug),
    {
      enabled: slug.length > 0,
    },
  );
}

export function useInstructorAssignments() {
  return usePaginatedQuery<InstructorSubmission>(
    instructorKeys.assignments,
    fetchInstructorAssignments,
  );
}

export function useInstructorAssignment(id: string) {
  return useApiQuery<InstructorSubmission>(
    instructorKeys.assignment(id),
    () => fetchInstructorAssignment(id),
    {
      enabled: id.length > 0,
    },
  );
}

export function useGradeSubmission(submissionId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: { score: number; feedback?: string }) =>
      gradeSubmission(submissionId, input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: instructorKeys.assignment(submissionId) });
      void queryClient.invalidateQueries({ queryKey: instructorKeys.assignments });
    },
  });
}
