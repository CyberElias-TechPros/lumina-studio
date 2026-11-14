import { Hono } from "hono";
import type { AppEnv } from "../types";
import { randomToken } from "../lib/crypto";
import { requireAuth } from "../lib/auth";
import { ApiError } from "../lib/errors";
import { rateLimit } from "../lib/rate-limit";
import {
  sendPushMessage,
  isTrustedPushEndpoint,
  base64UrlToBytes,
  type PushKeys,
  type PushMessage,
} from "../lib/push";

export interface ApiPushSubscription {
  id: string;
  endpoint: string;
  createdAt: string;
}

interface SubscriptionRow {
  id: string;
  user_id: string;
  endpoint: string;
  p256dh: string;
  auth: string;
  created_at: string;
}

interface PushSendResult {
  sent: number;
  removed: number;
}

function isHttpEndpoint(value: unknown): boolean {
  if (typeof value !== "string") return false;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

function isValidKey(value: unknown, length: number): boolean {
  if (typeof value !== "string" || value.length === 0) return false;
  try {
    return base64UrlToBytes(value).length === length;
  } catch {
    return false;
  }
}

export const push = new Hono<{ Bindings: AppEnv }>();

push.use("*", requireAuth);

function requireJson(contentType: string | undefined): void {
  if (contentType?.split(";")[0]?.trim().toLowerCase() !== "application/json") {
    throw new ApiError(415, "JSON_REQUIRED", "Use application/json for browser push requests.");
  }
}

/** List the caller's push subscriptions. */
push.get("/subscriptions", async (c) => {
  const userId = c.get("authUser").id;
  const rows = await c.env.DB.prepare(
    `SELECT id, user_id, endpoint, p256dh, auth, created_at
       FROM push_subscriptions WHERE user_id = ? ORDER BY created_at ASC`,
  )
    .bind(userId)
    .all<SubscriptionRow>();
  const items: ApiPushSubscription[] = rows.results.map((row) => ({
    id: row.id,
    endpoint: row.endpoint,
    createdAt: row.created_at,
  }));
  return c.json({ items, total: items.length });
});

/** Save a browser push subscription for the caller. */
push.post("/subscriptions", async (c) => {
  requireJson(c.req.header("Content-Type"));
  const body = (await c.req.json().catch(() => null)) as {
    endpoint?: unknown;
    keys?: Partial<PushKeys>;
  } | null;
  const fieldErrors: Record<string, string[]> = {};
  const endpoint = body?.endpoint;
  const p256dh = body?.keys?.p256dh;
  const auth = body?.keys?.auth;
  if (!isTrustedPushEndpoint(endpoint)) {
    fieldErrors.endpoint = ["Endpoint must be a supported HTTPS browser push service."];
  }
  if (!isValidKey(p256dh, 65)) {
    fieldErrors["keys.p256dh"] = ["p256dh must be a base64url P-256 public key (65 bytes)."];
  }
  if (!isValidKey(auth, 16)) {
    fieldErrors["keys.auth"] = ["auth must be a base64url 16-byte secret."];
  }
  if (Object.keys(fieldErrors).length > 0) throw ApiError.validation(fieldErrors);

  const userId = c.get("authUser").id;
  const sessionId = c.get("authSession").id;
  await rateLimit(c.env.RATE_LIMIT, "web-push-register", userId, {
    limit: 60,
    windowSeconds: 3600,
  });
  const saved = await c.env.DB.prepare(
    `INSERT INTO push_subscriptions (id, user_id, endpoint, p256dh, auth, session_id)
     VALUES (?, ?, ?, ?, ?, ?)
     ON CONFLICT (endpoint) DO UPDATE SET p256dh = excluded.p256dh, auth = excluded.auth, session_id = excluded.session_id
       WHERE push_subscriptions.user_id = excluded.user_id`,
  )
    .bind(
      `ps-${randomToken(8)}`,
      userId,
      endpoint as string,
      p256dh as string,
      auth as string,
      sessionId,
    )
    .run();
  if (saved.meta.changes !== 1) {
    throw ApiError.conflict(
      "This browser subscription belongs to another account. Sign in to that account and remove it first.",
    );
  }

  const row = await c.env.DB.prepare(
    `SELECT id, user_id, endpoint, p256dh, auth, created_at
       FROM push_subscriptions WHERE endpoint = ? AND user_id = ?`,
  )
    .bind(endpoint, userId)
    .first<SubscriptionRow>();
  return c.json(
    {
      id: row?.id ?? "",
      endpoint: endpoint as string,
      createdAt: row?.created_at ?? new Date().toISOString(),
    } satisfies ApiPushSubscription,
    201,
  );
});

/** Remove one of the caller's subscriptions. */
push.delete("/subscriptions/:id", async (c) => {
  const id = c.req.param("id");
  const userId = c.get("authUser").id;
  const row = await c.env.DB.prepare(`SELECT id, user_id FROM push_subscriptions WHERE id = ?`)
    .bind(id)
    .first<{ id: string; user_id: string }>();
  if (!row) throw ApiError.notFound("Subscription not found.");
  if (row.user_id !== userId) throw ApiError.forbidden();
  await c.env.DB.prepare(`DELETE FROM push_subscriptions WHERE id = ?`).bind(id).run();
  return c.json({ ok: true });
});

/**
 * Send a push notification. Any authenticated user may send to their own
 * devices; admins may target another user. VAPID keys must be
 * configured, otherwise 503 (same philosophy as payments without a secret).
 */
push.post("/send", async (c) => {
  requireJson(c.req.header("Content-Type"));
  const user = c.get("authUser");
  const body = (await c.req.json().catch(() => null)) as {
    userId?: unknown;
    title?: unknown;
    body?: unknown;
    url?: unknown;
  } | null;
  const fieldErrors: Record<string, string[]> = {};
  const title = body?.title;
  const text = body?.body;
  if (typeof title !== "string" || title.trim().length === 0 || title.length > 120) {
    fieldErrors.title = ["title must be a non-empty string of at most 120 characters."];
  }
  if (typeof text !== "string" || text.trim().length === 0 || text.length > 500) {
    fieldErrors.body = ["body must be a non-empty string of at most 500 characters."];
  }
  if (body?.url !== undefined && body?.url !== null && !isHttpEndpoint(body.url)) {
    fieldErrors.url = ["url must be an http(s) URL."];
  }
  if (Object.keys(fieldErrors).length > 0) throw ApiError.validation(fieldErrors);

  const targetUserId = body?.userId === undefined ? user.id : String(body.userId);
  if (targetUserId !== user.id && user.roleKey !== "admin") {
    throw ApiError.forbidden("You can only send pushes to yourself.");
  }

  const { VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY } = c.env;
  if (!VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY) {
    throw new ApiError(503, "PUSH_UNAVAILABLE", "VAPID keys are not configured.");
  }

  await rateLimit(c.env.RATE_LIMIT, "web-push-send", user.id, { limit: 30, windowSeconds: 3600 });
  const rows = await c.env.DB.prepare(
    `SELECT p.id, p.user_id, p.endpoint, p.p256dh, p.auth, p.created_at, p.session_id,
            CASE WHEN s.user_id = p.user_id AND s.revoked_at IS NULL AND s.expires_at > ?
                      AND s.mfa_pending = 0 AND u.status = 'active' THEN 1 ELSE 0 END AS session_active
       FROM push_subscriptions p
       LEFT JOIN sessions s ON s.id = p.session_id
       JOIN users u ON u.id = p.user_id
      WHERE p.user_id = ? LIMIT 51`,
  )
    .bind(new Date().toISOString(), targetUserId)
    .all<SubscriptionRow & { session_id: string | null; session_active: number }>();
  if (rows.results.length > 50) {
    throw new ApiError(
      503,
      "PUSH_SUBSCRIPTION_LIMIT",
      "Browser notifications are unavailable until this account's subscriptions are reviewed.",
    );
  }

  // Older clients may display payload text directly on the lock screen. Never
  // forward caller-provided content or URLs, including from older API clients.
  const message: PushMessage = {
    title: "CEA update",
    body: "Open CEA to check your notifications.",
    url: "/app/notifications",
  };
  const vapid = {
    publicKey: VAPID_PUBLIC_KEY,
    privateKey: VAPID_PRIVATE_KEY,
    subject: `mailto:${user.email}`,
  };
  const result: PushSendResult = { sent: 0, removed: 0 };
  let skipped = 0;
  let failed = 0;
  for (const row of rows.results) {
    if (row.session_active !== 1 || !isTrustedPushEndpoint(row.endpoint)) {
      skipped += 1;
      continue;
    }
    try {
      const outcome = await sendPushMessage(
        row.endpoint,
        { p256dh: row.p256dh, auth: row.auth },
        message,
        vapid,
        fetch,
        async () => {
          const now = new Date();
          // Notification quiet hours use Africa/Lagos (UTC+1).
          const localTime = new Date(now.getTime() + 3600_000).toISOString().slice(11, 16);
          return Boolean(
            await c.env.DB.prepare(
              `SELECT 1 FROM push_subscriptions p
           JOIN sessions s ON s.id = p.session_id AND s.user_id = p.user_id
           JOIN users u ON u.id = p.user_id
           LEFT JOIN notification_preferences np ON np.user_id = p.user_id
           WHERE p.id = ? AND p.user_id = ? AND p.endpoint = ? AND p.session_id = ?
             AND p.p256dh = ? AND p.auth = ? AND s.revoked_at IS NULL AND s.expires_at > ?
             AND s.mfa_pending = 0 AND u.status = 'active' AND COALESCE(np.app_enabled, 1) = 1
             AND NOT (CASE
               WHEN COALESCE(np.quiet_start, '21:00') < COALESCE(np.quiet_end, '08:00')
                 THEN ? >= COALESCE(np.quiet_start, '21:00') AND ? < COALESCE(np.quiet_end, '08:00')
               WHEN COALESCE(np.quiet_start, '21:00') > COALESCE(np.quiet_end, '08:00')
                 THEN ? >= COALESCE(np.quiet_start, '21:00') OR ? < COALESCE(np.quiet_end, '08:00')
               ELSE 0 END)`,
            )
              .bind(
                row.id,
                row.user_id,
                row.endpoint,
                row.session_id,
                row.p256dh,
                row.auth,
                now.toISOString(),
                localTime,
                localTime,
                localTime,
                localTime,
              )
              .first(),
          );
        },
      );
      if (outcome.skipped) skipped += 1;
      else if (outcome.delivered) result.sent += 1;
      else if (outcome.removed) {
        const deleted = await c.env.DB.prepare(
          `DELETE FROM push_subscriptions WHERE id = ? AND user_id = ? AND session_id = ? AND p256dh = ? AND auth = ?`,
        )
          .bind(row.id, row.user_id, row.session_id, row.p256dh, row.auth)
          .run();
        result.removed += deleted.meta.changes;
        if (!deleted.meta.changes) skipped += 1;
      } else failed += 1;
    } catch {
      // One endpoint must not fail the whole fan-out; report the unsuccessful attempt.
      failed += 1;
    }
  }
  return c.json({ ...result, ...(skipped ? { skipped } : {}), ...(failed ? { failed } : {}) });
});
