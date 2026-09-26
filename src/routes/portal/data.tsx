import { createFileRoute } from "@tanstack/react-router";
import { PortalPage, type PortalConfig } from "@/components/app/portal-page";

const config: PortalConfig = {
  slug: "data",
  roleKey: "admin",
  title: "Data & analytics",
  subtitle: "Reports, cohorts analytics and data quality for the data office.",
};

export const Route = createFileRoute("/portal/data")({
  head: () => ({
    meta: [
      { title: "Data & Analytics \u2014 CEA-OS" },
      { name: "description", content: config.subtitle },
    ],
  }),
  component: DataPortal,
});

function DataPortal() {
  return <PortalPage config={config} />;
}
