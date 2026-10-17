import type { QueryClient } from "@tanstack/react-query";
import type { Session } from "@/lib/schema";

export const sessionKeys = { all: ["session"] as const };
type AuthResult = Session | { mfaRequired: true; expiresAt: string } | null;

/** Never carry one person's applications, receipts or staff queries into another session. */
export function replacePrivateSession(client: QueryClient, result: AuthResult) {
  void client.cancelQueries();
  client.clear();
  // A challenge is NOT a session. In particular, it has no user for the shell to render.
  client.setQueryData(sessionKeys.all, result && "user" in result ? result : null);
}
