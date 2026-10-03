"use client";

import { CalendarDays, Laptop, MapPin, SunMedium } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  longScheduleOptions,
  modeOptions,
  NEXT_COHORTS,
  shortScheduleOptions,
  timeSlotOptions,
} from "@/data/academy";
import { cn } from "@/lib/utils";
import type { EnrollmentDraft } from "./types";

interface ScheduleStepProps {
  kind: "short" | "long";
  draft: EnrollmentDraft;
  update: (patch: Partial<EnrollmentDraft>) => void;
  errors: Record<string, string>;
}

function OptionGrid({
  options,
  value,
  onChange,
}: {
  options: { value: string; label: string; detail: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {options.map((o) => {
        const isSel = value === o.value;
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            className={cn(
              "rounded-lg border px-4 py-3 text-left transition-all",
              isSel ? "border-primary bg-primary/5 ring-1 ring-primary" : "hover:border-primary/40",
            )}
          >
            <p className={cn("text-sm font-semibold", isSel && "text-primary")}>{o.label}</p>
            <p className="text-muted-foreground mt-0.5 text-xs">{o.detail}</p>
          </button>
        );
      })}
    </div>
  );
}

/**
 * Step 2 — when and how: cohort start, days, time slot and delivery mode.
 * Long-form trainings run 3 days/week; short courses keep the published
 * two-sessions-per-week rhythm.
 */
export function ScheduleStep({ kind, draft, update, errors }: ScheduleStepProps) {
  const scheduleOptions = kind === "long" ? longScheduleOptions : shortScheduleOptions;

  return (
    <div className="space-y-6">
      <div>
        <Label className="flex items-center gap-2 text-sm font-bold">
          <CalendarDays className="text-primary size-4" /> Days (long-form: 3 days a week)
        </Label>
        <div className="mt-2.5">
          <OptionGrid
            options={scheduleOptions}
            value={
              kind === "long"
                ? draft.scheduleDays === "standard"
                  ? "mwf"
                  : draft.scheduleDays
                : "standard"
            }
            onChange={(v) => update({ scheduleDays: v as EnrollmentDraft["scheduleDays"] })}
          />
        </div>
      </div>

      <div>
        <Label className="flex items-center gap-2 text-sm font-bold">
          <SunMedium className="text-primary size-4" /> Preferred time slot
        </Label>
        <div className="mt-2.5">
          <OptionGrid
            options={timeSlotOptions}
            value={draft.timeSlot}
            onChange={(v) => update({ timeSlot: v as EnrollmentDraft["timeSlot"] })}
          />
        </div>
      </div>

      <div>
        <Label className="flex items-center gap-2 text-sm font-bold">
          <MapPin className="text-primary size-4" /> Where you attend
        </Label>
        <div className="mt-2.5">
          <OptionGrid
            options={modeOptions}
            value={draft.mode}
            onChange={(v) => update({ mode: v as EnrollmentDraft["mode"] })}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="preferredStart" className="flex items-center gap-2 text-sm font-bold">
          <Laptop className="text-primary size-4" /> When do you want to start?
        </Label>
        <Input
          id="preferredStart"
          type="date"
          min="2026-09-25"
          value={draft.preferredStart}
          onChange={(e) => update({ preferredStart: e.target.value })}
          className="mt-2.5"
        />
        <p className="text-muted-foreground mt-1.5 text-xs leading-relaxed">
          Optional. {kind === "long" ? NEXT_COHORTS.long : NEXT_COHORTS.short} We confirm your exact
          dates within 24 working hours.
        </p>
        {errors.preferredStart && (
          <p className="text-error mt-1 text-xs">{errors.preferredStart}</p>
        )}
      </div>
    </div>
  );
}
