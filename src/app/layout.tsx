import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "@/styles.css";
import AppProviders from "./providers";
import { PublicAnalytics } from "@/components/public-analytics";
import { LOCAL_BUSINESS_LD, ORGANIZATION_LD, WEBSITE_LD } from "@/lib/seo";
import { SITE_URL } from "@/lib/site-url";

const EZOIC_INIT_SCRIPT = `window.ezstandalone = window.ezstandalone || {};
ezstandalone.cmd = ezstandalone.cmd || [];`;

const THEME_SCRIPT = `(function(){try{
  var workspace = /^\\/(app|portal|auth)(\\/|$)/.test(location.pathname);
  if (workspace) {
    if (localStorage.getItem("cea-theme") !== "light") document.documentElement.classList.add("dark");
  } else {
    if (localStorage.getItem("cea-marketing-theme") === "dark") document.documentElement.classList.add("dark");
  }
} catch (e) { /* keep light default on marketing pages */ }})();`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Cyber Elias Academy — Practical digital skills training in Port Harcourt",
    template: "%s | Cyber Elias Academy",
  },
  description:
    "A digital skills training centre in Port Harcourt. Short, practical computer courses: Office, computer basics, design, web, data entry and repairs.",
  applicationName: "Cyber Elias Academy",
  authors: [{ name: "Cyber Elias Academy" }],
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }, { url: "/favicon.ico" }],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: "Cyber Elias Academy",
    description: "Practical computer and digital-skills training in Port Harcourt.",
    type: "website",
    siteName: "Cyber Elias Academy",
    locale: "en_NG",
    images: [{ url: "/og-default.png", alt: "Cyber Elias Academy" }],
  },
  twitter: { card: "summary_large_image" },
  other: {
    author: "Cyber Elias Academy",
    "google-adsense-account": "ca-pub-9124992249317290",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#101214",
};

function StructuredData({ data }: { data: Record<string, unknown>[] }) {
  return (
    <>
      {data.map((item, index) => (
        <script
          key={`global-structured-data-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item).replace(/</g, "\\u003c") }}
        />
      ))}
    </>
  );
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script data-cfasync="false" src="https://cmp.gatekeeperconsent.com/min.js" />
        <script data-cfasync="false" src="https://the.gatekeeperconsent.com/cmp.min.js" />
        <script async src="//www.ezojs.com/ezoic/sa.min.js" itemProp="" />
        <script dangerouslySetInnerHTML={{ __html: EZOIC_INIT_SCRIPT }} />
        <script src="//ezoicanalytics.com/analytics.js" />
        <link
          rel="preload"
          href="/fonts/bricolage-grotesque-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
          itemProp=""
        />
        <link
          rel="preload"
          href="/fonts/geist-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
          itemProp=""
        />
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <noscript>
          <style>{`[data-arrival]{display:none !important}
main,main *{opacity:1 !important;filter:none !important}
main [style*="translateY"],main [style*="translateX"]{transform:none !important}`}</style>
        </noscript>
      </head>
      <body>
        <StructuredData data={[ORGANIZATION_LD, LOCAL_BUSINESS_LD, WEBSITE_LD]} />
        <AppProviders>{children}</AppProviders>
        <PublicAnalytics />
      </body>
    </html>
  );
}
