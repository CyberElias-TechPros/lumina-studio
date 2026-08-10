import { useCallback, useEffect, useRef, useState } from "react";

export type WsStatus = "connecting" | "open" | "closed" | "error";

export interface WsMessage {
  type: string;
  body?: string;
  channel?: string;
  users?: number;
  user?: { id: string; name: string };
  at?: string;
}

export interface UseWebSocketResult {
  status: WsStatus;
  users: number;
  messages: WsMessage[];
  send: (body: string) => void;
  error: string | null;
}

/**
 * Minimal WebSocket client for the realtime fan-out layer. Works in the
 * browser (cookies carry the session); on the server / in SSR it stays
 * closed. Falls back gracefully — callers should still persist via REST.
 */
export function useWebSocket(path: string | undefined, enabled: boolean): UseWebSocketResult {
  const [status, setStatus] = useState<WsStatus>("closed");
  const [users, setUsers] = useState(0);
  const [messages, setMessages] = useState<WsMessage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !enabled || !path) return;

    let socket: WebSocket | null = null;
    let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
    let closedByUs = false;

    const connect = () => {
      if (!mountedRef.current) return;
      const proto = window.location.protocol === "https:" ? "wss:" : "ws:";
      const url = `${proto}//${window.location.host}${path}`;
      setError(null);
      setStatus("connecting");

      try {
        socket = new WebSocket(url);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to connect");
        setStatus("error");
        return;
      }

      socketRef.current = socket;

      socket.onopen = () => {
        if (!mountedRef.current) return;
        setStatus("open");
      };

      socket.onmessage = (event) => {
        if (!mountedRef.current) return;
        try {
          const msg = JSON.parse(event.data) as WsMessage;
          if (msg.type === "connected") {
            setUsers(msg.users ?? 0);
          } else {
            setMessages((prev) => [...prev.slice(-99), msg]);
          }
        } catch {
          /* ignore malformed frames */
        }
      };

      socket.onerror = () => {
        if (!mountedRef.current) return;
        setError("Connection error");
        setStatus("error");
      };

      socket.onclose = () => {
        socketRef.current = null;
        if (!mountedRef.current || closedByUs) return;
        setStatus("closed");
      };
    };

    connect();

    return () => {
      closedByUs = true;
      if (reconnectTimer) clearTimeout(reconnectTimer);
      if (socketRef.current) {
        try {
          socketRef.current.close();
        } catch {
          /* already closing */
        }
      }
      socketRef.current = null;
    };
  }, [path, enabled]);

  const send = useCallback(
    (body: string) => {
      const socket = socketRef.current;
      if (!socket || socket.readyState !== WebSocket.OPEN) {
        setError("Not connected — message not sent");
        return;
      }
      socket.send(JSON.stringify({ type: "message", body }));
    },
    [],
  );

  return { status, users, messages, send, error };
}
