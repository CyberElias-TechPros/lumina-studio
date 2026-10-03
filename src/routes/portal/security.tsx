import { createFileRoute } from "@/lib/next-compat/route-definition";
import { PortalPage, type PortalConfig } from "@/components/app/portal-page";

const config: PortalConfig = {
  slug: "security",
  roleKey: "it",
  title: "Security operations",
  subtitle: "Threat monitoring, access reviews and incident response for the security team.",
};

export const Route = createFileRoute("/portal/security")({
  head: () => ({
    meta: [
      { title: "Security Operations \u2014 CEA-OS" },
      { name: "description", content: config.subtitle },
    ],
  }),
  component: SecurityPortal,
});

function SecurityPortal() {
  return <PortalPage config={config} />;
}
