import { apiFetch } from "@/lib/api/client";
import type { Paginated } from "@/lib/api/types";
import type { InstructorGradebookRow, InstructorSubmission } from "@/data/learning";

export interface InstructorCourse {
  id: string;
  title: string;
  cohort: string;
  status: string;
  modules: {
    id: string;
    title: string;
    lessons: { title: string; type: string; status: string }[];
  }[];
}

export function fetchInstructorGradebook(): Promise<Paginated<InstructorGradebookRow>> {
  return apiFetch<Paginated<InstructorGradebookRow>>("/v1/instructor/gradebook");
}

export function fetchInstructorCourses(): Promise<Paginated<InstructorCourse>> {
  return apiFetch<Paginated<InstructorCourse>>("/v1/instructor/courses");
}

export function fetchInstructorCourse(slug: string): Promise<InstructorCourse> {
  return apiFetch<InstructorCourse>(`/v1/instructor/courses/${slug}`);
}

export function fetchInstructorAssignments(): Promise<Paginated<InstructorSubmission>> {
  return apiFetch<Paginated<InstructorSubmission>>("/v1/instructor/assignments");
}

export function fetchInstructorAssignment(id: string): Promise<InstructorSubmission> {
  return apiFetch<InstructorSubmission>(`/v1/instructor/assignments/${id}`);
}

export interface GradeResult {
  id: string;
  score: number;
  status: string;
  feedback?: string;
  gradedBy: string;
  gradedAt: string;
}

export function gradeSubmission(
  id: string,
  input: { score: number; feedback?: string },
): Promise<GradeResult> {
  return apiFetch<GradeResult>(`/v1/instructor/submissions/${id}`, {
    method: "PATCH",
    body: input,
  });
}
