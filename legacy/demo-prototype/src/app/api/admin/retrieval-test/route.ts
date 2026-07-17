import { NextResponse } from "next/server";
import { mockLlmProvider } from "@/lib/ai";

export async function POST(request: Request) {
  const started = performance.now();
  const body = (await request.json()) as { question?: string };
  const response = await mockLlmProvider.generateStructuredAnswer(body.question || "");
  return NextResponse.json({
    ...response,
    diagnostics: {
      latency_ms: Math.round(performance.now() - started),
      model: mockLlmProvider.name,
      prompt_version: "v1",
      token_usage: { input: 128, output: 220 },
    },
  });
}

