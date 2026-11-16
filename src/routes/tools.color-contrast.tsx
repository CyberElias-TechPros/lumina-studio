import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { ArrowLeft, Palette } from "lucide-react";
import { PageShell, PageHero, CTASection, Eyebrow } from "@/components/marketing/shell";
import { ColorContrast } from "@/components/tools/color-contrast";
import { getPageHead } from "@/lib/seo";

export const Route = createFileRoute("/tools/color-contrast")({
  head: () =>
    getPageHead({
      title: "Colour Contrast Checker & Palette Generator — WCAG",
      description:
        "Free WCAG contrast checker with live preview and designer presets, plus a harmony palette generator (complement, analogous, split-complement, tints and shades) with one-click copy.",
      path: "/tools/color-contrast",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "CEA Colour Contrast & Palette",
        applicationCategory: "DesignApplication",
        operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "NGN" },
      },
    }),
  component: ColorContrastPage,
});

function ColorContrastPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Free tool · Design"
        title={
          <>
            Contrast people{" "}
            <span className="font-serif text-primary font-normal italic">can read.</span>
          </>
        }
        description="The checker every poster, flyer, slide deck and site should pass: WCAG AA and AAA contrast, designer presets — and a harmony palette builder for when you are choosing, not just checking."
        meta={["WCAG AA / AAA", "Live preview", "Harmony palettes"]}
      >
        <Link
          to="/tools"
          className="text-muted-foreground hover:text-foreground mt-6 inline-flex items-center gap-1.5 text-sm font-medium"
        >
          <ArrowLeft className="size-4" /> All tools
        </Link>
      </PageHero>

      <section
        className="container-page py-12 md:py-16"
        aria-label="Colour contrast and palette tool"
      >
        <ColorContrast />

        <div className="mx-auto mt-12 max-w-3xl">
          <Eyebrow>
            <Palette className="size-3.5" aria-hidden="true" /> Where this earns its keep
          </Eyebrow>
          <ul className="text-muted-foreground mt-4 list-none space-y-2 text-sm leading-relaxed">
            <li>
              · <strong className="text-foreground">Graphic-design projects</strong> — grade your
              own poster before submission; the class rule is AA at 4.5:1.
            </li>
            <li>
              · <strong className="text-foreground">Church and NGO materials</strong> — projection
              screens punish low contrast; test before printing flyers.
            </li>
            <li>
              · <strong className="text-foreground">Social graphics</strong> — captions overlaying
              photos need a background scrim, not hope.
            </li>
            <li>
              · <strong className="text-foreground">Websites</strong> — automatic compliance for
              Nigeria&apos;s accessibility-aware clients.
            </li>
          </ul>
        </div>
      </section>

      <CTASection
        title="Design is taught here, properly."
        description="The Graphic Design track at CEA covers typography, colour theory, brand systems and production — with real client briefs and a portfolio to prove it."
        primary={{ label: "See the Design track", to: "/classes" }}
        secondary={{ label: "Apply for admission", to: "/apply" }}
      />
    </PageShell>
  );
}
