import { createFileRoute } from "@/lib/next-compat/route-definition";
import { PortalPage, type PortalConfig } from "@/components/app/portal-page";

const config: PortalConfig = {
  slug: "accountant",
  roleKey: "finance",
  title: "Accounting",
  subtitle: "Accounting: receivables, payables, budgets and reconciliation.",
};

export const Route = createFileRoute("/portal/accountant")({
  head: () => ({
    meta: [
      { title: "Accounting \u2014 CEA-OS" },
      { name: "description", content: config.subtitle },
    ],
  }),
  component: AccountantPortal,
});

function AccountantPortal() {
  return <PortalPage config={config} />;
}
