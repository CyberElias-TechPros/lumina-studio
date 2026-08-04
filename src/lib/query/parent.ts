import { useApiQuery } from "@/lib/query/hooks";
import type { Paginated } from "@/lib/api/types";
import {
  fetchParentStudents,
  fetchParentStudent,
  type ParentStudent,
  type ParentStudentDetail,
} from "@/lib/api/parent";

export const parentKeys = {
  students: ["parent", "students"] as const,
};

export function useParentStudents() {
  return useApiQuery<Paginated<ParentStudent>>(parentKeys.students, fetchParentStudents);
}

export function useParentStudent(studentId: string) {
  return useApiQuery<ParentStudentDetail>(
    [...parentKeys.students, studentId],
    () => fetchParentStudent(studentId),
    { enabled: Boolean(studentId) },
  );
}
