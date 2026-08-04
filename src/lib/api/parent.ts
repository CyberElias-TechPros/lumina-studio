import { apiFetch } from "@/lib/api/client";
import type { Paginated } from "@/lib/api/types";

export interface ParentStudent {
  studentId: string;
  name: string;
  email: string;
  course: string;
  courseDetail: string;
  pct: number;
  gpa: string;
  due: number;
  dueCount: number;
}

export interface ParentCourse {
  slug: string;
  title: string;
  cohort: string;
  pct: number;
}

export interface GradebookRow {
  courseName: string;
  units: number;
  letter: string;
  pct: number;
  trend: string;
  items: unknown;
}

export interface ParentStudentDetail {
  studentId: string;
  name: string;
  email: string;
  gpa: string;
  due: number;
  dueCount: number;
  courses: ParentCourse[];
  gradebook: GradebookRow[];
}

/** Parent endpoint — every learner linked to the current parent. */
export function fetchParentStudents(): Promise<Paginated<ParentStudent>> {
  return apiFetch<Paginated<ParentStudent>>("/v1/parent/students");
}

/** Parent endpoint — full profile + gradebook for one linked learner. */
export function fetchParentStudent(studentId: string): Promise<ParentStudentDetail> {
  return apiFetch<ParentStudentDetail>(`/v1/parent/students/${studentId}`);
}
