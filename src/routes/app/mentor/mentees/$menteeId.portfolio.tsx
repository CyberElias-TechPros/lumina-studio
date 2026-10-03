"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { ArrowLeft, Award, FolderGit2, Sparkles, ThumbsUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import {
  useMenteePortfolio,
  useMenteePortfolioItems,
  useMenteeSkillItems,
  useMenteeSkills,
} from "@/lib/query/mentorDashboard";
import type { MntSkill, PortfolioItem } from "@/lib/api/mentorDashboard";
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

const statusTone: Record<string, string> = {
  Featured: "bg-warning/10 text-warning",
  Live: "bg-success/10 text-success",
  "In review": "bg-primary/10 text-primary",
};

function MentorPortfolioReview() {
  const { menteeId } = Route.useParams();
  const projectsQuery = useMenteePortfolio(menteeId);
  const projects = useMenteePortfolioItems(menteeId);
  const skillsQuery = useMenteeSkills(menteeId);
  const skills = useMenteeSkillItems(menteeId);

  const endorsed = skills.filter((s) => s.endorsed === 1).length;

  return (
    <AppShell
      roleKey="mentor"
      title="Portfolio review"
      subtitle={
        projects.length > 0
          ? `${projects.length} projects · ${endorsed} skills endorsed`
          : "Loading portfolio…"
      }
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            Review in progress
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/mentor/mentees/$menteeId" params={{ menteeId }}>
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
            <QueryState<PortfolioItem[]>
              query={projectsQuery}
              error={{ title: "Portfolio unavailable" }}
              empty={{
                title: "No projects yet",
                description: "Projects will show once the mentee shares their portfolio.",
              }}
              isEmpty={(rows) => rows.length === 0}
            >
              {(rows) => (
                <>
                  {rows.map((p) => (
                    <div key={p.id} className="rounded-xl border p-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="font-display text-sm font-bold">{p.projectName}</p>
                        <div className="flex items-center gap-2">
                          <span className="flex">
                            {Array.from({ length: p.stars }).map((_, i) => (
                              <Sparkles key={i} className="text-warning size-3.5" />
                            ))}
                          </span>
                          <Badge
                            className={cn(
                              "border-0 font-semibold",
                              statusTone[p.status] ?? "bg-primary/10 text-primary",
                            )}
                          >
                            {p.status}
                          </Badge>
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
                </>
              )}
            </QueryState>
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
              <QueryState<MntSkill[]>
                query={skillsQuery}
                error={{ title: "Skills unavailable" }}
                empty={{
                  title: "No skills yet",
                  description: "Skills will show once endorsed.",
                }}
                isEmpty={(rows) => rows.length === 0}
              >
                {(rows) => (
                  <>
                    {rows.map((s) => (
                      <div
                        key={s.id}
                        className="flex items-center justify-between rounded-xl border p-3"
                      >
                        <span className="text-sm font-semibold">{s.skillName}</span>
                        <Button
                          size="sm"
                          variant={s.endorsed === 1 ? "default" : "outline"}
                          className={cn("font-semibold", s.endorsed === 0 && "text-primary")}
                        >
                          {s.endorsed === 1 ? "Endorsed" : "Endorse"}
                        </Button>
                      </div>
                    ))}
                  </>
                )}
              </QueryState>
              <p className="text-muted-foreground pt-1 text-xs">
                Endorsements update the mentee's OSKM skill score and employer-facing certificate.
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
