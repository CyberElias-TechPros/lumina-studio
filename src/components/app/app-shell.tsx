import { useEffect, useState, type ReactNode } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Bell,
  BookOpen,
  Brain,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  ChevronDown,
  Component,
  Database,
  Eye,
  FileDown,
  FileText,
  FlaskConical,
  Gift,
  Globe,
  GraduationCap,
  HeartHandshake,
  History,
  Languages,
  Layers,
  LayoutDashboard,
  LineChart,
  LogOut,
  Menu,
  MessageSquare,
  MessagesSquare,
  MousePointerClick,
  Palette,
  PenTool,
  Pipette,
  Rocket,
  Search,
  Settings,
  Share2,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Sword,
  Target,
  Timer,
  TrendingUp,
  Users,
  Workflow,
  X,
  Zap,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { CommandPalette } from "@/components/app/command-palette";
import { useCommandPalette } from "@/components/app/use-command-palette";
import { ThemeToggle } from "@/components/app/theme-toggle";
import { useSignOut, useSession } from "@/lib/auth/session";
import { useSessionUser } from "@/components/app/session-provider";
import { isMockMode } from "@/lib/env";
import { track } from "@/lib/analytics";

export type AppRole = {
  key: string;
  label: string;
  emoji: string;
  gradient: string;
  nav: { label: string; icon: ReactNode; to?: string }[];
};

export const appRoles: AppRole[] = [
  {
    key: "student",
    label: "Student",
    emoji: "🎓",
    gradient: "bg-gradient-learning",
    nav: [
      { label: "Dashboard", icon: <LayoutDashboard className="size-4" />, to: "/app" },
      { label: "Learning Hub", icon: <BookOpen className="size-4" />, to: "/app/learn" },
      { label: "Assignments", icon: <FileText className="size-4" />, to: "/app/assignments" },
      { label: "Assessments", icon: <ShieldCheck className="size-4" />, to: "/app/assessments" },
      { label: "Grades", icon: <GraduationCap className="size-4" />, to: "/app/grades" },
      { label: "Portfolio", icon: <BriefcaseBusiness className="size-4" />, to: "/app/portfolio" },
      { label: "Calendar", icon: <CalendarDays className="size-4" />, to: "/app/calendar" },
      { label: "Messages", icon: <MessageSquare className="size-4" />, to: "/app/messages" },
      { label: "Chat", icon: <MessagesSquare className="size-4" />, to: "/app/chat" },
      { label: "AI Assistant", icon: <Sparkles className="size-4" />, to: "/app/ai" },
      { label: "Finance", icon: <Building2 className="size-4" />, to: "/app/finance" },
      { label: "Attendance", icon: <Users className="size-4" />, to: "/app/attendance" },
      {
        label: "Certificates",
        icon: <HeartHandshake className="size-4" />,
        to: "/app/certificates",
      },
    ],
  },
  {
    key: "instructor",
    label: "Instructor",
    emoji: "🧑‍🏫",
    gradient: "bg-gradient-erp",
    nav: [
      { label: "Dashboard", icon: <LayoutDashboard className="size-4" />, to: "/app/instructor" },
      {
        label: "Course Builder",
        icon: <BookOpen className="size-4" />,
        to: "/app/instructor/courses",
      },
      {
        label: "Assignments",
        icon: <FileText className="size-4" />,
        to: "/app/instructor/assignments",
      },
      {
        label: "Assessment Engine",
        icon: <ShieldCheck className="size-4" />,
        to: "/app/assessments",
      },
      { label: "Gradebook", icon: <GraduationCap className="size-4" />, to: "/app/grades" },
      { label: "Attendance", icon: <Users className="size-4" />, to: "/app/attendance" },
      { label: "Analytics", icon: <Building2 className="size-4" />, to: "/app/reports" },
      { label: "Calendar", icon: <CalendarDays className="size-4" />, to: "/app/calendar" },
      { label: "Messages", icon: <MessageSquare className="size-4" />, to: "/app/messages" },
      { label: "Chat", icon: <MessagesSquare className="size-4" />, to: "/app/chat" },
    ],
  },
  {
    key: "employer",
    label: "Employer",
    emoji: "💼",
    gradient: "bg-gradient-career",
    nav: [
      { label: "Employer Hub", icon: <LayoutDashboard className="size-4" /> },
      { label: "Job Management", icon: <BriefcaseBusiness className="size-4" /> },
      { label: "Talent Search", icon: <Users className="size-4" /> },
      { label: "Candidate Pipeline", icon: <FileText className="size-4" /> },
      { label: "Interviews", icon: <CalendarDays className="size-4" /> },
      { label: "Analytics", icon: <Building2 className="size-4" /> },
      { label: "Messages", icon: <MessageSquare className="size-4" /> },
    ],
  },
  {
    key: "admin",
    label: "System Admin",
    emoji: "🛡️",
    gradient: "bg-gradient-services",
    nav: [
      { label: "Admin Hub", icon: <LayoutDashboard className="size-4" />, to: "/app/admin" },
      { label: "User Management", icon: <Users className="size-4" /> },
      { label: "Roles & Permissions", icon: <ShieldCheck className="size-4" /> },
      { label: "Security", icon: <ShieldCheck className="size-4" /> },
      { label: "Audit Log", icon: <FileText className="size-4" /> },
      { label: "System Config", icon: <Settings className="size-4" /> },
      { label: "Monitoring", icon: <Building2 className="size-4" /> },
      { label: "Backups", icon: <HeartHandshake className="size-4" /> },
      { label: "Logs", icon: <MessageSquare className="size-4" /> },
    ],
  },
  {
    key: "product-marketing",
    label: "Product Marketing",
    emoji: "📣",
    gradient: "bg-gradient-erp",
    nav: [
      { label: "PM Hub", icon: <LayoutDashboard className="size-4" /> },
      { label: "GTM Planner", icon: <Rocket className="size-4" /> },
      { label: "Positioning", icon: <Target className="size-4" /> },
      { label: "Competitive Intel", icon: <Sword className="size-4" /> },
      { label: "Launch Calendar", icon: <CalendarDays className="size-4" /> },
      { label: "Market Research", icon: <BookOpen className="size-4" /> },
      { label: "Messaging Matrix", icon: <MessageSquare className="size-4" /> },
      { label: "Campaign Briefs", icon: <FileText className="size-4" /> },
      { label: "Analytics", icon: <LineChart className="size-4" /> },
    ],
  },
  {
    key: "behavioral-design",
    label: "Behavioral Design",
    emoji: "🧠",
    gradient: "bg-gradient-learning",
    nav: [
      { label: "Behavioral Hub", icon: <LayoutDashboard className="size-4" /> },
      { label: "Interventions", icon: <Brain className="size-4" /> },
      { label: "Flow Designer", icon: <Workflow className="size-4" /> },
      { label: "Nudge Campaigns", icon: <Zap className="size-4" /> },
      { label: "A/B Tests", icon: <FlaskConical className="size-4" /> },
      { label: "Funnels", icon: <Layers className="size-4" /> },
      { label: "Habits", icon: <Timer className="size-4" /> },
      { label: "Segments", icon: <Users className="size-4" /> },
      { label: "Analytics", icon: <LineChart className="size-4" /> },
    ],
  },
  {
    key: "growth",
    label: "Growth",
    emoji: "📈",
    gradient: "bg-gradient-career",
    nav: [
      { label: "Growth Hub", icon: <LayoutDashboard className="size-4" /> },
      { label: "Experiments", icon: <FlaskConical className="size-4" /> },
      { label: "Funnel Analyzer", icon: <TrendingUp className="size-4" /> },
      { label: "Cohorts", icon: <Layers className="size-4" /> },
      { label: "Referrals", icon: <Gift className="size-4" /> },
      { label: "Attribution", icon: <Share2 className="size-4" /> },
      { label: "Simulator", icon: <SlidersHorizontal className="size-4" /> },
      { label: "SEO Planner", icon: <Search className="size-4" /> },
    ],
  },
  {
    key: "localization",
    label: "Localization",
    emoji: "🌍",
    gradient: "bg-gradient-services",
    nav: [
      { label: "Localization Hub", icon: <LayoutDashboard className="size-4" /> },
      { label: "Copy Variants", icon: <Languages className="size-4" /> },
      { label: "Translation Memory", icon: <Database className="size-4" /> },
      { label: "Glossary", icon: <BookOpen className="size-4" /> },
      { label: "Style Guides", icon: <PenTool className="size-4" /> },
      { label: "Page Preview", icon: <Eye className="size-4" /> },
      { label: "Dialects", icon: <Globe className="size-4" /> },
      { label: "Analytics", icon: <LineChart className="size-4" /> },
    ],
  },
  {
    key: "design",
    label: "Design",
    emoji: "🎨",
    gradient: "bg-gradient-community",
    nav: [
      { label: "Design Hub", icon: <LayoutDashboard className="size-4" /> },
      { label: "Design System", icon: <Palette className="size-4" /> },
      { label: "Components", icon: <Component className="size-4" /> },
      { label: "Prototypes", icon: <MousePointerClick className="size-4" /> },
      { label: "User Flows", icon: <Workflow className="size-4" /> },
      { label: "Tokens", icon: <Pipette className="size-4" /> },
      { label: "Exports", icon: <FileDown className="size-4" /> },
      { label: "Collaboration", icon: <MessagesSquare className="size-4" /> },
      { label: "Versions", icon: <History className="size-4" /> },
    ],
  },
];

export function AppShell({
  roleKey = "student",
  title,
  subtitle,
  actions,
  children,
}: {
  roleKey?: string;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  const [roleKeyState, setRoleKeyState] = useState(roleKey);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const activeRoleKey = roleKeyState || roleKey;
  const role = appRoles.find((r) => r.key === activeRoleKey) ?? appRoles[0];
  const { open: paletteOpen, setOpen: setPaletteOpen } = useCommandPalette();
  const navigate = useNavigate();
  const signOut = useSignOut();
  const user = useSessionUser();
  const { data: sessionData, isPending: sessionLoading } = useSession();

  const signedOutInLiveMode = !sessionLoading && !sessionData?.user && !isMockMode;
  useEffect(() => {
    if (signedOutInLiveMode) {
      void navigate({ to: "/auth/sign-in" });
    }
  }, [signedOutInLiveMode, navigate]);

  const handleSignOut = () => {
    signOut.mutate(undefined, {
      onSettled: () => navigate({ to: "/" }),
    });
  };

  const initials = (user?.name ?? "CE")
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  useEffect(() => {
    track("app.page_view", { role: activeRoleKey, title });
  }, [activeRoleKey, title]);

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2.5 px-5 py-5">
        <Link
          to="/"
          className="bg-gradient-brand shadow-glow grid size-9 place-items-center rounded-xl"
        >
          <span className="font-display text-sm font-extrabold text-white">CE</span>
        </Link>
        <div>
          <p className="font-display text-sm leading-tight font-extrabold">CEA-OS</p>
          <p className="text-muted-foreground text-[10px] font-semibold tracking-wide uppercase">
            One platform · Five engines
          </p>
        </div>
      </div>

      <div className="px-4 pb-3">
        <button
          onClick={() => {
            const keys = appRoles.map((r) => r.key);
            const next = keys[(keys.indexOf(activeRoleKey) + 1) % keys.length];
            setRoleKeyState(next);
          }}
          className={cn(
            "flex w-full items-center gap-2.5 rounded-xl border p-2.5 text-left transition-colors hover:border-primary/40",
          )}
        >
          <span className={cn("grid size-9 place-items-center rounded-lg text-lg", role.gradient)}>
            {role.emoji}
          </span>
          <span className="flex-1">
            <span className="block text-xs font-bold">Viewing as</span>
            <span className="font-display block text-sm font-extrabold">{role.label}</span>
          </span>
          <ChevronDown className="text-muted-foreground size-4" />
        </button>
      </div>

      <ScrollArea className="flex-1 px-3">
        <p className="text-muted-foreground px-3 pt-2 pb-1 text-[10px] font-bold tracking-[0.16em] uppercase">
          {role.label} portal
        </p>
        <nav className="space-y-0.5">
          {role.nav.map((item, i) => (
            <Link
              key={item.label}
              to={item.to ?? "/app"}
              data-tour={i === 0 ? "nav-home" : i === 1 ? "nav-learn" : undefined}
              activeProps={{ className: "bg-primary/10 text-primary" }}
              activeOptions={{ exact: item.to === "/app" }}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold transition-colors",
                "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
              )}
            >
              {item.icon}
              {item.label}
              {i === 4 && (
                <Badge className="ml-auto h-5 bg-primary/15 text-primary px-1.5 text-[10px] border-0">
                  3
                </Badge>
              )}
            </Link>
          ))}
        </nav>
      </ScrollArea>

      <div className="border-t p-3">
        <button
          type="button"
          onClick={handleSignOut}
          disabled={signOut.isPending}
          className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-muted/70"
          title="Sign out"
        >
          <Avatar className="size-8">
            <AvatarFallback className={cn("text-xs text-white", role.gradient)}>
              {initials}
            </AvatarFallback>
          </Avatar>
          <span className="flex-1">
            <span className="block truncate text-sm font-bold">{user?.name ?? "Signed in"}</span>
            <span className="text-muted-foreground block text-[11px]">
              {user?.email ?? `${role.label} · Cohort 15`}
            </span>
          </span>
          <LogOut className="text-muted-foreground size-4" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-muted/30 flex min-h-screen">
      <aside className="bg-card fixed inset-y-0 left-0 z-40 hidden w-64 border-r lg:block">
        {sidebar}
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <aside className="bg-card absolute inset-y-0 left-0 w-72 border-r shadow-2xl">
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-muted-foreground hover:text-foreground absolute top-4 right-4"
            >
              <X className="size-5" />
            </button>
            {sidebar}
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col lg:pl-64">
        <header className="bg-card/80 sticky top-0 z-30 border-b backdrop-blur">
          <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-muted-foreground hover:text-foreground lg:hidden"
            >
              <Menu className="size-5" />
            </button>
            <div>
              <h1 className="font-display text-base leading-tight font-extrabold sm:text-lg">
                {title}
              </h1>
              {subtitle && (
                <p className="text-muted-foreground hidden text-xs sm:block">{subtitle}</p>
              )}
            </div>
            <div className="ml-auto flex items-center gap-2.5">
              <div className="relative hidden md:block">
                <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                <Input
                  placeholder="Search… (⌘K)"
                  onFocus={() => setPaletteOpen(true)}
                  className="h-9 w-56 border pl-9 text-sm shadow-none"
                />
              </div>
              <ThemeToggle />
              <Button variant="ghost" size="icon" className="relative" asChild>
                <Link to="/app/notifications" title="Notifications">
                  <Bell className="size-5" />
                  <span className="bg-gradient-brand absolute top-1.5 right-1.5 size-2 rounded-full ring-2 ring-background" />
                </Link>
              </Button>
              <div className="h-6 w-px bg-border" />
              <Avatar className="size-9">
                <AvatarFallback className={cn("text-xs text-white", role.gradient)}>
                  {initials}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
          <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
          {actions && (
            <div className="flex flex-wrap items-center gap-2 border-t px-4 py-2.5 sm:px-6">
              {actions}
            </div>
          )}
        </header>

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
