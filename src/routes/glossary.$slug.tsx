import { createFileRoute } from "@/lib/next-compat/route-definition";
import { redirect } from "@/lib/next-compat/router";
import { glossaryDestination, isGlossaryRouteRendered } from "@/lib/legacy-public";

/**
 * Legacy glossary URLs.
 *
 * These pages used to 301 unconditionally to `/classes`, which is a course list
 * and answers none of the questions they rank for. Search Console shows 506
 * impressions and 0 clicks across 29 of them, including two top-five rankings.
 *
 * Now each term goes to the page that actually answers it. Terms with no honest
 * destination keep the neutral redirect — deliberately, because pointing them
 * somewhere merely adjacent is the same defect with a newer address.
 *
 * See `src/lib/legacy-public.ts` for the reasoning and the destination table.
 */
export const Route = createFileRoute("/glossary/$slug")({
  beforeLoad: ({ params }: { params: { slug: string } }) => {
    if (isGlossaryRouteRendered(params.slug)) return;
    throw redirect({ to: glossaryDestination(params.slug), replace: true, code: 301 });
  },
  component: () => null,
});
