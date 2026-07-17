export type Role =
  | "citizen"
  | "support_agent"
  | "content_editor"
  | "clinical_reviewer"
  | "administrator"
  | "auditor";

export type SafetyLevel = "normal" | "caution" | "urgent";
export type Confidence = "high" | "medium" | "low";
export type NextActionType =
  | "open_page"
  | "call_support"
  | "contact_center"
  | "emergency"
  | "none";

export type Citation = {
  document_id: string;
  title: string;
  section: string;
  version: string;
  updated_at: string;
};

export type AssistantResponse = {
  answer: string;
  next_action: {
    label: string;
    type: NextActionType;
    target: string;
  };
  citations: Citation[];
  safety: {
    level: SafetyLevel;
    reason: string;
  };
  escalate: boolean;
  confidence: Confidence;
};

export type KnowledgeDocument = {
  id: string;
  title: string;
  description: string;
  issuing_organization: string;
  source_type: "PDF" | "DOCX" | "TXT" | "HTML" | "Markdown";
  source_url: string;
  document_version: string;
  publication_date: string;
  effective_date: string;
  expiration_date: string | null;
  jurisdiction: string;
  province: string;
  county: string;
  audience: string;
  category: string;
  approval_status:
    | "draft"
    | "pending_review"
    | "approved"
    | "rejected"
    | "archived"
    | "expired";
  reviewer: string;
  approved_at: string | null;
  is_active: boolean;
  updated_at: string;
};

export type KnowledgeChunk = {
  id: string;
  document_id: string;
  title: string;
  section: string;
  content: string;
  keywords: string[];
  category: string;
  province: string;
  county: string;
  approval_status: KnowledgeDocument["approval_status"];
  is_active: boolean;
  updated_at: string;
  version: string;
};

export type ConversationMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  created_at: string;
  citations?: Citation[];
  safety_level?: SafetyLevel;
};

export type Conversation = {
  id: string;
  user_id: string;
  title: string;
  messages: ConversationMessage[];
  updated_at: string;
};

export type EscalationTicket = {
  id: string;
  user_id: string;
  conversation_id?: string;
  reason: string;
  description: string;
  priority: "low" | "normal" | "high" | "urgent";
  status:
    | "new"
    | "assigned"
    | "in_progress"
    | "waiting_for_user"
    | "resolved"
    | "closed";
  assigned_agent_id?: string;
  county: string;
  health_center_id: string;
  created_at: string;
  updated_at: string;
  resolved_at?: string;
  resolution_note?: string;
};

export type Appointment = {
  id: string;
  date: string;
  time: string;
  status: "upcoming" | "completed" | "canceled" | "missed";
  appointment_type: string;
  instructions: string;
  source: "demo" | "ministry_api";
};

export type Referral = {
  id: string;
  referral_code: string;
  specialty: string;
  referring_physician: string;
  destination_center: string;
  current_status:
    | "created"
    | "under_review"
    | "appointment_pending"
    | "scheduled"
    | "attended"
    | "feedback_pending"
    | "completed"
    | "canceled";
  next_action: string;
  timeline: { label: string; status: "done" | "current" | "pending"; date?: string }[];
};

