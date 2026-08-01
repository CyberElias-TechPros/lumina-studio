import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  FileText,
  MessageSquare,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { usePipelineCandidates } from "@/lib/query/recruitment";
import type { PipelineCandidate } from "@/lib/api/recruitment";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/employer/pipeline/$jobId")({
  head: () => ({
    meta: [
      { title: "Candidate Pipeline — CEA-OS" },
      { name: "description", content: "Shortlist, interview and hire candidates." },
    ],
  }),
  component: EmployerPipeline,
});

const stages = [
  { label: "Applied", count: 14 },
  { label: "Shortlisted", count: 6 },
  { label: "Interviewing", count: 4 },
  { label: "Offer", count: 1 },
];

function candidateTone(stage: string): string {
  if (stage === "Interview") return "bg-primary/10 text-primary";
  if (stage === "Shortlist") return "bg-learning/10 text-learning";
  return "bg-muted-foreground/10 text-muted-foreground";
}

function EmployerPipeline() {
  const { jobId } = Route.useParams();
  const query = usePipelineCandidates(jobId);

  return (
    <AppShell
      roleKey="instructor"
      title="Junior Backend Engineer"
      subtitle="14 applicants · posted Jul 28 · Paystack"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            Interviewing 4
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/employer/jobs">
              <ArrowLeft className="size-4" /> All jobs
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stages.map((s) => (
          <Card key={s.label} className="bg-card shadow-soft border">
            <CardContent className="flex items-center justify-between p-4">
              <p className="text-muted-foreground text-xs font-bold tracking-wide uppercase">
                {s.label}
              </p>
              <span className="bg-primary/10 text-primary font-display grid size-8 place-items-center rounded-lg text-sm font-extrabold">
                {s.count}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-card mt-5 shadow-soft border">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <BriefcaseBusiness className="text-primary size-4" /> Candidates
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<PipelineCandidate[]>
            query={query}
            error={{ title: "Candidates unavailable" }}
          >
            {(rows) => (
              <>
                {rows.map((c) => (
                  <div
                    key={c.id}
                    className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <span
                      className={cn(
                        "grid size-9 shrink-0 place-items-center rounded-lg text-xs font-extrabold",
                        candidateTone(c.stage),
                      )}
                    >
                      {c.score}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">{c.name}</p>
                      <p className="text-muted-foreground text-xs">{c.detail}</p>
                    </div>
                    <Badge className={cn("border-0 font-semibold", candidateTone(c.stage))}>
                      {c.stage}
                    </Badge>
                    <div className="flex shrink-0 gap-1">
                      <Button variant="outline" size="sm" className="font-semibold">
                        <FileText className="size-3.5" /> CV
                      </Button>
                      <Button variant="outline" size="sm" className="font-semibold">
                        <MessageSquare className="size-3.5" />
                      </Button>
                      <Button size="sm" className="font-semibold">
                        <CalendarDays className="size-3.5" /> Schedule
                      </Button>
                    </div>
                  </div>
                ))}
              </>
            )}
          </QueryState>
        </CardContent>
      </Card>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <Card className="bg-gradient-ink text-ink-foreground shadow-elevated border-0">
          <CardContent className="p-6">
            <CheckCircle2 className="text-success size-5" />
            <p className="font-display mt-3 text-base font-extrabold">Hiring loop</p>
            <p className="text-ink-foreground/70 mt-1 text-sm">
              Offer extended to Ada Okafor — she's completing the backend exam, onboarding planned
              for Nov 1.
            </p>
          </CardContent>
        </Card>
        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <XCircle className="text-primary size-4" /> Rejected this week
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              "Kelechi I. — filter: no REST experience",
              "Ngozi E. — withdrew (accepted elsewhere)",
            ].map((r) => (
              <p
                key={r}
                className="text-muted-foreground rounded-xl border p-3 text-xs font-medium"
              >
                {r}
              </p>
            ))}
            <p className="text-muted-foreground text-[11px]">
              Rejections auto-send feedback — CEA keeps its reputation pipeline clean.
            </p>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
