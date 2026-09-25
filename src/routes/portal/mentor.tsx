import { createFileRoute } from "@tanstack/react-router";
import { PortalPage, type PortalConfig } from "@/components/app/portal-page";

const config: PortalConfig = {
  slug: "mentor",
  roleKey: "mentor",
  title: "Mentor portal",
  subtitle:
    "Your mentorship workspace: mentees, session scheduling, check-ins and development plans.",
};

export const Route = createFileRoute("/portal/mentor")({
  head: () => ({
    meta: [
      { title: "Mentor Portal \u2014 CEA-OS" },
      { name: "description", content: config.subtitle },
    ],
  }),
  component: MentorPortal,
});

function MentorPortal() {
  return <PortalPage config={config} />;
}
