import { createFileRoute } from "@tanstack/react-router";
import { PortalPage, type PortalConfig } from "@/components/app/portal-page";

const config: PortalConfig = {
  slug: "product-marketing",
  roleKey: "product-marketing",
  title: "Product marketing",
  subtitle: "Launches, positioning, pricing and go-to-market plans.",
};

export const Route = createFileRoute("/portal/product-marketing")({
  head: () => ({
    meta: [
      { title: "Product Marketing \u2014 CEA-OS" },
      { name: "description", content: config.subtitle },
    ],
  }),
  component: ProductMarketingPortal,
});

function ProductMarketingPortal() {
  return <PortalPage config={config} />;
}
