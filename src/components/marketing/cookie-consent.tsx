import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { grantConsent, denyConsent, getConsent } from "@/lib/ga4";
import { initAdSense } from "@/lib/adsense";
import { X } from "lucide-react";

export function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const consent = getConsent();
    if (!consent) setOpen(true);
  }, []);

  if (!open) return null;

  const handleAccept = () => {
    grantConsent();
    initAdSense();
    setOpen(false);
  };

  const handleDeny = () => {
    denyConsent();
    setOpen(false);
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t bg-background/95 p-4 backdrop-blur">
      <div className="container-page flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-muted-foreground text-sm leading-relaxed">
          We use cookies and similar technologies to improve your experience, analyze traffic, and
          serve relevant ads. You can accept all cookies or manage preferences in your browser
          settings. See our{" "}
          <a href="/privacy" className="text-primary underline">
            Privacy Policy
          </a>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <Button variant="outline" size="sm" onClick={handleDeny}>
            Deny
          </Button>
          <Button size="sm" onClick={handleAccept} className="bg-gradient-brand border-0">
            Accept all
          </Button>
        </div>
      </div>
      <button
        onClick={handleDeny}
        className="text-muted-foreground hover:text-foreground absolute top-2 right-2 rounded-lg p-1 transition-colors sm:hidden"
        aria-label="Dismiss"
      >
        <X className="size-4" />
      </button>
    </div>
  );
}
