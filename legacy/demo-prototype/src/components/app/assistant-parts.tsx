"use client";

import { useState } from "react";
import { AlertTriangle, Bot, Check, FileText, Headphones, RotateCcw, Send, Square, ThumbsDown, ThumbsUp } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { assistantDisclaimer } from "@/lib/demo-data";
import type { AssistantResponse, Citation, ConversationMessage } from "@/lib/types";

export function AssistantHeader() {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border bg-card p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
          <Bot aria-hidden />
        </div>
        <div>
          <h1 className="text-lg font-bold">دستیار پاسخ‌گو</h1>
          <p className="text-sm text-muted-foreground">پاسخ بر اساس منابع تأییدشده</p>
        </div>
      </div>
      <Badge variant="secondary" className="rounded-xl">
        بدون تشخیص پزشکی
      </Badge>
    </div>
  );
}

export function SafetyAlert({ level, children }: { level: "normal" | "caution" | "urgent"; children: React.ReactNode }) {
  if (level === "normal") return null;
  return (
    <div className={level === "urgent" ? "rounded-2xl border border-destructive bg-destructive/10 p-4 text-destructive" : "rounded-2xl border border-warning/40 bg-warning/10 p-4 text-[#7A4D00]"}>
      <div className="flex items-start gap-3">
        <AlertTriangle aria-hidden />
        <p className="text-sm leading-7">{children}</p>
      </div>
    </div>
  );
}

export function EmergencyAlert() {
  return (
    <SafetyAlert level="urgent">
      این دستیار امکان ارزیابی وضعیت اورژانسی را ندارد. اگر وضعیت فوری، شدید یا رو به بدتر شدن است، منتظر پاسخ آنلاین نمانید و فوراً با خدمات اورژانس یا نزدیک‌ترین مرکز درمانی تماس بگیرید.
    </SafetyAlert>
  );
}

export function CitationCard({ citation }: { citation: Citation }) {
  return (
    <div className="rounded-xl border bg-secondary/60 p-3 text-xs leading-6">
      <div className="flex items-center gap-2 font-semibold">
        <FileText aria-hidden />
        {citation.title}
      </div>
      <p className="mt-1 text-muted-foreground">
        {citation.section} — نسخه {citation.version}
      </p>
      <p className="text-muted-foreground">آخرین به‌روزرسانی منبع: {citation.updated_at}</p>
    </div>
  );
}

export function FeedbackBar({ messageId }: { messageId: string }) {
  const [sent, setSent] = useState<string | null>(null);
  const submit = async (value: string) => {
    setSent(value);
    await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messageId, value }),
    });
  };

  return (
    <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
      <span>این پاسخ برای شما مفید بود؟</span>
      <Button variant="outline" size="sm" onClick={() => submit("positive")}>
        <ThumbsUp data-icon="inline-start" />
        مفید بود
      </Button>
      <Button variant="outline" size="sm" onClick={() => submit("negative")}>
        <ThumbsDown data-icon="inline-start" />
        مفید نبود
      </Button>
      <Button variant="outline" size="sm" onClick={() => submit("wrong")}>
        پاسخ اشتباه بود
      </Button>
      {sent ? (
        <span className="inline-flex items-center gap-1 text-success">
          <Check aria-hidden />
          ثبت شد
        </span>
      ) : null}
    </div>
  );
}

export function SuggestedAction({ response }: { response: AssistantResponse }) {
  if (response.next_action.type === "none") return null;
  return (
    <div className="mt-3 flex flex-wrap items-center gap-2">
      <Button render={<Link href={response.next_action.target} />} className="rounded-xl">
        {response.next_action.label}
      </Button>
      {response.escalate ? <EscalationDialog defaultReason="نیاز به پشتیبانی دارم" /> : null}
    </div>
  );
}

export function EscalationDialog({ defaultReason = "اطلاعات کافی نبود" }: { defaultReason?: string }) {
  const [reason, setReason] = useState(defaultReason);
  const [description, setDescription] = useState("");
  const [created, setCreated] = useState(false);

  const submit = async () => {
    await fetch("/api/escalations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reason, description }),
    });
    setCreated(true);
  };

  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" className="rounded-xl" />}>
        <Headphones data-icon="inline-start" />
        ارتباط با پشتیبانی
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>درخواست پشتیبانی انسانی</DialogTitle>
          <DialogDescription>برای بررسی دقیق‌تر، درخواست شما به پشتیبانی ارجاع داده می‌شود.</DialogDescription>
        </DialogHeader>
        {created ? (
          <div className="rounded-2xl border bg-success/10 p-4 text-sm text-success">درخواست پشتیبانی در نسخه نمایشی ثبت شد.</div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label>دلیل درخواست</Label>
              <Select value={reason} onValueChange={(value) => value && setReason(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {["اطلاعات کافی نبود", "پاسخ اشتباه بود", "مشکل ثبت‌نام", "مشکل پزشک یا مرکز سلامت", "مشکل نوبت", "مشکل ارجاع", "شکایت", "مشکل فنی", "مورد حساس", "سایر"].map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="support-description">توضیح کوتاه</Label>
              <Textarea id="support-description" value={description} onChange={(event) => setDescription(event.target.value)} placeholder="توضیح خود را بدون اطلاعات پزشکی حساس بنویسید..." />
            </div>
            <Button onClick={submit} className="rounded-xl">
              ثبت درخواست
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function ChatMessage({ message }: { message: ConversationMessage }) {
  const isAssistant = message.role === "assistant";
  return (
    <div className={isAssistant ? "flex justify-start" : "flex justify-end"}>
      <div className={isAssistant ? "max-w-[85%] rounded-2xl rounded-tr-sm border bg-card p-4 shadow-sm" : "max-w-[85%] rounded-2xl rounded-tl-sm bg-primary p-4 text-primary-foreground shadow-sm"}>
        <p className="whitespace-pre-wrap text-sm leading-7">{message.content}</p>
        {message.safety_level && message.safety_level !== "normal" ? <SafetyAlert level={message.safety_level}>{message.safety_level === "urgent" ? "راهنمای فوری نمایش داده شد." : "این پاسخ با محدودیت ایمنی ارائه شده است."}</SafetyAlert> : null}
        {message.citations?.length ? (
          <div className="mt-3 flex flex-col gap-2">
            <p className="text-xs font-semibold text-muted-foreground">منابع این پاسخ</p>
            {message.citations.map((citation) => (
              <CitationCard key={`${citation.document_id}-${citation.section}`} citation={citation} />
            ))}
          </div>
        ) : null}
        {isAssistant ? <FeedbackBar messageId={message.id} /> : null}
      </div>
    </div>
  );
}

export function ChatComposer({
  onSend,
  disabled,
  onClear,
  onStop,
}: {
  onSend: (value: string) => void;
  disabled?: boolean;
  onClear?: () => void;
  onStop?: () => void;
}) {
  const [value, setValue] = useState("");

  const submit = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setValue("");
  };

  return (
    <div className="rounded-2xl border bg-card p-3 shadow-sm">
      <Textarea
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="سؤال خود را بنویسید..."
        className="min-h-20 resize-none border-0 bg-transparent focus-visible:ring-0"
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            submit();
          }
        }}
      />
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>
            پیوست مدرک غیرفعال
          </Button>
          <Button variant="outline" size="sm" disabled>
            ورودی صوتی
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={onClear}>
            <RotateCcw data-icon="inline-start" />
            پاک کردن
          </Button>
          {disabled ? (
            <Button variant="outline" size="sm" onClick={onStop}>
              <Square data-icon="inline-start" />
              توقف
            </Button>
          ) : (
            <Button onClick={submit} disabled={disabled} className="rounded-xl">
              <Send data-icon="inline-start" />
              ارسال
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export function QuickQuestionList({ onSelect }: { onSelect: (value: string) => void }) {
  const questions = [
    "پزشک خانواده چیست؟",
    "چگونه ثبت‌نام کنم؟",
    "پزشک من چه کسی است؟",
    "مرکز سلامت من کجاست؟",
    "نظام ارجاع چگونه کار می‌کند؟",
    "وضعیت ارجاع من چیست؟",
    "برای اولین مراجعه چه مدارکی لازم است؟",
    "چگونه با پشتیبانی تماس بگیرم؟",
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {questions.map((question) => (
        <Button key={question} variant="outline" size="sm" className="rounded-xl" onClick={() => onSelect(question)}>
          {question}
        </Button>
      ))}
    </div>
  );
}

export function AssistantDisclaimer() {
  return <Card className="rounded-2xl border-primary/20 bg-primary/5"><CardContent className="p-4 text-sm leading-7 text-primary">{assistantDisclaimer}</CardContent></Card>;
}
