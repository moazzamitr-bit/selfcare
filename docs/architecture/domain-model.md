# Domain Model

Bounded contextهای هدف: Identity & Access، Patient & Household، Consent & Proxy، Care Team & Organization، Personal/Clinical Health Records، Questionnaire، Appointment، Medication/Orders، Diagnostic Documents، Prevention، Care Plan، Content Governance، Service Directory، Emergency Content، Campaign، Notification، Provider Registry، AI Governance و Audit/Analytics.

Foundation فقط مرز package/module و قرارداد health را می‌سازد. entity پزشکی، rule بالینی یا schema production در این milestone ایجاد نمی‌شود.

قواعد بین contextها:

- ارتباط write با command و transaction محلی؛ انتشار event از transactional outbox.
- شناسه پایدار UUID و timestamp در UTC.
- مدل UI از DTO محصول استفاده می‌کند، نه persistence model یا FHIR resource.
- identity، consent، clinical data، content و audit مالکیت داده جدا دارند.
