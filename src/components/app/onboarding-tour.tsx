"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { useFlag } from "@/lib/flags";
import { useSessionContext } from "@/components/app/session-provider";
import { hasSeenTour, markTourSeen, type TourStep } from "@/lib/tour";
import { cn } from "@/lib/utils";

type TourMeta = {
  workspace: string;
  home: string;
  secondary: string;
};

const DEFAULT_META: TourMeta = {
  workspace: "your workspace",
  home: "your dashboard",
  secondary: "your main tools",
};

function readTourMeta(): TourMeta {
  const workspace =
    document.querySelector<HTMLElement>("[data-workspace-label]")?.dataset.workspaceLabel;
  const home = document.querySelector<HTMLElement>('[data-tour="nav-home"]')?.dataset.tourLabel;
  const secondary = document.querySelector<HTMLElement>('[data-tour="nav-secondary"]')?.dataset
    .tourLabel;

  return {
    workspace: workspace ? `${workspace} workspace` : DEFAULT_META.workspace,
    home: home || DEFAULT_META.home,
    secondary: secondary || DEFAULT_META.secondary,
  };
}

export function OnboardingTour() {
  const [active, setActive] = useState<number | null>(null);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [meta, setMeta] = useState<TourMeta>(DEFAULT_META);
  const mobileNavigationOpenedByTour = useRef(false);
  const toursEnabled = useFlag("onboarding.tours");
  const { session } = useSessionContext();

  const steps = useMemo<TourStep[]>(
    () => [
      {
        id: "welcome",
        title: "Welcome to Lumina Studio",
        description: `This is your ${meta.workspace}. Your role-specific pages and tools are gathered here. This short tour is optional and can be closed at any time.`,
      },
      {
        id: "nav-home",
        title: `Start with ${meta.home}`,
        description:
          "Use this page to get oriented, review current work, and choose a next step. Always check the live record before acting on a deadline or balance.",
        target: '[data-tour="nav-home"]',
      },
      {
        id: "nav-secondary",
        title: `Open ${meta.secondary}`,
        description:
          "Your navigation only shows tools for your workspace. On a phone, open the menu button to see the same links.",
        target: '[data-tour="nav-secondary"]',
      },
      {
        id: "search",
        title: "Find pages quickly",
        description:
          "Press Command and K on a Mac, or Control and K on Windows or Linux. You can also open search from the button in the top bar.",
        target: '[data-tour="workspace-search"]',
      },
    ],
    [meta],
  );

  const step = active === null ? null : steps[active];

  useEffect(() => {
    if (!toursEnabled || !session || hasSeenTour()) return;
    if (!window.location.pathname.startsWith("/app")) return;
    const timer = window.setTimeout(() => {
      if (hasSeenTour() || !window.location.pathname.startsWith("/app")) return;
      setMeta(readTourMeta());
      setActive(0);
    }, 900);
    return () => window.clearTimeout(timer);
  }, [session, toursEnabled]);

  useEffect(() => {
    const isNavigationStep = active === 1 || active === 2;
    const isMobileLayout = window.matchMedia("(max-width: 1023px)").matches;

    if (isNavigationStep && isMobileLayout) {
      const navigationAlreadyOpen = document.getElementById("mobile-workspace-navigation");
      if (!navigationAlreadyOpen) {
        mobileNavigationOpenedByTour.current = true;
        window.dispatchEvent(new Event("cea:tour-open-navigation"));
      }
      return;
    }

    if (mobileNavigationOpenedByTour.current) {
      mobileNavigationOpenedByTour.current = false;
      window.dispatchEvent(new Event("cea:tour-close-navigation"));
    }
  }, [active]);

  useEffect(() => {
    if (!step?.target) {
      setTargetRect(null);
      return;
    }
    const measure = () => {
      const elements = Array.from(document.querySelectorAll<HTMLElement>(step.target!));
      const target = elements.find((element) => {
        const rect = element.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0;
      });
      setTargetRect(target?.getBoundingClientRect() ?? null);
    };
    measure();
    const frame = window.requestAnimationFrame(measure);
    const delayedMeasure = window.setTimeout(measure, 550);
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, true);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(delayedMeasure);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure, true);
    };
  }, [step]);

  const finish = useCallback(() => {
    markTourSeen();
    setActive(null);
  }, []);

  const next = useCallback(() => {
    setActive((current) => {
      if (current === null) return null;
      if (current + 1 >= steps.length) {
        markTourSeen();
        return null;
      }
      return current + 1;
    });
  }, [steps.length]);

  const previous = useCallback(() => {
    setActive((current) => (current === null || current === 0 ? current : current - 1));
  }, []);

  useEffect(() => {
    if (active === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        next();
      } else if (event.key === "ArrowLeft" && active > 0) {
        event.preventDefault();
        previous();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active, next, previous]);

  const cardStyle = useMemo(() => {
    if (typeof window === "undefined") return undefined;
    if (!targetRect || targetRect.width === 0) {
      return { left: "50%", top: "46%", transform: "translate(-50%, -50%)" };
    }
    const gap = 14;
    const cardWidth = Math.min(320, window.innerWidth - gap * 2);
    const below = targetRect.bottom + gap;
    const approximateCardHeight = 260;
    const placeAbove = below + approximateCardHeight > window.innerHeight;
    const top = placeAbove ? Math.max(gap, targetRect.top - approximateCardHeight - gap) : below;
    const left = Math.min(Math.max(gap, targetRect.left), window.innerWidth - cardWidth - gap);
    return { left: `${left}px`, top: `${top}px`, transform: "none" };
  }, [targetRect]);

  if (active === null || step === null) return null;

  const isLast = active === steps.length - 1;

  return (
    <>
      {targetRect && targetRect.width > 0 && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed z-[110] rounded-xl border-2 border-primary/80 bg-primary/5 shadow-glow"
          style={{
            left: targetRect.left - 6,
            top: targetRect.top - 6,
            width: targetRect.width + 12,
            height: targetRect.height + 12,
          }}
        />
      )}
      <Dialog
        open={active !== null}
        onOpenChange={(open) => {
          if (!open) finish();
        }}
      >
        <DialogContent
          className="fixed z-[120] w-[calc(100vw-2rem)] max-w-80 gap-0 rounded-2xl p-5 shadow-elevated [&>button:last-child]:hidden"
          style={cardStyle}
          onEscapeKeyDown={finish}
        >
          <div className="flex items-start justify-between gap-3">
            <span className="bg-primary/10 text-primary grid size-9 place-items-center rounded-xl">
              <Sparkles className="size-4" aria-hidden="true" />
            </span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={finish}
              className="-mr-2 -mt-2"
            >
              Skip tour
            </Button>
          </div>
          <DialogTitle className="font-display mt-3 text-base font-extrabold">
            {step.title}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground mt-1.5 text-[13px] leading-relaxed font-medium">
            {step.description}
          </DialogDescription>
          <DialogFooter className="mt-4 flex-row items-center justify-between gap-2 sm:justify-between">
            <div className="flex items-center gap-1.5" aria-hidden="true">
              {steps.map((tourStep, index) => (
                <span
                  key={tourStep.id}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    index === active ? "bg-primary w-5" : "bg-muted-foreground/30 w-1.5",
                  )}
                />
              ))}
            </div>
            <span className="sr-only" aria-live="polite">
              Step {active + 1} of {steps.length}
            </span>
            <div className="flex items-center gap-2">
              {active > 0 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={previous}
                  className="gap-1"
                >
                  <ChevronLeft className="size-4" aria-hidden="true" /> Back
                </Button>
              )}
              <Button type="button" size="sm" onClick={next} className="gap-1">
                {isLast ? "Finish" : "Next"}
                {!isLast && <ChevronRight className="size-4" aria-hidden="true" />}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
