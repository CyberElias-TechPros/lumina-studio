import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import {
  useCreateStuProject,
  useStuCv,
  useStuPortfolio,
  useStuProjects,
  useStuSkills,
} from "@/lib/query/studentSelf";
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
  const createProject = useCreateStuProject();
  const [addProjectOpen, setAddProjectOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectDetail, setProjectDetail] = useState("");
  const [projectTags, setProjectTags] = useState("");
  const [projectUrl, setProjectUrl] = useState("");

  const shareProfile = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Portfolio link copied");
    } catch {
      toast.error("Could not copy the portfolio link", {
        description: "Copy the page URL from your browser instead.",
      });
    }
  };

  const submitProject = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (createProject.isPending) return;
    createProject.mutate(
      {
        name: projectName.trim(),
        detail: projectDetail.trim(),
        tags: projectTags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        url: projectUrl.trim() || undefined,
      },
      {
        onSuccess: () => {
          setAddProjectOpen(false);
          setProjectName("");
          setProjectDetail("");
          setProjectTags("");
          setProjectUrl("");
          toast.success("Project added to your portfolio");
        },
      },
    );
  };

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
          <Button size="sm" onClick={() => setAddProjectOpen(true)}>
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
            <Button variant="outline" size="sm" className="font-semibold" onClick={shareProfile}>
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
                        {p.url ? (
                          <Button
                            asChild
                            variant="ghost"
                            size="sm"
                            className="text-primary font-semibold"
                          >
                            <a href={p.url} target="_blank" rel="noreferrer">
                              <ExternalLink className="size-3.5" /> Live
                            </a>
                          </Button>
                        ) : (
                          <Badge variant="secondary" className="font-semibold">
                            Private
                          </Badge>
                        )}
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
            <Button
              variant="outline"
              size="sm"
              className="w-full font-semibold"
              onClick={() => setAddProjectOpen(true)}
            >
              <Plus className="size-3.5" /> Add another project
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
      <Dialog open={addProjectOpen} onOpenChange={setAddProjectOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a portfolio project</DialogTitle>
            <DialogDescription>
              Add a concise project story so employers can understand what you built and how to see
              it in action.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={submitProject} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="project-name">Project name</Label>
              <Input
                id="project-name"
                value={projectName}
                onChange={(event) => setProjectName(event.target.value)}
                placeholder="e.g. NaijaEats delivery API"
                required
                maxLength={160}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="project-detail">Description</Label>
              <Textarea
                id="project-detail"
                value={projectDetail}
                onChange={(event) => setProjectDetail(event.target.value)}
                placeholder="What did you build, and what impact did it have?"
                required
                maxLength={2_000}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="project-tags">Skills and tools</Label>
              <Input
                id="project-tags"
                value={projectTags}
                onChange={(event) => setProjectTags(event.target.value)}
                placeholder="React, TypeScript, PostgreSQL"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="project-url">Live URL (optional)</Label>
              <Input
                id="project-url"
                type="url"
                value={projectUrl}
                onChange={(event) => setProjectUrl(event.target.value)}
                placeholder="https://…"
              />
            </div>
            {createProject.error && (
              <p role="alert" className="text-destructive text-sm font-medium">
                {createProject.error.message}
              </p>
            )}
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setAddProjectOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={createProject.isPending}>
                {createProject.isPending ? "Adding…" : "Add project"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}
