import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { ArrowRight, BookOpenCheck, Mail, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CTASection, PageHero, PageShell } from "@/components/marketing/shell";
import { NOTES_AUTHOR } from "@/data/blog";
import { getPageHead } from "@/lib/seo";

export const Route = createFileRoute("/editorial")({
  head: () =>
    getPageHead({
      title: "How we make and maintain learning notes",
      description:
        "Who is responsible for Cyber Elias Academy's free computer-skills notes, how to use the learning scenarios, and how to report a correction or outdated step.",
      path: "/editorial",
    }),
  component: EditorialStandards,
});

function EditorialStandards() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Editorial approach"
        title="Useful notes, clear ownership, honest updates"
        description="These pages are a free practice library for people learning everyday computer and digital-work skills. Here is who is responsible for them, what the examples mean, and how to help us correct a step that no longer works."
      >
        <div className="mt-7 flex flex-wrap gap-3">
          <Button asChild>
            <a href="mailto:help@cea.ng?subject=Correction%20to%20a%20Cyber%20Elias%20Academy%20lesson">
              Report a correction <Mail className="ml-2 size-4" />
            </a>
          </Button>
          <Button asChild variant="outline">
            <Link to="/blog">
              Browse the notes <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
      </PageHero>

      <div className="container-page grid gap-10 py-14 md:grid-cols-[0.7fr_1.3fr] md:py-20">
        <aside className="h-fit rounded-xl border border-border bg-muted/35 p-6 md:sticky md:top-24">
          <p className="text-primary text-xs font-semibold tracking-[0.14em] uppercase">
            Responsible editor
          </p>
          <p className="font-display mt-3 text-xl font-semibold">{NOTES_AUTHOR.name}</p>
          <p className="text-muted-foreground mt-1 text-sm">{NOTES_AUTHOR.role}</p>
          <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
            The Academy publishes the notes under its own name and is responsible for reviewing
            corrections and updating its teaching material.
          </p>
          <Link
            to="/team"
            className="text-primary mt-4 inline-flex items-center gap-2 text-sm font-semibold hover:underline"
          >
            Meet the team <ArrowRight className="size-4" />
          </Link>
        </aside>

        <div className="space-y-12">
          <section>
            <div className="flex items-center gap-3">
              <BookOpenCheck className="text-primary size-5" aria-hidden="true" />
              <h2 className="font-display text-2xl font-semibold tracking-tight">
                What the notes are for
              </h2>
            </div>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed">
              The series is designed for learners who want to practise a small, useful task at a
              time: finding a file, preparing a document, working with a spreadsheet, using online
              services more carefully, or deciding what skill to learn next. Lessons are grouped by
              topic and learning order so a reader can follow a path or search for one task.
            </p>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed">
              The free notes support self-study; they do not replace a supervised class, a qualified
              technician, or instructions from a bank, government agency, software maker or other
              official service. Screens and procedures can vary by device, software version and
              account.
            </p>
          </section>

          <section>
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-primary size-5" aria-hidden="true" />
              <h2 className="font-display text-2xl font-semibold tracking-tight">
                How to read lesson examples
              </h2>
            </div>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed">
              Short learner stories in the lessons illustrate a task or a common point of confusion.
              They are not offered as testimonials, verified placement records, or evidence of
              measured learner outcomes. The Academy does not promise a job, income, certification
              from an outside body, or a particular result from reading a note or taking a course.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              Corrections and maintenance
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed">
              Software menus, online forms, safety guidance, fees and schedules can change. We do
              not assign a routine review date that has not happened: a lesson shows a “Last
              reviewed” date only when a review date has been recorded for that page. A missing date
              means we do not have a recorded review date to display; it is not a guarantee that
              every detail is current.
            </p>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed">
              If a step is unclear, outdated or unsafe, email us with the lesson title or link, the
              device and app version if you know them, and what happened. Please remove names and
              other personal information from screenshots. Never send passwords, PINs, one-time
              codes, card details or private learner records.
            </p>
            <a
              href="mailto:help@cea.ng?subject=Correction%20to%20a%20Cyber%20Elias%20Academy%20lesson&body=Lesson%20title%20or%20URL%3A%0ADevice%20and%20app%20version%20(if%20known)%3A%0AWhat%20needs%20correction%3A%0A"
              className="text-primary mt-5 inline-flex items-center gap-2 text-sm font-semibold underline underline-offset-4"
            >
              Email the editorial team <Mail className="size-4" />
            </a>
          </section>

          <section className="border-border rounded-xl border bg-muted/25 p-6">
            <h2 className="font-display text-xl font-semibold">A useful next step</h2>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              Compare a free lesson with the practical classes: each course page lists its fee,
              duration, entry requirements, session outlines and published class notes.
            </p>
            <Link
              to="/classes"
              className="text-primary mt-4 inline-flex items-center gap-2 text-sm font-semibold hover:underline"
            >
              Compare courses <ArrowRight className="size-4" />
            </Link>
          </section>
        </div>
      </div>

      <CTASection
        title="Questions about a class?"
        description="Admissions can confirm current course fees, dates and requirements before you apply."
        primary={{ label: "Contact the Academy", to: "/contact" }}
        secondary={{ label: "View courses", to: "/classes" }}
      />
    </PageShell>
  );
}
