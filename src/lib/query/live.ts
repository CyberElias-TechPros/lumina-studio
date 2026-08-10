import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePaginatedQuery, flattenPages, useApiQuery } from "@/lib/query/hooks";
import {
  castLivePollVote,
  fetchLiveClass,
  fetchLiveClassChat,
  fetchLiveClassPolls,
  fetchLiveClasses,
  fetchWhiteboardOps,
  postWhiteboardOp,
  sendLiveClassChat,
  type LiveClassSession,
  type LivePoll,
  type WhiteboardOp,
} from "@/lib/api/live";
import type { RealtimeMessage } from "@/lib/api/realtime";

export const liveKeys = {
  all: ["live"] as const,
  classes: ["live", "classes"] as const,
  class: (id: string) => ["live", "classes", id] as const,
  chat: (id: string) => ["live", "classes", id, "chat"] as const,
  polls: (id: string) => ["live", "classes", id, "polls"] as const,
  whiteboard: (id: string) => ["live", "classes", id, "whiteboard"] as const,
};

export function useLiveClasses() {
  return usePaginatedQuery<LiveClassSession>(liveKeys.classes, fetchLiveClasses);
}

export function useLiveClassesItems(): LiveClassSession[] {
  return flattenPages(useLiveClasses().data?.pages);
}

export function useLiveClass(id: string) {
  return useApiQuery<LiveClassSession>(liveKeys.class(id), () => fetchLiveClass(id), {
    enabled: id.length > 0,
  });
}

export function useLiveClassChat(classId: string) {
  return useApiQuery<RealtimeMessage[]>(
    liveKeys.chat(classId),
    async () => {
      const page = await fetchLiveClassChat(classId);
      return flattenPages([page]);
    },
    { enabled: classId.length > 0 },
  );
}

export function useSendLiveClassChat(classId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: string) => sendLiveClassChat(classId, body),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: liveKeys.chat(classId) });
    },
  });
}

export function useLiveClassPolls(classId: string) {
  return useApiQuery<LivePoll[]>(
    liveKeys.polls(classId),
    async () => {
      const page = await fetchLiveClassPolls(classId);
      return flattenPages([page]);
    },
    { enabled: classId.length > 0 },
  );
}

export function useCastLivePollVote(classId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: { pollId: string; option: string }) =>
      castLivePollVote(classId, input.pollId, input.option),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: liveKeys.polls(classId) });
    },
  });
}

export function useWhiteboardOps(classId: string) {
  return useApiQuery<WhiteboardOp[]>(liveKeys.whiteboard(classId), () => fetchWhiteboardOps(classId), {
    enabled: classId.length > 0,
  });
}

export function usePostWhiteboardOp(classId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (op: string) => postWhiteboardOp(classId, op),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: liveKeys.whiteboard(classId) });
    },
  });
}
