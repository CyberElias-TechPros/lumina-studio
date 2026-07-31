import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, ClipboardCheck, Laptop, UserRoundPlus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/hr/onboarding")({
  head: () => ({
    meta: [
      { title: "Onboarding — CEA-OS" },
      { name: "description", content: "Onboarding and offboarding checklists." },
    ],
  }),
  component: HrOnboarding,
});

const checklists = [
  {
    c: "K. Okafor · Admissions officer",
    d: "Start Aug 4 · 8/12 steps",
    pct: 67,
    tone: "bg-primary/10 text-primary",
  },
  {
    c: "T. Bello · Data analyst",
    d: "Started Jul 1 · 12/12 steps",
    pct: 100,
    tone: "bg-success/10 text-success",
  },
  {
    c: "Offboard — J. Okonkwo",
    d: "Exit Aug 15 · 3/8 steps",
    pct: 38,
    tone: "bg-warning/10 text-warning",
  },
];

function HrOnboarding() {
  return (
    <AppShell
      roleKey="instructor"
      title="Onboarding / offboarding"
      subtitle="1 in progress · 1 complete · 1 exit"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            94% completion
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/hr">
              <ArrowLeft className="size-4" /> HR hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Active",
            value: "2",
            delta: "1 hire · 1 exit",
            icon: UserRoundPlus,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Completed (30d)",
            value: "3",
            delta: "all 100%",
            icon: CheckCircle2,
            tone: "bg-success/10 text-success",
          },
          {
            label: "IT tasks done",
            value: "11",
            delta: "devices ready",
            icon: Laptop,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Avg. time",
            value: "4.2 days",
            delta: "target < 5",
            icon: ClipboardCheck,
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
            <ClipboardCheck className="text-primary size-4" /> Checklists
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {checklists.map((c) => (
            <div key={c.c}>
              <div className="flex items-center justify-between text-xs font-semibold">
                <span>{c.c}</span>
                <Badge className={cn("border-0 font-semibold", c.tone)}>{c.pct}%</Badge>
              </div>
              <div className="bg-muted mt-1.5 h-2 overflow-hidden rounded-full">
                <div
                  className={cn(
                    "h-full rounded-full",
                    c.pct >= 70 ? "bg-gradient-brand" : "bg-warning",
                  )}
                  style={{ width: `${c.pct}%` }}
                />
              </div>
              <p className="text-muted-foreground mt-1 text-xs">{c.d}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
