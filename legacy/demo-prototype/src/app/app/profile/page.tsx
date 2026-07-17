import { PageHeader } from "@/components/app/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { demoUser } from "@/lib/demo-data";

export default function ProfilePage() {
  return (
    <div className="grid gap-4 xl:grid-cols-2">
      <div className="xl:col-span-2">
        <PageHeader title="پروفایل و مرکز حریم خصوصی" description="اطلاعات واقعی پزشکی جمع‌آوری نمی‌شود و ماژول سوابق سلامت تا اتصال مجاز غیرفعال است." />
      </div>
      <Card className="rounded-2xl">
        <CardHeader><CardTitle>اطلاعات شهروند</CardTitle></CardHeader>
        <CardContent className="grid gap-3 text-sm leading-7">
          <p>نام: {demoUser.first_name} {demoUser.last_name}</p>
          <p>شماره همراه: {demoUser.mobile}</p>
          <p>استان و شهرستان: {demoUser.province}، {demoUser.county}</p>
          <p>شناسه ملی: placeholder نمایشی</p>
        </CardContent>
      </Card>
      <Card className="rounded-2xl">
        <CardHeader><CardTitle>رضایت‌ها و تنظیمات دسترسی‌پذیری</CardTitle></CardHeader>
        <CardContent className="flex flex-col gap-4">
          {["رضایت خدمت", "رضایت اعلان", "متن بزرگ‌تر", "کنتراست بالا", "کاهش حرکت"].map((item) => (
            <label key={item} className="flex min-h-11 items-center justify-between rounded-xl border p-3">
              {item}
              <Switch defaultChecked={item === "رضایت خدمت"} />
            </label>
          ))}
          <div className="rounded-xl bg-secondary p-3 text-sm leading-7 text-muted-foreground">
            درخواست خروجی داده، حذف حساب و حذف تاریخچه گفت‌وگو در معماری پیش‌بینی شده و در MVP نمایشی است.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

