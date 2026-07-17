import { urgentMessage } from "@/lib/demo-data";
import { PublicInfoPage } from "@/components/app/public-info-page";

export default function EmergencyGuidancePage() {
  return <PublicInfoPage title="راهنمای موارد فوری" body={`${urgentMessage}\nشماره‌ها و متن‌های فوری باید در تنظیمات مدیر قابل تغییر باشند.`} urgent />;
}

