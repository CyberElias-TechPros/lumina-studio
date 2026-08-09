import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, BookOpenCheck, FileText, Search, ThumbsUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useItArticles, useItArticleItems } from "@/lib/query/it";
import type { ItArticle } from "@/lib/api/it";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/it/knowledge-base")({
  head: () => ({
    meta: [
      { title: "Knowledge Base — CEA-OS" },
      { name: "description", content: "Internal IT documentation." },
    ],
  }),
  component: ItKnowledgeBase,
});

const articleTone = [
  "bg-success/10 text-success",
  "bg-primary/10 text-primary",
  "bg-learning/10 text-learning",
];

function ItKnowledgeBase() {
  const query = useItArticles();
  const articles = useItArticleItems();

  const views = articles.reduce((sum, a) => sum + a.views, 0);
  const helpful =
    articles.length > 0
      ? Math.round(articles.reduce((sum, a) => sum + a.helpfulPct, 0) / articles.length)
      : 0;

  return (
    <AppShell
      roleKey="it"
      title="Knowledge base"
      subtitle={
        articles.length > 0
          ? `${articles.length} articles · ${views.toLocaleString()} views this month`
          : "Loading articles…"
      }
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            {helpful}% helpful
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/portal/it-support">
              <ArrowLeft className="size-4" /> IT Support portal
            </Link>
          </Button>
        </>
      }
    >
      <div className="bg-card shadow-soft flex flex-wrap items-center gap-2 rounded-2xl border p-3">
        <div className="bg-muted flex min-w-0 flex-1 items-center gap-2 rounded-xl px-3 py-2">
          <Search className="text-muted-foreground size-4 shrink-0" />
          <input
            className="placeholder:text-muted-foreground w-full bg-transparent text-sm font-medium outline-none"
            placeholder="WiFi, printer, laptop…"
          />
        </div>
        <Button size="sm" className="font-semibold">
          Search
        </Button>
      </div>

      <Card className="bg-card mt-5 shadow-soft border">
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <BookOpenCheck className="text-primary size-4" /> Top articles
          </CardTitle>
          <Button variant="outline" size="sm" className="font-semibold">
            <FileText className="size-3.5" /> New article
          </Button>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<ItArticle[]>
            query={query}
            error={{ title: "Articles unavailable" }}
            empty={{
              title: "No articles yet",
              description: "Published guides will show here.",
            }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) =>
              rows.map((a, i) => (
                <div
                  key={a.id}
                  className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold">{a.title}</p>
                    <p className="text-muted-foreground text-xs">{a.views} views</p>
                  </div>
                  <Badge
                    className={cn("border-0 font-semibold", articleTone[i % articleTone.length])}
                  >
                    <ThumbsUp className="mr-1 size-3" /> Helpful {a.helpfulPct}%
                  </Badge>
                  <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                    Open
                  </Button>
                </div>
              ))
            }
          </QueryState>
        </CardContent>
      </Card>
    </AppShell>
  );
}
