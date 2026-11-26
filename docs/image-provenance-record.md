# Image provenance: what is recorded, and what is still owed

Updated 2026-11-25, after the site owner confirmed the imagery situation.

## The plain statement

| Directory | Files | Status | Basis |
|---|---|---|---|
| `/images/campus/` | 7 | **owned** — real photographs | Visually verified. Real learners, real hardware, genuine whiteboard. |
| `/images/team/` | 3 | **owner-supplied** — real portraits | Founder portrait visually verified as authentic, not synthetic. |
| `/images/courses/` | 22 | **generated** (AI) | Stated by the owner. |
| `/images/blog/` | 439 | **generated** (AI) | Stated by the owner; visual check agrees. |
| `/images/classes/` | 2 | **generated** (AI) | Stated by the owner. |
| `/images/products/` | 3 | **generated** (AI) | Stated by the owner. |

Before this record the registry called the AI-generated set `owner-supplied`, which
was a claim about rights rather than about origin. It is now recorded for what it
is. `npm run audit:images` reports **zero unknown files** and exits clean.

## Why this was worth fixing even though it "passed"

The audit was passing, and that was the problem. `owner-supplied` means "the file
was delivered by the Academy and the rights still need confirming". For 471 files
that was true in a narrow legal sense and wrong in every way that matters to a
reader: it implied the images were photographs of something, without recording
that they were generated. An audit that passes on a technicality is worse than one
that fails, because nobody looks again.

## What is still owed — and this is the real gap

**No generation record exists for any image.** The registry now says `generated`,
which is honest about origin but is not enough to defend the set. For each image
(or each generation batch) a reviewer may reasonably ask:

1. **Which tool** produced it — name and version.
2. **On what date.**
3. **Under which terms** — specifically whether commercial use and the intended
   AdSense monetisation are permitted by that tool's licence.
4. **What the prompt asked for**, where the image could be mistaken for a
   photograph of a real place or person.

None of that is recoverable from the repository. It has to come from whoever ran
the generations. Until it does, this is an *acknowledged* gap, not a closed one.

## The disclosure rule this creates

Generated imagery is not prohibited on an AdSense site. Presenting it as
documentary is. These are the rules that now apply, and they are what the copy on
the site must be checked against:

- A blog figure or course cover **depicts a subject**. It must never be captioned
  or alt-texted as if it were CEA's campus, staff, learners or a real outcome.
- `/images/campus/` and `/images/team/` are the only directories that may be
  presented as documentary. They are verified.
- `/images/products/` is the sharpest risk: if a generated render is shown to a
  shopper as the item they will receive, it must be labelled. Shopping
  misrepresentation is a separate and harsher policy than content quality.
- Alt text should describe what is in the picture and not imply a provenance it
  does not have. "A row of office doors" is fine. "Our office doors" is a claim.

## The asset this analysis surfaced

The seven campus photographs are the most valuable things on the property that
nobody is using well. Every competitor in this market illustrates with the same
generated stock. A real classroom at 24 Ebony Road, with real learners on real
machines, is the one thing that cannot be duplicated — and it is currently 7 files
out of 481, used on one section of the homepage.

If effort goes anywhere in the image folder, it should go into making more of
those, not into generating more of the other kind.
