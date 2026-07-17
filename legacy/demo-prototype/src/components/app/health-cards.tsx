import { CalendarClock, MapPin, Phone, QrCode, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { physician, healthCenters, demoNotice } from "@/lib/demo-data";

export function DemoNotice() {
  return (
    <div className="rounded-2xl border border-warning/30 bg-warning/10 px-4 py-3 text-sm leading-6 text-[#7A4D00]">
      {demoNotice}
    </div>
  );
}

export function PhysicianCard() {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="text-xl">{physician.name}</CardTitle>
            <CardDescription>{physician.role} — اطلاعات نمایشی</CardDescription>
          </div>
          <Badge variant="secondary" className="rounded-xl">
            {physician.county}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2">
        <InfoRow icon={Stethoscope} label="مرکز سلامت" value={physician.health_center} />
        <InfoRow icon={CalendarClock} label="ساعت خدمت" value={physician.service_hours} />
        <InfoRow icon={Phone} label="تلفن" value={physician.phone} />
        <InfoRow icon={MapPin} label="نشانی" value={physician.address} />
        <div className="flex items-center gap-3 rounded-2xl border bg-secondary/60 p-4 md:col-span-2">
          <QrCode aria-hidden />
          <div>
            <p className="font-medium">کارت دیجیتال نمایشی</p>
            <p className="text-sm text-muted-foreground">QR واقعی تولید نشده و فقط برای نمایش جریان محصول است.</p>
          </div>
          <Button className="mr-auto rounded-xl">تماس با مرکز</Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function HealthCenterCard({ index = 0 }: { index?: number }) {
  const center = healthCenters[index];
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle>{center.name}</CardTitle>
        <CardDescription>{center.county} — اطلاعات نمایشی</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <InfoRow icon={MapPin} label="نشانی" value={center.address} />
        <InfoRow icon={Phone} label="تلفن" value={center.phone} />
        <InfoRow icon={CalendarClock} label="ساعت پاسخ‌گویی" value={center.hours} />
        <div className="flex flex-wrap gap-2">
          {center.services.map((service) => (
            <Badge key={service} variant="outline" className="rounded-xl">
              {service}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border bg-background p-4">
      <Icon className="mt-1 text-primary" aria-hidden />
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="mt-1 font-medium leading-7">{value}</p>
      </div>
    </div>
  );
}

