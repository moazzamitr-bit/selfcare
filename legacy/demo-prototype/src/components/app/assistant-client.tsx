"use client";

import { useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import {
  AssistantDisclaimer,
  AssistantHeader,
  ChatComposer,
  ChatMessage,
  QuickQuestionList,
  SuggestedAction,
} from "@/components/app/assistant-parts";
import { LoadingState } from "@/components/app/status";
import type { AssistantResponse, ConversationMessage } from "@/lib/types";

type ChatResult = {
  conversationId: string;
  response: AssistantResponse;
};

export function AssistantClient({ initialMessages = [] }: { initialMessages?: ConversationMessage[] }) {
  const [messages, setMessages] = useState<ConversationMessage[]>(initialMessages);
  const [conversationId, setConversationId] = useState<string | undefined>();
  const [pending, setPending] = useState(false);
  const [lastResponse, setLastResponse] = useState<AssistantResponse | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const assistantMessages = useMemo(() => messages.filter((message) => message.role === "assistant").length, [messages]);

  const send = async (content: string) => {
    const controller = new AbortController();
    abortRef.current = controller;
    setPending(true);
    setLastResponse(null);
    setMessages((current) => [
      ...current,
      { id: crypto.randomUUID(), role: "user", content, created_at: new Date().toISOString() },
    ]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: content, conversationId }),
        signal: controller.signal,
      });

      if (!response.ok || !response.body) {
        throw new Error("chat_failed");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let payload = "";
      let streamedText = "";
      const assistantId = crypto.randomUUID();
      setMessages((current) => [
        ...current,
        { id: assistantId, role: "assistant", content: "", created_at: new Date().toISOString() },
      ]);

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        payload += chunk;
        for (const line of chunk.split("\n")) {
          if (line.startsWith("text:")) {
            streamedText += line.replace("text:", "");
            setMessages((current) =>
              current.map((message) => (message.id === assistantId ? { ...message, content: streamedText } : message)),
            );
          }
        }
      }

      const resultLine = payload
        .split("\n")
        .reverse()
        .find((line) => line.startsWith("result:"));
      if (!resultLine) throw new Error("missing_result");
      const result = JSON.parse(resultLine.replace("result:", "")) as ChatResult;
      setConversationId(result.conversationId);
      setLastResponse(result.response);
      setMessages((current) =>
        current.map((message) =>
          message.id === assistantId
            ? {
                ...message,
                content: result.response.answer,
                citations: result.response.citations,
                safety_level: result.response.safety.level,
              }
            : message,
        ),
      );
    } catch (error) {
      if ((error as Error).name !== "AbortError") {
        toast.error("پاسخ‌گویی موقتاً در دسترس نیست. دوباره تلاش کنید.");
      }
    } finally {
      setPending(false);
      abortRef.current = null;
    }
  };

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-4">
      <AssistantHeader />
      <AssistantDisclaimer />
      <QuickQuestionList onSelect={send} />
      <div className="flex min-h-[48dvh] flex-col gap-4 rounded-2xl border bg-secondary/40 p-3 md:p-5">
        {messages.length === 0 ? (
          <div className="grid flex-1 place-items-center text-center text-sm leading-7 text-muted-foreground">
            پرسش خود را درباره ثبت‌نام، پزشک خانواده، مرکز سلامت، نوبت یا ارجاع مطرح کنید.
          </div>
        ) : (
          messages.map((message) => <ChatMessage key={message.id} message={message} />)
        )}
        {pending && assistantMessages === 0 ? <LoadingState label="دستیار در حال بررسی منابع تأییدشده است..." /> : null}
        {lastResponse ? <SuggestedAction response={lastResponse} /> : null}
      </div>
      <ChatComposer
        disabled={pending}
        onSend={send}
        onClear={() => {
          setMessages([]);
          setLastResponse(null);
          setConversationId(undefined);
        }}
        onStop={() => abortRef.current?.abort()}
      />
    </div>
  );
}

