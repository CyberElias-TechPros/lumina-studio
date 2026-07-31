import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle2,
  Database,
  FileSearch,
  Fingerprint,
  ShieldAlert,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/government/integrity")({
  head: () => ({
    meta: [
      { title: "Data Integrity — CEA-OS" },
      { name: "description", content: "Verification of institutional data." },
    ],
  }),
  component: GovernmentIntegrity,
});

const checks = [
  {
    c: "Enrolment vs census",
    v: "Matches filed Q2 census",
    s: "Pass",
    tone: "bg-success/10 text-success",
  },
  {
    c: "Financials vs audited",
    v: "Matches audited FY25 statement",
    s: "Pass",
    tone: "bg-success/10 text-success",
  },
  {
    c: "Facilities register",
    v: "1 of 18 pending re-certification",
    s: "Flagged",
    tone: "bg-warning/10 text-warning",
  },
];

function GovernmentIntegrity() {
  return (
    <AppShell
      roleKey="admin"
      title="Data integrity verification"
      subtitle="Automated cross-checks · nightly · hash-verified"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">Passing</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/government">
              <ArrowLeft className="size-4" /> Compliance portal
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Checks (30d)",
            value: "96",
            delta: "nightly runs",
            icon: Database,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Pass rate",
            value: "98.9%",
            delta: "1 flagged",
            icon: CheckCircle2,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Discrepancies",
            value: "1",
            delta: "facilities",
            icon: ShieldAlert,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Hash verified",
            value: "100%",
            delta: "tamper-proof",
            icon: Fingerprint,
            tone: "bg-learning/10 text-learning",
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

      <Card className="bg-card mt-5 shadow-soft border">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <FileSearch className="text-primary size-4" /> Cross-checks
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {checks.map((c) => (
            <div key={c.c} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{c.c}</p>
                <p className="text-muted-foreground text-xs">{c.v}</p>
              </div>
              <Badge className={cn("border-0 font-semibold", c.tone)}>{c.s}</Badge>
              <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                Details
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
