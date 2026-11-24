/**
 * Ezoic Standalone JavaScript integration + Next.js App Router lifecycle manager.
 *
 * Coordinates all mounted `<div id="ezoic-pub-ad-placeholder-<id>">` slots on
 * the current route so that:
 *  1. Every placement ID used on a page is requested in one batched
 *     `ezstandalone.showAds(...ids)` call instead of N separate requests.
 *  2. Client-side SPA route transitions cleanly tear down departing placements
 *     with `ezstandalone.destroyPlaceholders(...ids)` before scanning and
 *     displaying the new route's placements.
 *  3. Each placement ID is reference-counted so duplicate DOM element IDs
 *     cannot mount simultaneously on the same page.
 */

export const EZOIC_PLACEMENTS = {
  TOP_OF_PAGE: 103,
  UNDER_PAGE_TITLE: 104,
  UNDER_FIRST_PARAGRAPH: 111,
  MID_CONTENT: 113,
  BOTTOM_OF_PAGE: 105,
} as const;

export type EzoicPlacementId = (typeof EZOIC_PLACEMENTS)[keyof typeof EZOIC_PLACEMENTS] | number;

export interface EzSlotCompleteDetail {
  placeholderId?: number;
  filled?: boolean;
}

export interface EzStandalone {
  cmd: Array<() => void>;
  showAds?: (...ids: number[]) => void;
  destroyPlaceholders?: (...ids: number[]) => void;
  destroyAll?: () => void;
  refreshAds?: (...ids: number[]) => void;
}

declare global {
  interface Window {
    ezstandalone?: EzStandalone;
    __tcfapi?: (
      command: string,
      version: number,
      callback: (tcData: { gdprApplies?: boolean }, success: boolean) => void,
    ) => void;
  }
}

/**
 * Exclude authentication screens, signed-in internal workspaces, and active
 * checkout/application submission forms so Google's publisher review of cea.ng
 * never sees ad placeholders inside login boxes, private dashboards, or
 * payment forms. Every public content, catalogue, tool, and marketing page on
 * cea.ng is enabled.
 */
const EZOIC_EXCLUDED_PATH =
  /^\/(?:auth|app|portal|merchant|apply)(?:\/|$)|^\/shop\/[^/]+\/(?:checkout|return)(?:\/|$)/;

export function ezoicPlacementsAllowedOn(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  const clean = pathname.split(/[?#]/)[0] || "/";
  return !EZOIC_EXCLUDED_PATH.test(clean);
}

export function ezoicPlaceholderElementId(id: EzoicPlacementId): string {
  return `ezoic-pub-ad-placeholder-${id}`;
}

export function runEzoic(fn: () => void): void {
  if (typeof window === "undefined") return;
  window.ezstandalone = window.ezstandalone || { cmd: [] };
  window.ezstandalone.cmd = window.ezstandalone.cmd || [];
  window.ezstandalone.cmd.push(fn);
}

const mountedSlotCounts = new Map<number, number>();
const activeShownSlots = new Set<number>();
let pendingRouteRefresh = false;
let rafHandle: number | null = null;
let lastObservedPathname: string | null = null;

function flushEzoicSync(): void {
  rafHandle = null;
  if (typeof window === "undefined" || typeof document === "undefined") return;

  const toDestroy: number[] = [];

  if (pendingRouteRefresh) {
    pendingRouteRefresh = false;
    for (const id of activeShownSlots) {
      toDestroy.push(id);
    }
    activeShownSlots.clear();
  } else {
    for (const id of activeShownSlots) {
      if (!mountedSlotCounts.has(id)) {
        toDestroy.push(id);
        activeShownSlots.delete(id);
      }
    }
  }

  const toShow: number[] = [];
  for (const [id, count] of mountedSlotCounts.entries()) {
    if (count <= 0 || activeShownSlots.has(id)) continue;
    if (document.getElementById(ezoicPlaceholderElementId(id))) {
      activeShownSlots.add(id);
      toShow.push(id);
    }
  }

  if (toDestroy.length === 0 && toShow.length === 0) return;

  runEzoic(() => {
    if (toDestroy.length > 0) {
      window.ezstandalone?.destroyPlaceholders?.(...toDestroy);
      if (toShow.length > 0) {
        window.requestAnimationFrame(() => {
          window.ezstandalone?.showAds?.(...toShow);
        });
      }
    } else if (toShow.length > 0) {
      window.ezstandalone?.showAds?.(...toShow);
    }
  });
}

function scheduleEzoicSync(): void {
  if (typeof window === "undefined") return;
  if (rafHandle !== null) return;
  rafHandle = window.requestAnimationFrame(flushEzoicSync);
}

/**
 * Registers a mounted placeholder slot for the current pageview.
 * Returns `true` if this instance is the primary owner of `id` on the page.
 */
export function registerEzoicSlot(id: number): () => void {
  const prev = mountedSlotCounts.get(id) ?? 0;
  mountedSlotCounts.set(id, prev + 1);
  scheduleEzoicSync();

  return () => {
    const current = mountedSlotCounts.get(id) ?? 1;
    if (current <= 1) {
      mountedSlotCounts.delete(id);
    } else {
      mountedSlotCounts.set(id, current - 1);
    }
    scheduleEzoicSync();
  };
}

export function notifyEzoicRouteChange(pathname: string): void {
  if (lastObservedPathname === null) {
    lastObservedPathname = pathname;
    scheduleEzoicSync();
    return;
  }
  if (lastObservedPathname === pathname) return;
  lastObservedPathname = pathname;
  pendingRouteRefresh = true;
  scheduleEzoicSync();
}
