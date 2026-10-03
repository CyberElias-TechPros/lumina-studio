import { createFileRoute } from "@/lib/next-compat/route-definition";
import { PortalPage, type PortalConfig } from "@/components/app/portal-page";

const config: PortalConfig = {
  slug: "alumni",
  roleKey: "alumni",
  title: "Alumni portal",
  subtitle:
    "Your alumni workspace: the network, exclusive jobs, events, mentorship and giving back.",
};

export const Route = createFileRoute("/portal/alumni")({
  head: () => ({
    meta: [
      { title: "Alumni Portal \u2014 CEA-OS" },
      { name: "description", content: config.subtitle },
    ],
  }),
  component: AlumniPortal,
});

function AlumniPortal() {
  return <PortalPage config={config} />;
}
