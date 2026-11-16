import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-xl border border-foreground/12 bg-foreground/[0.03] px-4 py-2 text-base text-foreground shadow-[0_1px_0_0_color-mix(in_oklab,white_5%,transparent)_inset] transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-primary-glow/45 focus-visible:ring-2 focus-visible:ring-[color-mix(in_oklab,var(--primary-glow)_55%,transparent)] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
