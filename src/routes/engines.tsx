import { createFileRoute } from "@tanstack/react-router";
import { CTASection, PageHero, PageShell } from "@/components/marketing/shell";

export const Route = createFileRoute("/engines")({
  head: () => ({
    meta: [
      { title: "Engines — Cyber Elias Academy" },
      { name: "description", content: "The five engines of CEA-OS at Cyber Elias Academy." },
      { property: "og:title", content: "Engines — Cyber Elias Academy" },
      { property: "og:description", content: "The five engines of CEA-OS at Cyber Elias Academy." },
    ],
  }),
  component: Pageengines,
});

function Pageengines() {
  return (
    <PageShell>
      <PageHero eyebrow="Engines" title="Engines" description="The five engines of CEA-OS at Cyber Elias Academy." />
      <CTASection />
    </PageShell>
  );
}
