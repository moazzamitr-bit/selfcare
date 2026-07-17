export const SERVICE_STATUSES = ["ok", "degraded"] as const;

export type ServiceStatus = (typeof SERVICE_STATUSES)[number];

export interface HealthResponse {
  readonly service: string;
  readonly status: ServiceStatus;
  readonly timestamp: string;
  readonly checks?: Readonly<Record<string, "up" | "down" | "disabled">>;
}
