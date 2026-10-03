import { createFileRoute } from "@/lib/next-compat/route-definition";
import { PortalPage, type PortalConfig } from "@/components/app/portal-page";

const config: PortalConfig = {
  slug: "supplier",
  roleKey: "supplier",
  title: "Supplier workspace",
  subtitle: "Supplier portal: purchase orders, deliveries, invoices and catalog.",
};

export const Route = createFileRoute("/portal/supplier")({
  head: () => ({
    meta: [{ title: "Supplier \u2014 CEA-OS" }, { name: "description", content: config.subtitle }],
  }),
  component: SupplierPortal,
});

function SupplierPortal() {
  return <PortalPage config={config} />;
}
