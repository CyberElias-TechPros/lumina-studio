# Decision: fully native Android, not a website wrapper

Owner decision, 21 October 2026: replace the earlier Capacitor-first architecture
with a native Android application. **Kotlin + Jetpack Compose** is the chosen
Android-only implementation. React/Next.js remains the website, not the app UI.

“Independent app” means its screens, navigation, state and device interactions
are native. It does not mean a second identity system, a second academy database,
or every business operation working offline. The existing Worker API remains
the source of truth for permissions, payments, enrolment and private records.

## Migration principles

1. Do not replace the current APK with an incomplete rewrite. Build the native
   preview separately, then replace production only after acceptance gates pass.
2. Rebuild actual tasks, not screenshots or a drawer linking back to web pages.
   There must be no concealed WebView fallback for unported role workspaces.
3. Preserve backend RBAC/MFA/ownership, payment confirmation, privacy and recovery.
4. Keep the public website working. Do not rewrite the backend solely to change
   the app's rendering technology.
5. Share API contracts and validated public data where useful, not DOM components.
6. External bank/provider authentication or checkout may legitimately open a trusted
   browser/provider SDK; that does not permit embedding CEA itself as the app UI.

## Staged delivery and evidence

| Slice | Deliverable | Completion evidence |
| --- | --- | --- |
| 1: native foundation | Compose navigation, public course catalogue/details, search, local shortlist, stale/offline state, support | APK build, parser/policy tests and native UI tests; no website rendering dependency. Implemented in the first increment; CI status on PR. |
| 2: native identity | Sign-in/sign-up, secure session storage, refresh, MFA, verified links, sign-out, profile and deletion | Existing production account works; process death/restart, expiry, logout and account switching tested; credentials never logged/backed up. No browser-cookie dependency. |
| 3: learner journey | Today/next task, learning content rendered natively, assignments, feedback, messages, attendance, public offline lessons | Real end-to-end learner/instructor handoff; no private caching without an explicit entitlement/storage design. |
| 4: admissions/payments | Application draft/recovery, canonical tuition offers, payment handoff/verification, receipts and files | Interrupted/repeated flows cannot duplicate settlement or imply payment from a return URL. |
| 5: role workspaces | Every supported staff, parent, partner and leadership workflow | Per-role read/write/denied-action acceptance matrix and cross-role handoffs, not route-count equivalence. |
| 6: device integration | Account-bound FCM, App Links, native file picker/downloads, camera, accessibility and background behaviour | Actual device delivery and privacy/account-switch checks; OS denial/offline paths; native replacements for the old cookie-based integrations. |
| 7: production replacement | Same production package/signing identity, migration strategy, signed APK/AAB, store review | No loss of accounts/entitlements, current policy compliance, low-end physical-device acceptance and monitored rollout. |

The first preview intentionally omits authentication/payment/workspace buttons
that would only pretend those features exist. It is not the full app yet.

## Current versus destination

- `apps/android`: existing Capacitor product, retained as a transition build.
- `apps/android-native`: new native application and separate build/test pipeline.
- Production backend: retained; no migration, credential change or notification
  send is required to build the first read-only catalogue slice.
- Firebase/notifications: deployed backend work remains reusable. Do not copy the
  WebView cookie controller into the new app. Connect FCM to the future native
  secure session layer and the existing device API instead.

The product-readiness review remains applicable: test complete user journeys,
keep generated/formatting debt distinct from security findings, and do not claim
full accessibility, performance or role parity from a successful build alone.

## First native validation — 21 October 2026

Source commit `1902667` passed [Native Android preview CI](https://github.com/CyberElias-TechPros/lumina-studio/actions/runs/39582928133):

- Debug APK and instrumentation APK assembly, JVM catalogue tests and Android lint.
- API 29 emulator: native search/details/save/back navigation and offline error/retry UI.
- Source guard against WebView/Capacitor website-rendering imports.
- Installable debug preview: the `cea-native-preview-debug` workflow artifact.

The emulator tests use local fixtures, not production accounts or API writes.
This is not physical-device acceptance, a signed release, authenticated role
parity, or proof of production catalogue availability. The existing app and
production deployment were not replaced.
