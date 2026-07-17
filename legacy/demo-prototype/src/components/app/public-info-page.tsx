import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandMark } from "@/components/app/brand";
import { Card, CardContent } from "@/components/ui/card";

export function PublicInfoPage({ title, body, urgent = false }: { title: string; body: string; urgent?: boolean }) {
  return (
    <main className="min-h-dvh bg-secondary/40">
      <div className="mx-auto flex max-w-4xl flex-col gap-6 px-4 py-6">
        <header className="flex items-center justify-between">
          <BrandMark />
          <Button render={<Link href="/app" />} className="rounded-xl">
            ورود به برنامه
          </Button>
        </header>
        <Card className={urgent ? "rounded-2xl border-destructive bg-destructive/10" : "rounded-2xl"}>
          <CardContent className="p-6 md:p-8">
            <h1 className="flex items-center gap-3 text-3xl font-bold">
              {urgent ? <AlertTriangle className="text-destructive" aria-hidden /> : null}
              {title}
            </h1>
            <div className="mt-5 whitespace-pre-line text-[16px] leading-8 text-muted-foreground">{body}</div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

