import { createFileRoute } from "@tanstack/react-router";
import { CTASection, PageHero, PageShell } from "@/components/marketing/shell";

export const Route = createFileRoute("/auth/sign-up")({
  head: () => ({
    meta: [
      { title: "Create account — Cyber Elias Academy" },
      { name: "description", content: "Join CEA-OS at Cyber Elias Academy." },
      { property: "og:title", content: "Create account — Cyber Elias Academy" },
      { property: "og:description", content: "Join CEA-OS at Cyber Elias Academy." },
    ],
  }),
  component: Pageauthsignup,
});

function Pageauthsignup() {
  return (
    <PageShell>
      <PageHero eyebrow="Create account" title="Create account" description="Join CEA-OS at Cyber Elias Academy." />
      <CTASection />
    </PageShell>
  );
}
