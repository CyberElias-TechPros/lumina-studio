# Production-targeted Android work

Owner decision: use the live CEA site/API rather than wait for staging. The Android
defaults remain `https://www.cea.ng` and `https://cea-api.cyber-e54.workers.dev`.
The owner's statement that the database is empty has **not** been independently
verified; it is not a reason to run destructive tests or reset resources.

## Checks enabled

The Android CI has a separate production read-only job, only on pushes to the
current working branch. Its code has a fixed allowlist of three GETs:

- Public website home (HTML status only).
- Public PWA manifest (status/name only).
- API `/v1/health` (status/ok only).

No authentication, cookies, payment requests, user creation, messaging, payroll,
seed scripts, migrations, deletes or backup/restore calls are involved. Redirects
are refused. Responses are bounded and no private records are printed. Tests for
this checker use an injected fake fetcher and make no network requests.

The existing production refusal in `e2e/safety.ts` stays intact: write-capable
E2E suites are not suddenly safe just because a live site is thought to be empty.
Future write checks require an explicitly identified test account/record, a
narrow operation, provider test mode where appropriate, and a cleanup plan. Do
not bulk delete records to make the live database resemble a test environment.

## Native notification receiver

Firebase Messaging is now included for the supplied Android project. Auto-init
and analytics collection default off. Opening the app/settings does not request
a token. The native menu has **Phone notifications**, with:

- An explanation and explicit Enable action.
- Android 13+ permission handling.
- Device registration through Firebase (no CEA backend association yet).
- Disable/delete-token action and Android's notification settings.
- Debug-only **Copy Firebase test device code** after successful registration.

In-app messaging/notification-centre access remains unchanged. **Enabling the
phone does not yet enable automatic class, application or private-message alerts.**
An [account/session-bound device API and additive schema](android-native-device-api.md)
now exist on this branch. The Android-to-API bridge, automatic token-rotation/
account-switch synchronization and server FCM sender remain pending. It would be misleading to advertise this as complete
native push parity.

The custom service handles data-only messages with fixed generic text and opens
`/app/notifications` behind normal authentication. It ignores supplied URLs and
private message content. Its Android channel hides lock-screen content.

Important: Firebase's SDK may display notification-payload messages in the
background without calling this service. Do not put personal/payment data in
Firebase Console test messages or any FCM payload. Use generic **data-only**
messages for the future authenticated server sender. Removing the token requires
a connection; Android notification settings provide a device-level block while
offline or if removal fails.

## Optional owner-led device test

On an Android phone with Google Play services and internet access:

1. Install the debug APK from the successful CI run.
2. Open CEA menu → Phone notifications. Read the explanation, then enable.
3. Grant permission if requested. Wait for successful Firebase registration.
4. In this debug build, copy the test device code directly into the Firebase
   Console's test-message recipient field for this project. Never post it in chat,
   logs or a public issue.
5. Send a clearly generic test message from Firebase Console. Test foreground,
   background, notification tapping and disabling. No service-account key is
   needed for this owner-led console test.

CI does not enable registration, request real FCM tokens or send notifications.
A build/emulator pass is not proof that a real Firebase message has been delivered.
Private-key/service-account configuration for future server delivery must remain
in deployment secrets, never in the APK or chat.

## Verified build

Source commit `c6cd309` passed [Android CI 39393139097](https://github.com/CyberElias-TechPros/lumina-studio/actions/runs/39393139097):
Android debug build, JVM tests, lint, API 29 emulator tests, and the three public
production GET checks above. Local sync/typecheck and the two fake-fetch tests
also passed. The emulator test confirms opening notification settings leaves
Firebase auto-init disabled; it does not prove real-device delivery.

[Debug APK ZIP](https://github.com/CyberElias-TechPros/lumina-studio/actions/runs/39393139097/artifacts/12250920869)
(6,296,806 bytes). Test reports artifact: `12250507129`.
This is not a signed production release, Play publication or proof of full role
parity. No production database migration, record write or notification send was
performed by this work.
