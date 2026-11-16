import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl text-sm font-semibold tracking-tight whitespace-nowrap transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_oklab,var(--primary-glow)_70%,transparent)] focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] motion-reduce:active:scale-100 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "border border-white/10 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--primary),white_12%)_0%,var(--primary)_55%,color-mix(in_oklab,var(--primary),black_10%)_100%)] text-primary-foreground shadow-[0_1px_0_0_rgb(255_255_255/0.22)_inset,0_14px_36px_-14px_color-mix(in_oklab,var(--primary-glow)_65%,transparent)] hover:-translate-y-0.5 hover:shadow-[0_1px_0_0_rgb(255_255_255/0.28)_inset,0_20px_48px_-16px_color-mix(in_oklab,var(--primary-glow)_78%,transparent)]",
        destructive:
          "bg-[linear-gradient(180deg,color-mix(in_oklab,var(--destructive),white_8%),var(--destructive))] text-destructive-foreground shadow-[0_1px_0_0_rgb(255_255_255/0.2)_inset,0_12px_32px_-14px_color-mix(in_oklab,var(--destructive)_60%,transparent)] hover:-translate-y-0.5",
        outline:
          "border border-foreground/15 bg-foreground/[0.04] text-foreground backdrop-blur-sm shadow-[0_1px_0_0_rgb(255_255_255/0.06)_inset] hover:-translate-y-0.5 hover:border-foreground/25 hover:bg-foreground/[0.08]",
        secondary:
          "bg-secondary text-secondary-foreground shadow-[0_1px_0_0_rgb(255_255_255/0.08)_inset] hover:bg-secondary/80 hover:-translate-y-0.5",
        ghost: "hover:bg-foreground/6 hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 rounded-lg px-3.5 text-xs",
        lg: "h-12 rounded-xl px-7 text-[15px]",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
