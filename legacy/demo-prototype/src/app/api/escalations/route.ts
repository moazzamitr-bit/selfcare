import { NextResponse } from "next/server";
import { createTicket, getStore } from "@/lib/store";

export async function GET() {
  return NextResponse.json(getStore().tickets);
}

export async function POST(request: Request) {
  const body = (await request.json()) as { reason?: string; description?: string; conversation_id?: string };
  const ticket = createTicket({
    reason: body.reason || "سایر",
    description: body.description || "بدون توضیح",
    conversation_id: body.conversation_id,
  });
  return NextResponse.json(ticket);
}

