import { knowledgeChunks, noSourceMessage } from "@/lib/demo-data";
import { normalizePersian } from "@/lib/persian";
import type { AssistantResponse, Citation, KnowledgeChunk } from "@/lib/types";

export const relevanceThreshold = 0.18;

function scoreChunk(query: string, chunk: KnowledgeChunk) {
  const normalizedQuery = normalizePersian(query);
  const terms = normalizedQuery.split(/\s+/).filter((term) => term.length > 2);
  const haystack = normalizePersian(`${chunk.title} ${chunk.section} ${chunk.content} ${chunk.keywords.join(" ")}`);
  const matches = terms.filter((term) => haystack.includes(term)).length;
  const categoryBoost = haystack.includes("پزشک خانواده") ? 0.08 : 0;
  return terms.length ? matches / terms.length + categoryBoost : 0;
}

export function retrieveApprovedChunks(query: string, county = "بهارستان") {
  return knowledgeChunks
    .filter((chunk) => chunk.approval_status === "approved" && chunk.is_active)
    .filter((chunk) => chunk.county === county || chunk.county === "نمایشی" || chunk.province === "تهران")
    .map((chunk) => ({ chunk, score: scoreChunk(query, chunk) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 8);
}

export function buildCitations(chunks: KnowledgeChunk[]): Citation[] {
  const seen = new Set<string>();
  return chunks
    .filter((chunk) => {
      const key = `${chunk.document_id}:${chunk.section}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, 5)
    .map((chunk) => ({
      document_id: chunk.document_id,
      title: chunk.title,
      section: chunk.section,
      version: chunk.version,
      updated_at: chunk.updated_at,
    }));
}

export function answerFromRetrievedContent(query: string): AssistantResponse {
  const retrieved = retrieveApprovedChunks(query);
  const accepted = retrieved.filter((item) => item.score >= relevanceThreshold).slice(0, 5);

  if (!accepted.length) {
    return {
      answer: `${noSourceMessage} می‌توانید پرسش را دقیق‌تر بنویسید یا درخواست پشتیبانی ثبت کنید.`,
      next_action: {
        label: "ارتباط با پشتیبانی",
        type: "call_support",
        target: "/app/support",
      },
      citations: [],
      safety: { level: "normal", reason: "no_relevant_approved_source" },
      escalate: true,
      confidence: "low",
    };
  }

  const chunks = accepted.map((item) => item.chunk);
  const citations = buildCitations(chunks);
  const summary = chunks
    .slice(0, 3)
    .map((chunk) => chunk.content.replace("برچسب: محتوای نمایشی و غیرقابل استناد.", "").trim())
    .join(" ");

  return {
    answer: `${summary} توجه کنید که این سامانه فقط راهنمای خدمات پزشک خانواده است و جایگزین پزشک، تشخیص یا درمان نیست.`,
    next_action: {
      label: query.includes("ارجاع") ? "مشاهده ارجاع‌ها" : query.includes("نوبت") ? "مشاهده نوبت‌ها" : "مشاهده راهنمای مرتبط",
      type: "open_page",
      target: query.includes("ارجاع") ? "/app/referrals" : query.includes("نوبت") ? "/app/appointments" : "/faq",
    },
    citations,
    safety: { level: "normal", reason: "approved_source_retrieved" },
    escalate: false,
    confidence: accepted[0]?.score > 0.5 ? "high" : "medium",
  };
}

