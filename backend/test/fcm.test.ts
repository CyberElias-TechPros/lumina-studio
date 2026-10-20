import { beforeAll, describe, expect, it, vi } from "vitest";
import { fcmAccessToken, sendFcmHint } from "../src/lib/fcm";
import { base64UrlToBytes, bytesToBase64Url } from "../src/lib/push";

let secret: string;
let publicKey: CryptoKey;
beforeAll(async () => {
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
  publicKey = pair.publicKey;
  const encoded = bytesToBase64Url(
    new Uint8Array((await crypto.subtle.exportKey("pkcs8", pair.privateKey)) as ArrayBuffer),
  );
  secret = JSON.stringify({
    type: "service_account",
    project_id: "cyber-elias-academy-app",
    client_email: "test-sender@cyber-elias-academy-app.iam.gserviceaccount.com",
    private_key: `-----BEGIN PRIVATE KEY-----\n${encoded}\n-----END PRIVATE KEY-----`,
    token_uri: "https://attacker.invalid/token",
  });
});

describe("Firebase HTTP v1 transport (simulated network only)", () => {
  it("signs a verifiable RS256 assertion for the fixed audience and scope", async () => {
    const sender = vi.fn(async (url: RequestInfo | URL, init?: RequestInit) => {
      expect(url).toBe("https://oauth2.googleapis.com/token");
      expect(init?.redirect).toBe("error");
      expect(init?.signal).toBeDefined();
      const assertion = new URLSearchParams(String(init?.body)).get("assertion")!;
      const [header, payload, signature] = assertion.split(".");
      const decode = (text: string) => JSON.parse(new TextDecoder().decode(base64UrlToBytes(text)));
      expect(decode(header!)).toEqual({ alg: "RS256", typ: "JWT" });
      const claims = decode(payload!);
      expect(claims.aud).toBe("https://oauth2.googleapis.com/token");
      expect(claims.scope).toBe("https://www.googleapis.com/auth/firebase.messaging");
      expect(claims.exp - claims.iat).toBe(3600);
      expect(claims.iss).toBe("test-sender@cyber-elias-academy-app.iam.gserviceaccount.com");
      expect(
        await crypto.subtle.verify(
          "RSASSA-PKCS1-v1_5",
          publicKey,
          base64UrlToBytes(signature!),
          new TextEncoder().encode(`${header}.${payload}`),
        ),
      ).toBe(true);
      return Response.json({ access_token: "fake-access-token", token_type: "Bearer" });
    });
    expect(await fcmAccessToken(secret, sender)).toBe("fake-access-token");
    expect(sender).toHaveBeenCalledTimes(1);
  });
  it("rejects invalid and wrong-project credentials before making a request", async () => {
    const sender = vi.fn();
    for (const value of [
      undefined,
      "not json",
      "{}",
      JSON.stringify({ ...JSON.parse(secret), project_id: "another-project" }),
      JSON.stringify({ ...JSON.parse(secret), client_email: "attacker@example.test" }),
    ]) {
      await expect(fcmAccessToken(value, sender)).rejects.toMatchObject({
        status: 503,
        code: "NATIVE_PUSH_UNAVAILABLE",
      });
    }
    expect(sender).not.toHaveBeenCalled();
  });
  it("does not leak Google error bodies or network exception details", async () => {
    const sensitive = "private-key-or-access-token-must-not-leak";
    for (const sender of [
      async () => Response.json({ error: sensitive }, { status: 401 }),
      async () => {
        throw new Error(sensitive);
      },
      async () => Response.json({ access_token: "bad\r\nheader", token_type: "Bearer" }),
    ]) {
      try {
        await fcmAccessToken(secret, sender);
        expect.fail("should fail");
      } catch (error) {
        expect(String(error)).not.toContain(sensitive);
        expect(error).toMatchObject({ status: 503 });
      }
    }
  });
  it("sends only a generic zero-retention data hint, not a notification payload", async () => {
    const sender = vi.fn(async (url: RequestInfo | URL, init?: RequestInit) => {
      expect(url).toBe(
        "https://fcm.googleapis.com/v1/projects/cyber-elias-academy-app/messages:send",
      );
      expect(init?.redirect).toBe("error");
      expect(init?.signal).toBeDefined();
      expect(new Headers(init?.headers).get("Authorization")).toBe("Bearer fake-access");
      expect(JSON.parse(String(init?.body))).toEqual({
        message: {
          token: "fake-device",
          data: { type: "inbox_update" },
          android: { priority: "NORMAL", ttl: "0s", collapse_key: "cea-inbox" },
        },
      });
      return Response.json({ name: "projects/cyber-elias-academy-app/messages/test" });
    });
    expect(await sendFcmHint("fake-device", "fake-access", sender)).toEqual({
      accepted: true,
      unregistered: false,
    });
    expect(sender).toHaveBeenCalledTimes(1);
  });
  it("prunes only typed UNREGISTERED errors, not arbitrary 404s or auth failures", async () => {
    const typed = {
      error: {
        details: [
          {
            "@type": "type.googleapis.com/google.firebase.fcm.v1.FcmError",
            errorCode: "UNREGISTERED",
          },
        ],
      },
    };
    expect(
      await sendFcmHint("token", "access", async () => Response.json(typed, { status: 404 })),
    ).toEqual({ accepted: false, unregistered: true });
    for (const status of [400, 401, 403, 404, 429, 500, 503]) {
      expect(
        await sendFcmHint("token", "access", async () =>
          Response.json({ error: { status: "NOT_FOUND" } }, { status }),
        ),
      ).toEqual({ accepted: false, unregistered: false });
    }
  });
  it("does not retry network errors, malformed responses or oversized bodies", async () => {
    for (const reply of [
      () => {
        throw new Error("network timeout");
      },
      () => Response.json({}),
      () => new Response("not-json"),
      () => new Response("x".repeat(32769)),
    ]) {
      const sender = vi.fn(async () => reply());
      expect(await sendFcmHint("token", "access", sender)).toEqual({
        accepted: false,
        unregistered: false,
      });
      expect(sender).toHaveBeenCalledTimes(1);
    }
  });
});
