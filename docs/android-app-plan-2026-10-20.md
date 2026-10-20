# CEA Android: shared full-platform scope, phased delivery

20 October 2026. Owner chose **hybrid now, selective native later**, plus four quick web usability fixes. The initial Android scaffold is in `apps/android`; this document is a plan, not a feature-completion certificate.

## What full CEA-OS parity means

The repository has 424 route-definition files, including 308 under `src/routes/app`. These counts are not a count of unique features: redirects, dynamic routes and static parameters make route totals different from deployed URL totals.

The app must cover public course/lesson discovery, application/recovery, tuition and shop payments, receipts, authentication/MFA, learning/assessment/attendance/certificates, career/mentoring/recruitment, client projects, finance/HR/IT/operations, community/partners and every authorised role workspace. Keep the server's existing role and ownership checks. “Every feature” does not mean every person sees every department.

## Architecture recommendation and boundaries

Start with a **Capacitor remote shell** sharing the Next.js site, rather than rebuilding hundreds of pages. This preserves reachability of the existing web surfaces and keeps fixes shared. It does **not** prove 100% functional parity: cookies, browser popups, bank redirects, magic links, downloads, permissions, service workers and push can differ in Android WebView.

The hosted Next.js application cannot simply be copied into Capacitor as a static `webDir`. Its SSR/dynamic routes require the server. A later offline reader must be purpose-built around public, versioned content and renderers, not a blanket copy/cache of authenticated HTML.

Later add native capabilities for demonstrated user needs. Evaluate native learner screens only after measuring the hybrid learner journey; retain shared role workspaces unless there is a proven reason to rebuild them. RN/Expo inside/alongside a Capacitor product would be an additional engineering project, not a trivial plugin installation.

## Current implementation

- Generated Capacitor 7 Android project, provisional `ng.cea.app`, CEA brand assets.
- HTTPS remote URL, cleartext/mixed content disabled, no payment-provider/wildcard bridge allowlist.
- Local connection-error page that honestly says offline lessons are not yet available.
- Node/Java/Android SDK debug APK + Android lint CI workflow, explicit manual dispatch and branch push trigger.
- Root install/sync/open/build scripts, signing material ignored, device backups disabled.

Java and Android SDK remain unavailable locally, but GitHub Actions has now built the debug APK, passed unit/lint checks and exercised the native shell/offline reader in an Android emulator. See `docs/android-validation-2026-10-20.md` for the exact verified commit, artifact and remaining release gates. No release-signing material, assetlinks fingerprint, push service credentials or store listing has been fabricated.

## Phases and release gates

### 0. Shared usability fixes (implemented in source)

Rebrand the PWA as CEA with public shortcuts; save/resume application answers locally with expiry/clear controls and fresh consent; show cookie consent only when optional tracking is enabled; improve WhatsApp button contrast; announce wizard validation and focus step headings. Verify with local browser tests and build/typecheck before deployment. No changes to fees, authentication or payment entitlement rules.

### 1. Shell and device acceptance (scaffold delivered; validation remains)

Build debug APK in CI/Android Studio. Use a staging site and isolated backend/test-mode payments. Test:

| Area | Required proof before claiming parity |
| --- | --- |
| Public routes | Catalogue, lessons, forms, links, legal pages at narrow widths and large text |
| Auth | Password, magic link, MFA, expiry, sign-out, cookie persistence and recovery across process death |
| Tuition and shop | Success, cancellation, delayed webhook, interruption and re-entry without duplicate payment |
| Files | Pick/upload, MIME/size validation, camera denial, receipt/certificate export and blob downloads |
| Roles | Every role's representative read/write and denied action; ownership failures remain enforced |
| Realtime | Messages/live sessions reconnect correctly after backgrounding and connectivity loss |
| Navigation | Android back, external links, WhatsApp intents, redirects, restored screen and safe error states |
| Accessibility | TalkBack, switch/keyboard navigation, focus, large text, landscape and 48dp touch targets |

Test low-memory physical Android phones on constrained networks. A page rendering in a WebView is not enough.

### 2. Native integration and safe link handling

Implement native sharing, deliberate download handling and a controlled external-browser checkout return. External domains must not receive the app's native bridge. Restrict navigation/intent schemes; never bypass TLS errors. Verify payment server-side, not from URL parameters.

Verified Android App Links require the owner-confirmed package ID, release/Play signing certificate and correct `/.well-known/assetlinks.json` on the chosen origin(s). Validate incoming URLs (exact host/scheme/path), and design magic-link return handling with backend auth review. Do not assume opening the same URL in a new WebView shares Chrome's session.

### 3. Offline reader and notifications

Export approved **public** lessons/catalogue into a versioned bundle and implement a local reader with continue-reading, text-size controls, optional read-aloud and an explicit download/data budget. Prices and schedules must show their freshness and require online confirmation. Do not cache application/receipt/auth or paid/private course pages wholesale. Clear account-specific material on sign-out; never queue financial writes offline.

For native push, add FCM device-token registration, revocation, consent and delivery alongside the web-push system. Web VAPID push cannot be assumed to work in WebView. Do not promise polling/background delivery until implemented and measured. Notifications must not reveal sensitive personal/financial details on a locked phone.

### 4. Store readiness and selective native screens

Confirm current Play target SDK, testing, account-deletion, data safety, content rating, distribution and billing requirements at submission time. Tuition for physical classes, digital course access and downloadable shop products may have different billing treatment; existing Paystack checkout is not automatically approved for every in-app product. Review policy before deciding which products may be purchased in-app.

Use an owner-controlled signing key and Play App Signing as appropriate; no production secrets in Git or chat. Add signed AAB release automation only after ownership and secret configuration are established. Native utility does not guarantee Play acceptance.

After the shared app passes acceptance, evaluate a native learner home, compressed assignment-photo upload, biometric re-entry (with secure session design) and optional language/TTS support. None of these removes server authorisation requirements.

## Security decision: recovery

Reference numbers and phone digits are identifiers, **not authentication**, even for status-only responses. Keep verified email recovery until a properly verified phone OTP or controlled staff-assisted identity-recovery flow is designed and tested. Apply rate limits, generic responses, audit logs and anti-enumeration protections. No phone-only policy change was authorised by the architecture selection.

## Owner inputs needed before release

Confirm the final package ID/name, staging environment, distribution/store account, signing ownership, product billing treatment, retention/privacy language and support process. Do not commit to dates before the shell's real-device auth/payment spike succeeds. The earlier “days to full parity” estimate was not validated.

## Build continuation (20 October 2026)

Native menu/back/print/share, local 210-lesson reader with search/resume/font size,
offline Android TTS, strict link policy, configurable staging origin, App Link
handling and certificate-file generator are now implemented. Signed candidate
workflow is provided but requires owner-configured signing secrets. See the updated
`apps/android/README.md` for exact behaviour and outstanding parity gates.

GitHub Actions has successfully compiled a debug APK and passed JVM unit tests
and Android lint (run 39384978578). An early emulator smoke run failed because Gradle selected dependency-library test tasks; task scoping/dependency alignment and the later shell-test import were corrected. The final shell/reader emulator run passes. This is still not complete account/payment/role device acceptance. Browser offline-reader
regression passes without external network requests. Native FCM remains unimplemented and authenticated payment/role acceptance remains unverified. A bounded blob/data-export adapter and same-origin authenticated downloader are now implemented, but real document-picker and account-specific export acceptance must still be completed.
