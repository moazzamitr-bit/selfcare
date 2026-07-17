import { NextResponse } from "next/server";
import { addDocumentDraft, approveDocument, getStore } from "@/lib/store";

export async function GET() {
  return NextResponse.json(getStore().documents);
}

export async function POST(request: Request) {
  const body = (await request.json()) as { title?: string; description?: string };
  if (!body.title) {
    return NextResponse.json({ error: "عنوان سند لازم است." }, { status: 400 });
  }
  return NextResponse.json(addDocumentDraft({ title: body.title, description: body.description }));
}

export async function PATCH(request: Request) {
  const body = (await request.json()) as { id?: string; action?: "approve" };
  if (!body.id || body.action !== "approve") {
    return NextResponse.json({ error: "درخواست معتبر نیست." }, { status: 400 });
  }
  const document = approveDocument(body.id);
  if (!document) {
    return NextResponse.json({ error: "سند پیدا نشد." }, { status: 404 });
  }
  return NextResponse.json(document);
}

