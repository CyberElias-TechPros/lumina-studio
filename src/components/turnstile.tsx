import { useCallback, useEffect, useRef, useState } from "react";
import { env } from "@/lib/env";

/**
 * Cloudflare Turnstile widget. Renders nothing (and `ready` is always true)
 * when VITE_TURNSTILE_SITE_KEY is unset, so forms work unchanged until keys
 * are added. The backend enforces the check only when TURNSTILE_SECRET_KEY is
 * configured — set both together.
 */

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id?: string) => void;
      remove: (id: string) => void;
    };
  }
}

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
let scriptPromise: Promise<void> | null = null;

function loadScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.turnstile) return Promise.resolve();
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = SCRIPT_SRC;
      s.async = true;
      s.defer = true;
      s.onload = () => resolve();
      s.onerror = () => {
        scriptPromise = null;
        reject(new Error("Turnstile failed to load"));
      };
      document.head.appendChild(s);
    });
  }
  return scriptPromise;
}

export function useTurnstile() {
  const enabled = Boolean(env.turnstileSiteKey);
  const [token, setToken] = useState<string | undefined>(undefined);
  const widgetId = useRef<string | null>(null);

  const reset = useCallback(() => {
    setToken(undefined);
    if (widgetId.current && window.turnstile) window.turnstile.reset(widgetId.current);
  }, []);

  const Widget = useCallback(
    function TurnstileWidget({ className }: { className?: string }) {
      return enabled ? (
        <TurnstileBox className={className} onToken={setToken} widgetRef={widgetId} />
      ) : null;
    },
    [enabled],
  );

  return { enabled, token, ready: !enabled || Boolean(token), reset, Widget };
}

function TurnstileBox({
  className,
  onToken,
  widgetRef,
}: {
  className?: string;
  onToken: (token: string | undefined) => void;
  widgetRef: React.MutableRefObject<string | null>;
}) {
  const el = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    loadScript()
      .then(() => {
        if (cancelled || !el.current || !window.turnstile) return;
        widgetRef.current = window.turnstile.render(el.current, {
          sitekey: env.turnstileSiteKey,
          callback: (t: string) => onToken(t),
          "expired-callback": () => onToken(undefined),
          "error-callback": () => onToken(undefined),
        });
      })
      .catch(() => setFailed(true));
    return () => {
      cancelled = true;
      if (widgetRef.current && window.turnstile) window.turnstile.remove(widgetRef.current);
      widgetRef.current = null;
    };
  }, [onToken, widgetRef]);

  return (
    <div className={className}>
      <div ref={el} />
      {failed && (
        <p className="text-error text-xs">
          Human check couldn&apos;t load. Disable content blockers and refresh the page.
        </p>
      )}
    </div>
  );
}
