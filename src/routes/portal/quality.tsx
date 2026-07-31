import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  ClipboardList,
  FileCheck2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/portal/quality")({
  head: () => ({
    meta: [
      { title: "Quality Assurance — CEA-OS" },
      {
        name: "description",
        content: "Course reviews, audits, learner feedback and accreditation for the QA office.",
      },
    ],
  }),
  component: QualityPortal,
});

const audits = [
  {
    module: "Backend & APIs · Module 12",
    pct: 82,
    status: "In review",
    tone: "bg-primary/10 text-primary",
  },
  { module: "DevOps · Module 9", pct: 91, status: "Approved", tone: "bg-success/10 text-success" },
  { module: "Design · Module 7", pct: 68, status: "Revision", tone: "bg-warning/10 text-warning" },
];

const scores = [
  { label: "Instructor rating", v: 4.8 },
  { label: "Course content", v: 4.6 },
  { label: "Assessment fairness", v: 4.7 },
  { label: "Facilities", v: 4.4 },
];

function QualityPortal() {
  return (
    <AppShell
      roleKey="instructor"
      title="Quality assurance"
      subtitle="Reviews, audits, accreditation"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">OSKM-aligned</Badge>
          <Badge variant="secondary" className="font-semibold">
            Accreditation: in progress
          </Badge>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Course reviews",
            value: "6",
            delta: "2 due this week",
            icon: BookOpenCheck,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Audits passed",
            value: "18/19",
            delta: "YTD",
            icon: FileCheck2,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Learner feedback",
            value: "412",
            delta: "avg 4.7/5",
            icon: ClipboardList,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Open actions",
            value: "7",
            delta: "3 overdue",
            icon: ShieldCheck,
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
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <ClipboardList className="text-primary size-4" /> Module reviews in flight
            </CardTitle>
            <Badge variant="secondary" className="font-semibold">
              Target: 95% pass
            </Badge>
          </CardHeader>
          <CardContent className="space-y-5">
            {audits.map((a) => (
              <div key={a.module}>
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span>{a.module}</span>
                  <Badge className={cn("border-0 font-semibold", a.tone)}>{a.status}</Badge>
                </div>
                <Progress value={a.pct} className="mt-1.5 h-2" />
                <p className="text-muted-foreground mt-1.5 text-xs">QA score: {a.pct}%</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <Sparkles className="text-primary size-4" /> Learner satisfaction
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {scores.map((s) => (
                <div key={s.label}>
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span>{s.label}</span>
                    <span className="font-display text-sm font-extrabold">{s.v}/5</span>
                  </div>
                  <Progress value={s.v * 20} className="mt-1.5 h-1.5" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gradient-ink text-ink-foreground shadow-elevated border-0">
            <CardContent className="p-6">
              <CheckCircle2 className="text-success size-5" />
              <p className="font-display mt-3 text-base font-extrabold">Accreditation tracker</p>
              <p className="text-ink-foreground/70 mt-1 text-sm">
                NBTE self-study submitted. On-site visit scheduled Q4. Milestones: 3 of 5 complete.
              </p>
              <Button asChild size="sm" className="bg-gradient-brand shadow-glow mt-4 border-0">
                <Link to="/about">
                  About CEA <ArrowRight className="ml-1 size-3.5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
