import { PageHeader } from "@/components/app/page-header";
import { SupportForm } from "@/components/app/support-form";
import { getStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function SupportPage() {
  const tickets = getStore().tickets;
  return (
    <div className="flex flex-col gap-4">
      <PageHeader title="ارتباط با پشتیبانی" description="در صورت کافی نبودن اطلاعات یا مشکل ثبت‌نام، نوبت و ارجاع درخواست پشتیبانی ثبت کنید." />
      <SupportForm />
      <div className="grid gap-3">
        {tickets.map((ticket) => (
          <Card key={ticket.id} className="rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center justify-between gap-3 text-base">
                {ticket.reason}
                <Badge variant="secondary" className="rounded-xl">{ticket.status}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-7 text-muted-foreground">{ticket.description}</CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

