import { createFileRoute } from "@tanstack/react-router";
import { PortalPage, type PortalConfig } from "@/components/app/portal-page";

const config: PortalConfig = {
  slug: "it-support",
  roleKey: "it",
  title: "IT support",
  subtitle: "IT support: tickets, devices, network health and hardware inventory.",
};

export const Route = createFileRoute("/portal/it-support")({
  head: () => ({
    meta: [
      { title: "IT Support \u2014 CEA-OS" },
      { name: "description", content: config.subtitle },
    ],
  }),
  component: ItSupportPortal,
});

function ItSupportPortal() {
  return <PortalPage config={config} />;
}
