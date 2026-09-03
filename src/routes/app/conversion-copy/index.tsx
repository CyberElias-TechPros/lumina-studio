import { createFileRoute, redirect } from "@tanstack/react-router";

/** Keep the short role URL usable; the Copy workspace opens on analytics. */
export const Route = createFileRoute("/app/conversion-copy/")({
  beforeLoad: () => {
    throw redirect({ to: "/app/conversion-copy/analytics" });
  },
});
