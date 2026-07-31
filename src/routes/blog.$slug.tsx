import { createFileRoute } from "@tanstack/react-router";
import { CTASection, PageHero, PageShell } from "@/components/marketing/shell";

export const Route = createFileRoute("/blog/$slug")({
  head: () => ({
    meta: [
      { title: "Article — Cyber Elias Academy" },
      { name: "description", content: "Article at Cyber Elias Academy." },
      { property: "og:title", content: "Article — Cyber Elias Academy" },
      { property: "og:description", content: "Article at Cyber Elias Academy." },
    ],
  }),
  component: Pageblogslug,
});

function Pageblogslug() {
  return (
    <PageShell>
      <PageHero eyebrow="Article" title="Article" description="Article at Cyber Elias Academy." />
      <CTASection />
    </PageShell>
  );
}
