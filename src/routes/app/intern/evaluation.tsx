import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Award, CheckCircle2, ClipboardCheck, FileText, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import {
  useIntEvaluationItems,
  useIntEvaluations,
  useIntSkillItems,
} from "@/lib/query/internDashboard";
import type { IntEvaluation } from "@/lib/api/internDashboard";
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

const evalLabel: Record<string, string> = {
  self: "Self-evaluation (mid)",
  supervisor: "Supervisor review (mid)",
  final: "Final evaluation",
};

const evalMeta: Record<string, { label: string; tone: string }> = {
  self: { label: "Submitted", tone: "bg-success/10 text-success" },
  supervisor: { label: "Completed", tone: "bg-primary/10 text-primary" },
  final: { label: "Due week 12", tone: "bg-warning/10 text-warning" },
};

function InternEvaluation() {
  const evaluationsQuery = useIntEvaluations();
  const evaluations = useIntEvaluationItems();
  const skills = useIntSkillItems();

  const self = evaluations.find((e) => e.kind === "self");
  const supervisor = evaluations.find((e) => e.kind === "supervisor");
  const scored = [self, supervisor].filter((e): e is IntEvaluation => Boolean(e && e.score > 0));
  const combined =
    scored.length > 0
      ? (scored.reduce((n, e) => n + e.score, 0) / scored.length).toFixed(1)
      : "0.0";

  return (
    <AppShell
      roleKey="student"
      title="Evaluation"
      subtitle={
        scored.length > 0
          ? `Midpoint: ${combined} / 5 combined · strong trajectory`
          : "Midpoint review"
      }
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
            value: evaluations.length > 0 ? (self?.score.toFixed(1) ?? "—") : "—",
            delta: "out of 5",
            icon: ClipboardCheck,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Supervisor",
            value: evaluations.length > 0 ? (supervisor?.score.toFixed(1) ?? "—") : "—",
            delta: "out of 5",
            icon: FileText,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Combined",
            value: evaluations.length > 0 ? combined : "—",
            delta: "target 3.5",
            icon: Star,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Skills rated",
            value: skills.length > 0 ? String(skills.length) : "—",
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
          <QueryState<IntEvaluation[]>
            query={evaluationsQuery}
            error={{ title: "Evaluations unavailable" }}
            empty={{ title: "No reviews yet", description: "Reviews will appear here." }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) => (
              <>
                {rows.map((e) => {
                  const meta = evalMeta[e.kind] ?? {
                    label: e.status,
                    tone: "bg-muted text-muted-foreground",
                  };
                  const value = e.score > 0 ? `${e.score.toFixed(1)} / 5` : e.status;
                  return (
                    <div
                      key={e.id}
                      className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold">{evalLabel[e.kind]}</p>
                        <p className="text-muted-foreground text-xs">{value}</p>
                      </div>
                      <Badge className={cn("border-0 font-semibold", meta.tone)}>
                        {meta.label}
                      </Badge>
                      <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                        View
                      </Button>
                    </div>
                  );
                })}
              </>
            )}
          </QueryState>
        </CardContent>
      </Card>
    </AppShell>
  );
}
