# راهبرد نگاشت FHIR R4

`packages/fhir` لایه anti-corruption است. مدل دامنه به adapter داده می‌شود و adapter آن را به FHIR R4 تبدیل می‌کند. raw resource هرگز prop یک UI component یا response عمومی API نیست.

منابع هدف شامل Patient، RelatedPerson، PractitionerRole، Organization، Consent، Observation، QuestionnaireResponse، CarePlan، DocumentReference، Provenance و AuditEvent هستند؛ نگاشت دقیق در feature مربوطه و پس از تأیید بالینی اضافه می‌شود.

هر نگاشت باید contract test، profile/version، terminology source، provenance و رفتار خطا داشته باشد. HAPI FHIR در Compose فقط sandbox توسعه است و source of truth محسوب نمی‌شود.
