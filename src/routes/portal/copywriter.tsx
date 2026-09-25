import { createFileRoute } from "@tanstack/react-router";
import { PortalPage, type PortalConfig } from "@/components/app/portal-page";

const config: PortalConfig = {
  slug: "copywriter",
  roleKey: "conversion-copy",
  title: "Conversion copy",
  subtitle: "Copy briefs, drafts and A/B tests for the conversion team.",
};

export const Route = createFileRoute("/portal/copywriter")({
  head: () => ({
    meta: [
      { title: "Conversion Copywriter \u2014 CEA-OS" },
      { name: "description", content: config.subtitle },
    ],
  }),
  component: CopywriterPortal,
});

function CopywriterPortal() {
  return <PortalPage config={config} />;
}
