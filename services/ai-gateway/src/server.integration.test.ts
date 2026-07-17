import { describe, expect, it } from "vitest";
import { createServer } from "./server.js";

describe("AI gateway headers", () => {
  it("propagates a bounded synthetic correlation id", async () => {
    const server = await createServer();
    const response = await server.inject({
      method: "GET",
      url: "/health/live",
      headers: { "x-correlation-id": "synthetic-ai-test" },
    });
    expect(response.headers["x-correlation-id"]).toBe("synthetic-ai-test");
    await server.close();
  });
});
