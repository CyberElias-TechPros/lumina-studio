import { beforeAll, describe, expect, it, vi } from "vitest";
import { env } from "cloudflare:workers";
import { api, cookieHeaders, createTestSession, setupDb } from "./helpers";
import { base64UrlToBytes, bytesToBase64Url } from "../src/lib/push";

let studentCookie: string;
let adminCookie: string;

const ENDPOINT = "https://push.example.test/send?token=abc123";

async function makeSubscriptionKeys(): Promise<{ publicKey: string; auth: string }> {
  const pair = (await crypto.subtle.generateKey({ name: "ECDH", namedCurve: "P-256" }, true, [
    "deriveBits",
  ])) as CryptoKeyPair;
  const publicJwk = (await crypto.subtle.exportKey("jwk", pair.publicKey)) as JsonWebKey;
  const publicRaw = new Uint8Array(65);
  publicRaw[0] = 0x04;
  publicRaw.set(base64UrlToBytes(publicJwk.x ?? ""), 1);
  publicRaw.set(base64UrlToBytes(publicJwk.y ?? ""), 33);
  return {
    publicKey: bytesToBase64Url(publicRaw),
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
    const headers = new Headers(init.headers);
    expect(headers.get("Authorization")?.startsWith("vapid t=")).toBe(true);
    expect(headers.get("Content-Encoding")).toBe("aes128gcm");
    vi.unstubAllGlobals();
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

  it("validates the message payload", async () => {
    const res = await api("/v1/push/send", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(studentCookie) },
      body: JSON.stringify({ title: "", body: "", url: "/app/assignments" }),
    });
    expect(res.status).toBe(400);
  });
});
