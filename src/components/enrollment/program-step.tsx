import { Check, Clock3, Layers } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { flyerCourses, longformPrograms } from "@/data/academy";
import { cn } from "@/lib/utils";
import { formatFee } from "./meta";

interface ProgramStepProps {
  kind: "short" | "long";
  onKind: (kind: "short" | "long") => void;
  selected: string;
  onSelect: (slug: string) => void;
  error?: string;
}

/**
 * Step 1 — pick the programme. Short courses (2 sessions/week, as published)
 * or long-form trainings (3 days/week, market-anchored pricing).
 */
export function ProgramStep({ kind, onKind, selected, onSelect, error }: ProgramStepProps) {
  return (
    <div>
      <Tabs
        value={kind}
        onValueChange={(v) => {
          onKind(v as "short" | "long");
          onSelect("");
        }}
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="short">
            <Clock3 className="size-4" /> Short courses
          </TabsTrigger>
          <TabsTrigger value="long">
            <Layers className="size-4" /> Long-form trainings
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
        {kind === "short"
          ? "2–6 week practical courses, two sessions a week. Fees shown are for the full course."
          : "3–6 month job-ready trainings, three days a week. Priced at the average market rate for part-time tech training in Nigeria."}
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {kind === "short"
          ? flyerCourses.map((c) => {
              const isSel = selected === c.slug;
              return (
                <Card
                  key={c.slug}
                  role="button"
                  tabIndex={0}
                  onClick={() => onSelect(c.slug)}
                  onKeyDown={(e) => e.key === "Enter" && onSelect(c.slug)}
                  className={cn(
                    "cursor-pointer transition-all",
                    isSel
                      ? "border-primary bg-primary/5 shadow-elevated ring-1 ring-primary"
                      : "hover:border-primary/40 hover:shadow-soft",
                  )}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-muted-foreground text-[11px] font-semibold">
                          {c.category}
                        </p>
                        <p className="font-display mt-0.5 text-sm leading-snug font-bold">
                          {c.title}
                        </p>
                      </div>
                      <span
                        className={cn(
                          "grid size-5 shrink-0 place-items-center rounded-full border",
                          isSel
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border",
                        )}
                      >
                        {isSel && <Check className="size-3" />}
                      </span>
                    </div>
                    <p className="text-muted-foreground mt-1.5 text-xs leading-relaxed">{c.hook}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-1.5">
                      <Badge className="bg-success/10 text-success h-5 border-0 text-[10px] font-bold">
                        {formatFee(c.fee)}
                      </Badge>
                      <Badge className="bg-muted text-muted-foreground h-5 border-0 text-[10px] font-bold">
                        {c.weeks} weeks · 2/week
                      </Badge>
                      <Badge className="bg-muted text-muted-foreground h-5 border-0 text-[10px] font-bold">
                        {c.level}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          : longformPrograms.map((p) => {
              const isSel = selected === p.slug;
              return (
                <Card
                  key={p.slug}
                  role="button"
                  tabIndex={0}
                  onClick={() => onSelect(p.slug)}
                  onKeyDown={(e) => e.key === "Enter" && onSelect(p.slug)}
                  className={cn(
                    "cursor-pointer transition-all",
                    isSel
                      ? "border-primary bg-primary/5 shadow-elevated ring-1 ring-primary"
                      : "hover:border-primary/40 hover:shadow-soft",
                  )}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-muted-foreground text-[11px] font-semibold">
                          {p.category}
                        </p>
                        <p className="font-display mt-0.5 text-sm leading-snug font-bold">
                          {p.title}
                        </p>
                      </div>
                      <span
                        className={cn(
                          "grid size-5 shrink-0 place-items-center rounded-full border",
                          isSel
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border",
                        )}
                      >
                        {isSel && <Check className="size-3" />}
                      </span>
                    </div>
                    <p className="text-muted-foreground mt-1.5 text-xs leading-relaxed">
                      {p.tagline}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-1.5">
                      <Badge className="bg-success/10 text-success h-5 border-0 text-[10px] font-bold">
                        {formatFee(p.fee)}
                      </Badge>
                      <Badge className="bg-muted text-muted-foreground h-5 border-0 text-[10px] font-bold">
                        {p.months} months · 3 days/week
                      </Badge>
                      <Badge className="bg-muted text-muted-foreground h-5 border-0 text-[10px] font-bold">
                        {p.level}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mt-2 text-[11px] leading-relaxed">
                      Save {formatFee(Math.round(p.fee * 0.1))} paying in full.
                    </p>
                  </CardContent>
                </Card>
              );
            })}
      </div>

      {kind === "long" && selected && (
        <p className="text-muted-foreground mt-3 flex items-center gap-1.5 text-xs">
          <Check className="text-success size-3.5" />
          {(() => {
            const p = longformPrograms.find((x) => x.slug === selected);
            return p
              ? `${p.title} — 3 days/week, ${p.months} months, ${formatFee(p.fee)} total`
              : "";
          })()}
        </p>
      )}

      {error && <p className="text-error mt-3 text-sm">{error}</p>}

      <p className="text-muted-foreground mt-4 text-xs leading-relaxed">
        Unsure which fits you?{" "}
        <a
          href="https://wa.me/2349058628386?text=Hello%20Cyber%20Elias%20Academy!%20I%20need%20help%20choosing%20a%20course."
          className="text-primary font-semibold underline-offset-2 hover:underline"
        >
          WhatsApp admissions
        </a>{" "}
        — a person answers, Mon–Sat 8:00–20:00 WAT.
      </p>
    </div>
  );
}
