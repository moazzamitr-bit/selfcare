# سامانه خودمراقبتی «همراه سلامت» — Foundation

پایه production-oriented فارسی RTL برای پنج پرتال مستقل، API modular-monolith و AI gateway ایمن. این milestone عمداً هیچ منطق پزشکی، پرسشنامه، پرونده سلامت یا قابلیت مولد AI ندارد.

## پیش‌نیاز

- Node.js 24+
- pnpm 11.9.0
- Docker Desktop/Engine با Compose (اختیاری برای زیرساخت local)

## اجرا

```bash
pnpm install --frozen-lockfile
cp .env.example .env
pnpm dev
```

پورت‌ها: public `3000`، member `3001`، care team `3002`، admin `3003`، provider `3004`، API `4000` و AI gateway `4100`.

## بررسی کیفیت

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm test:integration
pnpm build
pnpm exec playwright install chromium
pnpm e2e
```

## زیرساخت local

```bash
docker compose --env-file .env -f infra/docker/compose.yml up -d
docker compose -f infra/docker/compose.yml ps
```

PostGIS `5432`، Redis `6379`، Keycloak `8080`، MinIO API `9002`/console `9001`، HAPI FHIR R4 `8090` و OTLP `4317/4318`.

## Health و OpenAPI

- API: `http://localhost:4000/health/live`، `/health/ready` و `/openapi`
- AI gateway: `http://localhost:4100/health/live` و `/health/ready`؛ AI به‌صورت پیش‌فرض و در این milestone غیرفعال است.

## ساختار و اسناد

درخت هدف در `docs/product/scope-and-phases.md` و تصمیم‌ها در `docs/adr/` است. نمونه تک‌اپ قبلی بدون حذف در `legacy/demo-prototype/` نگهداری شده و بخشی از build جدید نیست.
