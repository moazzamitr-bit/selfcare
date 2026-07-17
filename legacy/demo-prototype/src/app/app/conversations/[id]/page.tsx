import { notFound } from "next/navigation";
import { AssistantClient } from "@/components/app/assistant-client";
import { PageHeader } from "@/components/app/page-header";
import { getStore } from "@/lib/store";

export default async function ConversationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const conversation = getStore().conversations.find((item) => item.id === id);
  if (!conversation) notFound();
  return (
    <div className="flex flex-col gap-4">
      <PageHeader title={conversation.title} description="ادامه گفت‌وگو با همان سابقه نمایشی" />
      <AssistantClient initialMessages={conversation.messages} />
    </div>
  );
}

