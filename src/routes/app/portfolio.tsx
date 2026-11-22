"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
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
import { useSessionUser } from "@/components/app/session-provider";
import { QueryState } from "@/components/ui/query-state";
import { flattenPages } from "@/lib/query/hooks";
import { useMyCertificates } from "@/lib/query/certificates";
import {
  useCreateStuProject,
  useStuCv,
  useStuPortfolio,
  useStuProjects,
  useStuSkills,
} from "@/lib/query/studentSelf";
import type { StuKpi, StuProject, StuSkill } from "@/lib/api/studentSelf";
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

function derivePortfolioKpis(projects: StuProject[], certCount: number): StuKpi[] {
  const featured = projects.filter((p) => p.featured > 0).length;
  const liveCount = projects.filter((p) => Boolean(p.url)).length;
  const uniqueSkills = new Set(projects.flatMap((p) => p.tags)).size;
  return [
    {
      id: "port-projects",
      metric: "Projects",
      valueLabel: String(projects.length),
      delta: `${featured} featured`,
    },
    {
      id: "port-live",
      metric: "Live demos",
      valueLabel: String(liveCount),
      delta: "public URLs",
    },
    {
      id: "port-skills",
      metric: "Skills tagged",
      valueLabel: String(uniqueSkills),
      delta: "across projects",
    },
    {
      id: "port-certs",
      metric: "Certificates",
      valueLabel: String(certCount),
      delta: "verified credentials",
    },
  ];
}

function deriveSkillsFromProjects(projects: StuProject[]): StuSkill[] {
  const counts = new Map<string, number>();
  for (const project of projects) {
    for (const tag of project.tags) {
      const clean = tag.trim();
      if (clean) counts.set(clean, (counts.get(clean) ?? 0) + 1);
    }
  }
  const maxCount = Math.max(1, ...counts.values());
  return [...counts.entries()].slice(0, 8).map(([name, count], idx) => ({
    id: `skill-${idx}`,
    name,
    pct: Math.min(100, Math.round((count / maxCount) * 40 + 55)),
  }));
}

function PortfolioBuilder() {
  const user = useSessionUser();
  const kpisQuery = useStuPortfolio();
  const projectsQuery = useStuProjects();
  const skillsQuery = useStuSkills();
  const cvQuery = useStuCv();
  const certsQuery = useMyCertificates();
  const createProject = useCreateStuProject();
  const [addProjectOpen, setAddProjectOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectDetail, setProjectDetail] = useState("");
  const [projectTags, setProjectTags] = useState("");
  const [projectUrl, setProjectUrl] = useState("");

  const projects = flattenPages(projectsQuery.data?.pages);
  const kpisData = flattenPages(kpisQuery.data?.pages);
  const skillsData = flattenPages(skillsQuery.data?.pages);
  const cvFiles = flattenPages(cvQuery.data?.pages);
  const certs = certsQuery.data?.items ?? [];
  const kpis = kpisData.length > 0 ? kpisData : derivePortfolioKpis(projects, certs.length);
  const skills = skillsData.length > 0 ? skillsData : deriveSkillsFromProjects(projects);

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

  const downloadCvMarkdown = () => {
    const lines: string[] = [
      `# ${user?.name ?? "Cyber Elias Academy Learner"}`,
      user?.email ? `Email: ${user.email}` : "",
      "",
      "## Verified Skills",
      skills.length
        ? skills.map((s) => `- ${s.name}`).join("\n")
        : "- Add project tags to populate skills",
      "",
      "## Projects",
      projects.length
        ? projects
            .map(
              (p) =>
                `### ${p.name}${p.url ? ` (${p.url})` : ""}\n${p.detail}\nTags: ${p.tags.join(", ") || "General"}`,
            )
            .join("\n\n")
        : "No projects added yet.",
      "",
      "## Certificates",
      certs.length
        ? certs.map((c) => `- ${c.title} — Verification Code: ${c.code}`).join("\n")
        : "Certificates appear here once issued.",
    ];
    const blob = new Blob([lines.filter((l) => l !== undefined).join("\n")], {
      type: "text/markdown;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(user?.name ?? "cea-portfolio").toLowerCase().replace(/[^a-z0-9]+/g, "-")}-cv.md`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Portfolio CV exported");
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
            {projects.length} project{projects.length === 1 ? "" : "s"}
          </Badge>
          <Button size="sm" onClick={() => setAddProjectOpen(true)}>
            <Plus className="size-4" /> Add project
          </Button>
        </>
      }
    >
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
            <QueryState
              query={projectsQuery}
              error={{ title: "Failed to load projects" }}
              empty={{
                title: "No projects yet",
                description: "Add your first build to showcase your skills.",
              }}
              isEmpty={() => projects.length === 0}
            >
              {() =>
                projects.map((p) => (
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
                <Award className="text-primary size-4" /> Skills from projects
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {skills.length === 0 ? (
                <p className="text-muted-foreground text-xs">
                  Add skill tags to your projects to surface your verified stack here.
                </p>
              ) : (
                skills.map((s) => (
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
              )}
            </CardContent>
          </Card>

          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <FileCode2 className="text-primary size-4" /> CV generator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between rounded-xl border p-3">
                <span className="text-sm font-semibold">Portfolio CV (Markdown)</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="bg-success/10 text-success font-semibold"
                  onClick={downloadCvMarkdown}
                >
                  <Download className="size-3.5" /> Export
                </Button>
              </div>
              <div className="flex items-center justify-between rounded-xl border p-3">
                <span className="text-sm font-semibold">Printable CV / PDF</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="bg-primary/10 text-primary font-semibold"
                  onClick={() => window.print()}
                >
                  <Download className="size-3.5" /> Print
                </Button>
              </div>
              {cvFiles.map((x) => (
                <div key={x.id} className="flex items-center justify-between rounded-xl border p-3">
                  <span className="text-sm font-semibold">{x.filename}</span>
                  <Button type="button" variant="ghost" size="sm" onClick={downloadCvMarkdown}>
                    <Download className="size-3.5" />
                  </Button>
                </div>
              ))}
              <p className="text-muted-foreground pt-1 text-xs">
                Compiled automatically from your projects, skills, and earned certificates.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-ink text-ink-foreground shadow-elevated border-0">
            <CardContent className="p-6">
              <ThumbsUp className="text-success size-5" />
              <p className="font-display mt-3 text-base font-extrabold">Portfolio tip</p>
              <p className="text-ink-foreground/70 mt-1 text-sm">
                Include a live demo link and concise problem-to-outcome summary on every featured
                project.
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
