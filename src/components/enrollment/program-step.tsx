"use client";

import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { flyerCourses, rotatingCourses } from "@/data/academy";
import { cn } from "@/lib/utils";
import { formatFee } from "./meta";

interface ProgramStepProps {
  selected: string;
  onSelect: (slug: string) => void;
  error?: string;
}

/** Step 1 — choose from the 13 core short courses listed on the Academy flyer. */
export function ProgramStep({ selected, onSelect, error }: ProgramStepProps) {
  return (
    <div>
      <p className="text-muted-foreground text-sm leading-relaxed">
        Choose from the {flyerCourses.length} core short courses on the Academy flyer. Each course
        page lists its fee, duration, requirements and practical outcome.
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {flyerCourses.map((course) => {
          const isSelected = selected === course.slug;
          return (
            <Card
              key={course.slug}
              role="button"
              tabIndex={0}
              aria-pressed={isSelected}
              onClick={() => onSelect(course.slug)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onSelect(course.slug);
                }
              }}
              className={cn(
                "cursor-pointer transition-all",
                isSelected
                  ? "border-primary bg-primary/5 shadow-elevated ring-1 ring-primary"
                  : "hover:border-primary/40 hover:shadow-soft",
              )}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-muted-foreground text-[11px] font-semibold">
                      {course.category}
                    </p>
                    <p className="font-display mt-0.5 text-sm leading-snug font-bold">
                      {course.title}
                    </p>
                  </div>
                  <span
                    className={cn(
                      "grid size-5 shrink-0 place-items-center rounded-full border",
                      isSelected
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border",
                    )}
                  >
                    {isSelected && <Check className="size-3" />}
                  </span>
                </div>
                <p className="text-muted-foreground mt-1.5 text-xs leading-relaxed">
                  {course.hook}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-1.5">
                  <Badge className="bg-success/10 text-success h-5 border-0 text-[10px] font-bold">
                    {formatFee(course.fee)}
                  </Badge>
                  <Badge className="bg-muted text-muted-foreground h-5 border-0 text-[10px] font-bold">
                    {course.weeks} weeks · {course.sessionsPerWeek}/week
                  </Badge>
                  <Badge className="bg-muted text-muted-foreground h-5 border-0 text-[10px] font-bold">
                    {course.level}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {error && <p className="text-error mt-3 text-sm">{error}</p>}

      <div className="border-border bg-muted/30 mt-6 space-y-3 rounded-xl border p-4 text-sm leading-relaxed">
        <p className="font-semibold">Other course enquiries</p>
        <p className="text-muted-foreground">
          {rotatingCourses.length} specialist short courses are listed separately as rotating
          options. Ask admissions whether a specific course is currently available. Longer-programme
          plans are not open for enrolment through this form; a programme listing alone does not
          confirm current delivery.
        </p>
        <p>
          <a
            href="https://wa.me/2349058628386?text=Hello%20Cyber%20Elias%20Academy!%20I%20have%20a%20question%20about%20course%20availability."
            className="text-primary font-semibold underline-offset-2 hover:underline"
          >
            Ask admissions on WhatsApp
          </a>{" "}
          <span className="text-muted-foreground">— Mon–Sat, 8:00–20:00 WAT.</span>
        </p>
      </div>
    </div>
  );
}
