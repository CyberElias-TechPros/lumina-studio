import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, FileText, FolderTree, Library } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import { LibraryBrowser } from "@/components/library/library-browser";
import { useLibrary } from "@/lib/query/library";
import type { PaginatedLibrary } from "@/lib/api/library";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/library")({
  head: () => ({
    meta: [
      { title: "Library — CEA-OS" },
      {
        name: "description",
        content:
          "All course materials, guides and reference documents — searchable, one click away.",
      },
    ],
  }),
  component: StudentLibrary,
});

function StudentLibrary() {
  const library = useLibrary();
  const items = library.data?.items ?? [];
  const files = items.filter((i) => i.kind === "file");
  const folders = items.filter((i) => i.kind === "folder");
  const protectedCount = items.filter((i) => i.isProtected).length;

  return (
    <AppShell
      roleKey="student"
      title="Library"
      subtitle="Every course material, guide and reference document — searchable"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            {items.length ? `${items.length.toLocaleString()} items` : "Loading…"}
          </Badge>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          {
            label: "Files",
            value: items.length ? files.length.toLocaleString() : "—",
            icon: FileText,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Folders",
            value: folders.length ? folders.length.toLocaleString() : "—",
            icon: FolderTree,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Course materials",
            value: protectedCount ? protectedCount.toLocaleString() : "—",
            icon: BookOpen,
            tone: "bg-warning/10 text-warning",
          },
        ].map((k) => (
          <Card key={k.label} className="bg-card shadow-soft border">
            <CardContent className="flex items-center gap-3 p-4">
              <span className={cn("grid size-9 shrink-0 place-items-center rounded-lg", k.tone)}>
                <k.icon className="size-4" />
              </span>
              <div>
                <p className="font-display text-lg font-extrabold">{k.value}</p>
                <p className="text-muted-foreground text-xs font-semibold">{k.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-5">
        <QueryState<PaginatedLibrary> query={library} error={{ title: "Library unavailable" }}>
          {(data) => (
            <LibraryBrowser
              items={data.items}
              sourceName="Course & Resource Library"
              canAccessProtected
            />
          )}
        </QueryState>
      </div>
    </AppShell>
  );
}
