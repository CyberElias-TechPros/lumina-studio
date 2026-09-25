import { createFileRoute } from "@tanstack/react-router";
import { PortalPage, type PortalConfig } from "@/components/app/portal-page";

const config: PortalConfig = {
  slug: "parent",
  roleKey: "parent",
  title: "Parent portal",
  subtitle:
    "Track your learner's progress, attendance, bills and consent records \u2014 all in one place.",
};

export const Route = createFileRoute("/portal/parent")({
  head: () => ({
    meta: [
      { title: "Parent Portal \u2014 CEA-OS" },
      { name: "description", content: config.subtitle },
    ],
  }),
  component: ParentPortal,
});

function ParentPortal() {
  return <PortalPage config={config} />;
}
