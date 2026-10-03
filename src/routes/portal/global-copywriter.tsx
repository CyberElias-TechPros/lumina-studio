import { createFileRoute } from "@/lib/next-compat/route-definition";
import { PortalPage, type PortalConfig } from "@/components/app/portal-page";

const config: PortalConfig = {
  slug: "global-copywriter",
  roleKey: "localization",
  title: "Global copy",
  subtitle: "Localized, market-fit copy for Nigerian and global audiences.",
};

export const Route = createFileRoute("/portal/global-copywriter")({
  head: () => ({
    meta: [
      { title: "Global Copywriter \u2014 CEA-OS" },
      { name: "description", content: config.subtitle },
    ],
  }),
  component: GlobalCopywriterPortal,
});

function GlobalCopywriterPortal() {
  return <PortalPage config={config} />;
}
