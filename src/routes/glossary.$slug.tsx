import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, BookOpen, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageShell, PageHero } from "@/components/marketing/shell";
import { Reveal } from "@/components/motion";
import { getPageHead } from "@/lib/seo";
import { getGlossaryTerm } from "@/data/glossary";

export const Route = createFileRoute("/glossary/$slug")({
  validateSearch: (search: Record<string, unknown>): { q?: string } => ({
    q: typeof search.q === "string" && search.q.trim().length > 0 ? search.q.trim() : undefined,
  }),
  head: ({ params }) => {
    const term = getGlossaryTerm(params.slug);
    if (!term) {
      return getPageHead({
        title: "Term not found — Glossary",
        description: "The requested glossary term does not exist.",
        path: `/glossary/${params.slug}`,
      });
    }
    return getPageHead({
      title: `${term.term} — defined with Nigerian context`,
      description: `${term.definition.slice(0, 150)}... Plain definition, why it matters, and how it shows up in Nigerian workplaces.`,
      path: `/glossary/${params.slug}`,
      structuredData: {
        "@context": "https://schema.org",
        "@type": "DefinedTerm",
        termCode: term.term,
        name: term.term,
        description: term.definition,
        inDefinedTermSet: {
          "@type": "DefinedTermSet",
          name: "CEA Tech Glossary",
        },
      },
    });
  },
  component: GlossaryTermPage,
});

function GlossaryTermPage() {
  const { slug } = Route.useParams();
  const { q } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [query, setQuery] = useState(q ?? "");
  const term = getGlossaryTerm(slug);

  if (!term) {
    return (
      <PageShell>
        <PageHero
          eyebrow="Glossary"
          title={
            <>
              Term <span className="text-gradient">not found</span>
            </>
          }
          description="That term does not exist in our glossary yet."
        />
        <section className="container-page pb-20">
          <Reveal>
            <Button variant="ghost" size="sm" className="-mx-2 mb-6" asChild>
              <Link to="/glossary">
                <ArrowLeft className="size-4" /> Back to glossary
              </Link>
            </Button>
            <p className="text-muted-foreground mb-6">Try searching for a related term:</p>
            <form
              className="mx-auto max-w-md"
              role="search"
              onSubmit={(event) => {
                event.preventDefault();
                void navigate({ to: "/glossary", search: { q: query.trim() || undefined } });
              }}
            >
              <input
                type="search"
                name="q"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search glossary..."
                aria-label="Search glossary"
                className="w-full rounded-xl border bg-input/50 px-4 py-3 text-base font-semibold placeholder:text-muted-foreground focus:border-primary focus:outline-none"
              />
            </form>
          </Reveal>
        </section>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <PageHero eyebrow="Glossary" title={<>{term.term}</>} description={term.definition} />

      <section className="container-page pb-20">
        <div className="mx-auto max-w-3xl space-y-10">
          <Reveal>
            <Button variant="ghost" size="sm" className="-mx-2 mb-2" asChild>
              <Link to="/glossary">
                <ArrowLeft className="size-4" /> Back to glossary
              </Link>
            </Button>
          </Reveal>

          <Reveal>
            <Card className="bg-primary/5 border-primary/20 shadow-soft">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="gap-1">
                    <BookOpen className="size-3" /> Plain definition
                  </Badge>
                </div>
                <p className="text-lg leading-relaxed font-medium">{term.definition}</p>
              </CardContent>
            </Card>
          </Reveal>

          <Reveal>
            <div className="space-y-6">
              <h2 className="font-display text-xl font-extrabold">Why it matters</h2>
              <p className="text-muted-foreground leading-relaxed">{term.whyItMatters}</p>
            </div>
          </Reveal>

          <Reveal>
            <div className="space-y-6">
              <h2 className="font-display text-xl font-extrabold">
                {term.term} in Nigerian workplaces
              </h2>
              <p className="text-muted-foreground leading-relaxed">{term.inNigeria}</p>
            </div>
          </Reveal>

          {term.vs && term.vsAnswer && (
            <Reveal>
              <Card className="bg-muted/30 border-muted/50 shadow-none">
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-display font-extrabold text-base">
                    {term.term} vs {term.vs}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{term.vsAnswer}</p>
                </CardContent>
              </Card>
            </Reveal>
          )}

          {term.relatedPrograms?.length && (
            <Reveal>
              <div className="space-y-4">
                <h2 className="font-display text-xl font-extrabold">Taught in</h2>
                <div className="flex flex-wrap gap-2">
                  {term.relatedPrograms.map((p) => (
                    <Link
                      key={p}
                      to="/programs/$slug"
                      params={{ slug: p }}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-border/50 px-2.5 py-1 text-xs font-semibold hover:border-primary hover:text-primary transition-colors"
                    >
                      {p.replace(/-/g, " ")}
                    </Link>
                  ))}
                </div>
              </div>
            </Reveal>
          )}

          {term.relatedPosts?.length && (
            <Reveal>
              <div className="space-y-4">
                <h2 className="font-display text-xl font-extrabold">Read more</h2>
                <ul className="space-y-2">
                  {term.relatedPosts.map((post) => (
                    <li key={post}>
                      <Link
                        to="/blog/$slug"
                        params={{ slug: post }}
                        className="group flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                      >
                        <ExternalLink className="size-3.5 shrink-0" />
                        {post.replace(/-/g, " ")}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )}

          <Reveal>
            <Card className="bg-gradient-ink text-ink-foreground shadow-elevated border-0">
              <CardContent className="p-6 text-center">
                <p className="font-display text-base font-extrabold mb-2">
                  Spot an error or want to add context?
                </p>
                <p className="text-ink-foreground/70 text-sm mb-4">
                  This glossary is maintained by CEA instructors and the community. Suggest changes
                  in the community.
                </p>
                <Button variant="secondary" className="font-semibold" asChild>
                  <Link to="/community">Join the discussion</Link>
                </Button>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
