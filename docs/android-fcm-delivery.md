# Native Firebase sender and controlled self-test

## Implemented on the branch, not yet deployed

The Worker now has an FCM HTTP v1 sender and `POST /v1/push/devices/test`.
The Android controls are now connected in source; see [activation and access requirements](android-activation.md).
Neither source integration nor a build pass proves live phone delivery or full push parity.

The test endpoint requires a valid session, `Content-Type: application/json`, and
an empty JSON object. It cannot select another user, provide message text or supply
a URL. It uses the existing KV rate limiter at three attempts/account/hour
(best-effort distributed throttling, not an atomic global quota). It respects
notification preferences and Lagos quiet hours, including for tests.

Result counters:
- `accepted`: Firebase accepted the request, **not** proof a phone displayed it.
- `removed`: exact stale registrations deleted after a typed FCM `UNREGISTERED` error.
- `failed`: provider/network/response failure; the registration is retained.
- `skipped`: eligibility changed or the batch's time budget was exhausted.

No eligible devices returns zero counters without contacting Google. Missing
server configuration returns 503 rather than pretending delivery succeeded.

## Security and reliability

- Only the supplied Firebase project `cyber-elias-academy-app` is accepted.
- OAuth and FCM URLs are fixed. Service-account `token_uri` values cannot redirect
  credentials to another host, and redirects are refused.
- RS256 assertions use the Firebase Messaging scope and a one-hour expiry. Access
  tokens are held only for the current bounded batch, never returned or logged.
- Responses are capped at 32 KiB; each network request has a 10-second timeout.
  A batch processes at most 20 candidates and stops starting new sends after its
  20-second send budget. One in-flight request can finish after that deadline.
- Eligibility is re-read after OAuth and immediately before each send. Logout,
  expiry, MFA, suspension, preference changes and account switching are respected.
  Revocation cannot recall an already accepted/in-flight message.
- The payload is fixed data-only `{ type: "inbox_update" }`, normal priority,
  zero-second TTL and a shared collapse key. No personal text, links or account IDs
  are sent. Offline/dozing phones may miss this hint; the authenticated in-app
  inbox remains the source of truth.
- Only a typed FCM `UNREGISTERED` response permits pruning. A bare 404, bad project,
  permission failure, 429 or 503 never deletes tokens. Deletion matches the original
  account, installation and token, protecting concurrent token replacement.
- There are no automatic retries or broadcasts. An ambiguous network failure must
  not trigger an immediate duplicate. A future event queue needs bounded backoff,
  idempotency and eligibility rechecks before it is connected.

## Secure activation (owner/deployment settings only)

1. Use a dedicated service account in the existing Firebase project with only the
   FCM sending permissions it needs. Ensure the Firebase Cloud Messaging API is
   enabled. No database administrator or project-owner role is needed for sending.
2. Put its service-account JSON in the Worker secret `FCM_SERVICE_ACCOUNT_JSON`
   through secure deployment settings or `wrangler secret put`. Keep the source
   file outside the repository. Never put it in chat, Android assets, a public
   environment variable, a workflow log or a commit. Rotate/revoke it if exposed.
3. Apply the reviewed additive device migration and deploy the reviewed Worker.
4. Install the verified APK and use its connected controls for a controlled test
   with a consenting signed-in account/phone after deployment.

The supplied `google-services.json` is Android client configuration; it cannot
replace this server credential. No real service-account key was provided, stored
or used by this implementation, and no live messages were sent.

## Tests

Six transport tests generate an ephemeral RSA key in memory and verify the signed
JWT and fixed endpoints/payload, configuration failures, sanitized errors, typed
pruning and bounded/malformed responses. Twelve delivery/route tests use isolated D1
and fake Google responses, including authorization, CSRF/content-type rejection,
rate limiting, disabled preferences, session revocation and token-rotation races.

Backend typecheck and all **67 focused tests** (native push, web push, auth and
RBAC) passed. These are simulated provider checks, not live Firebase verification.
