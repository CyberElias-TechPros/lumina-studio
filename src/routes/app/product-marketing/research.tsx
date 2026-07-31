import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, FileSearch, FlaskConical, Lightbulb, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/product-marketing/research")({
  head: () => ({
    meta: [
      { title: "Market Research — CEA-OS" },
      { name: "description", content: "Research studies, key findings and methodology tags." },
    ],
  }),
  component: ResearchRepository,
});

const studies = [
  {
    t: "Employer hiring signals · Lagos",
    focus: "What 40 HR leaders screen for",
    sample: "n=40 interviews",
    method: "Interviews",
    status: "Published",
    tone: "bg-success/10 text-success",
  },
  {
    t: "Parent willingness to pay",
    focus: "Fee elasticity for parent app",
    sample: "n=320 survey",
    method: "Survey",
    status: "In field",
    tone: "bg-primary/10 text-primary",
  },
  {
    t: "Diaspora funding behaviour",
    focus: "UK diaspora monthly education spend",
    sample: "n=180 survey",
    method: "Survey + diary",
    status: "In review",
    tone: "bg-warning/10 text-warning",
  },
  {
    t: "Bootcamp comparison 2026",
    focus: "Pricing & promise across 9 players",
    sample: "desk research",
    method: "Secondary",
    status: "Draft",
    tone: "bg-muted-foreground/10 text-muted-foreground",
  },
];

function ResearchRepository() {
  return (
    <AppShell
      roleKey="product-marketing"
      title="Market research"
      subtitle="4 active studies · 12 published · 1,900+ respondents"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">2 due this wk</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/product-marketing">
              <ArrowLeft className="size-4" /> PM hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Studies",
            value: "16",
            delta: "4 active",
            icon: FlaskConical,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Key findings",
            value: "34",
            delta: "6 tagged critical",
            icon: Lightbulb,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Respondents",
            value: "1.9k",
            delta: "across 2026",
            icon: Users,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Methods used",
            value: "6",
            delta: "survey, diary, CJ",
            icon: BookOpen,
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
              <FileSearch className="text-primary size-4" /> Studies
            </CardTitle>
          </CardHeader>
          <CardContent className="divide-y">
            {studies.map((s) => (
              <div
                key={s.t}
                className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
              >
                <span className="bg-muted text-muted-foreground grid size-9 shrink-0 place-items-center rounded-lg">
                  <BookOpen className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold">{s.t}</p>
                  <p className="text-muted-foreground text-xs">
                    {s.focus} · {s.sample} · {s.method}
                  </p>
                </div>
                <Badge className={cn("border-0 font-semibold", s.tone)}>{s.status}</Badge>
                <Button variant="outline" size="sm" className="shrink-0">
                  Report
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <Lightbulb className="text-primary size-4" /> Key findings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              {
                t: "88% of parents want weekly progress proof",
                s: "Critical · parent app",
                tone: "bg-error/10 text-error",
              },
              {
                t: "HR screens for portfolio, not certificates",
                s: "Critical · positioning",
                tone: "bg-primary/10 text-primary",
              },
              {
                t: "Diaspora parents pay ₦180k-₦250k per term",
                s: "Pricing input",
                tone: "bg-warning/10 text-warning",
              },
              {
                t: "Referrals drive 18% of signups",
                s: "Growth input",
                tone: "bg-success/10 text-success",
              },
            ].map((x) => (
              <div key={x.t} className="flex items-center justify-between rounded-xl border p-3">
                <span className="text-sm font-semibold">{x.t}</span>
                <Badge className={cn("border-0 font-semibold", x.tone)}>{x.s}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
