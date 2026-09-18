import { createFileRoute } from "@tanstack/react-router";
import { redirectPublic } from "@/lib/legacy-public";

export const Route = createFileRoute("/partners")({
  beforeLoad: () => redirectPublic("/contact"),
  component: () => null,
});
