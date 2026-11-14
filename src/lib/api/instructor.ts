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

export function fetchInstructorAssignments(
  cursor?: string,
): Promise<Paginated<InstructorSubmission>> {
  return apiFetch<Paginated<InstructorSubmission>>("/v1/instructor/assignments", {
    query: { cursor },
  });
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

export interface PublishAssignmentInput {
  idempotencyKey?: string;
  courseSlug: string;
  title: string;
  description?: string;
  /** ISO timestamp (UTC). */
  dueAt: string;
  max?: number;
  weight?: number;
  notify?: boolean;
}

export interface PublishAssignmentResult {
  groupId: string;
  recipients: number;
  due: string;
  dueAt: string;
  course: string;
}

/** Instructors publish to their confirmed roster; admins publish course-wide. */
export function publishAssignment(input: PublishAssignmentInput): Promise<PublishAssignmentResult> {
  return apiFetch<PublishAssignmentResult>("/v1/instructor/assignments", {
    method: "POST",
    body: input,
  });
}

export function fetchAssignmentPublication(
  key: string,
): Promise<{ publication: PublishAssignmentResult | null }> {
  return apiFetch(`/v1/instructor/assignment-publications/${encodeURIComponent(key)}`);
}

export interface AssignmentRosterCourse {
  slug: string;
  title: string;
  recipients: number;
}
export function fetchAssignmentRosterCourses(): Promise<{
  items: AssignmentRosterCourse[];
  truncated: boolean;
}> {
  return apiFetch("/v1/instructor/assignment-roster/courses");
}
export interface AssignmentRosterKey {
  instructorId: string;
  studentId: string;
  courseSlug: string;
}
export function fetchAssignmentRosterGrant(
  input: AssignmentRosterKey,
): Promise<{ grant: { active: boolean; expiresAt: string; changedAt: string } | null }> {
  return apiFetch("/v1/instructor/assignment-roster", { query: { ...input } });
}
export function setAssignmentRosterGrant(
  input: AssignmentRosterKey & { active: boolean; expiresAt?: string },
): Promise<{ ok: boolean }> {
  return apiFetch("/v1/instructor/assignment-roster", { method: "PUT", body: input });
}
