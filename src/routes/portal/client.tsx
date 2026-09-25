import { createFileRoute } from "@tanstack/react-router";
import { PortalPage, type PortalConfig } from "@/components/app/portal-page";

const config: PortalConfig = {
  slug: "client",
  roleKey: "client",
  title: "Client portal",
  subtitle:
    "Track your services projects, deliverables, invoices and support tickets in one place.",
};

export const Route = createFileRoute("/portal/client")({
  head: () => ({
    meta: [
      { title: "Client Portal \u2014 CEA-OS" },
      { name: "description", content: config.subtitle },
    ],
  }),
  component: ClientPortal,
});

function ClientPortal() {
  return <PortalPage config={config} />;
}
