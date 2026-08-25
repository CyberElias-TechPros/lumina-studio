import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink, FileText, FolderTree } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageShell, PageHero, CTASection } from "@/components/marketing/shell";
import { Reveal } from "@/components/motion";
import { getPageHead } from "@/lib/seo";
import { getLibraryCategories, getLibraryCategory } from "@/data/library-catalog";

export const Route = createFileRoute("/library/$category")({
  validateSearch: (search: Record<string, unknown>): { page?: number } => ({
    page:
      typeof search.page === "string" &&
      Number.isInteger(Number(search.page)) &&
      Number(search.page) > 1
        ? Number(search.page)
        : undefined,
  }),
  head: ({ params }) => {
    const category = getLibraryCategory(params.category);
    const name = category?.path ?? "Library collection";
    return getPageHead({
      title: `${name} — free resources`,
      description: `Browse ${category?.count ?? 0} curated free resources in ${name}: hand-picked links maintained by Cyber Elias Academy instructors. Open to everyone.`,
      path: `/library/${params.category}`,
    });
  },
  component: LibraryCategoryPage,
});

const PAGE_SIZE = 60;

function LibraryCategoryPage() {
  const { category } = Route.useParams();
  const { page } = Route.useSearch();
  const data = getLibraryCategory(category);
  const categories = getLibraryCategories();

  if (!data) {
    return (
      <PageShell>
        <PageHero
          eyebrow="Digital library"
          title={
            <>
              Collection <span className="text-gradient">not found</span>
            </>
          }
          description="That collection does not exist. Browse all open collections instead."
        />
        <section className="container-page pb-20">
          <div className="mx-auto grid max-w-3xl gap-3 sm:grid-cols-2">
            {categories.map((c) => (
              <Link
                key={c.slug}
                to="/library/$category"
                params={{ category: c.slug }}
                className="group bg-card shadow-soft hover:shadow-elevated rounded-2xl border p-5 transition-shadow"
              >
                <h3 className="font-display group-hover:text-primary text-sm font-extrabold">
                  {c.path}
                </h3>
                <p className="text-muted-foreground mt-1 text-xs font-semibold">
                  {c.count} resources
                </p>
              </Link>
            ))}
          </div>
        </section>
        <CTASection />
      </PageShell>
    );
  }

  const currentPage = page ?? 1;
  const totalPages = Math.ceil(data.items.length / PAGE_SIZE);
  const slice = data.items.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <PageShell>
      <PageHero
        eyebrow="Digital library — open collection"
        title={<>{data.path}</>}
        description={`${data.count} free, instructor-curated resources. Every link opens directly — no account needed.`}
      />

      <section className="container-page pb-16">
        <Reveal>
          <Button variant="ghost" size="sm" className="-mx-2 mb-6" asChild>
            <Link to="/library">
              <ArrowLeft className="size-4" /> All collections
            </Link>
          </Button>
        </Reveal>

        <Reveal>
          <ul className="grid gap-2 md:grid-cols-2">
            {slice.map((item) => (
              <li key={item.url}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="group bg-card shadow-soft hover:shadow-elevated flex items-center gap-3 rounded-xl border p-3.5 transition-shadow"
                >
                  <span className="bg-primary/10 text-primary grid size-9 shrink-0 place-items-center rounded-lg">
                    {item.kind === "folder" ? (
                      <FolderTree className="size-4" />
                    ) : (
                      <FileText className="size-4" />
                    )}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-sm font-semibold">{item.name}</span>
                  <ExternalLink className="text-muted-foreground group-hover:text-primary size-4 shrink-0 transition-colors" />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        {totalPages > 1 && (
          <Reveal>
            <nav
              aria-label="Pagination"
              className="mt-8 flex flex-wrap items-center justify-center gap-2"
            >
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) =>
                p === currentPage ? (
                  <Badge key={p} className="px-3 py-1.5">
                    {p}
                  </Badge>
                ) : (
                  <Link
                    key={p}
                    to="/library/$category"
                    params={{ category: data.slug }}
                    search={{ page: p === 1 ? undefined : p }}
                    className="border-border hover:border-primary hover:text-primary rounded-lg border px-3 py-1.5 text-sm font-semibold transition-colors"
                  >
                    {p}
                  </Link>
                ),
              )}
            </nav>
          </Reveal>
        )}

        <Reveal>
          <p className="text-muted-foreground mt-10 leading-relaxed text-sm">
            Links in this collection point to external resources and shared drives curated by CEA
            instructors. We review collections regularly to prune dead links and add better sources.
            Found something broken or have a suggestion? Tell us in the community.
          </p>
        </Reveal>
      </section>

      <CTASection />
    </PageShell>
  );
}
