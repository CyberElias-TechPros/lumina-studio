import { useCallback, useEffect, useRef, useState } from "react";

export type WsStatus = "connecting" | "open" | "closed" | "error" | "reconnecting";

export interface WsMessage {
  type: string;
  id?: string;
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
  send: (body: string, messageId?: string) => void;
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
  const [messageState, setMessageState] = useState<{ path: string; entries: WsMessage[] } | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);
  const socketRef = useRef<{ socket: WebSocket; path: string } | null>(null);
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
    let closedByUs = false;
    let retryTimer: ReturnType<typeof setTimeout> | null = null;
    let attempt = 0;
    /**
     * Reconnect policy.
     *
     * Without this, a single dropped connection killed live chat until the
     * visitor reloaded the page — and the only signal was a small "offline"
     * chip, which reads as "nobody is here" rather than "you are disconnected".
     * Mobile networks drop sockets constantly, so this was the common case, not
     * the edge case.
     *
     * Backoff is exponential with jitter: 1s, 2s, 4s … capped at 30s. The jitter
     * matters because every client in a room loses the connection at the same
     * moment when a server restarts, and without it they all retry in lockstep
     * and knock the server over again.
     */
    const baseDelayMs = 1000;
    const maxDelayMs = 30_000;
    const nextDelay = () => {
      const exp = Math.min(maxDelayMs, baseDelayMs * 2 ** attempt);
      return Math.round(exp * (0.75 + Math.random() * 0.5));
    };

    setMessageState({ path, entries: [] });
    setUsers(0);

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

      socketRef.current = { socket, path };

      socket.onopen = () => {
        if (!mountedRef.current || closedByUs) return;
        attempt = 0;
        setError(null);
        setStatus("open");
      };

      socket.onmessage = (event) => {
        if (!mountedRef.current || closedByUs) return;
        try {
          const msg = JSON.parse(event.data) as WsMessage;
          if (msg.type === "connected") {
            setUsers(msg.users ?? 0);
          } else {
            setMessageState((prev) => {
              const entries = prev?.path === path ? prev.entries : [];
              if (msg.id && entries.some((entry) => entry.id === msg.id)) return prev;
              return { path, entries: [...entries.slice(-99), msg] };
            });
          }
        } catch {
          /* ignore malformed frames */
        }
      };

      socket.onerror = () => {
        if (!mountedRef.current || closedByUs) return;
        // `onclose` always follows `onerror`, and that is where reconnection is
        // scheduled. Setting a terminal "error" here would flash a failure state
        // for a connection that is about to recover.
        if (attempt === 0) setError("Connection error. Reconnecting…");
      };

      socket.onclose = () => {
        if (socketRef.current?.socket === socket) socketRef.current = null;
        if (!mountedRef.current || closedByUs) return;
        // A normal close we asked for is final; anything else is a drop worth
        // recovering from.
        setStatus(attempt === 0 ? "closed" : "reconnecting");
        if (attempt < 8) {
          setStatus("reconnecting");
          retryTimer = setTimeout(() => {
            attempt += 1;
            connect();
          }, nextDelay());
        } else {
          setStatus("closed");
          setError("Live updates stopped. Reload the page to reconnect.");
        }
      };
    };

    connect();

    return () => {
      closedByUs = true;
      if (retryTimer) clearTimeout(retryTimer);
      if (socket) {
        try {
          socket.close();
        } catch {
          /* already closing */
        }
      }
      if (socketRef.current?.socket === socket) socketRef.current = null;
    };
  }, [path, enabled]);

  const send = useCallback(
    (body: string, messageId?: string) => {
      const current = socketRef.current;
      // A delayed save from a previous room must never broadcast into this one.
      if (!current || current.path !== path) return;
      if (current.socket.readyState !== WebSocket.OPEN) {
        setError("Live update unavailable; the message was saved.");
        return;
      }
      current.socket.send(JSON.stringify({ type: "message", body, messageId }));
    },
    [path],
  );

  const messages =
    enabled && messageState && path === messageState.path ? messageState.entries : [];
  return { status, users, messages, send, error };
}
