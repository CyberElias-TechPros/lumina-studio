import { createFileRoute } from "@tanstack/react-router";
import { redirectPublic } from "@/lib/legacy-public";

export const Route = createFileRoute("/programs/compare")({
  beforeLoad: () => redirectPublic("/classes"),
  component: () => null,
});
