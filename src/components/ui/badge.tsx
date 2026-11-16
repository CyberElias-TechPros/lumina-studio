import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold tracking-tight transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-primary-glow/35 bg-primary/12 text-primary shadow-[0_0_18px_-6px_color-mix(in_oklab,var(--primary-glow)_55%,transparent)]",
        secondary:
          "border-foreground/12 bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-destructive/40 bg-destructive/15 text-destructive shadow-[0_0_18px_-8px_color-mix(in_oklab,var(--destructive)_60%,transparent)]",
        outline: "border-foreground/15 bg-foreground/[0.03] text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
