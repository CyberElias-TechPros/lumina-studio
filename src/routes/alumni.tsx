import { createFileRoute } from "@tanstack/react-router";
import { CTASection, PageHero, PageShell } from "@/components/marketing/shell";

export const Route = createFileRoute("/alumni")({
  head: () => ({
    meta: [
      { title: "Alumni — Cyber Elias Academy" },
      { name: "description", content: "The network after graduation at Cyber Elias Academy." },
      { property: "og:title", content: "Alumni — Cyber Elias Academy" },
      { property: "og:description", content: "The network after graduation at Cyber Elias Academy." },
    ],
  }),
  component: Pagealumni,
});

function Pagealumni() {
  return (
    <PageShell>
      <PageHero eyebrow="Alumni" title="Alumni" description="The network after graduation at Cyber Elias Academy." />
      <CTASection />
    </PageShell>
  );
}
