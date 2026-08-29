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

export interface CreateInstructorLessonInput {
  moduleId: string;
  title: string;
  type: "video" | "live" | "reading" | "lab" | "article" | "quiz" | "assignment";
  duration?: string;
  videoUrl?: string;
  materials?: string;
  published: boolean;
}

export interface CreateInstructorLessonResult {
  ok: boolean;
  courseId: string;
  moduleId: string;
  lesson: {
    id: string;
    title: string;
    type: string;
    duration: string;
    status: string;
  };
}

export function createInstructorLesson(
  courseId: string,
  input: CreateInstructorLessonInput,
): Promise<CreateInstructorLessonResult> {
  return apiFetch<CreateInstructorLessonResult>(`/v1/instructor/courses/${courseId}/lessons`, {
    method: "POST",
    body: input,
  });
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
