import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  Bell,
  BookOpen,
  Boxes,
  Brain,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Check,
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
  Library,
  LineChart,
  LogOut,
  Menu,
  MessageSquare,
  MessagesSquare,
  MousePointerClick,
  Palette,
  PenTool,
  Phone,
  Pipette,
  Rocket,
  Search,
  Settings,
  Share2,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Star,
  Sword,
  Target,
  Timer,
  TrendingUp,
  Truck,
  Users,
  Workflow,
  Wrench,
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
import { resolveRoleKey } from "@/data/rbac";

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
      { label: "Library", icon: <Library className="size-4" />, to: "/app/library" },
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
      {
        label: "Gradebook",
        icon: <GraduationCap className="size-4" />,
        to: "/app/instructor/gradebook",
      },
      {
        label: "Attendance",
        icon: <Users className="size-4" />,
        to: "/app/instructor/attendance",
      },
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
      {
        label: "Employer Hub",
        icon: <LayoutDashboard className="size-4" />,
        to: "/app/employer/hub",
      },
      {
        label: "Job Management",
        icon: <BriefcaseBusiness className="size-4" />,
        to: "/app/employer/jobs",
      },
      { label: "Talent Search", icon: <Users className="size-4" />, to: "/app/employer/talent" },
      {
        label: "Candidate Pipeline",
        icon: <FileText className="size-4" />,
        to: "/app/employer/pipeline",
      },
      {
        label: "Interviews",
        icon: <CalendarDays className="size-4" />,
        to: "/app/employer/interviews",
      },
      { label: "Analytics", icon: <Building2 className="size-4" />, to: "/app/employer/analytics" },
      { label: "Messages", icon: <MessageSquare className="size-4" />, to: "/app/messages" },
    ],
  },
  {
    key: "parent",
    label: "Parent",
    emoji: "👨‍👩‍👧",
    gradient: "bg-gradient-community",
    nav: [
      {
        label: "Parent Dashboard",
        icon: <LayoutDashboard className="size-4" />,
        to: "/app/parent",
      },
      { label: "Messages", icon: <MessageSquare className="size-4" />, to: "/app/messages" },
    ],
  },
  {
    key: "mentor",
    label: "Mentor",
    emoji: "🧭",
    gradient: "bg-gradient-career",
    nav: [
      {
        label: "Mentor Dashboard",
        icon: <LayoutDashboard className="size-4" />,
        to: "/app/mentor",
      },
      { label: "Mentees", icon: <Users className="size-4" />, to: "/app/mentor/requests" },
      { label: "Sessions", icon: <CalendarDays className="size-4" />, to: "/app/mentor/sessions" },
      { label: "Resources", icon: <BookOpen className="size-4" />, to: "/app/mentor/resources" },
      { label: "Goals", icon: <Target className="size-4" />, to: "/app/mentor/goals" },
      { label: "Messages", icon: <MessageSquare className="size-4" />, to: "/app/mentor/messages" },
      { label: "Analytics", icon: <LineChart className="size-4" />, to: "/app/mentor/analytics" },
      { label: "Settings", icon: <Settings className="size-4" />, to: "/app/mentor/settings" },
    ],
  },
  {
    key: "hr",
    label: "HR",
    emoji: "🤝",
    gradient: "bg-gradient-erp",
    nav: [
      { label: "HR Hub", icon: <LayoutDashboard className="size-4" />, to: "/app/hr" },
      { label: "Employees", icon: <Users className="size-4" />, to: "/app/hr/employees" },
      {
        label: "Recruitment",
        icon: <BriefcaseBusiness className="size-4" />,
        to: "/app/hr/recruitment",
      },
      { label: "Leave", icon: <CalendarDays className="size-4" />, to: "/app/hr/leave" },
      { label: "Attendance", icon: <Users className="size-4" />, to: "/app/hr/attendance" },
      { label: "Training", icon: <BookOpen className="size-4" />, to: "/app/hr/training" },
      { label: "Performance", icon: <LineChart className="size-4" />, to: "/app/hr/performance" },
      { label: "Reports", icon: <FileText className="size-4" />, to: "/app/hr/reports" },
    ],
  },
  {
    key: "finance",
    label: "Finance",
    emoji: "💰",
    gradient: "bg-gradient-services",
    nav: [
      { label: "Finance Hub", icon: <LayoutDashboard className="size-4" />, to: "/app/accountant" },
      {
        label: "Invoicing",
        icon: <FileText className="size-4" />,
        to: "/app/accountant/invoicing",
      },
      { label: "Payments", icon: <Building2 className="size-4" />, to: "/app/accountant/payments" },
      { label: "Payroll", icon: <Users className="size-4" />, to: "/app/accountant/payroll" },
      { label: "Expenses", icon: <FileDown className="size-4" />, to: "/app/accountant/expenses" },
      {
        label: "Budgets",
        icon: <CalendarDays className="size-4" />,
        to: "/app/accountant/budgets",
      },
      { label: "Reports", icon: <LineChart className="size-4" />, to: "/app/accountant/reports" },
    ],
  },
  {
    key: "admin",
    label: "System Admin",
    emoji: "🛡️",
    gradient: "bg-gradient-services",
    nav: [
      { label: "Admin Hub", icon: <LayoutDashboard className="size-4" />, to: "/app/admin" },
      { label: "User Management", icon: <Users className="size-4" />, to: "/app/admin/users" },
      {
        label: "Roles & Permissions",
        icon: <ShieldCheck className="size-4" />,
        to: "/app/admin/roles",
      },
      { label: "Security", icon: <ShieldCheck className="size-4" />, to: "/app/admin/security" },
      { label: "Audit Log", icon: <FileText className="size-4" />, to: "/app/admin/audit" },
      { label: "System Config", icon: <Settings className="size-4" />, to: "/app/admin/config" },
      { label: "Monitoring", icon: <Building2 className="size-4" />, to: "/app/admin/monitoring" },
      { label: "Backups", icon: <HeartHandshake className="size-4" />, to: "/app/admin/backups" },
      { label: "Logs", icon: <MessageSquare className="size-4" />, to: "/app/admin/logs" },
    ],
  },
  {
    key: "product-marketing",
    label: "Product Marketing",
    emoji: "📣",
    gradient: "bg-gradient-erp",
    nav: [
      {
        label: "PM Hub",
        icon: <LayoutDashboard className="size-4" />,
        to: "/app/product-marketing",
      },
      {
        label: "GTM Planner",
        icon: <Rocket className="size-4" />,
        to: "/app/product-marketing/gtm",
      },
      {
        label: "Positioning",
        icon: <Target className="size-4" />,
        to: "/app/product-marketing/positioning",
      },
      {
        label: "Competitive Intel",
        icon: <Sword className="size-4" />,
        to: "/app/product-marketing/competitive",
      },
      {
        label: "Launch Calendar",
        icon: <CalendarDays className="size-4" />,
        to: "/app/product-marketing/launch-calendar",
      },
      {
        label: "Market Research",
        icon: <BookOpen className="size-4" />,
        to: "/app/product-marketing/research",
      },
      {
        label: "Messaging Matrix",
        icon: <MessageSquare className="size-4" />,
        to: "/app/product-marketing/messaging",
      },
      {
        label: "Campaign Briefs",
        icon: <FileText className="size-4" />,
        to: "/app/product-marketing/briefs",
      },
      {
        label: "Analytics",
        icon: <LineChart className="size-4" />,
        to: "/app/product-marketing/analytics",
      },
    ],
  },
  {
    key: "behavioral-design",
    label: "Behavioral Design",
    emoji: "🧠",
    gradient: "bg-gradient-learning",
    nav: [
      {
        label: "Behavioral Hub",
        icon: <LayoutDashboard className="size-4" />,
        to: "/app/behavioral-design",
      },
      {
        label: "Interventions",
        icon: <Brain className="size-4" />,
        to: "/app/behavioral-design/interventions",
      },
      {
        label: "Flow Designer",
        icon: <Workflow className="size-4" />,
        to: "/app/behavioral-design/flow-designer",
      },
      {
        label: "Nudge Campaigns",
        icon: <Zap className="size-4" />,
        to: "/app/behavioral-design/nudge-campaigns",
      },
      {
        label: "A/B Tests",
        icon: <FlaskConical className="size-4" />,
        to: "/app/behavioral-design/ab-tests",
      },
      {
        label: "Funnels",
        icon: <Layers className="size-4" />,
        to: "/app/behavioral-design/funnels",
      },
      { label: "Habits", icon: <Timer className="size-4" />, to: "/app/behavioral-design/habits" },
      {
        label: "Segments",
        icon: <Users className="size-4" />,
        to: "/app/behavioral-design/segments",
      },
      {
        label: "Analytics",
        icon: <LineChart className="size-4" />,
        to: "/app/behavioral-design/analytics",
      },
    ],
  },
  {
    key: "growth",
    label: "Growth",
    emoji: "📈",
    gradient: "bg-gradient-career",
    nav: [
      { label: "Growth Hub", icon: <LayoutDashboard className="size-4" />, to: "/app/growth" },
      {
        label: "Experiments",
        icon: <FlaskConical className="size-4" />,
        to: "/app/growth/experiments",
      },
      {
        label: "Funnel Analyzer",
        icon: <TrendingUp className="size-4" />,
        to: "/app/growth/funnel",
      },
      { label: "Cohorts", icon: <Layers className="size-4" />, to: "/app/growth/cohorts" },
      { label: "Referrals", icon: <Gift className="size-4" />, to: "/app/growth/referrals" },
      { label: "Attribution", icon: <Share2 className="size-4" />, to: "/app/growth/attribution" },
      {
        label: "Simulator",
        icon: <SlidersHorizontal className="size-4" />,
        to: "/app/growth/simulator",
      },
      { label: "SEO Planner", icon: <Search className="size-4" />, to: "/app/growth/seo" },
    ],
  },
  {
    key: "localization",
    label: "Localization",
    emoji: "🌍",
    gradient: "bg-gradient-services",
    nav: [
      {
        label: "Localization Hub",
        icon: <LayoutDashboard className="size-4" />,
        to: "/app/localization",
      },
      {
        label: "Copy Variants",
        icon: <Languages className="size-4" />,
        to: "/app/localization/variants",
      },
      {
        label: "Translation Memory",
        icon: <Database className="size-4" />,
        to: "/app/localization/translation-memory",
      },
      {
        label: "Glossary",
        icon: <BookOpen className="size-4" />,
        to: "/app/localization/glossary",
      },
      {
        label: "Style Guides",
        icon: <PenTool className="size-4" />,
        to: "/app/localization/style-guides",
      },
      { label: "Page Preview", icon: <Eye className="size-4" />, to: "/app/localization/preview" },
      { label: "Dialects", icon: <Globe className="size-4" />, to: "/app/localization/dialects" },
      {
        label: "Analytics",
        icon: <LineChart className="size-4" />,
        to: "/app/localization/analytics",
      },
    ],
  },
  {
    key: "design",
    label: "Design",
    emoji: "🎨",
    gradient: "bg-gradient-community",
    nav: [
      { label: "Design Hub", icon: <LayoutDashboard className="size-4" />, to: "/app/design" },
      { label: "Design System", icon: <Palette className="size-4" />, to: "/app/design/system" },
      { label: "Components", icon: <Component className="size-4" />, to: "/app/design/components" },
      {
        label: "Prototypes",
        icon: <MousePointerClick className="size-4" />,
        to: "/app/design/prototypes",
      },
      { label: "User Flows", icon: <Workflow className="size-4" />, to: "/app/design/flows" },
      { label: "Tokens", icon: <Pipette className="size-4" />, to: "/app/design/tokens" },
      { label: "Exports", icon: <FileDown className="size-4" />, to: "/app/design/exports" },
      {
        label: "Collaboration",
        icon: <MessagesSquare className="size-4" />,
        to: "/app/design/collaboration",
      },
      { label: "Versions", icon: <History className="size-4" />, to: "/app/design/versions" },
    ],
  },
  {
    key: "intern",
    label: "Intern",
    emoji: "🧑‍💻",
    gradient: "bg-gradient-learning",
    nav: [
      { label: "Intern Hub", icon: <LayoutDashboard className="size-4" />, to: "/app/intern" },
      {
        label: "Learning Plan",
        icon: <BookOpen className="size-4" />,
        to: "/app/intern/learning-plan",
      },
      { label: "Skills Tracker", icon: <Target className="size-4" />, to: "/app/intern/skills" },
      { label: "Tasks", icon: <FileText className="size-4" />, to: "/app/intern/tasks" },
      { label: "Timesheet", icon: <Timer className="size-4" />, to: "/app/intern/timesheet" },
      { label: "Mentorship", icon: <Users className="size-4" />, to: "/app/intern/mentorship" },
      {
        label: "Portfolio",
        icon: <BriefcaseBusiness className="size-4" />,
        to: "/app/intern/portfolio",
      },
      { label: "Resources", icon: <Library className="size-4" />, to: "/app/intern/resources" },
      { label: "Messages", icon: <MessageSquare className="size-4" />, to: "/app/intern/messages" },
      { label: "Evaluation", icon: <LineChart className="size-4" />, to: "/app/intern/evaluation" },
    ],
  },
  {
    key: "alumni",
    label: "Alumni",
    emoji: "🎓",
    gradient: "bg-gradient-career",
    nav: [
      { label: "Alumni Hub", icon: <LayoutDashboard className="size-4" />, to: "/app/alumni/hub" },
      { label: "Network", icon: <Users className="size-4" />, to: "/app/alumni/network" },
      {
        label: "Job Board",
        icon: <BriefcaseBusiness className="size-4" />,
        to: "/app/alumni/jobs",
      },
      { label: "Events", icon: <CalendarDays className="size-4" />, to: "/app/alumni/events" },
      { label: "Mentorship", icon: <Sparkles className="size-4" />, to: "/app/alumni/mentorship" },
      { label: "Find a Mentor", icon: <Search className="size-4" />, to: "/app/alumni/find" },
      {
        label: "Give Back",
        icon: <HeartHandshake className="size-4" />,
        to: "/app/alumni/give-back",
      },
      { label: "Success Stories", icon: <PenTool className="size-4" />, to: "/app/alumni/stories" },
      { label: "My Profile", icon: <Settings className="size-4" />, to: "/app/alumni/profile" },
    ],
  },
  {
    key: "client",
    label: "Client",
    emoji: "🤝",
    gradient: "bg-gradient-services",
    nav: [
      { label: "Client Portal", icon: <LayoutDashboard className="size-4" />, to: "/app/client" },
      { label: "Proposals", icon: <FileText className="size-4" />, to: "/app/client/proposals" },
      { label: "Contracts", icon: <FileDown className="size-4" />, to: "/app/client/contracts" },
      { label: "Invoices", icon: <Building2 className="size-4" />, to: "/app/client/invoices" },
      { label: "Support", icon: <MessagesSquare className="size-4" />, to: "/app/client/support" },
      { label: "Messages", icon: <MessageSquare className="size-4" />, to: "/app/client/messages" },
    ],
  },
  {
    key: "dev",
    label: "Developer",
    emoji: "👨‍💻",
    gradient: "bg-gradient-services",
    nav: [
      { label: "Dev Hub", icon: <LayoutDashboard className="size-4" />, to: "/app/dev" },
      {
        label: "API Playground",
        icon: <FlaskConical className="size-4" />,
        to: "/app/dev/api-playground",
      },
      { label: "Deployments", icon: <Rocket className="size-4" />, to: "/app/dev/deployments" },
      { label: "Monitoring", icon: <LineChart className="size-4" />, to: "/app/dev/monitoring" },
      { label: "Feature Flags", icon: <Layers className="size-4" />, to: "/app/dev/feature-flags" },
      { label: "Git & PRs", icon: <Workflow className="size-4" />, to: "/app/dev/git" },
      { label: "Code Reviews", icon: <ShieldCheck className="size-4" />, to: "/app/dev/reviews" },
      { label: "Dev Tasks", icon: <FileText className="size-4" />, to: "/app/dev/tasks" },
      { label: "Job Queues", icon: <Zap className="size-4" />, to: "/app/dev/queues" },
      { label: "Docs", icon: <BookOpen className="size-4" />, to: "/app/dev/docs" },
      { label: "Env Vars", icon: <Settings className="size-4" />, to: "/app/dev/env" },
      { label: "Dependencies", icon: <Database className="size-4" />, to: "/app/dev/dependencies" },
    ],
  },
  {
    key: "marketing",
    label: "Marketing",
    emoji: "📣",
    gradient: "bg-gradient-services",
    nav: [
      {
        label: "Marketing Hub",
        icon: <LayoutDashboard className="size-4" />,
        to: "/app/marketing",
      },
      { label: "Campaigns", icon: <Rocket className="size-4" />, to: "/app/marketing/campaigns" },
      {
        label: "Content Calendar",
        icon: <CalendarDays className="size-4" />,
        to: "/app/marketing/content-calendar",
      },
      { label: "Email", icon: <MessageSquare className="size-4" />, to: "/app/marketing/email" },
      {
        label: "Landing Pages",
        icon: <PenTool className="size-4" />,
        to: "/app/marketing/landing-pages",
      },
      { label: "Leads", icon: <Users className="size-4" />, to: "/app/marketing/leads" },
      { label: "Social", icon: <Share2 className="size-4" />, to: "/app/marketing/social" },
      { label: "SEO", icon: <Search className="size-4" />, to: "/app/marketing/seo" },
      {
        label: "Analytics",
        icon: <LineChart className="size-4" />,
        to: "/app/marketing/analytics",
      },
      { label: "Reports", icon: <FileText className="size-4" />, to: "/app/marketing/reports" },
    ],
  },
  {
    key: "conversion-copy",
    label: "Conversion Copy",
    emoji: "✍️",
    gradient: "bg-gradient-services",
    nav: [
      {
        label: "Copy Hub",
        icon: <LayoutDashboard className="size-4" />,
        to: "/app/conversion-copy/analytics",
      },
      {
        label: "A/B Tests",
        icon: <FlaskConical className="size-4" />,
        to: "/app/conversion-copy/ab-tests",
      },
      { label: "Ads", icon: <Share2 className="size-4" />, to: "/app/conversion-copy/ads" },
      {
        label: "Email Sequences",
        icon: <MessageSquare className="size-4" />,
        to: "/app/conversion-copy/email-sequences",
      },
      { label: "Briefs", icon: <FileText className="size-4" />, to: "/app/conversion-copy/briefs" },
      {
        label: "Library",
        icon: <Library className="size-4" />,
        to: "/app/conversion-copy/library",
      },
      {
        label: "Style Guide",
        icon: <PenTool className="size-4" />,
        to: "/app/conversion-copy/style-guide",
      },
    ],
  },
  {
    key: "it",
    label: "IT Support",
    emoji: "🛠️",
    gradient: "bg-gradient-erp",
    nav: [
      { label: "IT Hub", icon: <LayoutDashboard className="size-4" />, to: "/app/it" },
      { label: "Tickets", icon: <MessagesSquare className="size-4" />, to: "/app/it/tickets" },
      { label: "Assets", icon: <Database className="size-4" />, to: "/app/it/assets" },
      { label: "Licenses", icon: <ShieldCheck className="size-4" />, to: "/app/it/licenses" },
      { label: "Maintenance", icon: <Wrench className="size-4" />, to: "/app/it/maintenance" },
      { label: "Monitoring", icon: <LineChart className="size-4" />, to: "/app/it/monitoring" },
      {
        label: "Remote Support",
        icon: <Workflow className="size-4" />,
        to: "/app/it/remote-support",
      },
      {
        label: "Knowledge Base",
        icon: <BookOpen className="size-4" />,
        to: "/app/it/knowledge-base",
      },
      { label: "Templates", icon: <FileText className="size-4" />, to: "/app/it/templates" },
      { label: "Users", icon: <Users className="size-4" />, to: "/app/it/users" },
      { label: "Reports", icon: <FileDown className="size-4" />, to: "/app/it/reports" },
    ],
  },
  {
    key: "ops",
    label: "Operations",
    emoji: "⚙️",
    gradient: "bg-gradient-erp",
    nav: [
      { label: "Ops Hub", icon: <LayoutDashboard className="size-4" />, to: "/app/ops" },
      { label: "Automation", icon: <Zap className="size-4" />, to: "/app/ops/automation" },
      { label: "Branches", icon: <Building2 className="size-4" />, to: "/app/ops/branches" },
      { label: "Facilities", icon: <Component className="size-4" />, to: "/app/ops/facilities" },
      { label: "Inventory", icon: <Database className="size-4" />, to: "/app/ops/inventory" },
      { label: "Vendors", icon: <BriefcaseBusiness className="size-4" />, to: "/app/ops/vendors" },
      { label: "Tasks", icon: <FileText className="size-4" />, to: "/app/ops/tasks" },
      { label: "Reports", icon: <LineChart className="size-4" />, to: "/app/ops/reports" },
    ],
  },
  {
    key: "admissions",
    label: "Admissions",
    emoji: "🎯",
    gradient: "bg-gradient-erp",
    nav: [
      {
        label: "Admissions Hub",
        icon: <LayoutDashboard className="size-4" />,
        to: "/app/admissions",
      },
      {
        label: "Applications",
        icon: <FileText className="size-4" />,
        to: "/app/admissions/applications",
      },
      {
        label: "Review Pipeline",
        icon: <Workflow className="size-4" />,
        to: "/app/admissions/review",
      },
      {
        label: "Interviews",
        icon: <CalendarDays className="size-4" />,
        to: "/app/admissions/interviews",
      },
      { label: "Enrollment", icon: <Users className="size-4" />, to: "/app/admissions/enrollment" },
      {
        label: "Communication",
        icon: <MessageSquare className="size-4" />,
        to: "/app/admissions/communication",
      },
      {
        label: "Documents",
        icon: <FileDown className="size-4" />,
        to: "/app/admissions/documents",
      },
      { label: "Reports", icon: <LineChart className="size-4" />, to: "/app/admissions/reports" },
    ],
  },
  {
    key: "department",
    label: "Department Head",
    emoji: "🏫",
    gradient: "bg-gradient-erp",
    nav: [
      {
        label: "Department Hub",
        icon: <LayoutDashboard className="size-4" />,
        to: "/app/department",
      },
      {
        label: "Curriculum",
        icon: <BookOpen className="size-4" />,
        to: "/app/department/curriculum",
      },
      {
        label: "Instructors",
        icon: <Users className="size-4" />,
        to: "/app/department/instructors",
      },
      { label: "Quality", icon: <ShieldCheck className="size-4" />, to: "/app/department/quality" },
      {
        label: "Enrollment",
        icon: <GraduationCap className="size-4" />,
        to: "/app/department/enrollment",
      },
      { label: "Approvals", icon: <Check className="size-4" />, to: "/app/department/approvals" },
      {
        label: "Calendar",
        icon: <CalendarDays className="size-4" />,
        to: "/app/department/calendar",
      },
      { label: "Reports", icon: <LineChart className="size-4" />, to: "/app/department/reports" },
    ],
  },
  {
    key: "director",
    label: "Director",
    emoji: "🎖️",
    gradient: "bg-gradient-erp",
    nav: [
      { label: "Director Hub", icon: <LayoutDashboard className="size-4" />, to: "/app/director" },
      {
        label: "Command Center",
        icon: <Zap className="size-4" />,
        to: "/app/director/command-center",
      },
      { label: "Academic", icon: <BookOpen className="size-4" />, to: "/app/director/academic" },
      { label: "Finance", icon: <Building2 className="size-4" />, to: "/app/director/finance" },
      { label: "HR", icon: <Users className="size-4" />, to: "/app/director/hr" },
      { label: "Marketing", icon: <Rocket className="size-4" />, to: "/app/director/marketing" },
      {
        label: "Operations",
        icon: <Workflow className="size-4" />,
        to: "/app/director/operations",
      },
      { label: "OKRs", icon: <Target className="size-4" />, to: "/app/director/okrs" },
      {
        label: "Approvals",
        icon: <ShieldCheck className="size-4" />,
        to: "/app/director/approvals",
      },
      { label: "Reports", icon: <LineChart className="size-4" />, to: "/app/director/reports" },
    ],
  },
  {
    key: "receptionist",
    label: "Receptionist",
    emoji: "🪪",
    gradient: "bg-gradient-erp",
    nav: [
      {
        label: "Reception Hub",
        icon: <LayoutDashboard className="size-4" />,
        to: "/app/receptionist",
      },
      { label: "Check-In", icon: <PenTool className="size-4" />, to: "/app/receptionist/check-in" },
      {
        label: "Check-Out",
        icon: <FileDown className="size-4" />,
        to: "/app/receptionist/check-out",
      },
      {
        label: "Appointments",
        icon: <CalendarDays className="size-4" />,
        to: "/app/receptionist/appointments",
      },
      { label: "Directory", icon: <Users className="size-4" />, to: "/app/receptionist/directory" },
      {
        label: "Inquiries",
        icon: <MessageSquare className="size-4" />,
        to: "/app/receptionist/inquiries",
      },
      {
        label: "Deliveries",
        icon: <Boxes className="size-4" />,
        to: "/app/receptionist/deliveries",
      },
      { label: "Phone Log", icon: <Phone className="size-4" />, to: "/app/receptionist/phone-log" },
      { label: "Tasks", icon: <FileText className="size-4" />, to: "/app/receptionist/tasks" },
    ],
  },
  {
    key: "supplier",
    label: "Supplier",
    emoji: "🚚",
    gradient: "bg-gradient-erp",
    nav: [
      { label: "Supplier Hub", icon: <LayoutDashboard className="size-4" />, to: "/app/supplier" },
      { label: "Orders", icon: <Boxes className="size-4" />, to: "/app/supplier/orders" },
      { label: "Deliveries", icon: <Truck className="size-4" />, to: "/app/supplier/deliveries" },
      { label: "Invoices", icon: <Building2 className="size-4" />, to: "/app/supplier/invoices" },
      { label: "Performance", icon: <Star className="size-4" />, to: "/app/supplier/performance" },
      {
        label: "Messages",
        icon: <MessageSquare className="size-4" />,
        to: "/app/supplier/messages",
      },
    ],
  },
  {
    key: "volunteer",
    label: "Volunteer",
    emoji: "🤝",
    gradient: "bg-gradient-community",
    nav: [
      {
        label: "Volunteer Hub",
        icon: <LayoutDashboard className="size-4" />,
        to: "/app/volunteer",
      },
      {
        label: "Opportunities",
        icon: <Search className="size-4" />,
        to: "/app/volunteer/opportunities",
      },
      {
        label: "My Volunteering",
        icon: <HeartHandshake className="size-4" />,
        to: "/app/volunteer/my-volunteering",
      },
      { label: "Hours Tracker", icon: <Timer className="size-4" />, to: "/app/volunteer/hours" },
      { label: "Impact", icon: <LineChart className="size-4" />, to: "/app/volunteer/impact" },
      {
        label: "Certificates",
        icon: <GraduationCap className="size-4" />,
        to: "/app/volunteer/certificates",
      },
      { label: "Community", icon: <Users className="size-4" />, to: "/app/volunteer/community" },
    ],
  },
  {
    key: "ngo",
    label: "NGO Partner",
    emoji: "🌱",
    gradient: "bg-gradient-community",
    nav: [
      { label: "Partnership Hub", icon: <LayoutDashboard className="size-4" />, to: "/app/ngo" },
      { label: "Programs", icon: <BookOpen className="size-4" />, to: "/app/ngo/programs" },
      {
        label: "Scholarships",
        icon: <GraduationCap className="size-4" />,
        to: "/app/ngo/scholarships",
      },
      { label: "Donations", icon: <HeartHandshake className="size-4" />, to: "/app/ngo/donations" },
      { label: "Volunteers", icon: <Users className="size-4" />, to: "/app/ngo/volunteers" },
      { label: "Messaging", icon: <MessageSquare className="size-4" />, to: "/app/ngo/messaging" },
      { label: "Analytics", icon: <LineChart className="size-4" />, to: "/app/ngo/analytics" },
      { label: "Reports", icon: <FileText className="size-4" />, to: "/app/ngo/reports" },
    ],
  },
  {
    key: "government",
    label: "Government",
    emoji: "🏛️",
    gradient: "bg-gradient-community",
    nav: [
      {
        label: "Compliance Portal",
        icon: <LayoutDashboard className="size-4" />,
        to: "/app/government",
      },
      { label: "Audit", icon: <ShieldCheck className="size-4" />, to: "/app/government/audit" },
      { label: "Filings", icon: <FileText className="size-4" />, to: "/app/government/filings" },
      { label: "Reports", icon: <LineChart className="size-4" />, to: "/app/government/reports" },
      {
        label: "Calendar",
        icon: <CalendarDays className="size-4" />,
        to: "/app/government/calendar",
      },
      {
        label: "Documents",
        icon: <FileDown className="size-4" />,
        to: "/app/government/documents",
      },
      { label: "Training", icon: <BookOpen className="size-4" />, to: "/app/government/training" },
      {
        label: "Integrity",
        icon: <Database className="size-4" />,
        to: "/app/government/integrity",
      },
      {
        label: "Institution",
        icon: <Building2 className="size-4" />,
        to: "/app/government/institution",
      },
      {
        label: "Messaging",
        icon: <MessageSquare className="size-4" />,
        to: "/app/government/messaging",
      },
      { label: "Changelog", icon: <History className="size-4" />, to: "/app/government/changelog" },
    ],
  },
  {
    key: "partner",
    label: "Partner",
    emoji: "🤝",
    gradient: "bg-gradient-community",
    nav: [
      {
        label: "Partner Hub",
        icon: <LayoutDashboard className="size-4" />,
        to: "/app/partner/hub",
      },
      { label: "Agreements", icon: <FileText className="size-4" />, to: "/app/partner/agreements" },
      {
        label: "Collaborations",
        icon: <Workflow className="size-4" />,
        to: "/app/partner/collaborations",
      },
      { label: "Referrals", icon: <Share2 className="size-4" />, to: "/app/partner/referrals" },
      { label: "Resources", icon: <Library className="size-4" />, to: "/app/partner/resources" },
      { label: "Reports", icon: <LineChart className="size-4" />, to: "/app/partner/reports" },
      {
        label: "Messages",
        icon: <MessageSquare className="size-4" />,
        to: "/app/partner/messages",
      },
    ],
  },
];

const SHARED_APP_PATHS = [
  "/app/calendar",
  "/app/messages",
  "/app/chat",
  "/app/ai",
  "/app/notifications",
  "/app/live",
  "/app/assignments",
  "/app/assessments",
  "/app/finance/pay-verify",
];

function requiredRolesForAppPath(pathname: string, contextRole: string): string[] | null {
  if (!pathname.startsWith("/app/") || pathname === "/app/") return null;
  if (SHARED_APP_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`))) {
    if (["live", "assignments", "assessments"].includes(contextRole)) {
      return ["student", "instructor", "admin"];
    }
    if (contextRole === "finance") return ["student", "finance", "admin"];
    return null;
  }
  return appRoles.some((role) => role.key === contextRole) ? [contextRole, "admin"] : null;
}

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
  const { open: paletteOpen, setOpen: setPaletteOpen } = useCommandPalette();
  const location = useLocation();
  const navigate = useNavigate();
  const signOut = useSignOut();
  const user = useSessionUser();
  const { data: sessionData, isPending: sessionLoading } = useSession();
  // Mock mode intentionally exposes the role switcher for demos. In a real
  // deployment the server-issued role is authoritative; never let a route's
  // presentation prop make an authenticated user look like another role.
  const activeRoleKey = isMockMode
    ? roleKeyState || roleKey
    : resolveRoleKey(sessionData?.user.roleKey ?? roleKey);
  const role = appRoles.find((r) => r.key === activeRoleKey) ?? appRoles[0];

  const requiredRoles = requiredRolesForAppPath(location.pathname, roleKey);
  const actualRoleKey = sessionData?.user ? resolveRoleKey(sessionData.user.roleKey) : null;
  const accessDenied =
    !isMockMode &&
    Boolean(actualRoleKey && requiredRoles && !requiredRoles.includes(actualRoleKey));

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
        {isMockMode ? (
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
            <span
              className={cn("grid size-9 place-items-center rounded-lg text-lg", role.gradient)}
            >
              {role.emoji}
            </span>
            <span className="flex-1">
              <span className="block text-xs font-bold">Viewing as</span>
              <span className="font-display block text-sm font-extrabold">{role.label}</span>
            </span>
            <ChevronDown className="text-muted-foreground size-4" />
          </button>
        ) : (
          <div className="flex w-full items-center gap-2.5 rounded-xl border p-2.5">
            <span
              className={cn("grid size-9 place-items-center rounded-lg text-lg", role.gradient)}
            >
              {role.emoji}
            </span>
            <span className="flex-1">
              <span className="block text-xs font-bold">Your role</span>
              <span className="font-display block text-sm font-extrabold">{role.label}</span>
            </span>
          </div>
        )}
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
              activeProps={{ className: "bg-primary/10 text-primary after:scale-y-100" }}
              activeOptions={{ exact: item.to === "/app" }}
              className={cn(
                "relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold transition-all duration-200",
                "text-muted-foreground hover:bg-muted/70 hover:text-foreground hover:translate-x-0.5",
                // Gradient rail: a 3px brand bar that grows in on the active item —
                // the chapter-index motif, miniature. Pure CSS via activeProps.
                "after:absolute after:top-1/2 after:left-0 after:h-5 after:w-[3px] after:-translate-y-1/2",
                "after:rounded-full after:bg-gradient-brand after:scale-y-0 after:transition-transform after:duration-300",
                "motion-reduce:transition-none motion-reduce:hover:translate-x-0",
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
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
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
          <span
            aria-hidden="true"
            className="hairline-brand pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-px opacity-50"
          />
          <div className="relative flex h-16 items-center gap-3 px-4 sm:px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-muted-foreground hover:text-foreground lg:hidden"
            >
              <Menu className="size-5" />
            </button>
            <div>
              <h1 className="font-display text-h3 leading-tight font-extrabold">{title}</h1>
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

        <motion.main
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 px-4 py-6 sm:px-6 lg:px-8"
        >
          {accessDenied ? (
            <div className="mx-auto flex min-h-[420px] max-w-xl flex-col items-center justify-center text-center">
              <span className="bg-error/10 text-error grid size-14 place-items-center rounded-2xl text-2xl">
                🔒
              </span>
              <h2 className="font-display mt-5 text-xl font-extrabold">
                This workspace is restricted
              </h2>
              <p className="text-muted-foreground mt-2 max-w-md text-sm leading-relaxed">
                Your signed-in role does not have access to this area. Use the workspace navigation
                to open the tools available to you.
              </p>
              <Button asChild className="bg-gradient-brand shadow-glow mt-5 border-0">
                <Link to="/app">Return to my dashboard</Link>
              </Button>
            </div>
          ) : (
            children
          )}
        </motion.main>
      </div>
    </div>
  );
}
