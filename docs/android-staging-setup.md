# CEA Android: isolated staging setup

> **Optional reference, not a prerequisite:** the owner subsequently chose production-targeted development. See [production checks and boundaries](android-production-checks.md). No staging resources have been created.

## Isolated testing option: same code, separate deployment and data

The release app can use `https://www.cea.ng` and its existing API. Read-only public
smoke checks may use production. Do not use the main site's database as staging:
application, payment, messaging, role-management and deletion tests change real
records. A Vercel preview pointing at the production API is still production data.

For isolated write-capable acceptance testing, the recommended option is to deploy the same code twice:

| | Normal use | Test installation |
| --- | --- | --- |
| Website | Existing www.cea.ng | Separate Vercel project with a stable staging `.vercel.app` origin |
| Worker | Existing cea-api | New cea-api-staging Worker |
| D1 | Existing cea-db | New cea-db-staging database |
| R2 | Existing cea-uploads | New cea-uploads-staging bucket |
| KV | Existing production namespaces | Two new staging namespaces |
| Realtime | Existing Worker Durable Objects | New Worker-scoped Durable Objects |
| Payments | Existing configuration | Paystack TEST keys only, configured separately |
| Email/SMS/Sheets | Existing configuration | Initially console/disabled; later approved tester-only delivery |

No second repository, duplicate UI rewrite, Firebase database or new paid domain
is required. Provider plans/quotas still apply; no zero-cost guarantee is implied.
Firebase does not replace the existing Cloudflare API/database.

**Do not remotely deploy `-e dev` from the current `backend/wrangler.jsonc`.** Its
bindings reuse production resource IDs; it is intended for local Miniflare use.

## 1. Create new Cloudflare resources

Use an owner-authorised local terminal or approved deployment automation. Do not
paste Cloudflare API tokens in chat. Run from `backend/` with dependencies installed:

```sh
npx wrangler d1 create cea-db-staging
npx wrangler kv namespace create CEA_STAGING_FLAGS
npx wrangler kv namespace create CEA_STAGING_RATE_LIMIT
npx wrangler r2 bucket create cea-uploads-staging
```

Record the returned D1 and KV IDs. Do not substitute production IDs. These commands
create resources; they have **not** been executed by this change. Names are proposed
new resource names, not claims that deployed resources exist.

## 2. Reserve a separate frontend project/origin

Create a Vercel project for this repository, distinct from the production project.
Select the current working branch for the staging deployment and obtain its stable
project URL. Avoid per-commit URLs that change on each build. Start with its
`.vercel.app` hostname: existing E2E protections deliberately reject `cea.ng` and
its subdomains. Keep staging limited to authorised testers and exclude indexing;
verify any deployment-protection login is compatible with Android WebView/API calls.

Do not change the production project's environment settings. Do not describe an
initial build without the API variable as functioning staging: production Next
builds only use mocks when explicitly opted into `NEXT_PUBLIC_ENABLE_MOCKS=true`.
A mock preview can exercise layout, but cannot prove payments/auth/realtime.

## 3. Generate a separate Worker configuration

Create `staging-resources.local.json` at the repository root with these fields,
filled using the **actual** resource IDs and frontend URL you just obtained:

- `frontendOrigin`: the staging website's HTTPS origin, no path/query.
- `databaseId`: returned ID for cea-db-staging.
- `flagsId`: returned ID for CEA_STAGING_FLAGS.
- `rateLimitId`: returned ID for CEA_STAGING_RATE_LIMIT.

Then, from the repository root:

```sh
npm ci
node scripts/staging-config.mjs staging-resources.local.json
```

This writes ignored `backend/wrangler.staging.json` for review. It rejects known
production/dev resource IDs, production frontend URLs, duplicate KV IDs and zero
placeholder IDs. It does not provision, migrate or deploy anything.

The generated config deliberately keeps `APP_ENV=production` for production-like
cookie/auth/CSRF behaviour (no dev token bypasses), but uses separate resources.
Crons are disabled; mail/SMS initially log rather than deliver; Sheets hooks are
empty; no payment, AI, VAPID, email or other production secrets are copied.
This is configuration isolation, not a guarantee against later adding unsafe secrets.

## 4. Deploy only the new Worker and migrate only its new database

Review every binding first. From `backend/`:

```sh
npx wrangler d1 migrations apply DB --remote --config wrangler.staging.json
npx wrangler deploy --config wrangler.staging.json
```

Use the API URL returned by that deployment; do not invent or assume one is live.
Start with a fresh database and selected reviewed synthetic seed fixtures. Do not
clone production personal/payment data and do not run demo seed commands against
production. Test-user role provisioning must be reviewed and scoped to the staging
DB explicitly; never add production demo/admin accounts for convenience.

For payment testing, set `PAYSTACK_SECRET_KEY` on **cea-api-staging only** with a
Paystack test-mode key, using `wrangler secret put PAYSTACK_SECRET_KEY --config
wrangler.staging.json`. Configure its test webhook separately; do not redirect the
production webhook. Real provider email/magic-link tests also need a separately
configured mail provider and controlled tester inboxes. Console mail is not proof
of email delivery and may put test links in Worker logs—restrict log access.

Never copy production secrets wholesale. Set only the services needed for the
specific test. Do not activate background schedules while testing manually.

## 5. Connect the staging frontend

Set these values in the **separate Vercel project**, then rebuild:

- `NEXT_PUBLIC_API_URL`: the deployed staging Worker HTTPS origin.
- `NEXT_PUBLIC_WS_URL`: corresponding staging `wss://` origin, if explicitly set.
- `NEXT_PUBLIC_APP_ENV=prod` (exercise production frontend behaviour).
- `NEXT_PUBLIC_ENABLE_MOCKS=false`.
- `NEXT_PUBLIC_ENABLE_PUBLIC_TRACKING=false`.
- Paystack public TEST key; Turnstile key approved for that staging hostname.
- Leave web-push/VAPID unset until deliberately configured for test delivery.

The Worker `FRONTEND_ORIGINS` and `APP_URL` must match that exact frontend origin.
Verify auth cookies, CORS, WebSockets and redirects before enabling write tests.
Apply noindex headers/metadata to staging and keep secrets server-side.

## 6. Build the test APK against BOTH staging origins

Export the actual deployed values as `CEA_ANDROID_ORIGIN` and
`CEA_ANDROID_API_ORIGIN`, then run in the same shell:

```sh
npm run android:sync
npm run android:build
```

Do not leave the API origin pointing at production when changing the frontend:
the native download allowlist uses that API origin. For browser acceptance, set
`E2E_BASE_URL`, `E2E_API_BASE` to staging and `E2E_ALLOW_STAGING=true` explicitly.
Keep production E2E refusal checks in place.

## Firebase received and checked

Owner supplied Android **client configuration**, matching:

- Project ID: `cyber-elias-academy-app`
- Project number: `327984401909`
- Android package: `ng.cea.app`

It is installed at `apps/android/android/app/google-services.json` and validated
before Capacitor sync. This is normal Android client configuration, not a private
service-account credential. Do not place server credentials or signing keys here.
Review Firebase API-key restrictions against the package and signing certificates
in the Firebase/Google Cloud console. No Analytics SDK or tracking was added.

This file alone does **not** complete native push: device permission/token handling,
authenticated registration/revocation, server-side FCM credentials, delivery and
account-switch tests remain separate work. Keep service-account credentials in
Worker/deployment secrets, never in the APK or chat. The existing VAPID web-push
keys are not a replacement for native FCM server authentication.

## Current deployment status

Configuration tooling and Android client setup are prepared. No staging resources
were created, no live database was migrated, and no production settings were changed.
Vercel can be connected in Arena to assist with frontend setup. Cloudflare setup
requires an authorised owner deployment path; do not share access tokens in chat.
