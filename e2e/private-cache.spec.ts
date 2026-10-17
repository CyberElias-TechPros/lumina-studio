import { test, expect } from "@playwright/test";
import { QueryClient } from "@tanstack/react-query";
import { replacePrivateSession, sessionKeys } from "../src/lib/auth/private-cache";
import type { Session } from "../src/lib/schema";

const session: Session = {
  user: {
    id: "00000000-0000-4000-8000-000000000001",
    name: "Test learner",
    email: "local@example.test",
    roleKey: "student",
    permissions: [],
  },
};
for (const [name, result] of [
  ["sign out", null],
  ["MFA challenge", { mfaRequired: true as const, expiresAt: "2099-01-01T00:00:00.000Z" }],
  ["account switch", session],
] as const) {
  test(`${name} clears private query data; only a completed login becomes a session`, () => {
    const client = new QueryClient();
    client.setQueryData(["enrollment", "private-reference"], {
      name: "Previous learner",
      paid: 15000,
    });
    client.setQueryData(["tuition-worklist"], { items: [{ email: "private@example.test" }] });
    replacePrivateSession(client, result);
    expect(client.getQueryData(["enrollment", "private-reference"])).toBeUndefined();
    expect(client.getQueryData(["tuition-worklist"])).toBeUndefined();
    expect(client.getQueryData(sessionKeys.all)).toEqual(
      name === "account switch" ? session : null,
    );
    client.clear();
  });
}
