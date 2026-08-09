import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, MessageSquareQuote, Star, ThumbsUp, UserCheck, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { useInterviewItems, useTalentCandidateItems } from "@/lib/query/recruitment";
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

function EmployerFeedback() {
  const interviews = useInterviewItems();
  const talent = useTalentCandidateItems();

  const completed = interviews.filter((i) => i.status === "Completed").length;
  const scheduled = interviews.filter((i) => i.status === "Scheduled").length;
  const positiveRate = interviews.length ? Math.round((completed / interviews.length) * 100) : 0;

  const feedback = interviews.slice(0, 6).map((i) => ({
    f: `${i.candidate} · ${i.role} · ${i.mode}`,
    v: i.date,
    s: i.status === "Completed" ? "Completed" : "Pending",
    tone: i.status === "Completed" ? "bg-success/10 text-success" : "bg-warning/10 text-warning",
  }));

  return (
    <AppShell
      roleKey="employer"
      title="Feedback & reviews"
      subtitle={`${interviews.length} interviews · ${completed} completed · ${positiveRate}% positive`}
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            {positiveRate}% positive
          </Badge>
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
            label: "Interviews",
            value: String(interviews.length),
            delta: "on record",
            icon: MessageSquareQuote,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Completed rounds",
            value: String(completed),
            delta: "feedback ready",
            icon: ThumbsUp,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Scheduled",
            value: String(scheduled),
            delta: "upcoming rounds",
            icon: Star,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Talent pool",
            value: String(talent.length),
            delta: "verified candidates",
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
          {feedback.length === 0 && (
            <p className="text-muted-foreground py-4 text-center text-sm">
              No interview feedback yet.
            </p>
          )}
        </CardContent>
      </Card>
    </AppShell>
  );
}
