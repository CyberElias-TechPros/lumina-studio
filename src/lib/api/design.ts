import { apiFetch } from "@/lib/api/client";
import type { Paginated } from "@/lib/api/types";

export interface DesignComponent {
  id: string;
  t: string;
  d: string;
  states: number;
  usage: number;
  status: string;
}

export interface DesignFlow {
  id: string;
  t: string;
  steps: number;
  decisions: number;
  status: string;
  list: string[];
}

export interface DesignPrototype {
  id: string;
  t: string;
  version: string;
  status: string;
  feedback: number;
  owner: string;
}

export interface DesignColorToken {
  id: string;
  kind: "color";
  t: string;
  v: string;
  hex: string;
  deprecated: boolean;
}

export interface DesignTypeToken {
  id: string;
  kind: "type";
  t: string;
  v: string;
  family: string;
  status: string;
}

export type DesignToken = DesignColorToken | DesignTypeToken;

export interface DesignVersion {
  id: string;
  t: string;
  change: string;
  editor: string;
  when: string;
  status: string;
}

export interface CollaborationThread {
  id: string;
  t: string;
  d: string;
  author: string;
  status: string;
}

export interface DesignExport {
  id: string;
  t: string;
  format: string;
  size: string;
  owner: string;
  status: string;
}

export interface SystemComponent {
  id: string;
  t: string;
  variants: number;
  states: number;
  usage: number;
  status: string;
}

export interface DesignKpi {
  id: string;
  value: number;
}

export function fetchDesignComponents(): Promise<Paginated<DesignComponent>> {
  return apiFetch<Paginated<DesignComponent>>("/v1/design/components");
}

export function fetchDesignFlows(): Promise<Paginated<DesignFlow>> {
  return apiFetch<Paginated<DesignFlow>>("/v1/design/flows");
}

export function fetchDesignPrototypes(): Promise<Paginated<DesignPrototype>> {
  return apiFetch<Paginated<DesignPrototype>>("/v1/design/prototypes");
}

export function fetchDesignTokens(): Promise<Paginated<DesignToken>> {
  return apiFetch<Paginated<DesignToken>>("/v1/design/tokens");
}

export function fetchDesignVersions(): Promise<Paginated<DesignVersion>> {
  return apiFetch<Paginated<DesignVersion>>("/v1/design/versions");
}

export function fetchCollaborationThreads(): Promise<Paginated<CollaborationThread>> {
  return apiFetch<Paginated<CollaborationThread>>("/v1/design/collaboration");
}

export function fetchDesignExports(): Promise<Paginated<DesignExport>> {
  return apiFetch<Paginated<DesignExport>>("/v1/design/exports");
}

export function fetchSystemComponents(): Promise<Paginated<SystemComponent>> {
  return apiFetch<Paginated<SystemComponent>>("/v1/design/system-components");
}

export function fetchDesignKpis(): Promise<Paginated<DesignKpi>> {
  return apiFetch<Paginated<DesignKpi>>("/v1/design/kpis");
}
