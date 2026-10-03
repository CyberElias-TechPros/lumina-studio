import { createFileRoute } from "@/lib/next-compat/route-definition";
import { PortalPage, type PortalConfig } from "@/components/app/portal-page";

const config: PortalConfig = {
  slug: "visual-designer",
  roleKey: "design",
  title: "Visual & UX design",
  subtitle: "Design system, component library and experience quality.",
};

export const Route = createFileRoute("/portal/visual-designer")({
  head: () => ({
    meta: [
      { title: "Visual & UX Designer \u2014 CEA-OS" },
      { name: "description", content: config.subtitle },
    ],
  }),
  component: VisualDesignerPortal,
});

function VisualDesignerPortal() {
  return <PortalPage config={config} />;
}
