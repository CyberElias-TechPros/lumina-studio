import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { ArrowRight, CheckCircle2, Mail, ShieldQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CTASection, PageHero, PageShell } from "@/components/marketing/shell";
import {
  corrections,
  correctionsOpened,
  CORRECTIONS_POLICY,
  REVIEW_CYCLE_DAYS,
  REVIEWED_LESSONS,
} from "@/data/editorial";
import { getPageHead } from "@/lib/seo";

export const Route = createFileRoute("/editorial/corrections")({
  head: () =>
    getPageHead({
      title: "Corrections log and review record",
      description:
        "How to report an error in Cyber Elias Academy's free lessons, our response times, and the dated record of reviews and corrections we have published.",
      path: "/editorial/corrections",
    }),
  component: CorrectionsPage,
});

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

function CorrectionsPage() {
  const opened = formatDate(correctionsOpened);

  return (
    <PageShell>
      <PageHero
        eyebrow="Corrections and review"
        title="If a lesson is wrong, we want to know"
        description="A teaching page that has quietly gone out of date is worse than no page. This is how to report an error, how quickly we respond, and the public record of what we have reviewed and corrected."
      >
        <div className="mt-7 flex flex-wrap gap-3">
          <Button asChild>
            <a href={`mailto:${CORRECTIONS_POLICY.route}?subject=Correction%20to%20a%20lesson`}>
              Report a correction <Mail className="ml-2 size-4" />
            </a>
          </Button>
          <Button asChild variant="outline">
            <Link to="/editorial/changelog">
              Change log <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
      </PageHero>

      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.3fr_0.7fr] md:py-20">
        <div className="space-y-12">
          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              Corrections published
            </h2>
            {corrections.length === 0 ? (
              <div className="border-border bg-muted/35 mt-4 rounded-xl border p-6">
                <div className="flex items-start gap-3">
                  <ShieldQuestion
                    className="text-primary mt-0.5 size-5 shrink-0"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-semibold">No corrections outstanding.</p>
                    <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                      This log was opened on {opened} and is empty. That is a statement about our
                      records, not a claim that every page is perfect: it means nothing has been
                      reported and confirmed since the log opened. When something is fixed, the
                      entry stays here permanently, with what changed and why.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <ol className="mt-4 space-y-6">
                {corrections.map((entry) => (
                  <li key={`${entry.date}-${entry.page}`} className="border-border border-l pl-5">
                    <time dateTime={entry.date} className="text-muted-foreground font-mono text-xs">
                      {formatDate(entry.date)}
                    </time>
                    <h3 className="font-display mt-1 text-lg font-semibold">
                      {entry.href ? (
                        <Link to={entry.href} className="hover:underline">
                          {entry.page}
                        </Link>
                      ) : (
                        entry.page
                      )}
                    </h3>
                    <p className="text-foreground/80 mt-2 text-sm leading-relaxed">{entry.what}</p>
                    <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                      Why: {entry.why}
                    </p>
                    {entry.verification ? (
                      <p className="text-muted-foreground mt-1 text-sm">
                        Check it: {entry.verification}
                      </p>
                    ) : null}
                  </li>
                ))}
              </ol>
            )}
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              Lessons reviewed by a named person
            </h2>
            <p className="text-muted-foreground mt-3 text-base leading-relaxed">
              Every lesson is scheduled for review every {REVIEW_CYCLE_DAYS} days. A lesson appears
              in this list only after a person has actually read it, checked the steps and signed
              their name to it.{" "}
              {REVIEWED_LESSONS.length === 0
                ? "No lesson has completed that cycle yet, so this list is empty and no lesson claims a reviewer."
                : `${REVIEWED_LESSONS.length} lesson${REVIEWED_LESSONS.length === 1 ? "" : "s"} completed that cycle so far.`}
            </p>
            {REVIEWED_LESSONS.length > 0 ? (
              <ul className="mt-4 space-y-3">
                {REVIEWED_LESSONS.map((lesson) => (
                  <li key={lesson.slug} className="text-sm">
                    <Link to={`/blog/${lesson.slug}`} className="text-primary hover:underline">
                      {lesson.slug.replace(/-/g, " ")}
                    </Link>{" "}
                    <span className="text-muted-foreground">
                      — reviewed by {lesson.reviewer} on {formatDate(lesson.reviewedAt ?? "")}
                    </span>
                  </li>
                ))}
              </ul>
            ) : null}
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              What to report, and what happens next
            </h2>
            <p className="text-muted-foreground mt-3 text-base leading-relaxed">
              {CORRECTIONS_POLICY.responseWindow}
            </p>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <h3 className="text-foreground text-sm font-semibold tracking-wide uppercase">
                  Worth a record
                </h3>
                <ul className="mt-3 space-y-2">
                  {CORRECTIONS_POLICY.whatCounts.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm leading-relaxed">
                      <CheckCircle2
                        className="text-primary mt-0.5 size-4 shrink-0"
                        aria-hidden="true"
                      />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-foreground text-sm font-semibold tracking-wide uppercase">
                  Fixed without an entry
                </h3>
                <ul className="mt-3 space-y-2">
                  {CORRECTIONS_POLICY.whatDoesNot.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm leading-relaxed">
                      <CheckCircle2
                        className="text-muted-foreground mt-0.5 size-4 shrink-0"
                        aria-hidden="true"
                      />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>

        <aside className="h-fit space-y-6 md:sticky md:top-24">
          <div className="border-border bg-muted/35 rounded-xl border p-6">
            <p className="text-primary text-xs font-semibold tracking-[0.14em] uppercase">
              Report an error
            </p>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
              Tell us the lesson title and the step that is wrong. A screenshot helps, but a
              sentence is enough.
            </p>
            <a
              href={`mailto:${CORRECTIONS_POLICY.route}?subject=Correction%20to%20a%20lesson`}
              className="text-primary mt-3 inline-block text-sm font-semibold break-all hover:underline"
            >
              {CORRECTIONS_POLICY.route}
            </a>
          </div>
          <div className="border-border rounded-xl border p-6">
            <p className="text-primary text-xs font-semibold tracking-[0.14em] uppercase">
              Related
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link to="/editorial" className="text-primary hover:underline">
                  Editorial standards
                </Link>
              </li>
              <li>
                <Link to="/editorial/changelog" className="text-primary hover:underline">
                  Change log
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-primary hover:underline">
                  The notes
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </div>

      <CTASection
        title="Prefer to ask a person?"
        description="Corrections, fees, dates or which course fits — write to us and a human answers during opening hours."
        primary={{ label: "Contact us", to: "/contact" }}
        secondary={{ label: "See the courses", to: "/classes" }}
      />
    </PageShell>
  );
}
