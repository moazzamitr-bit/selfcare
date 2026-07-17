import { Controller, Get } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import type { HealthResponse } from "@selfcare/contracts";

@ApiTags("health")
@Controller("health")
export class HealthController {
  @Get("live")
  @ApiOperation({ summary: "Process liveness" })
  @ApiOkResponse({ description: "The API process is alive" })
  live(): HealthResponse {
    return {
      service: "api",
      status: "ok",
      timestamp: new Date().toISOString(),
    };
  }

  @Get("ready")
  @ApiOperation({ summary: "Foundation readiness" })
  @ApiOkResponse({
    description:
      "Foundation API is ready; external dependencies are not required yet",
  })
  ready(): HealthResponse {
    return {
      service: "api",
      status: "ok",
      timestamp: new Date().toISOString(),
      checks: { foundation: "up" },
    };
  }
}
