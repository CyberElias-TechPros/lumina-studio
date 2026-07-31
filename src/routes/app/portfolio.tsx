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

const projects = [
  {
    t: "NaijaEats — food delivery API",
    desc: "REST API + PostgreSQL, 40+ endpoints, rate limiting, Swagger docs.",
    tags: ["Node.js", "PostgreSQL", "Docker"],
    featured: true,
  },
  {
    t: "BudgetPadi — expense tracker",
    desc: "PWA with offline mode, charts and bank-format CSV export.",
    tags: ["React", "PWA", "Chart.js"],
    featured: true,
  },
  {
    t: "ClassBoard — LMS dashboard UI",
    desc: "Design system and component library in Figma, 60+ components.",
    tags: ["Figma", "Design system", "a11y"],
    featured: false,
  },
];

const skills = [
  { s: "JavaScript / TypeScript", pct: 92 },
  { s: "Node.js & REST APIs", pct: 84 },
  { s: "React & Tailwind", pct: 88 },
  { s: "Docker & CI/CD", pct: 61 },
];

function PortfolioBuilder() {
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
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Projects",
            value: "3",
            delta: "2 featured",
            icon: FolderGit2,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Skills verified",
            value: "11",
            delta: "16 OSKM skills",
            icon: Award,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "CV downloads",
            value: "27",
            delta: "this month",
            icon: Download,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Profile views",
            value: "142",
            delta: "+38% this week",
            icon: Sparkles,
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
            {projects.map((p) => (
              <div key={p.t} className="rounded-xl border p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-display flex items-center gap-2 text-sm font-bold">
                    {p.featured && <Sparkles className="text-warning size-4" />} {p.t}
                  </p>
                  <div className="flex gap-2">
                    {p.featured && (
                      <Badge className="bg-warning/10 text-warning border-0 font-semibold">
                        Featured
                      </Badge>
                    )}
                    <Button variant="ghost" size="sm" className="text-primary font-semibold">
                      <ExternalLink className="size-3.5" /> Live
                    </Button>
                  </div>
                </div>
                <p className="text-muted-foreground mt-1.5 text-xs leading-relaxed">{p.desc}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <Badge key={t} variant="secondary" className="font-semibold">
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
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
              {skills.map((s) => (
                <div key={s.s}>
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span>{s.s}</span>
                    <span className="text-muted-foreground">{s.pct}%</span>
                  </div>
                  <div className="bg-muted mt-1.5 h-1.5 overflow-hidden rounded-full">
                    <div
                      className="bg-primary h-full rounded-full"
                      style={{ width: `${s.pct}%` }}
                    />
                  </div>
                </div>
              ))}
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
              {[
                { f: "CEA_Ada_Okafor_CV.pdf", tone: "bg-success/10 text-success" },
                { f: "One-page resume (ATS)", tone: "bg-primary/10 text-primary" },
              ].map((x) => (
                <div key={x.f} className="flex items-center justify-between rounded-xl border p-3">
                  <span className="text-sm font-semibold">{x.f}</span>
                  <Button variant="ghost" size="sm" className={cn("font-semibold", x.tone)}>
                    <Download className="size-3.5" />
                  </Button>
                </div>
              ))}
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
