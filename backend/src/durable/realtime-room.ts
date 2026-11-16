import type { AppEnv } from "../types";

interface WsMeta {
  channel: string;
  userId: string;
  userName: string;
  sessionId: string;
  roleKey: string;
  roomId: string;
}

/**
 * RealtimeRoom — one Durable Object per chat room / live class, keyed by
 * `chat:<roomId>` or `live:<classId>`. It upgrades WebSocket connections and
 * fans messages out to every connected peer. History lives in D1 (REST);
 * this object only handles the live fan-out and connection count.
 */
export class RealtimeRoom {
  constructor(
    private state: DurableObjectState,
    private env: AppEnv,
  ) {}

  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const upgrade = request.headers.get("upgrade")?.toLowerCase() === "websocket";
    if (!upgrade) {
      return Response.json({ connected: this.state.getWebSockets().length });
    }

    const pair = new WebSocketPair();
    const client = pair[0];
    const server = pair[1];
    const meta: WsMeta = {
      channel: url.searchParams.get("channel") ?? "chat",
      userId: request.headers.get("x-cea-user-id") ?? "unknown",
      userName: request.headers.get("x-cea-user-name") ?? "Guest",
      sessionId: request.headers.get("x-cea-session-id") ?? "",
      roleKey: request.headers.get("x-cea-role-key") ?? "",
      roomId: request.headers.get("x-cea-room-id") ?? "",
    };
    if (!(await this.sessionValid(meta)))
      return Response.json({ error: "Session unavailable" }, { status: 401 });
    this.state.acceptWebSocket(server);
    server.serializeAttachment(meta);
    server.send(
      JSON.stringify({
        type: "connected",
        channel: meta.channel,
        users: this.state.getWebSockets().length,
      }),
    );
    return new Response(null, { status: 101, webSocket: client });
  }

  // Check both sender and each recipient at delivery time. Older unbound
  // sockets fail closed; clients can reconnect with a current session.
  private async sessionValid(meta: Partial<WsMeta>): Promise<boolean> {
    if (!meta.sessionId || !meta.userId || !meta.roleKey || !meta.channel) return false;
    // Reject old live sockets as well as new upgrades while class authorization is unavailable.
    if (meta.channel !== "chat" || !meta.roomId) return false;
    try {
      const row = await this.env.DB.prepare(
        `SELECT s.id FROM sessions s JOIN users u ON u.id = s.user_id
        WHERE s.id = ? AND s.user_id = ? AND u.role_key = ? AND u.status = 'active'
          AND s.revoked_at IS NULL AND s.mfa_pending = 0 AND s.expires_at > ?
          ${meta.channel === "chat" ? "AND EXISTS (SELECT 1 FROM chat_room_members m WHERE m.room_id = ? AND m.user_id = s.user_id AND m.active = 1 AND m.expires_at > ?)" : ""}`,
      )
        .bind(
          meta.sessionId,
          meta.userId,
          meta.roleKey,
          new Date().toISOString(),
          ...(meta.channel === "chat" ? [meta.roomId, new Date().toISOString()] : []),
        )
        .first<{ id: string }>();
      return Boolean(row);
    } catch {
      return false;
    }
  }

  private closeSocket(ws: WebSocket): void {
    try {
      ws.close(1008, "Session unavailable");
    } catch {
      /* already closed */
    }
  }

  async webSocketMessage(ws: WebSocket, message: string | ArrayBuffer): Promise<void> {
    const meta = (ws.deserializeAttachment() ?? {}) as Partial<WsMeta>;
    if (!(await this.sessionValid(meta))) {
      this.closeSocket(ws);
      return;
    }
    if (typeof message !== "string" || message.length > 20_000) return;
    let payload: unknown;
    try {
      payload = JSON.parse(message);
    } catch {
      return;
    }
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) return;
    const frame = payload as Record<string, unknown>;
    if (
      frame.type !== "message" ||
      typeof frame.messageId !== "string" ||
      frame.messageId.length > 100
    )
      return;
    // Only the author can announce an already persisted message in this room.
    // Never trust a client-supplied body, name, or timestamp.
    let saved: { id: string; body: string; user_name: string; created_at: string } | null;
    try {
      saved = await this.env.DB.prepare(
        "SELECT id, body, user_name, created_at FROM realtime_messages WHERE id = ? AND room_id = ? AND channel = 'chat' AND user_id = ?",
      )
        .bind(frame.messageId, meta.roomId, meta.userId)
        .first();
    } catch {
      return;
    }
    if (!saved) return;
    const envelope = JSON.stringify({
      type: "message",
      id: saved.id,
      body: saved.body,
      channel: meta.channel,
      user: { id: meta.userId, name: saved.user_name },
      at: saved.created_at,
    });
    for (const peer of this.state.getWebSockets()) {
      if (peer === ws) continue;
      const recipient = (peer.deserializeAttachment() ?? {}) as Partial<WsMeta>;
      if (
        recipient.channel !== meta.channel ||
        recipient.roomId !== meta.roomId ||
        !(await this.sessionValid(recipient))
      ) {
        this.closeSocket(peer);
        continue;
      }
      try {
        peer.send(envelope);
      } catch {
        /* peer dropped mid-send */
      }
    }
  }

  async webSocketClose(ws: WebSocket): Promise<void> {
    try {
      ws.close();
    } catch {
      /* already closed */
    }
  }
}
