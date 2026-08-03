import type { ReactNode } from "react";
import { Inbox } from "lucide-react";
import { SceneArt, type ArtVariant } from "@/components/art/scene-art";
import { cn } from "@/lib/utils";

export interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  /** When set, renders a decorative scene above the message. */
  art?: ArtVariant;
  className?: string;
}

/** Standard empty state for query-driven screens (replaces hardcoded gaps). */
export function EmptyState({ title, description, icon, action, art, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed bg-muted/30 px-6 py-12 text-center",
        className,
      )}
    >
      {art && (
        <div className="mb-3 h-28 w-full max-w-xs overflow-hidden rounded-xl border">
          <SceneArt variant={art} labelled={false} />
        </div>
      )}
      <div className="flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
        {icon ?? <Inbox className="size-5" />}
      </div>
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      {description ? <p className="max-w-sm text-sm text-muted-foreground">{description}</p> : null}
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  );
}
