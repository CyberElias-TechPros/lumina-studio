import { registerMock } from "@/lib/api/client";
import type { ApiRequestInit } from "@/lib/api/client";
import type { PortalSummary } from "@/lib/api/portal";

export function registerPortalMocks(): void {
  const rosterGrants: Record<
    string,
    {
      instructorId: string;
      studentId: string;
      courseSlug: string;
      active: boolean;
      expiresAt: string;
    }
  > = {};

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
    items: [
      {
        slug: "full-stack-software-development",
        title: "Full-Stack Software Development",
        recipients: 12,
      },
      { slug: "cloud-devops", title: "Cloud Engineering & DevOps", recipients: 8 },
    ],
    truncated: false,
  }));
  registerMock("GET", "/v1/instructor/assignment-roster", async (init: ApiRequestInit) => {
    const query = new URLSearchParams((init.path ?? "").split("?")[1] ?? "");
    const key = `${query.get("instructorId") ?? ""}:${query.get("studentId") ?? ""}:${query.get("courseSlug") ?? ""}`;
    return { grant: rosterGrants[key] ?? null };
  });
  registerMock("PUT", "/v1/instructor/assignment-roster", async (init: ApiRequestInit) => {
    const body = (init.body ?? {}) as {
      instructorId?: string;
      studentId?: string;
      courseSlug?: string;
      active?: boolean;
      expiresAt?: string;
    };
    const key = `${body.instructorId ?? ""}:${body.studentId ?? ""}:${body.courseSlug ?? ""}`;
    const grant = {
      instructorId: body.instructorId ?? "",
      studentId: body.studentId ?? "",
      courseSlug: body.courseSlug ?? "",
      active: body.active ?? true,
      expiresAt: body.expiresAt ?? new Date(Date.now() + 90 * 86_400_000).toISOString(),
    };
    rosterGrants[key] = grant;
    return { grant };
  });
  registerMock("POST", "/v1/instructor/assignments", async (init: ApiRequestInit) => {
    const body = (init.body ?? {}) as {
      courseSlug?: string;
      dueAt?: string;
    };
    const dueAt = body.dueAt ?? new Date(Date.now() + 7 * 86_400_000).toISOString();
    return {
      groupId: `pub-${Date.now()}`,
      recipients: 12,
      due: new Date(dueAt).toLocaleDateString("en-GB", { month: "short", day: "numeric" }),
      dueAt,
      course: body.courseSlug ?? "full-stack-software-development",
    };
  });
}
