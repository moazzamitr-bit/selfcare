import Link from "next/link";
import { BrandMark } from "@/components/app/brand";

const adminLinks = [
  ["/admin", "داشبورد"],
  ["/admin/documents", "اسناد"],
  ["/admin/knowledge-chunks", "برش‌های دانش"],
  ["/admin/questions", "آزمون پاسخ"],
  ["/admin/escalations", "ارجاع‌ها"],
  ["/admin/conversations", "گفت‌وگوها"],
  ["/admin/response-reviews", "بازبینی پاسخ"],
  ["/admin/analytics", "تحلیل‌ها"],
  ["/admin/users", "کاربران"],
  ["/admin/settings", "تنظیمات"],
  ["/admin/audit-logs", "لاگ‌ها"],
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-secondary/50">
      <div className="mx-auto grid max-w-[1500px] gap-0 lg:grid-cols-[280px_1fr]">
        <aside className="border-l bg-card p-4">
          <BrandMark />
          <nav className="mt-6 grid gap-1">
            {adminLinks.map(([href, label]) => (
              <Link key={href} href={href} className="rounded-xl px-3 py-2 text-sm hover:bg-muted">{label}</Link>
            ))}
          </nav>
        </aside>
        <main className="min-w-0 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}

