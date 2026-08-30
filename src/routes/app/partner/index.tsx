import { createFileRoute, redirect } from "@tanstack/react-router";

/** Keep the short role URL usable while the dashboard lives at /hub. */
export const Route = createFileRoute("/app/partner/")({
  beforeLoad: () => {
    throw redirect({ to: "/app/partner/hub" });
  },
});
