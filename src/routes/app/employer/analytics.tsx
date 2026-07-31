import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Building2, Clock, TrendingUp, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/employer/analytics")({
  head: () => ({
    meta: [
      { title: "Hiring Analytics — CEA-OS" },
      { name: "description", content: "Time-to-hire, retention and pipeline analytics." },
    ],
  }),
  component: EmployerAnalytics,
});

const cohorts = [
  { y: "2025", hired: 14, kept: 12, pct: 86 },
  { y: "2024", hired: 9, kept: 8, pct: 89 },
  { y: "2023", hired: 6, kept: 6, pct: 100 },
];

function EmployerAnalytics() {
  return (
    <AppShell
      roleKey="instructor"
      title="Hiring analytics"
      subtitle="Time-to-hire 34 days · 12 hires this year"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">Retention 89%</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/employer/hub">
              <ArrowLeft className="size-4" /> Employer hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Time to hire",
            value: "34d",
            delta: "−6d vs last year",
            icon: Clock,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Hires this year",
            value: "12",
            delta: "from CEA-OS",
            icon: Users,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Offer acceptance",
            value: "88%",
            delta: "+7 pts",
            icon: TrendingUp,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Cost per hire",
            value: "₦210k",
            delta: "vs ₦380k agency",
            icon: Building2,
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
            <TrendingUp className="text-primary size-4" /> Retention by cohort
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {cohorts.map((c) => (
            <div key={c.y}>
              <div className="flex items-center justify-between text-xs font-semibold">
                <span>{c.y} cohort</span>
                <span className="text-muted-foreground">
                  {c.kept} of {c.hired} still with us
                </span>
              </div>
              <div className="bg-muted mt-1.5 h-2 overflow-hidden rounded-full">
                <div className="bg-success h-full rounded-full" style={{ width: `${c.pct}%` }} />
              </div>
            </div>
          ))}
          <p className="text-muted-foreground pt-1 text-xs">
            OSKM-verified hires keep longer — their skills match the job from day one.
          </p>
        </CardContent>
      </Card>
    </AppShell>
  );
}
