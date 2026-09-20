import { createFileRoute } from "@tanstack/react-router";
import { redirectPublic } from "@/lib/legacy-public";

export const Route = createFileRoute("/services")({
  beforeLoad: () => redirectPublic("/contact"),
  component: () => null,
});
