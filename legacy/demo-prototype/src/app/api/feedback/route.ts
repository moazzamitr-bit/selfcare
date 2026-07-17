import { NextResponse } from "next/server";
import { getStore } from "@/lib/store";

export async function POST(request: Request) {
  const body = (await request.json()) as { messageId?: string; value?: string };
  if (!body.messageId || !body.value) {
    return NextResponse.json({ error: "بازخورد معتبر نیست." }, { status: 400 });
  }
  getStore().feedback.push({ messageId: body.messageId, value: body.value, created_at: new Date().toISOString() });
  getStore().analytics.push({
    event: body.value === "positive" ? "feedback_positive" : "feedback_negative",
    created_at: new Date().toISOString(),
  });
  return NextResponse.json({ ok: true });
}

