# ADR-0003: انتخاب Drizzle برای persistence آینده

- وضعیت: Accepted for foundation; implementation deferred
- تاریخ: 2026-07-17

## تصمیم

Drizzle برای milestoneهای داده انتخاب می‌شود؛ در Foundation dependency یا schema production اضافه نمی‌شود.

## دلیل

SQL و migrationها شفاف‌تر باقی می‌مانند، Postgres/PostGIS featureها قابل کنترل‌اند و policy queryها پنهان نمی‌شوند. تیم باید query plan و migration را review کند.

## پیامد

repository/policy layer از ORM جدا می‌ماند؛ هیچ schema بالینی تا approval ایجاد نمی‌شود. rollback plan برای هر migration اجباری است.
