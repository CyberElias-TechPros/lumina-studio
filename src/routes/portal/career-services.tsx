import { createFileRoute } from "@/lib/next-compat/route-definition";
import { PortalPage, type PortalConfig } from "@/components/app/portal-page";

const config: PortalConfig = {
  slug: "career-services",
  roleKey: "employer",
  title: "Career services",
  subtitle: "Placements, employer partnerships and outcomes tracking for the career services team.",
};

export const Route = createFileRoute("/portal/career-services")({
  head: () => ({
    meta: [
      { title: "Career Services \u2014 CEA-OS" },
      { name: "description", content: config.subtitle },
    ],
  }),
  component: CareerServicesPortal,
});

function CareerServicesPortal() {
  return <PortalPage config={config} />;
}
