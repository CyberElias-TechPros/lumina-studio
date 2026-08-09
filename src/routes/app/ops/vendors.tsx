import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, BadgeCheck, FileSignature, Handshake, Star, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useVendors, useVendorItems, useContracts, useContractItems } from "@/lib/query/ops";
import type { Vendor, VendorContract } from "@/lib/api/ops";
import { cn, formatNairaCompact } from "@/lib/utils";

export const Route = createFileRoute("/app/ops/vendors")({
  head: () => ({
    meta: [
      { title: "Vendors — CEA-OS" },
      { name: "description", content: "Vendor contracts, performance and purchase history." },
    ],
  }),
  component: OperationsVendors,
});

const vendorTone: Record<string, string> = {
  active: "bg-success/10 text-success",
  watch: "bg-warning/10 text-warning",
};

function OperationsVendors() {
  const vendorsQuery = useVendors();
  const vendors = useVendorItems();
  const contractsQuery = useContracts();
  const contracts = useContractItems();

  const active = vendors.filter((v) => v.status === "active").length;
  const watch = vendors.filter((v) => v.status === "watch").length;
  const avgRating =
    vendors.length > 0
      ? (vendors.reduce((s, v) => s + v.rating, 0) / vendors.length).toFixed(1)
      : "—";
  const liveContracts = contracts.filter((c) => c.status === "active").length;
  const contractValue = contracts.reduce((s, c) => s + c.valueYr, 0);

  return (
    <AppShell
      roleKey="ops"
      title="Vendor management"
      subtitle={
        vendors.length > 0
          ? `${vendors.length} vendors · ${contracts.length} contracts on file`
          : "Loading vendors…"
      }
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            Payments on track
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
            label: "Active vendors",
            value: active > 0 ? String(active) : "—",
            delta: `${vendors.length} total`,
            icon: Handshake,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Avg rating",
            value: avgRating,
            delta: "of 5",
            icon: Star,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Contracts live",
            value: liveContracts > 0 ? String(liveContracts) : "—",
            delta: `${contractValue > 0 ? formatNairaCompact(contractValue) : "—"}/yr`,
            icon: FileSignature,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Watchlist",
            value: watch > 0 ? String(watch) : "0",
            delta: "need attention",
            icon: Truck,
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

      <div className="mt-5 grid gap-5 xl:grid-cols-2">
        <Card className="bg-card shadow-soft border">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <BadgeCheck className="text-primary size-4" /> Vendor performance
            </CardTitle>
            <Button variant="outline" size="sm" className="font-semibold">
              Add vendor
            </Button>
          </CardHeader>
          <CardContent className="divide-y">
            <QueryState<Vendor[]>
              query={vendorsQuery}
              error={{ title: "Vendors unavailable" }}
              empty={{
                title: "No vendors yet",
                description: "Vendor records will show here.",
              }}
              isEmpty={(rows) => rows.length === 0}
            >
              {(rows) => (
                <>
                  {rows.map((v) => (
                    <div
                      key={v.id}
                      className="flex flex-wrap items-center gap-3 py-3.5 first:pt-0 last:pb-0"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold">{v.name}</p>
                        <p className="text-muted-foreground text-xs">
                          {v.category} · rated {v.rating.toFixed(1)} / 5
                        </p>
                      </div>
                      <Badge
                        className={cn(
                          "border-0 font-semibold capitalize",
                          vendorTone[v.status] ?? "bg-muted/20 text-muted-foreground",
                        )}
                      >
                        {v.status}
                      </Badge>
                    </div>
                  ))}
                </>
              )}
            </QueryState>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <FileSignature className="text-primary size-4" /> Contracts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <QueryState<VendorContract[]>
              query={contractsQuery}
              error={{ title: "Contracts unavailable" }}
              empty={{
                title: "No contracts yet",
                description: "Vendor contracts will show here.",
              }}
              isEmpty={(rows) => rows.length === 0}
            >
              {(rows) => (
                <>
                  {rows.map((c) => (
                    <div
                      key={c.id}
                      className="flex items-center justify-between rounded-xl border p-3"
                    >
                      <div>
                        <p className="text-sm font-bold">{c.title}</p>
                        <p className="text-muted-foreground mt-0.5 text-xs">
                          {c.renews} · {formatNairaCompact(c.valueYr)}/yr
                        </p>
                      </div>
                      <Badge className="border-0 bg-success/10 font-semibold text-success">
                        Active
                      </Badge>
                    </div>
                  ))}
                </>
              )}
            </QueryState>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
