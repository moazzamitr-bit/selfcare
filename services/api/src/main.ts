import "reflect-metadata";
import { createSafeLogger } from "@selfcare/observability";
import { createApplication } from "./app.js";

const logger = createSafeLogger("api");
const port = Number.parseInt(process.env.API_PORT ?? "4000", 10);
const app = await createApplication();
await app.listen(port, "0.0.0.0");
logger.info({ port }, "service_started");
