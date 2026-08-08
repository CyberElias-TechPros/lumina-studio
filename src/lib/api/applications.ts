import { apiFetch } from "@/lib/api/client";
import type { Paginated } from "@/lib/api/types";

/** Admin-only view of an application in the admissions pipeline. */
export interface AdminApplication {
  id: string;
  ref: string;
  fullName: string;
  email: string;
  programSlug: string | null;
  programTitle: string | null;
  phone: string | null;
  city: string | null;
  experience: string | null;
  status: string;
  note: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdmissionsStage {
  key: string;
  label: string;
  value: number;
}

export interface AdmissionsStats {
  total: number;
  activeStages: number;
  stages: AdmissionsStage[];
}

export type PipelineStage =
  "submitted" | "screening" | "assessment" | "interview" | "offer" | "enrolled";

export const PIPELINE_ORDER: PipelineStage[] = [
  "submitted",
  "screening",
  "assessment",
  "interview",
  "offer",
  "enrolled",
];

export const PIPELINE_STAGE_LABELS: Record<PipelineStage, string> = {
  submitted: "Application received",
  screening: "Screening",
  assessment: "Assessment",
  interview: "Interview",
  offer: "Offer",
  enrolled: "Enrolled",
};

/** Admin endpoint — full pipeline, optional stage filter. */
export function fetchAdminApplications(
  stage?: PipelineStage,
  cursor?: string,
): Promise<Paginated<AdminApplication>> {
  return apiFetch<Paginated<AdminApplication>>("/v1/applications/admin", {
    query: { stage, cursor },
  });
}

/** Admin endpoint — funnel counts by pipeline stage for the admissions hub. */
export function fetchAdmissionsStats(): Promise<AdmissionsStats> {
  return apiFetch<AdmissionsStats>("/v1/applications/admin/stats");
}

export function updateApplicationStatus(
  ref: string,
  status: PipelineStage,
  note?: string,
): Promise<{ ok: true; ref: string; status: string; note: string; updatedAt: string }> {
  return apiFetch(`/v1/applications/${ref}`, { method: "PATCH", body: { status, note } });
}

export interface SubmitApplicationInput {
  fullName: string;
  email: string;
  phone?: string;
  city?: string;
  programSlug: string;
  experience?: string;
}

export interface ApplicationResult {
  application: {
    id: string;
    ref: string;
    status: string;
  };
}

/** Public endpoint — creates an admissions application. */
export function submitApplication(input: SubmitApplicationInput): Promise<ApplicationResult> {
  return apiFetch<ApplicationResult>("/v1/applications", { method: "POST", body: input });
}

export interface ApplicationStageState {
  key: string;
  label: string;
  done: boolean;
  active: boolean;
}

export interface ApplicationStatus {
  ref: string;
  status: string;
  programTitle: string | null;
  stages: ApplicationStageState[];
  updatedAt: string | null;
}

/** Public endpoint — track an application by its reference code. */
export function fetchApplicationStatus(ref: string): Promise<ApplicationStatus> {
  return apiFetch<ApplicationStatus>(`/v1/applications/${encodeURIComponent(ref)}`);
}
