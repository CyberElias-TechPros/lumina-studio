import { useState, type ReactNode } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  BarChart3,
  Boxes,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  Receipt,
  ScrollText,
  Settings,
  ShieldCheck,
  Truck,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { useAuth } from "../lib/auth.tsx";

interface NavItem {
  to: string;
  label: string;
  icon: typeof FileText;
  capability: string;
  end?: boolean;
}

const NAV: NavItem[] = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, capability: "read:dashboard", end: true },
  { to: "/invoices", label: "Invoices", icon: FileText, capability: "read:invoices" },
  { to: "/waybills", label: "Waybills", icon: Truck, capability: "read:waybills" },
  { to: "/customers", label: "Customers", icon: Users, capability: "read:customers" },
  { to: "/products", label: "Stock", icon: Boxes, capability: "read:products" },
  { to: "/purchases", label: "Purchases", icon: Receipt, capability: "read:purchases" },
  { to: "/suppliers", label: "Suppliers", icon: ScrollText, capability: "read:suppliers" },
  { to: "/expenses", label: "Expenses", icon: Wallet, capability: "read:expenses" },
  { to: "/reports", label: "Reports", icon: BarChart3, capability: "read:reports" },
  { to: "/users", label: "Team", icon: ShieldCheck, capability: "read:users" },
  { to: "/audit", label: "Audit log", icon: ScrollText, capability: "read:audit" },
  { to: "/settings", label: "Settings", icon: Settings, capability: "read:dashboard" },
];

export function Layout({ children }: { children: ReactNode }) {
  const { user, signOut, can } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const items = NAV.filter((item) => can(item.capability));

  const nav = (
    <nav className="flex flex-1 flex-col gap-0.5 px-3 py-4" aria-label="Main">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          onClick={() => setOpen(false)}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              isActive ? "bg-brand-700 text-white" : "text-brand-100 hover:bg-brand-800"
            }`
          }
        >
          <item.icon className="h-4 w-4 shrink-0" aria-hidden />
          {item.label}
        </NavLink>
      ))}
    </nav>
  );

  const footer = (
    <div className="border-t border-brand-800 px-3 py-3">
      <div className="px-3 pb-2">
        <p className="truncate text-sm font-medium text-white">{user?.name}</p>
        <p className="truncate text-xs text-brand-200">{user?.email}</p>
        <p className="mt-1 text-xs text-brand-300 uppercase">{user?.role}</p>
      </div>
      <button
        type="button"
        onClick={async () => {
          await signOut();
          navigate("/login");
        }}
        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-brand-100 hover:bg-brand-800"
      >
        <LogOut className="h-4 w-4" aria-hidden />
        Sign out
      </button>
    </div>
  );

  return (
    <div className="flex min-h-screen">
      {/* Desktop sidebar */}
      <aside className="no-print hidden w-60 shrink-0 flex-col bg-brand-900 lg:flex">
        <div className="flex items-center gap-2 px-5 py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 font-bold text-white">
            DL
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-white">Delgra</p>
            <p className="text-xs text-brand-300">Ledger</p>
          </div>
        </div>
        {nav}
        {footer}
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="no-print fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-ink-900/60" onClick={() => setOpen(false)} aria-hidden />
          <aside className="absolute inset-y-0 left-0 flex w-64 flex-col bg-brand-900">
            <div className="flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 font-bold text-white">
                  DL
                </div>
                <p className="text-sm font-semibold text-white">Delgra</p>
              </div>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="rounded-md p-1 text-brand-200 hover:bg-brand-800"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            {nav}
            {footer}
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="no-print sticky top-0 z-30 flex items-center gap-3 border-b border-ink-200 bg-white px-4 py-3 lg:hidden">
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="rounded-md p-1.5 text-ink-700 hover:bg-ink-100"
          >
            <Menu className="h-5 w-5" />
          </button>
          <Link to="/" className="text-sm font-semibold">
            Delgra Ledger
          </Link>
        </header>
        <main className="min-w-0 flex-1 px-4 py-5 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="no-print mb-5 flex flex-wrap items-start justify-between gap-3">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-ink-900 sm:text-2xl">{title}</h1>
        {description && <p className="mt-1 text-sm text-ink-500">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}
