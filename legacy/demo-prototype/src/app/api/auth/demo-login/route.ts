import { NextResponse } from "next/server";
import { mockAdapters } from "@/lib/ministry-adapters";

export async function POST(request: Request) {
  const body = (await request.json()) as { mobile?: string; otp?: string };
  const result = await mockAdapters.identity.verifyDemoOtp(body.mobile || "", body.otp || "");
  if (!result.ok) {
    return NextResponse.json({ error: "کد demo معتبر نیست." }, { status: 401 });
  }
  const response = NextResponse.json(result.data);
  response.cookies.set("demo_session", result.data.userId, { httpOnly: true, sameSite: "lax", path: "/" });
  return response;
}

