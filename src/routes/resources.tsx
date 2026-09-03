import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, CheckSquare, FileText, Lightbulb, Wrench } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { PageShell, PageHero, SectionHeading } from "@/components/marketing/shell";
import { Reveal } from "@/components/motion";
import { getPageHead } from "@/lib/seo";
import { getResources, type Resource } from "@/data/resources";

export const Route = createFileRoute("/resources")({
  head: () =>
    getPageHead({
      title: "Free tech resources — templates, checklists, cheat sheets and guides",
      description:
        "Ungated, practical resources for Nigerian tech professionals: resume templates, interview prep, contract templates, CI/CD checklists and more. No sign-up required.",
      path: "/resources",
      image: "https://cea.ng/og-default.png",
    }),
  component: ResourcesPage,
});

const categoryMeta = {
  templates: { label: "Templates", icon: FileText, tone: "bg-primary/10 text-primary" },
  checklists: { label: "Checklists", icon: CheckSquare, tone: "bg-learning/10 text-learning" },
  guides: { label: "Guides", icon: Lightbulb, tone: "bg-community/10 text-community" },
  "cheat-sheets": { label: "Cheat sheets", icon: BookOpen, tone: "bg-career/10 text-career" },
};

function ResourcesPage() {
  const all = getResources();
  const byCategory = Object.entries(categoryMeta).map(([key, meta]) => ({
    key,
    ...meta,
    items: all.filter((r) => r.category === key),
  }));

  return (
    <PageShell>
      <PageHero
        eyebrow="Resources"
        title={
          <>
            Free <span className="text-gradient">Tech Resources</span>
          </>
        }
        description={`${all.length} practical, ungated resources — templates, checklists, guides and cheat sheets built for Nigerian tech professionals. No sign-up walls. Just download and use.`}
      />

      <section className="container-page pb-20">
        <div className="space-y-16">
          {byCategory.map(({ key, label, icon: Icon, tone, items }) =>
            items.length > 0 ? (
              <Reveal key={key}>
                <div className="space-y-6">
                  <SectionHeading
                    eyebrow="Browse"
                    title={label}
                    description={`${items.length} ${label.toLowerCase()} ready to use`}
                  />
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((r) => (
                      <ResourceCard key={r.slug} resource={r} />
                    ))}
                  </div>
                </div>
              </Reveal>
            ) : null,
          )}
        </div>
      </section>
    </PageShell>
  );
}

function ResourceCard({ resource }: { resource: Resource }) {
  const meta = categoryMeta[resource.category];
  return (
    <Link
      to="/resources/$slug"
      params={{ slug: resource.slug }}
      className="group bg-card shadow-soft hover:shadow-elevated flex flex-col gap-3 rounded-xl border p-5 transition-shadow"
    >
      <div className="flex items-start justify-between gap-3">
        <span className={`grid size-8 shrink-0 place-items-center rounded-lg ${meta.tone}`}>
          <meta.icon className="size-4" />
        </span>
        <ArrowRight className="text-muted-foreground group-hover:text-primary mt-1 size-4 shrink-0 transition-colors" />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="font-display group-hover:text-primary text-sm font-extrabold transition-colors">
          {resource.title}
        </h3>
        <p className="text-muted-foreground mt-1 text-xs leading-relaxed line-clamp-2">
          {resource.tagline}
        </p>
      </div>
      <div className="flex flex-wrap gap-1.5">
        <Badge variant="secondary" className="text-[10px]">
          {resource.difficulty}
        </Badge>
        <Badge variant="outline" className="text-[10px]">
          {resource.timeToComplete}
        </Badge>
        <Badge variant="outline" className="text-[10px]">
          {resource.whatYouGet.length} items
        </Badge>
      </div>
    </Link>
  );
}
