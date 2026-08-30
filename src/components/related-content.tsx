import { Link } from "@tanstack/react-router";
import { ArrowUpRight, BookOpen, FileText, GraduationCap, Layers } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/motion";
import { programs, blogPosts } from "@/data/site";
import { getGlossaryTerms, type GlossaryTerm } from "@/data/glossary";

interface RelatedItem {
  label: string;
  href: string;
  type: "program" | "blog" | "glossary" | "module";
  description?: string;
}

interface Props {
  currentSlug?: string;
  currentType?: "program" | "blog";
  className?: string;
  maxItems?: number;
}

function getRelatedItems(
  currentSlug?: string,
  currentType?: "program" | "blog",
  maxItems = 6,
): RelatedItem[] {
  const items: RelatedItem[] = [];

  if (currentType === "program" && currentSlug) {
    const program = programs.find((p) => p.slug === currentSlug);
    if (program) {
      const sameCategory = programs
        .filter((p) => p.slug !== currentSlug && p.category === program.category)
        .slice(0, 2)
        .map((p) => ({
          label: p.title,
          href: `/programs/${p.slug}`,
          type: "program" as const,
          description: p.blurb,
        }));

      const relatedBlogs = blogPosts
        .filter((b) =>
          b.body.some(
            (para) =>
              para.toLowerCase().includes(program.title.toLowerCase()) ||
              para.toLowerCase().includes(program.category.toLowerCase()),
          ),
        )
        .slice(0, 2)
        .map((b) => ({
          label: b.title,
          href: `/blog/${b.slug}`,
          type: "blog" as const,
          description: b.excerpt,
        }));

      const relatedGlossary = getGlossaryTerms()
        .filter((t) => t.relatedPrograms?.includes(currentSlug))
        .slice(0, 2)
        .map((t) => ({
          label: t.term,
          href: `/glossary/${t.slug}`,
          type: "glossary" as const,
          description: t.definition.slice(0, 100),
        }));

      items.push(...sameCategory, ...relatedBlogs, ...relatedGlossary);
    }
  }

  if (currentType === "blog" && currentSlug) {
    const post = blogPosts.find((p) => p.slug === currentSlug);
    if (post) {
      const relatedBlogs = blogPosts
        .filter((b) => b.slug !== currentSlug && b.category === post.category)
        .slice(0, 2)
        .map((b) => ({
          label: b.title,
          href: `/blog/${b.slug}`,
          type: "blog" as const,
          description: b.excerpt,
        }));

      const relatedPrograms = programs
        .filter((p) =>
          post.body.some(
            (para) =>
              para.toLowerCase().includes(p.title.toLowerCase()) ||
              para.toLowerCase().includes(p.category.toLowerCase()),
          ),
        )
        .slice(0, 2)
        .map((p) => ({
          label: p.title,
          href: `/programs/${p.slug}`,
          type: "program" as const,
          description: p.blurb.slice(0, 100),
        }));

      items.push(...relatedBlogs, ...relatedPrograms);
    }
  }

  const seen = new Set<string>();
  return items
    .filter((item) => {
      if (seen.has(item.href)) return false;
      seen.add(item.href);
      return true;
    })
    .slice(0, maxItems);
}

const typeIcons = {
  program: GraduationCap,
  blog: FileText,
  glossary: BookOpen,
  module: Layers,
};

const typeLabels = {
  program: "Programme",
  blog: "Article",
  glossary: "Glossary",
  module: "Module",
};

export function RelatedContent({ currentSlug, currentType, className, maxItems = 6 }: Props) {
  const items = getRelatedItems(currentSlug, currentType, maxItems);
  if (items.length === 0) return null;

  return (
    <Reveal>
      <div className={className}>
        <h3 className="font-display text-lg font-extrabold mb-4">Related content</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {items.map((item) => {
            const Icon = typeIcons[item.type];
            return (
              <Link
                key={item.href}
                to={item.href}
                className="group bg-card shadow-soft hover:shadow-elevated flex items-start gap-3 rounded-xl border p-4 transition-shadow"
              >
                <span className="bg-primary/10 text-primary grid size-8 shrink-0 place-items-center rounded-lg">
                  <Icon className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <Badge variant="outline" className="text-[10px] mb-1">
                    {typeLabels[item.type]}
                  </Badge>
                  <p className="group-hover:text-primary text-sm font-extrabold transition-colors line-clamp-1">
                    {item.label}
                  </p>
                  {item.description && (
                    <p className="text-muted-foreground mt-0.5 text-xs line-clamp-2">
                      {item.description}
                    </p>
                  )}
                </div>
                <ArrowUpRight className="text-muted-foreground group-hover:text-primary mt-1 size-3.5 shrink-0 transition-colors" />
              </Link>
            );
          })}
        </div>
      </div>
    </Reveal>
  );
}
