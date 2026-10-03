import { createFileRoute } from "@/lib/next-compat/route-definition";
import { PortalPage, type PortalConfig } from "@/components/app/portal-page";

const config: PortalConfig = {
  slug: "student",
  roleKey: "student",
  title: "Student portal",
  subtitle:
    "Your student workspace: learning hub, assignments, grades, finance, portfolio, marketplace and more.",
};

export const Route = createFileRoute("/portal/student")({
  head: () => ({
    meta: [
      { title: "Student Portal \u2014 CEA-OS" },
      { name: "description", content: config.subtitle },
    ],
  }),
  component: StudentPortal,
});

function StudentPortal() {
  return <PortalPage config={config} />;
}
