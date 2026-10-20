import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import { env } from "cloudflare:workers";
import { api, cookieHeaders, createTestSession, sessionCookieFrom, setupDb } from "./helpers";
import { sha256Hex } from "../src/lib/crypto";
import { eligibleNativeDevices } from "../src/lib/native-push";

let studentCookie: string;
let adminCookie: string;
let userId: string;
let adminId: string;
let sessionId: string;
const noon = new Date();
noon.setUTCHours(12, 0, 0, 0);
const fixture = () => ({
  installationId: crypto.randomUUID(),
  deviceSecret: "S".repeat(43),
  token: `test:${crypto.randomUUID()}`,
});
function put(body: unknown, cookie = studentCookie) {
  return api("/v1/push/devices", {
    method: "PUT",
    headers: { ...cookieHeaders(cookie), "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}
async function list(cookie = studentCookie) {
  return api("/v1/push/devices", { headers: cookieHeaders(cookie) });
}
async function devices(user = userId, at = noon) {
  return eligibleNativeDevices(env.DB, user, at);
}

beforeAll(async () => {
  await setupDb();
  const student = await createTestSession("student@cea.ng");
  const admin = await createTestSession("admin@cea.ng");
  studentCookie = student.cookie;
  userId = student.session.user.id;
  adminCookie = admin.cookie;
  adminId = admin.session.user.id;
  sessionId = (await env.DB.prepare("SELECT id FROM sessions WHERE token_hash = ?")
    .bind(await sha256Hex(studentCookie))
    .first<{ id: string }>())!.id;
});
beforeEach(async () => {
  // All writes here use the isolated local Workers test DB, never remote D1.
  await env.DB.prepare("DELETE FROM native_push_devices").run();
  await env.RATE_LIMIT.delete(`rl:native-push-register:${userId}`);
  await env.DB.prepare(
    "UPDATE sessions SET revoked_at = NULL, mfa_pending = 0, expires_at = '2999-01-01T00:00:00.000Z' WHERE id = ?",
  )
    .bind(sessionId)
    .run();
  await env.DB.prepare("UPDATE users SET status = 'active' WHERE id = ?").bind(userId).run();
  await env.DB.prepare("DELETE FROM notification_preferences WHERE user_id IN (?, ?)")
    .bind(userId, adminId)
    .run();
});

describe("account-bound native push registrations", () => {
  it("requires authentication for every operation", async () => {
    for (const method of ["GET", "PUT", "DELETE"]) {
      const path = method === "DELETE" ? "/v1/push/devices/unknown" : "/v1/push/devices";
      expect((await api(path, { method })).status).toBe(401);
    }
  });
  it("binds to authenticated identity, returns metadata only and hashes device proof", async () => {
    const body = fixture();
    expect((await put(body)).status).toBe(200);
    const response = await list();
    expect(response.headers.get("Cache-Control")).toBe("no-store");
    const json = (await response.json()) as { items: Record<string, unknown>[] };
    expect(json.items).toHaveLength(1);
    expect(Object.keys(json.items[0]!).sort()).toEqual(["createdAt", "id", "updatedAt"]);
    const row = await env.DB.prepare("SELECT * FROM native_push_devices WHERE id = ?")
      .bind(body.installationId)
      .first();
    expect(row?.user_id).toBe(userId);
    expect(row?.session_id).toBe(sessionId);
    expect(row?.device_secret_hash).toBe(await sha256Hex(body.deviceSecret));
    expect(JSON.stringify(json)).not.toContain(body.token);
    expect(await (await list(adminCookie)).json()).toEqual({ items: [] });
  });
  it("rejects malformed IDs, tokens, missing proof and client-chosen accounts", async () => {
    for (const patch of [
      { installationId: "bad" },
      { token: "https://attacker.test/token" },
      { deviceSecret: "short" },
      { userId: adminId },
      { token: "t".repeat(4097) },
    ]) {
      expect((await put({ ...fixture(), ...patch })).status).toBe(400);
    }
    expect(await devices()).toEqual([]);
  });
  it("limits request body size", async () => {
    expect((await put({ ...fixture(), token: "t".repeat(10000) })).status).toBe(413);
  });
  it("replaces tokens idempotently without leaving the previous token eligible", async () => {
    const body = fixture();
    expect((await put(body)).status).toBe(200);
    expect((await put(body)).status).toBe(200);
    const rotated = { ...body, token: `rotated:${crypto.randomUUID()}` };
    expect((await put(rotated)).status).toBe(200);
    expect(await devices()).toEqual([{ id: body.installationId, token: rotated.token }]);
  });
  it("requires installation proof even when an administrator attempts takeover", async () => {
    const body = fixture();
    await put(body);
    expect((await put({ ...body, deviceSecret: "W".repeat(43) }, adminCookie)).status).toBe(409);
    expect(await devices()).toHaveLength(1);
    expect(await devices(adminId)).toEqual([]);
  });
  it("atomically moves a shared phone to the new account when installation proof matches", async () => {
    const body = fixture();
    await put(body);
    expect((await put(body, adminCookie)).status).toBe(200);
    expect(await devices()).toEqual([]);
    expect(await devices(adminId)).toHaveLength(1);
    await api(`/v1/push/devices/${body.installationId}`, {
      method: "DELETE",
      headers: cookieHeaders(studentCookie),
    });
    expect(await devices(adminId)).toHaveLength(1);
  });
  it("rejects a duplicate token on a different installation without reassignment", async () => {
    const body = fixture();
    await put(body);
    expect((await put({ ...fixture(), token: body.token }, adminCookie)).status).toBe(409);
    expect(await devices()).toHaveLength(1);
    expect(await devices(adminId)).toEqual([]);
  });
  it("supports owner-only, idempotent removal", async () => {
    const body = fixture();
    await put(body);
    const remove = (cookie: string) =>
      api(`/v1/push/devices/${body.installationId}`, {
        method: "DELETE",
        headers: cookieHeaders(cookie),
      });
    expect((await remove(adminCookie)).status).toBe(200);
    expect(await devices()).toHaveLength(1);
    expect((await remove(studentCookie)).status).toBe(200);
    expect(await devices()).toEqual([]);
    expect((await remove(studentCookie)).status).toBe(200);
  });
  it("caps devices atomically but still permits rotation at the cap", async () => {
    const first = fixture();
    await put(first);
    for (let n = 1; n < 20; n++) expect((await put(fixture())).status).toBe(200);
    expect((await put(fixture())).status).toBe(409);
    expect((await put({ ...first, token: `replacement:${crypto.randomUUID()}` })).status).toBe(200);
    expect(await devices()).toHaveLength(20);
  });
  it("keeps the cap under concurrent registrations", async () => {
    const responses = await Promise.all(Array.from({ length: 24 }, () => put(fixture())));
    expect(responses.filter((response) => response.status === 200)).toHaveLength(20);
    expect(responses.filter((response) => response.status === 409)).toHaveLength(4);
    expect(await devices()).toHaveLength(20);
  });
  it("rate-limits registration without blocking device removal", async () => {
    const body = fixture();
    await put(body);
    const windowStart = Math.floor(Date.now() / 3600000) * 3600000;
    await env.RATE_LIMIT.put(
      `rl:native-push-register:${userId}`,
      JSON.stringify({ windowStart, count: 60 }),
    );
    const response = await put(fixture());
    expect(response.status).toBe(429);
    expect(response.headers.get("Retry-After")).toBeTruthy();
    expect(
      (
        await api(`/v1/push/devices/${body.installationId}`, {
          method: "DELETE",
          headers: cookieHeaders(studentCookie),
        })
      ).status,
    ).toBe(200);
    expect(await devices()).toEqual([]);
  });
  it("keeps binding through session-cookie refresh, then excludes it after real sign-out", async () => {
    await put(fixture());
    const refresh = await api("/v1/auth/refresh", {
      method: "POST",
      headers: cookieHeaders(studentCookie),
    });
    expect(refresh.status).toBe(200);
    studentCookie = sessionCookieFrom(refresh)!;
    expect(await devices()).toHaveLength(1);
    const out = await api("/v1/auth/sign-out", {
      method: "POST",
      headers: cookieHeaders(studentCookie),
    });
    expect(out.status).toBe(200);
    expect(await devices()).toEqual([]);
    expect((await put(fixture())).status).toBe(401);
  });
  it("excludes expired and MFA-pending sessions and suspended accounts", async () => {
    await put(fixture());
    await env.DB.prepare("UPDATE sessions SET expires_at = '2000-01-01T00:00:00.000Z' WHERE id = ?")
      .bind(sessionId)
      .run();
    expect(await devices()).toEqual([]);
    await env.DB.prepare(
      "UPDATE sessions SET expires_at = '2999-01-01T00:00:00.000Z', mfa_pending = 1 WHERE id = ?",
    )
      .bind(sessionId)
      .run();
    expect(await devices()).toEqual([]);
    await env.DB.prepare("UPDATE sessions SET mfa_pending = 0 WHERE id = ?").bind(sessionId).run();
    await env.DB.prepare("UPDATE users SET status = 'suspended' WHERE id = ?").bind(userId).run();
    expect(await devices()).toEqual([]);
  });
  it("honours app preferences and Africa/Lagos quiet-hour boundaries", async () => {
    await put(fixture());
    const at = (hour: number) => {
      const date = new Date(noon);
      date.setUTCHours(hour);
      return date;
    };
    expect(await devices(userId, at(19))).toHaveLength(1);
    expect(await devices(userId, at(20))).toEqual([]);
    expect(await devices(userId, at(6))).toEqual([]);
    expect(await devices(userId, at(7))).toHaveLength(1);
    await env.DB.prepare(
      "INSERT INTO notification_preferences (user_id, app_enabled, quiet_start, quiet_end) VALUES (?, 0, '12:00', '14:00')",
    )
      .bind(userId)
      .run();
    expect(await devices(userId, at(9))).toEqual([]);
    await env.DB.prepare("UPDATE notification_preferences SET app_enabled = 1 WHERE user_id = ?")
      .bind(userId)
      .run();
    expect(await devices(userId, at(11))).toEqual([]);
    expect(await devices(userId, at(13))).toHaveLength(1);
    await env.DB.prepare(
      "UPDATE notification_preferences SET quiet_start = quiet_end WHERE user_id = ?",
    )
      .bind(userId)
      .run();
    expect(await devices(userId, at(12))).toHaveLength(1);
  });
});
