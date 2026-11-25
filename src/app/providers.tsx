"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState, type ReactNode } from "react";
import { SessionProvider, useSessionContext } from "@/components/app/session-provider";
import { OnboardingTour } from "@/components/app/onboarding-tour";
import { Toaster } from "@/components/ui/sonner";
import { CookieConsent } from "@/components/marketing/cookie-consent";
import { EzoicRouteManager } from "@/components/ezoic/ezoic-ads";
import { WhatsAppFloat } from "@/components/marketing/whatsapp-float";
import { MotionProvider } from "@/components/motion";
import { useFlag } from "@/lib/flags";
import { loadAdSense, loadClarity, loadGA4 } from "@/lib/tracking";
import { onConsentChange, readConsent } from "@/lib/consent";
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

  // Consent can arrive before this mounts (returning visitor) or after (the
  // banner). Both paths funnel through the same three loaders, which each
  // re-check consent themselves rather than trusting the caller.
  useEffect(() => {
    const apply = () => {
      const state = readConsent();
      if (!state) return;
      if (state.analytics) {
        loadClarity();
        const id = process.env.NEXT_PUBLIC_GA4_ID;
        if (id) loadGA4(id);
      }
      if (state.ads) loadAdSense();
    };
    apply();
    return onConsentChange(apply);
  }, []);

  return null;
}

export default function AppProviders({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => createAppQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <MotionProvider>
        <SessionProvider>
          <EzoicRouteManager />
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
