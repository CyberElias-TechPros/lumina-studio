import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Download, FileText, FolderOpen, Search, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/client/documents")({
  head: () => ({
    meta: [
      { title: "Documents — CEA-OS" },
      { name: "description", content: "Shared files, SOW and reports." },
    ],
  }),
  component: ClientDocuments,
});

const documents = [
  {
    d: "SOW · Platform rebuild v2",
    v: "PDF · 2.4 MB · updated Jul 28",
    s: "Shared",
    tone: "bg-success/10 text-success",
  },
  {
    d: "Weekly status report · W31",
    v: "PDF · 1.1 MB · Jul 31",
    s: "New",
    tone: "bg-primary/10 text-primary",
  },
  {
    d: "Invoice + receipt archive",
    v: "Folder · 14 files · Q3",
    s: "Shared",
    tone: "bg-success/10 text-success",
  },
];

function ClientDocuments() {
  return (
    <AppShell
      roleKey="instructor"
      title="Documents"
      subtitle="48 files · 12 folders · versioned"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">48 files</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/portal/client">
              <ArrowLeft className="size-4" /> Client portal
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Files",
            value: "48",
            delta: "across 12 folders",
            icon: FileText,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Shared with us",
            value: "36",
            delta: "by project team",
            icon: Share2,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "New (7d)",
            value: "5",
            delta: "reports + SOW",
            icon: FolderOpen,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Search",
            value: "180 ms",
            delta: "full-text",
            icon: Search,
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
            <FolderOpen className="text-primary size-4" /> Recent documents
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {documents.map((d) => (
            <div key={d.d} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{d.d}</p>
                <p className="text-muted-foreground text-xs">{d.v}</p>
              </div>
              <Badge className={cn("border-0 font-semibold", d.tone)}>{d.s}</Badge>
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
