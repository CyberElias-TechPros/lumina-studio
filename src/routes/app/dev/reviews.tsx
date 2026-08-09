import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Eye, Clock3, ThumbsUp, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import { useDevReviews } from "@/lib/query/dev";
import type { DevReview } from "@/lib/api/dev";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/dev/reviews")({
  head: () => ({
    meta: [
      { title: "Code Reviews — CEA-OS" },
      { name: "description", content: "Review queue and turnaround." },
    ],
  }),
  component: DevReviews,
});

function reviewTone(status: string) {
  if (/approv|success/i.test(status)) return "bg-success/10 text-success";
  if (/change|reject|issue/i.test(status)) return "bg-warning/10 text-warning";
  return "bg-primary/10 text-primary";
}

function DevReviews() {
  const reviewsQuery = useDevReviews();

  return (
    <AppShell
      roleKey="dev"
      title="Code reviews"
      subtitle="3 in queue · median turnaround 6h"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">On target</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/dev">
              <ArrowLeft className="size-4" /> Dev hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Awaiting review",
            value: "3",
            delta: "1 over 24h",
            icon: Eye,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Approved (7d)",
            value: "11",
            delta: "2 with nits",
            icon: ThumbsUp,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Median turnaround",
            value: "6h",
            delta: "target 12h",
            icon: Clock3,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Reviewers",
            value: "4",
            delta: "active",
            icon: Users,
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
            <CheckCircle2 className="text-primary size-4" /> Queue
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<DevReview[]>
            query={reviewsQuery}
            error={{ title: "Reviews unavailable" }}
            empty={{ title: "No reviews", description: "Review requests will show here." }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) => (
              <>
                {rows.map((r) => (
                  <div
                    key={r.id}
                    className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="font-mono text-sm font-bold">{r.title}</p>
                      <p className="text-muted-foreground text-xs">{r.detail}</p>
                    </div>
                    <Badge className={cn("border-0 font-semibold", reviewTone(r.status))}>
                      {r.status}
                    </Badge>
                    <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                      Review
                    </Button>
                  </div>
                ))}
              </>
            )}
          </QueryState>
        </CardContent>
      </Card>
    </AppShell>
  );
}
