import { newId, isoNow } from "./ids.ts";
import type { Env, SessionUser } from "./env.ts";

/**
 * Audit trail. Every state-changing action records actor, action, target and a
 * short human summary. Metadata is deliberately narrow: we never log passwords,
 * session tokens, full payment card data, or entire request bodies.
 */
export interface AuditInput {
  actor?: SessionUser | null;
  action: string;
  entityType?: string | null;
  entityId?: string | null;
  summary?: string | null;
  ip?: string | null;
  meta?: Record<string, unknown>;
}

export async function writeAudit(env: Env, input: AuditInput): Promise<void> {
  let summary = input.summary ?? null;
  if (input.meta && Object.keys(input.meta).length > 0) {
    const safe = redact(input.meta);
    summary = summary ? `${summary} ${JSON.stringify(safe)}` : JSON.stringify(safe);
  }
  await env.DB.prepare(
    `INSERT INTO audit_log (id, actor_id, actor_name, action, entity_type, entity_id, summary, ip, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  )
    .bind(
      newId(),
      input.actor?.id ?? null,
      input.actor?.name ?? "system",
      input.action,
      input.entityType ?? null,
      input.entityId ?? null,
      summary?.slice(0, 500) ?? null,
      input.ip ?? null,
      isoNow(),
    )
    .run();
}

const REDACTED_KEYS = new Set([
  "password",
  "password_hash",
  "current_password",
  "new_password",
  "token",
  "session",
  "authorization",
  "cookie",
  "card_number",
  "cvv",
]);

function redact(value: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [key, val] of Object.entries(value)) {
    out[key] = REDACTED_KEYS.has(key.toLowerCase()) ? "[redacted]" : val;
  }
  return out;
}
