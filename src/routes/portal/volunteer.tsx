import { createFileRoute } from "@tanstack/react-router";
import { PortalPage, type PortalConfig } from "@/components/app/portal-page";

const config: PortalConfig = {
  slug: "volunteer",
  roleKey: "volunteer",
  title: "Volunteer hub",
  subtitle: "Volunteer portal: shifts, events, hours logged and community impact.",
};

export const Route = createFileRoute("/portal/volunteer")({
  head: () => ({
    meta: [{ title: "Volunteer \u2014 CEA-OS" }, { name: "description", content: config.subtitle }],
  }),
  component: VolunteerPortal,
});

function VolunteerPortal() {
  return <PortalPage config={config} />;
}
