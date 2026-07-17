import type {
  Appointment,
  Conversation,
  EscalationTicket,
  KnowledgeChunk,
  KnowledgeDocument,
  Referral,
} from "@/lib/types";

export const demoNotice = "نسخه نمایشی — اطلاعات این بخش واقعی نیست و به سامانه وزارت بهداشت متصل نشده است.";
export const assistantDisclaimer =
  "این دستیار برای راهنمایی درباره خدمات پزشک خانواده طراحی شده و جایگزین پزشک، تشخیص یا درمان پزشکی نیست.";
export const noSourceMessage = "اطلاعات کافی و تأییدشده برای پاسخ دقیق در اختیار من نیست.";
export const urgentMessage =
  "این دستیار امکان ارزیابی وضعیت اورژانسی را ندارد. اگر وضعیت شما یا فرد دیگری فوری، شدید یا رو به بدتر شدن است، منتظر پاسخ آنلاین نمانید و فوراً با خدمات اورژانس یا نزدیک‌ترین مرکز درمانی تماس بگیرید.";

export const demoUser = {
  id: "00000000-0000-4000-8000-000000000001",
  first_name: "مریم",
  last_name: "رضایی",
  mobile: "۰۹۱۲۱۲۳۴۵۶۷",
  province: "تهران",
  county: "بهارستان",
  role: "citizen",
};

export const familyMembers = [
  { relationship: "خودم", first_name: "مریم", last_name: "رضایی", birth_year: "۱۳۶۸" },
  { relationship: "همسر", first_name: "امیر", last_name: "کاظمی", birth_year: "۱۳۶۵" },
  { relationship: "فرزند", first_name: "نیلوفر", last_name: "کاظمی", birth_year: "۱۳۹۴" },
  { relationship: "فرزند", first_name: "آراد", last_name: "کاظمی", birth_year: "۱۳۹۸" },
];

export const physician = {
  id: "10000000-0000-4000-8000-000000000001",
  name: "دکتر سارا احمدی",
  role: "پزشک خانواده",
  system_number: "شماره نظام پزشکی نمایشی",
  health_center: "مرکز جامع سلامت امید",
  county: "بهارستان",
  service_hours: "شنبه تا چهارشنبه، ۸ تا ۱۴",
  phone: "۰۲۱-۵۵۵۵۵۵۵۵",
  address: "بهارستان، خیابان سلامت، پلاک ۱۲",
};

export const healthCenters = [
  {
    id: "20000000-0000-4000-8000-000000000001",
    name: "مرکز جامع سلامت امید",
    county: "بهارستان",
    phone: "۰۲۱-۵۵۵۵۵۵۵۵",
    address: "بهارستان، خیابان سلامت، پلاک ۱۲",
    hours: "۸ تا ۱۴",
    services: ["ثبت‌نام", "اولین ملاقات سلامت", "پیگیری ارجاع"],
  },
  {
    id: "20000000-0000-4000-8000-000000000002",
    name: "پایگاه سلامت نیایش",
    county: "بهارستان",
    phone: "۰۲۱-۵۵۵۵۵۵۵۶",
    address: "بهارستان، بلوار نیایش، کوچه ۴",
    hours: "۸ تا ۱۳",
    services: ["پرسش‌های اداری", "مراقبت‌های پیشگیرانه"],
  },
];

export const appointments: Appointment[] = [
  {
    id: "30000000-0000-4000-8000-000000000001",
    date: "2026-07-18",
    time: "09:30",
    status: "upcoming",
    appointment_type: "اولین ملاقات سلامت",
    instructions: "کارت شناسایی و کد ملی همراه داشته باشید. اطلاعات نمایشی است.",
    source: "demo",
  },
  {
    id: "30000000-0000-4000-8000-000000000002",
    date: "2026-06-24",
    time: "10:00",
    status: "completed",
    appointment_type: "پیگیری اداری",
    instructions: "ثبت نمایشی انجام شده است.",
    source: "demo",
  },
  {
    id: "30000000-0000-4000-8000-000000000003",
    date: "2026-06-01",
    time: "11:30",
    status: "missed",
    appointment_type: "مشاوره ثبت‌نام",
    instructions: "برای هماهنگی مجدد با مرکز سلامت تماس بگیرید.",
    source: "demo",
  },
];

export const referrals: Referral[] = [
  {
    id: "40000000-0000-4000-8000-000000000001",
    referral_code: "REF-۱۴۰۵-۰۰۱۲",
    specialty: "چشم‌پزشکی",
    referring_physician: "دکتر سارا احمدی",
    destination_center: "درمانگاه تخصصی نمونه",
    current_status: "appointment_pending",
    next_action: "منتظر تعیین نوبت تخصصی در نسخه نمایشی باشید.",
    timeline: [
      { label: "ثبت ارجاع", status: "done", date: "2026-07-05" },
      { label: "بررسی مرکز", status: "done", date: "2026-07-06" },
      { label: "تعیین نوبت تخصصی", status: "current" },
      { label: "مراجعه", status: "pending" },
      { label: "ثبت بازخورد متخصص", status: "pending" },
      { label: "بازگشت به پزشک خانواده", status: "pending" },
    ],
  },
  {
    id: "40000000-0000-4000-8000-000000000002",
    referral_code: "REF-۱۴۰۵-۰۰۰۷",
    specialty: "تغذیه",
    referring_physician: "دکتر سارا احمدی",
    destination_center: "مرکز جامع سلامت امید",
    current_status: "completed",
    next_action: "در صورت نیاز، بازخورد را در ملاقات بعدی مطرح کنید.",
    timeline: [
      { label: "ثبت ارجاع", status: "done", date: "2026-06-01" },
      { label: "بررسی مرکز", status: "done", date: "2026-06-02" },
      { label: "تعیین نوبت تخصصی", status: "done", date: "2026-06-04" },
      { label: "مراجعه", status: "done", date: "2026-06-12" },
      { label: "ثبت بازخورد متخصص", status: "done", date: "2026-06-13" },
      { label: "بازگشت به پزشک خانواده", status: "done", date: "2026-06-20" },
    ],
  },
];

export const reminders = [
  "بررسی وضعیت ثبت‌نام خانواده",
  "آماده‌سازی مدارک اولین ملاقات سلامت",
  "پیگیری ارجاع چشم‌پزشکی",
  "به‌روزرسانی شماره تماس",
  "مطالعه حقوق شهروندی در نظام ارجاع",
];

export const faqs = [
  "پزشک خانواده چیست؟",
  "چگونه ثبت‌نام کنم؟",
  "نظام ارجاع چگونه کار می‌کند؟",
  "برای اولین مراجعه چه مدارکی لازم است؟",
  "چگونه مرکز سلامت خود را پیدا کنم؟",
  "اگر پاسخ کافی نبود چه کنم؟",
  "آیا این دستیار تشخیص پزشکی می‌دهد؟",
  "اطلاعات من چگونه نگهداری می‌شود؟",
  "چگونه نوبت نمایشی ثبت کنم؟",
  "چگونه با پشتیبانی تماس بگیرم؟",
];

export const knowledgeDocuments: KnowledgeDocument[] = [
  {
    id: "50000000-0000-4000-8000-000000000001",
    title: "معرفی برنامه پزشک خانواده",
    description: "محتوای نمایشی و غیرقابل استناد برای معرفی مسیر خدمات.",
    issuing_organization: "نمونه آموزشی همراه سلامت خانواده",
    source_type: "Markdown",
    source_url: "demo://family-physician",
    document_version: "demo-1.0",
    publication_date: "2026-07-01",
    effective_date: "2026-07-01",
    expiration_date: null,
    jurisdiction: "نمایشی",
    province: "تهران",
    county: "بهارستان",
    audience: "citizen",
    category: "معرفی پزشک خانواده",
    approval_status: "approved",
    reviewer: "بازبین نمایشی",
    approved_at: "2026-07-01",
    is_active: true,
    updated_at: "2026-07-01",
  },
  {
    id: "50000000-0000-4000-8000-000000000002",
    title: "ثبت‌نام و احراز هویت",
    description: "محتوای نمایشی و غیرقابل استناد درباره ثبت‌نام.",
    issuing_organization: "نمونه آموزشی همراه سلامت خانواده",
    source_type: "TXT",
    source_url: "demo://registration",
    document_version: "demo-1.0",
    publication_date: "2026-07-01",
    effective_date: "2026-07-01",
    expiration_date: null,
    jurisdiction: "نمایشی",
    province: "تهران",
    county: "بهارستان",
    audience: "citizen",
    category: "ثبت‌نام",
    approval_status: "approved",
    reviewer: "بازبین نمایشی",
    approved_at: "2026-07-01",
    is_active: true,
    updated_at: "2026-07-01",
  },
  {
    id: "50000000-0000-4000-8000-000000000003",
    title: "راهنمای نظام ارجاع",
    description: "محتوای نمایشی و غیرقابل استناد درباره مراحل ارجاع.",
    issuing_organization: "نمونه آموزشی همراه سلامت خانواده",
    source_type: "Markdown",
    source_url: "demo://referral",
    document_version: "demo-1.0",
    publication_date: "2026-07-01",
    effective_date: "2026-07-01",
    expiration_date: null,
    jurisdiction: "نمایشی",
    province: "تهران",
    county: "بهارستان",
    audience: "citizen",
    category: "نظام ارجاع",
    approval_status: "approved",
    reviewer: "بازبین نمایشی",
    approved_at: "2026-07-01",
    is_active: true,
    updated_at: "2026-07-01",
  },
  {
    id: "50000000-0000-4000-8000-000000000004",
    title: "حریم خصوصی و رضایت",
    description: "محتوای نمایشی و غیرقابل استناد درباره حریم خصوصی.",
    issuing_organization: "نمونه آموزشی همراه سلامت خانواده",
    source_type: "HTML",
    source_url: "demo://privacy",
    document_version: "demo-1.0",
    publication_date: "2026-07-01",
    effective_date: "2026-07-01",
    expiration_date: null,
    jurisdiction: "نمایشی",
    province: "تهران",
    county: "بهارستان",
    audience: "citizen",
    category: "حریم خصوصی",
    approval_status: "approved",
    reviewer: "بازبین نمایشی",
    approved_at: "2026-07-01",
    is_active: true,
    updated_at: "2026-07-01",
  },
  {
    id: "50000000-0000-4000-8000-000000000005",
    title: "موارد نیازمند اقدام فوری",
    description: "محتوای نمایشی و غیرقابل استناد برای راهنمایی اورژانسی عمومی.",
    issuing_organization: "نمونه آموزشی همراه سلامت خانواده",
    source_type: "Markdown",
    source_url: "demo://emergency",
    document_version: "demo-1.0",
    publication_date: "2026-07-01",
    effective_date: "2026-07-01",
    expiration_date: null,
    jurisdiction: "نمایشی",
    province: "تهران",
    county: "بهارستان",
    audience: "citizen",
    category: "موارد اورژانسی",
    approval_status: "approved",
    reviewer: "بازبین نمایشی",
    approved_at: "2026-07-01",
    is_active: true,
    updated_at: "2026-07-01",
  },
];

const chunkTexts = [
  ["چیستی پزشک خانواده", "پزشک خانواده نقطه نخست راهنمایی اداری و مراقبت پایه در این نسخه نمایشی است. شهروند پرسش‌های مربوط به ثبت‌نام، مرکز سلامت، نوبت و ارجاع را از این مسیر دنبال می‌کند."],
  ["وظیفه دستیار", "دستیار فقط درباره مسیر خدمات پزشک خانواده پاسخ می‌دهد و تشخیص، درمان، نسخه یا تغییر دارو ارائه نمی‌کند."],
  ["ثبت‌نام", "برای ثبت‌نام نمایشی، شهروند ابتدا شماره همراه را وارد می‌کند، کد یک‌بارمصرف demo را می‌نویسد و سپس پروفایل خانواده را بازبینی می‌کند."],
  ["مرکز سلامت", "مرکز سلامت مسئول پاسخ به نقص اطلاعات، ابهام در پزشک خانواده و پیگیری اداری نوبت یا ارجاع است."],
  ["اولین ملاقات", "برای اولین ملاقات سلامت، همراه داشتن کارت شناسایی، کد ملی و اطلاعات تماس کافی است. این متن نمایشی و غیرقابل استناد است."],
  ["نظام ارجاع", "در نظام ارجاع نمایشی، مسیر از پزشک خانواده آغاز می‌شود و سپس بررسی مرکز، تعیین نوبت تخصصی، مراجعه، ثبت بازخورد و بازگشت به پزشک خانواده دنبال می‌شود."],
  ["وضعیت ارجاع", "دستیار نباید وضعیت ارجاع را حدس بزند. وضعیت فقط از پایگاه داده یا آداپتور مجاز خوانده می‌شود."],
  ["پشتیبانی", "اگر اطلاعات کافی نبود، کاربر می‌تواند درخواست پشتیبانی ثبت کند. دلیل درخواست و توضیح کوتاه برای عامل انسانی ارسال می‌شود."],
  ["حریم خصوصی", "اطلاعات شهروند فقط برای خدمات مجاز همین سامانه استفاده می‌شود و برای تبلیغات یا آموزش مدل به کار نمی‌رود."],
  ["حذف داده", "مرکز حریم خصوصی امکان مشاهده رضایت‌ها، تغییر اعلان‌ها، درخواست خروجی داده و درخواست حذف حساب را نشان می‌دهد."],
  ["اورژانس", "در شرایط فوری، شدید یا رو به بدتر شدن، کاربر نباید منتظر پاسخ آنلاین بماند و باید با خدمات اورژانس یا نزدیک‌ترین مرکز درمانی تماس بگیرد."],
  ["کودک", "عبارت‌های مرتبط با خطر شدید برای کودک باید به پیام اقدام فوری هدایت شوند. دستیار تشخیص نمی‌دهد."],
  ["بارداری", "عبارت‌های مربوط به خطر شدید در بارداری باید پیام اقدام فوری را فعال کنند. دستیار تشخیص یا درمان ارائه نمی‌کند."],
  ["مسمومیت", "برای احتمال مسمومیت، مسیر عادی گفت‌وگو متوقف و راهنمای اقدام فوری نمایش داده می‌شود."],
  ["خشونت", "برای خطر خشونت یا سوءاستفاده، درخواست باید با اولویت بالا به پشتیبانی انسانی و راهنمای فوری هدایت شود."],
  ["سوالات نامرتبط", "پرسش‌های خارج از برنامه پزشک خانواده با توضیح کوتاه رد می‌شوند و به مسیرهای مرتبط پیشنهاد داده می‌شوند."],
  ["منابع", "هر پاسخ factual باید دست‌کم یک منبع تاییدشده فعال داشته باشد."],
  ["بازخورد", "پس از پاسخ، کاربر می‌تواند مفید بودن، اشتباه بودن یا نیاز به پشتیبانی را ثبت کند."],
  ["سهمیه و امنیت", "درخواست‌های طولانی، تلاش برای استخراج prompt یا درخواست داده کاربر دیگر باید مسدود یا ایمن پاسخ داده شوند."],
  ["مدارک", "بارگذاری مدرک برای شهروندان غیرفعال است. بارگذاری دانش فقط در پنل مدیر و پس از بررسی انجام می‌شود."],
];

export const knowledgeChunks: KnowledgeChunk[] = chunkTexts.map(([section, content], index) => {
  const doc = knowledgeDocuments[index < 5 ? index % 5 : Math.min(4, index % 5)];
  return {
    id: `60000000-0000-4000-8000-${String(index + 1).padStart(12, "0")}`,
    document_id: doc.id,
    title: doc.title,
    section,
    content: `${content} برچسب: محتوای نمایشی و غیرقابل استناد.`,
    keywords: `${section} ${content}`.split(/\s+/).slice(0, 12),
    category: doc.category,
    province: doc.province,
    county: doc.county,
    approval_status: doc.approval_status,
    is_active: doc.is_active,
    updated_at: doc.updated_at,
    version: doc.document_version,
  };
});

export const initialConversations: Conversation[] = [
  {
    id: "70000000-0000-4000-8000-000000000001",
    user_id: demoUser.id,
    title: "پزشک خانواده چیست؟",
    updated_at: "2026-07-12T10:00:00.000Z",
    messages: [
      {
        id: "71000000-0000-4000-8000-000000000001",
        role: "user",
        content: "پزشک خانواده چیست؟",
        created_at: "2026-07-12T10:00:00.000Z",
      },
      {
        id: "71000000-0000-4000-8000-000000000002",
        role: "assistant",
        content:
          "پزشک خانواده در این نسخه نمایشی، نقطه شروع راهنمایی درباره ثبت‌نام، مرکز سلامت، نوبت و ارجاع است. این دستیار جایگزین پزشک نیست.",
        created_at: "2026-07-12T10:00:01.000Z",
        citations: [
          {
            document_id: knowledgeDocuments[0].id,
            title: knowledgeDocuments[0].title,
            section: "چیستی پزشک خانواده",
            version: "demo-1.0",
            updated_at: "2026-07-01",
          },
        ],
        safety_level: "normal",
      },
    ],
  },
];

export const initialTickets: EscalationTicket[] = [
  {
    id: "80000000-0000-4000-8000-000000000001",
    user_id: demoUser.id,
    conversation_id: initialConversations[0].id,
    reason: "اطلاعات کافی نبود",
    description: "کاربر درباره وضعیت ثبت‌نام شهرستان سوال داشت.",
    priority: "normal",
    status: "new",
    county: "بهارستان",
    health_center_id: healthCenters[0].id,
    created_at: "2026-07-10T09:00:00.000Z",
    updated_at: "2026-07-10T09:00:00.000Z",
  },
  {
    id: "80000000-0000-4000-8000-000000000002",
    user_id: demoUser.id,
    reason: "مشکل نوبت",
    description: "نوبت نمایشی در تقویم دیده نمی‌شد.",
    priority: "low",
    status: "resolved",
    county: "بهارستان",
    health_center_id: healthCenters[0].id,
    created_at: "2026-07-02T09:00:00.000Z",
    updated_at: "2026-07-03T09:00:00.000Z",
    resolved_at: "2026-07-03T09:00:00.000Z",
    resolution_note: "راهنمایی نمایشی ارسال شد.",
  },
  {
    id: "80000000-0000-4000-8000-000000000003",
    user_id: demoUser.id,
    reason: "مشکل ارجاع",
    description: "کاربر درخواست پیگیری کد ارجاع نمایشی داشت.",
    priority: "high",
    status: "assigned",
    assigned_agent_id: "90000000-0000-4000-8000-000000000001",
    county: "بهارستان",
    health_center_id: healthCenters[0].id,
    created_at: "2026-07-08T09:00:00.000Z",
    updated_at: "2026-07-09T09:00:00.000Z",
  },
];

export const supportAgents = [
  { id: "90000000-0000-4000-8000-000000000001", name: "لیلا نادری", role: "support_agent" },
  { id: "90000000-0000-4000-8000-000000000002", name: "کاوه صالحی", role: "support_agent" },
];
