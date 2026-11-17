# CEA Academic System — how this repository stores learning materials

**Cyber Elias Academy (CEA), 24 Ebony Road, Off Rumuola Road, Port Harcourt, Rivers State, Nigeria.**
Everything under `academic/` is the academy's internal academic documentation system: the master
template, the institution-wide frameworks and, one folder per course, the complete teaching package.

> **Visibility.** This repository is public. Academic documents here are **not** linked from the public
> website and are not in the sitemap — treat the whole tree as internal academy documentation, not as
> marketing pages. Files marked **Instructor use** (answer keys, marking guidance, rubric calibration)
> are written for assessors. If the academy wants any of them kept truly confidential, they must move
> to private storage; the repository cannot enforce that.

## Layout

```
academic/
  README.md                      This file
  00-framework/                  Institution-wide: master template, publication statuses, QA checklists
  02-office-and-data/            Department folders (mirror the academy's departments)
    CEA-OFF-001-typing-computer-basics/
      01-course-specification/   The binding course definition (outcomes, hours, assessment plan)
      02-course-manual/          The main student document
      03-lesson-notes/           One full lesson note per session
      04-instructor-guide/       Instructor-facing delivery guide
      06-practical-workbook/     Student practice activities
      07-practice-files/         (planned) named practice files referenced by exercises
      09-assessments/            Knowledge checks, practical assessment sheets, competency lists
      10-final-project/          Final project brief
      11-marking-rubrics/        Marking scales (instructor use)
      12-glossary-and-references/ Glossary, references, shortcuts
      13-lms-structure/          How the course maps onto the student LMS
      version-history.md         Change log for the whole package
```

## Course index

All 22 catalogue courses have complete packages (one folder each), aligned to `src/data/academy/catalog.ts`:

| Folder                                                         | Course                   | Fee     | Duration | Sessions |
| -------------------------------------------------------------- | ------------------------ | ------- | -------- | -------- |
| `02-office-and-data/CEA-OFF-001-typing-computer-basics`        | Computer Basics & Typing | ₦20,000 | 2 weeks  | 4        |
| `02-office-and-data/CEA-OFF-002-microsoft-office`              | Microsoft Office         | ₦30,000 | 3 weeks  | 6        |
| `02-office-and-data/CEA-OFF-003-data-entry`                    | Data Entry               | ₦20,000 | 2 weeks  | 4        |
| `02-office-and-data/CEA-OFF-004-ai-productivity`               | AI Productivity          | ₦30,000 | 2 weeks  | 4        |
| `02-office-and-data/CEA-OFF-005-data-analytics`                | Data Analytics           | ₦50,000 | 4 weeks  | 8        |
| `02-office-and-data/CEA-OFF-006-digital-productivity`          | Digital Productivity     | ₦30,000 | 2 weeks  | 4        |
| `03-business-and-teaching/CEA-BUS-001-business-freelancing`    | Business & Freelancing   | ₦30,000 | 3 weeks  | 6        |
| `03-business-and-teaching/CEA-BUS-002-digital-marketing`       | Digital Marketing        | ₦40,000 | 4 weeks  | 8        |
| `03-business-and-teaching/CEA-BUS-003-online-teaching`         | Online Teaching          | ₦30,000 | 3 weeks  | 6        |
| `03-business-and-teaching/CEA-BUS-004-social-media-management` | Social Media Management  | ₦30,000 | 3 weeks  | 6        |
| `04-hardware-and-security/CEA-HWS-001-computer-networking`     | Computer Networking      | ₦50,000 | 3 weeks  | 6        |
| `04-hardware-and-security/CEA-HWS-002-computer-repairs`        | Computer Repairs         | ₦50,000 | 4 weeks  | 8        |
| `04-hardware-and-security/CEA-HWS-003-cybersecurity`           | Cybersecurity            | ₦50,000 | 4 weeks  | 8        |
| `04-hardware-and-security/CEA-HWS-004-it-support`              | IT Support               | ₦40,000 | 3 weeks  | 6        |
| `05-creative-and-media/CEA-CRE-001-content-creation`           | Content Creation         | ₦30,000 | 3 weeks  | 6        |
| `05-creative-and-media/CEA-CRE-002-graphic-design`             | Graphic Design           | ₦40,000 | 4 weeks  | 8        |
| `05-creative-and-media/CEA-CRE-003-photography`                | Photography              | ₦30,000 | 2 weeks  | 4        |
| `05-creative-and-media/CEA-CRE-004-video-editing`              | Video Editing            | ₦40,000 | 3 weeks  | 6        |
| `06-web-and-code/CEA-WEB-001-mobile-app-development`           | Mobile App Development   | ₦60,000 | 4 weeks  | 8        |
| `06-web-and-code/CEA-WEB-002-web-design`                       | Web Design               | ₦50,000 | 4 weeks  | 8        |
| `06-web-and-code/CEA-WEB-003-web-development`                  | Web Development          | ₦60,000 | 6 weeks  | 12       |
| `06-web-and-code/CEA-WEB-004-wordpress`                        | WordPress                | ₦40,000 | 3 weeks  | 6        |

Department folder and code numbering (`02`–`06`) is the academy's internal scheme, decided during
drafting; confirm the scheme with the academic lead before external use.

New course folders follow the same numbered sub-structure. Keep confidential student records, marks
and personal data out of this tree entirely — they belong in the access-controlled LMS only.

## Document control

Every official document carries a **document control block** (see the master template):

`Institution · Document title · Course code · Document ID · Version · Status · Prepared by ·
Reviewed by · Approved by · Effective date · Review date · Change history`

- **Document ID scheme:** `CEA-ACA-<TYPE>-<CODE>[-S<session>]`, e.g. `CEA-ACA-MAN-OFF-001`,
  `CEA-ACA-NOTE-OFF-001-S3`.
- **Versioning:** `MAJOR.MINOR`. Drafts of a new course are `1.0 — Draft` until pilot; corrections
  after pilot bump MINOR; structural re-writes bump MAJOR.
- **Publication statuses** (used on the site and in the LMS):
  - **Outline** — topics and objectives only. Not a complete note.
  - **Lesson note** — full explanations, examples and practical instructions (Section 5.1 of the
    master template).
  - **Complete lesson package** — lesson note + practice activity + assessment. Only this status may
    be presented to students as final.

## Printing / PDF export

The source of truth is Markdown. To render printable, A4 versions (for print or browser
"Save as PDF"):

```bash
npm run academic:print
```

This builds self-contained HTML files into `academic/print/` with page numbers, document IDs in the
page footer and an index page. `academic/print/` is generated output — do not edit or commit it;
edit the Markdown and re-run the generator.

## Adding or updating a course

1. Copy the master template sections (don't freestyle).
2. Keep session content aligned with the published catalogue entry in `src/data/academy/catalog.ts`
   (slug, fee, duration, session titles and topics must match the website).
3. Mark publication status honestly. Do not label a note "Complete lesson package" if it lacks a
   practice activity and an assessment.
4. Run `npm run academic:print` and review the output before asking for sign-off.
5. Reviewed-by and approved-by fields stay empty until the academy reviews the package —
   do not self-approve academic content.
