import { apiFetch } from "@/lib/api/client";
import type { Paginated } from "@/lib/api/types";

/** Enrollment funnel v2 — public registration + payment for short and long-form. */

export type EnrollmentStage =
  "submitted" | "screening" | "assessment" | "interview" | "offer" | "enrolled" | "declined";

export interface SubmitEnrollmentInput {
  programSlug: string;
  scheduleDays: "standard" | "mwf" | "tss";
  timeSlot: "morning" | "afternoon" | "evening" | "any";
  mode: "onsite" | "online" | "hybrid";
  preferredStart?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  birthYear?: number;
  gender?: "female" | "male" | "other" | "prefer-not";
  educationLevel?: string;
  experienceLevel?: string;
  goal?: string;
  employer?: string;
  hasLaptop: boolean;
  referredBy?: string;
  paymentPlan: "full" | "50-50" | "deposit-monthly" | "full-10-off";
  paymentMethod: "paystack" | "bank-transfer";
  consentPrivacy: boolean;
  consentTerms: boolean;
  consentWhatsApp: boolean;
  turnstileToken?: string;
}

export interface EnrollmentResult {
  enrollment: {
    ref: string;
    status: string;
    stage: string;
    payment: {
      plan: string;
      method: string;
      status: string;
      depositAmount: number;
      feeTotal: number;
      feeDue: number;
    };
    nextSteps: string[];
    trackUrl: string;
  };
}

/** Public — creates an enrollment (mirrors the legacy applications pipeline). */
export function submitEnrollment(input: SubmitEnrollmentInput): Promise<EnrollmentResult> {
  return apiFetch<EnrollmentResult>("/v1/enrollments", { method: "POST", body: input });
}

export interface EnrollmentPaymentSession {
  reference: string;
  authorizationUrl: string;
  accessCode?: string;
  mock: boolean;
  amount: number;
}

/** Public — starts a Paystack session for the deposit or the full fee. */
export function startEnrollmentPayment(
  ref: string,
  kind: "deposit" | "full",
): Promise<EnrollmentPaymentSession> {
  return apiFetch<EnrollmentPaymentSession>(`/v1/enrollments/${ref}/payments`, {
    method: "POST",
    body: { kind },
  });
}

export interface EnrollmentPaymentVerification {
  reference: string;
  kind: string;
  amount: number;
  status: string;
  enrollmentPaymentStatus: string;
  verified: boolean;
}

/** Public — verify a payment after the Paystack redirect (or polling). */
export function verifyEnrollmentPayment(
  ref: string,
  reference: string,
): Promise<EnrollmentPaymentVerification> {
  return apiFetch<EnrollmentPaymentVerification>(
    `/v1/enrollments/${encodeURIComponent(ref)}/payments/verify?reference=${encodeURIComponent(reference)}`,
  );
}

export interface EnrollmentStatus {
  ref: string;
  stage: string;
  programSlug: string;
  programTitle: string;
  programKind: "short" | "long";
  feeTotal: number;
  feeDue: number;
  schedule: {
    days: string;
    timeSlot: string;
    mode: string;
    preferredStart: string | null;
  };
  payment: {
    plan: string;
    method: string;
    status: string;
    depositAmount: number;
    paidAmount: number;
    amountDue: number;
    paidAt: string | null;
    reference: string | null;
  };
  events: { event: string; detail: string; at: string }[];
  stages: { key: string; label: string; done: boolean; active: boolean }[];
  nextSteps: string[];
  contact: {
    phone: string;
    whatsapp: string;
    email: string;
    address: string;
    hours: string;
  };
  createdAt: string;
  updatedAt: string;
}

/** Public — applicant status by reference. */
export function fetchEnrollment(ref: string): Promise<EnrollmentStatus> {
  return apiFetch<EnrollmentStatus>(`/v1/enrollments/${encodeURIComponent(ref)}`);
}

export interface AdminEnrollment {
  id: string;
  ref: string;
  programSlug: string;
  programKind: string;
  programTitle: string;
  feeTotal: number;
  payment: {
    plan: string;
    method: string;
    status: string;
    depositAmount: number;
    paidAmount: number;
    amountDue: number;
    paidAt: string | null;
    reference: string | null;
  };
  student: {
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    phone: string;
    city: string;
    mode: string;
    scheduleDays: string;
    timeSlot: string;
    goal: string | null;
    referredBy: string | null;
    hasLaptop: boolean;
    birthYear: number | null;
    gender: string | null;
    educationLevel: string | null;
  };
  stage: string;
  note: string;
  turnstilePassed: boolean;
  createdAt: string;
  updatedAt: string;
}

/** Admin/admissions/finance — all enrollments with payment summaries. */
export function fetchAdminEnrollments(
  stage?: string,
  cursor?: string,
): Promise<Paginated<AdminEnrollment>> {
  return apiFetch<Paginated<AdminEnrollment>>("/v1/enrollments/admin", {
    query: { stage, cursor },
  });
}

/** Admin/admissions — advance the pipeline (mirrors the legacy applications row). */
export function updateEnrollmentStage(
  ref: string,
  stage: EnrollmentStage,
  note?: string,
): Promise<{ ok: true; ref: string; stage: string; note: string; updatedAt: string }> {
  return apiFetch(`/v1/enrollments/${encodeURIComponent(ref)}`, {
    method: "PATCH",
    body: { stage, note },
  });
}

export function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}
