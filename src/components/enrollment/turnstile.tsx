"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, ShieldCheck } from "lucide-react";
import { env } from "@/lib/env";

/**
 * Cloudflare Turnstile (free) human verification.
 * Renders the official widget when a site key is configured; resolves an
 * empty token (and therefore a pass-through) when none is set so the form
 * works in mock/dev environments out of the box.
 */
export function Turnstile({ onToken }: { onToken: (token: string) => void }) {
  const siteKey = env.turnstileSiteKey;
  const holderRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"idle" | "loading" | "ready" | "skipped">(
    siteKey ? "idle" : "skipped",
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!siteKey || !holderRef.current) return;
    let cancelled = false;

    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (cancelled || !holderRef.current) return;
      const ts = (
        window as unknown as {
          turnstile?: { render: (el: HTMLElement, opts: Record<string, unknown>) => string };
        }
      ).turnstile;
      if (!ts) {
        setError("Verification widget failed to load. Refresh and try again.");
        return;
      }
      ts.render(holderRef.current, {
        sitekey: siteKey,
        callback: (token: string) => {
          onToken(token);
          setState("ready");
        },
        "error-callback": () => setError("Verification failed. Please try again."),
        "timeout-callback": () => setError("Verification timed out. Please try again."),
        theme: "auto",
        size: "flexible",
      });
    };
    script.onerror = () => setError("Verification widget failed to load. Refresh and try again.");
    document.head.appendChild(script);
    return () => {
      cancelled = true;
      script.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteKey]);

  if (!siteKey) return null;

  if (state === "skipped" || state === "ready") {
    return (
      <div className="flex items-center gap-2 text-sm">
        <ShieldCheck className="text-success size-4" />
        <span
          className={state === "ready" ? "text-success font-semibold" : "text-muted-foreground"}
        >
          {state === "ready" ? "Human check passed" : "Waiting for verification…"}
        </span>
      </div>
    );
  }

  return (
    <div>
      <div ref={holderRef} className="min-h-[65px] w-full" />
      {state === "loading" && (
        <p className="text-muted-foreground mt-2 flex items-center gap-2 text-xs">
          <Loader2 className="size-3.5 animate-spin" /> Loading human check…
        </p>
      )}
      {error && <p className="text-error mt-2 text-xs">{error}</p>}
    </div>
  );
}
