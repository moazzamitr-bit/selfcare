import "reflect-metadata";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { NestFastifyApplication } from "@nestjs/platform-fastify";
import { createApplication } from "./app.js";

describe("health routes", () => {
  let app: NestFastifyApplication | undefined;
  beforeAll(async () => {
    app = await createApplication();
    await app.init();
  });
  afterAll(async () => {
    await app?.close();
  });

  it("serves readiness with a correlation id", async () => {
    if (!app) throw new Error("application did not initialize");
    const response = await app.inject({
      method: "GET",
      url: "/health/ready",
      headers: { "x-correlation-id": "synthetic-test-id" },
    });
    expect(response.statusCode).toBe(200);
    expect(response.headers["x-correlation-id"]).toBe("synthetic-test-id");
    expect(response.json()).toMatchObject({ service: "api", status: "ok" });
  });
});
