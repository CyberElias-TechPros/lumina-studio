import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { ArrowRight, CalendarClock, CircleDot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CTASection, PageHero, PageShell } from "@/components/marketing/shell";
import { changelog, changelogTotals, EDITORIAL_TOTALS, REVIEW_CYCLE_DAYS } from "@/data/editorial";
import { getPageHead } from "@/lib/seo";

export const Route = createFileRoute("/editorial/changelog")({
  head: () =>
    getPageHead({
      title: "Change log — what we add, revise, merge and retire",
      description:
        "A dated record of the work done on Cyber Elias Academy's free learning notes: new lessons, revisions, merged pages, retired pages and corrections.",
      path: "/editorial/changelog",
    }),
  component: Changelog,
});

const KIND_LABEL: Record<string, string> = {
  published: "Published",
  revised: "Revised",
  merged: "Merged",
  retired: "Retired",
  correction: "Correction",
  infrastructure: "Site work",
};

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

function Changelog() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Editorial record"
        title="What changed, and when"
        description="Anyone can say a site is maintained. This is the dated record: what we published, what we revised, what we merged, what we retired, and what we corrected. It is public so it can be checked."
      >
        <div className="mt-7 flex flex-wrap gap-3">
          <Button asChild variant="outline">
            <Link to="/editorial">
              Editorial standards <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/editorial/corrections">
              Corrections log <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
      </PageHero>

      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_0.6fr] md:py-20">
        <ol className="space-y-8">
          {changelog.map((entry, index) => (
            <li
              key={`${entry.date}-${index}`}
              className="border-border relative border-l pl-6 md:pl-8"
            >
              <span
                className="border-border bg-background absolute top-1 -left-[7px] flex size-3.5 items-center justify-center rounded-full border"
                aria-hidden="true"
              >
                <span className="bg-primary size-1.5 rounded-full" />
              </span>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <time
                  dateTime={entry.date}
                  className="text-muted-foreground font-mono text-xs tracking-wide"
                >
                  {formatDate(entry.date)}
                </time>
                <span className="bg-primary/10 text-primary rounded-full px-2.5 py-0.5 text-xs font-semibold">
                  {KIND_LABEL[entry.kind] ?? entry.kind}
                </span>
              </div>

              <h2 className="font-display mt-2 text-xl font-semibold tracking-tight">
                {entry.title}
              </h2>
              <p className="text-muted-foreground mt-2 text-base leading-relaxed">{entry.detail}</p>

              {entry.affected?.length ? (
                <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium">
                  {entry.affected.map((item) => (
                    <li key={item.label}>
                      {item.href ? (
                        <Link to={item.href} className="text-primary hover:underline">
                          {item.label}
                        </Link>
                      ) : (
                        <span className="text-muted-foreground">{item.label}</span>
                      )}
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ol>

        <aside className="h-fit space-y-6 md:sticky md:top-24">
          <div className="border-border bg-muted/35 rounded-xl border p-6">
            <p className="text-primary text-xs font-semibold tracking-[0.14em] uppercase">
              The schedule
            </p>
            <div className="mt-3 flex items-start gap-3">
              <CalendarClock className="text-primary mt-0.5 size-5 shrink-0" aria-hidden="true" />
              <p className="text-muted-foreground text-sm leading-relaxed">
                Every lesson is scheduled for review every {REVIEW_CYCLE_DAYS} days. A lesson shows
                a named reviewer only after a person has read and checked it — we do not stamp
                review dates onto pages nobody opened.
              </p>
            </div>
            <div className="border-border mt-5 border-t pt-4">
              <p className="text-foreground text-sm font-semibold">What these dates are</p>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                Each entry is the day a change was published. The lesson corpus itself does not
                carry per-lesson publication days before 26 October 2026 — we did not record them,
                so we do not show them. What we can show is the span: 26 lessons were live at the 24
                August 2026 audit and the series was complete by 24 October 2026.
              </p>
            </div>
            <dl className="mt-5 grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-muted-foreground">Lessons</dt>
                <dd className="font-display text-foreground text-2xl font-semibold">
                  {EDITORIAL_TOTALS.lessons}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Reviewed</dt>
                <dd className="font-display text-foreground text-2xl font-semibold">
                  {EDITORIAL_TOTALS.reviewed}
                </dd>
              </div>
            </dl>
          </div>

          <div className="border-border rounded-xl border p-6">
            <p className="text-primary text-xs font-semibold tracking-[0.14em] uppercase">
              This log in numbers
            </p>
            <ul className="text-muted-foreground mt-3 space-y-2 text-sm">
              {Object.entries(changelogTotals)
                .filter(([, count]) => count > 0)
                .map(([kind, count]) => (
                  <li key={kind} className="flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-2">
                      <CircleDot className="size-3.5" aria-hidden="true" />
                      {KIND_LABEL[kind] ?? kind}
                    </span>
                    <span className="text-foreground font-mono text-xs">{count}</span>
                  </li>
                ))}
            </ul>
          </div>
        </aside>
      </div>

      <CTASection
        title="Spotted something that needs changing?"
        description="Corrections are the most useful message we receive. Tell us the page and what is wrong; we publish the fix and record it in the log."
        primary={{ label: "Read the corrections policy", to: "/editorial/corrections" }}
        secondary={{ label: "Browse the notes", to: "/blog" }}
      />
    </PageShell>
  );
}
