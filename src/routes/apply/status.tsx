import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Outlet } from "@/lib/next-compat/router";

export const Route = createFileRoute("/apply/status")({
  component: ApplyStatusLayout,
});

function ApplyStatusLayout() {
  return <Outlet />;
}
