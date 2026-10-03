import { createFileRoute } from "@/lib/next-compat/route-definition";
import { PortalPage, type PortalConfig } from "@/components/app/portal-page";

const config: PortalConfig = {
  slug: "hr",
  roleKey: "hr",
  title: "People & HR",
  subtitle: "People operations: onboarding, attendance, leave, performance and culture.",
};

export const Route = createFileRoute("/portal/hr")({
  head: () => ({
    meta: [
      { title: "People & HR \u2014 CEA-OS" },
      { name: "description", content: config.subtitle },
    ],
  }),
  component: HrPortal,
});

function HrPortal() {
  return <PortalPage config={config} />;
}
