import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, BadgeCheck, FileStack, FolderOpen, ShieldCheck, Timer } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/government/documents")({
  head: () => ({
    meta: [
      { title: "Documentation Library — CEA-OS" },
      { name: "description", content: "Policies, certificates and compliance docs." },
    ],
  }),
  component: GovernmentDocuments,
});

const docs = [
  {
    d: "Academic policy handbook",
    v: "v4.2 · Jul 2026",
    s: "Current",
    tone: "bg-success/10 text-success",
  },
  {
    d: "Tuition & fees policy",
    v: "v2.1 · Jan 2026",
    s: "Current",
    tone: "bg-success/10 text-success",
  },
  {
    d: "Student conduct code",
    v: "v3.0 · Sep 2025",
    s: "Reviewing",
    tone: "bg-warning/10 text-warning",
  },
];

function GovernmentDocuments() {
  return (
    <AppShell
      roleKey="admin"
      title="Documentation library"
      subtitle="64 documents · versioned · digitally signed"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">Signed</Badge>
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
            label: "Documents",
            value: "64",
            delta: "18 categories",
            icon: FileStack,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Policies",
            value: "22",
            delta: "all current",
            icon: ShieldCheck,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Certificates",
            value: "14",
            delta: "issued 2026",
            icon: BadgeCheck,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Expiring < 90d",
            value: "2",
            delta: "flagged",
            icon: Timer,
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

      <Card className="bg-card mt-5 shadow-soft border">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <FolderOpen className="text-primary size-4" /> Policies
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {docs.map((d) => (
            <div key={d.d} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{d.d}</p>
                <p className="text-muted-foreground text-xs">{d.v}</p>
              </div>
              <Badge className={cn("border-0 font-semibold", d.tone)}>{d.s}</Badge>
              <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                View
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
