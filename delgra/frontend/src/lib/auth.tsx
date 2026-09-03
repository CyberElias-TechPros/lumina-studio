import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { apiFetch, setSessionExpiredHandler } from "../api/client.ts";
import type { SessionUser } from "../api/types.ts";

/**
 * Session state.
 *
 * The Worker is the only authority on who is signed in and what they may do;
 * `capabilities` is used purely to hide controls the server would reject anyway.
 * Authorisation is never trusted from this file.
 */
interface AuthValue {
  user: SessionUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<SessionUser>;
  signUp: (input: { businessName: string; name: string; email: string; password: string }) => Promise<SessionUser>;
  signOut: () => Promise<void>;
  can: (capability: string) => boolean;
}

const AuthContext = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);

  // A 401 from anywhere in the app means the session is gone.
  useEffect(() => {
    setSessionExpiredHandler(() => setUser(null));
  }, []);

  useEffect(() => {
    let cancelled = false;
    apiFetch<{ user: SessionUser }>("/auth/session")
      .then((result) => {
        if (!cancelled) setUser(result.user);
      })
      .catch(() => {
        if (!cancelled) setUser(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const result = await apiFetch<{ user: SessionUser }>("/auth/login", {
      method: "POST",
      body: { email, password },
    });
    setUser(result.user);
    return result.user;
  }, []);

  const signUp = useCallback(async (input: { businessName: string; name: string; email: string; password: string }) => {
    const result = await apiFetch<{ user: SessionUser }>("/auth/register", { method: "POST", body: input });
    setUser(result.user);
    return result.user;
  }, []);

  const signOut = useCallback(async () => {
    try {
      await apiFetch("/auth/logout", { method: "POST" });
    } finally {
      setUser(null);
    }
  }, []);

  const can = useCallback(
    (capability: string) => Boolean(user?.capabilities?.includes(capability)),
    [user],
  );

  const value = useMemo<AuthValue>(
    () => ({ user, loading, signIn, signUp, signOut, can }),
    [user, loading, signIn, signUp, signOut, can],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthValue {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside <AuthProvider>");
  return context;
}
