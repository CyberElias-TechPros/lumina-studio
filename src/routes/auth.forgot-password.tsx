import { createFileRoute } from "@tanstack/react-router";
import { CTASection, PageHero, PageShell } from "@/components/marketing/shell";

export const Route = createFileRoute("/auth/forgot-password")({
  head: () => ({
    meta: [
      { title: "Reset password — Cyber Elias Academy" },
      { name: "description", content: "Reset your password at Cyber Elias Academy." },
      { property: "og:title", content: "Reset password — Cyber Elias Academy" },
      { property: "og:description", content: "Reset your password at Cyber Elias Academy." },
    ],
  }),
  component: Pageauthforgotpassword,
});

function Pageauthforgotpassword() {
  return (
    <PageShell>
      <PageHero eyebrow="Reset password" title="Reset password" description="Reset your password at Cyber Elias Academy." />
      <CTASection />
    </PageShell>
  );
}
