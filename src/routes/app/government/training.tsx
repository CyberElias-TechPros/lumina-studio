import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Award, BookOpen, CheckCircle2, GraduationCap, Timer } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/government/training")({
  head: () => ({
    meta: [
      { title: "Compliance Training — CEA-OS" },
      { name: "description", content: "Training and certifications." },
    ],
  }),
  component: GovernmentTraining,
});

const courses = [
  {
    c: "Data protection (NDPR)",
    v: "88 staff certified",
    s: "Current",
    tone: "bg-success/10 text-success",
  },
  {
    c: "Child safeguarding",
    v: "214 staff certified",
    s: "Current",
    tone: "bg-success/10 text-success",
  },
  {
    c: "Academic integrity",
    v: "46 certified · 12 pending",
    s: "Renewing",
    tone: "bg-warning/10 text-warning",
  },
];

function GovernmentTraining() {
  return (
    <AppShell
      roleKey="admin"
      title="Compliance training"
      subtitle="6 mandatory courses · 92% coverage · auto-reminders"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">92% coverage</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/government">
              <ArrowLeft className="size-4" /> Compliance portal
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Courses",
            value: "6",
            delta: "mandatory",
            icon: BookOpen,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Coverage",
            value: "92%",
            delta: "of staff",
            icon: GraduationCap,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Certifications",
            value: "612",
            delta: "issued",
            icon: Award,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Expiring < 90d",
            value: "14",
            delta: "flagged",
            icon: Timer,
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
            <CheckCircle2 className="text-primary size-4" /> Courses
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {courses.map((c) => (
            <div key={c.c} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{c.c}</p>
                <p className="text-muted-foreground text-xs">{c.v}</p>
              </div>
              <Badge className={cn("border-0 font-semibold", c.tone)}>{c.s}</Badge>
              <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                Report
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
