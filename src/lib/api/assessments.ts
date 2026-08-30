import { apiFetch } from "@/lib/api/client";
import type { Paginated } from "@/lib/api/types";
import type { Assessment } from "@/data/learning";

export function fetchAssessments(): Promise<Paginated<Assessment>> {
  return apiFetch<Paginated<Assessment>>("/v1/assessments");
}

export function fetchAssessment(id: string): Promise<Assessment> {
  return apiFetch<Assessment>(`/v1/assessments/${id}`);
}

export interface AssessmentAttempt {
  id: string;
  score: number;
  max: number;
  submittedAt: string;
}

export function fetchAssessmentAttempts(id: string): Promise<Paginated<AssessmentAttempt>> {
  return apiFetch<Paginated<AssessmentAttempt>>(`/v1/assessments/${id}/attempts`);
}

export interface AssessmentSubmissionResult {
  ok: true;
  id: string;
  status: "done";
  score: number;
  max: number;
  attemptsLeft: number;
  submittedAt: string;
}

export function submitAssessment(
  id: string,
  answers: number[],
): Promise<AssessmentSubmissionResult> {
  return apiFetch<AssessmentSubmissionResult>(`/v1/assessments/${id}/submit`, {
    method: "POST",
    body: { answers },
  });
}
