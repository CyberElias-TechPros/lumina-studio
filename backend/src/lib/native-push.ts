import { ApiError } from "./errors";
import { fcmAccessToken, sendFcmHint } from "./fcm";

/** Internal-only delivery selection. Never expose tokens through an API response.
 * A future sender must use this at send time, not queue raw tokens in advance.
 * Revocation cannot recall a message already handed to Firebase.
 */
export async function eligibleNativeDevices(db: D1Database, userId: string, now = new Date()) {
  // Academy notification quiet hours use Africa/Lagos (UTC+1, no DST).
  const localTime = new Date(now.getTime() + 3600_000).toISOString().slice(11, 16);
  const rows = await db
    .prepare(
      `SELECT d.id, d.token FROM native_push_devices d
     JOIN sessions s ON s.id = d.session_id AND s.user_id = d.user_id
     JOIN users u ON u.id = d.user_id
     LEFT JOIN notification_preferences p ON p.user_id = d.user_id
     WHERE d.user_id = ? AND s.revoked_at IS NULL AND s.expires_at > ?
       AND s.mfa_pending = 0 AND u.status = 'active' AND COALESCE(p.app_enabled, 1) = 1
       AND NOT (
         CASE WHEN COALESCE(p.quiet_start, '21:00') < COALESCE(p.quiet_end, '08:00')
         THEN ? >= COALESCE(p.quiet_start, '21:00') AND ? < COALESCE(p.quiet_end, '08:00')
         WHEN COALESCE(p.quiet_start, '21:00') > COALESCE(p.quiet_end, '08:00')
         THEN ? >= COALESCE(p.quiet_start, '21:00') OR ? < COALESCE(p.quiet_end, '08:00')
         ELSE 0 END
       )`,
    )
    .bind(userId, now.toISOString(), localTime, localTime, localTime, localTime)
    .all<{ id: string; token: string }>();
  return rows.results;
}

/** Fixed-payload, at-most-once attempt per device; caller must authorize/rate limit.
 * No automatic retry: ambiguous delivery must not cause a duplicate notification.
 */
export async function sendNativeInboxHint(
  env: import("../types").AppEnv,
  userId: string,
  sender: typeof fetch = fetch,
  clock: () => Date = () => new Date(),
) {
  if (!env.FCM_SERVICE_ACCOUNT_JSON) {
    throw new ApiError(
      503,
      "NATIVE_PUSH_UNAVAILABLE",
      "Phone notification delivery is not configured.",
    );
  }
  const result = { accepted: 0, removed: 0, failed: 0, skipped: 0 };
  const candidates = (await eligibleNativeDevices(env.DB, userId, clock())).slice(0, 20);
  if (!candidates.length) return result;
  const accessToken = await fcmAccessToken(env.FCM_SERVICE_ACCOUNT_JSON, sender);
  // At most 20 devices. A global budget also bounds slow sequential providers.
  const deadline = Date.now() + 20000;
  for (const device of candidates) {
    if (Date.now() >= deadline) {
      result.skipped++;
      continue;
    }
    const current = await eligibleNativeDevices(env.DB, userId, clock());
    if (!current.some((row) => row.id === device.id && row.token === device.token)) {
      result.skipped++;
      continue;
    }
    const outcome = await sendFcmHint(device.token, accessToken, sender);
    if (outcome.accepted) result.accepted++;
    else if (outcome.unregistered) {
      // Do not delete a new token or a new account's binding after an in-flight change.
      const deleted = await env.DB.prepare(
        "DELETE FROM native_push_devices WHERE id = ? AND user_id = ? AND token = ?",
      )
        .bind(device.id, userId, device.token)
        .run();
      result.removed += deleted.meta.changes;
    } else result.failed++;
  }
  return result;
}
