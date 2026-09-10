import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { getPageHead } from "@/lib/seo";
import { ArrowUpRight, Clock, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { CTASection, PageHero, PageShell, SectionHeading } from "@/components/marketing/shell";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion";
import { Portrait } from "@/components/media/site-image";
import { blogPosts } from "@/data/site";
import { readingTimeLabel } from "@/lib/blog-reading-time";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/blog/")({
  head: () =>
    getPageHead({
      title: "Blog — notes from the classroom",
      description:
        "Practical articles from the instructors at Cyber Elias Academy: starting a tech career in Nigeria, portfolios, CVs, freelancing, Python and more.",
      path: "/blog",
    }),
  component: Blog,
});

function formatDate(iso: string) {
  const d = new Date(`${iso}T00:00:00`);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" });
}

function Blog() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const visible = useMemo(
    () => blogPosts.filter((p) => p.slug !== "why-we-are-building-cea-os"),
    [],
  );
  const categories = ["All", ...Array.from(new Set(visible.map((p) => p.category)))];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return visible.filter((p) => {
      const matchesQuery =
        !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q);
      const matchesCategory = category === "All" || p.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [query, category, visible]);

  const featured = visible[0];

  return (
    <PageShell>
      <PageHero
        eyebrow="Blog"
        title={
          <>
            Notes from the <span className="text-gradient">classroom</span>
          </>
        }
        description="Written by the people who teach here — about starting a tech career in Nigeria, building portfolios, freelancing, and learning properly. No copied content, no fluff."
      >
        <div className="mt-10 flex max-w-xl flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="text-muted-foreground absolute top-1/2 left-4 size-4 -translate-y-1/2" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles…"
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
            className="group bg-card shadow-soft hover:shadow-elevated grid overflow-hidden rounded-3xl border transition-all md:grid-cols-2"
          >
            {featured.heroImage && (
              <div className="aspect-[16/10] overflow-hidden md:aspect-auto md:min-h-[320px]">
                <img
                  src={featured.heroImage}
                  alt=""
                  loading="eager"
                  decoding="async"
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            )}
            <div className="flex flex-col justify-center p-8 md:p-12">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="secondary" className="font-semibold">
                  {featured.category}
                </Badge>
                <span className="text-muted-foreground flex items-center gap-1.5 text-xs font-semibold">
                  <Clock className="size-3.5" /> {readingTimeLabel(featured.body)}
                </span>
                <span className="text-muted-foreground text-xs font-semibold">
                  {formatDate(featured.updated ?? featured.date)}
                </span>
              </div>
              <h2 className="font-display mt-5 text-2xl leading-tight font-extrabold text-balance sm:text-3xl">
                {featured.title}
              </h2>
              <p className="text-muted-foreground mt-4 leading-relaxed">{featured.excerpt}</p>
              <div className="mt-7 flex items-center gap-3">
                <Portrait
                  src={featured.authorPhoto}
                  name={featured.author}
                  className="size-11 text-xs"
                />
                <div>
                  <p className="text-sm font-bold">{featured.author}</p>
                  <p className="text-muted-foreground text-xs">{featured.role}</p>
                </div>
              </div>
              <span className="text-primary mt-6 inline-flex items-center gap-2 text-sm font-bold">
                Read the article{" "}
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </Link>
        </Reveal>

        <div className="mt-12">
          <SectionHeading
            eyebrow="All articles"
            title={`${filtered.length} article${filtered.length === 1 ? "" : "s"}`}
          />
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-2">
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
          {filtered.map((p) => (
            <StaggerItem key={p.slug}>
              <Link
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="group bg-card shadow-soft hover:shadow-elevated relative flex h-full flex-col overflow-hidden rounded-2xl border transition-all hover:-translate-y-1"
              >
                {p.heroImage && (
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={p.heroImage}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
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
                  <div className="mt-5 flex items-center gap-2.5 border-t pt-4">
                    <Portrait src={p.authorPhoto} name={p.author} className="size-8 text-[10px]" />
                    <div className="text-xs">
                      <p className="font-semibold">{p.author}</p>
                      <p className="text-muted-foreground">{formatDate(p.updated ?? p.date)}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      <CTASection
        title="Reading is good. Building with a teacher is faster."
        description="Come and sit in on a class in Port Harcourt — or message us and tell us where you're starting from."
        primary={{ label: "Plan a visit", to: "/visit" }}
        secondary={{ label: "Browse programs", to: "/programs" }}
      />
    </PageShell>
  );
}
