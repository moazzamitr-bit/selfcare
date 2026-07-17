import { notFound } from "next/navigation";
import { PageHeader } from "@/components/app/page-header";
import { RetrievalInspector } from "@/components/app/admin-modules";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getStore } from "@/lib/store";

export default async function AdminDocumentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const document = getStore().documents.find((item) => item.id === id);
  if (!document) notFound();
  return (
    <div className="flex flex-col gap-4">
      <PageHeader title={document.title} description="جزئیات سند، متن استخراج‌شده، chunk، تست بازیابی و تاریخچه بازبینی." />
      <Card className="rounded-2xl">
        <CardHeader><CardTitle>فراداده</CardTitle></CardHeader>
        <CardContent className="grid gap-2 text-sm leading-7 md:grid-cols-2">
          <p>سازمان صادرکننده: {document.issuing_organization}</p>
          <p>نسخه: {document.document_version}</p>
          <p>دامنه: {document.province}، {document.county}</p>
          <p>وضعیت: {document.approval_status}</p>
        </CardContent>
      </Card>
      <RetrievalInspector />
    </div>
  );
}

