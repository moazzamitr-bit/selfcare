# Operations Runbook — Local Foundation

## شروع سریع

```bash
corepack enable
pnpm install --frozen-lockfile
cp .env.example .env
pnpm dev
```

زیرساخت: `docker compose --env-file .env -f infra/docker/compose.yml up -d` و مشاهده وضعیت با `docker compose -f infra/docker/compose.yml ps`.

## Health

API: `GET /health/live` و `GET /health/ready` روی پورت 4000. AI gateway: همان مسیرها روی 4100. پاسخ نباید secret، hostname داخلی یا stack trace داشته باشد.

## Incident پایه

AI kill switch را disabled نگه دارید؛ سرویس ناسالم را از traffic خارج کنید؛ correlation id و زمان UTC را ثبت کنید؛ log حساس را کپی نکنید؛ مالک امنیت/بالینی را بر اساس نوع incident درگیر کنید.

## Backup/restore

در Foundation داده production وجود ندارد. پیش از اولین persistence feature باید RPO/RTO، encrypted backup، restore drill و evidence تعریف شود.
