import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/app/page-header";
import { reminders } from "@/lib/demo-data";

export default function RemindersPage() {
  return (
    <div>
      <PageHeader title="یادآوری‌ها" description="یادآوری‌های عمومی و غیرپزشکی برای مسیر خدمات." />
      <div className="grid gap-3">
        {reminders.map((reminder) => (
          <Card key={reminder} className="rounded-2xl">
            <CardContent className="p-4">{reminder}</CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

