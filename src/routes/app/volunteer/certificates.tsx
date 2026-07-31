import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Award, BadgeCheck, Download, FileBadge2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/volunteer/certificates")({
  head: () => ({
    meta: [
      { title: "Certificates — CEA-OS" },
      { name: "description", content: "Appreciation certificates for your service." },
    ],
  }),
  component: VolunteerCertificates,
});

const certs = [
  {
    c: "Volunteer appreciation — 40h",
    d: "Issued Jul 31 · #CEA-VOL-042",
    tone: "bg-success/10 text-success",
  },
  { c: "Outreach champion", d: "Issued Jun 30 · #CEA-VOL-031", tone: "bg-primary/10 text-primary" },
];

function VolunteerCertificates() {
  return (
    <AppShell
      roleKey="student"
      title="Certificates"
      subtitle="2 earned · 1 pending at 60h"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">Verified</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/portal/volunteer">
              <ArrowLeft className="size-4" /> Volunteer portal
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Earned",
            value: "2",
            delta: "this year",
            icon: Award,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Next tier",
            value: "60h",
            delta: "13h to go",
            icon: FileBadge2,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Downloads",
            value: "4",
            delta: "by you",
            icon: Download,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Verify code",
            value: "Active",
            delta: "shareable links",
            icon: BadgeCheck,
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
            <Award className="text-primary size-4" /> Your certificates
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {certs.map((c) => (
            <div key={c.c} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{c.c}</p>
                <p className="text-muted-foreground text-xs">{c.d}</p>
              </div>
              <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                <Download className="size-3.5" /> Download
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
