import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookMarked,
  ChartNoAxesColumn,
  ClipboardList,
  FileText,
  FlaskConical,
  Mail,
  Megaphone,
  PenLine,
  Sparkles,
  SplitSquareHorizontal,
  Target,
  TrendingUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/portal/copywriter")({
  head: () => ({
    meta: [
      { title: "Conversion Copywriter — CEA-OS" },
      {
        name: "description",
        content: "Copy briefs, drafts and A/B tests for the conversion team.",
      },
    ],
  }),
  component: CopywriterPortal,
});

const briefs = [
  {
    t: "Apply page hero — Aug cohort",
    status: "In review",
    win: "1.4× baseline",
    tone: "bg-primary/10 text-primary",
  },
  {
    t: "Scholarship email sequence",
    status: "Draft 2",
    win: "—",
    tone: "bg-warning/10 text-warning",
  },
  {
    t: "Programme compare landing",
    status: "Live · winner B",
    win: "+22% ctr",
    tone: "bg-success/10 text-success",
  },
];

const screens = [
  {
    icon: FileText,
    label: "Copy library",
    desc: "Searchable copy library",
    path: "/app/conversion-copy/library",
    tone: "bg-primary/10 text-primary",
  },
  {
    icon: Mail,
    label: "Email sequences",
    desc: "Sequence drafts",
    path: "/app/conversion-copy/email-sequences",
    tone: "bg-success/10 text-success",
  },
  {
    icon: Megaphone,
    label: "Ad copy",
    desc: "Ad variants and hooks",
    path: "/app/conversion-copy/ads",
    tone: "bg-learning/10 text-learning",
  },
  {
    icon: FlaskConical,
    label: "A/B tests",
    desc: "Experiments and results",
    path: "/app/conversion-copy/ab-tests",
    tone: "bg-warning/10 text-warning",
  },
  {
    icon: ChartNoAxesColumn,
    label: "Analytics",
    desc: "Lift and conversion",
    path: "/app/conversion-copy/analytics",
    tone: "bg-career/10 text-career",
  },
  {
    icon: BookMarked,
    label: "Style guide",
    desc: "Voice and tone rules",
    path: "/app/conversion-copy/style-guide",
    tone: "bg-community/10 text-community",
  },
  {
    icon: ClipboardList,
    label: "Briefs",
    desc: "Request and briefs",
    path: "/app/conversion-copy/briefs",
    tone: "bg-erp/10 text-erp",
  },
];

function CopywriterPortal() {
  return (
    <AppShell
      roleKey="instructor"
      title="Conversion copy"
      subtitle="Brie→draft→test pipeline · 4 active experiments"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            2 variants beating control
          </Badge>
          <Badge variant="secondary" className="font-semibold">
            Sprint 14
          </Badge>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Active briefs",
            value: "6",
            delta: "3 in draft",
            icon: PenLine,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Live tests",
            value: "4",
            delta: "2 winning",
            icon: SplitSquareHorizontal,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Avg. lift",
            value: "+18%",
            delta: "vs control",
            icon: TrendingUp,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Words shipped",
            value: "12.4k",
            delta: "this month",
            icon: FileText,
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
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <FileText className="text-primary size-4" /> Briefs
            </CardTitle>
          </CardHeader>
          <CardContent className="divide-y">
            {briefs.map((b) => (
              <div
                key={b.t}
                className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
              >
                <span className="bg-muted text-muted-foreground grid size-9 shrink-0 place-items-center rounded-lg">
                  <PenLine className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold">{b.t}</p>
                  <p className="text-muted-foreground text-xs">win rate: {b.win}</p>
                </div>
                <Badge className={cn("border-0 font-semibold", b.tone)}>{b.status}</Badge>
                <Button variant="outline" size="sm" className="shrink-0">
                  Edit
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <FlaskConical className="text-primary size-4" /> Test learnings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                {
                  t: "Concrete outcomes beat jargon",
                  v: "learned",
                  tone: "bg-success/10 text-success",
                },
                {
                  t: "Naira pricing lifts signups",
                  v: "verified",
                  tone: "bg-success/10 text-success",
                },
                {
                  t: "Short-form hero underperforms",
                  v: "next test",
                  tone: "bg-warning/10 text-warning",
                },
              ].map((x) => (
                <div key={x.t} className="flex items-center justify-between rounded-xl border p-3">
                  <span className="text-sm font-semibold">{x.t}</span>
                  <Badge className={cn("border-0 font-semibold", x.tone)}>{x.v}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gradient-ink text-ink-foreground shadow-elevated border-0">
            <CardContent className="p-6">
              <Sparkles className="text-warning size-5" />
              <p className="font-display mt-3 text-base font-extrabold">AI assist</p>
              <p className="text-ink-foreground/70 mt-1 text-sm">
                Draft suggestions are on-brand: tone = confident, warm, specific to the Nigerian
                market.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      <Card className="bg-card mt-5 shadow-soft border">
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <FileText className="text-primary size-4" /> Workspace
          </CardTitle>
          <Badge variant="secondary" className="font-semibold">
            {screens.length} modules
          </Badge>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {screens.map((s) => (
            <Link
              key={s.path}
              to={s.path}
              className="group bg-card shadow-soft hover:shadow-elevated flex flex-col rounded-xl border p-4 transition-all hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between">
                <span className={cn("grid size-9 place-items-center rounded-lg", s.tone)}>
                  <s.icon className="size-4" />
                </span>
                <ArrowRight className="text-muted-foreground group-hover:text-primary size-4 transition-colors" />
              </div>
              <p className="font-display mt-3 text-sm font-extrabold">{s.label}</p>
              <p className="text-muted-foreground mt-1 text-xs">{s.desc}</p>
            </Link>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
