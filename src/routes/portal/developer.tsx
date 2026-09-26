import { createFileRoute } from "@tanstack/react-router";
import { PortalPage, type PortalConfig } from "@/components/app/portal-page";

const config: PortalConfig = {
  slug: "developer",
  roleKey: "dev",
  title: "Developer workspace",
  subtitle: "Deployments, issues, feature flags and API health for the engineering team.",
};

export const Route = createFileRoute("/portal/developer")({
  head: () => ({
    meta: [
      { title: "Developer Portal \u2014 CEA-OS" },
      { name: "description", content: config.subtitle },
    ],
  }),
  component: DeveloperPortal,
});

function DeveloperPortal() {
  return <PortalPage config={config} />;
}
