import Link from "next/link";
import { CalendarDays, Headphones, HelpCircle, Hospital, MessageCircle, Stethoscope, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/app/page-header";
import { DemoNotice, HealthCenterCard, PhysicianCard } from "@/components/app/health-cards";
import { appointments, referrals, reminders } from "@/lib/demo-data";

const quickActions = [
  { label: "پزشک خانواده من", href: "/app/doctor", icon: Stethoscope },
  { label: "مرکز سلامت من", href: "/app/health-center", icon: Hospital },
  { label: "وضعیت نوبت", href: "/app/appointments", icon: CalendarDays },
  { label: "پیگیری ارجاع", href: "/app/referrals", icon: Workflow },
  { label: "پرسش‌های متداول", href: "/faq", icon: HelpCircle },
  { label: "ارتباط با پشتیبانی", href: "/app/support", icon: Headphones },
];

export default function CitizenDashboardPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageHeader title="سلام، به همراه سلامت خانواده خوش آمدید" description="مسیر خدمات پزشک خانواده را از یک داشبورد ساده و قابل پیگیری دنبال کنید." />
      <DemoNotice />
      <Card className="rounded-2xl bg-primary text-primary-foreground shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl">دستیار پاسخ‌گوی پزشک خانواده</CardTitle>
          <CardDescription className="text-primary-foreground/85">
            پرسش خود را درباره ثبت‌نام، پزشک خانواده، مرکز سلامت، نوبت و ارجاع مطرح کنید.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button render={<Link href="/app/assistant" />} variant="secondary" className="rounded-xl">
            <MessageCircle data-icon="inline-start" />
            شروع گفت‌وگو
          </Button>
        </CardContent>
      </Card>
      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {quickActions.map((item) => (
          <Button key={item.href} render={<Link href={item.href} />} variant="outline" className="h-16 justify-start rounded-2xl bg-card">
            <item.icon data-icon="inline-start" />
            {item.label}
          </Button>
        ))}
      </section>
      <section className="grid gap-4 xl:grid-cols-2">
        <PhysicianCard />
        <HealthCenterCard />
      </section>
      <section className="grid gap-4 md:grid-cols-3">
        <SummaryCard title="نوبت بعدی" value={`${appointments[0].date}، ${appointments[0].time}`} description={appointments[0].appointment_type} />
        <SummaryCard title="ارجاع باز" value={referrals[0].referral_code} description={referrals[0].next_action} />
        <SummaryCard title="یادآوری‌ها" value={`${reminders.length} مورد`} description={reminders[0]} />
      </section>
    </div>
  );
}

function SummaryCard({ title, value, description }: { title: string; value: string; description: string }) {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardDescription>{title}</CardDescription>
        <CardTitle>{value}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm leading-7 text-muted-foreground">{description}</CardContent>
    </Card>
  );
}

