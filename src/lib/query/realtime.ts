import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePaginatedQuery, flattenPages, useApiQuery } from "@/lib/query/hooks";
import {
  createChatRoom,
  fetchChatMessages,
  fetchChatRooms,
  sendChatMessage,
  type RealtimeMessage,
  type RealtimeRoom,
} from "@/lib/api/realtime";

export const realtimeKeys = {
  rooms: ["realtime", "rooms"] as const,
  messages: (roomId: string) => ["realtime", "rooms", roomId, "messages"] as const,
};

export function useChatRooms() {
  return usePaginatedQuery<RealtimeRoom>(realtimeKeys.rooms, fetchChatRooms);
}

export function useChatRoomsItems(): RealtimeRoom[] {
  return flattenPages(useChatRooms().data?.pages);
}

export function useChatMessages(roomId: string) {
  return useApiQuery<RealtimeMessage[]>(
    realtimeKeys.messages(roomId),
    async () => {
      const page = await fetchChatMessages(roomId);
      return flattenPages([page]);
    },
    { enabled: roomId.length > 0 },
  );
}

export function useCreateChatRoom() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: { name: string; kind?: string }) => createChatRoom(input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: realtimeKeys.rooms });
    },
  });
}

export function useSendChatMessage(roomId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: string) => sendChatMessage(roomId, body),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: realtimeKeys.messages(roomId) });
    },
  });
}
