import { PageHeader } from "@/components/app/page-header";
import { AnalyticsChart, MetricCard, RetrievalInspector, ReviewPanel } from "@/components/app/admin-modules";

export default function AdminPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader title="پنل مدیریت" description="مدیریت دانش، بازبینی پاسخ، رخدادهای ایمنی و تحلیل‌های حریم‌خصوصی‌محور." />
      <div className="grid gap-3 md:grid-cols-4">
        <MetricCard label="گفت‌وگو" value="۱,۲۴۰" description="نمایشی" />
        <MetricCard label="نرخ موفقیت پاسخ" value="۸۷٪" description="دارای منبع" />
        <MetricCard label="ناکافی بودن منبع" value="۹٪" description="نیازمند تولید محتوا" />
        <MetricCard label="رخداد فوری" value="۳" description="هدایت به راهنمای فوری" />
      </div>
      <RetrievalInspector />
      <ReviewPanel />
      <AnalyticsChart />
    </div>
  );
}

