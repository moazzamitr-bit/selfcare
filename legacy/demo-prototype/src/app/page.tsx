import Link from "next/link";
import { ArrowLeft, MessageCircle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BrandMark } from "@/components/app/brand";
import { DemoNotice } from "@/components/app/health-cards";

export default function LandingPage() {
  return (
    <main className="min-h-dvh bg-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-6 md:px-8">
        <header className="flex items-center justify-between">
          <BrandMark />
          <Button render={<Link href="/auth/login" />} className="rounded-xl">
            ورود demo
          </Button>
        </header>
        <section className="grid min-h-[70dvh] items-center gap-8 lg:grid-cols-[1fr_420px]">
          <div className="flex flex-col gap-5">
            <DemoNotice />
            <h1 className="max-w-3xl text-4xl font-bold leading-[1.35] tracking-normal text-foreground md:text-5xl">
              دستیار پاسخ‌گوی پزشک خانواده
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
              پرسش‌های مربوط به ثبت‌نام، پزشک خانواده، مرکز سلامت، نوبت و ارجاع را با پاسخ مبتنی بر منابع تأییدشده و همراه با citation پیگیری کنید.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button render={<Link href="/app" />} size="lg" className="rounded-xl">
                شروع استفاده
                <ArrowLeft data-icon="inline-end" />
              </Button>
              <Button render={<Link href="/emergency-guidance" />} variant="outline" size="lg" className="rounded-xl">
                راهنمای موارد فوری
              </Button>
            </div>
          </div>
          <Card className="rounded-2xl shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="text-primary" aria-hidden />
                پاسخ بر اساس منابع تأییدشده
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="rounded-2xl bg-secondary p-4 text-sm leading-7">«پزشک خانواده چیست؟»</div>
              <div className="rounded-2xl border p-4 text-sm leading-7">
                پزشک خانواده در این نسخه نمایشی، نقطه شروع راهنمایی درباره ثبت‌نام، مرکز سلامت، نوبت و ارجاع است.
                <div className="mt-3 rounded-xl bg-primary/5 p-3 text-xs text-primary">منابع این پاسخ: معرفی برنامه پزشک خانواده</div>
              </div>
              <div className="flex items-center gap-2 rounded-2xl border bg-success/10 p-3 text-sm text-success">
                <ShieldCheck aria-hidden />
                بدون تشخیص پزشکی، نسخه یا تغییر دارو
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}

