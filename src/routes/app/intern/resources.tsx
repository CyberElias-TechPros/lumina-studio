import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, FileText, Image, Link as LinkIcon, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import { useIntResources } from "@/lib/query/internDashboard";
import type { IntResource } from "@/lib/api/internDashboard";

export const Route = createFileRoute("/app/intern/resources")({
  head: () => ({
    meta: [
      { title: "Resources — CEA-OS Intern" },
      { name: "description", content: "Learning materials and reference resources." },
    ],
  }),
  component: InternResources,
});

function kindIcon(kind: string) {
  switch (kind?.toLowerCase()) {
    case "article":
      return <FileText className="size-4" />;
    case "video":
      return <Video className="size-4" />;
    case "link":
      return <LinkIcon className="size-4" />;
    case "image":
      return <Image className="size-4" />;
    default:
      return <BookOpen className="size-4" />;
  }
}

function InternResources() {
  const resources = useIntResources();

  return (
    <AppShell
      roleKey="intern"
      title="Resources"
      subtitle="Curated materials, templates and references"
      actions={
        <Button asChild variant="outline" size="sm" className="font-semibold">
          <Link to="/app/intern">
            <ArrowLeft className="size-4" /> Intern hub
          </Link>
        </Button>
      }
    >
      <QueryState<IntResource[]> query={resources} empty={{ title: "No resources yet" }}>
        {(items) => (
          <Card className="bg-card shadow-soft border overflow-hidden">
            <div className="divide-y">
              {items.map((r) => (
                <div key={r.id} className="p-4 flex flex-wrap items-center gap-4">
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-sm">{r.title}</p>
                    <p className="text-muted-foreground text-xs mt-1">
                      {r.kind} · recommended for your track
                    </p>
                  </div>
                  <span className="text-primary">{kindIcon(r.kind)}</span>
                </div>
              ))}
            </div>
          </Card>
        )}
      </QueryState>
    </AppShell>
  );
}
