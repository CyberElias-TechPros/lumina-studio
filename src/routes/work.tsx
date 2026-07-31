import { createFileRoute } from "@tanstack/react-router";
import { CTASection, PageHero, PageShell } from "@/components/marketing/shell";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Case studies — Cyber Elias Academy" },
      { name: "description", content: "Selected client work at Cyber Elias Academy." },
      { property: "og:title", content: "Case studies — Cyber Elias Academy" },
      { property: "og:description", content: "Selected client work at Cyber Elias Academy." },
    ],
  }),
  component: Pagework,
});

function Pagework() {
  return (
    <PageShell>
      <PageHero eyebrow="Case studies" title="Case studies" description="Selected client work at Cyber Elias Academy." />
      <CTASection />
    </PageShell>
  );
}
