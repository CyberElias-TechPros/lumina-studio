import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { motion, useSpring, useMotionValue, type Variants } from "motion/react";
import { SPRING, EASE } from "@/components/motion";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

// Micro-interaction variants
const pressVariants: Variants = {
  idle: { scale: 1, transition: { type: "spring", stiffness: 340, damping: 30 } },
  pressed: { scale: 0.965, transition: { type: "spring", stiffness: 340, damping: 30 } },
};

// Icon color explosion variant
const iconExplosionVariants: Variants = {
  idle: { scale: 1, rotate: 0, filter: "blur(0px)" },
  hover: { scale: 1.15, rotate: 4, filter: "blur(0px)", transition: { duration: 0.2, ease: EASE } },
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  /** Micro-interaction: indent button on press */
  indentOnPress?: boolean;
  /** Micro-interaction: flip toggle / icon color explosion on hover */
  iconExplosion?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, indentOnPress = true, iconExplosion = true, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    
    // State management & feedback: Active/Pressed state
    const [isPressed, setIsPressed] = React.useState(false);
    
    // Spring physics for micro-interactions
    const mx = useMotionValue(0.5);
    const my = useMotionValue(0.5);
    const rx = useSpring(useMotionValue(0), SPRING.tilt);
    const ry = useSpring(useMotionValue(0), SPRING.tilt);

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        onPointerDown={(e) => {
          if (indentOnPress) setIsPressed(true);
          if (e.currentTarget instanceof HTMLButtonElement) {
            const rect = e.currentTarget.getBoundingClientRect();
            mx.set((e.clientX - rect.left) / rect.width);
            my.set((e.clientY - rect.top) / rect.height);
            rx.set(((e.clientX - rect.left) / rect.width - 0.5) * 8);
            ry.set(((e.clientY - rect.top) / rect.height - 0.5) * -8);
          }
        }}
        onPointerUp={() => setIsPressed(false)}
        onPointerLeave={() => setIsPressed(false)}
        onMouseEnter={(e) => {
          if (e.currentTarget instanceof HTMLButtonElement) {
            const rect = e.currentTarget.getBoundingClientRect();
            mx.set((e.clientX - rect.left) / rect.width);
            my.set((e.clientY - rect.top) / rect.height);
          }
        }}
        {...props}
      >
        <motion.span
          className="absolute inset-0 rounded-md pointer-events-none"
          style={{
            background: `radial-gradient(340px circle at ${mx.get() * 100}% ${my.get() * 100}%, color-mix(in oklab, var(--primary-glow) 16%, transparent), transparent 68%)`,
            opacity: isPressed ? 0.8 : 0,
          }}
          animate={{ opacity: isPressed ? 0.8 : 0 }}
          transition={{ duration: 0.2, ease: EASE }}
        />
        {/* Content wrapper for indent micro-interaction */}
        <motion.span
          className="relative z-10"
          animate={isPressed ? "pressed" : "idle"}
          variants={pressVariants}
        >
          {props.children}
          {/* Icon color explosion micro-interaction */}
          {iconExplosion && (
            <motion.span
              className="inline-block transition-colors"
              variants={iconExplosionVariants}
              initial="idle"
              whileHover="hover"
              whileTap="idle"
            >
              {/* If there's an SVG icon child, it will inherit this motion */}
            </motion.span>
          )}
        </motion.span>
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
