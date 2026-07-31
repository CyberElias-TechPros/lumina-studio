import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Banknote, Building2, GraduationCap, Landmark, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/government/institution")({
  head: () => ({
    meta: [
      { title: "Institutional Data — CEA-OS" },
      { name: "description", content: "Read-only institutional profile." },
    ],
  }),
  component: GovernmentInstitution,
});

const facts = [
  { l: "Registration", v: "RC 1423784 · CAC", tone: "bg-primary/10 text-primary" },
  { l: "Licence", v: "MBBS/PC/2024/0142 · NUC", tone: "bg-learning/10 text-learning" },
  { l: "Branches", v: "3 · Lagos, Abuja, Port Harcourt", tone: "bg-success/10 text-success" },
  { l: "Academic board", v: "Constituted · 11 members", tone: "bg-warning/10 text-warning" },
];

function GovernmentInstitution() {
  return (
    <AppShell
      roleKey="admin"
      title="Institutional data"
      subtitle="Read-only · updated Jul 31 · data verified by 2 officers"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">Verified</Badge>
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
            label: "Students",
            value: "6,412",
            delta: "across 3 campuses",
            icon: GraduationCap,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Staff",
            value: "214",
            delta: "64 full-time",
            icon: Users,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Revenue (FY)",
            value: "₦3.2b",
            delta: "reported",
            icon: Banknote,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Facilities",
            value: "18",
            delta: "all certified",
            icon: Building2,
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
            <Landmark className="text-primary size-4" /> Registration
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {facts.map((f) => (
            <div key={f.l} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{f.l}</p>
                <p className="text-muted-foreground text-xs">{f.v}</p>
              </div>
              <Badge className={cn("border-0 font-semibold", f.tone)}>On file</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
