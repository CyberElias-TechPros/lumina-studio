"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFlag } from "@/lib/flags";
import { useSessionContext } from "@/components/app/session-provider";
import { hasSeenTour, markTourSeen, type TourStep } from "@/lib/tour";
import { cn } from "@/lib/utils";

const TOUR_STEPS: TourStep[] = [
  {
    id: "welcome",
    title: "Welcome to Lumina Studio",
    description:
      "Everything at Cyber Elias Academy in one place — learning, live classes, assignments, and your career portfolio. This quick tour takes 30 seconds.",
  },
  {
    id: "nav-home",
    title: "Start from the dashboard",
    description:
      "Your dashboard shows progress, deadlines, and what to tackle next. It's your home base every time you sign in.",
    target: '[data-tour="nav-home"]',
  },
  {
    id: "nav-learn",
    title: "Learn at your own pace",
    description:
      "The Learning Hub holds your courses and lessons. Track progress, pick up where you stopped, and mark modules done.",
    target: '[data-tour="nav-learn"]',
  },
  {
    id: "live",
    title: "Join live classes",
    description:
      "Weekly live classes bring video, chat, polls, and a shared whiteboard together. Find them under Live Classes.",
  },
];

export function OnboardingTour() {
  const [active, setActive] = useState<number | null>(null);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const toursEnabled = useFlag("onboarding.tours");
  const { session } = useSessionContext();

  useEffect(() => {
    if (!toursEnabled) return;
    if (!session) return;
    if (hasSeenTour()) return;
    if (!window.location.pathname.startsWith("/app")) return;
    const timer = window.setTimeout(() => setActive(0), 900);
    return () => window.clearTimeout(timer);
  }, [toursEnabled, session]);

  const step = active === null ? null : TOUR_STEPS[active];

  useEffect(() => {
    if (step === null) return;
    const measure = () => {
      if (!step.target) {
        setTargetRect(null);
        return;
      }
      const element = document.querySelector<HTMLElement>(step.target);
      setTargetRect(element ? element.getBoundingClientRect() : null);
    };
    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, true);
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure, true);
    };
  }, [step]);

  useEffect(() => {
    if (active === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") finish();
      if (event.key === "ArrowRight") next();
      if (event.key === "ArrowLeft" && active > 0) setActive(active - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const finish = () => {
    markTourSeen();
    setActive(null);
  };

  const next = () => {
    if (active === null) return;
    if (active + 1 >= TOUR_STEPS.length) {
      finish();
      return;
    }
    setActive(active + 1);
  };

  const cardStyle = useMemo(() => {
    if (!targetRect || targetRect.width === 0) {
      return { left: "50%", top: "46%", transform: "translate(-50%, -50%)" };
    }
    const GAP = 14;
    const below = targetRect.bottom + GAP;
    const placeAbove = below + 240 > window.innerHeight;
    const top = placeAbove ? Math.max(GAP, targetRect.top - 240 - GAP) : below;
    const left = Math.min(Math.max(GAP, targetRect.left), window.innerWidth - 340 - GAP);
    return { left: `${left}px`, top: `${top}px` };
  }, [targetRect]);

  if (active === null || step === null) return null;

  const isLast = active === TOUR_STEPS.length - 1;

  return (
    <div className="fixed inset-0 z-[120]" role="dialog" aria-modal="true" aria-label={step.title}>
      <button
        className="absolute inset-0 bg-ink/60 backdrop-blur-[2px]"
        onClick={finish}
        aria-label="Close tour"
      />
      {targetRect && targetRect.width > 0 && (
        <div
          className="absolute rounded-xl border-2 border-primary/80 bg-primary/5 shadow-glow pointer-events-none"
          style={{
            left: targetRect.left - 6,
            top: targetRect.top - 6,
            width: targetRect.width + 12,
            height: targetRect.height + 12,
          }}
        />
      )}
      <div
        ref={cardRef}
        className="bg-card shadow-elevated absolute w-80 rounded-2xl border p-5"
        style={cardStyle}
      >
        <div className="flex items-start justify-between gap-3">
          <span className="bg-primary/10 text-primary grid size-9 place-items-center rounded-xl">
            <Sparkles className="size-4" />
          </span>
          <button
            onClick={finish}
            className="text-muted-foreground hover:bg-muted grid size-8 place-items-center rounded-lg transition-colors"
            aria-label="Skip tour"
          >
            <X className="size-4" />
          </button>
        </div>
        <h3 className="font-display mt-3 text-base font-extrabold">{step.title}</h3>
        <p className="text-muted-foreground mt-1.5 text-[13px] leading-relaxed font-medium">
          {step.description}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {TOUR_STEPS.map((s, i) => (
              <span
                key={s.id}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === active ? "bg-primary w-5" : "bg-muted-foreground/30 w-1.5",
                )}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            {active > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActive(active - 1)}
                className="gap-1"
              >
                <ChevronLeft className="size-4" /> Back
              </Button>
            )}
            <Button size="sm" onClick={next} className="gap-1">
              {isLast ? "Finish" : "Next"}
              {!isLast && <ChevronRight className="size-4" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
