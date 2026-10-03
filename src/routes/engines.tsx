import { createFileRoute } from "@/lib/next-compat/route-definition";
import { redirect } from "@/lib/next-compat/router";

/**
 * The public site is about the academy, not the internal platform.
 * /engines used to market CEA-OS's five engines; that page now redirects to the
 * curriculum so old links and the historic sitemap entry keep resolving.
 */
export const Route = createFileRoute("/engines")({
  beforeLoad: () => {
    throw redirect({ to: "/classes", replace: true, code: 301 });
  },
  component: () => null,
});
