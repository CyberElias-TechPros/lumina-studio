import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { createAppQueryClient } from "./lib/query/client";

export const getRouter = () => {
  const queryClient = createAppQueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    // Route continuity: client-side navigations cross-fade through the
    // browser's View Transitions API. Browsers without support (and
    // reduced-motion users, via CSS) get an instant cut instead.
    defaultViewTransition: true,
  });

  return router;
};
