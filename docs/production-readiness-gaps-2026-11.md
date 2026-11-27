# Production readiness: what was missing, and what was fixed

2026-11-25. Written after auditing every flow named in the question — auth, sessions,
payments, the learner portal, the staff app, forms, empty states, error paths,
realtime, accessibility and resilience.

## The honest finding

The app was in better shape than its surface suggested. Most of what a
production system needs already existed and was built correctly:

| Area | State found |
|---|---|
| Writes never auto-retried | Already correct, with a comment explaining why — retrying a POST can duplicate a payment |
| Money paths | `apply/status` handles 401/403/not-found separately; `/pay` refuses to take money before a confirmed offer |
| Account lifecycle | Password change, email verification, MFA, **data export**, and account deletion with typed confirmation + password + MFA re-auth |
| Empty states | `QueryState` ships a sensible default; 96 pages rely on it |
| Private routes | `X-Robots-Tag: noindex` + `Referrer-Policy: no-referrer` |
| Offline | Service worker caches public assets only, never workspace HTML or Next data |
| PWA | Manifest, icons, maskable icon, offline page |
| Consent | Gatekeeper/TCF gate on every third-party script, test-enforced |
| Error boundaries | Route-level `error.tsx` with retry |

That list matters because the temptation with a question like this is to invent
work. Most of the plumbing was sound. What follows is what was genuinely missing.

## Fixed in this pass

### 1. No `global-error.tsx` — a root-layout crash was a blank page

`error.tsx` catches failures inside the route tree, but it renders *within* the
root layout. If the layout itself throws, nothing catches it and the visitor gets
a white screen with no explanation, no branding and no way out.
→ `src/app/global-error.tsx`. Plain JSX and inline styles only, because the
module that failed could be anything it might have imported.

### 2. Session expiry discarded the user's place

A learner whose session expired mid-assessment was sent to `/auth/sign-in` and,
after signing in, dropped on the dashboard. Their work position was gone, and
nothing told them why they had been redirected.
→ `src/lib/auth/return-path.ts` + wiring in `app-shell.tsx` and `auth.sign-in.tsx`.

This is also a **security boundary**, not just UX: a naive `?redirect=` parameter
is an open redirect that hands a freshly authenticated session to another origin.
The stored path is validated to reject absolute URLs, protocol-relative URLs,
`/\` normalisation tricks, control characters, and auth paths (redirect loops).
Ten tests cover it, including nine hostile inputs.

### 3. Live chat never reconnected

`use-websocket.ts` had no reconnect path at all. One dropped socket — the normal
case on a Nigerian mobile network — killed live chat until the page was reloaded,
and the UI showed "offline", which reads as "nobody is here" rather than "you
disconnected".
→ Exponential backoff with jitter (1s → 30s), capped at 8 attempts, retry counter
reset on success, timer cleared on unmount, and the badge now distinguishes
`connecting` / `reconnecting` / `offline`.

### 4. No automated accessibility check, against a published WCAG 2.1 AA aim

`/accessibility` states the Academy works toward WCAG 2.1 AA and does not claim a
full audit. Nothing in CI could fail if that regressed.
→ `scripts/audit-accessibility.mjs` (`npm run audit:a11y`), checking 790
pre-rendered pages for: `<html lang>`, single `h1`, skipped heading levels, `img`
alt attributes, form controls without accessible names, positive `tabindex`, and
links without discernible text.

It found **158 violations. 127 were false positives in the detector itself** — the
app labels controls with `<label><span class="sr-only">`, which `for=`-only
detection cannot see, and Radix injects hidden focus sentinels that are correctly
`aria-hidden`. Both were fixed in the detector rather than suppressed, because a
gate that cries wolf gets muted. The remaining 31 were real and are fixed: tool
pages using `h3` directly after `h1`, an unlabelled tutor input, and an icon-only
send button with no accessible name.

**The most important thing this script does is refuse to pass on an empty build.**
It did exactly that during development: a killed build left `.next` present but
empty, and it printed "0 pages, no violations found" — the most dangerous output
an audit can produce. Absence of evidence must never render as evidence of
absence, and a test now enforces that guard.

## Not fixed, and why

These are named rather than quietly omitted:

1. **Idempotency keys on writes.** The client correctly never auto-retries a POST,
   but a user double-tapping submit, or a proxy retrying, can still duplicate an
   application. The durable fix is an `Idempotency-Key` header generated per form
   and honoured by the Worker. That is a **backend contract change** — doing it
   client-side alone would be theatre.
2. **Content-Security-Policy.** Deliberately absent. The app loads consent-gated
   third-party scripts and inline JSON-LD; a guessed CSP would break the ads or the
   schema. This needs its own allowlist, its own report-only rollout, and its own
   test.
3. **Browser-run accessibility** — contrast, keyboard traps, focus visibility.
   Needs axe-core under Playwright. The script says so in its own output.
4. **The E2E suite is unverified in this environment.** Chromium cannot be
   downloaded here, so 158 Playwright tests have not run. They are not passing and
   not failing — they are unknown.
5. **Full build unverified here.** The Next.js build is OOM-killed at ~3.2 GB in
   this sandbox. Confirmed as an environment limit, not a regression: `git stash`
   then rebuild fails identically on the untouched tree. `tsc`, ESLint and the
   whole unit suite pass, but the production build must be run by CI.

## Check order for CI

```
npm ci
npm run generate:ai-lessons     # tests read src/content/ai-lessons-rendered
npm test                        # 150 unit tests
npx tsc --noEmit
npm run lint
npm run build
npm run audit:a11y              # must run AFTER build — it reads .next/server/app
npm run audit:images -- --strict
npm run validate:lessons -- --strict
npm run audit:structure -- --strict
npx playwright test             # needs browsers installed
```
