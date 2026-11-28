"use client";

import { useCallback, useEffect, useState } from "react";
import { BarChart3, Megaphone, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/lib/next-compat/router";
import {
  CONSENT_OPEN_EVENT,
  CONSENT_VERSION,
  denyAllConsent,
  readConsent,
  saveConsent,
} from "@/lib/consent";
import { cn } from "@/lib/utils";

/**
 * The consent banner.
 *
 * ## Why this mounts unconditionally
 *
 * The previous version was rendered only when
 * `NEXT_PUBLIC_ENABLE_PUBLIC_TRACKING === "true"`. That flag also gated the
 * loaders, so with the flag off there was no banner **and** no ads — consistent,
 * but it meant the site could never earn from advertising at all.
 *
 * Now the banner always mounts. Three outcomes, all correct:
 *
 *   - visitor accepts        → loaders run
 *   - visitor declines       → loaders never run, site works identically
 *   - visitor ignores it     → no consent is recorded, so nothing loads
 *
 * Ignoring is therefore treated as refusal, which is the safe default and the
 * required one for visitors in the EEA and UK.
 *
 * ## Why it is granular
 *
 * Advertising and analytics are separate switches. Bundling them is the single
 * most common reason a consent banner gets refused outright: a reader who wants
 * to help improve the lessons should not have to accept ad tracking to do it.
 *
 * ## Why "Accept all" is not styled as the only obvious choice
 *
 * Both buttons use the same visual weight. A pre-ticked, highlighted accept
 * button is a dark pattern and, since 2024, an enforcement target in the EU.
 */

type View = "closed" | "summary" | "details";

export function CookieConsent() {
  const [view, setView] = useState<View>("closed");
  const [ads, setAds] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    const existing = readConsent();
    if (existing) {
      setAds(existing.ads);
      setAnalytics(existing.analytics);
      return;
    }

    let cancelled = false;

    // Ask the CMP first. If it reports that GDPR applies, it is already showing
    // the authoritative prompt and this banner must stay out of the way.
    const askCmp = () => {
      if (typeof window.__tcfapi !== "function") return false;
      window.__tcfapi("getTCData", 2, (tcData, success) => {
        if (cancelled) return;
        if (success && tcData?.gdprApplies === true) return; // CMP owns it
        setView("summary");
      });
      return true;
    };

    // The CMP script may not have executed when this effect runs, so give it one
    // short window before falling back to our own banner. Without this the
    // component races the CMP and flashes a second, competing prompt.
    const timer = window.setTimeout(() => {
      if (cancelled) return;
      if (askCmp()) return;
      setView("summary");
    }, 1500);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, []);

  // The footer "Cookie settings" button re-opens the banner in details mode.
  useEffect(() => {
    const reopen = () => {
      const existing = readConsent();
      setAds(existing?.ads ?? false);
      setAnalytics(existing?.analytics ?? false);
      setView("details");
    };
    window.addEventListener(CONSENT_OPEN_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, reopen);
  }, []);

  const commit = useCallback((nextAds: boolean, nextAnalytics: boolean) => {
    saveConsent({ ads: nextAds, analytics: nextAnalytics });
    setView("closed");
  }, []);

  if (view === "closed") return null;

  return (
    <div
      /* pointer-events-none on the wrapper, pointer-events-auto on the card:
         the banner is a full-width fixed strip, so without this it swallows
         clicks on every control sitting in the bottom band of the viewport.
         That is not theoretical — it timed out three E2E specs on the
         instructor and admin screens before it was found.

         z-40, below shadcn Dialog at z-50. A consent prompt must never sit on
         top of the thing the visitor is trying to operate, and at z-[100] it
         did: the instructor "Return grade to student" button and the admin
         review form were both unreachable behind it. */
      className="pointer-events-none fixed inset-x-0 bottom-0 z-40 p-3 sm:p-6"
      role="dialog"
      aria-modal="false"
      aria-labelledby="consent-title"
      aria-describedby="consent-body"
    >
      <div className="container-page">
        <div className="bg-card shadow-elevated border-foreground/12 pointer-events-auto rounded-xl border">
          <div className="p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <span className="bg-primary/10 text-primary mt-0.5 hidden size-9 shrink-0 place-items-center rounded-lg sm:grid">
                <ShieldCheck className="size-4.5" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <h2 id="consent-title" className="text-foreground text-sm font-semibold">
                  Your choice about cookies
                </h2>
                <p
                  id="consent-body"
                  className="text-muted-foreground mt-1.5 text-[13px] leading-relaxed"
                >
                  We use essential cookies so sign-in and payments work — those cannot be switched
                  off. Everything else is optional:{" "}
                  <strong className="text-foreground font-medium">advertising</strong> that pays for
                  the free lessons, and{" "}
                  <strong className="text-foreground font-medium">analytics</strong> that shows us
                  which pages leave people stuck. Decline both and the site works exactly the same.
                  Read the{" "}
                  <Link to="/privacy" className="text-primary underline underline-offset-2">
                    privacy policy
                  </Link>
                  .
                </p>

                {view === "details" && (
                  <div className="mt-4 space-y-2">
                    <CategoryRow
                      icon={<Megaphone className="size-4" />}
                      title="Advertising"
                      description="Ezoic, Google AdSense and ngadverts, coordinated by the Gatekeeper consent platform where GDPR applies. Declining means you may still see non-personalised ads with no tracking cookies."
                      checked={ads}
                      onChange={setAds}
                    />
                    <CategoryRow
                      icon={<BarChart3 className="size-4" />}
                      title="Analytics"
                      description="Google Analytics, Microsoft Clarity (page text always masked) and Vercel counts. Helps us fix confusing pages."
                      checked={analytics}
                      onChange={setAnalytics}
                    />
                    <p className="text-muted-foreground pt-1 text-[11px]">
                      Policy version {CONSENT_VERSION}. You can change this at any time from the
                      footer link <span className="font-medium">Cookie settings</span>.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  denyAllConsent();
                  setView("closed");
                }}
                className="sm:mr-auto"
              >
                Reject all
              </Button>
              {view === "summary" ? (
                <Button variant="outline" size="sm" onClick={() => setView("details")}>
                  Choose what to allow
                </Button>
              ) : (
                <Button variant="outline" size="sm" onClick={() => commit(ads, analytics)}>
                  Save my choices
                </Button>
              )}
              <Button size="sm" onClick={() => commit(true, true)}>
                Accept all
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CategoryRow({
  icon,
  title,
  description,
  checked,
  onChange,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label
      className={cn(
        "border-foreground/10 flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition-colors",
        checked ? "border-primary/35 bg-primary/5" : "hover:bg-foreground/[0.03]",
      )}
    >
      <span className="text-muted-foreground mt-0.5 shrink-0">{icon}</span>
      <span className="min-w-0 flex-1">
        <span className="text-foreground block text-xs font-semibold">{title}</span>
        <span className="text-muted-foreground mt-0.5 block text-[11px] leading-relaxed">
          {description}
        </span>
      </span>
      <span className="relative mt-0.5 inline-flex shrink-0 items-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          className="peer sr-only"
        />
        <span
          aria-hidden="true"
          className={cn(
            "block h-5 w-9 rounded-full transition-colors",
            checked ? "bg-primary" : "bg-foreground/20",
          )}
        />
        <span
          aria-hidden="true"
          className={cn(
            "absolute top-0.5 left-0.5 block size-4 rounded-full bg-white shadow-sm transition-transform",
            checked && "translate-x-4",
          )}
        />
      </span>
    </label>
  );
}
