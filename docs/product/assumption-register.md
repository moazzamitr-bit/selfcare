# دفتر فرضیات و تصمیم‌های باز

| ID    | موضوع                    | safe default فعلی                                                           | مالک تصمیم           | اثر/Blocker                      |
| ----- | ------------------------ | --------------------------------------------------------------------------- | -------------------- | -------------------------------- |
| A-001 | مالک حقوقی/کنترل‌گر داده | نامشخص؛ هیچ داده واقعی پردازش نشود                                          | حقوقی/حریم خصوصی     | تمام featureهای دارای داده واقعی |
| A-002 | ارائه‌دهنده هویت ملی     | adapter مبتنی بر OIDC؛ Keycloak فقط local                                   | امنیت/هویت           | ورود production                  |
| A-003 | شماره و متن اورژانس      | مقداردهی نشده و در UI نمایش داده نمی‌شود                                    | راهبری بالینی        | صفحه/مسیر اورژانس                |
| A-004 | پرسشنامه و scoring       | هیچ قاعده‌ای وجود ندارد                                                     | مالک بالینی          | questionnaire/screening          |
| A-005 | retention و legal hold   | فقط interface/documentation؛ بدون policy اجرایی                             | حقوقی/امنیت          | ذخیره داده حساس                  |
| A-006 | محل میزبانی و اقامت داده | نامشخص                                                                      | زیرساخت/حقوقی        | production deployment            |
| A-007 | MFA policy               | برای privileged roles اجباری؛ جزئیات IdP باز                                | امنیت                | پنل‌های حرفه‌ای production       |
| A-008 | نقشه و پیامک             | port/adapter؛ provider انتخاب نشده                                          | محصول/تدارکات        | integration واقعی                |
| A-009 | HAPI FHIR                | local integration sandbox؛ source of truth نیست                             | معماری/بالینی        | تبادل داده واقعی                 |
| A-010 | telemetry backend        | OTLP اختیاری و بدون PHI                                                     | SRE/امنیت            | dashboard production             |
| A-011 | نام و هویت بصری نهایی    | «همراه سلامت» نام کاری است                                                  | محصول/حقوقی          | انتشار عمومی                     |
| A-012 | سطح انطباق محلی          | OWASP ASVS L2 baseline؛ الزامات ملی نیازمند review                          | حقوقی/امنیت          | production launch                |
| A-013 | object storage تولید     | MinIO فقط local با آخرین security release متن‌باز؛ مخزن در ۲۰۲۶ archive شده | معماری/امنیت/تدارکات | file storage production          |

هر فرض بالینی یا حقوقی حل‌نشده فقط feature وابسته را متوقف می‌کند. Foundation با داده مصنوعی و بدون منطق پزشکی مجاز است.
