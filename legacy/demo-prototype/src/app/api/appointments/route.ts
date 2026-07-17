import { NextResponse } from "next/server";
import { createDemoAppointment, getStore } from "@/lib/store";

export async function GET() {
  return NextResponse.json(getStore().appointments);
}

export async function POST(request: Request) {
  const body = (await request.json()) as { date?: string; time?: string };
  if (!body.date || !body.time) {
    return NextResponse.json({ error: "زمان نوبت معتبر نیست." }, { status: 400 });
  }
  return NextResponse.json(createDemoAppointment({ date: body.date, time: body.time }));
}

