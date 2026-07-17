# ADR-0002: pnpm Workspace + Turborepo

- وضعیت: Accepted
- تاریخ: 2026-07-17

## تصمیم

پنج web app، دو service و packageهای مشترک با pnpm workspace مدیریت و taskها با Turborepo اجرا می‌شوند.

## پیامد

مرز deploy و navigation مستقل حفظ و build/test قابل cache می‌شود. page-level logic بین appها share نمی‌شود؛ فقط primitive و contract مشترک است.
