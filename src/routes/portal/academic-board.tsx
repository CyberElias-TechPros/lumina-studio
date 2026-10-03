import { createFileRoute } from "@/lib/next-compat/route-definition";
import { PortalPage, type PortalConfig } from "@/components/app/portal-page";

const config: PortalConfig = {
  slug: "academic-board",
  roleKey: "department",
  title: "Academic board",
  subtitle: "Curriculum, examinations and academic standards for the Academic Board.",
};

export const Route = createFileRoute("/portal/academic-board")({
  head: () => ({
    meta: [
      { title: "Academic Board \u2014 CEA-OS" },
      { name: "description", content: config.subtitle },
    ],
  }),
  component: AcademicBoardPortal,
});

function AcademicBoardPortal() {
  return <PortalPage config={config} />;
}
