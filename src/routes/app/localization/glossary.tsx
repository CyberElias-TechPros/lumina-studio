import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, CheckCircle2, Flag, Lightbulb, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/localization/glossary")({
  head: () => ({
    meta: [
      { title: "Cultural Glossary — CEA-OS" },
      { name: "description", content: "Term entries with definitions, usage and cultural notes." },
    ],
  }),
  component: CulturalGlossary,
});

const terms = [
  {
    t: "OWAMBE",
    d: "The hustle mentality of getting things done in Lagos",
    u: "Use for ambition-driven copy; avoid in formal finance pages",
    c: "Positive for 18-30 segment; read as playful",
    status: "Approved",
    tone: "bg-success/10 text-success",
  },
  {
    t: "Long throat",
    d: "Excessive desire or greed",
    u: "Never use in sales copy; may offend",
    c: "Flagged for all markets",
    status: "Flagged",
    tone: "bg-error/10 text-error",
  },
  {
    t: "Turn up",
    d: "To show up fully and participate",
    u: "Great for events and open days",
    c: "Cohort 15+ understands; use sparingly",
    status: "Approved",
    tone: "bg-success/10 text-success",
  },
  {
    t: "Sabi",
    d: "To know or master something well",
    u: "Use in Pidgin variants only",
    c: "Do not use in Yoruba or Hausa copy",
    status: "In review",
    tone: "bg-warning/10 text-warning",
  },
  {
    t: "Hustle",
    d: "Determined work, often informal",
    u: "Safe across NG markets; localise UK to 'drive'",
    c: "UK reviewers prefer 'ambition'",
    status: "Approved",
    tone: "bg-success/10 text-success",
  },
];

function CulturalGlossary() {
  return (
    <AppShell
      roleKey="localization"
      title="Cultural glossary"
      subtitle="96 terms · 81 approved · 3 flagged · owned by copy team"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">81 approved</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/localization">
              <ArrowLeft className="size-4" /> L10n hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Terms",
            value: "96",
            delta: "12 added this qtr",
            icon: BookOpen,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Approved",
            value: "81",
            delta: "84% of entries",
            icon: CheckCircle2,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Flagged",
            value: "3",
            delta: "1 critical",
            icon: Flag,
            tone: "bg-error/10 text-error",
          },
          {
            label: "Markets covered",
            value: "6",
            delta: "all NG + UK",
            icon: Sparkles,
            tone: "bg-learning/10 text-learning",
          },
        ].map((k) => (
          <Card key={k.label} className="bg-card shadow-soft border">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground text-xs font-bold tracking-wide uppercase">
                  {k.label}
                </p>
                <span className={cn("grid size-8 place-items-center rounded-lg", k.tone)}>
                  <k.icon className="size-4" />
                </span>
              </div>
              <p className="font-display mt-3 text-2xl font-extrabold">{k.value}</p>
              <p className="text-muted-foreground mt-0.5 text-xs font-semibold">{k.delta}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        {terms.map((t) => (
          <Card key={t.t} className="bg-card shadow-soft border">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <Lightbulb className="text-primary size-4" /> {t.t}
              </CardTitle>
              <Badge className={cn("border-0 font-semibold", t.tone)}>{t.status}</Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-xl border p-3">
                <p className="text-muted-foreground text-[10px] font-bold tracking-wide uppercase">
                  Definition
                </p>
                <p className="mt-0.5 text-xs font-semibold">{t.d}</p>
              </div>
              <div className="rounded-xl border p-3">
                <p className="text-muted-foreground text-[10px] font-bold tracking-wide uppercase">
                  Usage
                </p>
                <p className="mt-0.5 text-xs font-semibold">{t.u}</p>
              </div>
              <div className="rounded-xl border p-3">
                <p className="text-muted-foreground text-[10px] font-bold tracking-wide uppercase">
                  Cultural notes
                </p>
                <p className="mt-0.5 text-xs font-semibold">{t.c}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
