import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle2,
  CircleAlert,
  Lightbulb,
  MessageSquareText,
  Target,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/product-marketing/positioning")({
  head: () => ({
    meta: [
      { title: "Product Positioning — CEA-OS" },
      { name: "description", content: "Positioning statements, audience and message house." },
    ],
  }),
  component: PositioningDashboard,
});

const statements = [
  {
    product: "CEA-OS core LMS",
    statement:
      "For ambitious Nigerians who want global careers, CEA-OS is the academy that pairs live Lagos classes with a portfolio employers trust.",
    audience: "Working adults 18-35 · Lagos, Abuja",
    pain: "Degrees don't convert to jobs",
    benefit: "Hire-ready in 9 months",
    tone: "bg-primary/10 text-primary",
  },
  {
    product: "Employer talent pass",
    statement:
      "For HR teams hiring in Nigeria, the talent pass is a verified pipeline of job-ready graduates with recorded skills evidence.",
    audience: "HR leaders · 50+ employers",
    pain: "Entry-level hires are risky",
    benefit: "88% of pass hires stay 6mo",
    tone: "bg-learning/10 text-learning",
  },
  {
    product: "Parent app",
    statement:
      "For parents funding education, the parent app turns fees into progress reports with weekly learner insights.",
    audience: "Parents · 35-55 · diaspora",
    pain: "Fees paid, outcomes unclear",
    benefit: "Weekly skill milestones",
    tone: "bg-success/10 text-success",
  },
];

function PositioningDashboard() {
  return (
    <AppShell
      roleKey="product-marketing"
      title="Positioning dashboard"
      subtitle="7 products · 3 statements in review · refresh cycle 6w"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">5 approved</Badge>
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
            label: "Products covered",
            value: "7",
            delta: "of 8 launched",
            icon: Target,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Statements",
            value: "12",
            delta: "3 in review",
            icon: MessageSquareText,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Message houses",
            value: "6",
            delta: "2 to refresh",
            icon: Lightbulb,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Audience cards",
            value: "9",
            delta: "1 new this qtr",
            icon: Users,
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

      <div className="mt-5 grid gap-5 xl:grid-cols-2">
        <div className="space-y-5">
          {statements.map((s) => (
            <Card key={s.product} className="bg-card shadow-soft border">
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                  <Target className={cn("size-4", s.tone)} /> {s.product}
                </CardTitle>
                <Badge className={cn("border-0 font-semibold", s.tone)}>Approved</Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm italic">{s.statement}</p>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-xl border p-3">
                    <p className="text-muted-foreground text-[10px] font-bold tracking-wide uppercase">
                      Audience
                    </p>
                    <p className="mt-1 text-xs font-semibold">{s.audience}</p>
                  </div>
                  <div className="rounded-xl border p-3">
                    <p className="text-muted-foreground text-[10px] font-bold tracking-wide uppercase">
                      Pain point
                    </p>
                    <p className="mt-1 text-xs font-semibold">{s.pain}</p>
                  </div>
                  <div className="rounded-xl border p-3">
                    <p className="text-muted-foreground text-[10px] font-bold tracking-wide uppercase">
                      Benefit
                    </p>
                    <p className="mt-1 text-xs font-semibold">{s.benefit}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <Lightbulb className="text-primary size-4" /> Message house · core LMS
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                {
                  l: "Primary message",
                  v: "From Lagos classroom to global job",
                  tone: "bg-primary/10 text-primary",
                },
                {
                  l: "Proof point",
                  v: "92% placement within 6 months",
                  tone: "bg-success/10 text-success",
                },
                {
                  l: "Tone of voice",
                  v: "Ambitious, concrete, proud",
                  tone: "bg-learning/10 text-learning",
                },
                { l: "Avoid", v: "Get-rich-quick framing", tone: "bg-error/10 text-error" },
              ].map((x) => (
                <div key={x.l} className="flex items-center justify-between rounded-xl border p-3">
                  <span className="text-xs font-bold tracking-wide uppercase">{x.l}</span>
                  <Badge className={cn("border-0 font-semibold", x.tone)}>{x.v}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gradient-ink text-ink-foreground shadow-elevated border-0">
            <CardContent className="p-6">
              <CheckCircle2 className="text-success size-5" />
              <p className="font-display mt-3 text-base font-extrabold">Review queue</p>
              <p className="text-ink-foreground/70 mt-1 text-sm">
                Employer pass statement moves to exec review Aug 3. Owner: Chiamaka Eze.
              </p>
              <div className="mt-4 flex items-center gap-2">
                <CircleAlert className="text-warning size-4" />
                <span className="text-ink-foreground/70 text-xs font-semibold">
                  1 statement flagged for cultural tone check
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
