import { apiFetch } from "./client";

export interface InvitationInfo {
  status: "pending" | "accepted" | "revoked" | "expired";
  expiresAt: string;
}

export interface AcceptInvitationResult {
  ok: true;
  studentId: string;
  studentName: string;
  roleUpdated: boolean;
  linked: boolean;
}

export interface CreateInvitationInput {
  studentId: string;
  guardianUserId: string;
  note?: string;
  expiresInDays?: number;
}

export interface CreateInvitationResult {
  ok: true;
  token: string;
  url: string;
  expiresAt: string;
}

/** Public — verify an invitation link before showing its details. */
export function fetchInvitation(token: string): Promise<InvitationInfo> {
  return apiFetch<InvitationInfo>(`/v1/invitations/${encodeURIComponent(token)}`);
}

/** Signed-in guardian accepts the invitation and links the student. */
export function acceptInvitation(token: string): Promise<AcceptInvitationResult> {
  return apiFetch<AcceptInvitationResult>(`/v1/invitations/${encodeURIComponent(token)}/accept`, {
    method: "POST",
  });
}

/** Admin — create an invitation for an identified parent account. */
export function createInvitation(input: CreateInvitationInput): Promise<CreateInvitationResult> {
  return apiFetch<CreateInvitationResult>("/v1/invitations", { method: "POST", body: input });
}
