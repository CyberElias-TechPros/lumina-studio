import { createFileRoute } from "@tanstack/react-router";
import { CTASection, PageHero, PageShell } from "@/components/marketing/shell";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Community — Cyber Elias Academy" },
      { name: "description", content: "Forums, groups and culture at Cyber Elias Academy." },
      { property: "og:title", content: "Community — Cyber Elias Academy" },
      { property: "og:description", content: "Forums, groups and culture at Cyber Elias Academy." },
    ],
  }),
  component: Pagecommunity,
});

function Pagecommunity() {
  return (
    <PageShell>
      <PageHero eyebrow="Community" title="Community" description="Forums, groups and culture at Cyber Elias Academy." />
      <CTASection />
    </PageShell>
  );
}
