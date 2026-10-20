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
