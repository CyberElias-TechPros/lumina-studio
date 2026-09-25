import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchSession,
  signIn as apiSignIn,
  signUp as apiSignUp,
  signOut as apiSignOut,
  verifyMagicLink as apiVerifyMagicLink,
  forgotPassword as apiForgotPassword,
  resetPassword as apiResetPassword,
  mfaSetup as apiMfaSetup,
  mfaEnable as apiMfaEnable,
  mfaDisable as apiMfaDisable,
  mfaVerify as apiMfaVerify,
  fetchDevices as apiFetchDevices,
  revokeDevice as apiRevokeDevice,
} from "@/lib/api/auth";
import type { Session, SignInInput, SignUpInput } from "@/lib/schema";
import { DEFAULT_PERMISSIONS, resolveRoleKey, type CanonicalRoleKey } from "@/data/rbac";

export const sessionKeys = {
  all: ["session"] as const,
};

/** Loads the current session. Null data (never null `data`) = signed out. */
export function useSession() {
  return useQuery({
    queryKey: sessionKeys.all,
    queryFn: fetchSession,
    staleTime: 30_000,
    refetchOnWindowFocus: true,
    retry: 0,
  });
}

/** Role normalized through the canonical RBAC map (see src/data/rbac.ts). */
export function useSessionRole(): CanonicalRoleKey {
  const { data } = useSession();
  return resolveRoleKey(data?.user.roleKey);
}

/** Permission check against the session (server-authoritative in Phase 1). */
export function useCan(permission: string): boolean {
  const { data } = useSession();
  if (!data) return false;
  const granted =
    data.user.permissions.length > 0
      ? data.user.permissions
      : DEFAULT_PERMISSIONS(data.user.roleKey);
  return granted.includes("*") || granted.includes(permission);
}

export function useSignIn() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: SignInInput) => apiSignIn(input),
    onSuccess: (result) => {
      if ("user" in result) {
        queryClient.setQueryData(sessionKeys.all, result);
      }
    },
  });
}

export function useSignUp() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: SignUpInput) => apiSignUp(input),
    onSuccess: (session) => {
      queryClient.setQueryData(sessionKeys.all, session);
    },
  });
}

/** Verifies a one-time magic link token; the server sets the session cookie. */
export function useMagicLinkVerify() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (token: string) => apiVerifyMagicLink({ token }),
    onSuccess: (session) => {
      queryClient.setQueryData(sessionKeys.all, session);
    },
  });
}

export function useSignOut() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => apiSignOut(),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: sessionKeys.all });
    },
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: (input: string | { email: string; turnstileToken?: string }) =>
      apiForgotPassword(typeof input === "string" ? { email: input } : input),
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: (input: { token: string; password: string }) => apiResetPassword(input),
  });
}

export function useMfaSetup() {
  return useMutation({ mutationFn: () => apiMfaSetup() });
}

export function useMfaEnable() {
  return useMutation({ mutationFn: (code: string) => apiMfaEnable({ code }) });
}

export function useMfaDisable() {
  return useMutation({ mutationFn: (code: string) => apiMfaDisable({ code }) });
}

export function useMfaVerify() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (code: string) => apiMfaVerify({ code }),
    onSuccess: (session) => {
      queryClient.setQueryData(sessionKeys.all, session);
    },
  });
}

export function useDevices() {
  return useQuery({
    queryKey: ["devices"],
    queryFn: apiFetchDevices,
    staleTime: 30_000,
  });
}

export function useRevokeDevice() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiRevokeDevice(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["devices"] });
    },
  });
}
