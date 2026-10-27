"use client";

import { AdUnit } from "./ngadverts";

/**
 * Named mount points. One import per position, so the call site reads as a
 * placement decision rather than a component name, and so the set of positions
 * is greppable in one place.
 *
 * Every wrapper is inert on a path the registry does not allow, on a slot that is
 * not the primary one for its path family, and until optional-cookie consent has
 * been granted. Mounting one of these never puts an empty box in the HTML.
 */

/** After the second section of a lesson. */
export function LessonInArticleAd() {
  return <AdUnit slotId="lesson-in-article" className="my-10" />;
}

/** After the lesson body, before the next-lesson links. */
export function LessonEndAd() {
  return <AdUnit slotId="lesson-end" className="mt-12" />;
}

/** On the lesson index, after the first page of cards. */
export function BlogIndexAd() {
  return <AdUnit slotId="blog-index" className="mt-12" />;
}

/** Last block on a course page or a session lecture, below the enrolment action. */
export function CourseEndAd() {
  return <AdUnit slotId="course-end" className="mt-12" />;
}
