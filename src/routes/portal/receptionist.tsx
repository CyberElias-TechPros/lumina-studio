import { createFileRoute } from "@/lib/next-compat/route-definition";
import { PortalPage, type PortalConfig } from "@/components/app/portal-page";

const config: PortalConfig = {
  slug: "receptionist",
  roleKey: "receptionist",
  title: "Reception desk",
  subtitle: "Front desk: visitor check-in, visitor requests, calls and desk handover.",
};

export const Route = createFileRoute("/portal/receptionist")({
  head: () => ({
    meta: [
      { title: "Reception Desk \u2014 CEA-OS" },
      { name: "description", content: config.subtitle },
    ],
  }),
  component: ReceptionistPortal,
});

function ReceptionistPortal() {
  return <PortalPage config={config} />;
}
