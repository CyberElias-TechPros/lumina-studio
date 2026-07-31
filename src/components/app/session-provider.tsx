import { createContext, useContext, type ReactNode } from "react";
import { useSession, useSessionRole, useCan } from "@/lib/auth/session";
import { resolveRoleKey, type CanonicalRoleKey } from "@/data/rbac";
import type { Session } from "@/lib/schema";

interface SessionContextValue {
  session: Session | null;
  loading: boolean;
  roleKey: CanonicalRoleKey;
  can: (permission: string) => boolean;
}

const SessionContext = createContext<SessionContextValue | null>(null);

/**
 * Provides session state to the whole app (header user chip, role gating,
 * permission checks). Mounted once in __root.tsx. In mock mode the mock
 * session resolves immediately, so the app remains fully usable.
 */
export function SessionProvider({ children }: { children: ReactNode }) {
  const { data, isPending } = useSession();
  const roleKey = useSessionRole();
  const can = useCan;

  return (
    <SessionContext.Provider
      value={{
        session: data ?? null,
        loading: isPending,
        roleKey,
        can,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSessionContext(): SessionContextValue {
  const value = useContext(SessionContext);
  if (!value) {
    throw new Error("useSessionContext must be used within <SessionProvider>.");
  }
  return value;
}

/** Convenience accessor for the signed-in user (null when signed out). */
export function useSessionUser() {
  return useSessionContext().session?.user ?? null;
}

export { resolveRoleKey };
export type { SessionContextValue, CanonicalRoleKey };
