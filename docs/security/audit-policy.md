# Audit Policy

رویدادهای اجباری آینده: login/session changes، sensitive reads، همه sensitive writes، consent/proxy، export/correction، role/policy change، content approval، break-glass، AI policy decision و kill-switch.

حداقل metadata: event UUID، actor/service، action، target class+opaque id، organization، purpose، policy result، UTC timestamp، correlation id و provenance. payload بالینی و token ثبت نمی‌شود. ذخیره باید append-only/tamper-evident، access-controlled و با retention مصوب باشد.

Foundation logger redaction و correlation id را فراهم می‌کند؛ durable audit store تا milestone 2 پیاده‌سازی نمی‌شود.
