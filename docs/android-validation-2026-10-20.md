# Android validation and handover — 20 October 2026

## Verified candidate

- Native/application source commit: `7e9764d7113abde392098429cb837fcef2e5a680`.
- Branch: `arena/df91cdba-lumina-studio`.
- Successful run: https://github.com/CyberElias-TechPros/lumina-studio/actions/runs/39387470767
- Debug APK artifact: https://github.com/CyberElias-TechPros/lumina-studio/actions/runs/39387470767/artifacts/12248231444
- Test reports: https://github.com/CyberElias-TechPros/lumina-studio/actions/runs/39387470767/artifacts/12248351589
- `cea-android-debug` artifact ZIP: 4,865,386 bytes. GitHub-reported **artifact ZIP** SHA-256: `0195715de0d622d5608e43f6c27484270ace0c653cead5e66970f738b15480c4`. This is not an independently calculated APK signing fingerprint.

Download the artifact while signed into GitHub with repository access, extract
`app-debug.apk`, and install on a test Android phone. Android may require allowing
installation from the browser/file manager. This is a debug-signed testing build,
not a Play release. Debug signing identity may change between CI machines/runs;
uninstalling a previous debug build may be required and removes its local data.

The artifact is stored on GitHub. The sandbox cannot download GitHub's redirected
artifact blob host; no local APK file is claimed. No Play release or production
website merge was performed.

## Passed

- Capacitor sync and public-content bundle generation: 210 lessons.
- Android TypeScript configuration check.
- Tracked source-route inventory: 424 patterns. This tracks changes, not feature-test coverage.
- Android debug APK and instrumentation APK compilation.
- JVM unit tests (URL policy, download-origin restrictions, share sanitisation, template smoke).
- Android lint.
- Android API 29 emulator instrumentation: package identity, offline bundle contents,
  lesson rendering in Android WebView, native shell → offline reader → native shell,
  and native menu availability.
- Five local Playwright regressions: offline reader search/read-state/resume/text-size
  with external requests blocked; generated blob export capture before URL revocation;
  application recovery/focus/clear; malformed/expired storage; consent reset and
  unavailable-storage warning.

No backend schema, auth policy, pricing or payment entitlement was changed in
this continuation. Native files use Android's document picker; only configured
CEA/API HTTPS origins can receive native-download cookies, and redirects cannot
cross origins.

## Implemented but not yet end-to-end accepted

- Native TTS with an installed English offline voice (device/voice-dependent).
- Actual system document-picker save/cancel, large/private exports, interrupted
  downloads and provider-specific files.
- Exact-host App Link handler. Verified association still requires the real signing
  certificate file hosted at the chosen HTTPS origin.
- Release signing workflow. Owner signing secrets/environment approval are absent;
  no signed production APK/AAB or store upload has been produced.

## Production completion gates

1. **Isolated staging**: owner-controlled frontend/API origins, test-mode payment
   configuration and accounts representing each role, including multi-account/shared
   device cases. Do not seed fake learners/payments into production to test the app.
2. **Full workflow acceptance**: password/magic-link/MFA, session expiry/sign-out,
   Paystack success/cancel/pending/return, refunds/status visibility, uploads/exports,
   messages/live sessions and each role's allowed/denied actions on physical phones.
3. **Native push**: Firebase project/application identity, server credential management,
   device registration/revocation and account-switch privacy design. FCM code/delivery
   is not implemented in this candidate; web notification-centre access is not the
   same as native background delivery.
4. **Distribution**: confirm package identity `ng.cea.app`, signing ownership,
   App Link certificate, current Play target SDK/billing rules, privacy/data safety,
   account-deletion flow, accessibility on real devices and required store testing.

These items prevent a truthful claim of “every feature fully tested and ready for
production.” The installed candidate is real and tested within the scope above;
remaining integrations are not simulated as completed features.
