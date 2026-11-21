import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { ArrowLeft, Compass, LayoutGrid } from "lucide-react";
import { PageShell, PageHero, CTASection, Eyebrow } from "@/components/marketing/shell";
import { CssLayoutLab } from "@/components/tools/css-layout-lab";
import { getPageHead } from "@/lib/seo";

export const Route = createFileRoute("/tools/css-layout-lab")({
  head: () =>
    getPageHead({
      title: "CEA CSS Layout Lab — Flexbox & CSS Grid Trainer",
      description:
        "Learn CSS Flexbox and CSS Grid visually in your browser: live property explorer, copyable CSS output and 8 progressive layout puzzles for Web Design students.",
      path: "/tools/css-layout-lab",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "CEA CSS Layout Lab",
        applicationCategory: "EducationalApplication",
        operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "NGN" },
      },
    }),
  component: CssLayoutLabPage,
});

function CssLayoutLabPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Free lab · Web Design"
        title={
          <>
            Stop guessing CSS.{" "}
            <span className="font-serif text-primary font-normal italic">See every axis.</span>
          </>
        }
        description="Switch between Flexbox and CSS Grid, adjust alignment and gaps in real time, copy clean production CSS, and solve eight layout puzzles built for modern responsive interfaces."
        meta={["Flexbox explorer", "CSS Grid explorer", "8 graded puzzles"]}
      >
        <Link
          to="/tools"
          className="text-muted-foreground hover:text-foreground mt-6 inline-flex items-center gap-1.5 text-sm font-medium"
        >
          <ArrowLeft className="size-4" /> All tools
        </Link>
      </PageHero>

      <section className="container-page py-12 md:py-16" aria-label="CSS Layout Lab">
        <CssLayoutLab />

        <div className="mx-auto mt-14 grid max-w-5xl gap-8 md:grid-cols-2">
          <div className="border-foreground/10 bg-card rounded-2xl border p-6">
            <Eyebrow>
              <Compass className="size-3.5" aria-hidden="true" /> Flexbox vs CSS Grid
            </Eyebrow>
            <h2 className="font-display mt-3 text-2xl font-semibold tracking-tight">
              When to reach for Flex, and when to reach for Grid
            </h2>
            <div className="text-muted-foreground mt-4 space-y-3 text-sm leading-relaxed">
              <p>
                <strong className="text-foreground">
                  Choose Flexbox for one-dimensional flow:
                </strong>{" "}
                navigation bars, button rows, icon-plus-label pairs, and wrapping tag pills. Flex
                excels when the content&apos;s own width should help decide spacing.
              </p>
              <p>
                <strong className="text-foreground">
                  Choose CSS Grid for two-dimensional structure:
                </strong>{" "}
                course catalogues, dashboard panels, pricing comparisons, and sidebar-plus-main
                shells. Grid lets you define columns first with <code>1fr</code> and{" "}
                <code>minmax()</code> so cards line up neatly without extra wrapper divs.
              </p>
              <p>
                <strong className="text-foreground">Combine them freely:</strong> a page shell can
                use Grid for its columns while the navbar inside the header uses Flexbox.
              </p>
              <p>
                <strong className="text-foreground">Why 1fr beats percentages:</strong> setting{" "}
                <code>width: 33.33%</code> breaks as soon as you add a <code>gap: 16px</code>,
                forcing horizontal scrollbars on phones. Grid&apos;s <code>1fr</code> subtracts the
                gap first and shares only the leftover track cleanly.
              </p>
            </div>
          </div>

          <div className="border-foreground/10 bg-card rounded-2xl border p-6">
            <Eyebrow>
              <LayoutGrid className="size-3.5" aria-hidden="true" /> If it goes wrong
            </Eyebrow>
            <h2 className="font-display mt-3 text-2xl font-semibold tracking-tight">
              Why alignment properties sometimes do nothing
            </h2>
            <div className="text-muted-foreground mt-4 space-y-3 text-sm leading-relaxed">
              <p>
                <strong className="text-foreground">Missing container height:</strong>{" "}
                <code>align-items: center</code> moves items along the vertical axis, so if the
                container is only as tall as its children, there is no spare room to centre within.
              </p>
              <p>
                <strong className="text-foreground">Axis swap on flex-direction: column:</strong>{" "}
                when you switch to column, <code>justify-content</code> controls vertical spacing
                and <code>align-items</code> controls horizontal alignment — the exact opposite of
                row mode.
              </p>
              <p>
                <strong className="text-foreground">Overflow on small Android phones:</strong> pair{" "}
                <code>flex-wrap: wrap</code> or <code>minmax(220px, 1fr)</code> with{" "}
                <code>gap</code> so three-column desktop cards stack cleanly into one column on
                360px screens without forcing users to pinch-zoom.
              </p>
              <p>
                <strong className="text-foreground">Test your layouts in code:</strong> take any
                snippet you copy here into{" "}
                <Link
                  to="/tools/code-studio"
                  className="text-primary font-semibold hover:underline"
                >
                  CEA Code Studio
                </Link>{" "}
                or study layout fundamentals in our{" "}
                <Link
                  to="/classes/web-design"
                  className="text-primary font-semibold hover:underline"
                >
                  Web Design course
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Turn layout skills into client-ready interfaces."
        description="CEA Web Design teaches typography, responsive Flexbox/Grid systems, Figma wireframing and accessible UI craft across guided projects."
        primary={{ label: "Explore Web Design", to: "/classes/web-design" }}
        secondary={{ label: "Open Code Studio", to: "/tools/code-studio" }}
      />
    </PageShell>
  );
}
