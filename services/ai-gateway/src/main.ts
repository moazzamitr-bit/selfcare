import { createSafeLogger } from "@selfcare/observability";
import { createServer } from "./server.js";

const logger = createSafeLogger("ai-gateway");
const port = Number.parseInt(process.env.AI_GATEWAY_PORT ?? "4100", 10);
const server = await createServer();
await server.listen({ port, host: "0.0.0.0" });
logger.info({ port, aiEnabled: false }, "service_started");
