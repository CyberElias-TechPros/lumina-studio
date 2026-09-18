import { createFileRoute } from "@tanstack/react-router";
import { redirectPublic } from "@/lib/legacy-public";

export const Route = createFileRoute("/library/")({
  beforeLoad: () => redirectPublic("/classes"),
  component: () => null,
});
