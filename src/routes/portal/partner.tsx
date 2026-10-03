import { createFileRoute } from "@/lib/next-compat/route-definition";
import { PortalPage, type PortalConfig } from "@/components/app/portal-page";

const config: PortalConfig = {
  slug: "partner",
  roleKey: "partner",
  title: "Partner portal",
  subtitle:
    "Referrals, co-branded programmes, sponsorships and performance reports for CEA partners.",
};

export const Route = createFileRoute("/portal/partner")({
  head: () => ({
    meta: [
      { title: "Partner Portal \u2014 CEA-OS" },
      { name: "description", content: config.subtitle },
    ],
  }),
  component: PartnerPortal,
});

function PartnerPortal() {
  return <PortalPage config={config} />;
}
