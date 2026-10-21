import { Hono } from "hono";
import { bodyLimit } from "hono/body-limit";
import { z } from "zod";
import type { AppEnv } from "../types";
import { requireAuth } from "../lib/auth";
import { sha256Hex } from "../lib/crypto";
import { ApiError } from "../lib/errors";
import { parseBody } from "../lib/validate";
import { rateLimit } from "../lib/rate-limit";
import { sendNativeInboxHint } from "../lib/native-push";

const registration = z
  .object({
    installationId: z.uuid(),
    // Generated once from 32 cryptographically random bytes on the phone; NOT a
    // user password. Never return it, its hash, or the FCM token in list responses.
    deviceSecret: z.string().regex(/^[A-Za-z0-9_-]{43}$/),
    token: z
      .string()
      .min(32)
      .max(4096)
      .regex(/^[A-Za-z0-9_:.-]+$/),
  })
  .strict();

export const nativePush = new Hono<{ Bindings: AppEnv }>();
nativePush.use("*", requireAuth);
nativePush.use("*", async (c, next) => {
  c.header("Cache-Control", "no-store");
  await next();
});
nativePush.use(
  "*",
  bodyLimit({
    maxSize: 8192,
    onError: () => {
      throw new ApiError(413, "PAYLOAD_TOO_LARGE", "Device registration exceeds 8 KiB.");
    },
  }),
);

/** Metadata only. A caller cannot enumerate another account's devices. */
nativePush.get("/", async (c) => {
  const result = await c.env.DB.prepare(
    `SELECT id, created_at AS createdAt, updated_at AS updatedAt
     FROM native_push_devices WHERE user_id = ? ORDER BY updated_at DESC`,
  )
    .bind(c.get("authUser").id)
    .all();
  return c.json({ items: result.results });
});

/** Idempotent registration/rotation; account and session always come from auth. */
nativePush.put("/", async (c) => {
  const body = await parseBody(c, registration);
  const userId = c.get("authUser").id;
  await rateLimit(c.env.RATE_LIMIT, "native-push-register", userId, {
    limit: 60,
    windowSeconds: 3600,
  });
  const secretHash = await sha256Hex(body.deviceSecret);
  const now = new Date().toISOString();
  let row: { id: string } | null;
  try {
    // Both the device cap and ownership check are enforced by the write itself,
    // not a read-then-write race. Switching accounts requires installation proof.
    row = await c.env.DB.prepare(
      `INSERT INTO native_push_devices
         (id, user_id, session_id, device_secret_hash, token, created_at, updated_at)
       SELECT ?, ?, ?, ?, ?, ?, ?
       WHERE (SELECT COUNT(*) FROM native_push_devices WHERE user_id = ?) < 20
          OR EXISTS (SELECT 1 FROM native_push_devices WHERE id = ? AND user_id = ?)
       ON CONFLICT(id) DO UPDATE SET
         user_id = excluded.user_id, session_id = excluded.session_id,
         token = excluded.token, updated_at = excluded.updated_at
       WHERE native_push_devices.device_secret_hash = excluded.device_secret_hash
       RETURNING id`,
    )
      .bind(
        body.installationId,
        userId,
        c.get("authSession").id,
        secretHash,
        body.token,
        now,
        now,
        userId,
        body.installationId,
        userId,
      )
      .first<{ id: string }>();
  } catch (error) {
    // Do not log tokens or SQLite bindings. Token collisions must not transfer
    // an unrelated installation, nor identify its owner to the caller.
    if (error instanceof Error && error.message.includes("UNIQUE constraint failed")) {
      throw ApiError.conflict("Device registration conflicts with an existing registration.");
    }
    throw new ApiError(
      503,
      "DEVICE_REGISTRATION_UNAVAILABLE",
      "Device registration is temporarily unavailable.",
    );
  }
  if (!row)
    throw ApiError.conflict("Device proof did not match or the account device limit was reached.");
  return c.json({ id: row.id, registered: true });
});

/** Idempotent, owner-scoped removal. Even admins cannot revoke other accounts here. */
nativePush.delete("/:id", async (c) => {
  await c.env.DB.prepare(`DELETE FROM native_push_devices WHERE id = ? AND user_id = ?`)
    .bind(c.req.param("id"), c.get("authUser").id)
    .run();
  return c.json({ ok: true });
});

/** A deliberate self-test only. No caller-selected recipient or message content. */
nativePush.post("/test", async (c) => {
  // Cookie sessions use SameSite=None in production. Requiring JSON prevents
  // a cross-origin simple text/form POST from triggering a notification.
  if (c.req.header("Content-Type")?.split(";")[0]?.trim().toLowerCase() !== "application/json") {
    throw new ApiError(415, "JSON_REQUIRED", "Use application/json for a phone notification test.");
  }
  await parseBody(c, z.object({}).strict());
  const userId = c.get("authUser").id;
  await rateLimit(c.env.RATE_LIMIT, "native-push-test", userId, { limit: 3, windowSeconds: 3600 });
  return c.json(await sendNativeInboxHint(c.env, userId));
});
