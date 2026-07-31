import { createFileRoute } from "@tanstack/react-router";
import { CTASection, PageHero, PageShell } from "@/components/marketing/shell";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events — Cyber Elias Academy" },
      { name: "description", content: "Open days, fairs and workshops at Cyber Elias Academy." },
      { property: "og:title", content: "Events — Cyber Elias Academy" },
      { property: "og:description", content: "Open days, fairs and workshops at Cyber Elias Academy." },
    ],
  }),
  component: Pageevents,
});

function Pageevents() {
  return (
    <PageShell>
      <PageHero eyebrow="Events" title="Events" description="Open days, fairs and workshops at Cyber Elias Academy." />
      <CTASection />
    </PageShell>
  );
}
