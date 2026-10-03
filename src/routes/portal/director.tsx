import { createFileRoute } from "@/lib/next-compat/route-definition";
import { PortalPage, type PortalConfig } from "@/components/app/portal-page";

const config: PortalConfig = {
  slug: "director",
  roleKey: "director",
  title: "Director portal",
  subtitle: "Executive leadership: command center, approvals, OKRs and drill-down reports.",
};

export const Route = createFileRoute("/portal/director")({
  head: () => ({
    meta: [{ title: "Director \u2014 CEA-OS" }, { name: "description", content: config.subtitle }],
  }),
  component: DirectorPortal,
});

function DirectorPortal() {
  return <PortalPage config={config} />;
}
