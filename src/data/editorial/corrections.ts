/**
 * The public corrections log.
 *
 * A correction is a factual or instruction-changing fix to something we have
 * already published — a wrong menu path, a fee that changed, a step that no
 * longer works in a current software version. Typos are fixed silently; anything
 * that would have misled a reader is recorded here permanently.
 *
 * The log is allowed to be empty, but the page that renders it must say so
 * honestly rather than hide. An empty corrections log with a stated policy is a
 * trust signal; a missing one is a gap.
 */

export type CorrectionEntry = {
  /** ISO date the correction was published. */
  date: string;
  page: string;
  href?: string;
  what: string;
  why: string;
  /** How a reader can check that the fix is right. */
  verification?: string;
};

export const CORRECTIONS_POLICY = {
  responseWindow:
    "We acknowledge a correction report within two working days and publish the fix, or our reason for not changing the page, within ten.",
  route: "help@cea.ng",
  whatCounts: [
    "A step that no longer matches the current version of the software.",
    "A fee, date, address, opening time or requirement that has changed.",
    "A factual error about how a computer, file, account or service works.",
    "An instruction that could cause data loss, payment error or a security problem.",
  ],
  whatDoesNot: [
    "Spelling and typing slips (fixed without an entry).",
    "Disagreements with a teaching approach, where the page explains its reasoning.",
    "Requests to remove a link to an official documentation page.",
  ],
};

/** Newest first. Empty is a valid and honest state. */
export const corrections: CorrectionEntry[] = [];

export const correctionsOpened = "2026-10-26";
