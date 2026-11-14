import { apiFetch } from "@/lib/api/client";

export interface CertificateVerifyResult {
  valid: boolean;
  message?: string;
  status?: "issued" | "legacy" | "revoked";
  certificate?: {
    code: string;
    title: string;
    issuedAt: string;
  };
}

export interface CertificateItem {
  id: string;
  courseSlug: string;
  title: string;
  code: string;
  issuedAt: string;
  status?: "issued" | "revoked" | "legacy";
}

export interface IssueCertificateInput {
  userId: string;
  courseSlug: string;
  evidenceRef: string;
  confirmed: true;
}

export interface CertificateCandidate {
  id: string;
  name: string;
  email: string;
  roleKey: string;
}

/** Public endpoint — checks a certificate code against the registry. */
export function verifyCertificate(code: string): Promise<CertificateVerifyResult> {
  return apiFetch<CertificateVerifyResult>(
    `/v1/certificates/verify?code=${encodeURIComponent(code.trim())}`,
  );
}

/** Your issued certificates. */
export function fetchMyCertificates(): Promise<{
  items: CertificateItem[];
  total: number;
  truncated?: boolean;
}> {
  return apiFetch<{ items: CertificateItem[]; total: number; truncated?: boolean }>(
    "/v1/certificates/mine",
  );
}

/** Active-user directory for administrators; enrollment and review are still required. */
export function fetchCertificateCandidates(): Promise<{
  items: CertificateCandidate[];
  total: number;
}> {
  return apiFetch<{ items: CertificateCandidate[]; total: number }>("/v1/certificates/candidates");
}

/** Issue after administrative review. Enrollment alone does not prove eligibility. */
export function issueCertificate(input: IssueCertificateInput): Promise<CertificateItem> {
  return apiFetch<CertificateItem>("/v1/certificates", { method: "POST", body: input });
}

export interface CertificateReviewRecord {
  id: string;
  title: string;
  code: string;
  issuedAt: string;
  status: "issued" | "revoked" | "legacy";
  issuedBy: string | null;
  evidenceRef: string | null;
  revokedBy: string | null;
  revokedAt: string | null;
  reason: string | null;
}
export function fetchCertificateRecords(
  userId: string,
  courseSlug: string,
): Promise<{ items: CertificateReviewRecord[]; truncated: boolean }> {
  return apiFetch("/v1/certificates/admin/records", { query: { userId, courseSlug } });
}
export function revokeCertificate(id: string, reason: string): Promise<{ ok: boolean }> {
  return apiFetch(`/v1/certificates/${encodeURIComponent(id)}/revoke`, {
    method: "POST",
    body: { reason, confirmed: true },
  });
}
