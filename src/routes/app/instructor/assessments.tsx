import { createFileRoute } from "@tanstack/react-router";
import {
  BarChart3,
  CheckCircle2,
  Clock3,
  FileText,
  Plus,
  Send,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/instructor/assessments")({
  head: () => ({
    meta: [
      { title: "Assessment Engine — CEA-OS" },
      {
        name: "description",
        content: "Quizzes, exams and auto-graded checkpoints across your courses.",
      },
    ],
  }),
  component: AssessmentEngine,
});

const assessments = [
  {
    title: "REST API Quiz 2",
    course: "Backend & APIs",
    type: "Quiz",
    due: "Aug 1",
    status: "Published",
    auto: true,
  },
  {
    title: "SQL Mid-term Exam",
    course: "Backend & APIs",
    type: "Exam",
    due: "Aug 8",
    status: "Scheduled",
    auto: false,
  },
  {
    title: "Middleware Take-home",
    course: "Backend & APIs",
    type: "Take-home",
    due: "Aug 3",
    status: "Published",
    auto: true,
  },
  {
    title: "Portfolio Sprint Review",
    course: "Frontend Foundations",
    type: "Oral",
    due: "Aug 15",
    status: "Draft",
    auto: false,
  },
  {
    title: "DevOps Mock Certification",
    course: "DevOps Essentials",
    type: "Practice",
    due: "Aug 22",
    status: "Scheduled",
    auto: true,
  },
];

const submissions = [
  {
    student: "Chiamaka Eze",
    assessment: "REST API Quiz 2",
    score: "92%",
    status: "Auto-graded",
    tone: "bg-success/10 text-success",
  },
  {
    student: "Ibrahim Sule",
    assessment: "REST API Quiz 2",
    score: "78%",
    status: "Auto-graded",
    tone: "bg-success/10 text-success",
  },
  {
    student: "Funke Adeyemi",
    assessment: "Middleware Take-home",
    score: "—",
    status: "Under review",
    tone: "bg-warning/10 text-warning",
  },
  {
    student: "Tunde Bakare",
    assessment: "REST API Quiz 2",
    score: "64%",
    status: "Auto-graded",
    tone: "bg-success/10 text-success",
  },
  {
    student: "Ngozi Umeh",
    assessment: "SQL Quiz 1",
    score: "51%",
    status: "Needs review",
    tone: "bg-error/10 text-error",
  },
];

function AssessmentEngine() {
  return (
    <AppShell
      roleKey="instructor"
      title="Assessment engine"
      subtitle="Quizzes, exams and auto-grading · Cohort 15"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            Auto-grading live
          </Badge>
          <Button size="sm" className="bg-gradient-brand shadow-glow border-0 font-semibold">
            <Plus className="size-3.5" /> Create assessment
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Quizzes",
            value: "12",
            delta: "2 created this month",
            icon: FileText,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Exams",
            value: "4",
            delta: "2 scheduled",
            icon: ShieldCheck,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Auto-grade rate",
            value: "87%",
            delta: "of objective items",
            icon: Zap,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Avg score",
            value: "74%",
            delta: "+4.1 pts this term",
            icon: BarChart3,
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
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <ShieldCheck className="text-primary size-4" /> Assessments
          </CardTitle>
          <Badge className="bg-warning/10 text-warning border-0 font-semibold">2 due soon</Badge>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Due</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Auto-graded</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assessments.map((a) => (
                <TableRow key={a.title}>
                  <TableCell className="text-xs font-bold">{a.title}</TableCell>
                  <TableCell className="text-muted-foreground text-xs">{a.course}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="font-semibold">
                      {a.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-xs">{a.due}</TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        "border-0 font-semibold",
                        a.status === "Published"
                          ? "bg-success/10 text-success"
                          : a.status === "Scheduled"
                            ? "bg-primary/10 text-primary"
                            : "bg-warning/10 text-warning",
                      )}
                    >
                      {a.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {a.auto ? (
                      <span className="flex items-center gap-1.5 text-xs font-semibold">
                        <Zap className="text-success size-3.5" /> Yes
                      </span>
                    ) : (
                      <span className="text-muted-foreground text-xs font-semibold">Manual</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <Card className="bg-card shadow-soft border">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <Clock3 className="text-primary size-4" /> Recent submissions
            </CardTitle>
            <Button variant="outline" size="sm" className="font-semibold">
              <Send className="mr-1.5 size-3.5" /> Review inbox
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Assessment</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions.map((s) => (
                  <TableRow key={s.student + s.assessment}>
                    <TableCell className="text-xs font-bold">{s.student}</TableCell>
                    <TableCell className="text-muted-foreground text-xs">{s.assessment}</TableCell>
                    <TableCell className="font-display text-xs font-extrabold">{s.score}</TableCell>
                    <TableCell className="text-right">
                      <Badge className={cn("border-0 font-semibold", s.tone)}>{s.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="bg-gradient-ink text-ink-foreground shadow-elevated border-0">
          <CardContent className="p-6">
            <Sparkles className="text-warning size-5" />
            <p className="font-display mt-3 text-base font-extrabold">Auto-grade insight</p>
            <p className="text-ink-foreground/70 mt-1 text-sm">
              Learners who retake a quiz within 48 hours improve by 11 points on average. Ngozi Umeh
              is one retake away from passing SQL Quiz 1 — suggest a second attempt when you grade
              it.
            </p>
            <div className="mt-4 space-y-2">
              {[
                { t: "Objective items auto-graded", v: "312", tone: "bg-white/15 text-white" },
                { t: "Manual reviews pending", v: "9", tone: "bg-warning/10 text-warning" },
                { t: "Scores flagged for dispute", v: "1", tone: "bg-error/10 text-error" },
              ].map((x) => (
                <div
                  key={x.t}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2"
                >
                  <span className="text-xs font-semibold">{x.t}</span>
                  <Badge className={cn("border-0 font-semibold", x.tone)}>{x.v}</Badge>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs">
              <CheckCircle2 className="text-success size-4" />
              <span className="text-ink-foreground/70 font-semibold">
                Plagiarism scan ran 12 minutes ago
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
