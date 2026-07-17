import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/app/page-header";
import { getStore } from "@/lib/store";

export default function ConversationsPage() {
  const conversations = getStore().conversations;
  return (
    <div>
      <PageHeader title="گفت‌وگوهای اخیر" description="گفت‌وگوها در نسخه نمایشی در حافظه سرور محلی ذخیره می‌شوند." />
      <div className="grid gap-3">
        {conversations.map((conversation) => (
          <Card key={conversation.id} className="rounded-2xl">
            <CardHeader>
              <CardTitle>
                <Link href={`/app/conversations/${conversation.id}`}>{conversation.title}</Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">{conversation.messages.length} پیام</CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

