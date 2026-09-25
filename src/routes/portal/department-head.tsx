import { createFileRoute } from "@tanstack/react-router";
import { PortalPage, type PortalConfig } from "@/components/app/portal-page";

const config: PortalConfig = {
  slug: "department-head",
  roleKey: "department",
  title: "Department head",
  subtitle: "Programme oversight, curriculum approvals and faculty reviews.",
};

export const Route = createFileRoute("/portal/department-head")({
  head: () => ({
    meta: [
      { title: "Department Head \u2014 CEA-OS" },
      { name: "description", content: config.subtitle },
    ],
  }),
  component: DepartmentHeadPortal,
});

function DepartmentHeadPortal() {
  return <PortalPage config={config} />;
}
