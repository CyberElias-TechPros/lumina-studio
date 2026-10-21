# Account-bound Android device API

## Implemented on this branch (not deployed)

Migration `0068_native_push_devices.sql` adds a separate native-device table.
The existing browser Web Push/VAPID API is unchanged.

All routes require an active, non-MFA-pending session and use server-derived
identity. There is no client-supplied target account and no administrator override:

| Method/path | Behaviour |
| --- | --- |
| `GET /v1/push/devices` | List the caller's device IDs and timestamps only; never tokens or installation secrets. |
| `PUT /v1/push/devices` | Idempotent registration, token replacement, or proven installation transfer to the current signed-in account. |
| `DELETE /v1/push/devices/:id` | Idempotently remove only the caller's registration. A missing/foreign ID returns the same success response without deleting another account's device. |

Registration JSON fields:

- `installationId`: UUID, generated on the phone once.
- `deviceSecret`: base64url encoding (no padding) of 32 cryptographically random
  bytes, generated on the phone once. This is **not** a user's password or Firebase
  service-account key. The server stores only its SHA-256 hash.
- `token`: current FCM registration token; treated as a sensitive delivery address.

Persist installation identity/proof in native app-private storage, exclude it
from backups and never put it in URLs, analytics, console logs or shared web
storage. This native-only persistence/controller is implemented; see [activation](android-activation.md).

Registration returns `{ id, registered: true }` only after the database write.
Wrong installation proof, a token already held by another installation, or the
20-device-per-account cap returns 409. Replacing a token at the cap still works.
The cap and installation proof are enforced in the atomic write; concurrent
registrations cannot exceed it. Registration is rate-limited to 60 attempts per
account/hour using the existing KV limiter; revocation is not blocked by that
registration limiter. Bodies are limited to 8 KiB. Responses are non-cacheable.

FCM tokens are bearer delivery addresses, not proof of a person's identity.
Authentication establishes the account; the installation secret protects an
existing binding against takeover just by guessing its ID. These routes do not
cryptographically attest a phone or validate a new token with Google. Do not
expose any stored token through a listing or diagnostic response.

## Delivery eligibility

`eligibleNativeDevices` is an internal helper used by the [new sender](android-fcm-delivery.md). It joins the
current session and account at send time, excluding revoked/expired sessions,
MFA-pending sessions and inactive accounts. Cookie refresh preserves the session
ID, so it does not orphan the registration. Signing out, password-reset session
revocation or session deletion makes that binding ineligible without requiring
an online final request from the phone.

Account switching with matching installation proof atomically moves that phone
away from the previous account. A refreshed Firebase token replaces the old
value in the same registration rather than creating another delivery target.

The helper respects `appEnabled` and quiet hours from notification preferences,
using Africa/Lagos (UTC+1). Defaults are 21:00–08:00; equal start/end disables the
quiet window. This is explicit academy-time behaviour, not device-local time.

Do not queue raw tokens for delayed delivery: re-evaluate eligibility immediately
before sending. Revocation cannot recall a message already accepted by Firebase.
Use generic data-only messages and normal authenticated inbox navigation, never
private lesson/payment/message text in a push payload.

## Remaining integration

1. Validate the connected native controls on physical devices after deployment;
   cookies/proof remain in native code rather than a JavaScript bridge.
2. Verify foreground sign-in/account-switch and token-rotation synchronization,
   offline retries and disable/re-enable behaviour. Background delivery is not
   guaranteed, and automatic event integration is not complete.
3. Configure the [FCM sender and self-test](android-fcm-delivery.md) through secure
   deployment settings. HTTP v1 transport and stale-token cleanup are implemented;
   automatic event integration, queue retries and an audited trigger path remain
   pending. No automatic broadcast is enabled.
4. Apply the additive migration and deploy the Worker through the reviewed release
   process, then perform a controlled real-device/account test.

The Android UI describes account connection separately from automatic event alerts. No Firebase
server credential was requested or stored, no live registration was created, and
no message was sent. A schema/API test pass is not an end-to-end notification test.

## Validation

Local backend typecheck passed. The focused native-device, existing Web Push,
authentication and RBAC suites passed **49 tests**, including 15 new device tests.
They use the isolated Workers/D1 test environment, not remote production bindings.

Full local regression run: **72 suites / 860 tests passed** (`npm test`, which
excludes the separate live-network AI suite). No production database was used.
