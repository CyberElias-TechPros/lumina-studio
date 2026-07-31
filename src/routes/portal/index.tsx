import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Banknote,
  Briefcase,
  BriefcaseBusiness,
  Building2,
  DoorOpen,
  GraduationCap,
  HandHeart,
  HeartHandshake,
  Landmark,
  LayoutDashboard,
  Megaphone,
  MonitorCheck,
  ShieldCheck,
  Truck,
  UserRound,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/portal/")({
  head: () => ({
    meta: [
      { title: "Portals — CEA-OS | Cyber Elias Academy" },
      {
        name: "description",
        content:
          "Every role on the CEA-OS platform has its own portal — students, instructors, mentors, parents, employers, staff and leadership.",
      },
    ],
  }),
  component: PortalHub,
});

const portals = [
  {
    icon: GraduationCap,
    label: "Student",
    path: "/portal/student",
    desc: "Learning hub, grades, finance, portfolio",
    tone: "text-learning bg-learning/10",
  },
  {
    icon: UserRound,
    label: "Instructor",
    path: "/portal/instructor",
    desc: "Course builder, gradebook, analytics",
    tone: "text-erp bg-erp/10",
  },
  {
    icon: HeartHandshake,
    label: "Mentor",
    path: "/portal/mentor",
    desc: "Mentees, sessions, check-ins",
    tone: "text-community bg-community/10",
  },
  {
    icon: Users,
    label: "Parent",
    path: "/portal/parent",
    desc: "Progress, bills, consent",
    tone: "text-primary bg-primary/10",
  },
  {
    icon: BriefcaseBusiness,
    label: "Employer",
    path: "/portal/employer",
    desc: "Jobs, talent search, pipeline",
    tone: "text-career bg-career/10",
  },
  {
    icon: Building2,
    label: "Client",
    path: "/portal/client",
    desc: "Projects, deliverables, invoices",
    tone: "text-services bg-services/10",
  },
  {
    icon: HeartHandshake,
    label: "Partner",
    path: "/portal/partner",
    desc: "Referrals, co-branding, reports",
    tone: "text-success bg-success/10",
  },
  {
    icon: GraduationCap,
    label: "Alumni",
    path: "/portal/alumni",
    desc: "Network, jobs, events, giving",
    tone: "text-career bg-career/10",
  },
  {
    icon: ShieldCheck,
    label: "Registrar",
    path: "/portal/registrar",
    desc: "Records, cohort management, transcripts",
    tone: "text-primary bg-primary/10",
  },
  {
    icon: ShieldCheck,
    label: "Admissions",
    path: "/portal/admissions",
    desc: "Pipeline, assessment, offers",
    tone: "text-learning bg-learning/10",
  },
  {
    icon: ShieldCheck,
    label: "Finance",
    path: "/portal/finance",
    desc: "Invoices, instalments, scholarships",
    tone: "text-success bg-success/10",
  },
  {
    icon: ShieldCheck,
    label: "Career Services",
    path: "/portal/career-services",
    desc: "Placements, partners, employer visits",
    tone: "text-career bg-career/10",
  },
  {
    icon: ShieldCheck,
    label: "Quality Assurance",
    path: "/portal/quality",
    desc: "Reviews, audits, accreditation",
    tone: "text-erp bg-erp/10",
  },
  {
    icon: ShieldCheck,
    label: "Academic Board",
    path: "/portal/academic-board",
    desc: "Curriculum, examinations, standards",
    tone: "text-services bg-services/10",
  },
  {
    icon: LayoutDashboard,
    label: "Executive",
    path: "/portal/executive",
    desc: "KPIs, dashboards, board reports",
    tone: "text-ink bg-ink/10",
  },
  {
    icon: ShieldCheck,
    label: "System Admin",
    path: "/portal/admin",
    desc: "Users, roles, security, audit",
    tone: "text-warning bg-warning/10",
  },
  {
    icon: DoorOpen,
    label: "Reception",
    path: "/portal/receptionist",
    desc: "Visitors, calls, desk handover",
    tone: "text-primary bg-primary/10",
  },
  {
    icon: ShieldCheck,
    label: "Operations",
    path: "/portal/operations",
    desc: "Facilities, fleet, supplies, security",
    tone: "text-services bg-services/10",
  },
  {
    icon: Users,
    label: "HR",
    path: "/portal/hr",
    desc: "Onboarding, leave, culture",
    tone: "text-success bg-success/10",
  },
  {
    icon: Megaphone,
    label: "Marketing",
    path: "/portal/marketing",
    desc: "Campaigns, leads, content",
    tone: "text-learning bg-learning/10",
  },
  {
    icon: MonitorCheck,
    label: "IT Support",
    path: "/portal/it-support",
    desc: "Tickets, devices, network",
    tone: "text-erp bg-erp/10",
  },
  {
    icon: Banknote,
    label: "Accounting",
    path: "/portal/accountant",
    desc: "Invoices, budgets, reconciliation",
    tone: "text-career bg-career/10",
  },
  {
    icon: Truck,
    label: "Supplier",
    path: "/portal/supplier",
    desc: "POs, deliveries, invoices",
    tone: "text-warning bg-warning/10",
  },
  {
    icon: HandHeart,
    label: "Volunteer",
    path: "/portal/volunteer",
    desc: "Shifts, hours, impact",
    tone: "text-community bg-community/10",
  },
  {
    icon: Briefcase,
    label: "Intern",
    path: "/portal/intern",
    desc: "Projects, milestones, mentor",
    tone: "text-primary bg-primary/10",
  },
  {
    icon: Landmark,
    label: "Government",
    path: "/portal/government",
    desc: "Compliance, accreditation, reports",
    tone: "text-services bg-services/10",
  },
  {
    icon: HeartHandshake,
    label: "NGO Partner",
    path: "/portal/ngo",
    desc: "Programs, beneficiaries, funding",
    tone: "text-success bg-success/10",
  },
] as const;

function PortalHub() {
  return (
    <AppShell
      roleKey="student"
      title="CEA-OS portals"
      subtitle="One platform, one identity, every role"
    >
      <p className="text-muted-foreground max-w-2xl text-sm">
        CEA-OS gives every person in the ecosystem a dedicated workspace. Pick your portal —
        everything else is connected underneath.
      </p>
      <StaggerGroup className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {portals.map((p) => (
          <StaggerItem key={p.path}>
            <Link
              to={p.path}
              className="group bg-card shadow-soft hover:shadow-elevated flex h-full flex-col rounded-2xl border p-5 transition-all hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between">
                <span className={cn("grid size-11 place-items-center rounded-xl", p.tone)}>
                  <p.icon className="size-5" />
                </span>
                <ArrowRight className="text-muted-foreground group-hover:text-primary size-4 transition-colors" />
              </div>
              <p className="font-display mt-4 text-sm font-extrabold">{p.label}</p>
              <p className="text-muted-foreground mt-1 flex-1 text-xs leading-relaxed">{p.desc}</p>
            </Link>
          </StaggerItem>
        ))}
      </StaggerGroup>

      <Reveal className="mt-8">
        <Card className="bg-gradient-ink text-ink-foreground shadow-elevated border-0">
          <CardContent className="flex flex-wrap items-center gap-4 p-6">
            <span className="bg-ink-foreground/10 grid size-10 place-items-center rounded-xl">
              <LayoutDashboard className="size-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-display text-sm font-extrabold">Instructor, mentor or staff?</p>
              <p className="text-ink-foreground/70 text-xs">
                Portals for staff, contractors and partners appear in your sidebar after you sign in
                with your staff account.
              </p>
            </div>
            <Badge className="bg-ink-foreground/15 text-ink-foreground border-0">
              Access-controlled
            </Badge>
          </CardContent>
        </Card>
      </Reveal>
    </AppShell>
  );
}
