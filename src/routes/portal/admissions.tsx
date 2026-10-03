import { createFileRoute } from "@/lib/next-compat/route-definition";
import { PortalPage, type PortalConfig } from "@/components/app/portal-page";

const config: PortalConfig = {
  slug: "admissions",
  roleKey: "admissions",
  title: "Admissions office",
  subtitle: "Application pipeline, assessments and offers for the admissions team.",
};

export const Route = createFileRoute("/portal/admissions")({
  head: () => ({
    meta: [
      { title: "Admissions Portal \u2014 CEA-OS" },
      { name: "description", content: config.subtitle },
    ],
  }),
  component: AdmissionsPortal,
});

function AdmissionsPortal() {
  return <PortalPage config={config} />;
}
