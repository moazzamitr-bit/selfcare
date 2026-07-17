import { PageHeader } from "@/components/app/page-header";
import { RetrievalInspector } from "@/components/app/admin-modules";

export default function AdminQuestionsPage() {
  return (
    <div>
      <PageHeader title="آزمون پاسخ" description="نمونه پرسش را وارد کنید و بازیابی، citation و ایمنی را ببینید." />
      <RetrievalInspector />
    </div>
  );
}

