import { PageHeader } from "@/components/app/page-header";
import { AnalyticsChart, MetricCard } from "@/components/app/admin-modules";

export default function AdminAnalyticsPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader title="تحلیل‌ها" description="بدون ذخیره متن حساس پیام‌ها." />
      <div className="grid gap-3 md:grid-cols-3">
        <MetricCard label="میانگین latency" value="۴۲۰ms" description="mock" />
        <MetricCard label="میانگین منبع در پاسخ" value="۲.۴" description="citation" />
        <MetricCard label="بازخورد منفی" value="۶٪" description="نمایشی" />
      </div>
      <AnalyticsChart />
    </div>
  );
}

