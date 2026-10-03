/**
 * Operations API: compliance deadlines, cohorts, the schools programme and the
 * assistant's question digest. Kept in one module because they share the same
 * shape (small lists, one or two mutations) and all land in the same admin-ish
 * corners of CEA-OS.
 */
import { apiFetch } from "@/lib/api/client";
import type { Paginated } from "@/lib/api/types";

/* ------------------------------ compliance ------------------------------ */

export interface Deadline {
  id: string;
  title: string;
  authority: string;
  category: string;
  dueOn: string;
  recurrence: "none" | "annual" | "quarterly" | "monthly";
  notes: string | null;
  status: "open" | "done" | "waived";
  completedOn: string | null;
  completedBy: string | null;
  daysRemaining: number;
  overdue: boolean;
  urgency: "overdue" | "critical" | "soon" | "scheduled" | "closed";
}

export function fetchDeadlines(status: "open" | "done" | "waived" | "all" = "open") {
  return apiFetch<{ items: Deadline[] }>(`/v1/compliance/deadlines?status=${status}`);
}

export function createDeadline(input: {
  title: string;
  authority: string;
  category: string;
  dueOn: string;
  recurrence?: "none" | "annual" | "quarterly" | "monthly";
  notes?: string;
}) {
  return apiFetch<{ deadline: Deadline }>("/v1/compliance/deadlines", {
    method: "POST",
    body: input,
  });
}

export function updateDeadline(
  id: string,
  input: {
    status?: "open" | "done" | "waived";
    dueOn?: string;
    notes?: string;
    title?: string;
    recurrence?: "none" | "annual" | "quarterly" | "monthly";
  },
) {
  return apiFetch<{ deadline: Deadline }>(`/v1/compliance/deadlines/${id}`, {
    method: "PATCH",
    body: input,
  });
}

export function deleteDeadline(id: string) {
  return apiFetch<{ ok: boolean }>(`/v1/compliance/deadlines/${id}`, { method: "DELETE" });
}

/* -------------------------------- cohorts -------------------------------- */

export interface Cohort {
  id: string;
  programSlug: string;
  label: string;
  kind: "short" | "long";
  startDate: string;
  endDate: string | null;
  days: string;
  timeSlot: "morning" | "afternoon" | "evening" | "any";
  mode: "onsite" | "online" | "hybrid";
  capacity: number | null;
  notes: string | null;
  status: "scheduled" | "running" | "completed" | "cancelled";
}

export function fetchCohorts(options: { program?: string; includePast?: boolean } = {}) {
  const params = new URLSearchParams();
  if (options.program) params.set("program", options.program);
  if (options.includePast) params.set("includePast", "1");
  const qs = params.toString();
  return apiFetch<{ items: Cohort[] }>(`/v1/cohorts${qs ? `?${qs}` : ""}`);
}

export function fetchNextCohort(program?: string) {
  return apiFetch<{ cohort: Cohort | null; ics?: string }>(
    `/v1/cohorts/next${program ? `?program=${encodeURIComponent(program)}` : ""}`,
  );
}

export function saveCohort(
  input: Partial<Cohort> & { label: string; startDate: string },
  id?: string,
) {
  if (id) {
    return apiFetch<{ cohort: Cohort }>(`/v1/cohorts/${id}`, { method: "PATCH", body: input });
  }
  return apiFetch<{ cohort: Cohort }>("/v1/cohorts", { method: "POST", body: input });
}

export function deleteCohort(id: string) {
  return apiFetch<{ ok: boolean }>(`/v1/cohorts/${id}`, { method: "DELETE" });
}

/* -------------------------------- schools -------------------------------- */

export interface SchoolInquiry {
  id: string;
  schoolName: string;
  level: "primary" | "secondary" | "mixed";
  contactName: string;
  contactRole: string | null;
  phone: string;
  email: string | null;
  studentCount: number | null;
  message: string | null;
  status: "new" | "contacted" | "converted" | "spam";
  schoolId: string | null;
  suggestedRate: number | null;
  createdAt: string;
}

export interface School {
  id: string;
  name: string;
  level: "primary" | "secondary" | "mixed";
  address: string | null;
  city: string | null;
  contactName: string | null;
  contactRole: string | null;
  contactPhone: string | null;
  contactEmail: string | null;
  studentCount: number | null;
  status: "prospect" | "contacted" | "proposal_sent" | "negotiating" | "won" | "lost";
  notes: string | null;
  proposalCount: number;
  lastProposalAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface SchoolProposalSummary {
  ref: string;
  schoolId: string;
  schoolName: string;
  term: string;
  students: number;
  ratePerStudent: number;
  total: number;
  status: "draft" | "sent" | "viewed" | "accepted" | "declined" | "expired";
  validUntil: string;
  sentAt: string | null;
  viewedAt: string | null;
  decidedAt: string | null;
  acceptedBy: string | null;
  createdAt: string;
}

export interface PublicProposal {
  ref: string;
  schoolName: string;
  schoolLevel: string;
  term: string;
  students: number;
  ratePerStudent: number;
  total: number;
  plan: { term: string; course: string }[];
  extras: { label: string; price: string }[];
  includes: string[];
  schoolProvides: string[];
  minimumStudents: number;
  validUntil: string;
  generatedAt: string;
  paymentTerms: string;
}

/** Public — the /schools enquiry form. */
export function submitSchoolInquiry(input: {
  schoolName: string;
  level: "primary" | "secondary" | "mixed";
  contactName: string;
  contactRole?: string;
  phone: string;
  email?: string;
  studentCount?: number;
  message?: string;
}) {
  return apiFetch<{ ok: boolean; message: string }>("/v1/schools/inquiries", {
    method: "POST",
    body: input,
  });
}

export function fetchSchoolInquiries(status: "new" | "contacted" | "converted" | "spam" | "all") {
  return apiFetch<{ items: SchoolInquiry[] }>(`/v1/schools/inquiries?status=${status}`);
}

export function updateSchoolInquiry(
  id: string,
  status: SchoolInquiry["status"],
  schoolId?: string,
) {
  return apiFetch<{ ok: boolean }>(`/v1/schools/inquiries/${id}`, {
    method: "PATCH",
    body: { status, schoolId },
  });
}

export function fetchSchools() {
  return apiFetch<{ items: School[] }>("/v1/schools");
}

export function createSchool(input: Partial<School> & { name: string }) {
  return apiFetch<{ ok: boolean; id: string }>("/v1/schools", { method: "POST", body: input });
}

export function updateSchool(id: string, input: Partial<School>) {
  return apiFetch<{ ok: boolean }>(`/v1/schools/${id}`, { method: "PATCH", body: input });
}

export function createProposal(
  schoolId: string,
  input: {
    term: string;
    students: number;
    ratePerStudent?: number;
    validDays?: number;
    extras?: { label: string; price: string }[];
    plan?: { term: string; course: string }[];
  },
) {
  return apiFetch<{ ok: boolean; ref: string; total: number; ratePerStudent: number }>(
    `/v1/schools/${schoolId}/proposals`,
    { method: "POST", body: input },
  );
}

export function fetchProposals(schoolId?: string) {
  return apiFetch<{ items: SchoolProposalSummary[] }>(
    `/v1/schools/proposals${schoolId ? `?school=${encodeURIComponent(schoolId)}` : ""}`,
  );
}

/** Public — the shareable proposal page. */
export function fetchPublicProposal(ref: string) {
  return apiFetch<{ proposal: PublicProposal; status: string; viewedAt: string | null }>(
    `/v1/schools/proposals/${encodeURIComponent(ref)}`,
  );
}

/** Public — the school accepts or declines in place. */
export function decideProposal(
  ref: string,
  input: {
    decision: "accepted" | "declined";
    acceptedBy?: string;
    acceptedRole?: string;
    notes?: string;
  },
) {
  return apiFetch<{ ok: boolean; status: string }>(
    `/v1/schools/proposals/${encodeURIComponent(ref)}`,
    { method: "PATCH", body: input },
  );
}

export function markProposalSent(ref: string) {
  return apiFetch<{ ok: boolean; status: string }>(
    `/v1/schools/proposals/${encodeURIComponent(ref)}`,
    { method: "PATCH", body: { decision: "sent" } },
  );
}

/* ---------------------------- assistant digest ---------------------------- */

export interface AssistantDigest {
  days: number;
  asked: number;
  fallbacks: number;
  topRepeated: { question: string; count: number }[];
  unanswered: { question: string; answerPreview: string; page: string | null; createdAt: string }[];
  recent: { question: string; fallback: boolean; page: string | null; createdAt: string }[];
}

export function fetchAssistantDigest(days = 7) {
  return apiFetch<AssistantDigest>(`/v1/assistant/questions?days=${days}`);
}

/* ------------------------------- receipts -------------------------------- */

export interface Receipt {
  ref: string;
  studentName: string;
  email: string;
  programTitle: string;
  programKind: string;
  issuedBy: {
    name: string;
    rc: string;
    tin: string;
    address: string;
    email: string;
    phone: string;
  };
  feeTotal: number;
  feeDue: number;
  paidAmount: number;
  balance: number;
  payments: {
    reference: string;
    kind: string;
    amount: number;
    method: string;
    receiptNo: string | null;
    paidAt: string | null;
  }[];
  latestReceiptNo: string | null;
  issuedAt: string | null;
}

/** Public — the printable receipt for confirmed payments. */
export function fetchReceipt(ref: string) {
  return apiFetch<{ receipt: Receipt }>(`/v1/enrollments/${encodeURIComponent(ref)}/receipt`);
}

export type { Paginated };
