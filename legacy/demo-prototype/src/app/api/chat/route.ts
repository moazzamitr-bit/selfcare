import { NextResponse } from "next/server";
import { createAssistantTurn } from "@/lib/store";
import { redactSensitiveText } from "@/lib/redaction";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = (await request.json()) as { message?: string; conversationId?: string };
  const message = body.message?.slice(0, 1200).trim();

  if (!message) {
    return NextResponse.json({ error: "پیام معتبر نیست." }, { status: 400 });
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const result = await createAssistantTurn(redactSensitiveText(message), body.conversationId);
      const preview = result.response.answer.slice(0, 160);
      for (const char of preview) {
        controller.enqueue(encoder.encode(`text:${char}\n`));
        await new Promise((resolve) => setTimeout(resolve, 4));
      }
      controller.enqueue(encoder.encode(`result:${JSON.stringify(result)}\n`));
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

