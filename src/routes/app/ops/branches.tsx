import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Building2, GraduationCap, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/ops/branches")({
  head: () => ({
    meta: [
      { title: "Branches — CEA-OS" },
      {
        name: "description",
        content: "Multi-campus operations, capacity and resource utilization.",
      },
    ],
  }),
  component: OperationsBranches,
});

const branches = [
  {
    b: "Ikeja HQ",
    loc: "Lagos · Main campus",
    cap: "342 / 400 seats",
    util: 86,
    status: "Healthy",
    tone: "bg-success/10 text-success",
  },
  {
    b: "Victoria Island",
    loc: "Lagos · Executive center",
    cap: "118 / 150 seats",
    util: 79,
    status: "Steady",
    tone: "bg-primary/10 text-primary",
  },
  {
    b: "Abeokuta",
    loc: "Ogun · Satellite",
    cap: "64 / 120 seats",
    util: 53,
    status: "Underused",
    tone: "bg-warning/10 text-warning",
  },
];

function OperationsBranches() {
  return (
    <AppShell
      roleKey="instructor"
      title="Branch management"
      subtitle="3 campuses · 670 seats · 82% avg utilization"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            All campuses live
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/portal/operations">
              <ArrowLeft className="size-4" /> Operations
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Branches",
            value: "3",
            delta: "1 satellite",
            icon: Building2,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Total capacity",
            value: "670",
            delta: "seats across campuses",
            icon: Users,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Avg utilization",
            value: "82%",
            delta: "target 75–90%",
            icon: GraduationCap,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Staff on site",
            value: "94",
            delta: "5 sites incl. labs",
            icon: MapPin,
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
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <Building2 className="text-primary size-4" /> Campus snapshot
          </CardTitle>
          <Button variant="outline" size="sm" className="font-semibold">
            Add branch
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {branches.map((b) => (
            <div key={b.b} className="rounded-xl border p-4">
              <div className="flex flex-wrap items-center gap-3">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold">{b.b}</p>
                  <p className="text-muted-foreground text-xs">{b.loc}</p>
                </div>
                <Badge className={cn("border-0 font-semibold", b.tone)}>{b.status}</Badge>
                <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                  Manage
                </Button>
              </div>
              <div className="mt-3">
                <div className="text-muted-foreground flex justify-between text-xs font-semibold">
                  <span>{b.cap}</span>
                  <span>{b.util}%</span>
                </div>
                <div className="bg-muted mt-1.5 h-2 overflow-hidden rounded-full">
                  <div
                    className={cn(
                      "h-full rounded-full",
                      b.util >= 70 ? "bg-success" : "bg-warning",
                    )}
                    style={{ width: `${b.util}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
