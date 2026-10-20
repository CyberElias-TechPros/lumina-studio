import { apiFetch } from "@/lib/api/client";
import type { Paginated } from "@/lib/api/types";

export interface TuitionWorkItem {
  ref: string;
  name: string;
  email: string;
  phone: string;
  programSlug: string;
  programTitle: string;
  offerStatus: string;
  cohortLabel: string | null;
  paid: number;
  balance: number;
  balanceDueAt: string | null;
  createdAt: string;
  reasons: string[];
  active: boolean;
}
export interface TuitionWorklist {
  items: TuitionWorkItem[];
  limit: number;
  page: number;
  nextPage: number | null;
  ungradedAssignments: number;
  asOf: string;
}
export interface TransferReview {
  id: string;
  ref: string;
  programTitle: string;
  student: { firstName: string; lastName: string; email: string };
  kind: string;
  amount: number;
  expectedAmount: number;
  senderName: string;
  bankName: string | null;
  bankReference: string | null;
  paidOn: string | null;
  note: string | null;
  status: string;
  receiptUrl: string | null;
}
export const fetchTuitionWorklist = (page = 1) =>
  apiFetch<TuitionWorklist>("/v1/enrollments/admin/worklist", { query: { page } });
export const fetchTransferReviews = (cursor?: string) =>
  apiFetch<Paginated<TransferReview>>("/v1/enrollments/payment-proofs", {
    query: { status: "pending_review", cursor },
  });
export const issueTuitionOffer = (
  ref: string,
  input: { cohortId: string; balanceDueAt: string; equipment: string; eligibilityConfirmed: true },
) => apiFetch(`/v1/enrollments/${encodeURIComponent(ref)}/offer`, { method: "POST", body: input });
export const retryTuitionActivation = (ref: string) =>
  apiFetch<{ ok: boolean; active: boolean }>(
    `/v1/enrollments/${encodeURIComponent(ref)}/activate`,
    { method: "POST" },
  );
export const reviewTransfer = (
  id: string,
  decision: "confirm" | "reject",
  input: { reason?: string; bankReference?: string; receivedAmount?: number },
) =>
  apiFetch(`/v1/enrollments/payment-proofs/${encodeURIComponent(id)}/${decision}`, {
    method: "POST",
    body: input,
  });
export const fetchMyTuition = () =>
  apiFetch<{
    items: {
      ref: string;
      programTitle: string;
      offerStatus: string;
      paidAmount: number;
      activatedAt: string | null;
    }[];
  }>("/v1/enrollments/mine");

export const extendTuitionBalance = (
  ref: string,
  input: { previousDueAt: string; dueAt: string; reason: string },
) =>
  apiFetch(`/v1/enrollments/${encodeURIComponent(ref)}/balance-extension`, {
    method: "POST",
    body: input,
  });
