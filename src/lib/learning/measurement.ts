/**
 * Optional aggregate interaction events for the public beginner learning pilot.
 * No answer, typed text, file name, account identifier or progress state is sent.
 * Tracking stays disabled unless the existing public-tracking flag, consent and
 * an already-loaded GA tag are all present. Events are never queued.
 */
const events = ["cea_lab_started", "cea_lab_completed", "cea_lesson_check"] as const;
export type LearningEvent = (typeof events)[number];

const publicLessonPaths = new Set([
  "/blog/sitting-down-at-a-computer",
  "/blog/files-and-folders",
  "/blog/your-hands-on-the-keyboard",
  "/blog/the-internet-without-getting-lost",
  "/blog/your-first-email",
]);

export function trackLearningEvent(event: LearningEvent): boolean {
  if (typeof window === "undefined" || process.env.NEXT_PUBLIC_ENABLE_PUBLIC_TRACKING !== "true")
    return false;
  if (!(events as readonly string[]).includes(event)) return false;
  try {
    const { pathname, origin } = window.location;
    const isLab = pathname === "/practice/computer-basics";
    if (event === "cea_lesson_check" ? !publicLessonPaths.has(pathname) : !isLab) return false;
    if (window.localStorage.getItem("cea:consent") !== "granted") return false;
    const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
    if (typeof gtag !== "function") return false;
    // Avoid query strings, fragments, external referrers and free-form parameters.
    gtag("event", event, { page_location: `${origin}${pathname}`, page_referrer: "" });
    return true;
  } catch {
    // Storage can be blocked and analytics must never interrupt learning.
    return false;
  }
}
