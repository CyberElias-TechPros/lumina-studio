"use client";

import { openConsentPreferences } from "@/lib/consent";

/**
 * Footer control to re-open the consent banner.
 *
 * ## Why this is its own file
 *
 * `site-footer.tsx` is a Server Component. Putting `onClick` directly inside it
 * fails the render with "Event handlers cannot be passed to Client Component
 * props" — which takes down every page the footer appears on, i.e. all of them.
 * The interactive part therefore has to be its own client boundary, and the
 * server-rendered footer can then import it like any other static child.
 *
 * ## Why a button rather than a link
 *
 * It performs an action on the current page rather than navigating. It is also
 * the only way a visitor who already decided can change their mind, which GDPR
 * Art. 7(3) requires to be as easy as giving consent in the first place.
 */
export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => openConsentPreferences()}
      className={className ?? "cursor-pointer text-left"}
    >
      Cookie settings
    </button>
  );
}
