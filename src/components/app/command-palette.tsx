"use client";

import type { ReactNode } from "react";
import { useNavigate } from "@/lib/next-compat/router";
import { Bell, CalendarDays, MessageSquare, Settings } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

type NavigationItem = {
  label: string;
  icon: ReactNode;
  to?: string;
};

const commonItems = [
  { label: "Calendar", icon: <CalendarDays className="size-4" />, to: "/app/calendar" },
  { label: "Messages", icon: <MessageSquare className="size-4" />, to: "/app/messages" },
  { label: "Notifications", icon: <Bell className="size-4" />, to: "/app/notifications" },
  { label: "Account & security", icon: <Settings className="size-4" />, to: "/app/account" },
];

export function CommandPalette({
  open,
  onOpenChange,
  workspaceLabel,
  navigation,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  workspaceLabel: string;
  navigation: NavigationItem[];
}) {
  const navigate = useNavigate();
  const workspaceItems = navigation.flatMap(({ label, icon, to }) =>
    to && !commonItems.some((item) => item.to === to) ? [{ label, icon, to }] : [],
  );

  const goTo = (to: string) => {
    onOpenChange(false);
    void navigate({ to });
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search your workspace…" aria-label="Search pages and actions" />
      <CommandList>
        <CommandEmpty>No matching pages. Try another search.</CommandEmpty>
        <CommandGroup heading={`${workspaceLabel} workspace`}>
          {workspaceItems.map((item) => (
            <CommandItem key={item.to} onSelect={() => goTo(item.to)}>
              {item.icon}
              <span>{item.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Quick links">
          {commonItems.map((item) => (
            <CommandItem key={item.to} onSelect={() => goTo(item.to)}>
              {item.icon}
              <span>{item.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
