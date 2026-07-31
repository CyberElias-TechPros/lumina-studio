import { createFileRoute } from "@tanstack/react-router";
import { CTASection, PageHero, PageShell } from "@/components/marketing/shell";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Insights — Cyber Elias Academy" },
      { name: "description", content: "Writing from the academy at Cyber Elias Academy." },
      { property: "og:title", content: "Insights — Cyber Elias Academy" },
      { property: "og:description", content: "Writing from the academy at Cyber Elias Academy." },
    ],
  }),
  component: Pageblogindex,
});

function Pageblogindex() {
  return (
    <PageShell>
      <PageHero eyebrow="Insights" title="Insights" description="Writing from the academy at Cyber Elias Academy." />
      <CTASection />
    </PageShell>
  );
}
