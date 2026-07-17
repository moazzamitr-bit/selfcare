import { PageHeader } from "@/components/app/page-header";
import { DemoNotice, PhysicianCard } from "@/components/app/health-cards";

export default function DoctorPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader title="پزشک خانواده من" description="اطلاعات از آداپتور mock خوانده شده و واقعی نیست." />
      <DemoNotice />
      <PhysicianCard />
    </div>
  );
}

