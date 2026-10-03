import { createFileRoute } from "@/lib/next-compat/route-definition";
import { PortalPage, type PortalConfig } from "@/components/app/portal-page";

const config: PortalConfig = {
  slug: "executive",
  roleKey: "director",
  title: "Executive dashboard",
  subtitle: "Organisation-wide KPIs, enrolment, finances and outcomes for leadership.",
};

export const Route = createFileRoute("/portal/executive")({
  head: () => ({
    meta: [
      { title: "Executive Dashboard \u2014 CEA-OS" },
      { name: "description", content: config.subtitle },
    ],
  }),
  component: ExecutivePortal,
});

function ExecutivePortal() {
  return <PortalPage config={config} />;
}
