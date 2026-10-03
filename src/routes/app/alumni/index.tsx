import { createFileRoute } from "@/lib/next-compat/route-definition";
import { redirect } from "@/lib/next-compat/router";

/** Keep the short role URL usable while the dashboard lives at /hub. */
export const Route = createFileRoute("/app/alumni/")({
  beforeLoad: () => {
    throw redirect({ to: "/app/alumni/hub" });
  },
});
