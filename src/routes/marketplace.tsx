import { createFileRoute } from "@tanstack/react-router";
import { CTASection, PageHero, PageShell } from "@/components/marketing/shell";

export const Route = createFileRoute("/marketplace")({
  head: () => ({
    meta: [
      { title: "Marketplace — Cyber Elias Academy" },
      { name: "description", content: "Jobs and freelance gigs at Cyber Elias Academy." },
      { property: "og:title", content: "Marketplace — Cyber Elias Academy" },
      { property: "og:description", content: "Jobs and freelance gigs at Cyber Elias Academy." },
    ],
  }),
  component: Pagemarketplace,
});

function Pagemarketplace() {
  return (
    <PageShell>
      <PageHero eyebrow="Marketplace" title="Marketplace" description="Jobs and freelance gigs at Cyber Elias Academy." />
      <CTASection />
    </PageShell>
  );
}
