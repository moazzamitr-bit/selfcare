# ADR-0004: پنج پرتال مستقل

- وضعیت: Accepted
- تاریخ: 2026-07-17

هر سطح محصول یک Next.js app مستقل با navigation و authorization boundary جداست. `packages/ui` فقط design primitive و shell را share می‌کند. این انتخاب احتمال privilege bleed و coupling صفحه‌ها را کاهش می‌دهد، در ازای هزینه build/deploy بیشتر.
