# CEA: a modest, protected launch for a solo founder

- **Date:** 17 October 2026
- **Owner-confirmed constraints:** CEA is a startup, one person currently runs it, pricing should be modest, and the business needs protection.
- **Status:** Selected conservative operating model; implementation has been prepared in the repository following the owner’s “Do all that’s needed” authorisation. It is **not deployed or legally validated**. Existing fees are unchanged and no real intake/equipment/staffing facts have been invented. See the [implementation and launch-gate runbook](../docs/CEA_PROTECTED_TUITION_RUNBOOK.md) for what is implemented, what remains manual, and the checks required before paid launch.
- **Relationship to the audit:** This narrows the first release in [the audit-response plan](CEA_AUDIT_RESPONSE_2026-10-17.md). Its security, accounting and learning-quality requirements still apply; the number of products and workflows launched at once is reduced.

## The recommendation

**Build a small academy that is easy to understand and dependable to operate—not a large academy in miniature.**

Keep entry prices accessible, run a limited number of real cohorts, collect payment only against a deliverable offer, and give the owner one worklist. Protect cash and teaching time through scope, capacity, clear agreements and reliable records rather than large penalties or claims of round-the-clock service.

The roles in the earlier audit describe responsibilities, not people CEA must hire. For now, the founder handles teaching, admissions and finance, with software handling repetitive recordkeeping.

## 1. Sell less at once, not less honestly

### Recommended launch shape

- Prove **one course and one confirmed cohort** from application to first assignment. Add a second concurrent cohort only after checking the weekly workload.
- Typing & Computer Basics and Microsoft Office are sensible initial candidates if the founder can deliver them and the equipment is available. This is a recommendation, not a declaration that either intake is open.
- Keep other useful syllabuses and free notes available. Where there is no approved delivery plan, use **Register interest** or a clearly scoped specialist enquiry, not checkout.
- Publish fixed class slots rather than implying that every requested morning, evening, online and hybrid combination is available.
- Do not advertise one-to-one tuition, unlimited revisions, unlimited computer access or personal timetables at the group-course price. Quote genuinely different services separately before payment.
- Preserve existing students' agreements. Reconcile the earlier short-course/full-package distinction rather than deleting legitimate offerings or making an introductory course promise professional mastery.

A small intake is not a weakness. An honest “next date to be confirmed” is better than accepting money for a timetable the founder cannot staff.

### Capacity rule

Before opening an intake, check:

```text
Teaching + preparation + assessment/feedback + support + administration
    <= the founder's available working time

Places sold
    <= the lowest relevant limit: room, usable equipment, safe supervision,
       instructor feedback capacity and the advertised practice arrangement
```

A learner bringing a laptop does not automatically remove power, seating, supervision or support limits. Do not set a numerical class capacity until those facts are known.

## 2. Modest pricing must still pay for delivery

### Start from existing introductory prices; do not automatically discount them

These are **current repository prices**, not new prices or a claim about competitor rates:

| Course                   | Recorded fee | Recorded duration | Recorded sessions |
| ------------------------ | -----------: | ----------------: | ----------------: |
| Typing & Computer Basics |      ₦20,000 |           2 weeks |                 4 |
| Data Entry               |      ₦20,000 |           2 weeks |                 4 |
| Microsoft Office         |      ₦30,000 |           3 weeks |                 6 |
| Graphic Design           |      ₦40,000 |           4 weeks |                 8 |
| Web Design               |      ₦50,000 |           4 weeks |                 8 |
| Web Development          |      ₦60,000 |           6 weeks |                12 |

Source: `src/data/academy/catalog.ts`. The six-week Web Development offer is introductory practical training, not a guarantee of professional readiness or employment.

**Recommendation:** retain these as the starting price points while checking costs, rather than raising everything to premium-programme prices or cutting fees because CEA is new. They cannot be declared profitable or the cheapest locally without actual cost and market evidence.

Keep one clear fee per approved offer. State the cost of any required software, practice access, data, materials or assessment before payment; do not use a surprise certificate or registration charge to make an advertised fee look lower. Free lessons can serve people who cannot yet afford instructor-led training without committing the founder to unlimited free personal support.

### A simple cost check, not a new accounting system

For each proposed cohort, record:

| Input                                     | Include                                                                                                                                                                                                             |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fixed cohort cost `F`                     | A fair share of rent, power/internet, equipment maintenance and depreciation, plus the founder's teaching, preparation, assessment and administrative time. Avoid counting the same overhead again in every cohort. |
| Cost per learner `v`                      | Materials, learner-specific licences and payment charges. Use the actual provider fee structure; do not assume a percentage quoted in an old document is current.                                                   |
| Tuition per learner `P`                   | The complete advertised fee, not just the first instalment.                                                                                                                                                         |
| Conservatively expected paid learners `n` | Not the maximum capacity and not everyone who clicked “interested”. Account for non-payment and refunds.                                                                                                            |
| Reserve `B`                               | A chosen operating cushion for interruptions and replacement costs. This is separate from money still needed for refundable, undelivered teaching.                                                                  |

```text
Cohort contribution after delivery costs = n × (P − v) − F
Break-even paid learners = ceiling(F ÷ (P − v))
Paid learners needed with reserve = ceiling((F + B) ÷ (P − v))
```

These simplified formulas assume `P > v` and an estimated per-learner cost at that fee. Use actual fees/taxes where applicable; if `P <= v`, the offer needs redesign before launch.

**Illustration only—not CEA's costs or a proposed class size:** at ₦30,000 tuition, ₦120,000 fixed cohort costs, ₦5,000 per learner and a ₦15,000 desired reserve:

| Fully paying learners |  Revenue | Delivery cost | Surplus / shortfall before reserve |
| --------------------: | -------: | ------------: | ---------------------------------: |
|                     3 |  ₦90,000 |      ₦135,000 |                           −₦45,000 |
|                     5 | ₦150,000 |      ₦145,000 |                             ₦5,000 |
|                     6 | ₦180,000 |      ₦150,000 |                            ₦30,000 |

Break-even is five; six meets the illustrative reserve requirement. If real equipment or teaching capacity is lower than the viable minimum, do not overfill the class. Reduce avoidable costs, adjust the offer/fee, combine compatible demand before confirming a date, or deliberately budget a limited pilot subsidy.

Treat these as **full-course economics**, not cash on hand. Half-fee deposits may not cover the first month's costs. Keep a simple cash forecast and do not spend refundable deposits as though all tuition has been earned.

No new across-the-board discounts, referral cash rewards or expensive tool subscriptions at launch. Any affordable trial or concession should have a known cost, limited scope and budget.

## 3. Recommended application and payment rules

**All rules in this section are proposals awaiting owner approval.** They are intentionally simple and close to the existing short-course payment options.

1. **Free application and interest registration.** An interest record does not reserve a place or incur a fee.
2. **Confirm the offer before taking money:** course, actual cohort, space, equipment arrangement, full fee, inclusions and accepted policy version. Do not use a deposit to discover whether the class can run.
3. **Two payment choices:** full payment, or 50% before the first session and 50% before the second half of the course. Specify an exact due date in the accepted offer. For six sessions, that normally means before session four—not a vague “week two or midpoint”.
4. **A real, time-limited seat hold:** proposed default 48 hours after issuing an approved offer, extendable by the owner when appropriate. A bank-transfer report awaiting review must be handled visibly; do not automatically resell the place while the founder has not checked a timely payment. A late payment after expiry becomes a placement/refund exception.
5. **Verified payment only.** Paystack confirmation or a transfer matched to bank records establishes payment. Screenshots, messages and redirects alone do not.
6. **Clear access:** once identity, placement and the required payment are verified, activate the learner workspace, timetable and the agreed paid services. A remaining balance is displayed separately. Do not make someone pay again to recover access.
7. **No automatic penalty fees or debt collection.** Send a reminder before the balance is due. Where lawful and agreed, pause future instructor-led services after notice if the balance remains unpaid; allow an owner-approved written extension. Keep receipts, completed work and deliberately free notes accessible.

Do not introduce monthly plans for a two- or three-week course. Keep larger, individually negotiated packages outside the unattended short-course funnel until their delivery and collection risks are understood.

## 4. Refunds: fair, small and explicit

The existing form and course terms conflict. The fixed **₦15,000 administration deduction** in the terms could consume 75% of a ₦20,000 course fee. That is not a proportionate default simply because CEA needs protection.

**The following is a proposed commercial policy for review, not a statement of Nigerian law or text ready to publish.** Have a qualified Nigerian adviser check consumer rights, permitted deductions and timing before adoption. Applicable rights take precedence; do not apply harsher new rules to existing agreements.

| Situation                                                               | Recommended draft treatment                                                                                                                                                                                                                                                                                                                                                    |
| ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| CEA cancels before teaching starts or cannot provide the agreed place   | Offer a full refund of amounts paid, including compulsory charges, or a reschedule chosen by the learner. Do not force credit.                                                                                                                                                                                                                                                 |
| CEA cannot deliver the remainder after teaching begins                  | Promptly explain the issue and offer a remedy/reschedule by agreement or refund for the undelivered portion, subject to applicable rights.                                                                                                                                                                                                                                     |
| Learner withdraws at least seven calendar days before the first session | Full refund. Budget ordinary payment-processing costs into operations rather than promising to pass every loss to the learner.                                                                                                                                                                                                                                                 |
| Learner withdraws fewer than seven days before the start                | Offer one deferral to a suitable published cohort with space, **or a refund**. Proposed cancellation deduction: only actual, documented, non-recoverable learner-specific costs, capped at **10% of tuition or the amount paid, whichever is lower**, and only if lawful and disclosed before payment. It is not an automatic 10% fee. No qualifying costs means no deduction. |
| Learner withdraws after teaching begins                                 | Retain the agreed value of teaching already supplied/made available under the accepted attendance terms; refund unused prepaid teaching, less only any lawful, disclosed costs without double counting. Use an itemised calculation, not a blanket “no refunds” statement.                                                                                                     |
| A learner misses a class that CEA delivered as agreed                   | Provide the normal notes/practice brief and any agreed catch-up route. Do not promise a free private repeat class. Explain attendance and withdrawal treatment before enrolment.                                                                                                                                                                                               |

For the late-cancellation example, the proposed cap on a ₦20,000 course would be ₦2,000, not ₦15,000—and the actual deduction may be less or zero. This cap is a business recommendation, not a legally validated figure.

A deferral must have a real destination; never promise “the next cohort” indefinitely. If no suitable cohort is scheduled, apply the relevant refund route. Refund to the original payer/method where possible, using verified instructions when an exception is necessary. Keep receipt, reason, calculation, approval and payment evidence.

Set an achievable published refund-processing window after confirming the payment-provider process and legal requirements. Avoid an instant-refund promise, but do not leave approved refunds without a due date and status. These recommendations protect CEA through predictability and records rather than by keeping money for undelivered services.

## 5. One person, one worklist

Use the existing software and one accountable owner identity with appropriate permissions. Do not require pretending to be separate admissions and finance employees or buying another CRM.

### Five primary queues

1. Applications needing a placement or answer.
2. Transfers needing verification, or payment mismatches.
3. Paid/eligible learners awaiting access—never silently buried in a general inbox.
4. Balances coming due and approved extensions.
5. Assignments awaiting feedback and upcoming classes.

Interest-only enquiries can sit in a separate filter until an actual cohort is ready. Each actionable item needs a reference, reason, due date and safe next action. Preserve RBAC and audit history even while one person handles all responsibilities.

### Protect the teaching day

- Use two short enquiry/admin review windows on operating days, instead of replying continuously during class. Exact times must fit the founder's schedule.
- Suggested public service level: **reply within two working days during published support hours**, only after the owner confirms it is sustainable. Do not equate premises opening hours with uninterrupted support availability.
- Provide an immediate on-screen receipt and accurate status. Say an email was sent only when the system has evidence of dispatch; show a recovery/resend route.
- Publish fees, equipment, timetables, prerequisites and payment status before adding a chatbot to answer them. WhatsApp remains an optional escalation path.
- Set one assessment/review block each week. Limit promised feedback rounds and turnaround times to what the founder can deliver.

Review the amount of time spent on these queues during the pilot. Expand only when teaching and feedback remain satisfactory—not merely because another course has a landing page.

## 6. What to automate, and what to retain under owner control

| Automate reliably                                                            | Keep as an explicit owner decision initially                            |
| ---------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Application/reference creation; recovery links; accurate status pages        | Publishing a cohort and approving its timetable/equipment/capacity      |
| Verified payment matching, stable receipts and correct balances              | Bank-transfer exceptions, refunds and unusual payment extensions        |
| Learner access once the approved conditions are met; retryable notifications | Ambiguous account matches, prerequisites, guardian/equipment exceptions |
| Timetable, due-date reminders and stopping irrelevant payment nudges         | Assessment of practical work and approval of certificate eligibility    |

An approval step is acceptable when its status and response window are visible. **The target is not zero human involvement; it is no unnecessary conversation for a straightforward purchase.**

Once the first cohort is proven, routine eligible applications can receive offers automatically against published capacity. Until then, one brief placement check is safer than uncontrolled self-service payment.

## 7. Protect the establishment without expensive infrastructure

- Use the academy's established payment channels; verify transfers against statements and retain an auditable financial trail.
- Enable MFA for the owner account, do not share logins, and keep backups with a tested recovery procedure. No new paid security product is assumed necessary for these basics.
- Secure applicant records and receipts; reference numbers are not adequate identity proof for personal information.
- Store accepted offer/policy versions and confirmation records. Do not change a learner's agreed fee silently.
- Publish truthful completion criteria and outcomes. Do not promise employment, accreditation, guaranteed income or unlimited support.
- Keep device and practice arrangements explicit. Check legitimate software access and licences rather than absorbing unplanned costs or relying on unlicensed tools.
- Define guardian handling for minors before accepting them. Collect only necessary personal data, restrict it and set a documented retention process.
- Do not accept more teaching, classes or service work than the founder can deliver. School/B2B work needs its own costed scope, not an unrestricted extension of a low-cost group class.

## 8. Smaller implementation order

### First: fix technical risks that do not depend on setting a new price

Correct payment-state interpretation, balance accounting/idempotency, private-record access, role-guard inconsistencies and fake checkout behaviour when configuration is missing. Add regression tests. These fixes must not silently change accepted agreements or prices.

### Next: approve one offer and make it operable

Confirm real equipment, class dates, capacity, price viability and one tuition policy. Publish a complete course decision page and a small catalogue-backed comparison if useful. Gate checkout on the approved offer; interest-only products must not accept payment.

### Then: connect payment to actual learning

Use the existing registration, payment, cohort and LMS records. Provide secure applicant recovery, a correct learner/course link, timetable, first lesson, assignment submission and feedback. Add a simple owner exception worklist. Test full and split payment, transfer verification, retries and failed activation before opening unattended checkout.

### Later: expand from evidence

Measure routine enquiries per enrolment, cash collected versus due, paid-but-unactivated cases, time spent administering a cohort and actual completion quality. Delay broad dashboard redesigns, advanced animations, complex marketing automation, a new CMS, mass course launches and paid tools without a demonstrated need.

This sequence does not declare the outstanding audit risks fixed. It reduces how much has to be launched at once while preserving the release gates.

## 9. Facts still needed—not policy homework for the founder

The recommendations above provide a starting decision rather than asking the owner to design every rule. To test whether it is affordable and deliverable, collect four facts:

1. Usable academy computers and learner-owned-device arrangements, including practice access.
2. Which one or two courses are ready to teach well now, and weekly hours available for teaching **and** preparation/feedback/admin.
3. Rough monthly rent, power/internet and equipment costs, plus the minimum amount the founder needs to pay themselves. Estimates are acceptable; mark unknowns instead of inventing them.
4. Whether existing paid learners have commitments that the new setup must preserve.

Before changing public commercial terms, obtain explicit approval of the proposed payment, refund, deferral and support rules. No unanswered question should be filled with an invented date, price, device count or legal guarantee.

**Official address remains:** 24 Ebony Road, off Rumuola Road, Port Harcourt, Rivers State, Nigeria.

## This pass

Rechecked the selected fees, durations and session counts against the catalogue and verified the illustrative break-even arithmetic. Only planning documentation and its links were changed in this pass. No public prices, policies, payment behaviour, production records or deployment were changed; application tests were not rerun for documentation-only edits.
