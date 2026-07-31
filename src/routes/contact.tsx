import { createFileRoute } from "@tanstack/react-router";
import { CTASection, PageHero, PageShell } from "@/components/marketing/shell";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Cyber Elias Academy" },
      { name: "description", content: "Talk to the academy at Cyber Elias Academy." },
      { property: "og:title", content: "Contact — Cyber Elias Academy" },
      { property: "og:description", content: "Talk to the academy at Cyber Elias Academy." },
    ],
  }),
  component: Pagecontact,
});

function Pagecontact() {
  return (
    <PageShell>
      <PageHero eyebrow="Contact" title="Contact" description="Talk to the academy at Cyber Elias Academy." />
      <CTASection />
    </PageShell>
  );
}
