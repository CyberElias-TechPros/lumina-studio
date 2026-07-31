import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, HeartPulse, Users, UserRoundCheck, UserRoundX } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/director/hr")({
  head: () => ({
    meta: [
      { title: "HR Overview — CEA-OS" },
      { name: "description", content: "Headcount, turnover and people satisfaction." },
    ],
  }),
  component: DirectorHr,
});

const depts = [
  { d: "Academic", h: "34", t: "6%", tone: "bg-primary/10 text-primary" },
  { d: "Operations", h: "18", t: "9%", tone: "bg-learning/10 text-learning" },
  { d: "Marketing & Growth", h: "12", t: "5%", tone: "bg-success/10 text-success" },
  { d: "Finance & Admin", h: "9", t: "3%", tone: "bg-warning/10 text-warning" },
];

function DirectorHr() {
  return (
    <AppShell
      roleKey="admin"
      title="HR overview"
      subtitle="94 staff · 8% turnover · eNPS 61"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            People healthy
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/portal/director">
              <ArrowLeft className="size-4" /> Director portal
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Headcount",
            value: "94",
            delta: "6 open roles",
            icon: Users,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Turnover (12m)",
            value: "8%",
            delta: "benchmark 12%",
            icon: UserRoundX,
            tone: "bg-success/10 text-success",
          },
          {
            label: "eNPS",
            value: "61",
            delta: "+4 vs Q2",
            icon: HeartPulse,
            tone: "bg-community/10 text-community",
          },
          {
            label: "Onboarding",
            value: "94%",
            delta: "30-day completion",
            icon: UserRoundCheck,
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

      <Card className="bg-card mt-5 shadow-soft border">
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <Users className="text-primary size-4" /> Headcount by department
          </CardTitle>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/portal/hr">
              HR portal <ArrowRight className="ml-1 size-3.5" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="divide-y">
          {depts.map((d) => (
            <div key={d.d} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{d.d}</p>
                <p className="text-muted-foreground text-xs">Turnover {d.t} (12m)</p>
              </div>
              <Badge variant="secondary" className="font-semibold">
                {d.h} staff
              </Badge>
              <Badge className={cn("border-0 font-semibold", d.tone)}>Stable</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
