import {
  appointments,
  demoUser,
  initialConversations,
  initialTickets,
  knowledgeDocuments,
} from "@/lib/demo-data";
import { mockLlmProvider } from "@/lib/ai";
import { redactSensitiveText } from "@/lib/redaction";
import type { Appointment, Conversation, EscalationTicket, KnowledgeDocument } from "@/lib/types";

type DemoStore = {
  conversations: Conversation[];
  tickets: EscalationTicket[];
  appointments: Appointment[];
  documents: KnowledgeDocument[];
  feedback: { messageId: string; value: string; created_at: string }[];
  analytics: { event: string; created_at: string; metadata?: Record<string, unknown> }[];
};

const globalForStore = globalThis as unknown as { __familyHealthDemoStore?: DemoStore };

export function getStore(): DemoStore {
  if (!globalForStore.__familyHealthDemoStore) {
    globalForStore.__familyHealthDemoStore = {
      conversations: structuredClone(initialConversations),
      tickets: structuredClone(initialTickets),
      appointments: structuredClone(appointments),
      documents: structuredClone(knowledgeDocuments),
      feedback: [],
      analytics: [],
    };
  }
  return globalForStore.__familyHealthDemoStore;
}

export async function createAssistantTurn(input: string, conversationId?: string) {
  const store = getStore();
  const now = new Date().toISOString();
  let conversation = conversationId ? store.conversations.find((item) => item.id === conversationId) : undefined;

  if (!conversation) {
    conversation = {
      id: crypto.randomUUID(),
      user_id: demoUser.id,
      title: redactSensitiveText(input).slice(0, 56),
      messages: [],
      updated_at: now,
    };
    store.conversations.unshift(conversation);
  }

  conversation.messages.push({
    id: crypto.randomUUID(),
    role: "user",
    content: redactSensitiveText(input),
    created_at: now,
  });

  const response = await mockLlmProvider.generateStructuredAnswer(input);
  conversation.messages.push({
    id: crypto.randomUUID(),
    role: "assistant",
    content: response.answer,
    created_at: new Date().toISOString(),
    citations: response.citations,
    safety_level: response.safety.level,
  });
  conversation.updated_at = new Date().toISOString();

  store.analytics.push({
    event: response.safety.level === "urgent" ? "emergency_message_shown" : "answer_completed",
    created_at: new Date().toISOString(),
    metadata: { confidence: response.confidence, citations: response.citations.length },
  });

  return { conversationId: conversation.id, response };
}

export function createTicket(payload: { reason: string; description: string; conversation_id?: string }) {
  const store = getStore();
  const ticket: EscalationTicket = {
    id: crypto.randomUUID(),
    user_id: demoUser.id,
    conversation_id: payload.conversation_id,
    reason: payload.reason,
    description: redactSensitiveText(payload.description),
    priority: payload.reason.includes("حساس") ? "high" : "normal",
    status: "new",
    county: demoUser.county,
    health_center_id: "20000000-0000-4000-8000-000000000001",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  store.tickets.unshift(ticket);
  store.analytics.push({ event: "escalation_created", created_at: ticket.created_at });
  return ticket;
}

export function createDemoAppointment(slot: { date: string; time: string }) {
  const item: Appointment = {
    id: crypto.randomUUID(),
    date: slot.date,
    time: slot.time,
    status: "upcoming",
    appointment_type: "اولین ملاقات سلامت",
    instructions: "این نوبت فقط در نسخه نمایشی ثبت شده و نوبت واقعی نیست.",
    source: "demo",
  };
  getStore().appointments.unshift(item);
  getStore().analytics.push({ event: "appointment_demo_started", created_at: new Date().toISOString() });
  return item;
}

export function addDocumentDraft(payload: Partial<KnowledgeDocument> & { title: string }) {
  const document: KnowledgeDocument = {
    id: crypto.randomUUID(),
    title: payload.title,
    description: payload.description || "سند بارگذاری‌شده در نسخه نمایشی",
    issuing_organization: payload.issuing_organization || "نمونه آموزشی همراه سلامت خانواده",
    source_type: payload.source_type || "TXT",
    source_url: payload.source_url || "demo://uploaded",
    document_version: payload.document_version || "demo-draft",
    publication_date: payload.publication_date || new Date().toISOString().slice(0, 10),
    effective_date: payload.effective_date || new Date().toISOString().slice(0, 10),
    expiration_date: payload.expiration_date || null,
    jurisdiction: payload.jurisdiction || "نمایشی",
    province: payload.province || "تهران",
    county: payload.county || "بهارستان",
    audience: payload.audience || "citizen",
    category: payload.category || "پشتیبانی",
    approval_status: "pending_review",
    reviewer: payload.reviewer || "بازبین نمایشی",
    approved_at: null,
    is_active: false,
    updated_at: new Date().toISOString().slice(0, 10),
  };
  getStore().documents.unshift(document);
  return document;
}

export function approveDocument(id: string) {
  const document = getStore().documents.find((item) => item.id === id);
  if (!document) return null;
  document.approval_status = "approved";
  document.is_active = true;
  document.approved_at = new Date().toISOString();
  document.updated_at = new Date().toISOString().slice(0, 10);
  return document;
}

