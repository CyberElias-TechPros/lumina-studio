import { createFileRoute } from "@tanstack/react-router";
import { PortalPage, type PortalConfig } from "@/components/app/portal-page";

const config: PortalConfig = {
  slug: "growth",
  roleKey: "growth",
  title: "Growth",
  subtitle: "Acquisition loops, referral programs and cohort experiments.",
};

export const Route = createFileRoute("/portal/growth")({
  head: () => ({
    meta: [{ title: "Growth \u2014 CEA-OS" }, { name: "description", content: config.subtitle }],
  }),
  component: GrowthPortal,
});

function GrowthPortal() {
  return <PortalPage config={config} />;
}
