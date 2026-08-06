import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Award, Boxes, FileCheck, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import { useSupCerts, useSupCertItems } from "@/lib/query/supplierPartner";
import type { SupCert } from "@/lib/api/supplierPartner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/supplier/profile")({
  head: () => ({
    meta: [
      { title: "Supplier profile — CEA-OS" },
      { name: "description", content: "Company profile, certifications and catalogue." },
    ],
  }),
  component: SupplierProfile,
});

function SupplierProfile() {
  const certsQuery = useSupCerts();
  const certs = useSupCertItems();

  const verified = certs.filter((c) => c.verified === 1);

  return (
    <AppShell
      roleKey="instructor"
      title="Supplier profile"
      subtitle="OfficeMate Ltd · Office & refreshment supplies"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            {certs.length > 0 ? `${verified.length}/${certs.length} certs verified` : "—"}
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/supplier">
              <ArrowLeft className="size-4" /> Supplier hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Company",
            value: "OfficeMate Ltd",
            delta: "vendor since 2024",
            icon: Award,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Certifications",
            value: certs.length > 0 ? String(verified.length) : "—",
            delta: "verified",
            icon: FileCheck,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Catalogue",
            value: "34",
            delta: "active SKUs",
            icon: Boxes,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Rating",
            value: "4.8",
            delta: "up 0.1 this quarter",
            icon: TrendingUp,
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
            <FileCheck className="text-primary size-4" /> Certifications
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<SupCert[]>
            query={certsQuery}
            error={{ title: "Certifications unavailable" }}
            empty={{
              title: "No certifications",
              description: "Uploaded certifications show here.",
            }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) => (
              <>
                {rows.map((c) => (
                  <div
                    key={c.id}
                    className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">{c.title}</p>
                      <p className="text-muted-foreground text-xs">{c.detail}</p>
                    </div>
                    <Badge
                      className={cn(
                        "border-0 font-semibold",
                        c.verified === 1
                          ? "bg-success/10 text-success"
                          : "bg-warning/10 text-warning",
                      )}
                    >
                      {c.verified === 1 ? "Verified" : "Pending"}
                    </Badge>
                    <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                      Details
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
