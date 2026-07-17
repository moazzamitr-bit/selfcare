"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function SupportForm() {
  const [reason, setReason] = useState("اطلاعات کافی نبود");
  const [description, setDescription] = useState("");
  const [ticketId, setTicketId] = useState("");

  const submit = async () => {
    const response = await fetch("/api/escalations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reason, description }),
    });
    const ticket = (await response.json()) as { id: string };
    setTicketId(ticket.id);
    setDescription("");
  };

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle>ثبت درخواست پشتیبانی</CardTitle>
        <CardDescription>یادداشت داخلی عوامل پشتیبانی به شهروند نمایش داده نمی‌شود.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label>دلیل درخواست</Label>
          <Select value={reason} onValueChange={(value) => value && setReason(value)}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {["اطلاعات کافی نبود", "پاسخ اشتباه بود", "مشکل ثبت‌نام", "مشکل پزشک یا مرکز سلامت", "مشکل نوبت", "مشکل ارجاع", "شکایت", "مشکل فنی", "مورد حساس", "سایر"].map((item) => (
                  <SelectItem key={item} value={item}>{item}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="ticket-description">توضیح</Label>
          <Textarea id="ticket-description" value={description} onChange={(event) => setDescription(event.target.value)} placeholder="بدون وارد کردن اطلاعات پزشکی حساس توضیح دهید..." />
        </div>
        <Button onClick={submit} className="rounded-xl">ثبت درخواست</Button>
        {ticketId ? <p className="rounded-xl bg-success/10 p-3 text-sm text-success">درخواست با شناسه {ticketId} ثبت شد.</p> : null}
      </CardContent>
    </Card>
  );
}
