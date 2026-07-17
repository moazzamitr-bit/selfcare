import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/app/page-header";

export function SimpleAdminPage({ title, description }: { title: string; description: string }) {
  return (
    <div>
      <PageHeader title={title} description={description} />
      <Card className="rounded-2xl">
        <CardHeader><CardTitle>ماژول نمایشی فعال</CardTitle></CardHeader>
        <CardContent className="text-sm leading-7 text-muted-foreground">
          این صفحه مسیر، کنترل دسترسی و سطح UI ماژول را نشان می‌دهد. اتصال کامل به سرویس وزارت بهداشت از طریق آداپتورهای production placeholder انجام خواهد شد.
        </CardContent>
      </Card>
    </div>
  );
}

