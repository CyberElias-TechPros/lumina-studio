import { apiFetch } from "@/lib/api/client";
import type { Paginated } from "@/lib/api/types";
import type { Assessment } from "@/data/learning";

export function fetchAssessments(): Promise<Paginated<Assessment>> {
  return apiFetch<Paginated<Assessment>>("/v1/assessments");
}

export function fetchAssessment(id: string): Promise<Assessment> {
  return apiFetch<Assessment>(`/v1/assessments/${id}`);
}
