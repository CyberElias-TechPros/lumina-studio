import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  Building2,
  FileCheck2,
  GraduationCap,
  Landmark,
  Megaphone,
  Scale,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/portal/government")({
  head: () => ({
    meta: [
      { title: "Government — CEA-OS" },
      {
        name: "description",
        content: "Government partner workspace: compliance, accreditations and impact reporting.",
      },
    ],
  }),
  component: GovernmentPortal,
});

const compliance = [
  { t: "CAC registration", v: "RC 2841937 · valid", tone: "bg-success/10 text-success" },
  { t: "Corporate affairs filing", v: "Annual · paid", tone: "bg-success/10 text-success" },
  { t: "NBTE engagement", v: "In dialogue", tone: "bg-primary/10 text-primary" },
  { t: "Tax (FIRS)", v: "Fully filed", tone: "bg-success/10 text-success" },
];

const reports = [
  { t: "Q2 impact report", s: "Shared with ministry", tone: "bg-success/10 text-success" },
  { t: "Graduate placement data", s: "Draft · due Aug 10", tone: "bg-warning/10 text-warning" },
  { t: "Scholarship beneficiary list", s: "Submitted Jul", tone: "bg-primary/10 text-primary" },
];

function GovernmentPortal() {
  return (
    <AppShell
      roleKey="instructor"
      title="Government partner"
      subtitle="Compliance, accreditation and impact reporting · fiscal 2026"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">Compliant</Badge>
          <Badge variant="secondary" className="font-semibold">
            Review cycle: Q3
          </Badge>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Accreditations",
            value: "3 / 4",
            delta: "1 in process",
            icon: FileCheck2,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Graduates (2026)",
            value: "214",
            delta: "72% placed",
            icon: GraduationCap,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Scholarships",
            value: "48",
            delta: "₦41m disbursed",
            icon: Landmark,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Impact reports",
            value: "6",
            delta: "2 due this quarter",
            icon: BarChart3,
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
              <Scale className="text-primary size-4" /> Compliance register
            </CardTitle>
            <Button asChild variant="ghost" size="sm" className="text-primary font-semibold">
              <Link to="/certificates/verify">
                Certificate verification <ArrowRight className="ml-1 size-3.5" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="divide-y">
            {compliance.map((c) => (
              <div
                key={c.t}
                className="flex flex-wrap items-center gap-3 py-3.5 first:pt-0 last:pb-0"
              >
                <span className="bg-muted text-muted-foreground grid size-9 shrink-0 place-items-center rounded-lg">
                  <FileCheck2 className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold">{c.t}</p>
                </div>
                <Badge className={cn("border-0 font-semibold", c.tone)}>{c.v}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <Megaphone className="text-primary size-4" /> Reporting cadence
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {reports.map((r) => (
                <div
                  key={r.t}
                  className="flex items-center justify-between gap-2 rounded-xl border p-3"
                >
                  <div>
                    <p className="text-sm font-semibold">{r.t}</p>
                    <p className="text-muted-foreground text-xs">{r.s}</p>
                  </div>
                  <Button variant="outline" size="sm" className="shrink-0">
                    View
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gradient-ink text-ink-foreground shadow-elevated border-0">
            <CardContent className="p-6">
              <Building2 className="text-success size-5" />
              <p className="font-display mt-3 text-base font-extrabold">Partnership desk</p>
              <p className="text-ink-foreground/70 mt-1 text-sm">
                Liaison: Mrs. Amina Yusuf (ministry) · monthly sync every first Friday.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
