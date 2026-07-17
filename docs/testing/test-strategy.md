# Test Strategy

## Pyramid و gates

- unit: contract، redaction، policy/domain logic؛ برای policyهای حساس هدف ۸۰٪+.
- integration: persistence، authorization، outbox، adapters.
- contract: OpenAPI/FHIR/provider با fixture مصنوعی.
- e2e: journeyهای critical با desktop/mobile RTL.
- security negative: IDOR/BOLA، tenant boundary، mass assignment، log leakage.
- accessibility: axe + keyboard + visible focus + semantic review، هدف WCAG 2.2 AA.

## Foundation

`pnpm lint`، `pnpm typecheck`، `pnpm test`، `pnpm build` و `pnpm e2e` اجرا می‌شوند. smoke test باید پنج shell و دو health endpoint را بررسی کند. Docker health با `docker compose ps` و HTTP check سنجیده می‌شود.

عدم نصب Docker/browser یا سرویس خارجی به‌عنوان limitation گزارش می‌شود، نه pass.
