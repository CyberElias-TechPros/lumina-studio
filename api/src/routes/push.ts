import { Hono } from "hono";
import type { AppEnv } from "../types";
import { randomToken } from "../lib/crypto";
import { requireAuth } from "../lib/auth";
import { ApiError } from "../lib/errors";
import { sendPushMessage, base64UrlToBytes, type PushKeys, type PushMessage } from "../lib/push";

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

const ADMIN_OR_INSTRUCTOR = ["admin", "instructor"];

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
  const body = (await c.req.json().catch(() => null)) as {
    endpoint?: unknown;
    keys?: Partial<PushKeys>;
  } | null;
  const fieldErrors: Record<string, string[]> = {};
  const endpoint = body?.endpoint;
  const p256dh = body?.keys?.p256dh;
  const auth = body?.keys?.auth;
  if (!isHttpEndpoint(endpoint)) {
    fieldErrors.endpoint = ["endpoint must be an http(s) URL."];
  }
  if (!isValidKey(p256dh, 65)) {
    fieldErrors["keys.p256dh"] = ["p256dh must be a base64url P-256 public key (65 bytes)."];
  }
  if (!isValidKey(auth, 16)) {
    fieldErrors["keys.auth"] = ["auth must be a base64url 16-byte secret."];
  }
  if (Object.keys(fieldErrors).length > 0) throw ApiError.validation(fieldErrors);

  const userId = c.get("authUser").id;
  await c.env.DB.prepare(
    `INSERT INTO push_subscriptions (id, user_id, endpoint, p256dh, auth)
     VALUES (?, ?, ?, ?, ?)
     ON CONFLICT (endpoint) DO UPDATE SET p256dh = excluded.p256dh, auth = excluded.auth, user_id = excluded.user_id`,
  )
    .bind(`ps-${randomToken(8)}`, userId, endpoint as string, p256dh as string, auth as string)
    .run();

  const row = await c.env.DB.prepare(
    `SELECT id, user_id, endpoint, p256dh, auth, created_at
       FROM push_subscriptions WHERE endpoint = ?`,
  )
    .bind(endpoint)
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
 * devices; admins and instructors may target any user. VAPID keys must be
 * configured, otherwise 503 (same philosophy as payments without a secret).
 */
push.post("/send", async (c) => {
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
  let url = "";
  if (body?.url !== undefined && body?.url !== null) {
    if (!isHttpEndpoint(body.url)) {
      fieldErrors.url = ["url must be an http(s) URL."];
    } else {
      url = String(body.url);
    }
  }
  if (Object.keys(fieldErrors).length > 0) throw ApiError.validation(fieldErrors);

  const targetUserId = body?.userId === undefined ? user.id : String(body.userId);
  if (targetUserId !== user.id && !ADMIN_OR_INSTRUCTOR.includes(user.roleKey)) {
    throw ApiError.forbidden("You can only send pushes to yourself.");
  }

  const { VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY } = c.env;
  if (!VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY) {
    throw new ApiError(503, "PUSH_UNAVAILABLE", "VAPID keys are not configured.");
  }

  const rows = await c.env.DB.prepare(
    `SELECT id, user_id, endpoint, p256dh, auth, created_at
       FROM push_subscriptions WHERE user_id = ?`,
  )
    .bind(targetUserId)
    .all<SubscriptionRow>();

  const message: PushMessage = {
    title: String(title),
    body: String(text),
    ...(url ? { url } : {}),
  };
  const vapid = {
    publicKey: VAPID_PUBLIC_KEY,
    privateKey: VAPID_PRIVATE_KEY,
    subject: `mailto:${user.email}`,
  };
  const result: PushSendResult = { sent: 0, removed: 0 };
  for (const row of rows.results) {
    try {
      const outcome = await sendPushMessage(
        row.endpoint,
        { p256dh: row.p256dh, auth: row.auth },
        message,
        vapid,
      );
      if (outcome.delivered) result.sent += 1;
      if (outcome.removed) {
        result.removed += 1;
        await c.env.DB.prepare(`DELETE FROM push_subscriptions WHERE id = ?`).bind(row.id).run();
      }
    } catch {
      // One dead endpoint must not fail the whole fan-out.
    }
  }
  return c.json(result);
});
