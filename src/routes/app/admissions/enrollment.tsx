import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CalendarCheck2, GraduationCap, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/admissions/enrollment")({
  head: () => ({
    meta: [
      { title: "Enrollment — CEA-OS" },
      { name: "description", content: "Paid versus pending enrollment and orientation." },
    ],
  }),
  component: AdmissionsEnrollment,
});

const cohorts = [
  {
    c: "Cohort 16 · Fall",
    e: "64 enrolled",
    p: "52 paid · 12 pending",
    tone: "bg-success/10 text-success",
  },
  { c: "Cohort 15 · Spring", e: "78 enrolled", p: "78 paid", tone: "bg-primary/10 text-primary" },
];

function AdmissionsEnrollment() {
  return (
    <AppShell
      roleKey="instructor"
      title="Enrollment tracker"
      subtitle="64 enrolled · 52 paid (81%) · orientation Aug 24"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">81% paid</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/admissions">
              <ArrowLeft className="size-4" /> Admissions hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Enrolled",
            value: "64",
            delta: "Cohort 16",
            icon: GraduationCap,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Paid",
            value: "52",
            delta: "81% of cohort",
            icon: Wallet,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Pending payment",
            value: "12",
            delta: "due Aug 15",
            icon: Wallet,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Orientation",
            value: "Aug 24",
            delta: "on campus",
            icon: CalendarCheck2,
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
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <GraduationCap className="text-primary size-4" /> Cohorts
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {cohorts.map((c) => (
            <div key={c.c} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{c.c}</p>
                <p className="text-muted-foreground text-xs">{c.p}</p>
              </div>
              <Badge className={cn("border-0 font-semibold", c.tone)}>{c.e}</Badge>
              <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                View
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
