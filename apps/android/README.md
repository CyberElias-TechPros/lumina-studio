# CEA Android — development shell

Status: **prototype, not a release-ready full-parity app**. Shares the hosted CEA website (including role-authorised CEA-OS pages) through Capacitor. The remote URL means local web edits only reach this app after the website is deployed.

## Included

- Capacitor 7 Android project, package `ng.cea.app` (provisional until owner/release approval).
- CEA launcher/splash artwork derived from the existing `public/icon-512.png`.
- HTTPS production origin; no wildcard navigation, cleartext traffic or mixed content. No native payment-domain bridge allowlist.
- Packaged connection-error page with retry and application-status links. This is **not offline lesson storage**.
- Android backups disabled; signing keys/build outputs excluded from Git.
- Debug APK + lint GitHub Actions workflow. This workflow has not yet been run in this session.

## Build

Requires Node 22, Java 21, Android SDK 35 and network access to Google/Maven/Gradle distribution hosts. The current sandbox lacks Java/Android SDK and cannot reach all those hosts.

From repository root:

```sh
npm run android:install
npm run android:sync
npm run android:open   # Android Studio
npm run android:build # debug APK, NOT a signed production release
```

Output: `apps/android/android/app/build/outputs/apk/debug/app-debug.apk`.

Alternatively, after pushing this branch, run **Android debug APK** in GitHub Actions and download `cea-android-debug`. Do not use real payments or production staff credentials for initial shell tests; provision an isolated staging backend/site and point the configuration at that exact HTTPS origin for acceptance testing.

## Release blockers / next phases

- Prove authentication and cookie behaviour with the cross-origin API on physical Android devices. Email/magic-link, external checkout and session return flows need deliberate implementation and testing; browser success does not prove WebView success.
- Verified Android App Links require the real signing certificate fingerprint and hosted `assetlinks.json`. Neither fake fingerprints nor broad deep-link handlers are shipped.
- Add native share, controlled external-browser checkout return, receipt/certificate downloads (including blob URLs), offline lesson reader, file/camera handling and FCM notifications.
- Exercise Android back navigation, offline/reconnect, process death, TalkBack, large font sizes, keyboard, live sessions and every role's representative read/write workflow.
- Release AAB/signing, store policy/billing review, account deletion and current target SDK requirements are separate release work. No keystore, AAB, store listing or Play approval is included.
- Selective native learner screens come after the shared experience passes its acceptance gates; no React Native application has been generated yet.

See `docs/android-app-plan-2026-10-20.md` for the phased plan.
