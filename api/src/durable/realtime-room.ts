import type { AppEnv } from "../types";

interface WsMeta {
  channel: string;
  userId: string;
  userName: string;
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
    };
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

  async webSocketMessage(ws: WebSocket, message: string | ArrayBuffer): Promise<void> {
    const meta = (ws.deserializeAttachment() ?? {}) as Partial<WsMeta>;
    let payload: { type?: string; body?: string; [key: string]: unknown };
    try {
      payload = JSON.parse(String(message)) as typeof payload;
    } catch {
      return;
    }
    const envelope = {
      type: payload.type ?? "message",
      body: payload.body ?? "",
      channel: meta.channel ?? "chat",
      user: { id: meta.userId ?? "unknown", name: meta.userName ?? "Guest" },
      at: new Date().toISOString(),
    };
    for (const peer of this.state.getWebSockets()) {
      if (peer === ws) continue;
      try {
        peer.send(JSON.stringify(envelope));
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
