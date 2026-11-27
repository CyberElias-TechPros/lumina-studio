"use client";

import { useEffect, useRef, useState } from "react";
import { useLocation } from "@/lib/next-compat/router";
import { onConsentChange, readConsent } from "@/lib/consent";
import { NGADVERTS, zoneContainerId, zoneScriptSrc } from "@/lib/ads/ngadverts";
import { slotFor } from "@/lib/ads/slots";

/**
 * The only component in the app that loads third-party ad code.
 *
 * Behaviour, all of it deliberate:
 *
 * - Renders nothing unless `src/lib/ads/slots.ts` allows an ad on this exact path
 *   AND the slot is the primary one for it. Application, payment, checkout,
 *   legal and signed-in surfaces get nothing, because `slotFor()` returns null.
 * - Renders nothing until the visitor has accepted optional cookies. The script
 *   is injected from `ngadverts.ts`, never on first paint.
 * - Renders nothing on the server. An ad container in the HTML that may never
 *   fill is what makes a site look broken to a reader and unfinished to a
 *   reviewer; this mounts client-side only, below the fold.
 * - Collapses itself if the network does not fill the box within
 *   `FILL_TIMEOUT_MS`. An empty labelled box is worse than no box.
 * - Labels the unit, because an advert that is not obviously an advert is a
 *   policy problem in every jurisdiction that matters here.
 */

const FILL_TIMEOUT_MS = 12_000;

type UnitState = "waiting" | "loading" | "filled" | "empty" | "preview";

/**
 * Reviewer preview.
 *
 * ## The problem this solves
 *
 * While a site is under AdSense and Ezoic review, ads legitimately do not
 * serve: the network has not approved the site yet. So the owner opens their
 * own site, sees nothing, and cannot tell whether placements exist at all. The
 * same thing happens after approval on a device with an ad blocker, or with
 * "reject" stored in consent.
 *
 * ## What it does
 *
 * `?adpreview=1` bypasses the two gates — consent and network fill — and draws
 * a labelled outline in the reserved space so the placement is visible and
 * measurable. It never requests a third-party script, so it cannot place a
 * cookie or violate consent; it only draws a box.
 *
 * It is opt-in per page load, never persisted, and it renders the network label
 * verbatim so nobody mistakes a preview for a real payment.
 */
function previewRequested(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return new URLSearchParams(window.location.search).get("adpreview") === "1";
  } catch {
    return false;
  }
}

export function AdUnit({ slotId, className }: { slotId: string; className?: string }) {
  const { pathname } = useLocation();
  const slot = slotFor(slotId, pathname);
  const allowed = Boolean(slot?.primary);

  const [consented, setConsented] = useState(false);
  const [state, setState] = useState<UnitState>("waiting");
  const [preview, setPreview] = useState(false);
  const hostRef = useRef<HTMLDivElement>(null);

  // Consent can be granted after the page has rendered, so subscribe to it.
  useEffect(() => {
    if (!allowed) return;
    const sync = () => setConsented(readConsent()?.ads === true);
    sync();
    const unsubscribe = onConsentChange(sync);
    window.addEventListener("storage", sync);
    return () => {
      unsubscribe();
      window.removeEventListener("storage", sync);
    };
  }, [allowed]);

  useEffect(() => {
    if (allowed) setPreview(previewRequested());
  }, [allowed]);

  useEffect(() => {
    if (preview) {
      setState("preview");
      return;
    }
    if (!allowed || !consented) return;
    const host = hostRef.current;
    if (!host) return;

    const container = host.querySelector<HTMLElement>(`#${zoneContainerId()}`);
    if (!container) return;

    setState("loading");

    // One script per container. A second append would be a second fill request
    // into an element id that can only exist once.
    const script = document.createElement("script");
    script.async = true;
    script.type = "text/javascript";
    script.src = zoneScriptSrc();
    script.dataset.ngadvertsZone = NGADVERTS.zone;
    host.appendChild(script);

    const seenAt = Date.now();
    const observer = new MutationObserver(() => {
      if (container.childElementCount > 0 || (container.textContent ?? "").trim() !== "") {
        setState("filled");
        observer.disconnect();
      }
    });
    observer.observe(container, { childList: true, subtree: true, characterData: true });

    const timer = window.setTimeout(() => {
      if (Date.now() - seenAt >= FILL_TIMEOUT_MS) {
        observer.disconnect();
        setState((current) => (current === "filled" ? current : "empty"));
      }
    }, FILL_TIMEOUT_MS);

    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
      script.remove();
    };
  }, [allowed, consented, preview]);

  if (!allowed) return null;
  if (preview)
    return (
      <PreviewUnit slotId={slotId} minHeight={slot?.minHeightPx ?? 250} format={slot?.format} />
    );
  if (!consented || state === "empty") return null;

  const minHeight = slot?.minHeightPx ?? 250;

  return (
    <aside
      className={className}
      aria-label="Advertisement"
      data-ad-slot={slotId}
      data-ad-network={NGADVERTS.network}
    >
      <p className="text-muted-foreground mb-1.5 text-[11px] font-medium tracking-[0.12em] uppercase">
        Advertisement
      </p>
      <div ref={hostRef} className="flex justify-center">
        <div
          id={zoneContainerId()}
          // Reserved height: the box exists before the fill arrives, so nothing
          // below it moves. Width is capped at the zone's 300px so a mis-sized
          // creative cannot overflow the reading column.
          style={{ minHeight, maxWidth: NGADVERTS.width }}
          className="w-full overflow-hidden"
        />
      </div>
    </aside>
  );
}

/**
 * The box a reviewer sees with `?adpreview=1`.
 *
 * Deliberately plain and unmistakable: dashed outline, the slot id, the size,
 * and the network. If this were styled like a real creative, someone would
 * eventually screenshot it and believe the site was earning.
 */
function PreviewUnit({
  slotId,
  minHeight,
  format,
}: {
  slotId: string;
  minHeight: number;
  format?: string;
}) {
  return (
    <aside
      className="my-10"
      aria-label="Advertisement placement preview"
      data-ad-slot={slotId}
      data-ad-preview="true"
    >
      <p className="text-muted-foreground mb-1.5 text-[11px] font-medium tracking-[0.12em] uppercase">
        Advertisement
      </p>
      <div
        className="border-muted-foreground/35 bg-muted/20 text-muted-foreground grid place-items-center rounded-lg border-2 border-dashed px-4 py-6 text-center"
        style={{ minHeight, maxWidth: NGADVERTS.width }}
      >
        <div className="space-y-1">
          <p className="text-xs font-semibold tracking-wide uppercase">
            {NGADVERTS.network} · {NGADVERTS.width}×{NGADVERTS.height}
          </p>
          <p className="font-mono text-[11px]">
            slot {slotId}
            {format ? ` · ${format}` : ""}
          </p>
          <p className="max-w-[26ch] text-[11px] leading-snug">
            Placement preview. No ad requested, no cookie set. Ads only serve after consent and
            network approval.
          </p>
        </div>
      </div>
    </aside>
  );
}
