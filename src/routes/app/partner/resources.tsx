import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Download, Image, Library, MessagesSquare, Palette } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import { usePtnResourceItems, usePtnResources } from "@/lib/query/supplierPartner";
import type { PtnResource } from "@/lib/api/supplierPartner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/partner/resources")({
  head: () => ({
    meta: [
      { title: "Resources — CEA-OS" },
      { name: "description", content: "Co-branded materials, logos and templates." },
    ],
  }),
  component: PartnerResources,
});

const kindMeta: Record<string, { icon: typeof Palette; tone: string }> = {
  logo: { icon: Palette, tone: "bg-primary/10 text-primary" },
  flyer: { icon: Image, tone: "bg-learning/10 text-learning" },
  guidelines: { icon: Library, tone: "bg-success/10 text-success" },
  banner: { icon: MessagesSquare, tone: "bg-warning/10 text-warning" },
};

function PartnerResources() {
  const resourcesQuery = usePtnResources();
  const resources = usePtnResourceItems();

  return (
    <AppShell
      roleKey="partner"
      title="Resources"
      subtitle={
        resources.length > 0
          ? `Co-branded materials · ${resources.length} asset pack${resources.length === 1 ? "" : "s"}`
          : "Co-branded materials"
      }
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            {resources.length > 0 ? "Updated Aug 1" : "—"}
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/partner/hub">
              <ArrowLeft className="size-4" /> Partner hub
            </Link>
          </Button>
        </>
      }
    >
      <Card className="bg-card shadow-soft border">
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <Library className="text-primary size-4" /> Brand & content kit
          </CardTitle>
          <Button variant="outline" size="sm" className="font-semibold">
            <Download className="size-3.5" /> Download all
          </Button>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <QueryState<PtnResource[]>
            query={resourcesQuery}
            error={{ title: "Resources unavailable" }}
            empty={{ title: "No resources", description: "Brand assets will appear here." }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) => (
              <>
                {rows.map((r) => {
                  const meta = kindMeta[r.kind] ?? {
                    icon: Library,
                    tone: "bg-muted text-muted-foreground",
                  };
                  const Icon = meta.icon;
                  return (
                    <div key={r.id} className="group flex flex-col rounded-xl border p-4">
                      <span className={cn("grid size-9 place-items-center rounded-lg", meta.tone)}>
                        <Icon className="size-4" />
                      </span>
                      <p className="mt-3 text-sm font-bold">{r.title}</p>
                      <p className="text-muted-foreground mt-0.5 text-xs">{r.detail}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-3 justify-start px-0 font-semibold"
                      >
                        <Download className="size-3.5" /> Download
                      </Button>
                    </div>
                  );
                })}
              </>
            )}
          </QueryState>
        </CardContent>
      </Card>
    </AppShell>
  );
}
