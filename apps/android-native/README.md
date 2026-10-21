# CEA — native Android rebuild

The owner's latest instruction supersedes the Capacitor-first plan: the destination
is an independently rendered Android client, written in Kotlin + Jetpack Compose,
using the existing CEA backend. No website renderer, Capacitor, React Native WebView
or HTML frontend is included in this project.

## First vertical slice

- Native Explore / Saved / About navigation and course-detail screens.
- Direct HTTPS access to the existing public `/v1/programs` API, with pagination,
  search, loading, empty/error states, retry and an explicit last-checked timestamp.
- A local public catalogue snapshot and favourites, useful after connectivity loss.
- Native dialler handoff for academy support, with no phone-call permission.
- Explicit preview labelling. No fake accounts, invented ratings/learner figures,
  or checkout prices copied from the legacy catalogue. Confirm actual tuition
  through the canonical admissions/payment flow when that native workflow is built.

This is a **working foundation**, not a claim of complete native CEA-OS parity.
Account/authentication, applications, payments, private lessons, assignments,
role workspaces, messaging, push and the full public-content library remain to be
ported. No hidden website fallback substitutes for those missing native features.

## Separation and identity

Preview application ID: `ng.cea.app.nativepreview`. It installs separately from
`ng.cea.app` so the existing app is not silently replaced by an incomplete rebuild.
Its public shortlist is independent of the old app and does not create enrolments.

The production replacement should retain `ng.cea.app` and the owner-controlled
release signing identity after the migration gates pass. Do not accidentally
publish the preview package as a second production product. The existing Firebase
client file belongs to `ng.cea.app`; no credentials have been copied or fabricated
for the preview package. Native authentication must precede authenticated push
integration, because the old controller depends on the old app's browser cookie jar.

## Build and verification

Open this directory in Android Studio, or use Java 21 and an installed Android SDK:

```sh
./gradlew :app:assembleDebug :app:testDebugUnitTest :app:lintDebug
./gradlew :app:connectedDebugAndroidTest
```

CI: `.github/workflows/android-native.yml` produces a native preview APK and reports.
The existing Android workflow continues to build the old app separately. Native
UI tests render fixture states, without fetching live courses, signing in, registering
Firebase tokens, sending messages or performing financial writes.

Android 6+ (min SDK 23); compile/target SDK 35 for this development build. Current
Play target-SDK requirements must be verified/upgraded before a release submission.

## Data and network boundaries

Only public course metadata is cached. No session token, private record or lesson
HTML is downloaded by this slice. Exact HTTPS API origin, no redirects, per-request
timeouts, a 2 MiB combined response/storage budget and at most ten pages. New requests
stop starting after a 20-second pagination budget; an in-flight request can finish
later. Failed refresh preserves the previous snapshot and marks it as saved/stale.
Prices, ratings and learner counts returned by the legacy program API are deliberately
not rendered. Public favourites are stored app-privately; backup is disabled.

## Public lesson reader

Before building the APK, run from the repository root:

```sh
npm ci
node apps/android-native/scripts/build-lessons.mjs
```

This bundles the website's `src/data/blog.ts` learning notes and referenced
public illustrations. The generated assets are ignored by Git. CI regenerates
them on changes to the source, images or dependency lock. Lessons render as
native Compose text, headings, lists and images; no HTML renderer or account is
required. Public notes are not enrolment or assessed progress. Content updates
require an app update. Authentication and private learner workflows are still
pending; this reader does not replace those acceptance gates.

## Native identity increment (0.3)

Account supports existing password sign-in, TOTP/recovery-code verification,
server-reported identity/role, session renewal and sign-out against the existing
HTTPS API. A pending MFA session never exposes an authenticated user. No role
switcher or browser cookie manager is used. Account details require online
revalidation on returning to the Account screen; expiry clears local state.

Credentials are **process-memory-only**. Password/code fields are not saved in
instance state and clear on submission; the token never enters UI state,
preferences, logs, public caches or backups. Screenshots/recents capture are
blocked. Process death requires sign-in again; this is not “remember me”.
Android Keystore-backed persistence, registration, recovery, verification links,
private workspaces and account deletion remain unimplemented in the native UI.

Sign-out attempts server revocation and always removes local credentials. If
revocation fails, the UI explicitly warns that the server session may still be
active. Cancelling pending MFA forgets the local token; the existing server
sign-out endpoint cannot revoke a pending MFA session, so cancellation does not
claim server revocation. Pending sessions still require MFA to authorize access.
No automatic credential retries or test logins against production are performed.
