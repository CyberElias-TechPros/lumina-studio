import { createFileRoute } from "@tanstack/react-router";
import { PortalPage, type PortalConfig } from "@/components/app/portal-page";

const config: PortalConfig = {
  slug: "registrar",
  roleKey: "admissions",
  title: "Registrar's office",
  subtitle:
    "Student records, cohort management, transcripts and verifications for the Registrar's office.",
};

export const Route = createFileRoute("/portal/registrar")({
  head: () => ({
    meta: [
      { title: "Registrar Portal \u2014 CEA-OS" },
      { name: "description", content: config.subtitle },
    ],
  }),
  component: RegistrarPortal,
});

function RegistrarPortal() {
  return <PortalPage config={config} />;
}
