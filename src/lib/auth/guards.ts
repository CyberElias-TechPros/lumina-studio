"use client";

/**
 * Route-guard toolkit. Wire into route files when auth lands (Phase 1):
 *
 *   export const Route = createFileRoute("/app/student")({
 *     beforeLoad: requireRole("student"),
 *     ...
 *   });
 *
 * NOTE: do NOT wire guards into routes while running in mock mode — the mock
 * session is always signed in, so guards pass, but missing guards elsewhere
 * stay navigable; the app must never hard-block navigation on mock data.
 */
import { redirect } from "@/lib/next-compat/router";
import { resolveRoleKey, type CanonicalRoleKey } from "@/data/rbac";
import type { Session } from "@/lib/schema";

export const AUTH_PATH = "/auth/sign-in";

export interface GuardContext {
  getSession?: () => Session | null;
}

export function requireSession() {
  return ({ context }: { context: GuardContext }) => {
    const session = context.getSession?.() ?? null;
    if (!session) {
      throw redirect({ to: AUTH_PATH });
    }
  };
}

export function requireRole(roleKey: CanonicalRoleKey | CanonicalRoleKey[]) {
  const allowed = Array.isArray(roleKey) ? roleKey : [roleKey];
  return ({ context }: { context: GuardContext }) => {
    const session = context.getSession?.() ?? null;
    if (!session) {
      throw redirect({ to: AUTH_PATH });
    }
    const actual = resolveRoleKey(session.user.roleKey);
    if (!allowed.includes(actual)) {
      throw redirect({ to: "/" });
    }
  };
}
