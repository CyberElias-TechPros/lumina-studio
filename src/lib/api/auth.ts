import { apiFetch } from "@/lib/api/client";
import type {
  Session,
  SignInInput,
  SignUpInput,
  MagicLinkRequestInput,
  MagicLinkVerifyInput,
} from "@/lib/schema";

export function fetchSession(): Promise<Session> {
  return apiFetch<Session>("/v1/auth/session");
}

export type SignInResult = Session | { mfaRequired: true; expiresAt: string };

export function signIn(input: SignInInput): Promise<SignInResult> {
  return apiFetch<SignInResult>("/v1/auth/sign-in", {
    method: "POST",
    body: input,
    noRefresh: true,
  });
}

export function signUp(input: SignUpInput): Promise<Session> {
  return apiFetch<Session>("/v1/auth/sign-up", { method: "POST", body: input, noRefresh: true });
}

export function requestMagicLink(input: MagicLinkRequestInput): Promise<{ ok: true }> {
  return apiFetch("/v1/auth/magic-link", { method: "POST", body: input, noRefresh: true });
}

/** Verifies a one-time magic link token. The session is stored in an HttpOnly cookie. */
export function verifyMagicLink(input: MagicLinkVerifyInput): Promise<Session> {
  return apiFetch<Session>(`/v1/auth/magic-link/verify?token=${encodeURIComponent(input.token)}`, {
    noRefresh: true,
  });
}

export function signOut(): Promise<{ ok: true }> {
  return apiFetch("/v1/auth/sign-out", { method: "POST" });
}

export function forgotPassword(input: { email: string }): Promise<{ ok: true; sent: boolean }> {
  return apiFetch("/v1/auth/forgot-password", { method: "POST", body: input, noRefresh: true });
}

export function resetPassword(input: { token: string; password: string }): Promise<{ ok: true }> {
  return apiFetch("/v1/auth/reset-password", { method: "POST", body: input, noRefresh: true });
}

export function mfaSetup(): Promise<{
  secret: string;
  otpauth: string;
  recoveryCodes: string[];
  enabled: boolean;
}> {
  return apiFetch("/v1/auth/mfa/setup", { method: "POST" });
}

export function mfaEnable(input: { code: string }): Promise<{ ok: true; enabled: boolean }> {
  return apiFetch("/v1/auth/mfa/enable", { method: "POST", body: input });
}

export function mfaDisable(input: { code: string }): Promise<{ ok: true; enabled: boolean }> {
  return apiFetch("/v1/auth/mfa/disable", { method: "POST", body: input });
}

/** Completes a pending MFA challenge with an app code or recovery key. */
export function mfaVerify(input: { code: string }): Promise<Session> {
  return apiFetch<Session>("/v1/auth/mfa/verify", { method: "POST", body: input, noRefresh: true });
}

export interface AuthDevice {
  id: string;
  deviceLabel: string;
  ip: string;
  createdAt: string;
  expiresAt: string;
  active: boolean;
  mfaPending: boolean;
  current: boolean;
}

export function fetchDevices(): Promise<{ items: AuthDevice[]; total: number }> {
  return apiFetch("/v1/auth/devices");
}

export function revokeDevice(id: string): Promise<{ ok: true }> {
  return apiFetch(`/v1/auth/devices/${id}/revoke`, { method: "POST" });
}
