import { createFileRoute } from "@tanstack/react-router";
import { PortalPage, type PortalConfig } from "@/components/app/portal-page";

const config: PortalConfig = {
  slug: "intern",
  roleKey: "intern",
  title: "Intern workspace",
  subtitle: "Intern portal: projects, milestones, mentorship and evaluations.",
};

export const Route = createFileRoute("/portal/intern")({
  head: () => ({
    meta: [{ title: "Intern \u2014 CEA-OS" }, { name: "description", content: config.subtitle }],
  }),
  component: InternPortal,
});

function InternPortal() {
  return <PortalPage config={config} />;
}
