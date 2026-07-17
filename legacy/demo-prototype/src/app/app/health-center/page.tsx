import { PageHeader } from "@/components/app/page-header";
import { DemoNotice, HealthCenterCard } from "@/components/app/health-cards";

export default function HealthCenterPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader title="مرکز سلامت من" description="برای نقص اطلاعات، ثبت‌نام و پیگیری اداری از این مسیر اقدام کنید." />
      <DemoNotice />
      <HealthCenterCard />
      <HealthCenterCard index={1} />
    </div>
  );
}

