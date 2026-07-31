import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, BadgeCheck, FileBadge2, PackageSearch, Star, Store } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/supplier/profile")({
  head: () => ({
    meta: [
      { title: "Company Profile — CEA-OS" },
      { name: "description", content: "Catalog, certifications and company details." },
    ],
  }),
  component: SupplierProfile,
});

const certs = [
  { c: "CAC registration", d: "Verified 2024", tone: "bg-success/10 text-success" },
  { c: "Quality service cert", d: "Renews Jan 2027", tone: "bg-primary/10 text-primary" },
];

function SupplierProfile() {
  return (
    <AppShell
      roleKey="student"
      title="Company profile"
      subtitle="OfficeMate Ltd · stationery & office supplies"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            Verified supplier
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
            label: "Catalog SKUs",
            value: "34",
            delta: "live for CEA",
            icon: PackageSearch,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Rating",
            value: "4.8",
            delta: "24 reviews",
            icon: Star,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Certifications",
            value: "2",
            delta: "all verified",
            icon: BadgeCheck,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Partner since",
            value: "2024",
            delta: "2+ years",
            icon: Store,
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
            <FileBadge2 className="text-primary size-4" /> Certifications
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {certs.map((c) => (
            <div key={c.c} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{c.c}</p>
                <p className="text-muted-foreground text-xs">{c.d}</p>
              </div>
              <Badge className={cn("border-0 font-semibold", c.tone)}>Verified</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
