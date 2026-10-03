import { apiFetch } from "@/lib/api/client";
import type { Paginated } from "@/lib/api/types";

export type ProjectType =
  "website" | "web_app" | "mobile_app" | "internal_tool" | "automation" | "consulting" | "other";
export type ProjectStatus = "new" | "reviewing" | "scoping" | "proposal_sent" | "won" | "declined";
export type BudgetRange = "undecided" | "under_250k" | "250k_750k" | "750k_2m" | "2m_plus";
export type ProjectTimeline =
  "asap" | "one_to_three_months" | "three_to_six_months" | "six_plus_months" | "flexible";
export type PartnershipType =
  | "education"
  | "employer"
  | "technology"
  | "ngo_community"
  | "government"
  | "delivery_partner"
  | "other";
export type PartnerStatus = "new" | "reviewing" | "interview" | "approved" | "declined";
export type PartnerQueueStatus = PartnerStatus | "admitted";

export interface ProjectRequestInput {
  fullName: string;
  email: string;
  phone: string;
  organization: string;
  projectType: ProjectType;
  brief: string;
  budgetRange: BudgetRange;
  timeline: ProjectTimeline;
  privacyConsent: boolean;
  turnstileToken?: string;
  contactWebsite?: string;
}

export interface PartnerApplicationInput {
  contactName: string;
  email: string;
  phone: string;
  organization: string;
  website: string;
  partnershipType: PartnershipType;
  region: string;
  capabilities: string;
  proposal: string;
  privacyConsent: boolean;
  turnstileToken?: string;
  contactWebsite?: string;
}

export interface IntakeSubmissionResult {
  ok: true;
  ref: string;
  status: "new";
}

export interface ProjectInquiry {
  id: string;
  ref: string;
  fullName: string;
  email: string;
  phone: string | null;
  organization: string | null;
  projectType: ProjectType;
  projectTypeLabel: string;
  brief: string;
  budgetRange: BudgetRange;
  budgetLabel: string;
  timeline: ProjectTimeline;
  timelineLabel: string;
  status: ProjectStatus;
  note: string;
  source: string;
  createdAt: string;
  updatedAt: string;
}

export interface PartnerApplication {
  id: string;
  ref: string;
  contactName: string;
  email: string;
  phone: string | null;
  organization: string;
  website: string | null;
  partnershipType: PartnershipType;
  partnershipTypeLabel: string;
  region: string;
  capabilities: string;
  proposal: string;
  status: PartnerQueueStatus;
  note: string;
  hasPortalAccount: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IntakeUpdateResult {
  ok: true;
  id: string;
  ref: string;
  status: string;
  note: string;
  updatedAt: string;
}

export interface AdmitPartnerResult {
  ok: true;
  ref: string;
  status: "admitted";
  portalUserId: string;
  emailSent: boolean;
}

export function submitProjectRequest(input: ProjectRequestInput): Promise<IntakeSubmissionResult> {
  return apiFetch<IntakeSubmissionResult>("/v1/business-intake/projects", {
    method: "POST",
    body: input,
    noRefresh: true,
  });
}

export function submitPartnerApplication(
  input: PartnerApplicationInput,
): Promise<IntakeSubmissionResult> {
  return apiFetch<IntakeSubmissionResult>("/v1/business-intake/partners", {
    method: "POST",
    body: input,
    noRefresh: true,
  });
}

export function fetchProjectInquiries(
  status?: ProjectStatus,
  cursor?: string,
): Promise<Paginated<ProjectInquiry>> {
  return apiFetch<Paginated<ProjectInquiry>>("/v1/business-intake/admin/projects", {
    query: { status, cursor },
  });
}

export function fetchPartnerApplications(
  status?: PartnerQueueStatus,
  cursor?: string,
): Promise<Paginated<PartnerApplication>> {
  return apiFetch<Paginated<PartnerApplication>>("/v1/business-intake/admin/partners", {
    query: { status, cursor },
  });
}

export function updateProjectInquiry(input: {
  id: string;
  status: ProjectStatus;
  note?: string;
}): Promise<IntakeUpdateResult> {
  return apiFetch<IntakeUpdateResult>(
    `/v1/business-intake/admin/projects/${encodeURIComponent(input.id)}`,
    {
      method: "PATCH",
      body: { status: input.status, note: input.note },
    },
  );
}

export function updatePartnerApplication(input: {
  id: string;
  status: PartnerStatus;
  note?: string;
}): Promise<IntakeUpdateResult> {
  return apiFetch<IntakeUpdateResult>(
    `/v1/business-intake/admin/partners/${encodeURIComponent(input.id)}`,
    {
      method: "PATCH",
      body: { status: input.status, note: input.note },
    },
  );
}

export function admitPartner(id: string): Promise<AdmitPartnerResult> {
  return apiFetch<AdmitPartnerResult>(
    `/v1/business-intake/admin/partners/${encodeURIComponent(id)}/admit`,
    { method: "POST" },
  );
}
