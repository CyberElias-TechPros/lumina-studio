/**
 * Crypto primitives for the Workers runtime (WebCrypto only — no Node deps).
 *
 * Passwords: PBKDF2-SHA256. Cloudflare's WebCrypto caps PBKDF2 at 100 000
 * iterations (higher values throw NotSupportedError on the real runtime even
 * though Miniflare permits them), so 100k is the ceiling we can ship. Format is
 * self-describing — `pbkdf2-sha256$<iterations>$<saltB64>$<hashB64>` — so a
 * future migration to a stronger KDF can rehash on next successful login
 * without invalidating existing accounts.
 *
 * Session tokens: 256 bits of randomness, stored *hashed*. A database leak
 * therefore does not yield usable sessions.
 */

const encoder = new TextEncoder();

export const PBKDF2_ITERATIONS = 100_000;
const SALT_BYTES = 16;
const KEY_BITS = 256;

function toB64(bytes: Uint8Array): string {
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin);
}

function fromB64(value: string): Uint8Array {
  const bin = atob(value);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

async function pbkdf2(password: string, salt: Uint8Array, iterations: number): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, [
    "deriveBits",
  ]);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt: salt as BufferSource, iterations },
    key,
    KEY_BITS,
  );
  return new Uint8Array(bits);
}

/** Hash a plaintext password into the stored self-describing format. */
export async function hashPassword(password: string, iterations = PBKDF2_ITERATIONS): Promise<string> {
  const salt = new Uint8Array(SALT_BYTES);
  crypto.getRandomValues(salt);
  const derived = await pbkdf2(password, salt, iterations);
  return `pbkdf2-sha256$${iterations}$${toB64(salt)}$${toB64(derived)}`;
}

/**
 * Constant-time password verification. Always performs a hash computation, even
 * for a malformed stored value, so response timing does not reveal whether an
 * account exists.
 */
export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const parts = stored.split("$");
  if (parts.length !== 4 || parts[0] !== "pbkdf2-sha256") {
    // Burn equivalent time before failing.
    await pbkdf2(password, new Uint8Array(SALT_BYTES), PBKDF2_ITERATIONS);
    return false;
  }
  const iterations = Number.parseInt(parts[1] ?? "", 10);
  if (!Number.isFinite(iterations) || iterations < 1_000 || iterations > 1_000_000) return false;

  let expected: Uint8Array;
  let salt: Uint8Array;
  try {
    expected = fromB64(parts[3] ?? "");
    salt = fromB64(parts[2] ?? "");
  } catch {
    return false;
  }

  const derived = await pbkdf2(password, salt, iterations);
  return timingSafeEqualBytes(derived, expected);
}

/** True when the stored hash would be rehashed under the current parameters. */
export function needsRehash(stored: string): boolean {
  const parts = stored.split("$");
  if (parts.length !== 4) return true;
  return Number.parseInt(parts[1] ?? "0", 10) !== PBKDF2_ITERATIONS;
}

export function timingSafeEqualBytes(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= (a[i] ?? 0) ^ (b[i] ?? 0);
  return diff === 0;
}

/** Constant-time comparison of two equal-length ASCII strings (token digests). */
export function timingSafeEqualStr(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function sha256Hex(value: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", encoder.encode(value));
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Password policy. Deliberately length-and-breach oriented rather than
 * composition-rule oriented, per current NIST guidance: minimum 10 characters
 * for a business back office, and no dictionary of banned patterns that trains
 * users into predictable substitutions.
 */
export function passwordIssue(password: string): string | null {
  if (password.length < 10) return "Password must be at least 10 characters.";
  if (password.length > 200) return "Password must be under 200 characters.";
  if (/^(\w)\1{9,}$/.test(password)) return "Password must not be a repeated character.";
  const lower = password.toLowerCase();
  for (const weak of ["password", "password1", "1234567890", "qwertyuiop", "delgra1"]) {
    if (lower === weak) return "That password is too common to use.";
  }
  return null;
}
