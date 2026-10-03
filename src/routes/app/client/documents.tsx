"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { toast } from "sonner";
import { ArrowLeft, Download, FileText, FolderOpen, Search, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import type { CliDocument } from "@/lib/query/clientEngagement";
import { useCliDocuments } from "@/lib/query/clientEngagement";
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

function statusTone(s: string) {
  const l = s.toLowerCase();
  if (l.includes("shared")) return "bg-success/10 text-success";
  if (l.includes("new")) return "bg-primary/10 text-primary";
  return "bg-muted-foreground/10 text-muted-foreground";
}

function downloadDocumentSummary(item: CliDocument) {
  const contents = [
    "CEA Studio document summary",
    `Title: ${item.title}`,
    `Type: ${item.type}`,
    `Size: ${item.size}`,
    `Last updated: ${item.updated}`,
    `Status: ${item.status}`,
  ].join("\n");
  const url = URL.createObjectURL(new Blob([contents], { type: "text/plain;charset=utf-8" }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-summary.txt`;
  anchor.click();
  URL.revokeObjectURL(url);
  toast.success("Document summary downloaded");
}

function ClientDocuments() {
  const documentsQuery = useCliDocuments();

  return (
    <AppShell
      roleKey="client"
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
          <QueryState<CliDocument[]>
            query={documentsQuery}
            error={{ title: "Documents unavailable" }}
            empty={{
              title: "No documents",
              description: "Your documents will appear here.",
            }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) => (
              <>
                {rows.map((d) => (
                  <div
                    key={d.id}
                    className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">{d.title}</p>
                      <p className="text-muted-foreground text-xs">
                        {d.type} · {d.size} · {d.updated}
                      </p>
                    </div>
                    <Badge className={cn("border-0 font-semibold", statusTone(d.status))}>
                      {d.status}
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      className="shrink-0 font-semibold"
                      onClick={() => downloadDocumentSummary(d)}
                    >
                      <Download className="size-3.5" /> Download summary
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
