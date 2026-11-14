import { beforeAll, describe, expect, it, vi } from "vitest";
import { env } from "cloudflare:workers";
import { api, cookieHeaders, createTestSession, setupDb } from "./helpers";
import { base64UrlToBytes, bytesToBase64Url, decryptPushPayload } from "../src/lib/push";

let studentCookie: string;
let adminCookie: string;

const ENDPOINT = "https://fcm.googleapis.com/fcm/send/local-test-token";

async function makeSubscriptionKeys(): Promise<{
  publicKey: string;
  privateKey: string;
  auth: string;
}> {
  const pair = (await crypto.subtle.generateKey({ name: "ECDH", namedCurve: "P-256" }, true, [
    "deriveBits",
  ])) as CryptoKeyPair;
  const publicJwk = (await crypto.subtle.exportKey("jwk", pair.publicKey)) as JsonWebKey;
  const privateJwk = (await crypto.subtle.exportKey("jwk", pair.privateKey)) as JsonWebKey;
  const publicRaw = new Uint8Array(65);
  publicRaw[0] = 0x04;
  publicRaw.set(base64UrlToBytes(publicJwk.x ?? ""), 1);
  publicRaw.set(base64UrlToBytes(publicJwk.y ?? ""), 33);
  return {
    publicKey: bytesToBase64Url(publicRaw),
    privateKey: privateJwk.d!,
    auth: bytesToBase64Url(crypto.getRandomValues(new Uint8Array(16))),
  };
}

async function configureVapidKeys(): Promise<void> {
  const pair = (await crypto.subtle.generateKey({ name: "ECDSA", namedCurve: "P-256" }, true, [
    "sign",
  ])) as CryptoKeyPair;
  const publicJwk = (await crypto.subtle.exportKey("jwk", pair.publicKey)) as JsonWebKey;
  const privateJwk = (await crypto.subtle.exportKey("jwk", pair.privateKey)) as JsonWebKey;
  const publicRaw = new Uint8Array(65);
  publicRaw[0] = 0x04;
  publicRaw.set(base64UrlToBytes(publicJwk.x ?? ""), 1);
  publicRaw.set(base64UrlToBytes(publicJwk.y ?? ""), 33);
  const mutable = env as unknown as { VAPID_PUBLIC_KEY: string; VAPID_PRIVATE_KEY: string };
  mutable.VAPID_PUBLIC_KEY = bytesToBase64Url(publicRaw);
  mutable.VAPID_PRIVATE_KEY = privateJwk.d ?? "";
}

function subscriptionBody(keys: { publicKey: string; auth: string }) {
  return JSON.stringify({ endpoint: ENDPOINT, keys: { p256dh: keys.publicKey, auth: keys.auth } });
}

beforeAll(async () => {
  await setupDb();
  studentCookie = (await createTestSession("student@cea.ng")).cookie;
  adminCookie = (await createTestSession("admin@cea.ng")).cookie;
  await env.DB.prepare(
    "INSERT INTO notification_preferences (user_id,app_enabled,quiet_start,quiet_end) VALUES (?,1,'00:00','00:00') ON CONFLICT(user_id) DO UPDATE SET app_enabled=1,quiet_start='00:00',quiet_end='00:00'",
  )
    .bind("00000000-0000-4000-8000-000000000001")
    .run();
});

describe("push subscription CRUD", () => {
  it("saves, lists and removes a subscription", async () => {
    const keys = await makeSubscriptionKeys();
    const created = await api("/v1/push/subscriptions", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(studentCookie) },
      body: subscriptionBody(keys),
    });
    expect(created.status).toBe(201);
    const createdBody = (await created.json()) as { id: string; endpoint: string };
    expect(createdBody.id).toMatch(/^ps-/);
    expect(createdBody.endpoint).toBe(ENDPOINT);

    const list = (await api("/v1/push/subscriptions", {
      headers: cookieHeaders(studentCookie),
    }).then((r) => r.json())) as { items: { id: string }[] };
    expect(list.items.map((item) => item.id)).toContain(createdBody.id);

    const removed = await api(`/v1/push/subscriptions/${createdBody.id}`, {
      method: "DELETE",
      headers: cookieHeaders(studentCookie),
    });
    expect(removed.status).toBe(200);

    const empty = (await api("/v1/push/subscriptions", {
      headers: cookieHeaders(studentCookie),
    }).then((r) => r.json())) as { items: unknown[] };
    expect(empty.items).toHaveLength(0);
  });

  it("replaces the subscription when the same endpoint is re-registered", async () => {
    const first = await makeSubscriptionKeys();
    await api("/v1/push/subscriptions", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(studentCookie) },
      body: subscriptionBody(first),
    });
    const second = await makeSubscriptionKeys();
    await api("/v1/push/subscriptions", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(studentCookie) },
      body: subscriptionBody(second),
    });
    const list = (await api("/v1/push/subscriptions", {
      headers: cookieHeaders(studentCookie),
    }).then((r) => r.json())) as { items: unknown[] };
    expect(list.items).toHaveLength(1);
  });

  it("rejects malformed subscriptions with 400", async () => {
    const res = await api("/v1/push/subscriptions", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(studentCookie) },
      body: JSON.stringify({ endpoint: "not a url", keys: { p256dh: "abc", auth: "nope" } }),
    });
    expect(res.status).toBe(400);
  });

  it.each([
    "http://fcm.googleapis.com/fcm/send/x",
    "https://127.0.0.1/private",
    "https://169.254.169.254/latest/meta-data/",
    "https://fcm.googleapis.com.attacker.test/x",
    "https://user:pass@fcm.googleapis.com/fcm/send/x",
    "https://fcm.googleapis.com:8443/fcm/send/x",
    "https://fcm.googleapis.com/fcm/send/x#fragment",
  ])("rejects an untrusted endpoint %s", async (endpoint) => {
    const keys = await makeSubscriptionKeys();
    const response = await api("/v1/push/subscriptions", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(studentCookie) },
      body: JSON.stringify({ endpoint, keys: { p256dh: keys.publicKey, auth: keys.auth } }),
    });
    expect(response.status).toBe(400);
  });

  it.each([
    "https://fcm.googleapis.com/fcm/send/test",
    "https://updates.push.services.mozilla.com/wpush/v2/test",
    "https://web.push.apple.com/test",
    "https://wns2-bl2p.notify.windows.com/w/test",
  ])("accepts supported browser endpoint %s", async (endpoint) => {
    const keys = await makeSubscriptionKeys();
    const response = await api("/v1/push/subscriptions", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(studentCookie) },
      body: JSON.stringify({ endpoint, keys: { p256dh: keys.publicKey, auth: keys.auth } }),
    });
    expect(response.status).toBe(201);
    const item = (await response.json()) as { id: string };
    await api(`/v1/push/subscriptions/${item.id}`, {
      method: "DELETE",
      headers: cookieHeaders(studentCookie),
    });
  });

  it("atomically prevents concurrent registrations from claiming the same endpoint", async () => {
    const endpoint = "https://fcm.googleapis.com/fcm/send/race-test";
    const make = async (cookie: string) => {
      const keys = await makeSubscriptionKeys();
      return api("/v1/push/subscriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...cookieHeaders(cookie) },
        body: JSON.stringify({ endpoint, keys: { p256dh: keys.publicKey, auth: keys.auth } }),
      });
    };
    const responses = await Promise.all([make(studentCookie), make(adminCookie)]);
    expect(responses.map((r) => r.status).sort()).toEqual([201, 409]);
    await env.DB.prepare("DELETE FROM push_subscriptions WHERE endpoint = ?").bind(endpoint).run();
  });

  it("does not let another account take over a registered endpoint", async () => {
    const ownerKeys = await makeSubscriptionKeys();
    const ownerResponse = await api("/v1/push/subscriptions", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(studentCookie) },
      body: subscriptionBody(ownerKeys),
    });
    expect(ownerResponse.status).toBe(201);
    const thiefKeys = await makeSubscriptionKeys();
    const response = await api("/v1/push/subscriptions", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(adminCookie) },
      body: subscriptionBody(thiefKeys),
    });
    expect(response.status).toBe(409);
    const row = await env.DB.prepare(
      "SELECT user_id, p256dh, auth FROM push_subscriptions WHERE endpoint = ?",
    )
      .bind(ENDPOINT)
      .first<{ user_id: string; p256dh: string; auth: string }>();
    expect(row?.user_id).toBe("00000000-0000-4000-8000-000000000001");
    expect(row?.p256dh).toBe(ownerKeys.publicKey);
    expect(row?.auth).toBe(ownerKeys.auth);
  });

  it("forbids deleting another user's subscription", async () => {
    const keys = await makeSubscriptionKeys();
    const created = (await api("/v1/push/subscriptions", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(studentCookie) },
      body: subscriptionBody(keys),
    }).then((r) => r.json())) as { id: string };

    const res = await api(`/v1/push/subscriptions/${created.id}`, {
      method: "DELETE",
      headers: cookieHeaders(adminCookie),
    });
    expect(res.status).toBe(403);
  });
});

describe("push send", () => {
  it("returns 503 when VAPID keys are not configured", async () => {
    const res = await api("/v1/push/send", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(studentCookie) },
      body: JSON.stringify({ title: "Hi", body: "Test" }),
    });
    expect(res.status).toBe(503);
  });

  it("encrypts and delivers to the caller's subscriptions", async () => {
    await configureVapidKeys();
    const fetchStub = vi.fn(
      async (_endpoint: string, _init: RequestInit) => new Response("ok", { status: 201 }),
    );
    vi.stubGlobal("fetch", fetchStub);

    const keys = await makeSubscriptionKeys();
    const subscription = await api("/v1/push/subscriptions", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(studentCookie) },
      body: subscriptionBody(keys),
    });
    expect(subscription.status).toBe(201);

    const res = await api("/v1/push/send", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(studentCookie) },
      body: JSON.stringify({
        title: "Assignment due",
        body: "Due Friday 18:00",
        url: "https://lumina.app/app/assignments",
      }),
    });
    expect(res.status).toBe(200);
    expect((await res.json()) as { sent: number; removed: number }).toEqual({
      sent: 1,
      removed: 0,
    });

    expect(fetchStub).toHaveBeenCalledTimes(1);
    const [endpoint, init] = fetchStub.mock.calls[0]!;
    expect(endpoint).toBe(ENDPOINT);
    expect(init.redirect).toBe("manual");
    const headers = new Headers(init.headers);
    expect(headers.get("Authorization")?.startsWith("vapid t=")).toBe(true);
    expect(headers.get("Content-Encoding")).toBe("aes128gcm");
    const plaintext = await decryptPushPayload(
      init.body as Uint8Array,
      base64UrlToBytes(keys.privateKey),
      base64UrlToBytes(keys.publicKey),
      base64UrlToBytes(keys.auth),
    );
    expect(JSON.parse(new TextDecoder().decode(plaintext))).toEqual({
      title: "CEA update",
      body: "Open CEA to check your notifications.",
      url: "/app/notifications",
    });
    vi.unstubAllGlobals();
  });

  it("never fetches an unsafe endpoint saved before validation was introduced", async () => {
    const keys = await makeSubscriptionKeys();
    const endpoint = "http://169.254.169.254/latest/meta-data/";
    await env.DB.prepare(
      "INSERT INTO push_subscriptions (id, user_id, endpoint, p256dh, auth) VALUES (?, ?, ?, ?, ?)",
    )
      .bind(
        "legacy-unsafe",
        "00000000-0000-4000-8000-000000000001",
        endpoint,
        keys.publicKey,
        keys.auth,
      )
      .run();
    const fetchStub = vi.fn(
      async (_endpoint: string, _init: RequestInit) => new Response("ok", { status: 201 }),
    );
    vi.stubGlobal("fetch", fetchStub);
    try {
      const res = await api("/v1/push/send", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...cookieHeaders(studentCookie) },
        body: JSON.stringify({ title: "Test", body: "Test" }),
      });
      expect(res.status).toBe(200);
      expect(((await res.json()) as { skipped?: number }).skipped).toBe(1);
      expect(fetchStub.mock.calls.some((call) => String(call[0]).includes("169.254.169.254"))).toBe(
        false,
      );
      expect(
        await env.DB.prepare(
          "SELECT id FROM push_subscriptions WHERE id = 'legacy-unsafe'",
        ).first(),
      ).toBeTruthy();
    } finally {
      vi.unstubAllGlobals();
      await env.DB.prepare("DELETE FROM push_subscriptions WHERE id = 'legacy-unsafe'").run();
    }
  });

  it("prunes dead endpoints (410) from the store", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async (_endpoint: string, _init: RequestInit) => new Response("", { status: 410 })),
    );

    const keys = await makeSubscriptionKeys();
    await api("/v1/push/subscriptions", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(studentCookie) },
      body: subscriptionBody(keys),
    });

    const res = await api("/v1/push/send", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(studentCookie) },
      body: JSON.stringify({ title: "Gone", body: "Remove me" }),
    });
    expect(res.status).toBe(200);
    expect((await res.json()) as { sent: number; removed: number }).toEqual({
      sent: 0,
      removed: 1,
    });

    const list = (await api("/v1/push/subscriptions", {
      headers: cookieHeaders(studentCookie),
    }).then((r) => r.json())) as { items: unknown[] };
    expect(list.items).toHaveLength(0);
    vi.unstubAllGlobals();
  });

  it("forbids a student from sending to another user", async () => {
    const res = await api("/v1/push/send", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(studentCookie) },
      body: JSON.stringify({
        userId: "00000000-0000-4000-8000-000000000003",
        title: "Sneaky",
        body: "No",
      }),
    });
    expect(res.status).toBe(403);
  });

  it("requires JSON for push operations even without an Origin header", async () => {
    for (const path of ["/v1/push/send", "/v1/push/subscriptions"]) {
      const res = await api(path, {
        method: "POST",
        headers: { ...cookieHeaders(studentCookie), "Content-Type": "text/plain" },
        body: "{}",
      });
      expect(res.status).toBe(415);
      expect(await res.json()).toMatchObject({ error: { code: "JSON_REQUIRED" } });
    }
  });

  it("throttles subscription registration before writing", async () => {
    const userId = "00000000-0000-4000-8000-000000000001";
    const bucket = `rl:web-push-register:${userId}`;
    const windowStart = Math.floor(Date.now() / 3600000) * 3600000;
    await env.RATE_LIMIT.put(bucket, JSON.stringify({ windowStart, count: 60 }));
    const keys = await makeSubscriptionKeys();
    const endpoint = "https://fcm.googleapis.com/fcm/send/limited-test";
    try {
      const res = await api("/v1/push/subscriptions", {
        method: "POST",
        headers: { ...cookieHeaders(studentCookie), "Content-Type": "application/json" },
        body: JSON.stringify({ endpoint, keys: { p256dh: keys.publicKey, auth: keys.auth } }),
      });
      expect(res.status).toBe(429);
      expect(res.headers.get("Retry-After")).toBeTruthy();
      expect(
        await env.DB.prepare("SELECT id FROM push_subscriptions WHERE endpoint = ?")
          .bind(endpoint)
          .first(),
      ).toBeNull();
    } finally {
      await env.RATE_LIMIT.delete(bucket);
    }
  });

  it("throttles repeated sends before network handoff", async () => {
    const userId = "00000000-0000-4000-8000-000000000001";
    const bucket = `rl:web-push-send:${userId}`;
    const windowStart = Math.floor(Date.now() / 3600000) * 3600000;
    await env.RATE_LIMIT.put(bucket, JSON.stringify({ windowStart, count: 30 }));
    const sender = vi.fn(async () => new Response("ok", { status: 201 }));
    vi.stubGlobal("fetch", sender);
    try {
      const res = await api("/v1/push/send", {
        method: "POST",
        headers: { ...cookieHeaders(studentCookie), "Content-Type": "application/json" },
        body: JSON.stringify({ title: "Test", body: "Test" }),
      });
      expect(res.status).toBe(429);
      expect(res.headers.get("Retry-After")).toBeTruthy();
      expect(sender).not.toHaveBeenCalled();
    } finally {
      vi.unstubAllGlobals();
      await env.RATE_LIMIT.delete(bucket);
    }
  });

  it("fails closed without sending when a target has more than 50 stored subscriptions", async () => {
    const userId = "00000000-0000-4000-8000-000000000001";
    const keys = await makeSubscriptionKeys();
    const statements = Array.from({ length: 51 }, (_, i) =>
      env.DB.prepare(
        "INSERT INTO push_subscriptions (id,user_id,endpoint,p256dh,auth) VALUES (?,?,?,?,?)",
      ).bind(
        `cap-test-${i}`,
        userId,
        `https://fcm.googleapis.com/fcm/send/cap-test-${i}`,
        keys.publicKey,
        keys.auth,
      ),
    );
    await env.DB.batch(statements);
    const sender = vi.fn(async () => new Response("ok", { status: 201 }));
    vi.stubGlobal("fetch", sender);
    try {
      const res = await api("/v1/push/send", {
        method: "POST",
        headers: { ...cookieHeaders(studentCookie), "Content-Type": "application/json" },
        body: JSON.stringify({ title: "Test", body: "Test" }),
      });
      expect(res.status).toBe(503);
      expect(await res.json()).toMatchObject({ error: { code: "PUSH_SUBSCRIPTION_LIMIT" } });
      expect(sender).not.toHaveBeenCalled();
    } finally {
      vi.unstubAllGlobals();
      await env.DB.prepare("DELETE FROM push_subscriptions WHERE id LIKE 'cap-test-%'").run();
    }
  });

  it("validates the message payload", async () => {
    const res = await api("/v1/push/send", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(studentCookie) },
      body: JSON.stringify({ title: "", body: "", url: "/app/assignments" }),
    });
    expect(res.status).toBe(400);
  });
});
