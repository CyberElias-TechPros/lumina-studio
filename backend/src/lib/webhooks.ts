import { sha256Hex, isoNow } from "./crypto";

/**
 * Idempotency ledger for signed webhooks. Returns true the first time an
 * event is seen, false for retries/replays (which callers must ack with 200
 * without re-processing). The key prefers the provider's event id and falls
 * back to a hash of the raw body.
 */
export async function recordWebhookEvent(
  db: D1Database,
  provider: string,
  body: { event?: string; data?: { id?: number | string; reference?: string } },
  rawBody: string,
): Promise<boolean> {
  const natural =
    body.data?.id !== undefined ? `${body.event ?? ""}:${String(body.data.id)}` : null;
  const id = `${provider}:${natural ?? (await sha256Hex(rawBody))}`;
  const res = await db
    .prepare(
      `INSERT OR IGNORE INTO webhook_events (id, provider, event, reference, received_at)
       VALUES (?, ?, ?, ?, ?)`,
    )
    .bind(id, provider, body.event ?? "", body.data?.reference ?? "", isoNow())
    .run();
  return res.meta.changes === 1;
}
