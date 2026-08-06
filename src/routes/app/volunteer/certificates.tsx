import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Award, BadgeCheck, Download, FileBadge2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import { useVolCerts, useVolCertItems } from "@/lib/query/volunteerReceptionist";
import type { VolCert } from "@/lib/api/volunteerReceptionist";
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

const tones = ["bg-success/10 text-success", "bg-primary/10 text-primary"];

function VolunteerCertificates() {
  const certsQuery = useVolCerts();
  const certs = useVolCertItems();

  return (
    <AppShell
      roleKey="student"
      title="Certificates"
      subtitle={
        certs.length > 0
          ? `${certs.length} earned · 1 pending at 60h`
          : "2 earned · 1 pending at 60h"
      }
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
            value: certs.length > 0 ? String(certs.length) : "—",
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
          <QueryState<VolCert[]>
            query={certsQuery}
            error={{ title: "Certificates unavailable" }}
            empty={{
              title: "No certificates yet",
              description: "Earned certificates will show here.",
            }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) => (
              <>
                {rows.map((c, i) => (
                  <div
                    key={c.id}
                    className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">{c.title}</p>
                      <p className="text-muted-foreground text-xs">{c.detail}</p>
                    </div>
                    <span className={cn("size-2.5 rounded-full", tones[i % tones.length])} />
                    <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                      <Download className="size-3.5" /> Download
                    </Button>
                  </div>
                ))}
              </>
            )}
          </QueryState>
        </CardContent>
      </Card>
    </AppShell>
  );
}
