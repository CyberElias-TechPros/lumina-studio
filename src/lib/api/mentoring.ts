import { apiFetch } from "@/lib/api/client";

export interface DirectoryMentor {
  id: string;
  name: string;
  focus: string;
  bio: string;
}
export interface MentoringProfile {
  id: string;
  displayName: string;
  focus: string;
  bio: string;
  visible: boolean;
  approved: boolean;
  updatedAt: string;
}
export interface MentoringRequest {
  id: string;
  goal: string;
  status: "pending" | "accepted" | "declined" | "cancelled";
  createdAt: string;
  updatedAt: string;
  mentorName: string;
  learnerName: string;
  eligible: boolean;
}
export interface MentoringEligibility {
  active: boolean;
  expiresAt: string;
  reviewRef: string;
  changedAt: string;
  changedBy: string;
}
export interface ReviewedMentoringProfile {
  id: string;
  displayName: string;
  focus: string;
  bio: string;
  visible: boolean;
  revision: string;
  approvedAt: string | null;
  approvedBy: string | null;
  reviewRef: string | null;
  consentVersion: string;
  consentAt: string;
}
export const getMentoringDirectory = (q = "") =>
  apiFetch<{ items: DirectoryMentor[]; truncated: boolean }>("/v1/mentor/profiles", {
    query: { q },
  });
export const getMentoringProfile = () =>
  apiFetch<{ profile: MentoringProfile | null }>("/v1/mentor/profile");
export const saveMentoringProfile = (input: {
  displayName: string;
  focus: string;
  bio: string;
  consent: true;
}) =>
  apiFetch<{ ok: boolean; requiresReview: boolean }>("/v1/mentor/profile", {
    method: "PUT",
    body: input,
  });
export const withdrawMentoringProfile = () =>
  apiFetch<{ ok: boolean }>("/v1/mentor/profile", { method: "DELETE" });
export const getMentoringRequests = (direction: "incoming" | "outgoing") =>
  apiFetch<{ items: MentoringRequest[]; truncated: boolean }>("/v1/mentor/requests", {
    query: { direction },
  });
export const createMentoringRequest = (input: { mentorId: string; goal: string }) =>
  apiFetch<{ ok: boolean; id: string }>("/v1/mentor/requests", { method: "POST", body: input });
export const respondMentoringRequest = (id: string, decision: "accept" | "decline") =>
  apiFetch<{ ok: boolean }>(`/v1/mentor/requests/${encodeURIComponent(id)}/respond`, {
    method: "POST",
    body: { decision },
  });
export const cancelMentoringRequest = (id: string) =>
  apiFetch<{ ok: boolean }>(`/v1/mentor/requests/${encodeURIComponent(id)}/cancel`, {
    method: "POST",
    body: {},
  });
export const getMentoringEligibility = (userId: string) =>
  apiFetch<{ eligibility: MentoringEligibility | null }>("/v1/mentor/admin/eligibility", {
    query: { userId },
  });
export const setMentoringEligibility = (input: {
  userId: string;
  active: boolean;
  adultVerified?: boolean;
  reviewRef?: string;
  expiresAt?: string;
}) => apiFetch<{ ok: boolean }>("/v1/mentor/admin/eligibility", { method: "PUT", body: input });
export const getMentoringReview = (userId: string) =>
  apiFetch<{ profile: ReviewedMentoringProfile | null }>("/v1/mentor/admin/profile", {
    query: { userId },
  });
export const approveMentoringProfile = (input: {
  userId: string;
  revision: string;
  reviewRef: string;
  confirmed: true;
}) =>
  apiFetch<{ ok: boolean }>("/v1/mentor/admin/profile/approve", { method: "POST", body: input });
