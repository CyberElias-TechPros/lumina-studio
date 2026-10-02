import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider, useSessionContext } from "@/components/app/session-provider";
import { OnboardingTour } from "@/components/app/onboarding-tour";
import { registerServiceWorker, subscribeToPush } from "@/lib/pwa";
import { useFlag } from "@/lib/flags";
import { initAdSense } from "@/lib/adsense";
import { initGA4 } from "@/lib/ga4";
import { CookieConsent } from "@/components/marketing/cookie-consent";
import { WhatsAppFloat } from "@/components/marketing/whatsapp-float";
import { MotionProvider } from "@/components/motion";

import { ORGANIZATION_LD, WEBSITE_LD, LOCAL_BUSINESS_LD } from "../lib/seo";

const THEME_SCRIPT = `(function(){try{
  var workspace = /^\\/(app|portal|auth)(\\/|$)/.test(location.pathname);
  var marketing = localStorage.getItem("cea-marketing-theme");
  // Workspaces follow the visitor's saved app theme; the public site is light
  // unless the visitor explicitly asked for dark.
  var dark = workspace
    ? localStorage.getItem("cea-theme") === "dark"
    : marketing === "dark";
  if (dark) document.documentElement.classList.add("dark");
} catch (e) {}})();`;

function StructuredData({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            // Escape `<` so a `</script>` sequence inside a string value can
            // never break out of the inline script element.
            __html: JSON.stringify(item).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}

function NotFoundComponent() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4">
      <div className="relative text-center">
        <p className="font-display text-muted-foreground text-7xl font-semibold tracking-tight sm:text-8xl">
          404
        </p>
        <h1 className="font-display mt-4 text-xl font-bold text-foreground sm:text-2xl">
          Page not found
        </h1>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
          The link may be old, or we moved something. Start from the home page.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="bg-primary text-primary-foreground inline-flex h-10 items-center justify-center rounded-md px-6 text-sm font-medium"
          >
            Go home
          </Link>
          <Link
            to="/classes"
            className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-accent motion-reduce:transition-none"
          >
            View courses
          </Link>
          <Link
            to="/blog"
            className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-accent motion-reduce:transition-none"
          >
            Notes
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: unknown; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#7a2434" },
      { name: "mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "default" },
      { title: "Cyber Elias Academy — Practical digital skills training in Port Harcourt" },
      {
        name: "description",
        content:
          "A digital skills training centre in Port Harcourt. Short, practical computer courses: Office, computer basics, design, web, data entry and repairs.",
      },
      { name: "author", content: "Cyber Elias Academy" },
      { name: "google-adsense-account", content: "ca-pub-9117572925263537" },
      { property: "og:title", content: "Cyber Elias Academy" },
      {
        property: "og:description",
        content: "Practical computer and digital-skills training in Port Harcourt.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      // Fonts are self-hosted variable faces (see src/styles.css) — no
      // third-party requests, and they still resolve offline in the PWA.
      {
        rel: "preload",
        href: "/fonts/bricolage-grotesque-var.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      {
        rel: "preload",
        href: "/fonts/geist-var.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      { rel: "icon", href: "/icon.svg", type: "image/svg+xml" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/manifest.webmanifest" },
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        {/* Runs before first paint. The public site is light unless the visitor
            chose dark; /app and /portal follow the saved workspace theme. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        {/* The public site's entrance choreography is JS-driven. Without JS the
            content must still be readable: drop the arrival curtain and undo
            motion's initial inline styles (classes are untouched, so Tailwind's
            own translate/rotate utilities keep working). */}
        <noscript>
          <style>{`[data-arrival]{display:none !important}
main,main *{opacity:1 !important;filter:none !important}
main [style*="translateY"],main [style*="translateX"]{transform:none !important}`}</style>
        </noscript>
      </head>
      <body>
        <StructuredData data={[ORGANIZATION_LD, LOCAL_BUSINESS_LD, WEBSITE_LD]} />
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <MotionProvider>
        <SessionProvider>
          {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
          <Outlet />
          <OnboardingTour />
          <RootEffects />
        </SessionProvider>
        <Toaster position="top-right" richColors />
        <CookieConsent />
        <WhatsAppFloat />
      </MotionProvider>
    </QueryClientProvider>
  );
}

function RootEffects() {
  const pushEnabled = useFlag("pwa.push");
  const { session } = useSessionContext();

  useEffect(() => {
    registerServiceWorker();
  }, []);

  useEffect(() => {
    // Push subscriptions belong to signed-in users. In particular, do not
    // prompt anonymous visitors for notification permission on public pages.
    if (session?.user.id) void subscribeToPush(pushEnabled);
  }, [pushEnabled, session?.user.id]);

  useEffect(() => {
    const id = import.meta.env.VITE_GA4_ID;
    if (id) initGA4(id);
  }, []);

  useEffect(() => {
    initAdSense();
  }, []);

  return null;
}
