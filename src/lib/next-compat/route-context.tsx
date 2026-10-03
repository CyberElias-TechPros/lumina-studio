"use client";

/* eslint-disable react-refresh/only-export-components -- context and its hook are one compatibility unit. */

import { createContext, useContext, type ReactNode } from "react";

export type RouteLocation = {
  pathname: string;
  search: Record<string, string | string[]>;
  searchStr: string;
  hash: string;
  href: string;
};

export type RouteState = {
  params: Record<string, string>;
  search: Record<string, unknown>;
  loaderData: unknown;
  routeContext: Record<string, unknown>;
  location: RouteLocation;
  outlet?: ReactNode;
};

const EMPTY_LOCATION: RouteLocation = {
  pathname: "/",
  search: {},
  searchStr: "",
  hash: "",
  href: "/",
};

const EMPTY_ROUTE_STATE: RouteState = {
  params: {},
  search: {},
  loaderData: undefined,
  routeContext: {},
  location: EMPTY_LOCATION,
};

const RouteStateContext = createContext<RouteState | null>(null);

export function RouteStateProvider({
  value,
  children,
}: {
  value: RouteState;
  children: ReactNode;
}) {
  return <RouteStateContext.Provider value={value}>{children}</RouteStateContext.Provider>;
}

export function useRouteState(): RouteState {
  return useContext(RouteStateContext) ?? EMPTY_ROUTE_STATE;
}
