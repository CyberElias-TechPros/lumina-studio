import { createFileRoute } from "@tanstack/react-router";
import { redirectPublic } from "@/lib/legacy-public";

export const Route = createFileRoute("/work")({
  beforeLoad: () => redirectPublic("/about"),
  component: () => null,
});
