import { faqs } from "@/lib/demo-data";
import { PublicInfoPage } from "@/components/app/public-info-page";

export default function FaqPage() {
  return <PublicInfoPage title="پرسش‌های متداول" body={faqs.join("\n")} />;
}

