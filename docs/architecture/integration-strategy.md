# راهبرد یکپارچه‌سازی

- هر provider بیرونی پشت port/adapter و DTO داخلی قرار می‌گیرد.
- callbackها امضاشده، idempotent، time-bound و audit شده‌اند.
- timeout، retry با backoff/jitter، circuit breaker و dead-letter برای عملیات async الزامی است.
- eventها ابتدا همراه transaction در outbox ثبت و سپس publish می‌شوند.
- contract test با fixture مصنوعی؛ PHI/PII در fixture، log یا trace ممنوع.
- OpenAPI قرارداد API اصلی است؛ versioning و deprecation مستند می‌شوند.
- integration خام FHIR، SMS، map، insurer یا identity به UI نشت نمی‌کند.
