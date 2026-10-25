# AdSense Approval Playbook — Cyber Elias Academy

Companion to [`../plans/CEA_MASTERPIECE_BLUEPRINT_2026-10.md`](../plans/CEA_MASTERPIECE_BLUEPRINT_2026-10.md).

**Scope:** what it actually takes for `www.cea.ng` to be approved for Google AdSense, how to place ads afterwards without damaging enrolment or trust, and how to get paid in Nigeria.
**Currency of policy:** written 25 October 2026. Google's policies change; before filing an application, re-read the AdSense Program policies and the EU user consent policy page in-product.

---

## 0. The honest framing (read this before anything else)

1. **AdSense approval is a quality judgment, not a checklist.** Technical requirements are necessary and cheap. The expensive part is proving that every page a reviewer might sample adds value. Google's own wording for the near-universal rejection is *"low value content"* / *"insufficient content"* — which is a statement about the site as a whole, not about a missing file.
2. **There is no minimum traffic requirement and no minimum domain age.** Approval at low traffic is possible. There *is* a de-facto floor of original, substantial, well-structured pages, coherently focused, with legal pages and working navigation.
3. **CEA already has the hard part.** 210 original lessons in a distinctive, locally-grounded voice; 13 real courses with published fees; a real address and photographs; a founder with a byline; a privacy policy that already discloses advertising; `/ads.txt` already published; a consent banner; ad code that renders nothing until approval. That is more than most approved sites start with. The risk is not "no content" — it is **thin, empty, or broken pages sitting in the index next to the good ones**, which a reviewer will reasonably read as "unfinished site".
4. **The money is small; the downside is not.** Nigerian informational RPMs are low (see §9). The real risk is not earning little — it is (a) letting ad inventory reshape pages that convert learners, and (b) triggering a policy strike that is hard to unwind. Treat ads as a subsidy capped at one day of work per month.

---

## 1. What the reviewer actually does

| Step | What happens | What it means for us |
|---|---|---|
| **Site added & verified** | Ownership via AdSense code, meta tag, or `ads.txt` | Already satisfied: `ads.txt` + `google-adsense-account` meta + client ID in `src/lib/adsense.ts` |
| **Automated crawl** | `Mediapartners-Google` fetches public pages; content, structure, policy, and page quality are evaluated | `robots.txt` must not block `Mediapartners-Google`; verify after any robots change |
| **Human sampling** | A reviewer opens a handful of pages — often the homepage, a nav item, one deep page, the legal pages, and the most recently published content | **Every sample must be strong.** A random lesson must read well; a random nav item must not be an empty shell |
| **Policy check** | Content categories, ad placement eligibility, navigation, ownership, duplicate/spun content, misleading claims | No banned categories; no fake awards/testimonials; no ads on no-content pages |
| **Decision** | Approved, or rejected with a reason (`low value content`, `site does not comply with policies`, `site down/unavailable`, `invalid ownership`) | Re-apply only after a material, documented change |

Consequence: **do not optimise for the homepage.** Optimise for *any ten pages chosen at random*.

---

## 2. Current state: what is in place and what is missing

Verified in the repository and against production on 25 October 2026.

| Requirement | State | Evidence / gap |
|---|---|---|
| `ads.txt` at root, correct publisher ID | ✅ | `public/ads.txt` → `google.com, pub-9117572925263537, DIRECT, f08c47fec0942fa0` |
| Site ownership / publisher meta | ✅ | `src/app/layout.tsx` → `google-adsense-account` |
| Privacy policy disclosing ads & third-party cookies | ✅ | `/privacy` §6 "Advertising (Google AdSense)" with opt-out links |
| Consent mechanism | ⚠️ | `src/components/marketing/cookie-consent.tsx` — localStorage banner, adequate for NG traffic, **not** a Google-certified CMP for EEA/UK/CH |
| Ad script gated until approved | ✅ | `src/lib/adsense.ts` requires `NEXT_PUBLIC_ENABLE_PUBLIC_TRACKING=true`; path exclusions for legal/apply/auth/app/portal |
| No fake ad placeholders | ✅ | `src/components/marketing/ad-slots.tsx` renders `null` — correct, keep it |
| Crawlable sitemap incl. all public content | ✅ | build-time `scripts/generate-sitemap.mjs`; ~400 URLs |
| Crawler access | ✅ | `robots.txt` blocks only `/app`, `/auth`, `/portal`, `/apply*` |
| `noindex` on private surfaces | ✅ | `/app`, `/auth`, `/portal`, `/apply` + `X-Robots-Tag` |
| Content depth on lessons | ✅ | 210 lessons in house voice, 900–1,400 words in current template |
| Content depth on course pages | ⚠️ | Skeleton good; needs modules, schedule, deliverable proof, FAQ, pre-read lesson |
| Thin/empty public pages in the index | ❌ | `/library`, `/stories`, `/marketplace`, `/virtual-tour`, `/work`, `/alumni`, `/programs/compare`, forms-only pages — the single biggest approval risk |
| Google-certified CMP (EEA/UK/CH) | ❌ | Needed only for personalised ads to those regions; required if the site is ever marketed there |
| Ad unit implementation | ❌ | Components are stubs; needs reserved-space, lazy, policy-safe units |
| Policy lint / guardrails in CI | ❌ | Nothing stops an ad slot landing on `/apply` tomorrow |
| Documented application history | ❌ | No record of previous applications, dates, rejection reasons — start one now |
| Author/editorial transparency | ⚠️ | `/editorial` exists; needs bylines, reviewer names, AI policy, corrections SLA |

**Interpretation:** CEA is perhaps two focused weeks of work away from a *credible* application, and one focused month from a *strong* one. The blocker is not AdSense plumbing. It is the thin and empty pages plus per-page depth on commercial pages.

---

## 3. The seven gates (binary, evidence-linked)

Do not file until all seven are green. Each gate has an owner from [`role-activation-matrix.md`](../plans/role-activation-matrix.md).

### Gate 1 — Site is public, reachable, and crawler-clean
- [ ] Every page in the sitemap returns 200 to `Mediapartners-Google` user agent.
- [ ] `robots.txt` allows `Mediapartners-Google` and points at a live sitemap.
- [ ] No page in the index is an error page, a redirect chain, or a "coming soon" shell.
- [ ] HTTPS everywhere; canonical host consistent (`https://www.cea.ng`).
- [ ] No `noindex` leak on any public content page (weekly crawl diff).
**Owner:** SEO manager + frontend lead.

### Gate 2 — Zero thin or empty pages in the index
The rule: **every indexable URL is either ≥600 rendered words of original substance, or it is a genuine listing/hub with real items, or it is `noindex` until it is.**

| Page | Today | Action |
|---|---|---|
| `/library`, `/library/<category>` | API-dependent, can render empty | Server-render a real curated fallback; if still empty → `noindex` until populated |
| `/stories` | Heading + CTA | Publish 3 consented stories; before that, honest "collecting the first ones" page + form, `noindex` optional |
| `/marketplace`, `/shop/*` | Catalogue-thin | Add substance or `noindex` until fulfilment is real |
| `/virtual-tour` | Thin | Add captioned photo essay (the 24-shot list is the source) |
| `/work`, `/alumni` | Thin | Real projects/alumni with dates, or `noindex` |
| `/programs/compare` | Thin | Make it a genuine comparison with fees, weeks, outcomes; otherwise fold into `/classes` |
| `/contact`, `/apply`, `/visit/*` | Form-centric | Legitimately low-word; add supporting copy above and below (what to bring, response times, what happens next) |
| `/certificates/verify`, `/faq` | Utility | Keep; ensure supporting copy renders server-side |

**Owner:** SEO manager + editor-in-chief. **Evidence:** dated crawl table with word counts and a decision per URL.

### Gate 3 — Content substance and originality
- [ ] Every course page: fee, weeks, sessions/week, requirements, deliverable, schedule/next start, 5–8 FAQs, 2 linked free lessons. 700+ words.
- [ ] Lessons: 900–1,400 words, 2–4 original figures, "if this went wrong", self-check, sources, reviewer byline, computed reading time.
- [ ] No duplicated blocks across pages (no boilerplate padding to reach word counts — reviewers and classifiers both notice).
- [ ] Nigerian context is real (NEPA, POS, data bundles, Naira), not pasted global copy.
- [ ] Claims register exists; no unverifiable statistic, rating, testimonial, employer logo, or salary figure anywhere.
**Owner:** editor-in-chief + fact-checker. **Evidence:** script report over all lessons (words, figures, self-check, sources, reviewed date).

### Gate 4 — Trust and transparency pages
- [ ] `/about` — real history, address, map, what CEA is and is not.
- [ ] `/team` — named people, roles, photographs or initials.
- [ ] `/editorial` — standards, bylines, review dates, **AI policy**, corrections policy + SLA, advertising-independence statement.
- [ ] `/contact` — WhatsApp, phone, email, hours, address, response-time promise.
- [ ] `/privacy` — vendors list, cookies, opt-outs, ad disclosure (already largely present), Nigeria Data Protection Act language.
- [ ] `/terms`, `/refunds`, `/accessibility` — plain-language summaries at the top of each.
**Owner:** DPO + legal. **Evidence:** reviewed pages with version dates.

### Gate 5 — Technical page experience
- [ ] LCP p75 mobile ≤ 2.5 s (target 1.8 s), INP ≤ 200 ms, CLS ≤ 0.05 on the six core templates.
- [ ] Mobile usable at 360px; no horizontal scroll; no intrusive interstitials; no pop-ups.
- [ ] No broken links/images in the crawl; no console errors on the six templates.
- [ ] Nav works without JS; search works.
**Owner:** performance engineer + QA.

### Gate 6 — Consent, privacy and ads.txt correctness
- [ ] `ads.txt` live, single line, correct publisher ID, reachable at `https://www.cea.ng/ads.txt` (verified after every deploy).
- [ ] Consent banner has equal-prominence accept/decline, persists choice, and never blocks reading.
- [ ] No ad or analytics script fires before consent.
- [ ] **If any traffic from EEA/UK/Switzerland is expected:** a Google-certified CMP integrated with IAB TCF is in place (see §6). Otherwise document the decision to serve non-personalised ads there, or exclude those regions.
**Owner:** DPO + monetisation manager.

### Gate 7 — Application hygiene
- [ ] One AdSense account for the academy, on the Google account that owns Search Console and Analytics.
- [ ] Publisher name and address match the bank records (see §9) and the academy's legal details.
- [ ] Site category: Education. Language: English. Description: factual, one sentence.
- [ ] Application log opened (date, gate evidence, submission, outcome, reason).
- [ ] Content model frozen for the review window (see §8).
**Owner:** monetisation manager.

---

## 4. The page-type policy map (where an ad may never appear)

The governing rule: **ads only where the page's primary job is reading.** That rule is stricter than Google's and protects both revenue and conversion.

| Path | Ads? | Why |
|---|---|---|
| `/blog/*` (lessons) | ✅ Yes, 2–3 units | Long-form original reading — the natural home |
| `/blog` (index) | ✅ One unit after the first 8 items | Listing with substance |
| `/glossary`, `/glossary/*` | ✅ One unit | Reference reading |
| `/career-guides/*`, `/resources/*` | ✅ One or two units | Reference reading |
| `/classes/*` | ❌ No | Commercial page with an Apply CTA; ads would compete with enrolment and sit next to a conversion control (accidental-click risk) |
| `/apply`, `/pay`, `/payment` | ❌ No | Transactional — ads on non-content pages are prohibited, and this would be absurd |
| `/contact`, `/visit/*`, `/partners/apply`, `/request-project` | ❌ No | Form pages |
| `/certificates/verify` | ❌ No | Utility; minimal-data surface |
| `/privacy`, `/terms`, `/refunds`, `/accessibility` | ❌ No | Legal |
| `/auth/*`, `/app/*`, `/portal/*` | ❌ No | Private/session surfaces; also not crawlable |
| 404 / 500 / offline | ❌ No | Error pages |
| Any page under construction / "coming soon" | ❌ No | Prohibited |
| Inside modals, drawers, popovers, or emails | ❌ No | Prohibited placement context |

Implementation must make this structural, not a matter of memory: the ad component takes a slot id, and the slot registry is validated against a route allowlist at build time (§7).

---

## 5. Ad implementation spec (after approval only)

| Concern | Requirement |
|---|---|
| Script loading | One AdSense script, loaded after consent, only on allowlisted paths; `async`, `crossOrigin="anonymous"`; never in `<head>` preload |
| Units | Manual units only. **Auto ads off** (anchor, vignette, in-page). Auto ads are the fastest way to place ads in policy-risky spots and hurt CWV |
| Formats | Responsive display; one in-article after the second H2 (≈ paragraph 4); one end-of-article; one optional sidebar (≥1280px, sticky, non-lesson pages) |
| Density | ≤ 3 units per page; ≤ 1 per viewport; never more ad height than content in any viewport |
| Separation | ≥ 250px between any ad and an Apply/WhatsApp/phone CTA; ads never directly under a heading, above the H1, or between a question and its answer |
| Layout stability | Reserve space with `aspect-ratio`/`min-height` on the wrapper so CLS stays ≈ 0; no ad-induced reflow; never inject ads after user interaction |
| Loading | IntersectionObserver with 300px root margin; `loading` never blocks main thread; no ad refresh, no auto-reload |
| Unfilled slots | Collapse the wrapper after a short timeout so no empty box is left visible; never render dashed "Advertisement" frames before approval |
| Mobile | No sticky/anchor ads; no ads within the first viewport of a lesson; never covering navigation or the apply bar |
| Accessibility | Wrapper labelled `aria-label="Advertisement"`; ads never the only focusable item in a region; no flashing units |
| Analytics | AdSense reporting by URL; separate dashboard view from enrolment metrics; monthly review only |
| Privacy | Ad personalisation signalled by consent; non-personalised fallback for non-consenting users |

**Do not:** click your own ads (ever, including "to test"), ask learners or staff to click, offer anything in exchange for clicking, buy traffic to ad pages, use pop-unders, refresh units, or place ads near download/apply buttons.

---

## 6. Consent architecture (the part most Nigerian sites get wrong)

| Region | Requirement | Recommended implementation |
|---|---|---|
| Nigeria / rest of world | Local law (NDPA 2023) + Google's EU consent policy does not apply, but honest consent is still right | Keep a first-party banner: essential only by default, analytics and ads opt-in, equal-prominence buttons, remembered choice |
| EEA / UK / Switzerland | Google-certified CMP integrated with IAB TCF required for personalised ads (EEA/UK since 16 Jan 2024; Switzerland since 31 Jul 2024); keep current with the TCF version Google requires | Use **Google's own consent message** (free, certified, configured in AdSense → Privacy & messaging) for those regions, or a certified third-party CMP |
| All regions | Consent Mode v2 for GA4 if Google tags run | Pass consent state to `gtag`; default denied until choice |

**Avoid the double-prompt failure:** a first-party banner *plus* a certified CMP asking twice is both annoying and a sign of an unmanaged stack. Pick one owner for consent. The pragmatic path for CEA: enable Google's consent message (certified) for EEA/UK/CH, and keep the existing first-party banner for analytics outside those regions — with an explicit rule that only one prompt may show per user per region, and a test that proves it.

**Also required in the privacy policy** (mostly present today): the vendors used, the purpose, the opt-out links (Google Ads Settings, aboutads.info), retention, the lawful basis, the DPO contact, and the fact that advertising is independent of editorial content.

---

## 7. Guardrails in code (make the rules enforceable)

1. **Slot registry.** `src/lib/ads/slots.ts`: each slot declares `{ id, pathPattern (allowlist), position, minHeight }`. A slot that tries to render outside its allowlist returns `null` and logs a dev warning.
2. **Route allowlist test.** A unit test iterates every route file and asserts that no forbidden path can render an ad slot.
3. **Build-time lint.** Fail the build if: `adsbygoogle` appears outside the loader; Auto ads config appears; a slot lacks `minHeight`; `NEXT_PUBLIC_ENABLE_ADS` is true in a preview environment.
4. **Consent gate test.** Playwright: no request to `pagead2.googlesyndication.com` before consent; no request at all on `/apply`, `/privacy`, `/app/*`.
5. **CLS budget test.** Lighthouse CI on a lesson with ads simulated (reserved wrapper) must stay ≤ 0.02.
6. **Frozen-content flag.** A `ADSENSE_REVIEW_MODE` env that disables scheduled content-model changes during review, so gate evidence stays valid.

---

## 8. Filing, waiting, and re-applying

### 8.1 Pre-flight (day before filing)
- Run the full crawl; screenshot the six gates' evidence.
- Freeze content: no mass edits, no template changes, no new ad networks, no domain changes during review.
- Confirm `ads.txt` and the meta tag are live in production (both are already in code — verify the deployed HTML).
- Confirm analytics is working (so you can prove traffic is real, not bought).
- Write the application log entry: date, gates, screenshots, applicant account.

### 8.2 Filing
- In AdSense: add site `www.cea.ng`, verify ownership, set language English, category Education, submit.
- Expect days to ~2 weeks; up to 4 weeks is normal. Do not resubmit while a review is pending.
- Do not chase approval by buying traffic or asking groups to visit. Google's invalid-traffic systems look at patterns, not intentions.

### 8.3 If rejected — the discipline
1. Read the exact reason; save a screenshot.
2. Map the reason to a gate (§3) rather than guessing.
3. Make a **material** change, verifiably: e.g. 20 thin pages fixed, 15 lessons deepened, trust pages published.
4. Wait ≥ 2 weeks of *stable* site state after the change; then re-apply once, with an updated log.
5. After a third rejection: stop. Switch to §10 alternatives and revisit in 6 months. Repeated identical submissions with no change is the one pattern that hardens a refusal.

### 8.4 Rejection → root cause → fix

| Reason shown | Most likely real cause here | Fix |
|---|---|---|
| *Low value content* / *insufficient content* | Reviewer sampled a thin/empty page (`/library`, `/stories`, `/work`, `/marketplace`, `/virtual-tour`) or a skimpy course page | Gate 2 + Gate 3; strengthen course pages; remove thin pages from the index |
| *Site does not comply with Google policies* | Usually: ads on non-content pages, misleading claims, or copied media | Audit placement map; claims register; verify image rights |
| *Site down or unavailable* | Deploy in progress, apex/www redirect confusion, or bot blocking | Verify from a clean network; check `Mediapartners-Google` fetch; avoid deploying during review |
| *Invalid ownership* | `ads.txt` or meta tag missing in the *deployed* HTML | Confirm in production source; re-verify |
| *Duplicate/auto-generated content* | Boilerplate blocks, spun AI copy, repeated lesson frames | Vary structure deliberately; ensure human bylines; AI policy published |
| *Navigation/unusable site* | Broken links, mobile issues, dead nav items | Crawl + device matrix |
| Approval, then *policy violation* | Accidental clicks, incentivised traffic, ads on ineligible pages | Turn ads off immediately, fix, appeal honestly in the Policy Centre |

---

## 9. Getting paid in Nigeria (practical, verified against Google's current help pages)

| Step | Detail |
|---|---|
| Account holder | One publisher account; the payee name and address must match your bank and ID |
| Identity verification | Threshold is **$0** for many countries — you may need to verify identity *before* ads show. Government-issued ID (NIN slip, driver's licence, passport, voter's card); do it early |
| Address verification | Threshold **$10**; a 6-digit PIN goes by standard international mail (2–3 weeks, often slower locally). 4 months to complete; up to 3 attempts; a wrong address is the most common failure |
| Payment method | Wire transfer to a Nigerian bank account is supported; EFT/Hyperwallet are not offered for Nigeria. Bank must be in the same country as the payments address. A domiciliary account avoids double conversion |
| Tax | Complete the US tax form (W-8BEN for a non-US individual/entity) to reduce withholding |
| Payment threshold | **$100** balance before payout; issued around the 21st of the following month |
| Currency reality | Earnings accrue in USD; conversion and bank fees apply |

**Set the expectation now:** with Nigerian informational traffic, a realistic display RPM is roughly **$0.30–$1.50 per thousand pageviews** (varies widely by season, device, and topic). Implication, stated plainly in the blueprint: **one additional enrolled learner (₦20,000–₦50,000) is worth more than months of ad revenue at current traffic.** Never let ad inventory, layout, or page structure trade against enrolment.

---

## 10. If AdSense never approves (or while waiting)

| Option | Threshold / reality | Fit for CEA |
|---|---|---|
| Google's consent-message-only monetisation | None | Not revenue |
| Ezoic / Monumetric | ~10k sessions/month, integrations change the page | Possible later; adds weight and risk to CWV |
| Mediavine / Raptive | 50k sessions–100k pageviews | Not realistic short-term |
| **Local sponsorship** (internet café, computer shop, stationery, data reseller) | Direct deal | **Best fit**: one labelled sponsor block per section, disclosed, no tracking, no policy risk. Rate card by month, not by impression |
| **Affiliate recommendations** for tools students actually need (hosting/domain, antivirus, laptops) | Disclosure required | Good fit if genuinely used in class and honestly compared |
| **Paid workshops, corporate training, school programmes** | None | Highest-value "monetisation" and it is the actual business |
| Donations/scholarship fund | None | Honest, community-positive |

Rule for all alternatives: any paid placement is labelled as such, sits away from conversion controls, and never influences a lesson.

---

## 11. The 8-week runway (compact)

| Week | Work | Owner | Evidence |
|---|---|---|---|
| 1 | Baseline crawl; word counts; list every thin URL; open the application log; verify `ads.txt` + meta + robots in production | SEO + monetisation | Baseline report |
| 2 | Decision per thin URL (content or `noindex`); fix `/library`, `/stories`, `/work`, `/virtual-tour`, `/marketplace`, `/programs/compare` | SEO + editor | Crawl table, all green |
| 3 | Course-page depth sprint (all 13): modules, schedule, deliverable, 6 FAQs, 2 pre-read lessons | Editor + teachers | 13 pages ≥700 words |
| 4 | Trust layer: `/editorial` (AI + corrections policy), `/team` bylines, founder letter, claims register | Editor + sponsor | Pages live, register signed |
| 5 | Performance + a11y to budget on 6 templates; device matrix test (360px, Tecno-class) | Perf + a11y | Lighthouse + axe reports |
| 6 | Consent decision implemented (Google consent message for EEA/UK/CH; first-party banner elsewhere); privacy policy vendors list updated | DPO | Consent test evidence |
| 7 | Ad plumbing behind flags: slot registry, allowlist test, reserved space, loader gate, policy lint; simulate layout with ads | Frontend + monetisation | Tests green, CLS ≤0.02 |
| 8 | Final pre-flight, freeze content, file application, log it. Continue publishing 4 lessons/week during review | Monetisation + editor | Application log entry |

**Post-approval, week 1:** enable one unit on `/blog/*` only; watch CLS, RPM and enrolment conversion for 14 days; then decide whether to add a second. Never enable all placements at once — you lose the ability to attribute a conversion drop.

---

## 12. Post-approval operating discipline

- **Monthly (≤ 1 hour):** RPM by page type, unfilled rate, policy centre, invalid-traffic notices, payout status.
- **Quarterly:** review whether any ad position is costing applications. If a position cannot be shown to earn more than it costs in enrolments, remove it.
- **Always:** ads off on `/classes`, `/apply`, legal and private surfaces; one declaration in `/editorial` that advertising never influences teaching content.
- **Incident rule:** if AdSense warns about invalid traffic, disable units the same day, investigate (link sharing, a WhatsApp blast, a paid campaign), reply in the Policy Centre, and only re-enable after the source is understood.

---

## 13. The do-not list (each of these has cost someone their account)

1. Clicking your own ads, or asking staff, family, learners or WhatsApp groups to click.
2. Paid or incentivised traffic to ad-bearing pages.
3. Ad placeholders, dashed boxes, or "advertise here" frames before live inventory.
4. Ads on form pages, legal pages, error pages, or "coming soon" pages.
5. Auto ads with anchor/vignette formats on a mobile audience that is trying to read.
6. More ad height than content in any viewport.
7. Ads disguised as navigation, download buttons, or content.
8. Pop-ups, pop-unders, interstitials, or exit intents.
9. Copying device or software screenshots you did not capture and presenting them as lessons.
10. Editing the `ads.txt` file to add networks you have not contracted with (it is a fraud surface, not a formality).
11. Re-submitting the same unchanged site repeatedly.
12. Publishing AI-spun pages at volume to reach a content threshold — the one shortcut that reliably converts a recoverable rejection into a lasting one.

---

## 14. Definition of "AdSense-qualified" for this site

> A reviewer can open any ten public URLs at random and find, on all ten: a real page with real substance, a visible next step, a named human accountable for it, no broken promise, and no ad competing with the reason the page exists — and the site loads in under three seconds on a mid-range Android phone.

When that sentence is true, file the application. Not before.
