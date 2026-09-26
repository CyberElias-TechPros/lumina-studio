import { apiFetch } from "@/lib/api/client";

export interface Account {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  roleKey: string;
  avatarUrl: string | null;
  emailVerified: boolean;
  emailVerifiedAt: string | null;
  mfaEnabled: boolean;
  hasPassword: boolean;
  createdAt: string;
}

export function fetchAccount(): Promise<Account> {
  return apiFetch<Account>("/v1/account");
}

export function updateAccount(input: { name?: string; phone?: string | null }): Promise<Account> {
  return apiFetch<Account>("/v1/account", { method: "PATCH", body: input });
}

export function changePassword(input: {
  currentPassword?: string;
  newPassword: string;
}): Promise<{ ok: true }> {
  return apiFetch("/v1/account/password", { method: "POST", body: input });
}

export function sendEmailVerification(): Promise<{
  ok: true;
  alreadyVerified: boolean;
  sent: boolean;
  devCode?: string;
}> {
  return apiFetch("/v1/account/verify-email/send", { method: "POST" });
}

export function verifyEmail(code: string): Promise<Account> {
  return apiFetch<Account>("/v1/account/verify-email", { method: "POST", body: { code } });
}

export function exportAccountData(): Promise<Record<string, unknown>> {
  return apiFetch<Record<string, unknown>>("/v1/account/export");
}

export function deleteAccount(input: {
  confirm: "DELETE";
  password?: string;
  code?: string;
}): Promise<{ ok: true }> {
  return apiFetch("/v1/account/delete", { method: "POST", body: input });
}

/* ---- Admin operations ---- */

export interface SystemReadiness {
  appEnv: string;
  emailProvider: string;
  checks: Record<string, boolean>;
  missingRequired: string[];
  ready: boolean;
}

export interface JobRun {
  id: string;
  job: string;
  status: "ok" | "error";
  detail: string;
  startedAt: string;
  finishedAt: string;
}

export function fetchSystemReadiness(): Promise<SystemReadiness> {
  return apiFetch<SystemReadiness>("/v1/system/readiness");
}

export function fetchJobRuns(): Promise<{ schedule: Record<string, string[]>; items: JobRun[] }> {
  return apiFetch("/v1/system/jobs");
}

export function runJob(job: string): Promise<{ job: string; status: string; detail: string }> {
  return apiFetch(`/v1/system/jobs/${encodeURIComponent(job)}/run`, { method: "POST" });
}
