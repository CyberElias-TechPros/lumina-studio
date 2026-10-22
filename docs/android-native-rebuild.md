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

## Public learning increment

The native Lessons tab now shares `src/data/blog.ts` and public figures with the
website: 210 public learning notes, searchable and readable without internet,
including native text selection, semantic headings and illustration descriptions.
Assets are generated during CI, not committed duplicates of website content.
APK builds fail if the bundle is missing. This is public reading, not secure
identity, private coursework, learning progress, or completion of migration
slice 3. Authentication remains pending. No production deployment is included.

## Native identity first increment (0.3)

Implemented native existing-account sign-in, MFA challenge/recovery-code entry,
server identity, online session revalidation, refresh rotation, expiry and
sign-out. Session credentials intentionally live only in process memory. No
persistent vault is claimed; process death requires reauthentication. Native
registration/recovery/verified links, persistent secure storage, deletion and
private learner tasks remain acceptance work for slice 2 onward.

Transport is fixed to the CEA HTTPS auth endpoints, refuses redirects, limits
response size and disables caching. Password/code/token material is not stored
in saved instance state, public caches or logs. Offline sign-out and MFA cancel
state exactly what was cleared locally versus revoked at the server. No new
backend permissions or weaker MFA policy are introduced.

## Current implementation ledger — 22 October 2026

This supersedes the storage limitation in the historical 0.3 section above.

| Workflow | Implemented in source (`0.6.0-native-preview`) | Remaining external / future scope |
| --- | --- | --- |
| Sign-in / MFA | Native password, authenticator and recovery-code challenge | Real-account/physical-device acceptance |
| Session persistence | Opt-in Keystore AES-GCM vault (`KeystoreSessionStore`); verified online restore; rotation, expiry and local clearing | Physical-device key invalidation, device migration and multi-OS acceptance |
| Native account lifecycle | Registration (`sign-up`), password reset (`forgot-password` / `reset-password`), 6-digit email verification, password change, device session list/revoke, and `"DELETE"`-confirmed account deletion | Production email delivery & physical-device acceptance |
| Student reading & progress | Server-owned enrolment list, modules, published lesson text, confirmed completion, refetched records | Video/media lesson playback and downloadable materials |
| Website lesson viewer | Actual published text and confirmed completion replace inert controls and fabricated lesson material | Media, materials and discussion APIs/workflows |
| Written submissions, instructor grading & assessments | Student assignments + feedback, server-scored interactive assessments (`/v1/assessments`), and native instructor grading queue/detail (`POST /v1/instructor/submissions/:id/grade`) + courses | File-attachment upload & download; remote D1 `0069_submission_text.sql` + Worker deployment |
| Native admissions, offers, receipts & staff finance | Free application (`POST /v1/enrollments` + `KeystoreDraftStore` + UUID `submissionKey`), `enrollments/mine`, canonical offer acceptance (`tuition-2026-10-17`), transfer-proof claim (`pending_review`), official receipts, and staff finance `confirm`/`reject` | In-app card checkout SDK; live finance ops signoff |
| Native messaging & notifications | Direct message threads/replies (`/v1/messages/threads`) and in-app notifications (`/v1/notifications`, `read`, `read-all`) | Production Firebase (`ng.cea.app` / `FCM_SERVICE_ACCOUNT_JSON`) push delivery |
| Release pipeline & lint gate | Blocking repo-wide `npm run lint` CI gate; Gradle optional `CEA_*` signing config + `.github/workflows/android-native-release.yml` (Play `.aab` + direct `.apk` + SHA-256) | Cloudflare `Workers Builds: cea-api` dashboard config, owner Play upload keystore secrets in `android-release`, physical-device & Play Console review |

No private coursework is written to the public offline bundle. No new local
role assignment, free enrolment bypass, fabricated grades, automatic completion
or production test writes are introduced. CI fixtures are not live acceptance.

The shared completion API now updates an existing enrolment only: completion
cannot recreate a revoked enrolment if admissions removes it mid-request. A
local Worker regression uses a database trigger to reproduce that interleaving;
another proves bearer-authenticated progress appears in the student dashboard.
Website browser fixtures verify real-text rendering, explicit completion,
server denial, locked-content hiding and absence of fake media controls. The
fixtures dismiss the real onboarding tour before exercising lesson controls.
