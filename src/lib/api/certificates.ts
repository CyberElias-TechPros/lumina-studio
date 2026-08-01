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

/** Public endpoint — checks a certificate code against the registry. */
export function verifyCertificate(code: string): Promise<CertificateVerifyResult> {
  return apiFetch<CertificateVerifyResult>(
    `/v1/certificates/verify?code=${encodeURIComponent(code.trim())}`,
  );
}
