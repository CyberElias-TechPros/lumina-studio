import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { ArrowLeft, ScrollText } from "lucide-react";
import { PageShell, PageHero, CTASection, Eyebrow } from "@/components/marketing/shell";
import { WordCounter } from "@/components/tools/word-counter";
import { getPageHead } from "@/lib/seo";

export const Route = createFileRoute("/tools/word-counter")({
  head: () =>
    getPageHead({
      title: "Word Counter — Words, Characters, Reading Time",
      description:
        "Free online word counter: words, characters, sentences, paragraphs, reading and speaking time, and keyword density. Nothing you type leaves your browser.",
      path: "/tools/word-counter",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "CEA Word Counter",
        applicationCategory: "EducationalApplication",
        operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "NGN" },
      },
    }),
  component: WordCounterPage,
});

function WordCounterPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Free tool · Writing"
        title={
          <>
            Every word, <span className="font-serif text-primary font-normal italic">counted.</span>
          </>
        }
        description="Paste your essay, email or script — get instant counts, reading and speaking time, and the keywords you lean on too hard. No sign-up, nothing uploaded."
        meta={["Words & characters", "Reading / speaking time", "Keyword density"]}
      >
        <Link
          to="/tools"
          className="text-muted-foreground hover:text-foreground mt-6 inline-flex items-center gap-1.5 text-sm font-medium"
        >
          <ArrowLeft className="size-4" /> All tools
        </Link>
      </PageHero>

      <section className="container-page py-12 md:py-16" aria-label="Word counter">
        <WordCounter />
        <div className="mx-auto mt-12 max-w-3xl">
          <Eyebrow>
            <ScrollText className="size-3.5" aria-hidden="true" /> Why writers love this
          </Eyebrow>
          <ul className="text-muted-foreground mt-4 list-none space-y-2 text-sm leading-relaxed">
            <li>
              · <strong className="text-foreground">Applications &amp; CVs</strong> — hiring
              managers skim; hit the word limits and keep paragraphs under 4 lines.
            </li>
            <li>
              · <strong className="text-foreground">Reports &amp; proposals</strong> — check you
              answered the brief, not the word target.
            </li>
            <li>
              · <strong className="text-foreground">Church, NGO and business writing</strong> — if
              you speak it, time it: 130 words a minute lands a 3-minute slot exactly.
            </li>
            <li>
              · <strong className="text-foreground">Class assignments</strong> — the word count
              field our teachers ask for, without opening Word.
            </li>
          </ul>
        </div>
      </section>

      <CTASection
        title="Writing for work? Write it with us."
        description="The Digital Marketing and Content tracks teach business writing, captions and reports — plus the AI tools that draft the first version for you."
        primary={{ label: "See CEA courses", to: "/classes" }}
        secondary={{ label: "Apply for admission", to: "/apply" }}
      />
    </PageShell>
  );
}
