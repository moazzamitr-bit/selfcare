"use client";

import { useState } from "react";
import type React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BrandMark } from "@/components/app/brand";

export default function LoginPage() {
  const router = useRouter();
  const [mobile, setMobile] = useState("09121234567");
  const [otp, setOtp] = useState("demo");
  const [error, setError] = useState("");

  const submit = async (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    const response = await fetch("/api/auth/demo-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobile, otp }),
    });
    if (!response.ok) {
      setError("کد demo معتبر نیست.");
      return;
    }
    router.push("/app");
    window.location.assign("/app");
  };

  return (
    <main className="grid min-h-dvh place-items-center bg-secondary/50 px-4">
      <Card className="w-full max-w-md rounded-2xl">
        <CardHeader>
          <BrandMark />
          <CardTitle className="pt-4">ورود شهروند</CardTitle>
          <CardDescription>برای توسعه محلی از OTP برابر demo یا 123456 استفاده کنید.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" onSubmit={submit}>
          <div className="flex flex-col gap-2">
            <Label htmlFor="mobile">شماره همراه</Label>
            <Input id="mobile" dir="ltr" value={mobile} onChange={(event) => setMobile(event.target.value)} />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="otp">کد یک‌بارمصرف demo</Label>
            <Input id="otp" value={otp} onChange={(event) => setOtp(event.target.value)} />
          </div>
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          <Button type="submit" className="rounded-xl">ورود</Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
