# CEA: audit response and enquiry-to-learning implementation plan

- **Date:** 17 October 2026
- **Status:** Proposed plan, based on repository inspection. The owner-confirmed address correction has been applied in a follow-up; the remaining roadmap is not implemented.
- **Baseline:** `4e2768716cfa097c229a58751babcdf7930525b7` on `arena/2e6e1e57-lumina-studio`.

## Recommendation

**Keep the platform. Make one truthful, reliable course-to-learner journey work before expanding it.**

### Solo-founder launch constraint — owner clarification

The owner has confirmed that CEA is a startup run by one person, with modest pricing and business protection as priorities. Use [the solo-founder launch plan](CEA_SOLO_FOUNDER_LAUNCH_PLAN.md) as the current first-release scope: one proven course/cohort, a simple owner worklist, transparent group-course pricing and limited, sustainable support commitments. Responsibilities below do not imply hiring separate departments. The narrower scope does not waive payment, privacy or teaching-quality safeguards.

The companion plan proposes commercial defaults for approval; it does not change public prices, refunds, payment rules or existing agreements. Cost and capacity information must be collected before declaring an offer sustainable.

CEA already has a practical catalogue, published teaching material, an application form, payment handling, cohort records and an LMS. The next project should connect and harden these pieces, not replace them with another website, CRM or learning platform.

There are two separate tests of success:

1. **Independent quality:** Are the academy's offers, teaching promises, policies, records and interfaces accurate, understandable, accessible and safe?
2. **Your business objective:** Can a suitable prospect choose a course, secure an available place, pay, recover their application and enter the correct learning workspace without a routine WhatsApp conversation?

WhatsApp should remain available. Removing it or making people spend longer on the site is not the objective. Reducing uncertainty and avoidable staff intervention is.

### Scope and evidence limits

This review inspected source, schemas, configuration and existing tests. It did **not** revisit the production website, query production D1, inspect analytics, render every screen, run application tests, submit a payment or use a real learner account. “Present in code” does not mean deployed, configured or proven in production. Findings below distinguish source evidence from proposed changes and business decisions.

A static source comparison found **22 catalogue courses**, matching fee and week values in the backend registration registry. That registry contains **27 offers**, while the current application UI admits only the **13 core short courses**. The checked-in LMS template contains three different course slugs, none shared with those 22 catalogue slugs. These are repository findings, not a count of production offerings or learners.

Older documents remain useful context, especially [the earlier redesign report](../docs/academy-site-redesign-report.md), [enrolment automation](../docs/enrollment-automation.md), [automation reconciliation](../docs/automation-package-reconciliation.md), [search indexing review](../docs/search-console-indexing-2026-10.md) and [tutorial production standard](../docs/tutorial-master-prompt.md). Their “live” or “complete” labels are not substitutes for acceptance tests. This plan updates delivery priorities; it does not silently revoke existing student agreements or previously recorded business decisions.

---

# Part A — Independent critique, before optimising conversion

## 1. Reconcile the supplied audit with this checkout

| Audit concern             | What the repository actually shows                                                                                                                                                       | Decision                                                                                                                                                                     |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Obsolete `/pricing` offer | `src/routes/pricing.tsx` redirects to `/classes`; `vercel.json` has a permanent redirect, imported by `next.config.mjs`.                                                                 | Already addressed in source. Verify the deployed redirect, canonical destination and search recrawl; do not rebuild an obsolete pricing page.                                |
| Address inconsistency     | Owner clarified on 17 October: the utility bills use **24 Ebony Road**; some signboards say **26**, explaining the confusion. This supersedes the earlier `24/26` decision.              | Use **24 Ebony Road, off Rumuola Road, Port Harcourt** in official contact details. Repository copy is corrected; external listings/signboards still need an operator check. |
| Different course fees     | The 22 checked catalogue fee/week pairs match the API registry today, but are maintained separately.                                                                                     | Prevent future drift rather than claiming current numerical mismatches. Give each approved offer one versioned source.                                                       |
| Course selection          | A catalogue-backed `CourseFinder` already appears on the homepage and catalogue. `/programs/compare` is only a redirect.                                                                 | Reuse the finder; add an actual two/three-course comparison, not another quiz.                                                                                               |
| Unclear availability      | Cohort CRUD, upcoming-date queries and ICS exist. The application distinguishes a real course-specific date from a preference.                                                           | Keep those improvements. Add actual cohort selection, placement and capacity enforcement; a displayed date is not a reserved place.                                          |
| Application and payments  | A five-step registration form, Paystack initialization/verification, signed webhooks, transfer-review queue and printable receipts exist.                                                | Harden their shared state and recovery behaviour, rather than building another payment form.                                                                                 |
| Free lessons              | Course/session resolution distinguishes authored lectures from outlines and calculates publication counts.                                                                               | Derive counts from the resolved catalogue. Do not copy the audit's “210 lessons” figure without reconciling what it counts.                                                  |
| Learner access            | Auth, learning, assignments, progress and certificate routes exist. Reviewed payment/stage handlers do not create the corresponding learner enrolment.                                   | Treat payment-to-learning integration as unfinished until an end-to-end test proves it.                                                                                      |
| Bounce and conversion     | GA4 initialization is consent-gated, Vercel Analytics is mounted, and the internal `track()` helper queues/logs events. No public funnel event calls were found in the reviewed journey. | Instrument meaningful outcomes. Neither current bounce rate nor its cause has been established here.                                                                         |

## 2. Independent verdict

The public offer is more concrete than the old studio-style positioning: practical outputs, visible fees, beginner guidance, a named centre and teaching material. These are assets worth keeping.

**The biggest independent weakness is that a clearly described public offer is not yet backed by one consistent set of operational rules.** Policy conflicts, separate admission records, permissive course-access behaviour and inconsistent payment-state interpretation matter even if conversion is not a goal.

The platform's breadth is also a maintenance risk. Numerous role workspaces do not prove that a new Microsoft Office learner receives the right timetable and assignment. Prioritise the public journey plus admissions, finance, instructor and learner workflows. Do not redesign every workspace in this project.

### Source-backed release risks

Priority **P0** means resolve before opening or expanding unattended paid enrolment. These are not claims that a production incident has occurred.

| ID                                              | Evidence and consequence                                                                                                                                                                                                                                                                                                                                                      | Required correction / proof                                                                                                                                                                                                                                                                   |
| ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| R1 · P0 · Conflicting terms                     | `src/components/enrollment/payment-step.tsx` promises deposits refundable up to seven days before start and one transfer. `src/routes/terms.tsx` uses fourteen days, a ₦15,000 administration fee and different refund conditions. `/payment` and `/refunds` concern shop orders; `/pay` concerns tuition.                                                                    | Owner/finance-approved, separately scoped tuition and shop policies. The course page, form, accepted terms, email and receipt must reference the same policy version. Review affordability and fairness of deductions against short-course fees; do not choose a new policy without approval. |
| R2 · P0 · Unsupported purchases                 | The public form restricts applicants to 13 courses, but `PROGRAMS` in `backend/src/routes/enrollments.ts` accepts 27. Payment initialization does not require an assigned cohort or an offer eligible for checkout.                                                                                                                                                           | Enforce publication, saleability, schedule and placement rules on the server. Unscheduled courses collect interest without requesting payment. Preserve legacy agreements; do not infer that longer offerings have been cancelled.                                                            |
| R3 · P0 · Payment UI can contradict the result  | `SuccessScreen.checkPayment()` contains a latent false-success branch: `enrollmentPaymentStatus !== "unpaid"` also includes `failed`. The current `/apply` caller does not pass its verification prop, so that branch is not a reproduced production failure. The active return page, `src/routes/apply/pay.tsx`, checks transaction success before distinguishing a deposit. | A shared, explicit payment-state presenter. Test failed, unknown, pending, deposit, fully paid and refunded states separately. No failure may display “Payment confirmed”; a paid transaction must not imply the whole fee is paid.                                                           |
| R4 · P0 · Balance and retry accounting          | `expectedAmount()` accepts deposit/full and returns the original full fee, not an explicit remaining-balance amount. `markPayment()` uses a maximum for non-full payments instead of summing distinct confirmed payments. Receipt allocation and payment/event updates span separate operations.                                                                              | A reconciled payment ledger; explicit remaining-balance checkout; idempotent, atomic financial transitions; concurrency and out-of-order-event tests. Preserve real money received, including excess payments, rather than hiding it with display arithmetic.                                 |
| R5 · P0 · Payment and learning are separate     | `registrations`, legacy `applications`, and LMS `enrollments` are distinct. Reviewed payment confirmation and stage-change handlers do not provision learner access. `gen-lms-seed.ts` uses `src/data/learning.ts`, not the practical academy curriculum.                                                                                                                     | Map each sellable offer to the correct curriculum, cohort and learner entitlement. Confirmed payment plus valid placement and approved access rules must produce access or a visible, assigned exception.                                                                                     |
| R6 · P0 · A login is not an entitlement         | `backend/src/routes/courses.ts` allows student self-enrolment and lesson completion without checking a paid registration or cohort. Course responses include module content with UI status labels.                                                                                                                                                                            | Define free versus paid capabilities. Keep intentionally free notes free, but authorise paid classes, private materials, submissions, feedback and certificates server-side. A “locked” label is not access control.                                                                          |
| R7 · P0 · Private records and staff permissions | The public receipt endpoint returns learner name/email by application reference. `noindex` is already present on the receipt page, but is not authentication. RBAC allows admissions/finance to list registrations and admissions to update them, but the handlers impose an admin-only guard.                                                                                | Verified applicant access for personal records, private/no-store responses and redacted public projections. Align route and handler permissions; test both authorised staff workflows and cross-user denial.                                                                                  |
| R8 · P1 · Multiple sources of status            | Registration creation mirrors into `applications`. The legacy application update changes only that table; the registration decline branch does not mirror its change. Form drafts live in component state.                                                                                                                                                                    | One transition service and a single applicant-status projection. Add safe resume and idempotent submission so reloads, retries and staff updates cannot create contradictory records.                                                                                                         |
| R9 · P1 · Learning/QA evidence can mislead      | The learning hub hardcodes labels such as “Cohort 15 · Term 2” and progress deltas. `e2e/public.spec.ts` expects an older application flow; `e2e/smoke.spec.ts` still matches apex-domain sitemap URLs. CI has no browser-journey job.                                                                                                                                        | Remove invented learner facts. Update tests to the present flow and run the real integration in isolated test infrastructure. Existing tests are useful, but not proof of this funnel.                                                                                                        |

Additional targeted checks: use actual session minutes rather than a separate weeks-times-two-hours formula in course structured data; review equipment language across the catalogue and application; test missing payment-provider configuration so production never offers a fake checkout URL. These are part of stabilisation, not grounds for a wholesale redesign.

## 3. Multidisciplinary review programme

One person may cover several roles. These are responsibilities and concrete verification tasks, not a recommendation to hire a large team.

| Responsibility                         | Keep / challenge                                                                                                                             | Evidence needed for approval                                                                                                                                          |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Brand and product strategy             | Keep practical digital skills as the primary offer. Separate individual training, institutional services, free learning and future products. | Five unfamiliar visitors can explain what CEA sells today after a short homepage exposure. Record confusion, not a fabricated score.                                  |
| UX research / information architecture | Keep the finder. Test beginner versus Office distinctions, comparison and schedule selection.                                                | Unassisted tasks: choose a course, explain its total cost/equipment/outcome, find a real start option, apply and return later.                                        |
| Creative direction / UI                | Keep CEA's existing components and campus/founder imagery. Prefer genuine learner work and readable decision summaries over more effects.    | Rendered desktop/mobile review of hierarchy, typography, identity and photography permissions. No pixel-level pass/fail is claimed here.                              |
| Education / curriculum                 | Keep published practice tasks, demonstrations and rubrics. Check that promised independence is achievable in the stated hours.               | Instructor delivers a pilot from the page; learner demonstrates the final project; outline-only lessons remain labelled.                                              |
| Admissions / service design            | Replace routine screening/interview stages for beginner courses with necessary eligibility and placement only.                               | New, returning, waitlisted, no-laptop and abandoned applicants receive an accurate status and next action.                                                            |
| Finance / commercial operations        | Resolve R1–R4 before optimising checkout. Distinguish tuition, deposits and shop purchases.                                                  | Ledger, bank/provider records, receipts, balances and refund decisions reconcile; finance can handle exceptions without a developer.                                  |
| SEO / editorial                        | Preserve existing URLs and good redirects. Retire unsupported promises across copy, email templates, assistant knowledge and metadata.       | Indexable URL inventory, canonical/redirect checks, sitemap checks and content ownership; inspect production Search Console separately.                               |
| Accessibility                          | Existing skip navigation and reduced-motion handling are useful foundations, not WCAG certification.                                         | WCAG 2.2 AA review: keyboard, screen reader, labelled errors, focus after step changes, selection semantics, contrast, zoom/reflow and overlapping floating controls. |
| Frontend / backend engineering         | Keep Next.js, the Worker API, D1, query hooks and server RBAC. Challenge disconnected state and optimistic success copy.                     | Contract, integration and browser tests for every transition, including interruption and recovery.                                                                    |
| Security / privacy / legal             | Check ownership, verified links, consent records, retention and minors' enrolment. Do not assume an account role proves course access.       | Threat model, negative access tests and a qualified Nigerian privacy/consumer-policy review. No compliance certification is implied.                                  |
| Performance / QA                       | Test actual devices and constrained networks, not only desktop localhost.                                                                    | Android-class mobile testing, slow/interrupted network recovery, JS/image budget and field Web Vitals when enough data exists.                                        |
| Analytics / operations                 | Separate helpful WhatsApp conversations from missing-information enquiries and genuine abandonment.                                          | Reconciled funnel events, enquiry categories, payment-to-access timing and a named person for each exception queue.                                                   |

---

# Part B — Meet the enquiry → payment → LMS objective

## 4. Target visitor journey

```text
Search / referral / WhatsApp link / direct visit
  → Courses + existing beginner finder + comparison
  → Complete course decision page + sample lesson
  → Choose a published cohort / request an available placement
  → Minimal application + secure reference/resume access
  → Valid offer + real seat allocation/hold + accepted terms
  → Verified payment (or authorised finance review)
  → Learner account linked + correct course entitlement
  → Next class / lesson / assignment / feedback
  → Assessed completion + eligible certificate + next course

No confirmed intake → Register interest → availability notification → resume
Needs advice        → Optional contextual WhatsApp/contact → return to same journey
```

For a genuinely scheduled course that needs no manual eligibility review, the offer and place can be issued automatically. For an unscheduled or specialist course, display the review/waitlist state honestly. Do not collect money merely to find out whether the course can run.

### Make the state explicit

These are **proposed domain states**, not names already supported by the current database. Introduce them through migrations and compatibility mapping; do not force every concern into the existing `stage` field.

| Dimension       | Proposed states                                                                                  | Meaning                                                                                                        |
| --------------- | ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| Application     | draft, submitted, needs_information, eligible, declined, cancelled                               | Request and eligibility, not payment or access.                                                                |
| Placement       | awaiting_schedule, waitlisted, held, confirmed, expired, cancelled                               | Exact cohort, capacity and any hold expiry.                                                                    |
| Payment         | unpaid, pending, pending_review, part_paid, paid, failed, partially_refunded, refunded, disputed | Derived from verified transactions and approved reversals. A failed attempt does not erase an earlier payment. |
| Learning access | not_ready, pending_activation, active, suspended, completed                                      | Entitlement to defined services/materials, not merely existence of a login.                                    |

A single status response should give the applicant a plain-language headline, reason, amount due, confirmed schedule if any, expected response window and one primary action. Examples: “Choose a timetable”, “Awaiting admissions”, “Transfer under review”, “Pay your remaining balance”, “Access is being prepared”, “Continue learning”.

**Access rule:** verified learner identity + valid placement + the payment threshold in the accepted policy + a valid curriculum mapping. Whether a deposit qualifies is an owner decision. Email failure must not undo payment or conceal active access.

## 5. Make the site adaptable instead of repeatedly rewriting it

### Authoritative information boundaries

| Information                          | Proposed authority                                                                           | Consumers / safeguards                                                                                                                                                                                    |
| ------------------------------------ | -------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Academy identity and visitor details | One business-profile configuration                                                           | Footer, contact, SEO, receipts, emails and calendar locations. Use the owner-confirmed **24 Ebony Road** address.                                                                                         |
| Course content and lesson quality    | Existing `src/data/academy/` with review metadata                                            | Public course/lesson pages and published LMS curriculum versions. Keep authored lessons, not demo template substitutions.                                                                                 |
| Commercial offer                     | One framework-neutral offer manifest, imported or generated for frontend and Worker          | Stable offer ID, course ID, distinct tier, fee, currency, duration, mode/equipment inclusions, payment/policy version, publication and checkout eligibility. No hand-maintained duplicate `PROGRAMS` map. |
| Intake and availability              | Existing D1 `cohorts`, extended with real sessions/placement records                         | Public availability, selected cohort, admissions roster, capacity, calendar and learner dashboard. Generic rolling markers are never confirmed dates.                                                     |
| Applicant request                    | Existing `registrations` as the canonical current-flow record                                | Explicit account/offer/cohort links, immutable accepted quote, consent versions and a status projection. Legacy `applications` becomes an adapter, not a second independently editable truth.             |
| Money                                | Existing `registration_payments`, proofs and receipts, strengthened into a reconciled ledger | Unique provider transactions, approved transfer decisions, reversals and derived totals. Shop payments remain a separate commercial flow.                                                                 |
| Learning entitlement                 | Existing LMS `enrollments`, extended/mapped to registration and cohort                       | Access, timetable, assignments, progress and certification all reference the same learner/course relationship.                                                                                            |
| Notifications and support            | Durable event/outbox records plus existing jobs/operations UI                                | Retry delivery, show failures, suppress obsolete reminders and give staff actionable exceptions. Sheets, if retained, is a read-only export.                                                              |

Keep current stored naira amounts compatible during migration; convert to integer kobo at the provider boundary in one tested place. Never trust a fee or entitlement submitted by the browser. If a price/policy changes while someone applies, show the new quote and request acceptance instead of silently charging it. Preserve accepted historic quotes for existing applicants.

The older reconciliation document records a short/crash versus fuller-package distinction. If both still operate, give them distinct offer identities and honest outcomes. Do not combine introductory fees with professional-package promises. A future/planned offer may be described as such but must not be purchasable.

### Shared presentation, not copied business rules

Create reusable course-decision summary, availability, equipment, fee-breakdown and journey-status components. Share validation/contracts and state interpretation between the frontend and API. Extend `src/routes/` and the route generator where needed; do not edit ignored generated pages. Extend `backend/src/lib/rbac.ts` for new endpoints and test handler permissions as well.

A full CMS is not a prerequisite. Start with the shared manifest plus existing cohort administration. Add a simple offer editor later only if the update workload justifies it.

## 6. Page-level changes

### Homepage and navigation

- Lead with practical digital-skills training and “Find a course”. Retain the current finder.
- Give free learning a clear route to existing class-note URLs; label institutional training and IT services separately. Avoid a broad URL rename or migration.
- Keep learner sign-in and application tracking easy to find.
- Give time-sensitive opportunities an owner and expiry/review date. Do not let a promotional banner imply enrolment is open indefinitely.
- Use permissioned photos and actual project examples; no invented testimonials, employment outcomes or operational activity.

### Catalogue and comparison

- Filter by goal, starting level, fee range, available delivery mode and real intake status.
- Compare up to three courses: who it suits, prerequisites, full fee, contact hours/calendar weeks, equipment, final project, next intake and primary action.
- Make core, rotating/specialist and planned offers unambiguous. Keep existing course slugs.
- A recommended course need not be immediately available; show that before asking for details.

### Every course page: a complete decision

1. Outcome, suitable learner and prerequisites.
2. Tuition, additional required costs, included equipment/software and independent practice access. Explicitly distinguish “available in class” from “available for homework”.
3. Calendar weeks, actual contact minutes/hours, session rhythm and realistic study time.
4. Current intake: dates, WAT timetable, location/mode and availability, or “Next intake to be confirmed”. Do not show estimated seats as facts.
5. Curriculum, a real sample lesson and a representative final project with assessment/certificate criteria.
6. Approved deposit/balance/refund/transfer conditions, linked to the tuition policy rather than shop returns.
7. One primary action: apply for a scheduled course, join a waitlist or register interest. WhatsApp is secondary and course-specific.

Use progressive disclosure: a short decision summary first, detail below. “All the information” should not become a wall of text or a form asking everything at once.

### Application, payment and return visits

- Preselect the originating course and offer; retain the chosen cohort.
- Initially collect only necessary contact, placement, prerequisite/equipment and consent information. Move demographic/background questions to optional onboarding unless required for eligibility.
- Use real cohort slots; label unmatched day/time/mode requests as preferences.
- Support a short-lived, explicit draft-save option appropriate for shared computers and a verified resume link after submission. No payment credentials, perpetual PII drafts or sensitive details in URLs.
- Validate access, quote, eligibility and capacity again server-side at checkout. Use idempotency keys for form submission and payment-session creation.
- Keep pending/failed states recoverable. Do not ask a learner to pay again just because the callback or email failed.
- The return/status page must offer the actual remaining balance, receipt and next step without a WhatsApp handoff.

### Learner dashboard and teaching

Keep the existing LMS shell and routes; make the primary area task-oriented:

- **Next class:** confirmed day/time/location or online access; truthful unscheduled state.
- **Continue learning:** correct course/version and next lesson.
- **Work to submit:** assignment, due date, upload state and instructor feedback.
- **My course and payments:** enrolment status, receipts, balance and support.
- **Completion:** rubric progress and certificate eligibility, not an automatic certificate for page clicks.

Remove static cohorts, comparative progress deltas and other demo facts from live screens. Reconcile academy lesson IDs with LMS IDs without resetting existing learner progress. Public self-study notes remain accessible; the paid value is structured teaching, practice arrangements, feedback, assessment and the services actually promised.

---

## 7. Delivery backlog and release gates

Sequence by evidence, not a fixed launch date. Engineering estimates should follow the policy decisions and a staging data inventory. Discovery/UI and curriculum work can run alongside integration; activation still depends on approved offers, safe payment handling and valid placement.

| Phase / package                             | Priority and owner                                                              | Main work and existing touchpoints                                                                                                                                                                                                                                                | Dependency / exit gate                                                                                                                                                        |
| ------------------------------------------- | ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1A — Stabilise facts**                    | P0 · owner + admissions + finance/editor                                        | Approve offer list, equipment, timetable, access threshold and tuition policies. Centralise shared offer/profile data. Update `catalog.ts`, enrollment metadata/API registry, admissions/terms/payment copy, email and assistant knowledge. Verify existing redirects/canonicals. | No conflicting policy/fee/equipment claims in any sellable offer. Archived agreements preserved.                                                                              |
| **1B — Stabilise transactions and privacy** | P0 · backend + frontend + finance/security                                      | R3/R4/R7 fixes in `backend/src/routes/enrollments.ts`, `lib/paystack.ts`, `lib/webhooks.ts`, payment UI and RBAC. Add regression tests before refactoring. Gate unready checkout/provider configurations server-side.                                                             | Failed payments cannot look paid; balances/receipts reconcile; duplicates and concurrent confirmations have one financial effect; records are private.                        |
| **2 — Improve decisions and measurement**   | P1 · UX/editor + frontend + analytics                                           | Extend finder/catalogue and `classes.$courseSlug.index.tsx`; comparison, equipment summaries and live availability. Instrument public journey and WhatsApp entry points through the existing analytics/consent modules.                                                           | Beginner usability tasks succeed without staff help; no invented schedules; test events contain no private content. Start the baseline here, not after launch.                |
| **3A — Reliable application and placement** | P0 for unattended enrolment · backend + admissions + frontend                   | Extend `cohorts`, `registrations` and application/status APIs; real selections, capacity holds, quote snapshots, secure resume, idempotency and one transition service. Update `src/components/enrollment/*`, query/API types and admissions screens.                             | Two applicants cannot take the last seat; a retry cannot create a second application; staff/public states agree. No intake means no payment request.                          |
| **3B — Payment-to-learning bridge**         | P0 · backend + QA + finance/admissions                                          | Link registration → verified user → curriculum → cohort → LMS enrolment. Add durable activation/notification work, retries and an operations exception queue. Reuse scheduled jobs and `/app/admin/operations`; do not add a second CRM.                                          | One confirmed transaction/placement produces one correct entitlement; failure is visible and recoverable; absent email does not block access.                                 |
| **4 — Deliver the pilot**                   | P1, required for the promised learning service · instructor + LMS engineer + QA | Map actual academy lessons into the LMS; correct `courses.ts`, learning hub, assignments, timetable and certificate criteria. Remove demo metrics. Update browser tests and CI.                                                                                                   | One real, owner-approved course works from discovery through a submitted/graded assignment and eligible certificate in staging. Complete a supervised pilot before expanding. |
| **5 — Operate and optimise**                | Ongoing · owner + operations + analytics                                        | Review enquiry categories, funnel cohorts, payment/access delays, learner completion and content freshness. Improve the largest observed friction first.                                                                                                                          | Regular evidence-led review, functioning alerts and measurable reductions in routine support effort without harming assisted enrolments.                                      |

### Smallest useful release

Pilot **one course and one real cohort**, not all 27 API offers or every role workspace. Microsoft Office is a sensible candidate only if its next cohort, equipment and instructor are actually confirmed. Use its real fee and approved payment policy, with both the supported online and finance-reviewed transfer journeys tested.

Include: a complete decision page; valid placement; recoverable application; correct payment/balance/receipt; secure applicant access; verified learner activation; first lesson; one assignment/feedback workflow; and a staff exception queue. Other legitimate offerings may remain available for interest or staff-assisted placement with honest labels. Do not regress existing students or the shop.

Defer: a new visual identity, advanced animation, additional marketing automation tools, predictive recommendations, referral rewards and unrelated role-dashboard redesigns.

## 8. Engineering acceptance tests

Use existing Vitest/Workers and Playwright infrastructure. Test adapters are not proof of real provider configuration; complete a separate staging test with Paystack test credentials and transactional email before launch.

| Area                   | Required scenarios and invariants                                                                                                                                                                                                                                                                                                                                                             |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Content contract       | All published offer IDs, fees, currency, duration, equipment, policy version and saleability match UI/API/email/metadata. Unknown or unpublished offers cannot be purchased. Outline counts are not advertised as completed lectures.                                                                                                                                                         |
| Discovery              | New computer user chooses a suitable path, compares it with Office, finds total cost and practice requirements, and identifies a real intake without assistance. Specialist/planned states never impersonate open enrolment.                                                                                                                                                                  |
| Application            | Double-click, retry after response loss, reload, expiry, another device, changed price, cancelled cohort, stale capacity and invalid input. Stable idempotency key returns the original result; a different request with that key conflicts safely.                                                                                                                                           |
| Placement              | Concurrent requests for the final place; expired holds; timetable changes; incoming payment after hold expiry. Late funds go to an assigned placement/refund exception, not an invented seat.                                                                                                                                                                                                 |
| Payments               | Full/deposit/balance; rejected or mismatched transfer; duplicate proof approval; missing/invalid webhook signature; wrong amount/currency/reference; concurrent webhook/verification/job; late failure after success; interrupted processing; provider outage; missing keys; refund/dispute. One ledger effect per transaction, stable receipts, no silent double charge and no fake success. |
| Recovery               | A webhook recorded before processing fails must remain retryable. Scheduled reconciliation, activation and email retries must recover unfinished work without duplicate receipts/access. Test a crashed handler between each important write.                                                                                                                                                 |
| Permissions            | Wrong student/reference, expired resume token, unauthenticated personal record access, staff role conflicts and disabled accounts. Admissions manages placement; finance verifies money; neither gets unrelated powers. Non-enrolled callers cannot access paid capabilities via direct API requests.                                                                                         |
| Activation / learning  | New user, existing verified user, unverified email, existing non-student account, multiple courses, partial-payment eligibility, cancelled placement and refund/access changes. Correct course/timetable only; retained progress; graded work and approved criteria govern certificates.                                                                                                      |
| Accessibility / mobile | Keyboard and screen-reader journey; focus/error announcements; semantic options; reduced motion; 200% text zoom and narrow reflow; touch targets; slow/offline recovery; floating WhatsApp/cookie controls do not cover payment or submit actions.                                                                                                                                            |
| Measurement            | Event contract and consent tests; deduplication; correct attempt versus applicant counts; no names, email, phones, form answers, chat text, payment/access tokens or raw reference URLs sent to third parties.                                                                                                                                                                                |
| Deployment / SEO       | Redirects at both routing layers; canonical/sitemap agreement; no indexing of private receipts/status; missing integrations fail safely; production cannot silently select mocks; scheduled-job heartbeat and payment/access alerts actually fire.                                                                                                                                            |

**Test safety:** `playwright.config.ts` and `e2e/helpers.ts` currently default to production hosts, and some tests submit forms. Change the write-test defaults to isolated local/staging services and require explicit opt-in for production probes. Do not run those suites against live students or live money. A public-page read-only production smoke test is a separate operation.

For implementation PRs, require frontend `npm run typecheck`, `npm run build`, scoped lint, backend `npm run typecheck` and tests, plus the updated browser integration suite in CI. A mocked UI walkthrough is not the release gate for payment-to-LMS integration.

### Migration and rollout safety

1. Inventory and back up production records; identify existing offers, paid applicants, orphaned accounts and legitimate learning progress. Do not apply demo seeds to production.
2. Add schema-only migrations and new columns/relations before switching writers. Add uniqueness/FKs where appropriate after validating existing data.
3. Backfill explicit mappings; quarantine ambiguous course/account matches for review. Do not auto-enrol by similar title or alter a user's staff role.
4. Route both legacy/current writes through the new transition service; compare projections and financial totals before retiring a writer.
5. Pilot behind a course/cohort feature flag. Reconcile opening balances, provider totals, learner access and notifications.
6. Rollback means disabling new automated checkout/activation and reverting compatible readers, not deleting payments or undoing already-earned access. Keep webhook reconciliation and staff recovery working.

---

## 9. Measurement that reflects the real business

Use a defined event contract, not raw page views or WhatsApp clicks labelled as completed enrolments.

| Event                                                                                   | Authority / definition                                                                                                                       |
| --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `course_view`, `course_compare`, `sample_lesson_open`                                   | Client; meaningful discovery actions with course ID and page template.                                                                       |
| `whatsapp_click`                                                                        | Client; link placement, course ID and optional predefined enquiry category. A click is not proof of a message or a sale.                     |
| `application_start`, `application_step_complete`                                        | Client; first meaningful input and validated progression, deduplicated per draft.                                                            |
| `application_submitted`, `placement_confirmed`                                          | Server; committed records, not button clicks.                                                                                                |
| `checkout_started`, `payment_pending`, `payment_failed`                                 | Server/payment attempt; distinguish provider error, abandonment and unknown status.                                                          |
| `payment_confirmed`                                                                     | Server; one verified ledger credit per provider transaction or approved transfer. Record amount/method separately from full-fee eligibility. |
| `access_eligible`, `learner_access_activated`                                           | Server; eligibility timestamp and committed entitlement timestamp.                                                                           |
| `first_learning_access`, `lesson_completed`, `assignment_submitted`, `course_completed` | Authorised learning records; separate first access from account creation and rubric completion from page consumption.                        |

Keep operational reconciliation in D1 even when optional analytics is declined. For external analytics, enforce consent where required, minimise data and redact private URLs/query strings across **all** configured analytics providers. An opaque identifier is pseudonymous, not automatically anonymous. Use a separate analytics correlation ID, never an applicant reference or a token that grants access. Join to identifiable records only in restricted first-party reporting. Marketing follow-up consent is separate from necessary application notices.

### Dashboard definitions

- **Application completion:** unique submitted applications / unique started drafts in a stated period, allowing a defined completion window.
- **Payment conversion:** unique eligible offers with the required confirmed payment / unique eligible offers; report deposits and full settlements separately. Track checkout-attempt success separately.
- **Activation reliability:** active entitlements / access-eligible registrations. Also report paid-but-not-placed cases, rather than excluding them from view.
- **Activation delay:** time from eligibility to access; separately show payment-to-access median and tail latency so placement delays remain visible.
- **Assisted conversion:** staff-confirmed WhatsApp leads linked with permission to subsequent applications/enrolments; do not infer it from outbound clicks.
- **Avoidable-question rate:** tagged routine-information enquiries / all tagged enquiries. Review missing, unclear and contradictory answers separately.
- **Learning outcomes:** first learning access, assignment submission, assessed completion, certificate eligibility and support minutes per learner.

Segment by course, mobile/desktop, discovery source, intake status and payment method. Separate free-lesson readership from purchase journeys and exclude test/mock/staff traffic. Use consistent denominators and applicant cohorts; small samples do not justify A/B-test conclusions.

Establish a baseline first. Then set conversion/support-time targets jointly with CEA. Technical correctness gates—no false payment success, no unauthorised access and no duplicated financial effects in the test suite—are release requirements, not invented growth targets.

## 10. Protect teaching time through operations

Automation reduces interruptions only if someone owns the exceptions. CEA's founder currently owns all of these responsibilities; group them into one worklist rather than assuming a staffed team. The solo-founder plan sets the proposed starting workload and service boundaries.

- **Admissions:** publish actual cohorts and device availability; handle waitlist/missing-information cases in scheduled review windows rather than continuous WhatsApp interruption.
- **Finance:** review transfers against bank/provider evidence; resolve mismatches, excess funds, refunds and disputes. Submission of a screenshot alone never confirms payment.
- **Instructor:** maintain lessons, assess work and approve completion under the published rubric.
- **Operations/owner:** monitor paid-but-unactivated records, failed jobs, notification delivery and stale offers. Give each exception an owner, due time, reason and safe retry action.
- **Editor/analytics:** review recurring question categories weekly and update the relevant authoritative content, not just another FAQ copy.

Response windows must match real staffing. Existing “within the hour” / “24 working hours” claims need approval. Clearly distinguish premises hours from admissions/finance support hours. Keep status available on the site while staff are teaching. Add support escalation for unresolved payments without exposing personal details in public logs.

**Ownership rule:** every sellable offer has an owner, last review, next review, policy version and publication status. Staff changing a cohort update one record; a cancelled/expired intake stops new checkout. Staff changing a fee publish a new version; existing accepted agreements remain auditable. Weekly question review and a recurring regression check make the site adaptable to future critiques.

## 11. Decisions needed from CEA

No fabricated prices, start dates, remaining seats, refund rules or outcomes should be introduced to complete the design.

1. **Available offers:** Which core, specialist and longer/full-package offers can actually be sold now? Which require review or interest-only status? Select the pilot course.
2. **Real delivery:** Approved cohort dates, days/times, mode, instructor, capacity, academy computer/software availability, and homework/practice arrangements per offer.
3. **Commercial policy:** Full fee and extras; approved deposit/balance schedule; access threshold; seat-hold terms; refund/transfer/cancellation/deferral treatment—including courses CEA cannot run. Resolve seven versus fourteen days and the administration fee with appropriate advice.
4. **Learning and identity:** What is free, what paid enrolment unlocks, assessment/certificate requirements, and the approved minors/guardian and applicant-account verification process.
5. **Operating capacity:** The founder approves seats, verifies transfers and handles access problems. Confirm weekly available time and realistic support windows; use one worklist and the solo-founder plan rather than assuming additional staff.

**Address decision — resolved 17 October 2026:** use **24 Ebony Road, off Rumuola Road, Port Harcourt, Rivers State, Nigeria**. The owner reports that this is the number on the utility bills; some signboards show **26 Ebony Road**. The earlier `24/26` convention is superseded. Official website copy, metadata, emails, receipts, calendar invites and reusable templates should use **24**. Check external listings and physical signage separately; those have not been changed from this repository.

### Immediate next implementation brief

Start with **Phase 1A and regression tests for R1–R7**. Correct payment-state/privacy issues and gate unsupported checkout before adding conversion features. Then deliver the one-course path through Phases 2–4. The milestone is not “new dashboard designed”; it is:

> A beginner can understand the course and real timetable, apply once, pay the correct amount, receive a private verifiable receipt, sign in to the correct course, submit work and see feedback—while staff handle only genuine exceptions.

## Review record for the original planning pass

- Inspected source, migration files, relevant existing tests and CI configuration.
- Compared all 22 catalogue fee/week pairs against the registration registry: no numerical mismatches found in the checked source.
- Confirmed the configured `/pricing` redirect and the separate LMS template slugs.
- No production requests, real payments, database mutations, application test runs, build or deployment performed.
- The original planning pass changed only this plan and its README documentation link.

### Address follow-up

The owner subsequently confirmed **24 Ebony Road**. The repository's public copy, structured data, transaction correspondence, calendar locations, assistant knowledge and mock equivalents have been updated to that number. This is an address-only correction, not implementation of the remaining funnel roadmap or a production deployment.

Verification for the address follow-up: frontend production build and typecheck, backend typecheck, scoped frontend lint and **71 backend suites / 818 tests** passed. Rendered contact/visit page descriptions and structured data were checked for the corrected number, and the runtime-source scan found no obsolete address. Browser regression assertions were added but not run because Chromium is not installed. The build's optional remote library refresh was unavailable and retained the existing catalogue. No production records, external listings or physical signboards were changed.

## Implementation follow-through

The owner subsequently authorised the conservative solo-founder implementation.
See the [implementation/release runbook](../docs/CEA_PROTECTED_TUITION_RUNBOOK.md)
for the implemented offer/payment/access protections, validation record,
manual financial exception boundary and outstanding real-world release gates.
The original audit analysis above is not evidence of a production deployment.
