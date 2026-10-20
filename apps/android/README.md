# CEA Android

A Capacitor Android application sharing the CEA website and server-authorised CEA-OS workspaces, with native navigation and a separate offline reader. **Development candidate; not yet certified for full production feature parity or Play distribution.**

## Implemented

- CEA icons/splash; native menu and an always-available Offline lessons button.
- All 210 public computer lessons bundled at build time: no account or first download needed. Text-only with figure descriptions, search, next lesson, continue-reading, locally marked read state and three font sizes.
- Native read-aloud using an installed English offline TTS voice. Unavailable voices are explained; playback stops when backgrounded.
- Reader is an isolated local-only WebView, without a JavaScript/native bridge. Remote requests are blocked; no private course content, accounts or payment data is bundled.
- Public lesson/course sharing strips query strings/fragments. Private/auth/application URLs are replaced with the public home URL.
- Save current CEA page as PDF through Android's print dialog, with a private-data warning.
- Generated blob/data exports up to 10 MB are captured by the native adapter and saved through Android's system document picker. No broad storage permission or arbitrary filesystem path is accepted. CSV/report/calendar/account-export bytes stay on-device; verify each source workflow before release.
- Android back navigation and exit confirmation; external HTTPS/mail/phone links are guarded. Arbitrary intent, JavaScript, file and cleartext navigation is blocked.
- Explicit third-party-cookie support for CEA's cross-origin HttpOnly API sessions. This still needs authenticated staging/device testing.
- Android App Link intent handling for the configured exact HTTPS host. OS verification needs the real signing fingerprint hosted in assetlinks.json.
- Local connection-error page directs people to the offline reader without implying that payments or private workspaces work offline.
- System bar, cutout and keyboard inset handling for native and web content.
- Debug APK/unit-test/lint CI; Android emulator tests for the packaged offline reader; owner-controlled manual signed APK/AAB workflow.

## Build

Requires Node 22, Java 21, SDK 35 and Google/Maven/Gradle network access.

```sh
npm run android:install
npm run android:sync
npm run android:open
npm run android:build
```

`sync` regenerates the public lesson bundle from `src/data/blog.ts`. Generated assets are ignored; do not edit them. No Next.js static export is attempted.

Debug output: `apps/android/android/app/build/outputs/apk/debug/app-debug.apk`.

Workflow: **Android debug APK**, on this branch or manual dispatch. Download the `cea-android-debug` artifact from a successful run. A debug signature is for testing, not store release.

### Staging and live website dependency

The app normally loads `https://www.cea.ng`. Local web edits do not appear in that hosted surface until deployed. Set the **same exported environment** for sync and Gradle to target an owner-controlled staging origin:

```sh
export CEA_ANDROID_ORIGIN=https://YOUR-OWN-STAGING-HOST
npm run android:sync
npm run android:build
```

Only HTTPS origins without credentials, paths, queries or fragments are accepted. Native home/navigation checks, App Link host and Capacitor server origin follow this configuration. Do not use real payments or production staff accounts in smoke testing.

## Tests

```sh
npm run typecheck --prefix apps/android
npm run android:sync
npx playwright test e2e/android-reader.spec.ts
cd apps/android/android
./gradlew testDebugUnitTest lintDebug connectedDebugAndroidTest
```

The browser reader test starts its own local server and blocks external traffic. Unit tests cover URL/credential leakage rules. Instrumented tests inspect the packaged public bundle and load a lesson in a real Android WebView. These are **not** full account/payment/role parity tests.

## Signing and App Links

The manually dispatched **Android signed release candidate** workflow requires an owner-configured `android-release` environment with secrets `CEA_KEYSTORE_BASE64`, `CEA_KEYSTORE_PASSWORD`, `CEA_KEY_ALIAS`, `CEA_KEY_PASSWORD`. Store them through GitHub settings, never in chat/Git. Protect this environment with approval. Supply a new positive version code and semantic version name. It creates artifacts only; it does not publish to Play.

The release Gradle tasks reject missing signing configuration. No production key has been generated or uploaded by this work.

Generate an association file for review with the real **Play App Signing certificate**, not an invented/debug fingerprint:

```sh
CEA_ANDROID_CERT_SHA256='REAL:COLON:SEPARATED:SHA256' node apps/android/scripts/assetlinks.mjs /path/to/reviewed-assetlinks.json
```

The command rejects invalid fingerprints. Publish the reviewed file at `https://www.cea.ng/.well-known/assetlinks.json` with JSON content type and no redirect, then verify domain association on a device. Until that is done, Android may open links in the browser instead of this app.

## Remaining production release gates

1. Controlled authenticated tests on the chosen deployment: password/magic link/MFA/expiry/re-entry, cross-origin cookies, account switching/sign-out and all role ownership/permission boundaries.
2. Paystack test-mode payment success/cancel/pending/return, bank handoff and idempotent recovery. External browser checkout may require sign-in on return; App Link configuration alone does not solve all session handoffs.
3. Downloads from the configured CEA/API origins use a bounded native downloader and system picker (10 MB). Cookie headers are never forwarded across origins, including redirects. Third-party files hand off to a browser. Set `CEA_ANDROID_API_ORIGIN` alongside the alternate website origin when testing a different API. Generated blob/data exports now have a bounded system-picker adapter; cancellation, >10 MB files and representative real exports still need device acceptance. PDF printing is an alternative for printable pages, not universal binary download parity. Verify system file picker/camera, live sessions and large uploads on low-end physical phones.
4. An opt-in native FCM receiver is implemented; **account-specific delivery is not connected**. The existing web notification centre remains available; web VAPID push is not guaranteed in Android WebView. The [server device API](../../docs/android-native-device-api.md) now supports session-bound registration, removal and token replacement; Android synchronization and a server sender remain required.
5. Store policy/billing review (especially digital products versus physical tuition), account-deletion verification, privacy/data safety, current target SDK compliance, signed build, screenshots and physical-device accessibility/security acceptance.

The initial shared native/web approach preserves feature reachability but does not prove every workflow. No private application, receipt or authenticated lesson HTML should be added to the offline bundle.

## Firebase client and staging setup

The supplied Android client config now matches `cyber-elias-academy-app` /
`327984401909` / `ng.cea.app`. `firebase:check` validates it before sync, and the
Google Services Gradle plugin processes it without silently hiding errors.
This does not by itself implement native token registration or FCM server delivery;
no Analytics SDK was added. See [the isolated staging setup](../../docs/android-staging-setup.md).

## Live-target testing and native notification receiver

Per the owner's instruction, production remains the app target; staging is not
required to keep building. See [production check boundaries and notification testing](../../docs/android-production-checks.md).
Firebase Messaging now has opt-in device registration, permission handling,
disable/removal and generic data-message reception. Automatic account-specific
push delivery is still pending server integration. CI does not create tokens or
send notifications. The live CI smoke job performs three fixed public GETs only.
