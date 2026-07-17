import { PageHeader } from "@/components/app/page-header";
import { DemoNotice } from "@/components/app/health-cards";
import { AppointmentBooking } from "@/components/app/workflow-cards";

export default function AppointmentsPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader title="نوبت‌ها" description="ثبت اولین ملاقات سلامت به صورت شبیه‌سازی‌شده انجام می‌شود." />
      <DemoNotice />
      <AppointmentBooking />
    </div>
  );
}

