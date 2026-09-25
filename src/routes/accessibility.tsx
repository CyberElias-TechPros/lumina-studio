import { createFileRoute, Link } from "@tanstack/react-router";
import { getPageHead } from "@/lib/seo";
import { PageShell, PageHero, SectionHeading } from "@/components/marketing/shell";
import { Reveal } from "@/components/motion";

export const Route = createFileRoute("/accessibility")({
  head: () =>
    getPageHead({
      title: "Accessibility Statement",
      description: "How we try to make cea.ng usable, what still fails, and how to tell us.",
      path: "/accessibility",
      type: "article",
    }),
  component: AccessibilityPage,
});

function AccessibilityPage() {
  const lastUpdated = "20 September 2026";

  return (
    <PageShell>
      <PageHero
        eyebrow="Legal"
        title="Accessibility Statement"
        description={`Last updated: ${lastUpdated}. We want this site to be usable with a keyboard, a screen reader, and a larger text size. This page says what we aim for and how to report a barrier.`}
      />
      <section className="container-page py-16 md:py-24">
        <div className="max-w-3xl space-y-12">
          <Reveal>
            <SectionHeading
              title="Aim"
              description="We work toward WCAG 2.1 Level AA. We are not claiming a full audit."
            />
            <p className="text-muted-foreground leading-relaxed">
              Public pages use semantic HTML, a skip-to-content link, visible focus, and captions on
              informative images. We have not paid for a third-party accessibility audit, and we do
              not claim that every page passes AA.
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <SectionHeading title="What should work" />
            <ul className="text-muted-foreground list-inside list-disc space-y-2">
              <li>Skip link to the main content</li>
              <li>Headings in order on public pages</li>
              <li>Forms with labels</li>
              <li>Keyboard access to the main navigation and forms</li>
              <li>Alt text on classroom and notes photographs</li>
              <li>Respect for reduced-motion settings where we animate</li>
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <SectionHeading title="Known limits" />
            <ul className="text-muted-foreground list-inside list-disc space-y-2">
              <li>
                Third-party scripts (sign-in, analytics, Google ads) are not fully under our
                control.
              </li>
              <li>
                Some tools in the signed-in learner area still need a mouse for drag-and-drop.
              </li>
              <li>Classroom photographs are real photos; contrast in the room varies.</li>
            </ul>
          </Reveal>

          <Reveal delay={0.15}>
            <SectionHeading title="Tell us" />
            <p className="text-muted-foreground leading-relaxed">
              If something blocks you, email{" "}
              <a href="mailto:hello@cea.ng" className="text-primary underline">
                hello@cea.ng
              </a>{" "}
              or use the{" "}
              <Link to="/contact" className="text-primary underline">
                contact form
              </Link>{" "}
              (topic: Accessibility). Phone: +234 905 862 8386. We aim to acknowledge reports within
              two working days.
            </p>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
