import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, FileText, FolderTree, Library, LockKeyhole } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageShell, PageHero, SectionHeading } from "@/components/marketing/shell";
import { Reveal } from "@/components/motion";
import { QueryState } from "@/components/ui/query-state";
import { LibraryBrowser } from "@/components/library/library-browser";
import { SceneArt } from "@/components/art/scene-art";
import { useLibraryCatalog } from "@/lib/query/library";
import type { LibraryCatalog } from "@/lib/api/library";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/library")({
  head: () => ({
    meta: [
      { title: "Digital Library — Cyber Elias Academy" },
      {
        name: "description",
        content:
          "Browse our public knowledge base — glossaries, data dictionaries, guides and templates. Students get full access to all course materials after signing in.",
      },
      { property: "og:image", content: "https://cea-os.vercel.app/og-library.svg" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: LibraryPage,
});

function LibraryPage() {
  const catalog = useLibraryCatalog();
  const items = catalog.data?.items ?? [];
  const files = items.filter((i) => i.kind === "file");
  const folders = items.filter((i) => i.kind === "folder");

  return (
    <PageShell>
      <PageHero
        eyebrow="Digital library"
        title={
          <>
            Every guide, glossary and <span className="text-gradient">framework</span>, in one place
          </>
        }
        description="A public knowledge base for our community. Browse open resources freely — and sign in as a student or team member to unlock the full course library."
      />

      <section className="container-page pt-10">
        <Reveal>
          <div className="relative h-44 overflow-hidden rounded-2xl border sm:h-56">
            <SceneArt variant="cloud">
              <div className="flex h-full items-end p-6 sm:p-7">
                <div className="max-w-xl">
                  <p className="text-white/70 text-xs font-bold tracking-[0.18em] uppercase">
                    Public knowledge base
                  </p>
                  <h2 className="font-display mt-1 text-lg font-extrabold text-white sm:text-xl">
                    Search the vault below — or sign in to unlock every course material.
                  </h2>
                </div>
              </div>
            </SceneArt>
          </div>
        </Reveal>
      </section>

      <section className="container-page pb-20">
        <div className="mx-auto max-w-4xl space-y-8">
          <Reveal>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                {
                  label: "Public items",
                  value: items.length ? String(items.length) : "—",
                  icon: FileText,
                  tone: "bg-primary/10 text-primary",
                },
                {
                  label: "Folders",
                  value: folders.length ? String(folders.length) : "—",
                  icon: FolderTree,
                  tone: "bg-learning/10 text-learning",
                },
                {
                  label: "Protected",
                  value: "Full access",
                  icon: LockKeyhole,
                  tone: "bg-warning/10 text-warning",
                },
              ].map((k) => (
                <Card key={k.label} className="bg-card shadow-soft border">
                  <CardContent className="flex items-center gap-3 p-4">
                    <span
                      className={cn("grid size-9 shrink-0 place-items-center rounded-lg", k.tone)}
                    >
                      <k.icon className="size-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="font-display truncate text-lg font-extrabold">{k.value}</p>
                      <p className="text-muted-foreground text-xs font-semibold">{k.label}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <SectionHeading
                eyebrow="Browse"
                title="Open resources"
                description="Search or expand any folder — public files open directly in Drive."
              />
              <Button className="font-semibold" asChild>
                <Link to="/auth/sign-in">
                  <Library className="size-4" /> Sign in for full access
                </Link>
              </Button>
            </div>
          </Reveal>

          <Reveal>
            <QueryState<LibraryCatalog> query={catalog} error={{ title: "Library unavailable" }}>
              {(data) => (
                <LibraryBrowser
                  items={data.items}
                  sourceName={
                    data.sources.length > 1
                      ? "Digital Library & Resources"
                      : (data.sources[0]?.name ?? "Digital Library")
                  }
                  canAccessProtected={false}
                />
              )}
            </QueryState>
          </Reveal>

          <Reveal>
            <Card className="bg-gradient-ink text-ink-foreground shadow-elevated border-0">
              <CardContent className="flex flex-wrap items-center gap-4 p-6">
                <span className="bg-learning/20 text-learning grid size-11 shrink-0 place-items-center rounded-xl">
                  <BookOpen className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-display text-base font-extrabold">
                    Students & team members: full course library
                  </p>
                  <p className="text-ink-foreground/70 mt-0.5 text-sm">
                    All 900+ course materials — agile, SQL, data analytics, project management and
                    more — unlock when you sign in.
                  </p>
                </div>
                <Button variant="secondary" className="font-semibold" asChild>
                  <Link to="/auth/sign-in">Get full access</Link>
                </Button>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
