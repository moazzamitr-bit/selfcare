import { randomUUID } from "node:crypto";
import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  type NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module.js";

export async function createApplication(): Promise<NestFastifyApplication> {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: false }),
    { logger: false },
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  const fastify = app.getHttpAdapter().getInstance();
  fastify.addHook("onRequest", (request, reply, done) => {
    const incoming = request.headers["x-correlation-id"];
    const correlationId =
      typeof incoming === "string" && incoming.length <= 128
        ? incoming
        : randomUUID();
    reply.header("x-correlation-id", correlationId);
    done();
  });

  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle("Self-Care Platform API")
      .setVersion("0.1.0")
      .build(),
  );
  SwaggerModule.setup("openapi", app, document, {
    jsonDocumentUrl: "openapi.json",
  });
  return app;
}
