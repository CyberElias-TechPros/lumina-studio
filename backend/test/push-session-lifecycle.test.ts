import { env } from "cloudflare:workers";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { api, cookieHeaders, createTestSession, setupDb } from "./helpers";
import { base64UrlToBytes, bytesToBase64Url } from "../src/lib/push";
import { hashIdentifier } from "../src/lib/rate-limit";

const userId = "push-lifecycle-user";
const endpoint = "https://fcm.googleapis.com/fcm/send/lifecycle-token";
let admin: string;
let first: string;
let second: string;
let keys: { p256dh: string; auth: string };

async function ecKeys(algorithm: "ECDH" | "ECDSA") {
  const pair = (await crypto.subtle.generateKey(
    { name: algorithm, namedCurve: "P-256" },
    true,
    algorithm === "ECDH" ? ["deriveBits"] : ["sign"],
  )) as CryptoKeyPair;
  const pub = (await crypto.subtle.exportKey("jwk", pair.publicKey)) as JsonWebKey;
  const priv = (await crypto.subtle.exportKey("jwk", pair.privateKey)) as JsonWebKey;
  const raw = new Uint8Array(65);
  raw[0] = 4;
  raw.set(base64UrlToBytes(pub.x!), 1);
  raw.set(base64UrlToBytes(pub.y!), 33);
  return { publicKey: bytesToBase64Url(raw), privateKey: priv.d! };
}

beforeAll(async () => {
  await setupDb();
  await env.DB.prepare("INSERT INTO users (id, name, email, role_key) VALUES (?, ?, ?, 'student')")
    .bind(userId, "Push test", "push-lifecycle@example.test")
    .run();
  await env.DB.prepare(
    "INSERT INTO notification_preferences (user_id,app_enabled,quiet_start,quiet_end) VALUES (?,1,'00:00','00:00')",
  )
    .bind(userId)
    .run();
  admin = (await createTestSession("admin@cea.ng")).cookie;
  first = (await createTestSession("push-lifecycle@example.test")).cookie;
  second = (await createTestSession("push-lifecycle@example.test")).cookie;
  const subscription = await ecKeys("ECDH");
  keys = {
    p256dh: subscription.publicKey,
    auth: bytesToBase64Url(crypto.getRandomValues(new Uint8Array(16))),
  };
  const vapid = await ecKeys("ECDSA");
  const mutable = env as unknown as { VAPID_PUBLIC_KEY: string; VAPID_PRIVATE_KEY: string };
  mutable.VAPID_PUBLIC_KEY = vapid.publicKey;
  mutable.VAPID_PRIVATE_KEY = vapid.privateKey;
});

async function register(cookie: string, target = endpoint) {
  return api("/v1/push/subscriptions", {
    method: "POST",
    headers: { ...cookieHeaders(cookie), "Content-Type": "application/json" },
    body: JSON.stringify({ endpoint: target, keys }),
  });
}
async function send() {
  return api("/v1/push/send", {
    method: "POST",
    headers: { ...cookieHeaders(admin), "Content-Type": "application/json" },
    body: JSON.stringify({ userId, title: "Test", body: "Test" }),
  });
}

describe("web push session lifecycle", () => {
  it("sends only to active-session registrations; logout blocks delivery until the browser re-registers", async () => {
    expect((await register(first)).status).toBe(201);
    await env.DB.prepare(
      "INSERT INTO push_subscriptions (id,user_id,endpoint,p256dh,auth) VALUES (?,?,?,?,?)",
    )
      .bind(
        "push-legacy-unbound",
        userId,
        "https://fcm.googleapis.com/fcm/send/old-token",
        keys.p256dh,
        keys.auth,
      )
      .run();
    const sender = vi.fn(
      async (_endpoint: string, _init: RequestInit) => new Response("ok", { status: 201 }),
    );
    vi.stubGlobal("fetch", sender);
    try {
      const initial = await send();
      expect(initial.status).toBe(200);
      expect(sender.mock.calls.map((call) => call[0])).toEqual([endpoint]);
      expect(((await initial.json()) as { skipped?: number }).skipped).toBe(1);
      sender.mockClear();
      expect(
        (await api("/v1/auth/sign-out", { method: "POST", headers: cookieHeaders(first) })).status,
      ).toBe(200);
      await send();
      expect(sender).not.toHaveBeenCalled();
      expect((await register(second)).status).toBe(201);
      await send();
      expect(sender.mock.calls.map((call) => call[0])).toEqual([endpoint]);
      const record = await env.DB.prepare(
        "SELECT session_id FROM push_subscriptions WHERE endpoint = ?",
      )
        .bind(endpoint)
        .first<{ session_id: string }>();
      expect(record?.session_id).toBeTruthy();
      sender.mockClear();
      await env.DB.prepare("UPDATE sessions SET expires_at = ? WHERE id = ?")
        .bind("2000-01-01T00:00:00.000Z", record!.session_id)
        .run();
      await send();
      expect(sender).not.toHaveBeenCalled();
      await env.DB.prepare("UPDATE sessions SET expires_at = ?, mfa_pending = 1 WHERE id = ?")
        .bind("2099-01-01T00:00:00.000Z", record!.session_id)
        .run();
      await send();
      expect(sender).not.toHaveBeenCalled();
      await env.DB.prepare("UPDATE sessions SET mfa_pending = 0 WHERE id = ?")
        .bind(record!.session_id)
        .run();
      await env.DB.prepare("UPDATE users SET status = 'suspended' WHERE id = ?").bind(userId).run();
      await send();
      expect(sender).not.toHaveBeenCalled();
      await env.DB.prepare("UPDATE users SET status = 'active' WHERE id = ?").bind(userId).run();
      await send();
      expect(sender.mock.calls.map((call) => call[0])).toEqual([endpoint]);
    } finally {
      vi.unstubAllGlobals();
    }
  });
  it("rechecks eligibility before each send when another session is revoked during fan-out", async () => {
    await env.DB.prepare("DELETE FROM push_subscriptions WHERE user_id = ?").bind(userId).run();
    const one = await createTestSession("push-lifecycle@example.test");
    const two = await createTestSession("push-lifecycle@example.test");
    const endpoints = [
      "https://fcm.googleapis.com/fcm/send/fanout-one",
      "https://fcm.googleapis.com/fcm/send/fanout-two",
    ];
    expect((await register(one.cookie, endpoints[0])).status).toBe(201);
    expect((await register(two.cookie, endpoints[1])).status).toBe(201);
    const rows = (
      await env.DB.prepare("SELECT endpoint, session_id FROM push_subscriptions WHERE user_id = ?")
        .bind(userId)
        .all<{ endpoint: string; session_id: string }>()
    ).results;
    expect(rows).toHaveLength(2);
    const sender = vi.fn(async (url: string, _init: RequestInit) => {
      const victim = rows.find((row) => row.endpoint !== url)!;
      await env.DB.prepare("UPDATE sessions SET revoked_at = ? WHERE id = ?")
        .bind(new Date().toISOString(), victim.session_id)
        .run();
      return new Response("ok", { status: 201 });
    });
    vi.stubGlobal("fetch", sender);
    try {
      const response = await send();
      expect(response.status).toBe(200);
      expect(sender).toHaveBeenCalledTimes(1);
      expect(await response.json()).toMatchObject({ sent: 1, skipped: 1 });
    } finally {
      vi.unstubAllGlobals();
    }
  });
  it("reports provider failures and network errors instead of claiming delivery", async () => {
    await env.DB.prepare("DELETE FROM push_subscriptions WHERE user_id = ?").bind(userId).run();
    const active = await createTestSession("push-lifecycle@example.test");
    expect((await register(active.cookie)).status).toBe(201);
    for (const sender of [
      async () => new Response("upstream rejected", { status: 500 }),
      async () => {
        throw new Error("network failed");
      },
    ]) {
      vi.stubGlobal("fetch", sender);
      try {
        const result = await send();
        expect(result.status).toBe(200);
        expect(await result.json()).toMatchObject({ sent: 0, removed: 0, failed: 1 });
      } finally {
        vi.unstubAllGlobals();
      }
    }
  });

  it("does not prune or report deletion of a subscription rebound while delivery was in flight", async () => {
    await env.RATE_LIMIT.delete(
      `rl:magic-link:${await hashIdentifier("push-lifecycle@example.test")}`,
    );
    await env.DB.prepare("DELETE FROM push_subscriptions WHERE user_id = ?").bind(userId).run();
    const oldSession = await createTestSession("push-lifecycle@example.test");
    const newSession = await createTestSession("push-lifecycle@example.test");
    expect((await register(oldSession.cookie)).status).toBe(201);
    vi.stubGlobal("fetch", async () => {
      expect((await register(newSession.cookie)).status).toBe(201);
      return new Response("gone", { status: 410 });
    });
    try {
      const result = await send();
      expect(await result.json()).toMatchObject({ sent: 0, removed: 0 });
      expect(
        await env.DB.prepare("SELECT id FROM push_subscriptions WHERE endpoint = ?")
          .bind(endpoint)
          .first(),
      ).toBeTruthy();
    } finally {
      vi.unstubAllGlobals();
    }
  });
  it("honors app opt-out and quiet hours before contacting a push service", async () => {
    await env.DB.prepare("DELETE FROM push_subscriptions WHERE user_id = ?").bind(userId).run();
    await env.RATE_LIMIT.delete(
      `rl:magic-link:${await hashIdentifier("push-lifecycle@example.test")}`,
    );
    const active = await createTestSession("push-lifecycle@example.test");
    expect((await register(active.cookie)).status).toBe(201);
    const sender = vi.fn(async () => new Response("ok", { status: 201 }));
    vi.stubGlobal("fetch", sender);
    const hhmm = (offset: number) =>
      new Date(Date.now() + (60 + offset) * 60_000).toISOString().slice(11, 16);
    try {
      await env.DB.prepare("UPDATE notification_preferences SET app_enabled=0 WHERE user_id=?")
        .bind(userId)
        .run();
      expect(await (await send()).json()).toMatchObject({ sent: 0, skipped: 1 });
      await env.DB.prepare(
        "UPDATE notification_preferences SET app_enabled=1,quiet_start=?,quiet_end=? WHERE user_id=?",
      )
        .bind(hhmm(-5), hhmm(5), userId)
        .run();
      expect(await (await send()).json()).toMatchObject({ sent: 0, skipped: 1 });
      expect(sender).not.toHaveBeenCalled();
    } finally {
      vi.unstubAllGlobals();
      await env.DB.prepare(
        "UPDATE notification_preferences SET app_enabled=1,quiet_start='00:00',quiet_end='00:00' WHERE user_id=?",
      )
        .bind(userId)
        .run();
    }
  });
  it("rechecks notification preferences if they change during fan-out", async () => {
    await env.DB.prepare("DELETE FROM push_subscriptions WHERE user_id = ?").bind(userId).run();
    await env.RATE_LIMIT.delete(
      `rl:magic-link:${await hashIdentifier("push-lifecycle@example.test")}`,
    );
    const one = await createTestSession("push-lifecycle@example.test");
    const two = await createTestSession("push-lifecycle@example.test");
    expect(
      (await register(one.cookie, "https://fcm.googleapis.com/fcm/send/prefs-one")).status,
    ).toBe(201);
    expect(
      (await register(two.cookie, "https://fcm.googleapis.com/fcm/send/prefs-two")).status,
    ).toBe(201);
    const sender = vi.fn(async () => {
      await env.DB.prepare("UPDATE notification_preferences SET app_enabled=0 WHERE user_id=?")
        .bind(userId)
        .run();
      return new Response("ok", { status: 201 });
    });
    vi.stubGlobal("fetch", sender);
    try {
      expect(await (await send()).json()).toMatchObject({ sent: 1, skipped: 1 });
      expect(sender).toHaveBeenCalledTimes(1);
    } finally {
      vi.unstubAllGlobals();
      await env.DB.prepare("UPDATE notification_preferences SET app_enabled=1 WHERE user_id=?")
        .bind(userId)
        .run();
    }
  });
});
