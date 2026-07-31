import { createFileRoute } from "@tanstack/react-router";
import { CTASection, PageHero, PageShell } from "@/components/marketing/shell";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Cyber Elias Academy" },
      { name: "description", content: "Tuition and payment options at Cyber Elias Academy." },
      { property: "og:title", content: "Pricing — Cyber Elias Academy" },
      { property: "og:description", content: "Tuition and payment options at Cyber Elias Academy." },
    ],
  }),
  component: Pagepricing,
});

function Pagepricing() {
  return (
    <PageShell>
      <PageHero eyebrow="Pricing" title="Pricing" description="Tuition and payment options at Cyber Elias Academy." />
      <CTASection />
    </PageShell>
  );
}
