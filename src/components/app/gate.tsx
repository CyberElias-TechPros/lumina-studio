import type { ReactNode } from "react";
import { useSessionContext } from "@/components/app/session-provider";

/**
 * In-page permission gate: renders children only when the session grants the
 * permission. Server stays authoritative (Phase 1); this only hides UI.
 */
export function Gate({ permission, children }: { permission: string; children: ReactNode }) {
  const { can } = useSessionContext();
  if (!can(permission)) return null;
  return <>{children}</>;
}
