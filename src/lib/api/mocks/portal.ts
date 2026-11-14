import { registerMock } from "@/lib/api/client";
import type { ApiRequestInit } from "@/lib/api/client";
import { ApiError } from "@/lib/errors";
import type { PortalSummary } from "@/lib/api/portal";

export function registerPortalMocks(): void {
  registerMock("GET", "/v1/portal/summary", async (init: ApiRequestInit) => {
    const portal = new URLSearchParams((init.path ?? "").split("?")[1] ?? "").get("portal") ?? "";
    const summary: PortalSummary = {
      portal,
      group: "learner",
      restricted: false,
      generatedAt: new Date().toISOString(),
      metrics: [
        { key: "courses", label: "Enrolled courses", value: 3, format: "number" },
        { key: "pending", label: "Assignments to do", value: 4, format: "number" },
        { key: "dueWeek", label: "Due in 7 days", value: 2, format: "number" },
        { key: "certificates", label: "Certificates", value: 1, format: "number" },
      ],
      activity: [
        {
          id: "m1",
          title: "New assignment: REST API design",
          body: "Backend & APIs · due Fri 3 Oct, 23:59 WAT",
          time: new Date().toISOString(),
          engine: "learning",
          read: false,
        },
      ],
    };
    return summary;
  });
  registerMock("GET", "/v1/instructor/assignment-roster/courses", async () => ({
    items: [],
    truncated: false,
  }));
  registerMock("GET", "/v1/instructor/assignment-roster", async () => ({ grant: null }));
  registerMock("PUT", "/v1/instructor/assignment-roster", async () => {
    throw new ApiError(503, "DEMO_READ_ONLY", "Roster changes are not saved in demo mode.");
  });
  registerMock("POST", "/v1/instructor/assignments", async () => {
    throw new ApiError(503, "DEMO_READ_ONLY", "Assignment publication is not saved in demo mode.");
  });
}
