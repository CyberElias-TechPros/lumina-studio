import { createFileRoute, Link } from "@tanstack/react-router";
import { getPageHead } from "@/lib/seo";
import { PageShell, PageHero, SectionHeading } from "@/components/marketing/shell";
import { Reveal } from "@/components/motion";

export const Route = createFileRoute("/accessibility")({
  head: () =>
    getPageHead({
      title: "Accessibility Statement",
      description:
        "Cyber Elias Academy's commitment to digital accessibility. Our conformance level, known limitations, and how to report issues.",
      path: "/accessibility",
      type: "article",
    }),
  component: AccessibilityPage,
});

function AccessibilityPage() {
  const lastUpdated = "August 10, 2025";
  const conformanceLevel = "WCAG 2.1 AA";

  return (
    <PageShell>
      <PageHero
        eyebrow="Legal"
        title="Accessibility Statement"
        description={`Last updated: ${lastUpdated}. We are committed to making our platform usable by everyone. This statement outlines our conformance target, known issues, and how to request accommodations.`}
      />
      <section className="container-page py-20 md:py-28">
        <div className="max-w-3xl space-y-12">
          <Reveal>
            <SectionHeading
              title="Conformance Status"
              description="Our target and current standing against international standards."
            />
            <div className="grid gap-6 md:grid-cols-2">
              <div className="bg-card border rounded-2xl p-6">
                <h3 className="font-display text-lg font-bold">Target Standard</h3>
                <p className="text-primary mt-2 text-2xl font-extrabold">{conformanceLevel}</p>
                <p className="text-muted-foreground mt-2 text-sm">
                  Web Content Accessibility Guidelines 2.1 Level AA
                </p>
              </div>
              <div className="bg-card border rounded-2xl p-6">
                <h3 className="font-display text-lg font-bold">Current Status</h3>
                <p className="text-primary mt-2 text-2xl font-extrabold">Partially Conformant</p>
                <p className="text-muted-foreground mt-2 text-sm">
                  Most pages meet AA; some third-party embeds and legacy content have known gaps
                  (see below)
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <SectionHeading
              title="What we do well"
              description="Areas where we meet or exceed WCAG 2.1 AA."
            />
            <ul className="space-y-3 list-disc list-inside text-muted-foreground">
              <li>Semantic HTML5 landmarks (header, main, footer, nav, section, article)</li>
              <li>Heading hierarchy (h1–h6) with no skipped levels</li>
              <li>Colour contrast ratios ≥ 4.5:1 for text, ≥ 3:1 for UI components</li>
              <li>Focus visible on all interactive elements (custom focus rings)</li>
              <li>Keyboard navigation: all functionality reachable and operable via keyboard</li>
              <li>ARIA labels and roles where native HTML is insufficient</li>
              <li>Alt text for all informative images; decorative images marked with alt=""</li>
              <li>
                Form labels associated with inputs; error messages linked via aria-describedby
              </li>
              <li>Skip-to-main-content link as first focusable element</li>
              <li>Responsive text sizing up to 200% without loss of content/function</li>
              <li>Reduced-motion support via prefers-reduced-motion media query</li>
              <li>Language of page and parts identified (lang attributes)</li>
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <SectionHeading
              title="Known Limitations"
              description="Areas where we are actively working to improve."
            />
            <ul className="space-y-3 list-disc list-inside text-muted-foreground">
              <li>
                <strong>Third-party embeds:</strong> Some video players (YouTube, Vimeo), calendar
                widgets, and payment iframes may not fully meet AA. We provide accessible
                alternatives where possible.
              </li>
              <li>
                <strong>Data visualisations:</strong> Interactive charts (Recharts) rely on colour
                and hover states. We are adding tabular data fallbacks and pattern fills.
              </li>
              <li>
                <strong>Legacy PDFs:</strong> Older curriculum PDFs may lack tagging. Newer
                documents are created as tagged PDFs.
              </li>
              <li>
                <strong>Live captions:</strong> Live cohort sessions use auto-generated captions
                (accuracy ~85%). Human-edited captions are provided for recordings within 48 hours.
              </li>
              <li>
                <strong>Complex drag-and-drop:</strong> Some curriculum builder interfaces require
                mouse. Keyboard alternatives are being added.
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.15}>
            <SectionHeading
              title="Assistive Technology Compatibility"
              description="Tested combinations where we verify core flows."
            />
            <ul className="space-y-3 list-disc list-inside text-muted-foreground">
              <li>NVDA 2024.x + Firefox 128+ (Windows)</li>
              <li>JAWS 2024 + Chrome 128+ (Windows)</li>
              <li>VoiceOver + Safari 17+ (macOS/iOS)</li>
              <li>TalkBack + Chrome 128+ (Android)</li>
              <li>Dragon NaturallySpeaking 16 (voice control)</li>
              <li>Keyboard-only navigation (no screen reader)</li>
            </ul>
          </Reveal>

          <Reveal delay={0.2}>
            <SectionHeading
              title="Testing and Evaluation"
              description="How we measure and maintain accessibility."
            />
            <ul className="space-y-3 list-disc list-inside text-muted-foreground">
              <li>
                Automated: axe-core in CI on every pull request (zero critical/high violations
                required to merge)
              </li>
              <li>
                Manual: quarterly expert audits covering core user journeys (apply, learn, submit,
                certify)
              </li>
              <li>User testing: annual sessions with students who use assistive technology</li>
              <li>Regression: smoke tests on every release for focus order, landmarks, contrast</li>
            </ul>
          </Reveal>

          <Reveal delay={0.25}>
            <SectionHeading
              title="Reporting Issues and Requesting Accommodations"
              description="We want to know when something doesn't work for you."
            />
            <p className="text-muted-foreground leading-relaxed">
              If you encounter an accessibility barrier, need an alternative format, or require a
              reasonable accommodation, please contact us:
            </p>
            <div className="mt-4 space-y-2 text-muted-foreground">
              <p>
                Email:{" "}
                <a href="mailto:accessibility@cea.ng" className="text-primary underline">
                  accessibility@cea.ng
                </a>
              </p>
              <p>Phone/WhatsApp: +234 905 862 8386</p>
              <p>
                Form:{" "}
                <Link to="/contact" className="text-primary underline">
                  Contact page
                </Link>{" "}
                (select "Accessibility")
              </p>
            </div>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              We aim to acknowledge reports within 2 business days and provide a remediation
              timeline within 10 business days.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <SectionHeading
              title="Ongoing Work (Roadmap)"
              description="Planned improvements for the next 12 months."
            />
            <ul className="space-y-3 list-disc list-inside text-muted-foreground">
              <li>Full keyboard equivalents for all drag-and-drop interfaces (Q3 2025)</li>
              <li>Human-edited captions for all live sessions (Q4 2025)</li>
              <li>Tagged PDF regeneration for all legacy curriculum (Q4 2025)</li>
              <li>High-contrast theme toggle (Q1 2026)</li>
              <li>Sign-language interpreter option for live sessions (pilot Q1 2026)</li>
              <li>
                Accessibility conformance audit by third-party specialist (annual, next Q2 2026)
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.35}>
            <SectionHeading
              title="Legal References"
              description="Standards and regulations that inform our approach."
            />
            <ul className="space-y-3 list-disc list-inside text-muted-foreground">
              <li>WCAG 2.1 Level AA (W3C Recommendation)</li>
              <li>
                Nigeria Discrimination Against Persons with Disabilities (Prohibition) Act, 2018
              </li>
              <li>EN 301 549 v3.2.1 (European accessibility standard for ICT)</li>
              <li>Section 508 (US Rehabilitation Act) — for international partners</li>
            </ul>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="bg-muted/50 border rounded-2xl p-6 text-center">
              <p className="font-display text-lg font-bold">Feedback makes us better.</p>
              <p className="text-muted-foreground mt-2">
                If something isn't accessible, it's a bug. Please tell us.
              </p>
              <div className="mt-4">
                <a
                  href="mailto:accessibility@cea.ng"
                  className="inline-flex items-center gap-2 text-primary underline font-medium hover:text-primary/80"
                >
                  Email accessibility@cea.ng
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
