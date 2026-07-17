import { Writable } from "node:stream";
import pino from "pino";
import { describe, expect, it } from "vitest";

describe("safe logging policy", () => {
  it("supports deterministic pino redaction", async () => {
    let output = "";
    const sink = new Writable({
      write(chunk: Buffer | string, _encoding, done) {
        output += chunk.toString();
        done();
      },
    });
    const logger = pino(
      { redact: { paths: ["phone"], censor: "[REDACTED]" } },
      sink,
    );
    logger.info({ phone: "09120000000" }, "synthetic");
    await new Promise<void>((resolve) => sink.end(resolve));
    expect(output).not.toContain("09120000000");
    expect(output).toContain("[REDACTED]");
  });
});
