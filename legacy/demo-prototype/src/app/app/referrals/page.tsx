import { PageHeader } from "@/components/app/page-header";
import { DemoNotice } from "@/components/app/health-cards";
import { ReferralList } from "@/components/app/workflow-cards";

export default function ReferralsPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader title="ارجاع‌ها" description="دستیار هرگز وضعیت ارجاع را حدس نمی‌زند؛ این داده از پایگاه داده demo خوانده می‌شود." />
      <DemoNotice />
      <ReferralList />
    </div>
  );
}

