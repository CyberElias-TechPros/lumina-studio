import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageShell, PageHero, SectionHeading } from "@/components/marketing/shell";
import { Reveal } from "@/components/motion";
import { getPageHead } from "@/lib/seo";
import { getGlossaryTerms, type GlossaryTerm } from "@/data/glossary";

export const Route = createFileRoute("/glossary")({
  head: () =>
    getPageHead({
      title: "Tech Glossary — plain definitions with Nigerian context",
      description: "Understand the terms that matter for tech careers in Nigeria. Each entry gives you the definition, why it matters, and how it shows up in local workplaces.",
      path: "/glossary",
      image: "https://cea.ng/og-glossary.svg",
    }),
  component: GlossaryPage,
});

function GlossaryPage() {
  const terms = getGlossaryTerms();
  const categories = categorizeTerms(terms);

  return (
    <PageShell>
      <PageHero
        eyebrow="Reference"
        title={
          <>
            Tech <span className="text-gradient">Glossary</span>
          </>
        }
        description={`${terms.length} terms defined with honest, Nigeria-specific context. No jargon for jargon's sake — just what you need to know to do the work.`}
      />

      <section className="container-page pb-20">
        <div className="mx-auto max-w-4xl space-y-8">
          <Reveal>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                {
                  label: "Total terms",
                  value: String(terms.length),
                  icon: BookOpen,
                  tone: "bg-primary/10 text-primary",
                },
                {
                  label: "Categories",
                  value: String(Object.keys(categories).length),
                  icon: Badge,
                  tone: "bg-learning/10 text-learning",
                },
              ].map((k) => (
                <Card key={k.label} className="bg-card shadow-soft border">
                  <CardContent className="flex items-center gap-3 p-4">
                    <span className={`grid size-9 shrink-0 place-items-center rounded-lg ${k.tone}`}>
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
            <form className="relative max-w-xl mx-auto" role="search">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input
                type="search"
                id="glossary-search"
                placeholder="Search terms (e.g., SIEM, CI/CD, RAG)..."
                className="w-full bg-input/50 border rounded-xl py-3 pl-10 pr-4 text-base font-semibold placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                aria-label="Search glossary"
              />
            </form>
          </Reveal>

          {Object.entries(categories).map(([category, catTerms]) => (
            <Reveal key={category}>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <SectionHeading
                    eyebrow="Browse"
                    title={category}
                    description={`${catTerms.length} terms`}
                  />
                  <Badge variant="secondary" className="gap-1">
                    <BookOpen className="size-3" /> {catTerms.length} terms
                  </Badge>
                </div>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {catTerms.map((term) => (
                    <li key={term.slug}>
                      <Link
                        to="/glossary/$slug"
                        params={{ slug: term.slug }}
                        className="group bg-card shadow-soft hover:shadow-elevated flex flex-col gap-2 rounded-xl border p-4 transition-shadow"
                      >
                        <h3 className="font-display group-hover:text-primary text-base font-extrabold transition-colors">
                          {term.term}
                        </h3>
                        <p className="text-muted-foreground text-sm line-clamp-2">
                          {term.definition}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {term.relatedPrograms?.length ? term.relatedPrograms[0] : "General"}
                          </Badge>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}

          <Reveal>
            <Card className="bg-gradient-ink text-ink-foreground shadow-elevated border-0">
              <CardContent className="p-6 text-center">
                <p className="font-display text-lg font-extrabold mb-2">
                  Missing a term?
                </p>
                <p className="text-ink-foreground/70 text-sm mb-4">
                  Suggest it in the community and we'll add it — this glossary grows with the
                  people who use it.
                </p>
                <Button variant="secondary" className="font-semibold" asChild>
                  <Link to="/community">Join the community</Link>
                </Button>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}

function categorizeTerms(terms: GlossaryTerm[]) {
  const categories: Record<string, GlossaryTerm[]> = {};
  for (const term of terms) {
    const cat = inferCategory(term);
    if (!categories[cat]) categories[cat] = [];
    categories[cat].push(term);
  }
  return categories;
}

function inferCategory(term: GlossaryTerm): string {
  if (term.relatedPrograms?.includes("cybersecurity-analyst")) return "Cybersecurity";
  if (term.relatedPrograms?.includes("cloud-engineering-devops")) return "Cloud & DevOps";
  if (term.relatedPrograms?.includes("full-stack-software-development")) return "Software Engineering";
  if (term.relatedPrograms?.includes("data-science-ai")) return "Data & AI";
  if (term.relatedPrograms?.includes("product-ui-ux-design")) return "Product & Design";
  if (term.relatedPrograms?.includes("digital-marketing-growth")) return "Marketing & Growth";
  if (term.relatedPrograms?.includes("networking-it-support")) return "Networking & IT";
  if (term.relatedPrograms?.includes("mobile-app-development")) return "Mobile Development";
  return "General";
}