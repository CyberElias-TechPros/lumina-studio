import { createFileRoute } from "@tanstack/react-router";
import { PortalPage, type PortalConfig } from "@/components/app/portal-page";

const config: PortalConfig = {
  slug: "employer",
  roleKey: "employer",
  title: "Employer hub",
  subtitle:
    "Post jobs, search verified talent, run interview pipelines and track hiring outcomes with CEA's employer workspace.",
};

export const Route = createFileRoute("/portal/employer")({
  head: () => ({
    meta: [
      { title: "Employer Portal \u2014 CEA-OS" },
      { name: "description", content: config.subtitle },
    ],
  }),
  component: EmployerPortal,
});

function EmployerPortal() {
  return <PortalPage config={config} />;
}
