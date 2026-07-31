import { createFileRoute } from "@tanstack/react-router";
import { CTASection, PageHero, PageShell } from "@/components/marketing/shell";

export const Route = createFileRoute("/auth/sign-in")({
  head: () => ({
    meta: [
      { title: "Sign in — Cyber Elias Academy" },
      { name: "description", content: "Sign in to CEA-OS at Cyber Elias Academy." },
      { property: "og:title", content: "Sign in — Cyber Elias Academy" },
      { property: "og:description", content: "Sign in to CEA-OS at Cyber Elias Academy." },
    ],
  }),
  component: Pageauthsignin,
});

function Pageauthsignin() {
  return (
    <PageShell>
      <PageHero eyebrow="Sign in" title="Sign in" description="Sign in to CEA-OS at Cyber Elias Academy." />
      <CTASection />
    </PageShell>
  );
}
