import { PageHeader } from "@/components/app/page-header";
import { ReviewPanel } from "@/components/app/admin-modules";

export default function AdminResponseReviewsPage() {
  return (
    <div>
      <PageHeader title="بازبینی پاسخ‌های AI" description="صف audit پاسخ‌های حساس، بی‌منبع یا دارای بازخورد منفی." />
      <ReviewPanel />
    </div>
  );
}

