import { createFileRoute } from "@tanstack/react-router";
import { CTASection, PageHero, PageShell } from "@/components/marketing/shell";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Cyber Elias Academy" },
      { name: "description", content: "The story of Cyber Elias Academy at Cyber Elias Academy." },
      { property: "og:title", content: "About — Cyber Elias Academy" },
      { property: "og:description", content: "The story of Cyber Elias Academy at Cyber Elias Academy." },
    ],
  }),
  component: Pageabout,
});

function Pageabout() {
  return (
    <PageShell>
      <PageHero eyebrow="About" title="About" description="The story of Cyber Elias Academy at Cyber Elias Academy." />
      <CTASection />
    </PageShell>
  );
}
