import { createFileRoute } from "@tanstack/react-router";
import { CTASection, PageHero, PageShell } from "@/components/marketing/shell";

export const Route = createFileRoute("/app/")({
  head: () => ({
    meta: [
      { title: "Dashboards — Cyber Elias Academy" },
      { name: "description", content: "Role dashboards at Cyber Elias Academy." },
      { property: "og:title", content: "Dashboards — Cyber Elias Academy" },
      { property: "og:description", content: "Role dashboards at Cyber Elias Academy." },
    ],
  }),
  component: Pageappindex,
});

function Pageappindex() {
  return (
    <PageShell>
      <PageHero eyebrow="Dashboards" title="Dashboards" description="Role dashboards at Cyber Elias Academy." />
      <CTASection />
    </PageShell>
  );
}
