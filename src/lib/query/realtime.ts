import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiQuery, usePaginatedQuery, flattenPages } from "@/lib/query/hooks";
import {
  createChatRoom,
  fetchChatMessages,
  fetchChatRooms,
  fetchRoomMembers,
  grantRoomMember,
  revokeRoomMember,
  sendChatMessage,
  type RealtimeMessage,
  type RealtimeRoom,
  type RoomMember,
} from "@/lib/api/realtime";

export const realtimeKeys = {
  rooms: ["realtime", "rooms"] as const,
  messages: (roomId: string) => ["realtime", "rooms", roomId, "messages"] as const,
  members: (roomId: string) => ["realtime", "rooms", roomId, "members"] as const,
};

export function useChatRooms() {
  return usePaginatedQuery<RealtimeRoom>(realtimeKeys.rooms, fetchChatRooms);
}

export function useChatRoomsItems(): RealtimeRoom[] {
  return flattenPages(useChatRooms().data?.pages);
}

export function useChatMessages(roomId: string) {
  return usePaginatedQuery<RealtimeMessage>(
    realtimeKeys.messages(roomId),
    (cursor) => fetchChatMessages(roomId, cursor),
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

export function useRoomMembers(roomId: string, enabled: boolean) {
  return useApiQuery<{ items: RoomMember[] }>(
    realtimeKeys.members(roomId),
    () => fetchRoomMembers(roomId),
    { enabled: enabled && roomId.length > 0 },
  );
}

export function useGrantRoomMember(roomId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: { userId: string; expiresAt: string }) => grantRoomMember(roomId, input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: realtimeKeys.members(roomId) });
    },
  });
}

export function useRevokeRoomMember(roomId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) => revokeRoomMember(roomId, userId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: realtimeKeys.members(roomId) });
    },
  });
}
