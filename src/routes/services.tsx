import { createFileRoute } from "@tanstack/react-router";
import { CTASection, PageHero, PageShell } from "@/components/marketing/shell";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Cyber Elias Academy" },
      { name: "description", content: "What our studio builds for clients at Cyber Elias Academy." },
      { property: "og:title", content: "Services — Cyber Elias Academy" },
      { property: "og:description", content: "What our studio builds for clients at Cyber Elias Academy." },
    ],
  }),
  component: Pageservices,
});

function Pageservices() {
  return (
    <PageShell>
      <PageHero eyebrow="Services" title="Services" description="What our studio builds for clients at Cyber Elias Academy." />
      <CTASection />
    </PageShell>
  );
}
