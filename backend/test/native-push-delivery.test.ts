import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { env } from "cloudflare:workers";
import { api, cookieHeaders, createTestSession, setupDb } from "./helpers";
import { sendNativeInboxHint } from "../src/lib/native-push";
import { bytesToBase64Url } from "../src/lib/push";
import { sha256Hex } from "../src/lib/crypto";
import type { AppEnv } from "../src/types";

let secret: string, cookie: string, userId: string, sessionId: string;
let deviceId: string;
const token = "fake-fcm-token-for-isolated-local-tests-only";
const testEnv = env as unknown as AppEnv;
const success = () => Response.json({ name: "projects/cyber-elias-academy-app/messages/fake" });
const gone = () =>
  Response.json(
    {
      error: {
        details: [
          {
            "@type": "type.googleapis.com/google.firebase.fcm.v1.FcmError",
            errorCode: "UNREGISTERED",
          },
        ],
      },
    },
    { status: 404 },
  );
const oauth = () => Response.json({ access_token: "fake-access", token_type: "Bearer" });
const testRequest = (body: unknown = {}, auth = cookie) =>
  api("/v1/push/devices/test", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(auth ? cookieHeaders(auth) : {}) },
    body: JSON.stringify(body),
  });

beforeAll(async () => {
  await setupDb();
  const session = await createTestSession("student@cea.ng");
  cookie = session.cookie;
  userId = session.session.user.id;
  sessionId = (await env.DB.prepare("SELECT id FROM sessions WHERE token_hash = ?")
    .bind(await sha256Hex(cookie))
    .first<{ id: string }>())!.id;
  const pair = (await crypto.subtle.generateKey(
    {
      name: "RSASSA-PKCS1-v1_5",
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256",
    },
    true,
    ["sign", "verify"],
  )) as CryptoKeyPair;
  secret = JSON.stringify({
    type: "service_account",
    project_id: "cyber-elias-academy-app",
    client_email: "test-sender@cyber-elias-academy-app.iam.gserviceaccount.com",
    private_key: `-----BEGIN PRIVATE KEY-----\n${bytesToBase64Url(new Uint8Array((await crypto.subtle.exportKey("pkcs8", pair.privateKey)) as ArrayBuffer))}\n-----END PRIVATE KEY-----`,
  });
});
beforeEach(async () => {
  deviceId = crypto.randomUUID();
  testEnv.FCM_SERVICE_ACCOUNT_JSON = secret;
  await env.DB.prepare("DELETE FROM native_push_devices").run();
  await env.DB.prepare("UPDATE sessions SET revoked_at = NULL WHERE id = ?").bind(sessionId).run();
  await env.DB.prepare(
    "INSERT INTO native_push_devices (id,user_id,session_id,device_secret_hash,token,created_at,updated_at) VALUES (?,?,?,?,?,?,?)",
  )
    .bind(
      deviceId,
      userId,
      sessionId,
      "test-hash",
      token,
      new Date().toISOString(),
      new Date().toISOString(),
    )
    .run();
  await env.DB.prepare(
    "INSERT INTO notification_preferences (user_id,app_enabled,quiet_start,quiet_end) VALUES (?,1,'00:00','00:00') ON CONFLICT(user_id) DO UPDATE SET app_enabled=1, quiet_start='00:00', quiet_end='00:00'",
  )
    .bind(userId)
    .run();
  await env.RATE_LIMIT.delete(`rl:native-push-test:${userId}`);
  // Fail closed: tests may never fall through to a live Google request.
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => {
      throw new Error("Unexpected external request in test");
    }),
  );
});
afterEach(() => {
  delete testEnv.FCM_SERVICE_ACCOUNT_JSON;
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("native push selection and self-test endpoint", () => {
  it("requires auth and rejects arbitrary recipients or content", async () => {
    expect((await testRequest({}, "")).status).toBe(401);
    for (const body of [
      { userId: "another-user" },
      { title: "private details" },
      { url: "https://attacker.invalid" },
    ])
      expect((await testRequest(body)).status).toBe(400);
    expect(fetch).not.toHaveBeenCalled();
  });
  it("rejects simple cross-origin text posts even with a valid cookie", async () => {
    const response = await api("/v1/push/devices/test", {
      method: "POST",
      headers: {
        ...cookieHeaders(cookie),
        "Content-Type": "text/plain",
        Origin: "https://attacker.invalid",
      },
      body: "{}",
    });
    expect(response.status).toBe(403);
    const noOrigin = await api("/v1/push/devices/test", {
      method: "POST",
      headers: { ...cookieHeaders(cookie), "Content-Type": "text/plain" },
      body: "{}",
    });
    expect(noOrigin.status).toBe(415);
    expect(fetch).not.toHaveBeenCalled();
  });
  it("fails closed when server credentials are missing", async () => {
    delete testEnv.FCM_SERVICE_ACCOUNT_JSON;
    const response = await testRequest();
    expect(response.status).toBe(503);
    expect(await response.json()).toMatchObject({ error: { code: "NATIVE_PUSH_UNAVAILABLE" } });
    expect(fetch).not.toHaveBeenCalled();
  });
  it("sends only the caller's generic hint and returns counters without secrets", async () => {
    const sender = vi.fn(async (url: RequestInfo | URL) =>
      String(url).includes("oauth2") ? oauth() : success(),
    );
    vi.stubGlobal("fetch", sender);
    const response = await testRequest();
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ accepted: 1, removed: 0, failed: 0, skipped: 0 });
    expect(sender).toHaveBeenCalledTimes(2);
  });
  it("limits self-tests to three per hour without contacting Google on the fourth", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url: RequestInfo | URL) =>
        String(url).includes("oauth2") ? oauth() : success(),
      ),
    );
    for (let i = 0; i < 3; i++) expect((await testRequest()).status).toBe(200);
    const fourth = await testRequest();
    expect(fourth.status).toBe(429);
    expect(fourth.headers.get("Retry-After")).toBeTruthy();
    expect(fetch).toHaveBeenCalledTimes(6);
  });
  it("does not contact Google when preferences disable delivery", async () => {
    await env.DB.prepare("UPDATE notification_preferences SET app_enabled=0 WHERE user_id=?")
      .bind(userId)
      .run();
    expect(await sendNativeInboxHint(testEnv, userId)).toEqual({
      accepted: 0,
      removed: 0,
      failed: 0,
      skipped: 0,
    });
    expect(fetch).not.toHaveBeenCalled();
  });
  it("rechecks session revocation after OAuth and skips the device", async () => {
    const sender = vi.fn(async () => {
      await env.DB.prepare("UPDATE sessions SET revoked_at=? WHERE id=?")
        .bind(new Date().toISOString(), sessionId)
        .run();
      return oauth();
    });
    expect(await sendNativeInboxHint(testEnv, userId, sender)).toEqual({
      accepted: 0,
      removed: 0,
      failed: 0,
      skipped: 1,
    });
    expect(sender).toHaveBeenCalledTimes(1);
  });
  it("prunes only an exact stale registration on UNREGISTERED", async () => {
    const result = await sendNativeInboxHint(testEnv, userId, async (url) =>
      String(url).includes("oauth2") ? oauth() : gone(),
    );
    expect(result.removed).toBe(1);
    expect(
      await env.DB.prepare("SELECT id FROM native_push_devices WHERE id=?").bind(deviceId).first(),
    ).toBeNull();
  });
  it("does not prune a token rotated during an in-flight send", async () => {
    const result = await sendNativeInboxHint(testEnv, userId, async (url) => {
      if (String(url).includes("oauth2")) return oauth();
      await env.DB.prepare("UPDATE native_push_devices SET token='new-token' WHERE id=?")
        .bind(deviceId)
        .run();
      return gone();
    });
    expect(result.removed).toBe(0);
    expect(
      await env.DB.prepare("SELECT token FROM native_push_devices WHERE id=?")
        .bind(deviceId)
        .first(),
    ).toEqual({ token: "new-token" });
  });
  it("does not prune a registration transferred during an in-flight send", async () => {
    const other = await env.DB.prepare("SELECT id FROM users WHERE email='admin@cea.ng'").first<{
      id: string;
    }>();
    const result = await sendNativeInboxHint(testEnv, userId, async (url) => {
      if (String(url).includes("oauth2")) return oauth();
      await env.DB.prepare("UPDATE native_push_devices SET user_id=? WHERE id=?")
        .bind(other!.id, deviceId)
        .run();
      return gone();
    });
    expect(result.removed).toBe(0);
    expect(
      await env.DB.prepare("SELECT user_id FROM native_push_devices WHERE id=?")
        .bind(deviceId)
        .first(),
    ).toEqual({ user_id: other!.id });
  });
  it("stops starting sends after the batch budget", async () => {
    await env.DB.prepare(
      "INSERT INTO native_push_devices (id,user_id,session_id,device_secret_hash,token,created_at,updated_at) SELECT ?,user_id,session_id,device_secret_hash,?,created_at,updated_at FROM native_push_devices WHERE id=?",
    )
      .bind(crypto.randomUUID(), "second-fake-token", deviceId)
      .run();
    const start = Date.now();
    const now = vi.spyOn(Date, "now").mockReturnValue(start);
    const sender = vi.fn(async (url: RequestInfo | URL) => {
      if (String(url).includes("oauth2")) return oauth();
      now.mockReturnValue(start + 21000);
      return success();
    });
    expect(await sendNativeInboxHint(testEnv, userId, sender)).toEqual({
      accepted: 1,
      removed: 0,
      failed: 0,
      skipped: 1,
    });
    expect(sender).toHaveBeenCalledTimes(2);
  });
  it("retains registrations and does not retry transient failures", async () => {
    const sender = vi.fn(async (url: RequestInfo | URL) =>
      String(url).includes("oauth2")
        ? oauth()
        : Response.json({ error: { status: "UNAVAILABLE" } }, { status: 503 }),
    );
    expect(await sendNativeInboxHint(testEnv, userId, sender)).toEqual({
      accepted: 0,
      removed: 0,
      failed: 1,
      skipped: 0,
    });
    expect(sender).toHaveBeenCalledTimes(2);
    expect(
      await env.DB.prepare("SELECT id FROM native_push_devices WHERE id=?").bind(deviceId).first(),
    ).not.toBeNull();
  });
});
