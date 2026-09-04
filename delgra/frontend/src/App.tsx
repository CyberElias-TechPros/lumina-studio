import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Spinner } from "./components/ui.tsx";
import { Layout } from "./components/Layout.tsx";
import { useAuth } from "./lib/auth.tsx";
import { AuthPage } from "./pages/Auth.tsx";
import { DashboardPage } from "./pages/Dashboard.tsx";
import { InvoicesPage } from "./pages/Invoices.tsx";
import { InvoiceDetailPage } from "./pages/InvoiceDetail.tsx";
import { WaybillsPage } from "./pages/Waybills.tsx";
import { WaybillDetailPage } from "./pages/WaybillDetail.tsx";
import { CustomersPage } from "./pages/Customers.tsx";
import { ProductsPage } from "./pages/Products.tsx";
import { SuppliersPage } from "./pages/Suppliers.tsx";
import { PurchasesPage } from "./pages/Purchases.tsx";
import { ExpensesPage } from "./pages/Expenses.tsx";
import { ReportsPage } from "./pages/Reports.tsx";
import { TeamPage } from "./pages/Team.tsx";
import { AuditPage } from "./pages/Audit.tsx";
import { SettingsPage } from "./pages/Settings.tsx";
import { SharePage } from "./pages/Share.tsx";
import { NotFoundPage } from "./pages/NotFound.tsx";
import type { ReactNode } from "react";

/** Gate for everything under the app shell. */
function RequireAuth({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="p-10"><Spinner label="Checking your session" /></div>;
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  return <Layout>{children}</Layout>;
}

export function App() {
  const { user, loading } = useAuth();

  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={user && !loading ? <Navigate to="/" replace /> : <AuthPage mode="login" />} />
      <Route path="/register" element={user && !loading ? <Navigate to="/" replace /> : <AuthPage mode="register" />} />
      <Route path="/share/:token" element={<SharePage />} />

      {/* Signed in */}
      <Route path="/" element={<RequireAuth><DashboardPage /></RequireAuth>} />
      <Route path="/invoices" element={<RequireAuth><InvoicesPage /></RequireAuth>} />
      <Route path="/invoices/:id" element={<RequireAuth><InvoiceDetailPage /></RequireAuth>} />
      <Route path="/waybills" element={<RequireAuth><WaybillsPage /></RequireAuth>} />
      <Route path="/waybills/:id" element={<RequireAuth><WaybillDetailPage /></RequireAuth>} />
      <Route path="/customers" element={<RequireAuth><CustomersPage /></RequireAuth>} />
      <Route path="/products" element={<RequireAuth><ProductsPage /></RequireAuth>} />
      <Route path="/suppliers" element={<RequireAuth><SuppliersPage /></RequireAuth>} />
      <Route path="/purchases" element={<RequireAuth><PurchasesPage /></RequireAuth>} />
      <Route path="/expenses" element={<RequireAuth><ExpensesPage /></RequireAuth>} />
      <Route path="/reports" element={<RequireAuth><ReportsPage /></RequireAuth>} />
      <Route path="/users" element={<RequireAuth><TeamPage /></RequireAuth>} />
      <Route path="/audit" element={<RequireAuth><AuditPage /></RequireAuth>} />
      <Route path="/settings" element={<RequireAuth><SettingsPage /></RequireAuth>} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
