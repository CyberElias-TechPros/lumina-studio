/**
 * Identifier generation. We use `crypto.randomUUID()` (available on the Workers
 * runtime) for primary keys and a URL-safe random token for anything secret.
 *
 * Primary keys are opaque UUIDs rather than integers on purpose: documents are
 * referenced from share links and PDFs, and sequential integers would leak
 * business volume and invite IDOR probing.
 */
export function newId(): string {
  return crypto.randomUUID();
}

const TOKEN_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

/** Cryptographically random URL-safe token. Default 32 bytes of entropy. */
export function randomToken(bytes = 32): string {
  const buf = new Uint8Array(bytes);
  crypto.getRandomValues(buf);
  let out = "";
  for (const b of buf) out += TOKEN_ALPHABET[b % TOKEN_ALPHABET.length];
  return out;
}

export function isoNow(): string {
  return new Date().toISOString();
}

export function isoInMinutes(minutes: number): string {
  return new Date(Date.now() + minutes * 60_000).toISOString();
}

export function isoInDays(days: number): string {
  return new Date(Date.now() + days * 86_400_000).toISOString();
}

/** YYYY-MM-DD in UTC. Date-only columns never carry a time component. */
export function todayUtc(d: Date = new Date()): string {
  return d.toISOString().slice(0, 10);
}

export function addDays(dateIso: string, days: number): string {
  const d = new Date(`${dateIso}T00:00:00.000Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

/** Whole days from `dateIso` to today (UTC). Positive means in the past. */
export function daysSince(dateIso: string): number {
  const then = new Date(`${dateIso}T00:00:00.000Z`).getTime();
  if (Number.isNaN(then)) return 0;
  const now = Date.UTC(
    new Date().getUTCFullYear(),
    new Date().getUTCMonth(),
    new Date().getUTCDate(),
  );
  return Math.floor((now - then) / 86_400_000);
}
