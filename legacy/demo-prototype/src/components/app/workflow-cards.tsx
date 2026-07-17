"use client";

import { useState } from "react";
import { CalendarCheck, CheckCircle2, Clock, FileWarning } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { appointments as seedAppointments, referrals } from "@/lib/demo-data";
import type { Appointment, Referral } from "@/lib/types";

const slots = [
  { date: "2026-07-20", time: "09:00" },
  { date: "2026-07-20", time: "10:30" },
  { date: "2026-07-21", time: "11:00" },
];

export function AppointmentCard({ appointment }: { appointment: Appointment }) {
  const statusLabel = {
    upcoming: "پیش‌رو",
    completed: "انجام‌شده",
    canceled: "لغوشده",
    missed: "از دست رفته",
  }[appointment.status];

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle>{appointment.appointment_type}</CardTitle>
            <CardDescription>
              {appointment.date} — ساعت {appointment.time}
            </CardDescription>
          </div>
          <Badge variant={appointment.status === "upcoming" ? "default" : "secondary"} className="rounded-xl">
            {statusLabel}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="text-sm leading-7 text-muted-foreground">{appointment.instructions}</CardContent>
    </Card>
  );
}

export function AppointmentBooking() {
  const [items, setItems] = useState(seedAppointments);
  const [selected, setSelected] = useState(slots[0]);
  const [success, setSuccess] = useState(false);

  const book = async () => {
    const response = await fetch("/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selected),
    });
    const created = (await response.json()) as Appointment;
    setItems((current) => [created, ...current]);
    localStorage.setItem("demoAppointment", JSON.stringify(created));
    setSuccess(true);
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
      <div className="flex flex-col gap-3">
        {items.map((appointment) => (
          <AppointmentCard key={appointment.id} appointment={appointment} />
        ))}
      </div>
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>ثبت اولین ملاقات سلامت</CardTitle>
          <CardDescription>این جریان فقط نوبت نمایشی ذخیره می‌کند.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {slots.map((slot) => (
            <Button key={`${slot.date}-${slot.time}`} variant={selected === slot ? "default" : "outline"} className="justify-start rounded-xl" onClick={() => setSelected(slot)}>
              <CalendarCheck data-icon="inline-start" />
              {slot.date} — {slot.time}
            </Button>
          ))}
          <Button className="mt-2 rounded-xl" onClick={book}>
            ثبت نوبت نمایشی
          </Button>
          {success ? <p className="rounded-xl bg-success/10 p-3 text-sm text-success">نوبت نمایشی ثبت شد. هیچ نوبت واقعی رزرو نشده است.</p> : null}
        </CardContent>
      </Card>
    </div>
  );
}

export function ReferralTimeline({ referral }: { referral: Referral }) {
  const progress = (referral.timeline.filter((item) => item.status === "done").length / referral.timeline.length) * 100;
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle>{referral.specialty}</CardTitle>
            <CardDescription>
              کد ارجاع {referral.referral_code} — مقصد: {referral.destination_center}
            </CardDescription>
          </div>
          <Badge variant="secondary" className="rounded-xl">
            {referral.current_status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Progress value={progress} />
        <div className="grid gap-3 md:grid-cols-2">
          {referral.timeline.map((step) => (
            <div key={step.label} className="flex items-start gap-3 rounded-2xl border bg-background p-3">
              {step.status === "done" ? <CheckCircle2 className="text-success" aria-hidden /> : step.status === "current" ? <Clock className="text-primary" aria-hidden /> : <FileWarning className="text-muted-foreground" aria-hidden />}
              <div>
                <p className="font-medium">{step.label}</p>
                <p className="text-sm text-muted-foreground">{step.date || (step.status === "current" ? "مرحله فعلی" : "در انتظار")}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-sm leading-7 text-muted-foreground">{referral.next_action}</p>
      </CardContent>
    </Card>
  );
}

export function ReferralList() {
  return (
    <div className="flex flex-col gap-4">
      {referrals.map((referral) => (
        <ReferralTimeline key={referral.id} referral={referral} />
      ))}
    </div>
  );
}

