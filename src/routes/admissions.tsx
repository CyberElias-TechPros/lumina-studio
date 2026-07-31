import { createFileRoute } from "@tanstack/react-router";
import { CTASection, PageHero, PageShell } from "@/components/marketing/shell";

export const Route = createFileRoute("/admissions")({
  head: () => ({
    meta: [
      { title: "Admissions — Cyber Elias Academy" },
      { name: "description", content: "Apply to a cohort at Cyber Elias Academy." },
      { property: "og:title", content: "Admissions — Cyber Elias Academy" },
      { property: "og:description", content: "Apply to a cohort at Cyber Elias Academy." },
    ],
  }),
  component: Pageadmissions,
});

function Pageadmissions() {
  return (
    <PageShell>
      <PageHero eyebrow="Admissions" title="Admissions" description="Apply to a cohort at Cyber Elias Academy." />
      <CTASection />
    </PageShell>
  );
}
