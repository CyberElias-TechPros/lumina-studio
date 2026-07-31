import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  ClipboardCheck,
  FileText,
  GraduationCap,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/portal/academic-board")({
  head: () => ({
    meta: [
      { title: "Academic Board — CEA-OS" },
      {
        name: "description",
        content: "Curriculum, examinations and academic standards for the Academic Board.",
      },
    ],
  }),
  component: AcademicBoardPortal,
});

const agenda = [
  {
    item: "Approve Cohort 16 curriculum — 8 programs",
    status: "Reading",
    tone: "bg-primary/10 text-primary",
  },
  {
    item: "Examination policy review 2026/27",
    status: "Draft",
    tone: "bg-warning/10 text-warning",
  },
  {
    item: "OSKM skill map update — AI tools",
    status: "Adopted",
    tone: "bg-success/10 text-success",
  },
  { item: "Capstone grading rubric review", status: "Reading", tone: "bg-primary/10 text-primary" },
];

function AcademicBoardPortal() {
  return (
    <AppShell
      roleKey="instructor"
      title="Academic board"
      subtitle="Curriculum, examinations, standards · next sitting Aug 21"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">Quorum: 9/11</Badge>
          <Button asChild variant="outline" size="sm" className="ml-auto">
            <Link to="/programs">Curriculum catalogue</Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Programs approved",
            value: "8",
            delta: "for Cohort 16",
            icon: GraduationCap,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Examinations",
            value: "14",
            delta: "next: mid-term",
            icon: ClipboardCheck,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Rubrics reviewed",
            value: "22",
            delta: "this term",
            icon: FileText,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Board meetings",
            value: "5",
            delta: "2 remaining 2026",
            icon: CalendarDays,
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
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <BookOpen className="text-primary size-4" /> Meeting agenda · Aug 21
            </CardTitle>
            <Badge className="bg-error/10 text-error border-0 font-semibold">4 items</Badge>
          </CardHeader>
          <CardContent className="divide-y">
            {agenda.map((a) => (
              <div
                key={a.item}
                className="flex flex-wrap items-center gap-3 py-3.5 first:pt-0 last:pb-0"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold">{a.item}</p>
                  <p className="text-muted-foreground text-xs">
                    Papers attached · decision required
                  </p>
                </div>
                <Badge className={cn("border-0 font-semibold", a.tone)}>{a.status}</Badge>
                <Button variant="outline" size="sm" className="shrink-0">
                  Review
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <ShieldCheck className="text-primary size-4" /> Academic standards
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { t: "Grade point scale", d: "5.0 scale · senate approved" },
                { t: "Exam integrity", d: "Version 2.4 · proctoring enabled" },
                { t: "Appeal window", d: "72h after results · 12 appeals this term" },
              ].map((x) => (
                <div key={x.t} className="rounded-xl border p-3.5">
                  <p className="text-sm font-bold">{x.t}</p>
                  <p className="text-muted-foreground mt-0.5 text-xs">{x.d}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gradient-ink text-ink-foreground shadow-elevated border-0">
            <CardContent className="p-6">
              <ClipboardCheck className="text-career size-5" />
              <p className="font-display mt-3 text-base font-extrabold">Examinations · Term 2</p>
              <p className="text-ink-foreground/70 mt-1 text-sm">
                6 papers scheduled, 0 clashes, 96% sitting rate. Results release window: Aug 28 –
                Sep 2.
              </p>
              <Button asChild size="sm" className="bg-gradient-brand shadow-glow mt-4 border-0">
                <Link to="/portal/registrar">
                  Registrar's office <ArrowRight className="ml-1 size-3.5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
