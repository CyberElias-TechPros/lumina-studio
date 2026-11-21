import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { ArrowLeft, Code2, ShieldCheck } from "lucide-react";
import { PageShell, PageHero, CTASection, Eyebrow } from "@/components/marketing/shell";
import { CodeStudio } from "@/components/tools/code-studio";
import { getPageHead } from "@/lib/seo";

export const Route = createFileRoute("/tools/code-studio")({
  head: () =>
    getPageHead({
      title: "CEA Code Studio — Free HTML, CSS & JavaScript Sandbox",
      description:
        "Practise HTML, CSS and JavaScript in an isolated browser sandbox with Mobile/Tablet/Desktop viewports, live console output and 6 guided web challenges from Cyber Elias Academy.",
      path: "/tools/code-studio",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "CEA Code Studio",
        applicationCategory: "EducationalApplication",
        operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "NGN" },
      },
    }),
  component: CodeStudioPage,
});

function CodeStudioPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Free lab · Web & Code"
        title={
          <>
            Write HTML, CSS &amp; JS.{" "}
            <span className="font-serif text-primary font-normal italic">See it work.</span>
          </>
        }
        description="An isolated browser sandbox for beginners and intermediate web learners: edit code on the left, test mobile and desktop widths on the right, inspect console output and complete six guided challenges."
        meta={["HTML · CSS · JS", "Isolated iframe sandbox", "Works offline"]}
      >
        <Link
          to="/tools"
          className="text-muted-foreground hover:text-foreground mt-6 inline-flex items-center gap-1.5 text-sm font-medium"
        >
          <ArrowLeft className="size-4" /> All tools
        </Link>
      </PageHero>

      <section className="container-page py-12 md:py-16" aria-label="CEA Code Studio workspace">
        <CodeStudio />

        <div className="mx-auto mt-14 grid max-w-5xl gap-8 md:grid-cols-2">
          <div className="border-foreground/10 bg-card rounded-2xl border p-6">
            <Eyebrow>
              <Code2 className="size-3.5" aria-hidden="true" /> How to practise effectively
            </Eyebrow>
            <h2 className="font-display mt-3 text-2xl font-semibold tracking-tight">
              Three habits that separate real developers from tutorial watchers
            </h2>
            <div className="text-muted-foreground mt-4 space-y-3 text-sm leading-relaxed">
              <p>
                <strong className="text-foreground">1. Break the code on purpose.</strong> After
                passing a challenge, change a property or remove a closing tag and watch what the
                preview and console say. Learning how browsers fail teaches you twice as fast as
                copying working snippets.
              </p>
              <p>
                <strong className="text-foreground">2. Test on the 375px Mobile viewport.</strong>{" "}
                Over three-quarters of visitors to Nigerian small-business websites arrive on a
                phone screen over mobile data. Switch to Mobile view before declaring any layout
                finished.
              </p>
              <p>
                <strong className="text-foreground">3. Export and open locally.</strong> Click{" "}
                <em>Export .html</em> to save your work as a standalone web page you can open in
                Chrome or Edge even when NEPA takes power or your data bundle runs out.
              </p>
            </div>
          </div>

          <div className="border-foreground/10 bg-card rounded-2xl border p-6">
            <Eyebrow>
              <ShieldCheck className="size-3.5" aria-hidden="true" /> If it goes wrong &amp; safety
            </Eyebrow>
            <h2 className="font-display mt-3 text-2xl font-semibold tracking-tight">
              Common mistakes and how the sandbox protects you
            </h2>
            <div className="text-muted-foreground mt-4 space-y-3 text-sm leading-relaxed">
              <p>
                <strong className="text-foreground">
                  Nothing updates after typing JavaScript:
                </strong>{" "}
                check the Console strip below the editor for red syntax errors — a missing bracket
                or misspelled <code>getElementById</code> stops the rest of the script from running.
              </p>
              <p>
                <strong className="text-foreground">CSS rule seems ignored:</strong> verify there is
                a semicolon <code>;</code> at the end of the line directly above it, and check that
                your class name in HTML matches the dot selector in CSS.
              </p>
              <p>
                <strong className="text-foreground">Safe isolation by design:</strong> your preview
                renders inside a restricted <code>sandbox=&quot;allow-scripts&quot;</code> frame
                with no access to CEA session cookies or local accounts, and nothing leaves your
                browser.
              </p>
            </div>
            <p className="text-muted-foreground mt-5 border-t pt-4 text-sm">
              Ready for structured mentorship? Read{" "}
              <Link
                to="/classes/web-development/semantic-html"
                className="text-primary font-semibold hover:underline"
              >
                Semantic HTML (Session 1)
              </Link>{" "}
              or explore the full{" "}
              <Link
                to="/classes/web-development"
                className="text-primary font-semibold hover:underline"
              >
                Web Development course
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <CTASection
        title="Build real websites with a teacher in the room."
        description="CEA Web Development and Web Design cover semantic HTML, responsive CSS, JavaScript, Git and live deployment across real Nigerian client briefs."
        primary={{ label: "See Web Development", to: "/classes/web-development" }}
        secondary={{ label: "Compare all courses", to: "/classes" }}
      />
    </PageShell>
  );
}
