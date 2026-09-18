import { createFileRoute } from "@tanstack/react-router";
import { redirectPublic } from "@/lib/legacy-public";

export const Route = createFileRoute("/pricing")({
  beforeLoad: () => redirectPublic("/classes"),
  component: () => null,
});
