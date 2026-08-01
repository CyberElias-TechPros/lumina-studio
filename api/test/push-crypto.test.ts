import { describe, expect, it, vi } from "vitest";
import {
  buildVapidAuthorization,
  decryptPushPayload,
  encryptPushPayload,
  sendPushMessage,
  base64UrlToBytes,
  bytesToBase64Url,
} from "../src/lib/push";

const encoder = new TextEncoder();

async function makeRecipient(): Promise<{
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
    privateKey: privateJwk.d ?? "",
    auth: bytesToBase64Url(crypto.getRandomValues(new Uint8Array(16))),
  };
}

async function makeVapidKeys(): Promise<{ publicKey: string; privateKey: string }> {
  const pair = (await crypto.subtle.generateKey({ name: "ECDSA", namedCurve: "P-256" }, true, [
    "sign",
  ])) as CryptoKeyPair;
  const publicJwk = (await crypto.subtle.exportKey("jwk", pair.publicKey)) as JsonWebKey;
  const privateJwk = (await crypto.subtle.exportKey("jwk", pair.privateKey)) as JsonWebKey;
  const publicRaw = new Uint8Array(65);
  publicRaw[0] = 0x04;
  publicRaw.set(base64UrlToBytes(publicJwk.x ?? ""), 1);
  publicRaw.set(base64UrlToBytes(publicJwk.y ?? ""), 33);
  return { publicKey: bytesToBase64Url(publicRaw), privateKey: privateJwk.d ?? "" };
}

describe("sendPushMessage (RFC 8291 + VAPID)", () => {
  it("signs a VAPID JWT for the endpoint's origin", async () => {
    const vapid = await makeVapidKeys();
    const authorization = await buildVapidAuthorization(
      "https://push.example.test/v1/abc",
      "mailto:admin@cea.ng",
      vapid.publicKey,
      vapid.privateKey,
    );
    expect(authorization.startsWith("vapid t=")).toBe(true);
    expect(authorization.endsWith(`, k=${vapid.publicKey}`)).toBe(true);

    const token = authorization.slice("vapid t=".length, authorization.lastIndexOf(", k="));
    const [headerB64, claimsB64] = token.split(".");
    expect(JSON.parse(atob(headerB64 ?? ""))).toEqual({
      typ: "JWT",
      alg: "ES256",
      kid: vapid.publicKey,
    });
    const claims = JSON.parse(atob(claimsB64 ?? "")) as { aud: string; exp: number; sub: string };
    expect(claims.aud).toBe("https://push.example.test");
    expect(claims.sub).toBe("mailto:admin@cea.ng");
    expect(claims.exp).toBeGreaterThan(Math.floor(Date.now() / 1000));
  });

  it("encrypts the payload and delivers it via the push service", async () => {
    const recipient = await makeRecipient();
    const vapid = await makeVapidKeys();
    const sender = vi.fn(
      async (_endpoint: string, _init: RequestInit) => new Response("", { status: 201 }),
    );

    const outcome = await sendPushMessage(
      "https://push.example.test/send?token=abc",
      { p256dh: recipient.publicKey, auth: recipient.auth },
      { title: "Hello", body: "World", url: "https://lumina.app/app" },
      { publicKey: vapid.publicKey, privateKey: vapid.privateKey, subject: "mailto:admin@cea.ng" },
      sender as typeof fetch,
    );
    expect(outcome).toEqual({ delivered: true, removed: false, status: 201 });
    expect(sender).toHaveBeenCalledTimes(1);

    const [endpoint, init] = sender.mock.calls[0]!;
    expect(endpoint).toBe("https://push.example.test/send?token=abc");
    const headers = new Headers(init.headers);
    expect(headers.get("Authorization")?.startsWith("vapid t=")).toBe(true);
    expect(headers.get("Content-Encoding")).toBe("aes128gcm");
    expect(headers.get("TTL")).toBe("86400");

    const body = init.body as Uint8Array;
    const plaintext = await decryptPushPayload(
      body,
      base64UrlToBytes(recipient.privateKey),
      base64UrlToBytes(recipient.publicKey),
      base64UrlToBytes(recipient.auth),
    );
    expect(JSON.parse(new TextDecoder().decode(plaintext))).toEqual({
      title: "Hello",
      body: "World",
      url: "https://lumina.app/app",
    });
  });

  it("flags 404/410 responses as removed subscriptions", async () => {
    const recipient = await makeRecipient();
    const vapid = await makeVapidKeys();
    const sender = vi.fn(
      async (_endpoint: string, _init: RequestInit) => new Response("", { status: 410 }),
    );
    const outcome = await sendPushMessage(
      "https://push.example.test/send?token=abc",
      { p256dh: recipient.publicKey, auth: recipient.auth },
      { title: "Gone", body: "Bye" },
      { publicKey: vapid.publicKey, privateKey: vapid.privateKey, subject: "mailto:admin@cea.ng" },
      sender as typeof fetch,
    );
    expect(outcome).toEqual({ delivered: false, removed: true, status: 410 });
  });

  it("encrypts payloads with distinct salts and ephemeral keys each time", async () => {
    const recipient = await makeRecipient();
    const payload = encoder.encode("same payload");
    const auth = base64UrlToBytes(recipient.auth);
    const uaPublic = base64UrlToBytes(recipient.publicKey);
    const first = await encryptPushPayload(payload, uaPublic, auth);
    const second = await encryptPushPayload(payload, uaPublic, auth);
    expect(bytesToBase64Url(first.body)).not.toBe(bytesToBase64Url(second.body));
    expect(bytesToBase64Url(first.publicKey)).not.toBe(bytesToBase64Url(second.publicKey));
  });
});
