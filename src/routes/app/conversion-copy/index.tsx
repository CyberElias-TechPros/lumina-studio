import { createFileRoute } from "@/lib/next-compat/route-definition";
import { redirect } from "@/lib/next-compat/router";

/** Keep the short role URL usable; the Copy workspace opens on analytics. */
export const Route = createFileRoute("/app/conversion-copy/")({
  beforeLoad: () => {
    throw redirect({ to: "/app/conversion-copy/analytics" });
  },
});
