import { apiFetch } from "@/lib/api/client";

export interface CertificateVerifyResult {
  valid: boolean;
  message?: string;
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
}

export interface IssueCertificateInput {
  userId: string;
  courseSlug: string;
  title: string;
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
export function fetchMyCertificates(): Promise<{ items: CertificateItem[]; total: number }> {
  return apiFetch<{ items: CertificateItem[]; total: number }>("/v1/certificates/mine");
}

/** Active users a certificate can be issued to (instructor/admin only). */
export function fetchCertificateCandidates(): Promise<{
  items: CertificateCandidate[];
  total: number;
}> {
  return apiFetch<{ items: CertificateCandidate[]; total: number }>("/v1/certificates/candidates");
}

/** Issue a certificate (instructor/admin only). Returns the new code. */
export function issueCertificate(input: IssueCertificateInput): Promise<CertificateItem> {
  return apiFetch<CertificateItem>("/v1/certificates", { method: "POST", body: input });
}
