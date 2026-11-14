import { env } from "cloudflare:workers";
import { beforeAll, describe, expect, it } from "vitest";
import { api, cookieHeaders, createTestSession, setupDb } from "./helpers";
import { invitationTokenKey } from "../src/lib/invitation-token";

let admin: string;
let first: string;
let second: string;
let learner: string;
const learnerId = "guardian-test-learner";
const guardianIds = ["guardian-test-a", "guardian-test-b"];

beforeAll(async () => {
  await setupDb();
  for (const [id, role] of [
    [learnerId, "student"],
    [guardianIds[0], "parent"],
    [guardianIds[1], "parent"],
  ]) {
    await env.DB.prepare("INSERT INTO users (id, name, email, role_key) VALUES (?, ?, ?, ?)")
      .bind(id, id, `${id}@example.test`, role)
      .run();
  }
  admin = (await createTestSession("admin@cea.ng")).cookie;
  first = (await createTestSession(`${guardianIds[0]}@example.test`)).cookie;
  second = (await createTestSession(`${guardianIds[0]}@example.test`)).cookie;
  learner = (await createTestSession(`${learnerId}@example.test`)).cookie;
});

async function invite(): Promise<string> {
  const res = await api("/v1/invitations", {
    method: "POST",
    headers: { ...cookieHeaders(admin), "Content-Type": "application/json" },
    body: JSON.stringify({ studentId: learnerId, guardianUserId: guardianIds[0] }),
  });
  expect(res.status).toBe(201);
  return ((await res.json()) as { token: string }).token;
}
const accept = (token: string, cookie: string) =>
  api(`/v1/invitations/${token}/accept`, { method: "POST", headers: cookieHeaders(cookie) });

describe("guardian invitation redemption safety", () => {
  it("does not allow a learner to grant themselves a guardian relationship", async () => {
    const token = await invite();
    const result = await accept(token, learner);
    expect(result.status).toBe(403);
    expect(
      await env.DB.prepare("SELECT 1 FROM parent_students WHERE parent_id = ? AND student_id = ?")
        .bind(learnerId, learnerId)
        .first(),
    ).toBeNull();
    expect(
      (
        await env.DB.prepare("SELECT role_key FROM users WHERE id = ?")
          .bind(learnerId)
          .first<{ role_key: string }>()
      )?.role_key,
    ).toBe("student");
  });

  it("permits only one of two sessions of the intended guardian to redeem the same token", async () => {
    const token = await invite();
    const responses = await Promise.all([accept(token, first), accept(token, second)]);
    expect(responses.map((r) => r.status).sort()).toEqual([200, 409]);
    const links = await env.DB.prepare(
      "SELECT parent_id FROM parent_students WHERE student_id = ? AND parent_id IN (?, ?)",
    )
      .bind(learnerId, ...guardianIds)
      .all<{ parent_id: string }>();
    expect(links.results).toHaveLength(1);
    const row = await env.DB.prepare("SELECT accepted_by FROM parent_invitations WHERE token = ?")
      .bind(await invitationTokenKey(token))
      .first<{ accepted_by: string }>();
    expect(row?.accepted_by).toBe(links.results[0]?.parent_id);
    await env.DB.prepare("DELETE FROM parent_students WHERE student_id = ? AND parent_id IN (?, ?)")
      .bind(learnerId, ...guardianIds)
      .run();
  });

  it("rolls back the relationship if consuming the invitation fails", async () => {
    const token = await invite();
    await env.DB.exec(
      "CREATE TRIGGER block_invitation_accept BEFORE UPDATE OF status ON parent_invitations WHEN NEW.status = 'accepted' BEGIN SELECT RAISE(ABORT, 'test rollback'); END;",
    );
    try {
      const response = await accept(token, first);
      expect(response.status).toBe(500);
      expect(
        await env.DB.prepare("SELECT 1 FROM parent_students WHERE parent_id = ? AND student_id = ?")
          .bind(guardianIds[0], learnerId)
          .first(),
      ).toBeNull();
      expect(
        (
          await env.DB.prepare("SELECT status FROM parent_invitations WHERE token = ?")
            .bind(await invitationTokenKey(token))
            .first<{ status: string }>()
        )?.status,
      ).toBe("pending");
    } finally {
      await env.DB.exec("DROP TRIGGER block_invitation_accept;");
    }
  });
  it("rolls back token consumption if creating the relationship fails", async () => {
    const token = await invite();
    await env.DB.exec(
      "CREATE TRIGGER block_guardian_link BEFORE INSERT ON parent_students BEGIN SELECT RAISE(ABORT, 'test relationship rollback'); END;",
    );
    try {
      expect((await accept(token, first)).status).toBe(500);
      expect(
        (
          await env.DB.prepare("SELECT status FROM parent_invitations WHERE token = ?")
            .bind(await invitationTokenKey(token))
            .first<{ status: string }>()
        )?.status,
      ).toBe("pending");
      expect(
        await env.DB.prepare("SELECT 1 FROM parent_students WHERE parent_id = ? AND student_id = ?")
          .bind(guardianIds[0], learnerId)
          .first(),
      ).toBeNull();
    } finally {
      await env.DB.exec("DROP TRIGGER block_guardian_link;");
    }
  });

  it.each([
    ["expired", "2000-01-01T00:00:00.000Z", "pending", 409],
    ["malformed expiration", "not-a-date", "pending", 409],
    ["revoked", "2099-01-01T00:00:00.000Z", "revoked", 403],
  ])("rejects a %s invitation", async (_label, expiresAt, status, expected) => {
    const token = await invite();
    await env.DB.prepare("UPDATE parent_invitations SET expires_at = ?, status = ? WHERE token = ?")
      .bind(expiresAt, status, await invitationTokenKey(token))
      .run();
    expect((await accept(token, first)).status).toBe(expected);
    expect(
      await env.DB.prepare("SELECT 1 FROM parent_students WHERE parent_id = ? AND student_id = ?")
        .bind(guardianIds[0], learnerId)
        .first(),
    ).toBeNull();
  });
});
