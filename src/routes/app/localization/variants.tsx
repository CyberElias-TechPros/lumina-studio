import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Globe, Languages, MapPin, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/localization/variants")({
  head: () => ({
    meta: [
      { title: "Copy Variants — CEA-OS" },
      { name: "description", content: "Market-specific copy variants with tone notes." },
    ],
  }),
  component: CopyVariants,
});

const locales = [
  {
    t: "NG · English",
    code: "en-NG",
    tone: "Direct, warm, aspirational",
    status: "Live",
    tag: "bg-success/10 text-success",
  },
  {
    t: "Yoruba",
    code: "yo-NG",
    tone: "Proverbs where apt, respectful",
    status: "Live",
    tag: "bg-success/10 text-success",
  },
  {
    t: "Hausa",
    code: "ha-NG",
    tone: "Formal, honourifics, clear",
    status: "Live",
    tag: "bg-success/10 text-success",
  },
  {
    t: "Igbo",
    code: "ig-NG",
    tone: "Community-first, proud",
    status: "In review",
    tag: "bg-warning/10 text-warning",
  },
  {
    t: "Nigerian Pidgin",
    code: "pcm-NG",
    tone: "Chill, relatable, no slang drift",
    status: "In review",
    tag: "bg-warning/10 text-warning",
  },
  {
    t: "Ghana",
    code: "en-GH",
    tone: "Neutral, warm, TW2 notes",
    status: "Draft",
    tag: "bg-primary/10 text-primary",
  },
  {
    t: "Kenya",
    code: "en-KE",
    tone: "Enthusiastic, goal-oriented",
    status: "Draft",
    tag: "bg-primary/10 text-primary",
  },
  {
    t: "UK",
    code: "en-GB",
    tone: "Measured, professional",
    status: "Live",
    tag: "bg-success/10 text-success",
  },
  {
    t: "US",
    code: "en-US",
    tone: "Action-first, concise",
    status: "Draft",
    tag: "bg-primary/10 text-primary",
  },
];

function CopyVariants() {
  return (
    <AppShell
      roleKey="localization"
      title="Copy variants"
      subtitle="9 locales · 4 live · cultural QA gate enabled"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">QA on</Badge>
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
            label: "Locales",
            value: "9",
            delta: "6 NG + 3 global",
            icon: Globe,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Variants live",
            value: "38",
            delta: "12 pages pending",
            icon: Languages,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "In review",
            value: "5",
            delta: "2 with cultural flags",
            icon: MapPin,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "QA passed",
            value: "44",
            delta: "this quarter",
            icon: CheckCircle2,
            tone: "bg-success/10 text-success",
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

      <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {locales.map((l) => (
          <Card key={l.code} className="bg-card shadow-soft border">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <Languages className="text-primary size-4" /> {l.t}
              </CardTitle>
              <Badge className={cn("border-0 font-semibold", l.tag)}>{l.status}</Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-xl border p-3">
                <p className="text-muted-foreground text-[10px] font-bold tracking-wide uppercase">
                  Locale code
                </p>
                <p className="font-mono mt-0.5 text-xs font-bold">{l.code}</p>
              </div>
              <div className="rounded-xl border p-3">
                <p className="text-muted-foreground text-[10px] font-bold tracking-wide uppercase">
                  Tone notes
                </p>
                <p className="mt-0.5 text-xs font-semibold">{l.tone}</p>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="text-warning size-3.5" />
                <span className="text-muted-foreground text-[10px] font-semibold">
                  Reviewer: {l.status === "Live" ? "approved" : "assigned"}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
