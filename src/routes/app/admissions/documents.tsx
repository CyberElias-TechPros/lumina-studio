import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, BadgeCheck, FileCheck2, FileText, Hourglass } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/admissions/documents")({
  head: () => ({
    meta: [
      { title: "Documents — CEA-OS" },
      { name: "description", content: "Document verification checklists." },
    ],
  }),
  component: AdmissionsDocuments,
});

const checks = [
  {
    c: "National ID verification",
    d: "92% complete · 9 pending",
    tone: "bg-primary/10 text-primary",
  },
  { c: "Certificate checks", d: "88% complete · 14 pending", tone: "bg-warning/10 text-warning" },
  { c: "Photo & consent forms", d: "96% complete · 5 pending", tone: "bg-success/10 text-success" },
];

function AdmissionsDocuments() {
  return (
    <AppShell
      roleKey="instructor"
      title="Document verification"
      subtitle="118 applicants · 91% doc completeness"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">Within SLA</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/admissions">
              <ArrowLeft className="size-4" /> Admissions hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Verified",
            value: "1,206",
            delta: "of 1,322 docs",
            icon: BadgeCheck,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Pending",
            value: "116",
            delta: "9 applicants",
            icon: Hourglass,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Rejected",
            value: "14",
            delta: "re-upload sent",
            icon: FileText,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Avg. verify",
            value: "1.8 days",
            delta: "target < 2",
            icon: FileCheck2,
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
            <FileCheck2 className="text-primary size-4" /> Checklists
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {checks.map((c) => (
            <div key={c.c} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{c.c}</p>
                <p className="text-muted-foreground text-xs">{c.d}</p>
              </div>
              <Badge className={cn("border-0 font-semibold", c.tone)}>On track</Badge>
              <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                Open
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
