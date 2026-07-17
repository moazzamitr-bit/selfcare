# ADR-0001: Modular Monolith

- وضعیت: Accepted
- تاریخ: 2026-07-17

## تصمیم

API اصلی یک modular monolith با bounded context و transactional outbox است. AI gateway به‌علت policy/kill-switch و جداسازی provider یک process مستقل، اما در همان monorepo است.

## پیامد

transaction و توسعه ساده‌تر می‌ماند؛ استخراج سرویس فقط با شواهد مقیاس/مالکیت/ریسک انجام می‌شود. import boundary و قرارداد moduleها باید enforce شود.
