# Container Design

| Container                | مسئولیت Foundation                             | مرز                                   |
| ------------------------ | ---------------------------------------------- | ------------------------------------- |
| پنج Next.js app          | shell مستقل، RTL، accessibility                | بدون منطق دامنه مشترک در pageها       |
| `services/api`           | health/readiness، OpenAPI پایه، correlation id | modular monolith در مراحل بعد         |
| `services/ai-gateway`    | فقط health و kill-switch state                 | هیچ مدل/RAG/داده بیمار                |
| `packages/ui`            | token و shell primitive                        | بدون page-level business logic        |
| `packages/contracts`     | health DTO و قراردادهای پایدار                 | بدون dependency به framework          |
| `packages/observability` | redaction و logger پایه                        | payload حساس ممنوع                    |
| PostgreSQL/PostGIS       | datastore آینده                                | source of truth operational           |
| Redis                    | cache/queue آینده                              | نه source of truth                    |
| Keycloak                 | IdP توسعه                                      | جایگزین‌پذیر با OIDC                  |
| MinIO                    | object storage توسعه                           | signed URL/scan hook در milestone بعد |
| HAPI FHIR                | sandbox تبادل                                  | پشت adapter، نه مدل UI                |

ارتباط‌ها در local Docker network انجام می‌شوند. readiness فقط dependencyهای ضروری همان container را گزارش می‌کند و اطلاعات اتصال را افشا نمی‌کند.
