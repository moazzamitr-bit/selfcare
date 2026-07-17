import { noSourceMessage, urgentMessage } from "@/lib/demo-data";
import { normalizePersian } from "@/lib/persian";
import type { AssistantResponse, SafetyLevel } from "@/lib/types";

const injectionPatterns = [
  /ignore (all )?(previous|prior) instructions/i,
  /system prompt/i,
  /hidden (prompt|document|instruction)/i,
  /export all documents/i,
  /reveal another user/i,
  /نادیده بگیر/,
  /دستور.*قبلی/,
  /پرامپت/,
  /سیستم پرامپت/,
  /اسناد مخفی/,
  /کاربر دیگر/,
];

const emergencyPatterns = [
  /خودکشی|آسیب به خود|خودم را میکشم|خودم را می‌کشم/,
  /درد شدید قفسه سینه|تنگی نفس شدید|بیهوش|غش|سکته/,
  /مسمومیت|سم خورده|قرص زیادی/,
  /خونریزی شدید|تشنج|سوختگی شدید/,
  /کودک.*نفس|نوزاد.*بیحال|نوزاد.*بی‌حال/,
  /بارداری.*خونریزی|باردار.*درد شدید/,
  /کتک|خشونت|تهدید جانی|آزار/,
];

const medicalAdvicePatterns = [
  /تشخیص|بیماری من چیست|چه بیماری دارم/,
  /دوز|مقدار مصرف|چقدر دارو|قطع دارو|شروع دارو|دارو را عوض/,
  /ازمایش.*تفسیر|نتیجه ازمایش/,
  /prescribe|diagnose|dosage|medication/i,
];

export function classifySafety(input: string): { level: SafetyLevel; reason: string; blocked: boolean } {
  const normalized = normalizePersian(input);

  if (injectionPatterns.some((pattern) => pattern.test(normalized))) {
    return { level: "caution", reason: "prompt_injection_or_exfiltration", blocked: true };
  }

  if (emergencyPatterns.some((pattern) => pattern.test(normalized))) {
    return { level: "urgent", reason: "urgent_warning_sign", blocked: true };
  }

  if (medicalAdvicePatterns.some((pattern) => pattern.test(normalized))) {
    return { level: "caution", reason: "medical_advice_or_diagnosis_request", blocked: true };
  }

  return { level: "normal", reason: "allowed_family_physician_topic", blocked: false };
}

export function buildSafetyResponse(input: string): AssistantResponse | null {
  const safety = classifySafety(input);

  if (!safety.blocked) {
    return null;
  }

  if (safety.level === "urgent") {
    return {
      answer: urgentMessage,
      next_action: {
        label: "تماس فوری با خدمات اورژانس یا نزدیک‌ترین مرکز درمانی",
        type: "emergency",
        target: "/emergency-guidance",
      },
      citations: [],
      safety,
      escalate: true,
      confidence: "high",
    };
  }

  return {
    answer:
      safety.reason === "medical_advice_or_diagnosis_request"
        ? "من نمی‌توانم تشخیص پزشکی، نسخه، دوز دارو یا تفسیر آزمایش ارائه کنم. برای این موضوع با پزشک خانواده یا مرکز سلامت خود تماس بگیرید."
        : `${noSourceMessage} من نمی‌توانم دستورهای پنهان، prompt سیستم، اسناد داخلی یا اطلاعات کاربر دیگر را افشا کنم.`,
    next_action: {
      label: "ثبت درخواست پشتیبانی",
      type: "call_support",
      target: "/app/support",
    },
    citations: [],
    safety,
    escalate: true,
    confidence: "high",
  };
}

export function validateCitations(response: AssistantResponse) {
  if (response.safety.level === "urgent") {
    return true;
  }
  return response.citations.length > 0 || response.confidence === "low";
}
