"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, useInView, useSpring, useMotionValue, type Variants } from "motion/react";
import { SPRING, EASE } from "@/components/motion";

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    // Scroll-Triggered mechanics: Reveal on viewport entry
    const inView = useInView(ref, { once: true, margin: "-80px" });
    
    // Macro-animations: Full-page transition style reveal
    const cardVariants: Variants = {
      hidden: { opacity: 0, y: 32, filter: "blur(8px)", scale: 0.98 },
      visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        scale: 1,
        transition: { duration: 0.75, ease: EASE },
      },
    };

    // Spring physics for hover states (State Management & Feedback)
    const mx = useMotionValue(0.5);
    const my = useMotionValue(0.5);
    const rx = useSpring(useMotionValue(0), SPRING.tilt);
    const ry = useSpring(useMotionValue(0), SPRING.tilt);

    return (
      <motion.div
        ref={ref}
        className={cn("rounded-xl border bg-card text-card-foreground shadow relative overflow-hidden group", className)}
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        // Hover States: Cursor variations & tilt
        onMouseMove={(e) => {
          const rect = ref.current?.getBoundingClientRect();
          if (!rect) return;
          mx.set((e.clientX - rect.left) / rect.width);
          my.set((e.clientY - rect.top) / rect.height);
          rx.set(((e.clientX - rect.left) / rect.width - 0.5) * 6);
          ry.set(((e.clientY - rect.top) / rect.height - 0.5) * -6);
        }}
        onMouseLeave={() => {
          rx.set(0);
          ry.set(0);
        }}
        style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
        {...props}
      >
        {/* Macro-animations: Glare overlay for active/pressed state */}
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-xl group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(340px circle at ${mx.get() * 100}% ${my.get() * 100}%, color-mix(in oklab, var(--primary-glow) 12%, transparent), transparent 68%)`,
            opacity: 0,
          }}
        />
        {/* Content wrapper */}
        <div className="relative z-10">
          {props.children}
        </div>
      </motion.div>
    );
  },
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  ),
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <motion.div
      ref={ref}
      className={cn("font-semibold leading-none tracking-tight", className)}
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: EASE }}
      {...props}
    />
  ),
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <motion.div
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: EASE, delay: 0.05 }}
      {...props}
    />
  ),
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    // Choreography: Staggered entry for content
    const inView = useInView(ref, { once: true, margin: "-60px" });
    const contentVariants: Variants = {
      hidden: { opacity: 0, y: 16 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.65, ease: EASE, delay: 0.1 },
      },
    };

    return (
      <motion.div
        ref={ref}
        className={cn("p-6 pt-0", className)}
        variants={contentVariants}
        initial="hidden"
        whileInView="visible"
        {...props}
      />
    );
  },
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    // Scroll-Driven Mechanics: Parallax depth background layer for footer
    const inView = useInView(ref, { once: true, margin: "-60px" });
    const footerVariants: Variants = {
      hidden: { opacity: 0, y: 16 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.65, ease: EASE, delay: 0.15 },
      },
    };

    return (
      <motion.div
        ref={ref}
        className={cn("flex items-center p-6 pt-0", className)}
        variants={footerVariants}
        initial="hidden"
        whileInView="visible"
        {...props}
      />
    );
  },
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
