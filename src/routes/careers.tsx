import { createFileRoute } from "@tanstack/react-router";
import { redirectPublic } from "@/lib/legacy-public";

export const Route = createFileRoute("/careers")({
  beforeLoad: () => redirectPublic("/contact"),
  component: () => null,
});
