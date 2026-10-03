"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "@/lib/next-compat/router";
import { grantConsent, denyConsent, getConsent } from "@/lib/ga4";
import { initAdSense } from "@/lib/adsense";

const STORAGE_KEY = "cea-cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    // Migrate consent recorded by the original banner implementation.
    if (!getConsent() && stored === "accepted") grantConsent();
    if (!getConsent() && stored === "dismissed") denyConsent();
    if (!stored) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    grantConsent();
    initAdSense();
    setVisible(false);
  };

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, "dismissed");
    denyConsent();
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[100] p-4 sm:p-6">
      <div className="container-page">
        <div className="bg-card shadow-elevated rounded-2xl border p-5 sm:flex sm:items-center sm:justify-between sm:gap-4">
          <p className="text-foreground/75 text-sm leading-relaxed">
            We use essential cookies so the site works. This site may also show Google ads
            (including advertising cookies). If you accept, we may use analytics cookies too. Read
            the{" "}
            <Link to="/privacy" className="text-primary underline">
              privacy policy
            </Link>
            . You can decline optional cookies.
          </p>
          <div className="mt-4 flex shrink-0 gap-2 sm:mt-0">
            <Button variant="outline" size="sm" onClick={dismiss}>
              Decline
            </Button>
            <Button size="sm" onClick={accept}>
              Accept
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
