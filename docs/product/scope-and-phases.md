# دامنه و مراحل

## Milestone 0 — Assessment و تصمیم‌ها

اسناد پایه، assumption register، ADRها، درخت هدف و سیاست وابستگی.

## Milestone 1 — Foundation (این تغییر)

workspace، app shellها، API health، AI gateway health-only، زیرساخت local، CI، logging/redaction و smoke test.

## Milestone 2 — Identity/Authorization/Audit

OIDC، RBAC+ABAC، consent/proxy، audit outbox و تست IDOR/BOLA. شروع آن منوط به threat-model review است.

## Milestone 3 تا 7

public/content، member، care team، AI v1 و hardening مطابق PRD مادر. هر مرحله gate مستقل clinical safety و security دارد.

## درخت هدف

```text
apps/{public-web,member-web,care-team-web,admin-web,provider-web}
services/{api,ai-gateway}
packages/{ui,contracts,domain,fhir,authz,observability,config}
infra/{docker,monitoring}
docs/{product,architecture,adr,clinical,security,testing,operations}
legacy/demo-prototype
```
