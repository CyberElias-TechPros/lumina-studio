# CEA protected tuition: implementation and owner runbook

**17 October 2026 · repository implementation, not a deployment or permission to start collecting fees**

The chosen operating model is deliberately small: keep the current fees, start with a genuinely deliverable short course, accept free interest when an intake is not ready, and handle unusual financial decisions personally. No additional paid service, employee, classroom device or class place is assumed.

## 1. What has changed

- **Fees unchanged.** The 27 existing short/long fee definitions are generated from the catalogue. New self-service paid offers are limited to matching short-course cohorts. Longer packages remain separately reviewed enquiries; existing agreements are not rewritten.
- **Free request → reviewed offer → learner acceptance → verified payment → learning.** A request or payment screenshot never reserves a confirmed teaching place by itself.
- **Closed-by-default cohorts.** A future intake needs the exact course, actual dates/time, session length, capacity and readiness confirmation. The owner must record the learner's equipment/practice arrangement and check suitability before issuing a 48-hour offer hold (clipped to the first session).
- **Offer evidence.** Versioned snapshots retain the fee, plan, timetable, equipment agreement, balance date, expiry and policy text. Offer creation, history, timeline and email-delivery intent are transactional. Acceptance is recorded against the exact version.
- **Payments.** Checkout charges the remaining balance rather than charging the full fee twice. Duplicate attempts, webhooks, receipts and verified bank credits are guarded. Credits are cumulative; failed/pending transactions do not inherit an earlier deposit's success. Actual received kobo is retained, including under/overpayment. Existing opening credits are preserved.
- **Learning.** Matching curriculum templates are additive, not replacements for existing courses or learner progress. Eligible verified students receive access after their accepted placement and payment threshold. An activation retry cannot create another charge.
- **Private records.** Application, receipt and payment access require the matching verified email or an authorised staff role. Application references are not passwords. Private responses are not cacheable. Authentication changes clear private query data; an MFA challenge is not treated as a completed session.
- **One owner worklist:** `/app/admin/operations`. It includes actionable applications, payments/access exceptions, bank-transfer review, notification problems, fee-free later balance dates and a link to assignments/feedback. The queue is paginated; completed records do not consume the actionable window.
- **More honest public copy.** Unknown intakes are labelled unconfirmed; public notes remain free; application submission does not request money. The canonical address remains **24 Ebony Road, off Rumuola Road, Port Harcourt**.
- **Privacy defaults.** GA4/AdSense tags are off unless `NEXT_PUBLIC_ENABLE_PUBLIC_TRACKING=true` is explicitly set after a separate review. Leave it false/unset: unloading a script after a private SPA navigation is not sufficient protection. Vercel page analytics drops private paths and strips query strings. Private application/auth pages send `noindex` and `no-referrer` headers.

## 2. Before the first paid cohort

All boxes remain unchecked until supported by real evidence. Passing software tests does not tick them.

- [ ] Choose one short course you can personally teach, prepare, assess and support. Preview templates are not evidence that teaching is ready.
- [ ] Inspect actual working computers, power, internet, seating, required software/licences and supervised practice access. Record a usable capacity, not a target enrolment number.
- [ ] Reserve teaching, preparation, marking and administration time. Publish only dates you can deliver.
- [ ] Review the first lessons, practical tasks, assessment criteria and feedback arrangements against the full published course promise. Do not thin the curriculum to fit the timetable.
- [ ] Check each learner's prerequisites, device/practice needs and guardian permission where applicable. An unchecked requirement is a reason to retain interest, not to collect a deposit.
- [ ] Calculate delivery costs at the existing fee. Include the founder's time; modest prices are not automatically profitable.
- [ ] Review existing paid commitments and previous favourable terms before migrating or issuing replacement offers.
- [ ] Have the proposed tuition/refund policy reviewed for the actual business and applicable Nigerian requirements. Versioning and a policy page are not legal approval.
- [ ] Complete the isolated staging drill below with the actual payment/email configuration, including money exceptions, refunds and account recovery.
- [ ] Rehearse the **manual refund/cancellation accounting process** with whoever is responsible for the books. This release does not initiate refunds, reverse settled receipts or automate paid cancellations. Do not open paid offers without an agreed way to record the outgoing refund, communicate the remedy and reconcile the teaching agreement.

### Simple cost check

Use actual figures; leave unknown inputs blank rather than treating them as zero.

- Contribution per learner = tuition − learner-specific cash costs − (individual feedback/support hours × founder hourly allowance).
- Batch cost = teaching/preparation/admin hours × founder hourly allowance + batch cash costs + allocated overhead.
- Minimum viable paid learners = round **up** (batch cost ÷ contribution per learner).

If contribution is not positive, or the minimum exceeds verified delivery capacity, change the delivery design or explicitly budget a limited pilot loss before selling. Do not secretly add compulsory fees or assume unpaid founder time makes the course profitable.

## 3. Daily owner workflow

Use planned admin windows around teaching; the published support target is **two working days, Monday–Saturday excluding public holidays**, not uninterrupted availability during premises opening hours.

1. Open **Academy worklist**. Review paid-but-not-active learners and money exceptions first. Check the next page when present.
2. Review transfer reports against the **actual bank statement**, not screenshots. Enter the independently verified credit reference and actual amount. Confirm only matched funds; reject unmatched reports with a reason. Never ask for a student's PIN, OTP or banking password.
3. For a suitable unpaid applicant, open **Manage actual cohorts**. Save actual timetable/capacity details. Open offers only after readiness checks. Closing new offers does not cancel already accepted agreements or block their remaining-balance payments.
4. Prepare a reviewed offer for the exact course. Disclose equipment/practice access, inclusions and compulsory costs. Original balance dates must be before the midpoint of the confirmed course dates, and earlier if the second half of teaching begins sooner. This conservative software bound does not substitute for checking the actual session timetable.
5. The learner signs in with the application email, accepts the versioned offer and pays. The status page carries the receipt, balance and access outcome. Do not tell the learner to pay again to repair access.
6. If eligible access has not activated, use **Retry eligible access**. Check the verified account, matching course, current accepted offer and payment threshold. Progress is preserved.
7. Review **Assignments & feedback**. A paid learner should be able to open the correct course, submit a practical task and receive useful feedback—not merely see an “enrolled” badge.
8. Review due balances. A **later, fee-free extension** can be recorded with a reason. It preserves the original offer snapshot and records the concession. It cannot bring a deadline forward or add a penalty.
9. Check job history and notification failures. The private status page is the source of truth if an email is delayed. An accepted provider request is not proof that an email reached the inbox.

## 4. Exception handling: do not improvise financial state

| Situation                                                                  | Required response                                                                                                                                                                                                                                                                                                                                                                                        |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Pending online attempt or provider timeout                                 | Check/reconcile that reference first. Unknown is not failed. Do not start a second charge just to clear a spinner.                                                                                                                                                                                                                                                                                       |
| Transfer screenshot, unmatched report or altered evidence                  | No credit until the actual bank entry matches. A bank reference cannot fund two applications.                                                                                                                                                                                                                                                                                                            |
| Underpayment                                                               | Credit only the amount received. Explain the remaining amount; do not claim the deposit threshold or full fee was met.                                                                                                                                                                                                                                                                                   |
| Excess payment                                                             | Preserve the incoming receipt. Reconcile the extra amount and arrange the agreed refund. Do not convert it into an invented fee.                                                                                                                                                                                                                                                                         |
| Expired offer, late settlement or unresolved transfer                      | Record genuine incoming money, but do not silently sell the same place twice or promise a replacement date. Pending attempts/reports protect capacity from automatic resale. Review the place/refund personally.                                                                                                                                                                                         |
| No class is deliverable                                                    | Keep new applications interest-only and close new offers. Notify affected learners personally; follow the accepted agreement and lawful refund/remedy process.                                                                                                                                                                                                                                           |
| Unpaid application withdrawn                                               | Use the admissions decline action only after checking funds. Ordinary stage changes cannot cancel a paid, active or pending-money agreement.                                                                                                                                                                                                                                                             |
| Paid cancellation, partial refund, overpayment refund or disputed transfer | Owner-reviewed process outside automatic checkout: preserve original receipts and agreement; record the itemised decision, actual outgoing provider/bank reference, amount/date and learner communication in the accounting/refund record. Reconcile status/access/capacity explicitly before any replacement offer. Never edit a successful payment to “failed” or delete it to make totals look right. |
| Existing agreement predates this policy                                    | Honour its agreed price and more favourable commitments. Do not invent acceptance timestamps or blindly bulk-activate legacy records.                                                                                                                                                                                                                                                                    |
| Wrong/changed email or lost access                                         | Verify ownership through the established account-recovery process. Do not disclose private records to somebody who only supplies a reference.                                                                                                                                                                                                                                                            |

**Deliberate boundary:** the application ledger records verified incoming tuition; this release is not a complete general ledger or automated refund engine. Manual outgoing refunds need their own traceable accounting record and reconciliation. The ordinary decline/cohort-edit controls intentionally refuse to erase paid obligations. The staging launch gate includes proving that this manual process is workable before collecting real money.

## 5. Technical release order — not executed in this session

1. Obtain explicit deployment approval. Identify the actual staging and production bindings; take a verified backup and rehearse restore. Never use production browser-test targets.
2. Review the existing registrations, successful transactions, receipts, learner grants and promised dates. Resolve discrepancies between historical `paid_amount` and transaction evidence. Do not seed demo people, bookings or payments into production.
3. Apply the schema-only `backend/migrations/0067_protected_tuition.sql` **to isolated staging first** using the correct binding. Existing cohorts default closed; no existing applicant is deemed to have accepted the new policy.
4. Run `cd backend && npm run gen:tuition`. Review the generated fee map and `backend/seeds/academy-courses.sql`. The latter contains additive curriculum templates only; import it into the explicitly selected staging database. It does not open cohorts or grant access. `INSERT OR IGNORE` preserves existing matching templates; review conflicts rather than assuming existing content was replaced.
5. Deploy the matching Worker/frontend versions to staging. Use the real staging API URL; disable mock mode there. Configure real provider test keys, webhook signing, exact callback/allowed origins, email sender and delivery configuration securely—never in frontend variables or the repository.
6. Confirm `tuition-follow-up` and `reconcile-payments` are running on the existing 15-minute trigger. Confirm hourly reminders are not asking interest-only applicants to pay. The three configured cron expressions already map to these jobs; deployment/environment verification is still required.
7. Complete the drill and record evidence. Only then consider the same reviewed migration/template/release order for production. Keep offers closed until the owner confirms the real first cohort.
8. Prefer a forward fix if rollback becomes necessary. Do not drop the new payment/history columns or replay destructive/demo seed scripts over live data.

### Staging drill

Use test identities and test funds/provider mode only:

- Desktop and a real phone: course → free application → private email-link recovery → confirmed offer acceptance.
- Password and magic-link sign-in, MFA where enabled, expired link, wrong email, logout/account switch and return to the correct private application.
- Full payment, deposit then exact remainder, abandoned checkout, provider timeout, signed webhook replay, wrong currency, late payment and outbox retry.
- Two simultaneous requests for the last place; pending transfer on an expired hold; one bank credit claimed by two reports; reject versus confirm.
- Receipt amount/number, original offer evidence, balance/extension and matching learner access. Verify no previous student's cached data survives an account switch.
- Learner task submission, actual founder review and learner-visible feedback. Test the founder's real access to admissions and teaching workspaces.
- Academy cancellation, learner withdrawal and an excess-payment refund: approve the correct remedy, use the provider/bank's documented process, retain the original receipt, and prove the manual accounting/status/capacity reconciliation. No automatic payout is implemented here.
- Email received in the actual mailbox, cron job history and recovery after an interrupted activation/delivery attempt.

## 6. Validation record

Final checks on 17 October 2026. Browser UI fixtures are **not** evidence of real provider/email delivery, legal compliance, physical readiness or profitability.

- **Backend:** 71 suites / **845 tests passed**, including **48 protected-tuition tests**. Backend TypeScript passed.
- **Frontend:** TypeScript and the Next.js production build passed. The local build explicitly enabled mock data for preview; optional library fetch failure used the existing catalogue fallback. A resource-killed concurrent build was rerun successfully on its own with a 2.5 GB Node heap limit.
- **UI/cache:** **10 isolated tests passed** against the final local build: seven browser checks (desktop/mobile free application, intake/fee honesty, private headers/policy, owner readiness controls and payment guidance) and three authentication-cache checks (logout, account switch, MFA challenge). Actual MFA/email/provider staging verification remains a release gate.
- **Scoped lint:** zero errors; three existing Fast Refresh export warnings. `git diff --check` passed.
- Browser checks found and fixed the workspace-tour `/app` prefix accidentally matching `/apply`; a public applicant is no longer interrupted by that tour.
- Protected tuition tests cover concurrency, incoming-money accounting, ownership, offers, access and an assignment/submission/feedback journey.
- The local UI suite explicitly blocks external browser requests. Site and API test defaults are local; known CEA production targets are rejected. Mock preview does not send real email, transfer money or create real class places.
- No production migration, provider charge, live registration change, commit, push or deployment was performed during implementation.

Related: [solo-founder recommendation](../plans/CEA_SOLO_FOUNDER_LAUNCH_PLAN.md) · [independent audit response](../plans/CEA_AUDIT_RESPONSE_2026-10-17.md)
