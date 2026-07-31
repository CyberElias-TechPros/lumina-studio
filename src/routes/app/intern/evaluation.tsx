import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Award, CheckCircle2, ClipboardCheck, FileText, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/intern/evaluation")({
  head: () => ({
    meta: [
      { title: "Evaluation — CEA-OS" },
      { name: "description", content: "Self, supervisor and final review." },
    ],
  }),
  component: InternEvaluation,
});

const evals = [
  { e: "Self-evaluation (mid)", v: "4.2 / 5", s: "Submitted", tone: "bg-success/10 text-success" },
  {
    e: "Supervisor review (mid)",
    v: "4.0 / 5",
    s: "Completed",
    tone: "bg-primary/10 text-primary",
  },
  { e: "Final evaluation", v: "—", s: "Due week 12", tone: "bg-warning/10 text-warning" },
];

function InternEvaluation() {
  return (
    <AppShell
      roleKey="student"
      title="Evaluation"
      subtitle="Midpoint: 4.1 / 5 combined · strong trajectory"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">Above target</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/intern">
              <ArrowLeft className="size-4" /> Intern hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Self",
            value: "4.2",
            delta: "out of 5",
            icon: ClipboardCheck,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Supervisor",
            value: "4.0",
            delta: "out of 5",
            icon: FileText,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Combined",
            value: "4.1",
            delta: "target 3.5",
            icon: Star,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Skills rated",
            value: "12",
            delta: "all criteria met",
            icon: Award,
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
            <CheckCircle2 className="text-primary size-4" /> Reviews
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {evals.map((e) => (
            <div key={e.e} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{e.e}</p>
                <p className="text-muted-foreground text-xs">{e.v}</p>
              </div>
              <Badge className={cn("border-0 font-semibold", e.tone)}>{e.s}</Badge>
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
