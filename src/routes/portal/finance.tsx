import { createFileRoute } from "@/lib/next-compat/route-definition";
import { PortalPage, type PortalConfig } from "@/components/app/portal-page";

const config: PortalConfig = {
  slug: "finance",
  roleKey: "finance",
  title: "Finance office",
  subtitle: "Invoices, instalments, scholarships and treasury for the finance office.",
};

export const Route = createFileRoute("/portal/finance")({
  head: () => ({
    meta: [
      { title: "Finance Portal \u2014 CEA-OS" },
      { name: "description", content: config.subtitle },
    ],
  }),
  component: FinancePortal,
});

function FinancePortal() {
  return <PortalPage config={config} />;
}
