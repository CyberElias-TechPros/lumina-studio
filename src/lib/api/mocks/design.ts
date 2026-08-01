/**
 * Mock-mode handlers for the Design suite (Phase 4). Registered via
 * registerDesignMocks() — wired from mocks/index.ts alongside the other suites.
 * Data comes from the canonical mock collections in src/data/design.ts.
 */
import { registerMock } from "@/lib/api/client";
import {
  collaborationThreads,
  designComponents,
  designExports,
  designFlows,
  designKpis,
  designPrototypes,
  designTokens,
  designVersions,
  systemComponents,
} from "@/data/design";

function delay(milliseconds = 120): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export function registerDesignMocks(): void {
  /* Design suite */
  registerMock("GET", "/v1/design/components", async () => {
    await delay();
    return {
      items: designComponents.map((c, i) => ({ id: `cmp-${i + 1}`, ...c })),
      total: designComponents.length,
    };
  });
  registerMock("GET", "/v1/design/flows", async () => {
    await delay();
    return {
      items: designFlows.map((f, i) => ({ id: `flw-${i + 1}`, ...f })),
      total: designFlows.length,
    };
  });
  registerMock("GET", "/v1/design/prototypes", async () => {
    await delay();
    return {
      items: designPrototypes.map((p, i) => ({ id: `prt-${i + 1}`, ...p })),
      total: designPrototypes.length,
    };
  });
  registerMock("GET", "/v1/design/tokens", async () => {
    await delay();
    return {
      items: designTokens.map((t, i) => ({ id: `tkn-${i + 1}`, ...t })),
      total: designTokens.length,
    };
  });
  registerMock("GET", "/v1/design/versions", async () => {
    await delay();
    return {
      items: designVersions.map((v, i) => ({ id: `ver-${i + 1}`, ...v })),
      total: designVersions.length,
    };
  });
  registerMock("GET", "/v1/design/collaboration", async () => {
    await delay();
    return {
      items: collaborationThreads.map((t, i) => ({ id: `thr-${i + 1}`, ...t })),
      total: collaborationThreads.length,
    };
  });
  registerMock("GET", "/v1/design/exports", async () => {
    await delay();
    return {
      items: designExports.map((e, i) => ({ id: `exp-${i + 1}`, ...e })),
      total: designExports.length,
    };
  });
  registerMock("GET", "/v1/design/system-components", async () => {
    await delay();
    return {
      items: systemComponents.map((c, i) => ({ id: `sys-${i + 1}`, ...c })),
      total: systemComponents.length,
    };
  });
  registerMock("GET", "/v1/design/kpis", async () => {
    await delay();
    return {
      items: designKpis.map((k) => ({ ...k })),
      total: designKpis.length,
    };
  });
}
