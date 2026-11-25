# Consent, tracking and operations — November 2026

What changed after adding Microsoft Clarity and confirming the ngadverts placement,
and an audit of what else was missing for the site to work properly for everybody.

---

## 1. What was asked for

Two snippets:

1. **Microsoft Clarity** (`zj04tsoszk`) — session replay and heatmaps.
2. **ngadverts** zone `13225` — a Nigerian display ad unit.

The ngadverts unit was **already implemented** under `src/lib/ads/ngadverts.ts`,
`src/lib/ads/slots.ts` and `src/components/marketing/ngadverts.tsx`, and mounted on
lesson pages, the lesson index and course pages. It just never filled, for the
reason in §2.

---

## 2. The bug this uncovered: nobody was ever asked

Clarity needed a consent gate. Looking for where to put it found that consent was
controlled by **two independent keys**:

| Key | Written by | Read by |
|---|---|---|
| `cea-cookie-consent` | the banner | the banner only |
| `cea:consent` | `lib/ga4.ts` | AdSense, ngadverts |

The banner wrote both, so the happy path worked. But:

- The banner was only mounted when `NEXT_PUBLIC_ENABLE_PUBLIC_TRACKING === "true"`
  (`app/providers.tsx`).
- That flag is **false by default** and is not set in any deployment.
- `lib/ga4.ts` also bailed immediately when the flag was off, before touching
  storage.

So in the shipped configuration:

```
flag off → no banner → visitor never asked → no consent key
         → loadAdSense() returns early → no ad tag
         → AdUnit sees no consent → renders nothing
```

**The site earned nothing from advertising, and no visitor was ever asked about
it.** In the flag-on configuration the banner appeared, but the AdSense loader
also required the flag, so the outcome was the same.

### The fix

- `src/lib/consent.ts` — **one** record, `cea:consent:v2`, versioned, granular
  (`ads` and `analytics` are separate), migrates both legacy keys, survives
  storage throwing in private mode.
- `src/lib/tracking.ts` — the only module that injects an optional script. Three
  loaders (Clarity, GA4, AdSense), each re-checking consent itself and each
  refusing to run on `/app`, `/portal`, `/auth`, `/apply`, `/pay`, `/payment`,
  `/checkout`, `/cart`, `/certificates` or `/contact`.
- The banner now mounts **unconditionally**. Ignoring it is treated as refusal,
  which is the required default in the EEA and UK.
- Visitors can change their mind from **Cookie settings** in the footer and from
  the privacy policy — GDPR Art. 7(3) requires withdrawal to be as easy as consent.
- `lib/ga4.ts` and `lib/adsense.ts` deleted; nothing else referenced them.

---

## 3. Where Clarity is placed, and why not in `<head>`

The pasted snippet belongs in `<head>` as a raw `<script>`. Doing that literally
would have broken three things, so it is implemented as `loadClarity()` instead:

| Risk of the raw snippet | What the implementation does |
|---|---|
| Loads before any consent decision, and records the visit | Loads only with **analytics** consent |
| Would record `/pay`, `/auth`, `/apply` — card details and support threads | Refuses those paths unconditionally |
| Records on-screen text, including fees and personal detail | `maskText` plus `data-clarity-mask="true"` — **all text masked by default** |
| Loads twice on client-side navigation | Guarded by a `data-cea-clarity` attribute |
| **Uploads IP addresses and device identifiers to a Microsoft-hosted service without ever declaring it** | Declared in the generated processor table on `/privacy` |

That last row is the one that matters commercially: an undeclared session-replay
tool is the most common reason an AdSense application is refused, and the privacy
policy previously named only Google, ngadverts and Cloudflare.

---

## 4. What was missing across the app

Audited against "does every user get what they came for". Ordered by impact.

### 4.1 No way to search the site — **fixed**

There was a ⌘K modal (`global-search.tsx`), but it matches only course titles,
FAQ questions, tool names and lesson *titles/excerpts/slugs*. With 210 lessons
averaging 782 words, **the lesson bodies were never searched**, and the modal has
no URL, so a result could not be shared or linked.

`/search` indexes full lesson text plus every tool, and is linkable. The modal's
empty state now hands the query to `/search` instead of dead-ending. Both are
`noIndex` — they are utilities, and the lessons themselves are already indexed.

### 4.2 `/status` was referenced in policy but 404'd — **fixed**

`lib/ads/slots.ts` lists `/status` as a path that must never carry an ad, but the
route did not exist. A status page is read almost exclusively when something is
broken, so a 404 there is the worst possible moment to have one.

It now exists and reports only what it can actually observe from the visitor's
browser, marking everything else "not verifiable here" rather than showing an
unearned green light. `audit:structure` flagged it as an orphan; it is now linked
from the footer.

### 4.3 Environment configuration failed silently — **fixed**

`check-production-env.mjs` checked one variable. A production build with no
`NEXT_PUBLIC_GA4_ID`, no Turnstile key and no Paystack key deployed happily and
then could not measure, could not block bots, and could not take payments.

It now distinguishes two very different failures:

- **Hard failure** — the site is wrong for everyone (missing API URL, non-HTTPS
  API URL, mocks on in production, invalid `APP_ENV`).
- **Loud warning** — degraded but honest (no analytics id, no bot protection, no
  push keys), printed as a labelled banner so the gap is visible in the deploy log
  without blocking a content release.

### 4.4 The tracking flag was misleading — **fixed**

`.env.example` said "Leave optional GA4/AdSense tags off until a separate review."
That flag made ads *unreachable*, not *opt-in*. The file now documents the real
gating (per-category consent plus a route exclusion list) and marks the old flag
deprecated.

### 4.5 Still missing — recommended, **not** built in this pass

| Gap | Why it matters | Effort |
|---|---|---|
| **No CSP** | `vercel.json` sets no `Content-Security-Policy` and no `X-Frame-Options` / `Referrer-Policy`. Adding Clarity and AdSense makes this more urgent, not less: three third-party script origins now need to be declared. | Medium — must allow `'unsafe-inline'` until the inline theme script is moved to a nonce |
| **No server-side error monitoring** | `error.tsx` calls `reportLovableError`, which posts to `window.__lovableEvents` — a global that only exists inside the Lovable preview iframe. **In production it does nothing.** A crash on `/apply` is invisible unless a user emails. | Small — one `window.onerror` + `unhandledrejection` sink to a Worker endpoint |
| **Rate limiting has no client-side backoff** | Turnstile exists on forms, but the fetch client retries without backoff on 429. | Small |
| **No `sitemap.html`** for humans | Minor; `/search` now covers the need. | Low |
| **Push notifications are wired but unverifiable** | `subscribeToPush` runs on session, but no `NEXT_PUBLIC_VAPID_PUBLIC_KEY` is configured, so the permission prompt is never usefully reached. | Config, not code |

---

## 5. Guardrails added

Three, all in CI via `npm run check:consent` (now part of `check:ads`):

**`scripts/check-tracking-consent.mjs`** — 11 static checks. The important ones:

- every `load*` loader reads the consent module and checks the **correct**
  category (an ad loader gated on `analytics` fails);
- every loader is idempotent and route-scoped;
- every loader is disclosed in `PROCESSORS`, and `/privacy` renders that array
  rather than a hand-written list;
- the banner is not conditionally mounted again;
- no third-party script is injected outside the two sanctioned files;
- Clarity still masks text;
- the dead env flag is not read.

**`scripts/test/consent-gating.test.mjs`** — 19 behavioural tests against a fake
DOM, covering: no consent by default; ads and analytics granting independently;
version bump invalidating an old decision; both legacy keys migrating; Clarity
absent without analytics consent and absent with ads-only consent; Clarity present
and masked with analytics consent; Clarity and AdSense absent on five
transactional paths each; single injection across repeated calls; GA4 pushing
`ad_storage: denied`.

**`check-ad-slots.mjs`** — updated, because it referenced the deleted
`lib/adsense.ts`. It now asserts the loader reads the unified consent module,
requires explicit `ads` consent, keeps the private-route list, and **fails if the
env flag is reintroduced**.

---

## 6. Verification

```
npm run check:consent   → 3 loaders compliant · 19/19 tests pass
npm run check:ads       → placement policy holds · consent guardrail holds
npm run validate:lessons→ 210 lessons, 0 errors
npm run audit:structure → 451 routes, 0 errors, 0 warnings
generate-sitemap        → 428 URLs
npx tsc --noEmit        → clean (one pre-existing parse error in app/library.tsx, untouched)
```

Live check: `/`, `/status`, `/search`, `/privacy`, `/tools`,
`/blog/kilobytes-and-megabytes` all return 200, and `clarity.ms` does **not**
appear in the initial HTML — only after consent is granted.

---

## 7. What to do before relying on this

1. **Confirm the Clarity project id.** The loader uses `zj04tsoszk` from the
   provided snippet. It is public, not a secret.
2. **Update the privacy policy date.** It is generated from `PROCESSORS`, but the
   "last updated" line still needs a human edit to today.
3. **Check Clarity's own dashboard masking setting.** `maskText` is set by the tag
   and by the `data-clarity-mask` attribute, but Clarity's dashboard has its own
   override. Verify a recording shows layout but not text before trusting it.
4. **Decide on the CSP in §4.5.** With three third-party script origins now live,
   this is the next security task, not a nice-to-have.
