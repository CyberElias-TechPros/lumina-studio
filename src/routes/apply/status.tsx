import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/apply/status")({
  component: ApplyStatusLayout,
});

function ApplyStatusLayout() {
  return <Outlet />;
}
