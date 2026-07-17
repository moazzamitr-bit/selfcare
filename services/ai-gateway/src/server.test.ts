import { describe, expect, it } from "vitest";
import { createServer } from "./server.js";

describe("AI gateway safety default", () => {
  it("reports AI as disabled when no explicit enable flag exists", async () => {
    const server = await createServer();
    const response = await server.inject({
      method: "GET",
      url: "/health/ready",
    });
    expect(response.statusCode).toBe(200);
    expect(response.json()).toMatchObject({
      service: "ai-gateway",
      checks: { ai: "disabled", killSwitch: "up" },
    });
    await server.close();
  });
});
