import { createFileRoute } from "@/lib/next-compat/route-definition";
import { PortalPage, type PortalConfig } from "@/components/app/portal-page";

const config: PortalConfig = {
  slug: "ngo",
  roleKey: "ngo",
  title: "NGO partner workspace",
  subtitle: "NGO partner workspace: programs, beneficiaries, reports and funding.",
};

export const Route = createFileRoute("/portal/ngo")({
  head: () => ({
    meta: [
      { title: "NGO Partner \u2014 CEA-OS" },
      { name: "description", content: config.subtitle },
    ],
  }),
  component: NgoPortal,
});

function NgoPortal() {
  return <PortalPage config={config} />;
}
