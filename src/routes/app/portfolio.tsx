import { createFileRoute } from "@tanstack/react-router";
import {
  Award,
  Download,
  ExternalLink,
  FileCode2,
  FolderGit2,
  Plus,
  Share2,
  Sparkles,
  ThumbsUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import { useStuCv, useStuPortfolio, useStuProjects, useStuSkills } from "@/lib/query/studentSelf";
import type { StuCvFile, StuKpi, StuProject, StuSkill } from "@/lib/api/studentSelf";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio Builder — CEA-OS" },
      { name: "description", content: "Projects, skills and CV generator — your proof of craft." },
    ],
  }),
  component: PortfolioBuilder,
});

const kpiMeta = [
  { icon: FolderGit2, tone: "bg-primary/10 text-primary" },
  { icon: Award, tone: "bg-learning/10 text-learning" },
  { icon: Download, tone: "bg-success/10 text-success" },
  { icon: Sparkles, tone: "bg-warning/10 text-warning" },
];

const cvTones = ["bg-success/10 text-success", "bg-primary/10 text-primary"];

function PortfolioBuilder() {
  const kpisQuery = useStuPortfolio();
  const projectsQuery = useStuProjects();
  const skillsQuery = useStuSkills();
  const cvQuery = useStuCv();
  return (
    <AppShell
      roleKey="student"
      title="Portfolio builder"
      subtitle="Projects, skills and CV — share with employers and mentors"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            Profile strength 82%
          </Badge>
          <Button size="sm">
            <Plus className="size-4" /> Add project
          </Button>
        </>
      }
    >
      <QueryState<StuKpi[]>
        query={kpisQuery}
        error={{ title: "Failed to load portfolio metrics" }}
        empty={{ title: "No portfolio metrics yet" }}
        isEmpty={(rows) => rows.length === 0}
      >
        {(kpis) => (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {kpis.map((k, i) => {
              const meta = kpiMeta[i % kpiMeta.length];
              return (
                <Card key={k.id} className="bg-card shadow-soft border">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between">
                      <p className="text-muted-foreground text-xs font-bold tracking-wide uppercase">
                        {k.metric}
                      </p>
                      <span className={cn("grid size-8 place-items-center rounded-lg", meta.tone)}>
                        <meta.icon className="size-4" />
                      </span>
                    </div>
                    <p className="font-display mt-3 text-2xl font-extrabold">{k.valueLabel}</p>
                    <p className="text-muted-foreground mt-0.5 text-xs font-semibold">{k.delta}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </QueryState>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <Card className="bg-card shadow-soft border">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <FolderGit2 className="text-primary size-4" /> Projects
            </CardTitle>
            <Button variant="outline" size="sm" className="font-semibold">
              <Share2 className="size-3.5" /> Share profile
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <QueryState<StuProject[]>
              query={projectsQuery}
              error={{ title: "Failed to load projects" }}
              empty={{ title: "No projects yet" }}
              isEmpty={(rows) => rows.length === 0}
            >
              {(items) =>
                items.map((p) => (
                  <div key={p.id} className="rounded-xl border p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-display flex items-center gap-2 text-sm font-bold">
                        {p.featured > 0 && <Sparkles className="text-warning size-4" />} {p.name}
                      </p>
                      <div className="flex gap-2">
                        {p.featured > 0 && (
                          <Badge className="bg-warning/10 text-warning border-0 font-semibold">
                            Featured
                          </Badge>
                        )}
                        <Button variant="ghost" size="sm" className="text-primary font-semibold">
                          <ExternalLink className="size-3.5" /> Live
                        </Button>
                      </div>
                    </div>
                    <p className="text-muted-foreground mt-1.5 text-xs leading-relaxed">
                      {p.detail}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {p.tags.map((t) => (
                        <Badge key={t} variant="secondary" className="font-semibold">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))
              }
            </QueryState>
            <Button variant="outline" size="sm" className="w-full font-semibold">
              <Plus className="size-3.5" /> Import from GitHub
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <Award className="text-primary size-4" /> Verified skills
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <QueryState<StuSkill[]>
                query={skillsQuery}
                error={{ title: "Failed to load skills" }}
                empty={{ title: "No verified skills" }}
                isEmpty={(rows) => rows.length === 0}
              >
                {(items) =>
                  items.map((s) => (
                    <div key={s.id}>
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span>{s.name}</span>
                        <span className="text-muted-foreground">{s.pct}%</span>
                      </div>
                      <div className="bg-muted mt-1.5 h-1.5 overflow-hidden rounded-full">
                        <div
                          className="bg-primary h-full rounded-full"
                          style={{ width: `${s.pct}%` }}
                        />
                      </div>
                    </div>
                  ))
                }
              </QueryState>
              <p className="text-muted-foreground pt-1 text-xs">
                Skill scores combine coursework, projects and mentor endorsements.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <FileCode2 className="text-primary size-4" /> CV generator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <QueryState<StuCvFile[]>
                query={cvQuery}
                error={{ title: "Failed to load CV files" }}
                empty={{ title: "No CV files" }}
                isEmpty={(rows) => rows.length === 0}
              >
                {(items) =>
                  items.map((x, i) => (
                    <div
                      key={x.id}
                      className="flex items-center justify-between rounded-xl border p-3"
                    >
                      <span className="text-sm font-semibold">{x.filename}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={cn("font-semibold", cvTones[i % cvTones.length])}
                      >
                        <Download className="size-3.5" />
                      </Button>
                    </div>
                  ))
                }
              </QueryState>
              <p className="text-muted-foreground pt-1 text-xs">
                Auto-updated from your projects, grades and work history.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-ink text-ink-foreground shadow-elevated border-0">
            <CardContent className="p-6">
              <ThumbsUp className="text-success size-5" />
              <p className="font-display mt-3 text-base font-extrabold">Mentor tip</p>
              <p className="text-ink-foreground/70 mt-1 text-sm">
                Employers spend ~90 seconds per portfolio. Lead with NaijaEats — it had 3 interview
                callbacks.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
