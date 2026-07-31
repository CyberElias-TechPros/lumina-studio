import { useNavigate } from "@tanstack/react-router";
import {
  Bell,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  FileText,
  GraduationCap,
  HeartHandshake,
  LayoutDashboard,
  MessageSquare,
  Search,
  Settings,
  ShieldCheck,
  Users,
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

const groups = [
  {
    label: "Go to",
    items: [
      { label: "Student dashboard", icon: LayoutDashboard, to: "/app" },
      { label: "Learning hub", icon: BookOpen, to: "/app/learn" },
      { label: "Assignments", icon: FileText, to: "/app/assignments" },
      { label: "Grades", icon: GraduationCap, to: "/app/grades" },
      { label: "Calendar", icon: CalendarDays, to: "/app/calendar" },
      { label: "Messages", icon: MessageSquare, to: "/app/messages" },
      { label: "Portfolio", icon: BriefcaseBusiness, to: "/app/portfolio" },
      { label: "Certificates", icon: HeartHandshake, to: "/app/certificates" },
      { label: "Finance", icon: Building2, to: "/app/finance" },
    ],
  },
  {
    label: "Actions",
    items: [
      { label: "View notifications", icon: Bell, to: "/app/notifications" },
      { label: "Reports builder", icon: FileText, to: "/app/reports" },
      { label: "Portal directory", icon: Users, to: "/portal" },
      { label: "Account settings", icon: Settings, to: "/app" },
    ],
  },
];

export function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const navigate = useNavigate();

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Type a command or search…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {groups.map((g) => (
          <div key={g.label}>
            <CommandGroup heading={g.label}>
              {g.items.map((item) => (
                <CommandItem
                  key={item.label}
                  onSelect={() => {
                    onOpenChange(false);
                    navigate({ to: item.to });
                  }}
                >
                  <item.icon className="size-4" />
                  <span>{item.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
          </div>
        ))}
      </CommandList>
    </CommandDialog>
  );
}
