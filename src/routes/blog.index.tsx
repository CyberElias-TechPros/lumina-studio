import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { getPageHead } from "@/lib/seo";
import { ArrowUpRight, Clock, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { CTASection, PageHero, PageShell, SectionHeading } from "@/components/marketing/shell";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion";
import { blogPosts, engineMap } from "@/data/site";
import { readingTimeLabel } from "@/lib/blog-reading-time";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/blog/")({
  head: () =>
    getPageHead({
      title: "Insights",
      description:
        "Original reporting, analysis and opinion on tech talent, education and the digital economy in Nigeria and beyond.",
      path: "/blog",
    }),
  component: Blog,
});

function Blog() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(blogPosts.map((p) => p.category)))];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return blogPosts.filter((p) => {
      const matchesQuery =
        !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q);
      const matchesCategory = category === "All" || p.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [query, category]);

  const featured = blogPosts[0];

  return (
    <PageShell>
      <PageHero
        eyebrow="Insights"
        art="data"
        title={
          <>
            Ideas from the <span className="text-gradient">engine room</span>
          </>
        }
        description="Research, field notes and honest opinions from the people who run the academy â€” on hiring, learning, security and the Nigerian tech economy."
      >
        <div className="mt-10 flex max-w-xl flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="text-muted-foreground absolute top-1/2 left-4 size-4 -translate-y-1/2" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articlesâ€¦"
              className="bg-card h-12 border pl-11 shadow-sm"
            />
          </div>
        </div>
      </PageHero>

      <section className="container-page py-16 md:py-20">
        <Reveal>
          <Link
            to="/blog/$slug"
            params={{ slug: featured.slug }}
            className="group bg-gradient-ink text-ink-foreground shadow-elevated relative block overflow-hidden rounded-3xl p-10 md:p-14"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_70%_at_85%_0%,oklch(0.6_0.16_330/0.35),transparent)]" />
            <div className="relative">
              <div className="flex flex-wrap items-center gap-3">
                <Badge className="border-ink-foreground/25 bg-transparent font-semibold">
                  {featured.category}
                </Badge>
                <span className="text-ink-foreground/60 flex items-center gap-1.5 text-xs font-semibold">
                  <Clock className="size-3.5" /> {readingTimeLabel(featured.body)}
                </span>
                <span className="text-ink-foreground/60 text-xs font-semibold">
                  {featured.date}
                </span>
              </div>
              <h2 className="font-display mt-6 max-w-2xl text-3xl leading-tight font-extrabold text-balance sm:text-4xl">
                {featured.title}
              </h2>
              <p className="text-ink-foreground/75 mt-4 max-w-2xl leading-relaxed">
                {featured.excerpt}
              </p>
              <div className="mt-8 flex items-center gap-3">
                <span className="bg-ink-foreground/10 font-display grid size-11 place-items-center rounded-full text-sm font-bold">
                  {featured.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
                <div>
                  <p className="text-sm font-bold">{featured.author}</p>
                  <p className="text-ink-foreground/60 text-xs">{featured.role}</p>
                </div>
              </div>
              <span className="mt-8 inline-flex items-center gap-2 text-sm font-bold">
                Read the article{" "}
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </Link>
        </Reveal>

        <div className="mt-12 flex flex-wrap items-center gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                category === c
                  ? "bg-gradient-brand border-transparent text-white shadow"
                  : "bg-card text-muted-foreground hover:text-foreground",
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <StaggerGroup className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => {
            const engine = engineMap[p.engine];
            return (
              <StaggerItem key={p.slug}>
                <Link
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="group bg-card shadow-soft hover:shadow-elevated relative flex h-full flex-col overflow-hidden rounded-2xl border p-7 transition-all hover:-translate-y-1"
                >
                  <div
                    className={`${engine?.gradient ?? "bg-gradient-brand"} absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100`}
                  />
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="font-semibold">
                      {p.category}
                    </Badge>
                    <span className="text-muted-foreground flex items-center gap-1.5 text-xs font-medium">
                      <Clock className="size-3.5" /> {readingTimeLabel(p.body)}
                    </span>
                  </div>
                  <h3 className="font-display group-hover:text-primary mt-4 flex-1 text-lg leading-snug font-bold transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-muted-foreground mt-2.5 line-clamp-3 text-sm leading-relaxed">
                    {p.excerpt}
                  </p>
                  <div className="mt-5 flex items-center justify-between border-t pt-4 text-xs">
                    <span className="font-semibold">{p.author}</span>
                    <span className="text-muted-foreground">{p.date}</span>
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </section>

      <CTASection
        title="Want this in your inbox?"
        description="The monthly digest: one essay, three links and everything the academy shipped that month."
        primary={{ label: "Subscribe", to: "/contact" }}
        secondary={{ label: "Browse programs", to: "/programs" }}
      />
    </PageShell>
  );
}
