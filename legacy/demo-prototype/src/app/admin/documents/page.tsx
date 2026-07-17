import { PageHeader } from "@/components/app/page-header";
import { DocumentUploader } from "@/components/app/admin-modules";

export default function AdminDocumentsPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader title="مدیریت اسناد دانش" description="بارگذاری، استخراج، chunk، embedding، بررسی و انتشار سند." />
      <DocumentUploader />
    </div>
  );
}

