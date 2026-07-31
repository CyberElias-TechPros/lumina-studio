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

export function signIn(input: SignInInput): Promise<Session> {
  return apiFetch<Session>("/v1/auth/sign-in", { method: "POST", body: input });
}

export function signUp(input: SignUpInput): Promise<Session> {
  return apiFetch<Session>("/v1/auth/sign-up", { method: "POST", body: input });
}

export function requestMagicLink(input: MagicLinkRequestInput): Promise<{ ok: true }> {
  return apiFetch("/v1/auth/magic-link", { method: "POST", body: input });
}

/** Verifies a one-time magic link token. The session is stored in an HttpOnly cookie. */
export function verifyMagicLink(input: MagicLinkVerifyInput): Promise<Session> {
  return apiFetch<Session>(`/v1/auth/magic-link/verify?token=${encodeURIComponent(input.token)}`);
}

export function signOut(): Promise<{ ok: true }> {
  return apiFetch("/v1/auth/sign-out", { method: "POST" });
}
