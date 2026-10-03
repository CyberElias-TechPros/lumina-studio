"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState, type ReactNode } from "react";
import { SessionProvider, useSessionContext } from "@/components/app/session-provider";
import { OnboardingTour } from "@/components/app/onboarding-tour";
import { Toaster } from "@/components/ui/sonner";
import { CookieConsent } from "@/components/marketing/cookie-consent";
import { WhatsAppFloat } from "@/components/marketing/whatsapp-float";
import { MotionProvider } from "@/components/motion";
import { useFlag } from "@/lib/flags";
import { initAdSense } from "@/lib/adsense";
import { initGA4 } from "@/lib/ga4";
import { registerServiceWorker, subscribeToPush } from "@/lib/pwa";
import { createAppQueryClient } from "@/lib/query/client";

function GlobalEffects() {
  const pushEnabled = useFlag("pwa.push");
  const { session } = useSessionContext();

  useEffect(() => {
    registerServiceWorker();
  }, []);

  useEffect(() => {
    if (session?.user.id) void subscribeToPush(pushEnabled);
  }, [pushEnabled, session?.user.id]);

  useEffect(() => {
    const id = process.env.NEXT_PUBLIC_GA4_ID;
    if (id) initGA4(id);
  }, []);

  useEffect(() => {
    initAdSense();
  }, []);

  return null;
}

export default function AppProviders({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => createAppQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <MotionProvider>
        <SessionProvider>
          {children}
          <OnboardingTour />
          <GlobalEffects />
        </SessionProvider>
        <Toaster position="top-right" richColors />
        <CookieConsent />
        <WhatsAppFloat />
      </MotionProvider>
    </QueryClientProvider>
  );
}
