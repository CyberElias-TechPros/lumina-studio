import { createFileRoute } from "@/lib/next-compat/route-definition";
import { PortalPage, type PortalConfig } from "@/components/app/portal-page";

const config: PortalConfig = {
  slug: "student",
  roleKey: "student",
  title: "Student portal",
  subtitle:
    "Your student workspace: learning hub, assignments, grades, finance, portfolio, marketplace and more.",
  spotlight: "Your desk is set — sessions, grades and goals in one orbit.",
  tagline:
    "Pick up where you left off: today’s session, outstanding tasks, and proof of progress toward your certificate.",
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
