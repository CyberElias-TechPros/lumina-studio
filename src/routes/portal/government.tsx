import { createFileRoute } from "@tanstack/react-router";
import { PortalPage, type PortalConfig } from "@/components/app/portal-page";

const config: PortalConfig = {
  slug: "government",
  roleKey: "government",
  title: "Government partner",
  subtitle: "Government partner workspace: compliance, accreditations and impact reporting.",
};

export const Route = createFileRoute("/portal/government")({
  head: () => ({
    meta: [
      { title: "Government \u2014 CEA-OS" },
      { name: "description", content: config.subtitle },
    ],
  }),
  component: GovernmentPortal,
});

function GovernmentPortal() {
  return <PortalPage config={config} />;
}
