import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, MessageSquareQuote, Star, ThumbsUp, UserCheck, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/employer/feedback")({
  head: () => ({
    meta: [
      { title: "Feedback & Reviews — CEA-OS" },
      { name: "description", content: "Post-interview and post-hire feedback." },
    ],
  }),
  component: EmployerFeedback,
});

const feedback = [
  {
    f: "Ada Obi · Frontend · placed",
    v: "Onboarding rating 4.7 · ready for hire",
    s: "Completed",
    tone: "bg-success/10 text-success",
  },
  {
    f: "Tunde Ade · Data · interviewed",
    v: "Feedback submitted Aug 1",
    s: "Pending",
    tone: "bg-warning/10 text-warning",
  },
  {
    f: "Chidera N. · DevOps · placed",
    v: "90-day review · 4.5 rating",
    s: "Completed",
    tone: "bg-success/10 text-success",
  },
];

function EmployerFeedback() {
  return (
    <AppShell
      roleKey="instructor"
      title="Feedback & reviews"
      subtitle="14 this quarter · 12 completed · 87% positive"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">87% positive</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/employer/hub">
              <ArrowLeft className="size-4" /> Employer hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Reviews (quarter)",
            value: "14",
            delta: "12 completed",
            icon: MessageSquareQuote,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Positive",
            value: "87%",
            delta: "of responses",
            icon: ThumbsUp,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Avg. rating",
            value: "4.5",
            delta: "of 5",
            icon: Star,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Retained at 90d",
            value: "92%",
            delta: "hired cohort",
            icon: UserCheck,
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
            <Users className="text-primary size-4" /> Recent feedback
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {feedback.map((f) => (
            <div key={f.f} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{f.f}</p>
                <p className="text-muted-foreground text-xs">{f.v}</p>
              </div>
              <Badge className={cn("border-0 font-semibold", f.tone)}>{f.s}</Badge>
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
