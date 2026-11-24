"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  EZOIC_PLACEMENTS,
  ezoicPlaceholderElementId,
  ezoicPlacementsAllowedOn,
  notifyEzoicRouteChange,
  registerEzoicSlot,
  type EzoicPlacementId,
  type EzSlotCompleteDetail,
} from "@/lib/ezoic";
import { cn } from "@/lib/utils";

export type EzoicSlotFormat = "banner" | "in-content";
type SlotLifecycleState = "idle" | "filled" | "unfilled";

/**
 * Mounted once inside `AppProviders` so client-side App Router navigations
 * cleanly destroy departing placeholders and request the new page's slots.
 */
export function EzoicRouteManager() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;
    notifyEzoicRouteChange(pathname);
  }, [pathname]);

  return null;
}

/**
 * Renders an unstyled `<div id="ezoic-pub-ad-placeholder-<id>"></div>` inside
 * a layout-safe outer wrapper and registers the placement ID with the page's
 * batched `ezstandalone.showAds(...)` queue.
 */
export function EzoicSlot({
  id,
  format = "banner",
  className,
}: {
  id: EzoicPlacementId;
  format?: EzoicSlotFormat;
  className?: string;
}) {
  const pathname = usePathname();
  const allowed = ezoicPlacementsAllowedOn(pathname);
  const [slotState, setSlotState] = useState<SlotLifecycleState>("idle");

  useEffect(() => {
    setSlotState("idle");
  }, [pathname]);

  useEffect(() => {
    if (!allowed) return;
    return registerEzoicSlot(id);
  }, [allowed, id]);

  useEffect(() => {
    if (!allowed || typeof document === "undefined") return;

    const handleSlotComplete = (event: Event) => {
      const custom = event as CustomEvent<EzSlotCompleteDetail>;
      if (custom.detail?.placeholderId !== id) return;
      setSlotState(custom.detail.filled ? "filled" : "unfilled");
    };

    document.addEventListener("ezSlotComplete", handleSlotComplete);
    return () => {
      document.removeEventListener("ezSlotComplete", handleSlotComplete);
    };
  }, [allowed, id]);

  if (!allowed) return null;

  return (
    <div
      className={cn("ezoic-slot-wrapper", className)}
      data-ezoic-slot={id}
      data-ezoic-format={format}
      data-ezoic-state={slotState}
    >
      <div id={ezoicPlaceholderElementId(id)} suppressHydrationWarning />
    </div>
  );
}

/** Placement 103 — top_of_page */
export function EzoicTopOfPageAd({ className }: { className?: string }) {
  return <EzoicSlot id={EZOIC_PLACEMENTS.TOP_OF_PAGE} format="banner" className={className} />;
}

/** Placement 104 — under_page_title */
export function EzoicUnderTitleAd({ className }: { className?: string }) {
  return <EzoicSlot id={EZOIC_PLACEMENTS.UNDER_PAGE_TITLE} format="banner" className={className} />;
}

/** Placement 111 — under_first_paragraph */
export function EzoicUnderFirstParagraphAd({ className }: { className?: string }) {
  return (
    <EzoicSlot
      id={EZOIC_PLACEMENTS.UNDER_FIRST_PARAGRAPH}
      format="in-content"
      className={className}
    />
  );
}

/** Placement 113 — mid_content */
export function EzoicMidContentAd({ className }: { className?: string }) {
  return <EzoicSlot id={EZOIC_PLACEMENTS.MID_CONTENT} format="in-content" className={className} />;
}

/** Placement 105 — bottom_of_page */
export function EzoicBottomOfPageAd({ className }: { className?: string }) {
  return <EzoicSlot id={EZOIC_PLACEMENTS.BOTTOM_OF_PAGE} format="banner" className={className} />;
}
