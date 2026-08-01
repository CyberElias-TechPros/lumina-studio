import { apiFetch } from "@/lib/api/client";
import type { Paginated } from "@/lib/api/types";
import type { StudentAssignment } from "@/data/learning";

export function fetchAssignments(): Promise<Paginated<StudentAssignment>> {
  return apiFetch<Paginated<StudentAssignment>>("/v1/assignments");
}

export function fetchAssignment(id: string): Promise<StudentAssignment> {
  return apiFetch<StudentAssignment>(`/v1/assignments/${id}`);
}
