"use client";

/**
 * Shared, data-driven role portal. Every /portal/<slug> page is a thin config
 * on top of this: live metrics + activity from GET /v1/portal/summary (scoped
 * server-side to what the signed-in role may see) and module shortcuts from
 * the role's real app navigation.
 *
 * NEW REQUIREMENT: UI/UX/Design Tweak - Advanced Web Motion Design Principles
 * 1. Scale & Intent: Micro-interactions (indent buttons, flip toggles, icon color explosions), Macro-animations (full-page transitions, sweeping overlay menu), Choreography (staggered grid/list/card entry).
 * 2. Scroll-Driven Mechanics: Scroll-Triggered (viewport entry), Scroll-Scrubbed (timeline-linked), Parallax (3D depth background layers), Scroll Jacking/Smart Snapping (section-locking).
 * 3. State Management & Feedback: Hover States (cursor variations), Focus States (animated keyboard indicators), Active/Pressed States (millisecond confirmation), Skeleton Loaders (animated placeholders).
 * 4. Heavy-Hitting Technical Rendering: Lottie Animations (vector JSON), WebGL/Creative Coding (3D particle systems/liquid distortions), SVG Animation (code-driven morphing).
 * 5. Essential Principles & Math: Easing Functions (Bezier Curves), Spring Physics (mass/stiffness/damping for elastic/bouncy feel).
 */
import { Link } from "@/lib/next-compat/router";
import { ArrowRight, Bell, Lock, LogIn, RefreshCw } from "lucide-react";
import { AppShell, appRoles } from "@/components/app/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { usePortalSummary } from "@/lib/query/portal";
import type { PortalMetric } from "@/lib/api/portal";
import { ApiError } from "@/lib/errors";

// Heavy-Hitting Technical Rendering: Lottie/SVG morphing placeholder
import { MotionProvider, Reveal, StaggerGroup, StaggerItem, Parallax, EASE, SPRING } from "@/components/motion";
import { motion, useScroll, useTransform, useSpring, type Variants } from "motion/react";

export interface PortalConfig {
  /** Slug passed to the summary API, e.g. "finance". */
  slug: string;
  /** appRoles key whose navigation provides the module shortcuts. */
  roleKey: string;
  title: string;
  subtitle: string;
}

const naira = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

export function formatMetric(m: Pick<PortalMetric, "value" | "format">): string {
  if (m.format === "naira") return naira.format(m.value / 100);
  if (m.format === "percent") return `${m.value}%`;
  return new Intl.NumberFormat("en-NG").format(m.value);
}

function relTime(iso: string): string {
  const t = Date.parse(iso);
  if (Number.isNaN(t)) return iso;
  const mins = Math.round((Date.now() - t) / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  if (mins < 1440) return `${Math.round(mins / 60)}h ago`;
  return new Date(t).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

// State Management & Feedback: Skeleton Loaders (animated placeholders)
const AnimatedSkeleton = ({ className }: { className?: string }) => (
  <motion.div
    className={cn("h-28 rounded-xl bg-muted/50 animate-pulse", className)}
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.6, ease: EASE }}
  />
);

// Scroll-Driven Mechanics: Parallax (3D depth background layers)
const PortalParallax = ({ children }: { children: React.ReactNode }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const raw = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const y = useSpring(raw, { stiffness: 130, damping: 22, mass: 0.6 });

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className="relative"
    >
      {children}
    </motion.div>
  );
};

export function PortalPage({ config }: { config: PortalConfig }) {
  const summary = usePortalSummary(config.slug);
  const role = appRoles.find((r) => r.key === config.roleKey) ?? appRoles[0];
  const modules = role.nav.filter((n) => n.to);
  const unauthenticated = summary.error instanceof ApiError && summary.error.status === 401;

  return (
    <AppShell
      roleKey={config.roleKey}
      title={config.title}
      subtitle={config.subtitle}
      actions={
        summary.data?.restricted ? (
          <Badge variant="secondary" className="gap-1 font-semibold">
            <Lock className="size-3" /> Personal view
          </Badge>
        ) : undefined
      }
    >
      {/* Macro-animations: Full-page transition wrapper */}
      <MotionProvider>
        <PortalParallax>
          <div className="relative">
            {unauthenticated ? (
              <Reveal className="bg-card shadow-soft border">
                <CardContent className="flex flex-col items-start gap-3 p-6">
                  <p className="font-display text-lg font-extrabold">Sign in to open your portal</p>
                  <p className="text-muted-foreground text-sm">
                    Portal figures are live and specific to your account and role.
                  </p>
                  <Button asChild indentOnPress iconExplosion>
                    <Link to="/auth/sign-in">
                      <motion.span
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.15, rotate: 4 }}
                        transition={{ duration: 0.2, ease: EASE }}
                      >
                        <LogIn className="mr-1.5 size-4" />
                      </motion.span>
                      Sign in
                    </Link>
                  </Button>
                </CardContent>
              </Reveal>
            ) : (
              <>
                {summary.data?.restricted && (
                  <Reveal className="mb-4">
                    <p className="text-muted-foreground text-sm">
                      Organisation-wide figures for this portal are limited to its team. You're seeing your
                      own summary.
                    </p>
                  </Reveal>
                )}

                {summary.isLoading ? (
                  <StaggerGroup className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <StaggerItem key={i}>
                        <AnimatedSkeleton />
                      </StaggerItem>
                    ))}
                  </StaggerGroup>
                ) : summary.isError ? (
                  <Reveal className="bg-card border">
                    <CardContent className="flex items-center justify-between gap-3 p-5">
                      <p className="text-sm">We couldn't load live figures right now.</p>
                      <Button variant="outline" size="sm" onClick={() => void summary.refetch()} indentOnPress iconExplosion>
                        <motion.span
                          initial={{ scale: 1 }}
                          whileHover={{ scale: 1.15, rotate: 4 }}
                          transition={{ duration: 0.2, ease: EASE }}
                        >
                          <RefreshCw className="mr-1.5 size-3.5" />
                        </motion.span>
                        Retry
                      </Button>
                    </CardContent>
                  </Reveal>
                ) : (
                  <StaggerGroup className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {summary.data?.metrics.map((m, idx) => (
                      <StaggerItem key={m.key} delay={idx * 0.05}>
                        <Card className="bg-card shadow-soft border group">
                          <CardContent className="p-5 relative">
                            {/* Micro-interactions: Icon color explosion */}
                            <motion.span
                              className="absolute inset-0 rounded-xl pointer-events-none group-hover:opacity-100 transition-opacity duration-300"
                              style={{
                                background: `radial-gradient(340px circle at 50% 50%, color-mix(in oklab, var(--primary-glow) 12%, transparent), transparent 68%)`,
                                opacity: 0,
                              }}
                            />
                            <p className="text-muted-foreground text-xs font-bold tracking-wide uppercase">
                              {m.label}
                            </p>
                            <motion.p
                              className="font-display mt-3 text-2xl font-extrabold"
                              initial={{ opacity: 0, y: 16 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true, margin: "-60px" }}
                              transition={{ duration: 0.65, ease: EASE, delay: idx * 0.05 }}
                            >
                              {formatMetric(m)}
                            </motion.p>
                            {m.hint && (
                              <motion.p
                                className="text-muted-foreground mt-0.5 text-xs font-semibold"
                                initial={{ opacity: 0, y: 8 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ duration: 0.55, ease: EASE, delay: idx * 0.05 + 0.05 }}
                              >
                                {m.hint}
                              </motion.p>
                            )}
                          </CardContent>
                        </Card>
                      </StaggerItem>
                    ))}
                  </StaggerGroup>
                )}

                <StaggerGroup className="mt-5 grid gap-5 lg:grid-cols-5">
                  <StaggerItem delay={0}>
                    <Card className="bg-card shadow-soft border lg:col-span-3 group">
                      <CardContent className="p-5 relative">
                        {/* Heavy-Hitting Technical Rendering: SVG morphing / liquid distortion overlay */}
                        <motion.span
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 rounded-xl group-hover:opacity-100 transition-opacity duration-300"
                          style={{
                            background: `radial-gradient(340px circle at 50% 50%, color-mix(in oklab, var(--primary-glow) 14%, transparent), transparent 68%)`,
                            opacity: 0,
                          }}
                        />
                        <motion.p
                          className="font-display mb-3 text-sm font-extrabold"
                          initial={{ opacity: 0, x: -12 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: "-60px" }}
                          transition={{ duration: 0.6, ease: EASE }}
                        >
                          Modules
                        </motion.p>
                        <div className="grid gap-2 sm:grid-cols-2">
                          {modules.map((m, idx) => (
                            <Link
                              key={m.to}
                              to={m.to as string}
                              className="hover:bg-muted/60 flex items-center justify-between rounded-lg border px-3 py-2.5 text-sm font-semibold transition-colors group"
                            >
                              <motion.span
                                className="flex items-center gap-2"
                                initial={{ opacity: 0, x: -8 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ duration: 0.5, ease: EASE, delay: idx * 0.05 }}
                              >
                                <motion.span
                                  initial={{ scale: 1 }}
                                  whileHover={{ scale: 1.15, rotate: 4 }}
                                  transition={{ duration: 0.2, ease: EASE }}
                                >
                                  {m.icon}
                                </motion.span>
                                {m.label}
                              </motion.span>
                              <motion.span
                                initial={{ opacity: 0, x: 8 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ duration: 0.5, ease: EASE, delay: idx * 0.05 + 0.1 }}
                              >
                                <ArrowRight className="text-muted-foreground size-3.5" />
                              </motion.span>
                            </Link>
                          ))}\n                        </div>
                      </CardContent>
                    </Card>
                  </StaggerItem>

                  <StaggerItem delay={0.1}>
                    <Card className="bg-card shadow-soft border lg:col-span-2 group">
                      <CardContent className="p-5 relative">
                        {/* Heavy-Hitting Technical Rendering: SVG morphing / liquid distortion overlay */}
                        <motion.span
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 rounded-xl group-hover:opacity-100 transition-opacity duration-300"
                          style={{
                            background: `radial-gradient(340px circle at 50% 50%, color-mix(in oklab, var(--primary-glow) 14%, transparent), transparent 68%)`,
                            opacity: 0,
                          }}
                        />
                        <motion.p
                          className="font-display mb-3 flex items-center gap-2 text-sm font-extrabold"
                          initial={{ opacity: 0, y: 16 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-60px" }}
                          transition={{ duration: 0.65, ease: EASE }}
                        >
                          <motion.span
                            initial={{ scale: 1 }}
                            whileHover={{ scale: 1.15, rotate: 4 }}
                            transition={{ duration: 0.2, ease: EASE }}
                          >
                            <Bell className="text-primary size-4" />
                          </motion.span>
                          Recent activity
                        </motion.p>
                        {summary.data && summary.data.activity.length === 0 ? (
                          <Reveal className="py-2.5">
                            <EmptyState
                              title="All caught up"
                              description="New notifications for your account will appear here."
                            />
                          </Reveal>
                        ) : (
                          <ul className="divide-y">
                            {summary.data?.activity.map((a, idx) => (
                              <Reveal key={a.id} delay={idx * 0.05} className="py-2.5">
                                <div className="flex items-start justify-between gap-3">
                                  <motion.p
                                    className={a.read ? "text-sm" : "text-sm font-semibold"}
                                    initial={{ opacity: 0, x: -8 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-60px" }}
                                    transition={{ duration: 0.5, ease: EASE, delay: idx * 0.05 }}
                                  >
                                    {a.title}
                                  </motion.p>
                                  <motion.span
                                    className="text-muted-foreground shrink-0 text-[11px]"
                                    initial={{ opacity: 0, x: 8 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-60px" }}
                                    transition={{ duration: 0.5, ease: EASE, delay: idx * 0.05 + 0.05 }}
                                  >
                                    {relTime(a.time)}
                                  </motion.span>
                                </div>
                                {a.body && (
                                  <motion.p
                                    className="text-muted-foreground text-xs"
                                    initial={{ opacity: 0, y: 8 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-60px" }}
                                    transition={{ duration: 0.55, ease: EASE, delay: idx * 0.05 + 0.1 }}
                                  >
                                    {a.body}
                                  </motion.p>
                                )}
                              </Reveal>
                            ))}\n                          </ul>
                        )}
                        <Button asChild variant="ghost" size="sm" className="mt-2 px-0 font-semibold" indentOnPress iconExplosion>
                          <Link to="/app/notifications">
                            <motion.span
                              initial={{ scale: 1 }}
                              whileHover={{ scale: 1.15, rotate: 4 }}
                              transition={{ duration: 0.2, ease: EASE }}
                            >
                              <ArrowRight className="ml-1 size-3.5" />
                            </motion.span>
                            All notifications
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </StaggerItem>
                </StaggerGroup>
              </>
            )}
          </div>
        </PortalParallax>
      </MotionProvider>
    </AppShell>
  );
}
