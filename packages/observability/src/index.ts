import pino from "pino";

const redactPaths = [
  "req.headers.authorization",
  "req.headers.cookie",
  "request.headers.authorization",
  "password",
  "otp",
  "token",
  "nationalId",
  "phone",
  "patient",
  "clinicalRecord",
  "prompt",
  "output",
];

export function createSafeLogger(service: string) {
  return pino({
    name: service,
    level: process.env.LOG_LEVEL ?? "info",
    base: { service },
    redact: { paths: redactPaths, censor: "[REDACTED]" },
    timestamp: pino.stdTimeFunctions.isoTime,
  });
}

export function publicError(correlationId: string) {
  return {
    statusCode: 500,
    message: "خطای داخلی سامانه",
    correlationId,
  } as const;
}
