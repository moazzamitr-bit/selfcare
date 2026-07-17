# Threat Model — STRIDE

| Trust boundary         | تهدیدهای اصلی               | کنترل Foundation / کنترل بعدی                                             |
| ---------------------- | --------------------------- | ------------------------------------------------------------------------- |
| Browser ↔ portal       | spoofing، XSS، CSRF         | CSP/security headers بعدی، code-native text، no auth yet                  |
| Portal ↔ API           | BOLA، tampering، replay     | DTO validation، correlation id؛ server authz و idempotency در milestone 2 |
| API ↔ IdP              | token theft/spoofing        | OIDC/PKCE، issuer/audience/nonce؛ Keycloak local only                     |
| API ↔ DB               | SQLi، elevation، disclosure | parameterized repository و least privilege؛ schema deferred               |
| API ↔ queue/outbox     | tampering، duplicate        | transaction، idempotent consumer، signed/enveloped events                 |
| API ↔ object store     | malware، URL leak           | short signed URL، MIME/size، scan hook؛ feature deferred                  |
| API ↔ FHIR/external    | SSRF، poisoning، leakage    | allowlist، adapter، mTLS/OAuth، timeout، contract test                    |
| API ↔ AI gateway/model | PHI leak، prompt injection  | disabled default، context filter، policy، no payload logs                 |
| Operator ↔ admin       | privilege abuse/repudiation | MFA، RBAC+ABAC، audit، break-glass review                                 |

تهدیدهای باز: topology production، national IdP contract، DDoS/WAF، key management و legal retention؛ همگی در assumption register/مرحله امنیتی پیگیری می‌شوند.
