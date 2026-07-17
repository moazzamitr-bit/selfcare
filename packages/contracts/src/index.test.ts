import { describe, expect, it } from "vitest";
import { SERVICE_STATUSES } from "./index";

describe("health contract", () => {
  it("keeps public service statuses intentionally small", () => {
    expect(SERVICE_STATUSES).toEqual(["ok", "degraded"]);
  });
});
