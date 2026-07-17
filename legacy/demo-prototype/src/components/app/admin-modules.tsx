"use client";

import { useState } from "react";
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { FileUp, SearchCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { knowledgeDocuments } from "@/lib/demo-data";
import type { AssistantResponse, KnowledgeDocument } from "@/lib/types";

export function MetricCard({ label, value, description }: { label: string; value: string; description: string }) {
  return (
    <Card className="rounded-2xl">
      <CardHeader className="pb-2">
        <CardDescription>{label}</CardDescription>
        <CardTitle className="text-2xl">{value}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">{description}</CardContent>
    </Card>
  );
}

export function AnalyticsChart() {
  const data = [
    { day: "شنبه", questions: 28, escalations: 4 },
    { day: "یکشنبه", questions: 42, escalations: 5 },
    { day: "دوشنبه", questions: 38, escalations: 3 },
    { day: "سه‌شنبه", questions: 51, escalations: 7 },
    { day: "چهارشنبه", questions: 46, escalations: 4 },
  ];

  return (
    <div className="grid gap-4 xl:grid-cols-2">
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>پرسش‌های روزانه</CardTitle>
          <CardDescription>داده نمایشی و بدون متن حساس پیام</CardDescription>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="questions" stroke="#D91F26" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>ارجاع به پشتیبانی</CardTitle>
          <CardDescription>نرخ نمایشی escalation</CardDescription>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="escalations" fill="#169B62" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

export function DocumentStatusBadge({ status }: { status: KnowledgeDocument["approval_status"] }) {
  const label = {
    draft: "پیش‌نویس",
    pending_review: "در انتظار بررسی",
    approved: "تأییدشده",
    rejected: "ردشده",
    archived: "آرشیو",
    expired: "منقضی",
  }[status];
  return <Badge variant={status === "approved" ? "default" : "secondary"} className="rounded-xl">{label}</Badge>;
}

export function DocumentUploader() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [documents, setDocuments] = useState(knowledgeDocuments);

  const upload = async () => {
    const response = await fetch("/api/admin/documents", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });
    const doc = (await response.json()) as KnowledgeDocument;
    setDocuments((current) => [doc, ...current]);
    setTitle("");
    setDescription("");
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[360px_1fr]">
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>بارگذاری سند</CardTitle>
          <CardDescription>PDF، DOCX، TXT، HTML و Markdown در معماری پشتیبانی شده‌اند.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <Input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="عنوان سند" />
          <Textarea value={description} onChange={(event) => setDescription(event.target.value)} placeholder="توضیح و دامنه سند" />
          <Button onClick={upload} disabled={!title.trim()} className="rounded-xl">
            <FileUp data-icon="inline-start" />
            ثبت و ارسال برای بررسی
          </Button>
        </CardContent>
      </Card>
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>فهرست اسناد دانش</CardTitle>
          <CardDescription>فقط سند فعال و تأییدشده در دستیار شهروند قابل بازیابی است.</CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>عنوان</TableHead>
                <TableHead>دسته</TableHead>
                <TableHead>نسخه</TableHead>
                <TableHead>وضعیت</TableHead>
                <TableHead>فعال</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((document) => (
                <TableRow key={document.id}>
                  <TableCell className="font-medium">{document.title}</TableCell>
                  <TableCell>{document.category}</TableCell>
                  <TableCell>{document.document_version}</TableCell>
                  <TableCell><DocumentStatusBadge status={document.approval_status} /></TableCell>
                  <TableCell>{document.is_active ? "بله" : "خیر"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export function RetrievalInspector() {
  const [question, setQuestion] = useState("پزشک خانواده چیست؟");
  const [result, setResult] = useState<AssistantResponse | null>(null);

  const run = async () => {
    const response = await fetch("/api/admin/retrieval-test", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });
    setResult((await response.json()) as AssistantResponse);
  };

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle>آزمون پاسخ</CardTitle>
        <CardDescription>بازیابی، پاسخ ساختاریافته، منابع، ایمنی، latency و نسخه prompt در مسیر واقعی mock بررسی می‌شود.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="flex flex-col gap-2 md:flex-row">
          <Input value={question} onChange={(event) => setQuestion(event.target.value)} />
          <Button onClick={run} className="rounded-xl">
            <SearchCheck data-icon="inline-start" />
            اجرای آزمون
          </Button>
        </div>
        {result ? (
          <div className="rounded-2xl border bg-secondary/60 p-4 text-sm leading-7">
            <p className="font-semibold">پاسخ تولیدشده</p>
            <p>{result.answer}</p>
            <p className="mt-3 font-semibold">منابع</p>
            <ul className="list-inside list-disc">
              {result.citations.map((citation) => (
                <li key={`${citation.document_id}-${citation.section}`}>{citation.title} / {citation.section}</li>
              ))}
            </ul>
            <p className="mt-3 text-muted-foreground">ایمنی: {result.safety.level} — confidence: {result.confidence} — مدل: mock-rag-structured-provider — prompt: v1</p>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

export function ReviewPanel() {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle>پنل بازبینی پاسخ‌ها</CardTitle>
        <CardDescription>نمونه صف بازبینی برای پاسخ‌های کم‌اعتماد یا دارای بازخورد منفی.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3 md:grid-cols-3">
        <MetricCard label="در انتظار بازبینی" value="۱۲" description="پاسخ‌های دارای confidence پایین" />
        <MetricCard label="بازخورد منفی" value="۷" description="بدون ذخیره متن حساس کامل" />
        <MetricCard label="رخداد ایمنی" value="۳" description="اورژانس یا تلاش استخراج prompt" />
      </CardContent>
    </Card>
  );
}

