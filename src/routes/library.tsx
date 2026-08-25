import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  ExternalLink,
  FileText,
  FolderTree,
  Globe2,
  Library,
} from "lucide-react";
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
import { getPageHead } from "@/lib/seo";
import { getLibraryCategories, libraryCatalogMeta } from "@/data/library-catalog";

export const Route = createFileRoute("/library")({
  head: () =>
    getPageHead({
      title: "Digital Library — free tech learning resources",
      description: `${libraryCatalogMeta.totalItems} free, public resources: coding roadmaps, career links, internships, resumes, mentorship guides and more. No signup required.`,
      path: "/library",
      image: "https://cea.ng/og-library.svg",
    }),
  component: LibraryPage,
});

function LibraryPage() {
  const catalog = useLibraryCatalog();
  const categories = getLibraryCategories();

  return (
    <PageShell>
      <PageHero
        eyebrow="Digital library"
        title={
          <>
            Every guide, glossary and <span className="text-gradient">framework</span>, in one place
          </>
        }
        description="A completely open knowledge base for our community. Every resource below is free to browse and use — no account needed."
      />

      <section className="container-page pt-10">
        <Reveal>
          <div className="relative h-44 overflow-hidden rounded-2xl border sm:h-56">
            <SceneArt variant="cloud">
              <div className="flex h-full items-end p-6 sm:p-7">
                <div className="max-w-xl">
                  <p className="text-white/70 text-xs font-bold tracking-[0.18em] uppercase">
                    Open access — no signup
                  </p>
                  <h2 className="font-display mt-1 text-lg font-extrabold text-white sm:text-xl">
                    {libraryCatalogMeta.totalItems}+ curated resources across {categories.length}{" "}
                    collections.
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
                  label: "Public resources",
                  value: String(libraryCatalogMeta.totalItems),
                  icon: FileText,
                  tone: "bg-primary/10 text-primary",
                },
                {
                  label: "Collections",
                  value: String(categories.length),
                  icon: FolderTree,
                  tone: "bg-learning/10 text-learning",
                },
                {
                  label: "Access",
                  value: "Free, forever",
                  icon: Globe2,
                  tone: "bg-success/10 text-success",
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
            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p>
                The CEA digital library is how we practice what we teach: learning materials
                organised like a real engineering knowledge base rather than a pile of downloads.
                Everything in it serves two audiences — learners anywhere deciding what to study
                next, and our own students using the same open resources alongside their programme
                materials.
              </p>
              <p>
                Inside you will find curated coding roadmaps for every major track, hand-picked
                career and internship boards, resume guides tuned for Nigerian and remote
                applications, mentorship reading lists, research opportunity databases and technical
                reference sheets our instructors use in class. Collections are maintained by CEA
                instructors and updated as fields change — dead links get pruned, new high-quality
                sources replace them.
              </p>
              <p>
                Everything is free without an account. Registered students additionally get their
                programme's private materials — module workbooks, lab exercises, datasets and
                recorded sessions — inside their student dashboard; those live separately from this
                public collection.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <SectionHeading
              eyebrow="Browse by collection"
              title="Open collections"
              description="Every collection below is fully public. Open any collection to see its resources."
            />
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  to="/library/$category"
                  params={{ category: cat.slug }}
                  className="group bg-card shadow-soft hover:shadow-elevated rounded-2xl border p-5 transition-shadow"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="font-display group-hover:text-primary truncate text-sm font-extrabold transition-colors">
                        {cat.path}
                      </h3>
                      <p className="text-muted-foreground mt-1 text-xs font-semibold">
                        {cat.count} resource{cat.count === 1 ? "" : "s"}
                      </p>
                    </div>
                    <ArrowRight className="text-muted-foreground group-hover:text-primary mt-0.5 size-4 shrink-0 transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
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
                    Programme-private materials — module workbooks, lab exercises, datasets and
                    recorded sessions — unlock when you sign in as a registered student or team
                    member.
                  </p>
                </div>
                <Button variant="secondary" className="font-semibold" asChild>
                  <Link to="/auth/sign-in">Get full access</Link>
                </Button>
              </CardContent>
            </Card>
          </Reveal>

          <Reveal>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <SectionHeading
                eyebrow="Search everything"
                title="Full catalogue"
                description={`Search or expand any folder across all ${libraryCatalogMeta.totalItems} public resources.`}
              />
              <Badge variant="outline" className="gap-1.5">
                <Library className="size-3" /> Live index
              </Badge>
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
        </div>
      </section>
    </PageShell>
  );
}
