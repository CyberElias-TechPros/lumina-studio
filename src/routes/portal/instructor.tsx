import { createFileRoute } from "@/lib/next-compat/route-definition";
import { PortalPage, type PortalConfig } from "@/components/app/portal-page";

const config: PortalConfig = {
  slug: "instructor",
  roleKey: "instructor",
  title: "Instructor portal",
  subtitle:
    "Your teaching workspace: course builder, assignment review, gradebook, attendance and analytics.",
  spotlight: "The classroom, at your fingertips.",
  tagline:
    "Attendance, assessments and honest feedback — everything you need to run a cohort that actually finishes.",
};

export const Route = createFileRoute("/portal/instructor")({
  head: () => ({
    meta: [
      { title: "Instructor Portal \u2014 CEA-OS" },
      { name: "description", content: config.subtitle },
    ],
  }),
  component: InstructorPortal,
});

function InstructorPortal() {
  return <PortalPage config={config} />;
}
