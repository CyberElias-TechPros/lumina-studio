import { createFileRoute } from "@tanstack/react-router";
import { Globe2, Languages, MapPin, MessageSquareText, Sparkles, Users, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/portal/global-copywriter")({
  head: () => ({
    meta: [
      { title: "Global Copywriter — CEA-OS" },
      {
        name: "description",
        content: "Localized, market-fit copy for Nigerian and global audiences.",
      },
    ],
  }),
  component: GlobalCopywriterPortal,
});

const markets = [
  { t: "Lagos campus pages", lang: "EN · NG", status: "Live", tone: "bg-success/10 text-success" },
  {
    t: "UK diaspora campaign",
    lang: "EN · UK",
    status: "In review",
    tone: "bg-primary/10 text-primary",
  },
  {
    t: "Yoruba social posts",
    lang: "YO · NG",
    status: "Draft",
    tone: "bg-warning/10 text-warning",
  },
];

function GlobalCopywriterPortal() {
  return (
    <AppShell
      roleKey="instructor"
      title="Global copy"
      subtitle="Nigerian-market tone · 3 languages · 4 markets"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            Tone: verified
          </Badge>
          <Badge variant="secondary" className="font-semibold">
            Cultural QA: on
          </Badge>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Markets",
            value: "4",
            delta: "NG, UK, GH, US",
            icon: Globe2,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Languages",
            value: "3",
            delta: "EN, YO, HA",
            icon: Languages,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Localized pages",
            value: "38",
            delta: "12 pending",
            icon: MapPin,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Cultural flags",
            value: "3",
            delta: "resolved this wk",
            icon: Sparkles,
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

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <MessageSquareText className="text-primary size-4" /> Market copy board
            </CardTitle>
          </CardHeader>
          <CardContent className="divide-y">
            {markets.map((m) => (
              <div
                key={m.t}
                className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
              >
                <span className="bg-muted text-muted-foreground grid size-9 shrink-0 place-items-center rounded-lg">
                  <Globe2 className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold">{m.t}</p>
                  <p className="text-muted-foreground text-xs">{m.lang}</p>
                </div>
                <Badge className={cn("border-0 font-semibold", m.tone)}>{m.status}</Badge>
                <Button variant="outline" size="sm" className="shrink-0">
                  Open
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <Users className="text-primary size-4" /> Localization stack
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { t: "Strings translated", v: "1,240 / 1,900", tone: "bg-primary/10 text-primary" },
                { t: "Glossary entries", v: "96 terms", tone: "bg-learning/10 text-learning" },
                { t: "Slang check (naija)", v: "Passed", tone: "bg-success/10 text-success" },
              ].map((x) => (
                <div key={x.t} className="flex items-center justify-between rounded-xl border p-3">
                  <span className="text-sm font-semibold">{x.t}</span>
                  <Badge className={cn("border-0 font-semibold", x.tone)}>{x.v}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gradient-ink text-ink-foreground shadow-elevated border-0">
            <CardContent className="p-6">
              <Zap className="text-warning size-5" />
              <p className="font-display mt-3 text-base font-extrabold">Voice rule #1</p>
              <p className="text-ink-foreground/70 mt-1 text-sm">
                Write like a brilliant Lagos mentor: ambitious, concrete, and proud of the craft.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
