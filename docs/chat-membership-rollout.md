# Chat membership rollout and limitations

Branch-only, not deployed. Migration `0078` must be applied before the backend version that reads it. It creates no legacy grants: existing rooms (including their creators) become inaccessible until an authorized administrator verifies the identity and entitlement of each participant and grants access explicitly. Never infer members from room names, message authors, or creator fields. Assess interruption, backups, migration ledger and rollback before release; rolling back the application may restore its former global access, so rollback is not a privacy-preserving solution. Review existing sockets and deployment propagation; idle old sockets are closed when they next send or receive, not proactively.

New chat rooms grant their creator one year of access. Other participants require an administrator. There is currently **no membership-management UI**. Using an authenticated admin session and same-origin/CSRF protections, operational endpoints are:

- `GET /v1/admin/accounts` for actual account IDs (not the separate `admin_users` demo listing); paginate and verify identities outside the API.
- `GET /v1/realtime/admin/rooms` to enumerate room metadata and `GET /v1/realtime/admin/rooms/{roomId}/members` for membership state. Both paginate.
- `PUT /v1/realtime/admin/rooms/{roomId}/members` with JSON `{ "userId": "<verified-account-id>", "expiresAt": "<UTC ISO datetime>" }`; expiry must be in the future and at most 365 days away. Renewal replaces expiry. Only active accounts can be granted.
- `DELETE /v1/realtime/admin/rooms/{roomId}/members/{userId}` revokes an active membership. Changes are recorded in `chat_room_member_events`; administrators do not automatically get room content access.

The API does not provide invitation, consent, membership review UI, moderation, rate limits or durable live notifications. Socket events announce only stored messages, but clients can repeat an announcement; delivery can be missed while offline and history is the source of record. Per-frame and per-recipient database checks introduce latency and load, and D1 check-to-send and in-flight reads are not atomic with revocation. Access changes cannot retract previously received or cached content. Validate multi-user ordering, failures, concurrent grants/revokes, expiry, throttling, origin config, performance and migration in staging before any release. Do not present this as secure, private production messaging until those gates are satisfied.

Live classes, including lists, history, polls, whiteboards and socket upgrades, are intentionally unavailable until a verified class enrollment and instructor ownership model and a safe recovery plan exist. Existing records are retained.
