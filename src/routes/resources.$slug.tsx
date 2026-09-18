import { createFileRoute } from "@tanstack/react-router";
import { redirectPublic } from "@/lib/legacy-public";

export const Route = createFileRoute("/resources/$slug")({
  beforeLoad: () => redirectPublic("/classes"),
  component: () => null,
});
