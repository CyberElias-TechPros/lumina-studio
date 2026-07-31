import { createFileRoute } from "@tanstack/react-router";
import { CTASection, PageHero, PageShell } from "@/components/marketing/shell";

export const Route = createFileRoute("/programs/$slug")({
  head: () => ({
    meta: [
      { title: "Program — Cyber Elias Academy" },
      { name: "description", content: "Program detail at Cyber Elias Academy." },
      { property: "og:title", content: "Program — Cyber Elias Academy" },
      { property: "og:description", content: "Program detail at Cyber Elias Academy." },
    ],
  }),
  component: Pageprogramsslug,
});

function Pageprogramsslug() {
  return (
    <PageShell>
      <PageHero eyebrow="Program" title="Program" description="Program detail at Cyber Elias Academy." />
      <CTASection />
    </PageShell>
  );
}
