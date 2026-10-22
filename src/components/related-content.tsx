import { FileText, GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion";
import { blogPosts } from "@/data/blog";
import { flyerCourses } from "@/data/academy";

interface RelatedItem {
  label: string;
  href: string;
  type: "course" | "blog";
  description?: string;
}

interface Props {
  currentSlug?: string;
  currentType?: "program" | "blog" | "course";
  className?: string;
  maxItems?: number;
}

function getRelatedItems(
  currentSlug?: string,
  currentType?: "program" | "blog" | "course",
  maxItems = 6,
): RelatedItem[] {
  const items: RelatedItem[] = [];

  if (currentType === "blog" && currentSlug) {
    const post = blogPosts.find((b) => b.slug === currentSlug);
    if (post) {
      const later = blogPosts.filter((b) => b.order > post.order).sort((a, b) => a.order - b.order);
      const earlier = blogPosts
        .filter((b) => b.order < post.order)
        .sort((a, b) => b.order - a.order);
      items.push(
        ...[...later, ...earlier].slice(0, 3).map((b) => ({
          label: b.title,
          href: `/blog/${b.slug}`,
          type: "blog" as const,
          description: b.excerpt,
        })),
      );

      const hay = `${post.title} ${post.excerpt} ${post.series}`.toLowerCase();
      items.push(
        ...flyerCourses
          .filter(
            (c) => hay.includes(c.title.toLowerCase()) || hay.includes(c.category.toLowerCase()),
          )
          .slice(0, 2)
          .map((c) => ({
            label: c.title,
            href: `/classes/${c.slug}`,
            type: "course" as const,
            description: c.deliverable.title,
          })),
      );
    }
  }

  if ((currentType === "course" || currentType === "program") && currentSlug) {
    const course = flyerCourses.find((c) => c.slug === currentSlug);
    if (course) {
      items.push(
        ...flyerCourses
          .filter((c) => c.slug !== currentSlug && c.category === course.category)
          .slice(0, 2)
          .map((c) => ({
            label: c.title,
            href: `/classes/${c.slug}`,
            type: "course" as const,
            description: c.deliverable.title,
          })),
      );
      const hay = `${course.title} ${course.category}`.toLowerCase();
      items.push(
        ...blogPosts
          .filter((b) => {
            const blob = `${b.title} ${b.excerpt} ${b.series}`.toLowerCase();
            return hay.split(" ").some((w) => w.length > 4 && blob.includes(w));
          })
          .slice(0, 2)
          .map((b) => ({
            label: b.title,
            href: `/blog/${b.slug}`,
            type: "blog" as const,
            description: b.excerpt,
          })),
      );
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
  course: GraduationCap,
  blog: FileText,
};

const typeLabels = {
  course: "Course",
  blog: "Note",
};

export function RelatedContent({ currentSlug, currentType, className, maxItems = 6 }: Props) {
  const items = getRelatedItems(currentSlug, currentType, maxItems);
  if (items.length === 0) return null;

  return (
    <Reveal>
      <div className={className}>
        <h3 className="font-display mb-4 text-lg font-semibold">Related</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {items.map((item) => {
            const Icon = typeIcons[item.type];
            return (
              <a
                key={item.href}
                href={item.href}
                className="group bg-card border-border hover:border-primary/40 flex items-start gap-3 rounded-lg border p-4"
              >
                <span className="bg-primary/10 text-primary grid size-8 shrink-0 place-items-center rounded-md">
                  <Icon className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <Badge variant="outline" className="mb-1 text-[10px]">
                    {typeLabels[item.type]}
                  </Badge>
                  <p className="group-hover:text-primary text-sm font-semibold">{item.label}</p>
                  {item.description && (
                    <p className="text-muted-foreground mt-0.5 line-clamp-2 text-xs">
                      {item.description}
                    </p>
                  )}
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </Reveal>
  );
}
