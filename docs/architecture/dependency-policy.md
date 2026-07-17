# سیاست وابستگی‌ها

نسخه‌ها در root/workspace به‌صورت exact pin می‌شوند؛ lockfile در repository نگهداری می‌شود. فقط release پایدار مجاز است و alpha/beta/canary ممنوع است.

Baseline بررسی‌شده در ۱۷ ژوئیه ۲۰۲۶: Node 24 LTS-compatible runtime، pnpm 11.9.0، Next.js 16.2.10، React 19.2.7، Turborepo 2.10.5، NestJS 11.1.28، TypeScript 6.0.3 (جدیدترین نسخه سازگار با typescript-eslint 8.64)، ESLint 9.39.5، Vitest 4.1.10 و Playwright 1.61.1.

ارتقا باید changelog/security advisory، docs نسخه نصب‌شده، migration/codemod، build و e2e را پوشش دهد. Renovate/Dependabot در آینده PR می‌سازد؛ merge خودکار برای runtime، auth، crypto، database و clinical integration مجاز نیست. SBOM و license scan جزو hardening است.
