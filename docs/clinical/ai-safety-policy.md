# AI Safety Policy

AI در Foundation پیاده‌سازی نشده و global kill switch به‌صورت پیش‌فرض فعال (disabled) است. `ai-gateway` فقط health metadata غیرحساس می‌دهد.

برای فعال‌سازی آینده: retrieval فقط approved/current content؛ context حداقلی با consent؛ منع prompt/output حاوی PHI در log؛ جدایی read/write tool؛ confirmation و policy check برای write؛ output validator و citation؛ مسیر deterministic برای emergency/self-harm/pregnancy risk/medication؛ regression evaluation و قابلیت shutdown فوری.

خروجی LLM هرگز مستقیماً clinical record را mutate نمی‌کند و پاسخ پزشکی بدون منبع معتبر منتشر نمی‌شود.
