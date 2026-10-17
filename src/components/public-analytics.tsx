"use client";
import { Analytics } from "@vercel/analytics/next";
/** No application references, auth tokens, private workspaces or query strings in page analytics. */
export function PublicAnalytics() {
  return (
    <Analytics
      beforeSend={(event) => {
        const url = new URL(event.url);
        if (/^\/(?:apply|app|auth|portal)(\/|$)/.test(url.pathname)) return null;
        url.search = "";
        url.hash = "";
        return { ...event, url: url.toString() };
      }}
    />
  );
}
