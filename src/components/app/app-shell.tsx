import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import {
  Bell,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  ChevronDown,
  FileText,
  GraduationCap,
  HeartHandshake,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Search,
  Settings,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export type AppRole = {
  key: string;
  label: string;
  emoji: string;
  gradient: string;
  nav: { label: string; icon: ReactNode }[];
};

export const appRoles: AppRole[] = [
  {
    key: "student",
    label: "Student",
    emoji: "🎓",
    gradient: "bg-gradient-learning",
    nav: [
      { label: "Dashboard", icon: <LayoutDashboard className="size-4" /> },
      { label: "Learning Hub", icon: <BookOpen className="size-4" /> },
      { label: "Assignments", icon: <FileText className="size-4" /> },
      { label: "Assessments", icon: <ShieldCheck className="size-4" /> },
      { label: "Grades", icon: <GraduationCap className="size-4" /> },
      { label: "Portfolio", icon: <BriefcaseBusiness className="size-4" /> },
      { label: "Marketplace", icon: <BriefcaseBusiness className="size-4" /> },
      { label: "Calendar", icon: <CalendarDays className="size-4" /> },
      { label: "Messages", icon: <MessageSquare className="size-4" /> },
      { label: "Finance", icon: <Building2 className="size-4" /> },
      { label: "Attendance", icon: <Users className="size-4" /> },
      { label: "Certificates", icon: <HeartHandshake className="size-4" /> },
    ],
  },
  {
    key: "instructor",
    label: "Instructor",
    emoji: "🧑‍🏫",
    gradient: "bg-gradient-erp",
    nav: [
      { label: "Dashboard", icon: <LayoutDashboard className="size-4" /> },
      { label: "Course Builder", icon: <BookOpen className="size-4" /> },
      { label: "Assignments", icon: <FileText className="size-4" /> },
      { label: "Assessment Engine", icon: <ShieldCheck className="size-4" /> },
      { label: "Gradebook", icon: <GraduationCap className="size-4" /> },
      { label: "Attendance", icon: <Users className="size-4" /> },
      { label: "Analytics", icon: <Building2 className="size-4" /> },
      { label: "Calendar", icon: <CalendarDays className="size-4" /> },
      { label: "Messages", icon: <MessageSquare className="size-4" /> },
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
      { label: "Admin Hub", icon: <LayoutDashboard className="size-4" /> },
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
              to="/app"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold transition-colors",
                i === 0
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
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
        <Link
          to="/app"
          className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 transition-colors hover:bg-muted/70"
        >
          <Avatar className="size-8">
            <AvatarFallback className={cn("text-xs text-white", role.gradient)}>AO</AvatarFallback>
          </Avatar>
          <span className="flex-1">
            <span className="block text-sm font-bold">Ada Obi</span>
            <span className="text-muted-foreground block text-[11px]">
              {role.label} · Cohort 15
            </span>
          </span>
          <LogOut className="text-muted-foreground size-4" />
        </Link>
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
                  className="h-9 w-56 border pl-9 text-sm shadow-none"
                />
              </div>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="size-5" />
                <span className="bg-gradient-brand absolute top-1.5 right-1.5 size-2 rounded-full ring-2 ring-background" />
              </Button>
              <div className="h-6 w-px bg-border" />
              <Avatar className="size-9">
                <AvatarFallback className={cn("text-xs text-white", role.gradient)}>
                  AO
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
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
