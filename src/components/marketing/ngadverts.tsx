"use client";

import { useEffect, useRef, useState } from "react";
import { useLocation } from "@/lib/next-compat/router";
import { CONSENT_EVENT, getConsent } from "@/lib/ga4";
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

type UnitState = "waiting" | "loading" | "filled" | "empty";

export function AdUnit({ slotId, className }: { slotId: string; className?: string }) {
  const { pathname } = useLocation();
  const slot = slotFor(slotId, pathname);
  const allowed = Boolean(slot?.primary);

  const [consented, setConsented] = useState(false);
  const [state, setState] = useState<UnitState>("waiting");
  const hostRef = useRef<HTMLDivElement>(null);

  // Consent can be granted after the page has rendered, so subscribe to it.
  useEffect(() => {
    if (!allowed) return;
    const sync = () => setConsented(getConsent() === "granted");
    sync();
    window.addEventListener(CONSENT_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(CONSENT_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, [allowed]);

  useEffect(() => {
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
  }, [allowed, consented]);

  if (!allowed || !consented || state === "empty") return null;

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
