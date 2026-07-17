import { randomUUID } from "node:crypto";
import helmet from "@fastify/helmet";
import Fastify from "fastify";
import type { HealthResponse } from "@selfcare/contracts";

export async function createServer() {
  const server = Fastify({
    logger: false,
    genReqId: (request) => {
      const incoming = request.headers["x-correlation-id"];
      return typeof incoming === "string" && incoming.length <= 128
        ? incoming
        : randomUUID();
    },
  });
  await server.register(helmet, { contentSecurityPolicy: false });
  server.addHook("onSend", (request, reply, payload, done) => {
    reply.header("x-correlation-id", request.id);
    done(null, payload);
  });

  server.get("/health/live", (): HealthResponse => ({
    service: "ai-gateway",
    status: "ok",
    timestamp: new Date().toISOString(),
  }));
  server.get("/health/ready", (): HealthResponse => ({
    service: "ai-gateway",
    status: "ok",
    timestamp: new Date().toISOString(),
    checks: {
      ai: process.env.AI_ENABLED === "true" ? "up" : "disabled",
      killSwitch: "up",
    },
  }));
  return server;
}
