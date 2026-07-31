import { createFileRoute } from "@tanstack/react-router";
import { Boxes, CalendarDays, Megaphone, PackageCheck, Rocket, Tags, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/portal/product-marketing")({
  head: () => ({
    meta: [
      { title: "Product Marketing — CEA-OS" },
      { name: "description", content: "Launches, positioning, pricing and go-to-market plans." },
    ],
  }),
  component: ProductMarketingPortal,
});

const launches = [
  {
    t: "Data & AI programme",
    phase: "Beta · Q4 2026",
    status: "Building",
    tone: "bg-primary/10 text-primary",
  },
  {
    t: "Employer talent pass",
    phase: "Closed beta",
    status: "Live",
    tone: "bg-success/10 text-success",
  },
  {
    t: "Parent app launch",
    phase: "Aug 2026",
    status: "Scheduled",
    tone: "bg-warning/10 text-warning",
  },
];

function ProductMarketingPortal() {
  return (
    <AppShell
      roleKey="instructor"
      title="Product marketing"
      subtitle="Positioning, launches and GTM · Q3 2026"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">GTM on track</Badge>
          <Badge variant="secondary" className="font-semibold">
            3 launches in flight
          </Badge>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Launches",
            value: "3",
            delta: "1 live now",
            icon: Rocket,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Positioning docs",
            value: "7",
            delta: "2 in review",
            icon: Target,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Pricing models",
            value: "4",
            delta: "1 tested",
            icon: Tags,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Sales collateral",
            value: "12",
            delta: "5 decks",
            icon: Boxes,
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

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <Rocket className="text-primary size-4" /> Launch radar
            </CardTitle>
          </CardHeader>
          <CardContent className="divide-y">
            {launches.map((l) => (
              <div
                key={l.t}
                className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
              >
                <span className="bg-muted text-muted-foreground grid size-9 shrink-0 place-items-center rounded-lg">
                  <Megaphone className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold">{l.t}</p>
                  <p className="text-muted-foreground text-xs">{l.phase}</p>
                </div>
                <Badge className={cn("border-0 font-semibold", l.tone)}>{l.status}</Badge>
                <Button variant="outline" size="sm" className="shrink-0">
                  Playbook
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <CalendarDays className="text-primary size-4" /> GTM checklist · parent app
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { t: "Messaging house", v: "Done", tone: "bg-success/10 text-success" },
                { t: "Pricing FAQ", v: "In review", tone: "bg-warning/10 text-warning" },
                {
                  t: "Store listing assets",
                  v: "Queued",
                  tone: "bg-muted-foreground/10 text-muted-foreground",
                },
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
              <PackageCheck className="text-success size-5" />
              <p className="font-display mt-3 text-base font-extrabold">Positioning one-liner</p>
              <p className="text-ink-foreground/70 mt-1 text-sm">
                "The academy that takes you from Lagos classroom to global tech job — with the
                portfolio to prove it."
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
