import { createFileRoute } from "@tanstack/react-router";
import { PortalPage, type PortalConfig } from "@/components/app/portal-page";

const config: PortalConfig = {
  slug: "behavioral-designer",
  roleKey: "behavioral-design",
  title: "Behavioral design",
  subtitle: "Nudges, funnels and experiments that shape learner behaviour.",
};

export const Route = createFileRoute("/portal/behavioral-designer")({
  head: () => ({
    meta: [
      { title: "Behavioral Designer \u2014 CEA-OS" },
      { name: "description", content: config.subtitle },
    ],
  }),
  component: BehavioralDesignerPortal,
});

function BehavioralDesignerPortal() {
  return <PortalPage config={config} />;
}
