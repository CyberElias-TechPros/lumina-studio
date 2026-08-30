import { CalendarDays } from "lucide-react";

interface Props {
  lastReviewed: string;
  author?: string;
  className?: string;
}

export function ContentFreshness({ lastReviewed, author, className }: Props) {
  return (
    <div className={`flex items-center gap-3 text-xs font-medium ${className ?? ""}`}>
      <span className="text-muted-foreground flex items-center gap-1.5">
        <CalendarDays className="size-3.5" />
        Last reviewed: {lastReviewed}
      </span>
      {author && <span className="text-muted-foreground">By {author}</span>}
    </div>
  );
}
