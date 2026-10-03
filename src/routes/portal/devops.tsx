import { createFileRoute } from "@/lib/next-compat/route-definition";
import { PortalPage, type PortalConfig } from "@/components/app/portal-page";

const config: PortalConfig = {
  slug: "devops",
  roleKey: "dev",
  title: "DevOps & infrastructure",
  subtitle: "Infrastructure, pipelines, observability and cost for the platform.",
};

export const Route = createFileRoute("/portal/devops")({
  head: () => ({
    meta: [{ title: "DevOps \u2014 CEA-OS" }, { name: "description", content: config.subtitle }],
  }),
  component: DevopsPortal,
});

function DevopsPortal() {
  return <PortalPage config={config} />;
}
