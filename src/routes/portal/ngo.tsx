import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Briefcase,
  FileCheck2,
  HandHeart,
  HeartHandshake,
  School,
  Target,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/portal/ngo")({
  head: () => ({
    meta: [
      { title: "NGO Partner — CEA-OS" },
      {
        name: "description",
        content: "NGO partner workspace: programs, beneficiaries, reports and funding.",
      },
    ],
  }),
  component: NgoPortal,
});

const programs = [
  {
    name: "Girls in Tech scholarship",
    beneficiaries: 24,
    budget: "₦18.2m",
    status: "Active",
    tone: "bg-success/10 text-success",
  },
  {
    name: "Rural access — digital skills",
    beneficiaries: 31,
    budget: "₦12.4m",
    status: "Active",
    tone: "bg-primary/10 text-primary",
  },
  {
    name: "Out-of-school youth track",
    beneficiaries: 12,
    budget: "₦6.8m",
    status: "Pilot",
    tone: "bg-warning/10 text-warning",
  },
];

const reports = [
  { t: "Q2 impact narrative", s: "Submitted · approved", tone: "bg-success/10 text-success" },
  {
    t: "Beneficiary photos & consents",
    s: "Shared via portal",
    tone: "bg-primary/10 text-primary",
  },
  { t: "Q3 disbursement request", s: "In review", tone: "bg-warning/10 text-warning" },
];

function NgoPortal() {
  return (
    <AppShell
      roleKey="instructor"
      title="NGO partner workspace"
      subtitle="Bridge Forward Foundation · MOU 2026–2028"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">MOU active</Badge>
          <Badge variant="secondary" className="font-semibold">
            3 joint programs
          </Badge>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Beneficiaries",
            value: "67",
            delta: "across 3 programs",
            icon: Users,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Funding (YTD)",
            value: "₦37.4m",
            delta: "all disbursed",
            icon: FileCheck2,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Graduation rate",
            value: "88%",
            delta: "cohort 1",
            icon: Target,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Volunteers",
            value: "14",
            delta: "from partner org",
            icon: HandHeart,
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
              <School className="text-primary size-4" /> Joint programs
            </CardTitle>
            <Button variant="outline" size="sm" className="font-semibold">
              Add program
            </Button>
          </CardHeader>
          <CardContent className="divide-y">
            {programs.map((p) => (
              <div
                key={p.name}
                className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
              >
                <span className="bg-muted text-muted-foreground grid size-9 shrink-0 place-items-center rounded-lg">
                  <HeartHandshake className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold">{p.name}</p>
                  <p className="text-muted-foreground text-xs">
                    {p.beneficiaries} beneficiaries · {p.budget}
                  </p>
                </div>
                <Badge className={cn("border-0 font-semibold", p.tone)}>{p.status}</Badge>
                <Button variant="outline" size="sm" className="shrink-0">
                  Open
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <FileCheck2 className="text-primary size-4" /> Reporting
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {reports.map((r) => (
                <div
                  key={r.t}
                  className="flex items-center justify-between gap-2 rounded-xl border p-3"
                >
                  <p className="text-sm font-semibold">{r.t}</p>
                  <Badge className={cn("border-0 font-semibold", r.tone)}>{r.s}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gradient-ink text-ink-foreground shadow-elevated border-0">
            <CardContent className="p-6">
              <Briefcase className="text-success size-5" />
              <p className="font-display mt-3 text-base font-extrabold">Impact story</p>
              <p className="text-ink-foreground/70 mt-1 text-sm">
                Cohort 1: 88% of beneficiary graduates placed within 90 days. Case files ready for
                the Q3 board review.
              </p>
              <Button asChild size="sm" className="bg-gradient-brand shadow-glow mt-4 border-0">
                <Link to="/stories">
                  Read impact stories <ArrowRight className="ml-1 size-3.5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
