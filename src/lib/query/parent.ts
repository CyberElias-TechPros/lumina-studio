import { useApiQuery } from "@/lib/query/hooks";
import type { Paginated } from "@/lib/api/types";
import {
  fetchParentStudents,
  fetchParentStudent,
  fetchParentFinance,
  fetchParentAttendance,
  type ParentStudent,
  type ParentStudentDetail,
  type ParentFinance,
  type ParentAttendance,
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

export function useParentFinance(studentId: string) {
  return useApiQuery<ParentFinance>(
    [...parentKeys.students, studentId, "finance"],
    () => fetchParentFinance(studentId),
    { enabled: Boolean(studentId) },
  );
}

export function useParentAttendance(studentId: string) {
  return useApiQuery<ParentAttendance>(
    [...parentKeys.students, studentId, "attendance"],
    () => fetchParentAttendance(studentId),
    { enabled: Boolean(studentId) },
  );
}
