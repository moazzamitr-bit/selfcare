# Clinical Safety Plan

## Gate این milestone

Foundation نباید داده بیمار، scoring، diagnosis، prescribing، dosage، medication change، contraindication یا emergency instruction داشته باشد. shellها فقط پیام آماده‌سازی و وضعیت فنی نشان می‌دهند.

## فرایند آینده

هر clinical feature باید hazard log، intended use، source/version، clinical owner، reviewer، validity، deterministic red-flag path، verification evidence و rollback/kill mechanism داشته باشد. unresolved requirement در assumption register ثبت و همان feature block می‌شود.

## تفکیک داده

patient-entered و provider-verified در مدل و UI جدا هستند؛ رکورد provider توسط بیمار overwrite نمی‌شود و correction request مستقل است. داده تست فقط مصنوعی است.

## Incident

قابلیت پرریسک با feature flag متوقف، شواهد بدون PHI حفظ، clinical owner و security notified و release پس از review انجام می‌شود.
