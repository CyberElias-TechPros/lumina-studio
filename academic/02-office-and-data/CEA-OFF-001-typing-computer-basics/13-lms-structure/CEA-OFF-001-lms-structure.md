# CEA LMS Structure — CEA-OFF-001 Typing & Computer Basics

| Field          | Value                               |
| -------------- | ----------------------------------- |
| Institution    | Cyber Elias Academy                 |
| Document ID    | CEA-ACA-LMS-OFF-001                 |
| Version        | 1.0                                 |
| Status         | Draft — pending pilot               |
| Effective date | 2026-11-16 · Review date 2027-02-16 |

How this course is organised inside the academy LMS. This document maps content to the student
portal; it does not grant access by itself. Enrolled students see the course after enrolment is
confirmed and paid; payment status and academic status are separate fields.

## Course tree

```
CEA-OFF-001 · Typing & Computer Basics
├── Overview (description, outcomes, fee, duration, requirements)
├── Announcements
├── Roadmap (week 1, week 2)
├── Sessions / Modules
│   ├── S1 Understanding the Computer
│   │   ├── Lesson: SESSION-01 note (render)
│   │   ├── Practice: Workbook 1.1–1.4
│   │   └── Knowledge check 1
│   ├── S2 Keyboard & Mouse
│   │   ├── Lesson: SESSION-02 note
│   │   ├── Practice: drills + log + typing test
│   │   └── Knowledge check 2
│   ├── S3 Files & Internet
│   │   ├── Lesson: SESSION-03 note
│   │   ├── Practice: workbook 3.1–3.4
│   │   └── Knowledge check 3
│   └── S4 Digital Independence
│       ├── Lesson: SESSION-04 note
│       ├── Practice: workbook 4.1–4.5
│       ├── Knowledge check 4
│       └── Final practical (booking + observation)
├── Assignments (A1, A2, A3) with submission slots
├── Project workspace (CEA-Final folder checklist; optional upload slot for evidence)
├── Results (component scores, total, grade, gate status)
├── Feedback (per component, from instructor / moderator)
├── Portfolio (all submitted evidence + projects)
├── Certificate (issued on completion; verification per certification policy)
└── Feedback form (course evaluation)
```

## Records recorded per student

Enrolment (cohort, dates, status) · attendance per session · lesson completion (lesson notes marked
read) · knowledge-check scores · workbook activity sign-offs · assignment submissions + feedback ·
typing test results over time · final practical outcome + gate · certificate number/date ·
pilot feedback.

## Statuses

`applicant → awaiting confirmation → enrolled → active → (on hold) → completed | not yet competent →
withdrawn`. Separate payment state: `unpaid | part-paid | paid`. A student can be academically
complete while commercially pending, and vice versa — keep the two ledgers separate.

## Access roles

| Role           | Sees                                                               |
| -------------- | ------------------------------------------------------------------ |
| Student        | Own materials, submissions, results, certificate                   |
| Instructor     | Own cohorts: attendance, marks, feedback                           |
| Coordinator    | This course across cohorts; content fixes; reassessment scheduling |
| Academic admin | Records; certificate issuance; moderation sheets                   |
| Finance        | Payment states only                                                |
| Management     | Aggregated reporting; no personal data by default                  |

## Offline and mobile behaviour

Notes render on mobile; practice checklists print to A5 cards; typing logs are printable;
essential pages work on 2G-class connections (text first, images deferred). Download buttons for
all student-facing PDFs (generated via `npm run academic:print`).

## Alignment with the website

The public course page for `computer-basics-typing` states the same sessions, fees, requirements,
outcomes and deliverable as this package — see `src/data/academy/catalog.ts` (course slug
`computer-basics-typing`). Any change to one must change the other in the same release.
