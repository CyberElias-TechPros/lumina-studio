import { createFileRoute } from "@/lib/next-compat/route-definition";
import { redirectPublic } from "@/lib/legacy-public";

export const Route = createFileRoute("/pricing")({
  beforeLoad: () => redirectPublic("/classes"),
  component: () => null,
});
