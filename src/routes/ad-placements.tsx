import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { CheckCircle2, CircleSlash, Eye, ShieldCheck } from "lucide-react";
import { PageHero, PageShell } from "@/components/marketing/shell";
import { getPageHead } from "@/lib/seo";
import { AD_ELIGIBLE_PREFIXES, AD_SLOTS, primarySlotForPath } from "@/lib/ads/slots";
import { NGADVERTS } from "@/lib/ads/ngadverts";

/**
 * Ad placement reference — a factual, non-indexed page for the site owner.
 *
 * While a site is under AdSense and Ezoic review, nothing serves, so there is no
 * way to confirm from the outside that placements exist. This page answers that
 * question from the source of truth (`slots.ts`) rather than from memory, and
 * links to a live preview of each one.
 *
 * `noIndex` on purpose: it is an operational page, not content. A reviewer
 * finding a page that explains ad placements would reasonably read it as
 * over-optimised, which is the opposite of what we want during review.
 */
export const Route = createFileRoute("/ad-placements")({
  head: () =>
    getPageHead({
      title: "Ad placements",
      description: "Where advertising appears on this site, and how to preview each placement.",
      path: "/ad-placements",
      noIndex: true,
    }),
  component: AdPlacements,
});

/** The sample path used to preview each slot. */
const SAMPLE: Record<string, string> = {
  "lesson-in-article": "/blog/what-a-soc-room-is?adpreview=1",
  "lesson-end": "/blog/what-a-soc-room-is?adpreview=1",
  "blog-index": "/blog?adpreview=1",
  "course-end": "/classes/cybersecurity?adpreview=1",
};

function AdPlacements() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Operations · not indexed"
        title="Where advertising actually appears"
        description="This site is in review with AdSense and Ezoic, so no ads serve yet. This page shows exactly where they will appear, generated from the same file that controls placement — so it cannot go stale."
        meta={["4 declared", "1 per page", "Never on payment pages"]}
      />

      <section className="container-page pb-16">
        <div className="border-border bg-muted/30 mb-8 rounded-xl border p-5">
          <div className="flex items-start gap-3">
            <Eye className="text-primary mt-0.5 size-5 shrink-0" aria-hidden="true" />
            <div className="text-sm leading-relaxed">
              <p className="font-semibold">Why you cannot see ads right now</p>
              <p className="text-muted-foreground mt-1">
                Three gates, all of them working as designed. During review the network has nothing
                to serve, so the unit collapses rather than leaving an empty box. Consent must also
                be granted, and the ngadverts script only loads after that. To see the reserved
                space anyway, add{" "}
                <code className="bg-background rounded-lg px-1.5 py-0.5 font-mono text-xs">
                  ?adpreview=1
                </code>{" "}
                to any eligible page — it draws the box without requesting an ad or setting a
                cookie.
              </p>
            </div>
          </div>
        </div>

        <h2 className="font-display text-xl font-semibold">Declared slots</h2>
        <p className="text-muted-foreground mt-1 text-sm">
          One unit renders per page. The zone id is baked into the container element, so a second
          unit on one page would collide with the first.
        </p>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-border border-b">
              <tr className="text-muted-foreground text-xs tracking-wide uppercase">
                <th className="py-2 pr-4 font-semibold">Slot</th>
                <th className="py-2 pr-4 font-semibold">Paths</th>
                <th className="py-2 pr-4 font-semibold">Renders?</th>
                <th className="py-2 pr-4 font-semibold">Preview</th>
              </tr>
            </thead>
            <tbody>
              {AD_SLOTS.map((slot) => {
                const renders = slot.primary && Boolean(primarySlotForPath(SAMPLE[slot.id] ?? ""));
                return (
                  <tr key={slot.id} className="border-border border-b align-top">
                    <td className="py-3 pr-4">
                      <p className="font-mono text-xs font-semibold">{slot.id}</p>
                      <p className="text-muted-foreground mt-0.5 max-w-[34ch] text-xs leading-snug">
                        {slot.rationale}
                      </p>
                    </td>
                    <td className="py-3 pr-4 font-mono text-xs">{slot.allow.join(", ")}</td>
                    <td className="py-3 pr-4">
                      {renders ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                          <CheckCircle2 className="size-3.5" aria-hidden="true" /> live
                        </span>
                      ) : (
                        <span className="text-muted-foreground inline-flex items-center gap-1.5 text-xs">
                          <CircleSlash className="size-3.5" aria-hidden="true" /> declared only
                        </span>
                      )}
                    </td>
                    <td className="py-3 pr-4">
                      {SAMPLE[slot.id] ? (
                        <Link
                          to={SAMPLE[slot.id]}
                          className="text-primary text-xs font-semibold hover:underline"
                        >
                          Open preview
                        </Link>
                      ) : (
                        <span className="text-muted-foreground text-xs">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <h2 className="font-display mt-10 text-xl font-semibold">Pages that never carry ads</h2>
        <p className="text-muted-foreground mt-1 text-sm">
          Policy, not preference. Advertising inside an application, a payment or a signed-in
          workspace is prohibited by every network we use, and on the funnel it costs more in lost
          trust than it earns.
        </p>
        <ul className="text-muted-foreground mt-3 grid gap-1.5 text-sm sm:grid-cols-2">
          {[
            "/apply — application",
            "/pay — payment",
            "/shop — checkout",
            "/contact — contact form",
            "/privacy, /terms — legal",
            "/app, /portal — signed in",
          ].map((item) => (
            <li key={item} className="font-mono text-xs">
              {item}
            </li>
          ))}
        </ul>

        <div className="border-border mt-10 grid gap-4 rounded-xl border p-5 sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold tracking-wide uppercase">ngadverts zone</p>
            <p className="mt-1 font-mono text-sm">
              {NGADVERTS.zone} · site {NGADVERTS.site}
            </p>
            <p className="text-muted-foreground mt-1 text-xs">
              {NGADVERTS.width}×{NGADVERTS.height}
            </p>
          </div>
          <div>
            <p className="flex items-center gap-1.5 text-xs font-semibold tracking-wide uppercase">
              <ShieldCheck className="size-3.5" aria-hidden="true" /> Consent gate
            </p>
            <p className="mt-1 text-xs leading-relaxed">
              No third-party script is injected before optional cookies are accepted. The preview
              flag draws a box and never requests the network.
            </p>
          </div>
        </div>

        <p className="text-muted-foreground mt-8 text-xs">
          Eligible path families: {AD_ELIGIBLE_PREFIXES.join(", ")}. Generated from{" "}
          <code className="font-mono">src/lib/ads/slots.ts</code>.
        </p>
      </section>
    </PageShell>
  );
}
