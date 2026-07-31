import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Award, FolderGit2, Sparkles, ThumbsUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/mentor/mentees/$menteeId/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio Review — CEA-OS" },
      { name: "description", content: "Review projects and endorse mentee skills." },
    ],
  }),
  component: MentorPortfolioReview,
});

const projects = [
  {
    t: "NaijaEats — food delivery API",
    v: "Featured",
    stars: 5,
    feedback: "REST API, 40+ endpoints, strong docs",
    tone: "bg-warning/10 text-warning",
  },
  {
    t: "BudgetPadi — expense tracker",
    v: "Live",
    stars: 4,
    feedback: "Clean PWA, good offline UX",
    tone: "bg-success/10 text-success",
  },
  {
    t: "ClassBoard — LMS UI",
    v: "In review",
    stars: 4,
    feedback: "Design system depth impressive",
    tone: "bg-primary/10 text-primary",
  },
];

const skills = [
  { s: "Database design", endorsed: true },
  { s: "REST API development", endorsed: true },
  { s: "System design basics", endorsed: false },
  { s: "Technical writing", endorsed: false },
];

function MentorPortfolioReview() {
  return (
    <AppShell
      roleKey="instructor"
      title="Portfolio review"
      subtitle="Ada Okafor · 3 projects · 2 skills endorsed"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            Review in progress
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/mentor/mentees/$menteeId" params={{ menteeId: "ada-okafor" }}>
              <ArrowLeft className="size-4" /> Mentee overview
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <FolderGit2 className="text-primary size-4" /> Projects
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {projects.map((p) => (
              <div key={p.t} className="rounded-xl border p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-display text-sm font-bold">{p.t}</p>
                  <div className="flex items-center gap-2">
                    <span className="flex">
                      {Array.from({ length: p.stars }).map((_, i) => (
                        <Sparkles key={i} className="text-warning size-3.5" />
                      ))}
                    </span>
                    <Badge className={cn("border-0 font-semibold", p.tone)}>{p.v}</Badge>
                  </div>
                </div>
                <p className="text-muted-foreground mt-1.5 text-xs">{p.feedback}</p>
                <div className="mt-3 flex gap-2">
                  <Button size="sm" variant="outline" className="font-semibold">
                    Add comment
                  </Button>
                  <Button size="sm" className="font-semibold">
                    <ThumbsUp className="size-3.5" /> Approve
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <Award className="text-primary size-4" /> Skill endorsements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {skills.map((s) => (
                <div key={s.s} className="flex items-center justify-between rounded-xl border p-3">
                  <span className="text-sm font-semibold">{s.s}</span>
                  <Button
                    size="sm"
                    variant={s.endorsed ? "default" : "outline"}
                    className={cn("font-semibold", !s.endorsed && "text-primary")}
                  >
                    {s.endorsed ? "Endorsed" : "Endorse"}
                  </Button>
                </div>
              ))}
              <p className="text-muted-foreground pt-1 text-xs">
                Endorsements update Ada's OSKM skill score and employer-facing certificate.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-ink text-ink-foreground shadow-elevated border-0">
            <CardContent className="p-6">
              <ThumbsUp className="text-success size-5" />
              <p className="font-display mt-3 text-base font-extrabold">Review tips</p>
              <p className="text-ink-foreground/70 mt-1 text-sm">
                Judge like an employer: lead with the readme, check real commits, and note where a
                demo would help.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
