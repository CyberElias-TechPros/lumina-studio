import { apiFetch } from "@/lib/api/client";
import { ApiError } from "@/lib/errors";
import type { Paginated } from "@/lib/api/types";
import type { StudentAssignment } from "@/data/learning";

export interface SubmissionResult {
  id: string;
  assignmentId: string;
  status: string;
  submittedAt: string;
  late: boolean;
  file: string;
  size: string;
}

export interface AssignmentSubmission {
  id: string;
  status: string;
  score?: number;
  feedback?: string;
  submittedAt: string;
  gradedAt?: string;
  late: boolean;
  file: string;
  size: string;
}

export function fetchAssignments(): Promise<Paginated<StudentAssignment>> {
  return apiFetch<Paginated<StudentAssignment>>("/v1/assignments");
}

export function fetchAssignment(id: string): Promise<StudentAssignment> {
  return apiFetch<StudentAssignment>(`/v1/assignments/${id}`);
}

export function fetchAssignmentSubmission(
  id: string,
): Promise<AssignmentSubmission | null> {
  return apiFetch<AssignmentSubmission>(`/v1/assignments/${id}/submission`).catch(
    (err: unknown) => {
      if (err instanceof ApiError && err.status === 404) return null;
      throw err;
    },
  );
}

export function submitAssignment(
  id: string,
  input: { body?: string; file?: string; size?: string },
): Promise<SubmissionResult> {
  return apiFetch<SubmissionResult>(`/v1/assignments/${id}/submit`, {
    method: "POST",
    body: input,
  });
}
