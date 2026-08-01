import { ApiError } from "./errors";

/**
 * Web Push (RFC 8291 / RFC 8188) + VAPID (RFC 8292) implementation using only
 * WebCrypto, so it runs on Cloudflare Workers with no third-party deps.
 *
 * - VAPID keys are the standard web-push format: VAPID_PUBLIC_KEY is a base64url
 *   encoded uncompressed P-256 point (65 bytes), VAPID_PRIVATE_KEY the raw
 *   32-byte private scalar.
 * - Payloads are encrypted with aes128gcm (record salt 16B, RS 4096, empty
 *   keyid) and delivered to the push service via a plain `fetch` POST.
 */

const encoder = new TextEncoder();
const RECORD_SIZE = 4096;

export interface PushKeys {
  p256dh: string;
  auth: string;
}

export interface PushMessage {
  title: string;
  body: string;
  url?: string;
}

/** Base64url decode (tolerates padding). */
export function base64UrlToBytes(value: string): Uint8Array {
  const b64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = b64.padEnd(b64.length + ((4 - (b64.length % 4)) % 4), "=");
  const bin = atob(padded);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i += 1) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

/** Base64url encode without padding. */
export function bytesToBase64Url(bytes: Uint8Array): string {
  let bin = "";
  for (const byte of bytes) bin += String.fromCharCode(byte);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function concatBytes(...parts: (Uint8Array | string)[]): Uint8Array {
  const arrays = parts.map((part) => (typeof part === "string" ? encoder.encode(part) : part));
  const total = arrays.reduce((sum, part) => sum + part.length, 0);
  const out = new Uint8Array(total);
  let offset = 0;
  for (const part of arrays) {
    out.set(part, offset);
    offset += part.length;
  }
  return out;
}

async function hkdf(
  salt: Uint8Array,
  ikm: Uint8Array,
  info: Uint8Array,
  length: number,
): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey("raw", ikm, "HKDF", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits(
    { name: "HKDF", hash: "SHA-256", salt, info },
    key,
    length * 8,
  );
  return new Uint8Array(bits);
}

function importEcJwk(jwk: JsonWebKey, algorithm: "ECDH" | "ECDSA"): Promise<CryptoKey> {
  const params =
    algorithm === "ECDH"
      ? { name: "ECDH", namedCurve: "P-256" }
      : { name: "ECDSA", namedCurve: "P-256" };
  const usages = algorithm === "ECDSA" ? ["sign"] : jwk.d ? ["deriveBits"] : [];
  return crypto.subtle.importKey(
    "jwk",
    jwk,
    params,
    false,
    usages as Parameters<typeof crypto.subtle.importKey>[4],
  );
}

/** Uncompressed P-256 point (0x04 || x || y) → JWK. */
async function publicKeyToJwk(raw: Uint8Array): Promise<JsonWebKey> {
  if (raw.length !== 65 || raw[0] !== 0x04) {
    throw new ApiError(400, "FIELD_VALIDATION", "Invalid P-256 public key.");
  }
  return {
    kty: "EC",
    crv: "P-256",
    x: bytesToBase64Url(raw.slice(1, 33)),
    y: bytesToBase64Url(raw.slice(33, 65)),
    ext: true,
  };
}

async function jwkToPublicKeyRaw(jwk: JsonWebKey): Promise<Uint8Array> {
  return concatBytes(
    new Uint8Array([0x04]),
    base64UrlToBytes(jwk.x ?? ""),
    base64UrlToBytes(jwk.y ?? ""),
  );
}

async function deriveSharedSecret(
  privateKey: CryptoKey,
  publicKey: CryptoKey,
): Promise<Uint8Array> {
  const bits = await crypto.subtle.deriveBits(
    { name: "ECDH", public: publicKey } as unknown as Parameters<
      typeof crypto.subtle.deriveBits
    >[0],
    privateKey,
    256,
  );
  return new Uint8Array(bits);
}

export interface EncryptedPayload {
  body: Uint8Array;
  publicKey: Uint8Array;
}

/**
 * RFC 8291 payload encryption (aes128gcm). Returns the wire body (record
 * header + ciphertext) plus the ephemeral public key for the VAPID debugger.
 */
export async function encryptPushPayload(
  payload: Uint8Array,
  subscriptionPublicKey: Uint8Array,
  authSecret: Uint8Array,
): Promise<EncryptedPayload> {
  const recipient = await importEcJwk(await publicKeyToJwk(subscriptionPublicKey), "ECDH");
  const ephemeral = (await crypto.subtle.generateKey({ name: "ECDH", namedCurve: "P-256" }, false, [
    "deriveBits",
  ])) as CryptoKeyPair;
  const ephemeralJwk = (await crypto.subtle.exportKey("jwk", ephemeral.publicKey)) as JsonWebKey;
  const ephemeralPublic = await jwkToPublicKeyRaw(ephemeralJwk);

  const sharedSecret = await deriveSharedSecret(ephemeral.privateKey, recipient);
  const prk = await hkdf(
    authSecret,
    sharedSecret,
    concatBytes("WebPush: info", subscriptionPublicKey, ephemeralPublic),
    32,
  );
  const ikm = await hkdf(
    new Uint8Array(0),
    prk,
    concatBytes("Content-Encoding: auth", subscriptionPublicKey),
    32,
  );

  const salt = crypto.getRandomValues(new Uint8Array(16));
  const zero = new Uint8Array([0]);
  const contentKey = await hkdf(salt, ikm, concatBytes("Content-Encoding: aes128gcm", zero), 16);
  const nonce = await hkdf(salt, ikm, concatBytes("Content-Encoding: nonce", zero), 12);

  const aesKey = await crypto.subtle.importKey("raw", contentKey, "AES-GCM", false, ["encrypt"]);
  const ciphertext = new Uint8Array(
    await crypto.subtle.encrypt({ name: "AES-GCM", iv: nonce, tagLength: 128 }, aesKey, payload),
  );

  const header = new Uint8Array(21 + ephemeralPublic.length);
  header.set(salt, 0);
  new DataView(header.buffer).setUint32(16, RECORD_SIZE, false);
  header[20] = ephemeralPublic.length;
  header.set(ephemeralPublic, 21);

  return { body: concatBytes(header, ciphertext), publicKey: ephemeralPublic };
}

/**
 * RFC 8291 decryption — used by tests to verify encrypted payloads round-trip.
 * Requires both halves of the recipient keypair (raw private scalar + raw
 * uncompressed public point).
 */
export async function decryptPushPayload(
  body: Uint8Array,
  subscriptionPrivateKey: Uint8Array,
  subscriptionPublicKey: Uint8Array,
  authSecret: Uint8Array,
): Promise<Uint8Array> {
  const salt = body.slice(0, 16);
  const idLength = body[20] ?? 0;
  if (idLength < 32 || idLength > 256) throw new Error("Invalid record header.");
  const ephemeralPublicRaw = body.slice(21, 21 + idLength);
  const ciphertext = body.slice(21 + idLength);

  const sender = await importEcJwk(await publicKeyToJwk(ephemeralPublicRaw), "ECDH");
  const publicJwk = await publicKeyToJwk(subscriptionPublicKey);
  const privateJwk: JsonWebKey = {
    ...publicJwk,
    d: bytesToBase64Url(subscriptionPrivateKey),
    ext: true,
  };
  const recipient = await importEcJwk(privateJwk, "ECDH");

  const sharedSecret = await deriveSharedSecret(recipient, sender);
  const prk = await hkdf(
    authSecret,
    sharedSecret,
    concatBytes("WebPush: info", subscriptionPublicKey, ephemeralPublicRaw),
    32,
  );
  const ikm = await hkdf(
    new Uint8Array(0),
    prk,
    concatBytes("Content-Encoding: auth", subscriptionPublicKey),
    32,
  );

  const zero = new Uint8Array([0]);
  const contentKey = await hkdf(salt, ikm, concatBytes("Content-Encoding: aes128gcm", zero), 16);
  const nonce = await hkdf(salt, ikm, concatBytes("Content-Encoding: nonce", zero), 12);

  const aesKey = await crypto.subtle.importKey("raw", contentKey, "AES-GCM", false, ["decrypt"]);
  return new Uint8Array(
    await crypto.subtle.decrypt({ name: "AES-GCM", iv: nonce, tagLength: 128 }, aesKey, ciphertext),
  );
}

/** Sign a VAPID JWT (ES256) and build the Authorization header value. */
export async function buildVapidAuthorization(
  endpoint: string,
  subject: string,
  publicKey: string,
  privateKey: string,
): Promise<string> {
  const publicRaw = base64UrlToBytes(publicKey);
  const publicJwk = await publicKeyToJwk(publicRaw);
  const privateJwk: JsonWebKey = {
    ...publicJwk,
    d: bytesToBase64Url(base64UrlToBytes(privateKey)),
  };
  const signingKey = await importEcJwk(privateJwk, "ECDSA");

  const header = { typ: "JWT", alg: "ES256", kid: publicKey };
  const claims = {
    aud: new URL(endpoint).origin,
    exp: Math.floor(Date.now() / 1000) + 12 * 3600,
    sub: subject,
  };
  const input =
    `${bytesToBase64Url(encoder.encode(JSON.stringify(header)))}.` +
    bytesToBase64Url(encoder.encode(JSON.stringify(claims)));
  const signature = new Uint8Array(
    await crypto.subtle.sign({ name: "ECDSA", hash: "SHA-256" }, signingKey, encoder.encode(input)),
  );
  return `vapid t=${input}.${bytesToBase64Url(signature)}, k=${publicKey}`;
}

export interface VapidConfig {
  publicKey: string;
  privateKey: string;
  subject: string;
}

/** Delivers a push message. Returns false when the subscription is gone (410/404). */
export async function sendPushMessage(
  endpoint: string,
  keys: PushKeys,
  message: PushMessage,
  vapid: VapidConfig,
  sender: typeof fetch = fetch,
): Promise<{ delivered: boolean; removed: boolean; status: number }> {
  const payload = encryptPushPayload(
    encoder.encode(JSON.stringify(message)),
    base64UrlToBytes(keys.p256dh),
    base64UrlToBytes(keys.auth),
  );
  const { body } = await payload;
  const authorization = await buildVapidAuthorization(
    endpoint,
    vapid.subject,
    vapid.publicKey,
    vapid.privateKey,
  );
  const res = await sender(endpoint, {
    method: "POST",
    headers: {
      Authorization: authorization,
      "Content-Encoding": "aes128gcm",
      "Content-Type": "application/octet-stream",
      TTL: "86400",
    },
    body,
  });
  return {
    delivered: res.ok,
    removed: res.status === 404 || res.status === 410,
    status: res.status,
  };
}
