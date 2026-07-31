import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, BookMarked, CheckCircle2, Languages, PenLine, Type } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/conversion-copy/style-guide")({
  head: () => ({
    meta: [
      { title: "Style Guide — CEA-OS" },
      { name: "description", content: "Voice, tone and grammar rules." },
    ],
  }),
  component: CopyStyleGuide,
});

const rules = [
  {
    r: "Tone",
    v: "Confident, warm, zero hype — 'join' not 'seize your chance'",
    s: "Enforced",
    tone: "bg-success/10 text-success",
  },
  {
    r: "Formatting",
    v: "Sentences ≤ 20 words · bullets for benefits",
    s: "Enforced",
    tone: "bg-success/10 text-success",
  },
  {
    r: "Localization",
    v: "English + pidgin variants reviewed by native speakers",
    s: "Draft",
    tone: "bg-warning/10 text-warning",
  },
];

function CopyStyleGuide() {
  return (
    <AppShell
      roleKey="instructor"
      title="Style guide"
      subtitle="v4.2 · 48 rules · enforced in editor"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">Current</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/conversion-copy/library">
              <ArrowLeft className="size-4" /> Library
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Rules",
            value: "48",
            delta: "20 voice · 28 grammar",
            icon: BookMarked,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Enforced",
            value: "97%",
            delta: "in editor",
            icon: CheckCircle2,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Languages",
            value: "3",
            delta: "EN · pidgin · HA",
            icon: Languages,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Exemptions",
            value: "2",
            delta: "creative license",
            icon: PenLine,
            tone: "bg-warning/10 text-warning",
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

      <Card className="bg-card mt-5 shadow-soft border">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <Type className="text-primary size-4" /> Key rules
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {rules.map((r) => (
            <div key={r.r} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{r.r}</p>
                <p className="text-muted-foreground text-xs">{r.v}</p>
              </div>
              <Badge className={cn("border-0 font-semibold", r.tone)}>{r.s}</Badge>
              <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                Edit
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
