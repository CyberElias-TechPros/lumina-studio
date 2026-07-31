import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  UserRound,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/admissions/review")({
  head: () => ({
    meta: [
      { title: "Review Pipeline — CEA-OS" },
      { name: "description", content: "Shortlist, reject and take notes on applications." },
    ],
  }),
  component: AdmissionsReview,
});

const queue = [
  {
    n: "Musa Danjuma",
    p: "Cybersecurity",
    a: "Scored 82/100",
    s: "Shortlist",
    tone: "bg-success/10 text-success",
  },
  {
    n: "Ngozi Eze",
    p: "Data Science",
    a: "Scored 76/100",
    s: "Review",
    tone: "bg-primary/10 text-primary",
  },
  {
    n: "Kelechi Nwosu",
    p: "DevOps",
    a: "Scored 61/100",
    s: "Watchlist",
    tone: "bg-warning/10 text-warning",
  },
];

function AdmissionsReview() {
  return (
    <AppShell
      roleKey="instructor"
      title="Review pipeline"
      subtitle="31 awaiting review · 14 shortlisted"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">On SLA</Badge>
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
            label: "In queue",
            value: "31",
            delta: "avg 2.1 days",
            icon: ClipboardCheck,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Shortlisted",
            value: "14",
            delta: "45% of queue",
            icon: CheckCircle2,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Rejected",
            value: "9",
            delta: "this month",
            icon: XCircle,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Score avg.",
            value: "74",
            delta: "out of 100",
            icon: FileText,
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
            <UserRound className="text-primary size-4" /> Review queue
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {queue.map((q) => (
            <div key={q.n} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">
                  {q.n} · {q.p}
                </p>
                <p className="text-muted-foreground text-xs">{q.a}</p>
              </div>
              <Badge className={cn("border-0 font-semibold", q.tone)}>{q.s}</Badge>
              <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                Review
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
