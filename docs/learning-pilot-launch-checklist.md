# Computer Basics learning pilot: launch checklist

This documents the assessment, five lesson checks, Computer Basics Lab and optional device-only learning trail. It is a launch aid, not an educator review or a promise of AdSense approval.

## Editorial review — required before publication

A CEA educator should read the actual lessons and check each question and every answer explanation in `src/data/practice/beginner-challenges.ts`: clicking into a document, naming and locating a file, Backspace, the browser address bar and email attachments. Confirm they are accurate, beginner-friendly, consistent with the corresponding lessons and accessible on phone and desktop. Confirm the lab's file-save exercise clearly remains a simulation. Record reviewer and date only after a real person completes the review, following the existing editorial policy; do not infer a review from automated tests. The assessment is a starting suggestion, not a placement test or a course prerequisite.

## Measurement and privacy

- The trail stores only lesson bookmarks, self-marked completions and the lab completion mark in `cea-learning-trail-v1` on the visitor's device, only when they choose a save action. No account sync, answers, typing or simulated file names are stored in that trail. Clearing the trail only deletes that key.
- The following events are implemented but **off by default**: `cea_lab_started`, `cea_lab_completed`, `cea_lesson_check`. They send no answer, correctness, typed text, file name or progress state, and use a query-free public page location. They require `NEXT_PUBLIC_ENABLE_PUBLIC_TRACKING=true`, explicit optional-cookie consent and a loaded GA4 tag with `NEXT_PUBLIC_GA4_ID`. Events are dropped, not queued, if any condition is missing. They measure actions, not unique people or verified skills.
- Do not enable tracking until the existing site-wide SPA/private-route tracking and consent/privacy review is complete. A GA4 property and appropriate access are required; no baseline exists merely because the code exists. Provider-level analytics may collect technical data under its policy, and consent requirements depend on jurisdiction.
- After a verified release, compare at least several weeks of data, segmenting by device and source: lab starts and completions, lesson-check uses, return visits and course-detail visits. Counts are not a cohort conversion rate or proof of learning; use the analytics provider's documented definitions. Compare like with like, note consent and traffic limitations, and investigate whether new features actually help rather than assuming they do.

## Ads and release

- The existing loader uses ngadverts. The lab, trail and five lessons with interactive checks are excluded by the local ad registry. No Google AdSense approval, inventory or live serving is asserted. Review actual live advertising and consent/CMP configuration separately in the ad account before enabling or changing ad integrations.
- Keep ad units away from interactive controls and preserve exclusions. Test on small screens with consent accepted and declined. Do not incentivise ad clicks.
- Run `npm run test:learning`, `npm run check:ads`, `npm run typecheck`, `npm run lint`, `npm run build` and the isolated public/practice/trail browser suites. Check the PR's relevant GitHub, Vercel and Workers statuses. Never treat merging as proof of production deployment.
- After publication, inspect the production deployment and non-destructively verify the homepage, Notes, the five lessons, `/practice/computer-basics`, `/learning-trail`, course links, and device-only clearing. Avoid real applications, accounts, payments, or test ad clicks. Review how retention is measured before adding new labs.
