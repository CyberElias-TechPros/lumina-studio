import { createFileRoute } from "@tanstack/react-router";
import { CTASection, PageHero, PageShell } from "@/components/marketing/shell";

export const Route = createFileRoute("/partners")({
  head: () => ({
    meta: [
      { title: "Partners — Cyber Elias Academy" },
      { name: "description", content: "Employers, institutions and sponsors at Cyber Elias Academy." },
      { property: "og:title", content: "Partners — Cyber Elias Academy" },
      { property: "og:description", content: "Employers, institutions and sponsors at Cyber Elias Academy." },
    ],
  }),
  component: Pagepartners,
});

function Pagepartners() {
  return (
    <PageShell>
      <PageHero eyebrow="Partners" title="Partners" description="Employers, institutions and sponsors at Cyber Elias Academy." />
      <CTASection />
    </PageShell>
  );
}
