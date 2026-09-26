import { registerMock } from "@/lib/api/client";
import type { ApiRequestInit } from "@/lib/api/client";
import type { PortalSummary } from "@/lib/api/portal";
import type { PublishAssignmentInput } from "@/lib/api/instructor";

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
  registerMock("POST", "/v1/instructor/assignments", async (init: ApiRequestInit) => {
    const body = init.body as PublishAssignmentInput;
    return {
      groupId: "grp-mock",
      recipients: 24,
      due: new Date(body.dueAt).toLocaleString("en-GB", { timeZone: "Africa/Lagos" }),
      dueAt: body.dueAt,
      course: body.courseSlug,
    };
  });
}
