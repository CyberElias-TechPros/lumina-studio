import { createFileRoute } from "@/lib/next-compat/route-definition";
import { PortalPage, type PortalConfig } from "@/components/app/portal-page";

const config: PortalConfig = {
  slug: "quality",
  roleKey: "department",
  title: "Quality assurance",
  subtitle: "Course reviews, audits, learner feedback and accreditation for the QA office.",
};

export const Route = createFileRoute("/portal/quality")({
  head: () => ({
    meta: [
      { title: "Quality Assurance \u2014 CEA-OS" },
      { name: "description", content: config.subtitle },
    ],
  }),
  component: QualityPortal,
});

function QualityPortal() {
  return <PortalPage config={config} />;
}
