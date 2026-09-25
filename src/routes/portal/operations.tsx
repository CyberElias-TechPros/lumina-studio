import { createFileRoute } from "@tanstack/react-router";
import { PortalPage, type PortalConfig } from "@/components/app/portal-page";

const config: PortalConfig = {
  slug: "operations",
  roleKey: "ops",
  title: "Operations",
  subtitle: "Campus operations: facilities, transport, security, suppliers and daily logs.",
};

export const Route = createFileRoute("/portal/operations")({
  head: () => ({
    meta: [
      { title: "Operations \u2014 CEA-OS" },
      { name: "description", content: config.subtitle },
    ],
  }),
  component: OperationsPortal,
});

function OperationsPortal() {
  return <PortalPage config={config} />;
}
