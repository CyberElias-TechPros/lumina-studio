/** Framework-neutral commercial copy shared with the Worker. Fees stay in the catalogue. */
export const TUITION_POLICY = {
  version: "tuition-2026-10-17",
  updated: "17 October 2026",
  support:
    "We aim to reply within two working days, Monday–Saturday, excluding public holidays. Teaching may delay an immediate reply.",
  application:
    "Applying is free. A preference or application reference is not a reserved place. Do not pay until you have reviewed and accepted a confirmed course offer.",
  payment:
    "Short courses: pay in full, or 50% before the first session and 50% before the second half. Your offer states the exact balance date. No automatic late-payment penalties.",
  availability:
    "Dates, timetable, equipment and practice arrangements must be confirmed before payment. Courses without a confirmed intake collect interest only.",
  refundSummary:
    "Full refund if CEA cancels before teaching starts, or if you withdraw at least seven calendar days before the first session. Later cancellations follow the itemised tuition refund policy; no flat administration penalty.",
  refunds: [
    "If CEA cancels before teaching starts or cannot provide the agreed place, choose a full refund of all amounts paid, including compulsory charges, or a reschedule. Credit is not compulsory.",
    "Withdraw at least seven calendar days before the first session for a full refund.",
    "Withdraw fewer than seven days before the start: choose a refund or one deferral to a suitable scheduled cohort with space. Any deduction must be lawful, disclosed before payment, and supported by actual non-recoverable learner-specific costs. It cannot exceed 10% of tuition or the amount paid, whichever is lower. This is a cap, not an automatic fee; no qualifying costs means no deduction.",
    "After teaching starts, we provide an itemised calculation: the agreed value of teaching already supplied or made available under the accepted attendance terms, and a refund of unused prepaid teaching. Any lawful, previously disclosed non-recoverable costs must not be counted twice and remain subject to the same 10% cap. There is no blanket no-refund rule.",
    "If CEA cannot deliver the remaining teaching, agree a suitable remedy or reschedule, or receive a refund for the undelivered portion, without limiting applicable rights.",
    "Request a refund at help@cea.ng with your application reference. We acknowledge requests within two working days and aim to complete approved refunds within ten working days using the original payment method where possible. We explain any provider delay and give a next update date. Any shorter period required by law takes precedence.",
  ],
  attendance:
    "A missed group class does not include a free private repeat lesson. Normal notes and the agreed catch-up route remain available. Private tuition, extra feedback rounds and extra practice access must be separately agreed and priced before purchase.",
  protection:
    "These terms apply to new offers accepted under this policy version. Existing agreed fees and more favourable commitments remain protected. Nothing here limits rights that cannot lawfully be excluded under Nigerian law.",
  access:
    "Verified payment, an accepted place and a verified learner account unlock the agreed teaching and learner workspace. Payment screenshots and redirects are not proof of settlement. Free public notes remain free.",
} as const;

export type PaymentResultState = "paid" | "deposit" | "failed" | "pending";
/** An individual failed/pending attempt must never inherit success from an earlier deposit. */
export function tuitionPaymentResult(transaction: string, enrollment: string): PaymentResultState {
  if (transaction === "success") return enrollment === "paid" ? "paid" : "deposit";
  if (transaction === "failed") return "failed";
  return "pending";
}
