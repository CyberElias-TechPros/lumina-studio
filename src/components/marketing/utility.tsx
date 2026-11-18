import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * UtilitySectionHeading — the editorial marker for long-form legal and policy
 * pages. A mono index + hairline rule above the display-face title, so policy
 * documents read like the rest of the LUMINA system instead of a Word dump.
 */
export function UtilitySectionHeading({
  index,
  children,
  id,
  className,
}: {
  /** Zero-padded section number, e.g. "03". */
  index: string;
  children: ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <div id={id} className={cn("scroll-mt-24 border-b border-foreground/10 pb-4", className)}>
      <span
        aria-hidden="true"
        className="font-mono text-[9px] font-semibold tracking-[0.32em] text-primary-glow uppercase"
      >
        {index}
      </span>
      <h2 className="font-display mt-2 text-2xl font-semibold tracking-[-0.025em] text-balance">
        {children}
      </h2>
    </div>
  );
}
