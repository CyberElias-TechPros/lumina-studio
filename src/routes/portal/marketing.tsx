import { createFileRoute } from "@/lib/next-compat/route-definition";
import { PortalPage, type PortalConfig } from "@/components/app/portal-page";

const config: PortalConfig = {
  slug: "marketing",
  roleKey: "marketing",
  title: "Marketing",
  subtitle: "Marketing: campaigns, leads, content calendar and channel performance.",
};

export const Route = createFileRoute("/portal/marketing")({
  head: () => ({
    meta: [{ title: "Marketing \u2014 CEA-OS" }, { name: "description", content: config.subtitle }],
  }),
  component: MarketingPortal,
});

function MarketingPortal() {
  return <PortalPage config={config} />;
}
