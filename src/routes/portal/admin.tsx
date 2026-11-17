import { createFileRoute } from "@/lib/next-compat/route-definition";
import { PortalPage, type PortalConfig } from "@/components/app/portal-page";

const config: PortalConfig = {
  slug: "admin",
  roleKey: "admin",
  title: "System administration",
  subtitle: "Users, roles, security, audit logs and system health for the platform administrator.",
  spotlight: "The keys to the kingdom — guarded.",
  tagline:
    "Users, roles, security and system health. Every lever audited, every action attributable.",
};

export const Route = createFileRoute("/portal/admin")({
  head: () => ({
    meta: [
      { title: "System Admin \u2014 CEA-OS" },
      { name: "description", content: config.subtitle },
    ],
  }),
  component: AdminPortal,
});

function AdminPortal() {
  return <PortalPage config={config} />;
}
