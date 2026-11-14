import { env } from "cloudflare:workers";
import { beforeAll, describe, expect, it } from "vitest";
import { api, cookieHeaders, createTestSession, setupDb } from "./helpers";
import { invitationTokenKey } from "../src/lib/invitation-token";

const studentId = "recipient-learner";
const parentId = "recipient-parent";
const otherId = "recipient-other";
let admin: string;
let parent: string;
let other: string;
let student: string;

beforeAll(async () => {
  await setupDb();
  for (const [id, role] of [
    [studentId, "student"],
    [parentId, "parent"],
    [otherId, "parent"],
  ]) {
    await env.DB.prepare(
      "INSERT INTO users (id, name, email, role_key, email_verified_at) VALUES (?, ?, ?, ?, ?)",
    )
      .bind(id, id, `${id}@example.test`, role, "2026-01-01T00:00:00.000Z")
      .run();
  }
  admin = (await createTestSession("admin@cea.ng")).cookie;
  parent = (await createTestSession(`${parentId}@example.test`)).cookie;
  other = (await createTestSession(`${otherId}@example.test`)).cookie;
  student = (await createTestSession(`${studentId}@example.test`)).cookie;
});
async function create() {
  return api("/v1/invitations", {
    method: "POST",
    headers: { ...cookieHeaders(admin), "Content-Type": "application/json" },
    body: JSON.stringify({ studentId, guardianUserId: parentId, note: "private note" }),
  });
}
async function token() {
  const res = await create();
  expect(res.status).toBe(201);
  return ((await res.json()) as { token: string }).token;
}
function accept(t: string, cookie: string) {
  return api(`/v1/invitations/${t}/accept`, { method: "POST", headers: cookieHeaders(cookie) });
}

describe("guardian invitations are bound to the intended account", () => {
  it("requires a parent account to be selected at creation", async () => {
    const res = await api("/v1/invitations", {
      method: "POST",
      headers: { ...cookieHeaders(admin), "Content-Type": "application/json" },
      body: JSON.stringify({ studentId, guardianName: "Somebody" }),
    });
    expect(res.status).toBe(400);
  });
  it("does not store the usable invitation token or accept a database hash as a bearer token", async () => {
    const t = await token();
    const stored = await env.DB.prepare(
      "SELECT token FROM parent_invitations WHERE student_id = ? ORDER BY rowid DESC LIMIT 1",
    )
      .bind(studentId)
      .first<{ token: string }>();
    expect(stored?.token).not.toBe(t);
    expect(stored?.token).toMatch(/^sha256:[0-9a-f]{64}$/);
    expect((await api(`/v1/invitations/${encodeURIComponent(stored!.token)}`)).status).toBe(404);
    expect((await accept(stored!.token, parent)).status).toBe(404);
    expect((await api(`/v1/invitations/${t}`)).status).toBe(200);
  });

  it("does not expose student or guardian details in the public token preview", async () => {
    const t = await token();
    const result = await api(`/v1/invitations/${t}`);
    expect(result.status).toBe(200);
    const body = (await result.json()) as Record<string, unknown>;
    expect(body.status).toBe("pending");
    expect(body).not.toHaveProperty("studentName");
    expect(body).not.toHaveProperty("guardianName");
    expect(body).not.toHaveProperty("note");
  });
  it("rejects a different verified parent and preserves the pending token", async () => {
    const t = await token();
    expect((await accept(t, other)).status).toBe(403);
    expect(
      (
        await env.DB.prepare("SELECT status FROM parent_invitations WHERE token = ?")
          .bind(await invitationTokenKey(t))
          .first<{ status: string }>()
      )?.status,
    ).toBe("pending");
    expect(
      await env.DB.prepare("SELECT 1 FROM parent_students WHERE parent_id = ? AND student_id = ?")
        .bind(otherId, studentId)
        .first(),
    ).toBeNull();
    expect((await accept(t, parent)).status).toBe(200);
  });
  it("requires verified email even for the intended parent", async () => {
    const t = await token();
    await env.DB.prepare("UPDATE users SET email_verified_at = NULL WHERE id = ?")
      .bind(parentId)
      .run();
    try {
      expect((await accept(t, parent)).status).toBe(403);
      expect(
        (
          await env.DB.prepare("SELECT status FROM parent_invitations WHERE token = ?")
            .bind(await invitationTokenKey(t))
            .first<{ status: string }>()
        )?.status,
      ).toBe("pending");
    } finally {
      await env.DB.prepare("UPDATE users SET email_verified_at = ? WHERE id = ?")
        .bind("2026-01-01T00:00:00.000Z", parentId)
        .run();
    }
  });
  it("does not convert an unrelated student account to parent", async () => {
    const t = await token();
    expect((await accept(t, student)).status).toBe(403);
    expect(
      (
        await env.DB.prepare("SELECT role_key FROM users WHERE id = ?")
          .bind(studentId)
          .first<{ role_key: string }>()
      )?.role_key,
    ).toBe("student");
  });
  it("requires old unbound invitations to be reissued, without changing their data", async () => {
    const t = await token();
    await env.DB.prepare(
      "UPDATE parent_invitations SET guardian_user_id = NULL, token = ? WHERE token = ?",
    )
      .bind(t, await invitationTokenKey(t))
      .run();
    const res = await accept(t, parent);
    expect(res.status).toBe(409);
    expect(((await res.json()) as { error: { code: string } }).error.code).toBe(
      "INVITATION_REISSUE_REQUIRED",
    );
    expect(
      (
        await env.DB.prepare("SELECT status FROM parent_invitations WHERE token = ?")
          .bind(t)
          .first<{ status: string }>()
      )?.status,
    ).toBe("pending");
  });
  it("paginates real admin accounts without duplicates or omissions", async () => {
    const ids: string[] = [];
    let cursor: string | undefined;
    let total = 0;
    for (let page = 0; page < 100; page++) {
      const res = await api(
        `/v1/admin/accounts?limit=5${cursor ? `&cursor=${encodeURIComponent(cursor)}` : ""}`,
        { headers: cookieHeaders(admin) },
      );
      expect(res.status).toBe(200);
      const body = (await res.json()) as {
        items: { id: string }[];
        total: number;
        nextCursor?: string;
      };
      total = body.total;
      ids.push(...body.items.map((item) => item.id));
      cursor = body.nextCursor;
      if (!cursor) break;
    }
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids.length).toBe(total);
    expect(ids).toContain(parentId);
    expect(ids).toContain(studentId);
  });
});
