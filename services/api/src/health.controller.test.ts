import { describe, expect, it } from "vitest";
import { HealthController } from "./health.controller.js";

describe("HealthController", () => {
  it("does not expose dependency internals", () => {
    const response = new HealthController().ready();
    expect(response).toMatchObject({
      service: "api",
      status: "ok",
      checks: { foundation: "up" },
    });
    expect(JSON.stringify(response)).not.toContain("password");
  });
});
