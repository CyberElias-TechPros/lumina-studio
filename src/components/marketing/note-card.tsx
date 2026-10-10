import { ArrowRight, Clock } from "lucide-react";
import { Link } from "@/lib/next-compat/router";
import type { BlogPost } from "@/data/blog";
import { chapterForOrder } from "@/data/note-chapters";
import { readingTimeLabel } from "@/lib/blog-reading-time";
import { cn } from "@/lib/utils";

/** Card for a single lesson: cover, chapter, title, summary and reading time. */
export function NoteCard({ post, className }: { post: BlogPost; className?: string }) {
  const chapter = chapterForOrder(post.order);
  return (
    <Link
      to="/blog/$slug"
      params={{ slug: post.slug }}
      className={cn(
        "group border-border bg-card hover:border-primary/40 flex h-full flex-col overflow-hidden rounded-xl border shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg",
        className,
      )}
    >
      <div className="bg-muted relative aspect-[16/10] overflow-hidden">
        <img
          src={post.cover}
          alt=""
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <span className="bg-background/90 text-foreground absolute top-3 left-3 rounded-md px-2.5 py-1 text-xs font-semibold shadow-sm backdrop-blur">
          Lesson {post.order}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        {chapter && (
          <p className="text-primary text-[11px] font-semibold tracking-[0.12em] uppercase">
            {chapter.title}
          </p>
        )}
        <h3 className="font-display group-hover:text-primary mt-2 text-lg leading-snug font-semibold tracking-tight text-balance transition-colors">
          {post.title}
        </h3>
        <p className="text-muted-foreground mt-2 line-clamp-3 flex-1 text-sm leading-relaxed">
          {post.excerpt}
        </p>
        <div className="border-border text-muted-foreground mt-5 flex items-center justify-between border-t pt-4 text-xs">
          <span className="flex items-center gap-1.5">
            <Clock className="size-3.5" /> {readingTimeLabel(post.body)} read
          </span>
          <span className="text-primary inline-flex items-center gap-1 font-semibold">
            Read lesson{" "}
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
