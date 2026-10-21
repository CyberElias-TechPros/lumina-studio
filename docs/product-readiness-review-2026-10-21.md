# CEA product-readiness review

**21 October 2026 · First remediation pass · Source-led, not a certification**

## Executive judgement

CEA has a substantial working foundation: server-authorised role workspaces, payment verification, account recovery, a shared Android/web platform, public offline lessons and tested device-notification infrastructure. Its biggest opportunity is **making a few important journeys dependable and understandable**, not adding more dashboards.

It is not yet defensible to call the whole product complete, fully accessible, secure in every scenario, or ready for unrestricted public Android distribution. Route counts and passing unit tests do not establish those claims.

**Immediate recommendation:** finish this privacy/recovery remediation, validate the first-user journey on a real phone, then prove the priority learner and staff workflows. Hold major feature expansion until those gates pass.

## Evidence and scope

Reviewed source includes:
- `public/sw.js`, `public/offline.html`, `src/lib/pwa.ts`;
- sign-in/sign-up routes, auth API/schema/hooks, session provider and private query-cache handling;
- app shell/navigation, student dashboard, shared query/error states;
- backend auth/RBAC, account export/deletion and native push device handling;
- scheduled-job definitions, deployment/CI workflows and current lint configuration;
- privacy copy and tracking guards; existing role-gap and Android validation material.

The existing role-gap matrix explicitly defined “wired” as having at least one backend data source. That is a useful inventory, **not evidence that every control or workflow is complete**.

Production baseline: the owner's supplied deployment log reports commit `d23f900`, migration 0068, the hidden Firebase server credential, 878 passing backend tests, and successful exact-revision/DB-health verification. Deployment is therefore no longer an uncompleted owner task. This session's ability to dispatch deployments was previously restricted; that is a separate tooling limitation.

This pass does **not** include authenticated production role walkthroughs, a novice study, physical-device testing, measured Core Web Vitals, a full WCAG audit, penetration testing, a restore drill, or a current store-policy/legal certification. No test payments, notifications, production account deletion or database resets were performed.

## Findings fixed in this pass

| ID / priority | Finding and impact | Change | Verification |
|---|---|---|---|
| R1 · P0 | Service worker treated all same-origin non-navigation GETs as cacheable. Next.js page-data/auth/private-resource responses could enter persistent cache. Offline navigation also searched cached requests. This is a shared-device privacy risk; no actual production disclosure was demonstrated. | Allowlist public shell assets and `/_next/static/`; bypass query/RSC/auth/range requests; refuse private/no-store/HTML/RSC responses; do not persist navigation HTML; use only public offline fallback; retire old owned caches. | Six service-worker handler tests cover cache boundaries, fallback, legacy cleanup and push handling. These are executable handler tests, not a complete browser storage audit. |
| R2 · P1 | Magic-link resend read an input ref after the input had unmounted. It also omitted the fresh security-challenge flow. Users could click a non-working recovery action. | Preserve email in state. “Request another link” returns to the form and resets the challenge before a deliberate new submission. | Browser regression for preserved email and a second request; provider network is simulated. |
| R3 · P1 | Sign-in reported “sent” even when the API returned `sent: false`. Password visibility was an unnamed icon button; app/website account guidance was missing. | Show honest email-delivery failure, add same-account guidance, password-manager hints, named visibility toggle and announced errors. | Browser checks for guidance, password accessibility and failed-delivery state; changed-route lint/typecheck. |
| R4 · P1 | Sign-up offered instructor/employer/partner choices while production correctly creates student accounts. It implied permissions the backend does not grant. | Remove the misleading role chooser; explain learner-default access, staff/partner approval and that account creation is not paid enrolment. Preserve server RBAC. | Browser checks and source comparison to backend sign-up. |
| R5 · P1 | Account anonymisation removed browser subscriptions but did not immediately remove the new native registration. Native-device metadata was absent from personal export. Session/status checks prevented new eligible sends, but retention handling was incomplete. | Delete native registrations inside the existing authenticated erasure batch. Export device metadata without FCM tokens, installation-proof hashes or session IDs. | Extended backend tests verify credential redaction, confirmation requirements, own-device removal and preservation of another account's device. |
| R6 · P1 | Browser push could display payload-supplied private text and navigate to payload-supplied URLs. Android already used a safer generic inbox hint. | Browser push now uses generic CEA text and a fixed same-origin authenticated inbox destination. | Service-worker push/click tests. |
| R7 · P1 | Privacy page did not describe the new native notification identifiers or exported-file behaviour. | Add technical disclosure of optional Firebase/account binding, disable/offline-removal behaviour, public offline lessons and user-controlled exports. | Source review and changed-route lint. This is not legal sign-off. |

These are branch changes, **not a claim that this pass has been deployed to the website or Worker**. Deploy the updated backend before publishing frontend privacy/recovery changes that depend on it. Existing installed web workers need a successful update/activation to retire legacy caches.

## What should remain protected

- Backend RBAC and ownership checks, MFA, session revocation and payment-provider verification.
- No silent production mock fallback when API configuration is missing.
- No automatic retry of ordinary payment/application/message writes on transient failures.
- Private query-cache clearing on completed sign-in/account switching/sign-out.
- Opt-in native notifications, generic payloads, exact-origin requests and private installation-proof storage.
- Public-only offline lessons. Do not turn private workspaces into an unrestricted offline cache.
- Explicit deployment revision verification; a healthy old deployment is not proof a new deployment succeeded.

## Prioritised improvement programme

### Gate 1 — Trust and first-use clarity

**Owners:** product/UX, security, frontend/backend and QA.

- Deploy and browser-verify R1–R7, including upgrading an existing service worker and inspecting Cache Storage after sign-in/sign-out/account switching.
- On a fresh Android installation, establish that a learner can distinguish browsing, account creation, course application, enrolment and payment. Do not require a Google/Firebase account.
- Exercise password sign-in, password reset, magic-link delivery, expired links, MFA, expiry/re-entry and account switching. Verify email deliverability rather than relying on success-shaped API responses.
- Validate native notification registration, foreground/background receipt, tap, quiet hours, disable, offline removal and token replacement on a physical device. Server credential installation is not delivery proof.
- Perform account export/deletion acceptance with an expressly designated disposable account; preserve required financial records and the last-admin safeguard.

**Exit:** no blocking ambiguity or privacy leak in the first-user journey; failed steps give a clear next action; no secrets/private responses remain in unintended shared storage.

### Gate 2 — Learning outcomes and essential academy operations

**Owners:** learning designer, instructors, learner support, admissions and finance.

| Audience | Journey to prove | Completion evidence |
|---|---|---|
| New learner/applicant | Find an appropriate course → understand actual fees/schedule → apply → recover status | Correct recorded application, clear next step and recovery after interruption; no invented fee or admission promise. |
| Enrolled learner | Find today's work → open lesson → submit task → see feedback → get help | Submission persists once, the instructor can retrieve it, feedback reaches the correct learner, progress has a defined meaning. |
| Instructor | Find own cohort → review submission → grade with a rubric → return feedback | Ownership enforced, understandable review queue, saved grade and learner-visible feedback. |
| Admissions/finance | Review application/payment evidence → accept or reject with reason → issue correct outcome | Provider/bank evidence, idempotent settlement, reconciliation and auditable decisions. A receipt alone is not proof of settlement. |
| Parent/guardian | Accept invitation → view only linked learner information | No cross-learner visibility; linkage/revocation behaves correctly. |
| Other staff, partners and leadership | Enter assigned workspace → perform its primary task → hand work to the next role | Actual persisted state and correct permissions, not just navigation and populated cards. |

Make practical competence the learning unit: explanation, demonstration, guided attempt, independent task, rubric and feedback. A lesson count is not an outcome measure. “Completed” must not mean merely opening a page. Review content with practising instructors and actual beginners before promising employment or proficiency outcomes.

Do not attempt all role workspaces at once. Prioritise the roles used by real academy operations, then maintain an acceptance matrix for every supported role and cross-role handoff.

### Gate 3 — Low-data usability, accessibility and performance

**Owners:** mobile/frontend, accessibility QA and product research.

- Run a moderated pilot with 5–8 representative beginners plus staff representatives. Record where help is needed; do not interpret this small sample as statistically conclusive.
- Test a low-end Android device, larger text, TalkBack, keyboard-only web use, 200% zoom, rotation, slow connectivity and interrupted requests. Audit entire tasks, not isolated controls.
- Measure first usable screen, task completion time, network transfer and memory use before optimising. Keep public lesson access useful when offline; describe online-only actions plainly.
- Candidate performance targets (not measured results): p75 LCP ≤2.5 s, INP ≤200 ms and CLS ≤0.1 on representative web traffic. Set a separate low-end-phone task budget after measurement.
- Simplify navigation by current job/task and progressive disclosure; the role menu alone should not be the onboarding system. Explain empty states with the next meaningful action rather than filling them with demo figures.

### Gate 4 — Operational reliability and observability

**Owners:** backend, operations, support and finance.

- Verify registered Cloudflare schedules and recent job runs. A `CRON_SCHEDULE` source map, or a version deployment that preserves triggers, does not prove reconciliation/reminders are actually running.
- Verify a real backup/restore procedure against an isolated restore target. A test that queues a restore is not evidence the data can be recovered.
- Establish monitored health, error rates, reconciliation backlog, email failures and support escalation with named owners. Include a rollback procedure and migration compatibility checks.
- Connect automatic class/message notifications only through an audited, bounded event path with deduplication, preferences and retry/backoff. Do not turn successful self-tests into an uncontrolled broadcast.
- Define data retention, deletion boundaries, access-review cadence and incident handling. Review the privacy disclosures and store Data Safety answers against actual SDK/network behaviour with qualified reviewers.

### Gate 5 — Engineering and distribution

**Owners:** engineering lead, release manager and QA.

The full-tree ESLint scan during this pass reported **1,735 errors and 18 warnings across 1,033 examined files**. Breakdown: 1,715 Prettier findings, 18 explicit-`any` errors, one unnecessary escape, one triple-slash reference error and 18 refresh-export warnings. This is a diagnostic snapshot, not 1,735 security vulnerabilities. Generated tuition output and curriculum files contribute substantially to formatting noise.

- Fix generator formatting at its source; separate a reviewed formatting-only change from behavioural changes. Resolve type-policy errors with real types rather than disabling rules.
- Keep critical auth-route lint and new regression tests blocking now; make whole-tree lint blocking after the baseline is genuinely clean. Do not label overall CI green as lint-clean while a non-blocking job fails.
- Finish release signing, real certificate App Links, account-deletion entry points, store listing/screenshots, support contact, current target-SDK and billing-policy review. No debug APK should be advertised as the production release.
- Keep production-mode configuration and test fixtures distinguishable. Maintain read-only production smoke checks and local simulated write suites; production use does not require staging or permission to reset data.

## Product measures to establish

Baseline these before setting growth claims:
- First-time users completing sign-in/application without assistance.
- Time to find today's learning task and successfully submit it.
- Instructor feedback turnaround and learner response to that feedback.
- Recovery rate after interrupted applications, uploads and payment handoffs.
- Duplicate submissions/settlements, failed receipt recovery and incorrect role visibility.
- Learning-task performance against rubrics—not just page views or lesson-open counts.
- Support requests per completed journey and recurring confusion themes.

Use aggregated, privacy-reviewed instrumentation. The current `src/lib/analytics.ts` queues/logs page events; it is not a demonstrated production outcome dashboard. Do not put email addresses, payment references, authentication tokens or private-message bodies into analytics.

## Verification record for this pass

- Frontend typecheck: passed locally.
- Changed auth/privacy routes: targeted ESLint passed locally.
- Service-worker handler tests: 6 passed locally.
- Backend typecheck: passed locally.
- Account operations + native registration/delivery suites: 42 tests passed locally.
- New isolated browser regressions cover password controls, truthful email recovery and role guidance; CI results are recorded on PR #31 after the run completes.
- Whole-tree lint: failed with the diagnostic totals above; not hidden or weakened.

No benchmark score, legal compliance claim, full-role acceptance claim or real-user success rate is asserted here.
