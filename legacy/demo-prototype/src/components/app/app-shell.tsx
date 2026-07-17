"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  CalendarDays,
  ClipboardList,
  Headphones,
  Home,
  Menu,
  MessageCircle,
  ShieldCheck,
  User,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { BrandMark } from "@/components/app/brand";
import { cn } from "@/lib/utils";

const citizenLinks = [
  { href: "/app", label: "خانه", icon: Home },
  { href: "/app/assistant", label: "دستیار", icon: MessageCircle },
  { href: "/app/doctor", label: "پزشک خانواده", icon: ShieldCheck },
  { href: "/app/health-center", label: "مرکز سلامت", icon: Users },
  { href: "/app/appointments", label: "نوبت‌ها", icon: CalendarDays },
  { href: "/app/referrals", label: "ارجاع‌ها", icon: ClipboardList },
  { href: "/app/support", label: "پشتیبانی", icon: Headphones },
  { href: "/app/profile", label: "پروفایل", icon: User },
];

export function DesktopSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden min-h-dvh w-72 shrink-0 border-l bg-card px-4 py-5 lg:block">
      <BrandMark />
      <nav className="mt-8 flex flex-col gap-1">
        {citizenLinks.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground",
                active && "bg-primary/10 text-primary",
              )}
            >
              <Icon aria-hidden />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

export function MobileBottomNav() {
  const pathname = usePathname();
  const links = citizenLinks.filter((item) =>
    ["/app", "/app/assistant", "/app/appointments", "/app/referrals", "/app/profile"].includes(item.href),
  );

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t bg-background/95 px-2 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2 shadow-lg backdrop-blur lg:hidden">
      {links.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl text-[11px] font-medium text-muted-foreground",
              active && "bg-primary/10 text-primary",
            )}
          >
            <Icon aria-hidden />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-secondary/50 text-foreground">
      <div className="mx-auto flex max-w-[1500px]">
        <DesktopSidebar />
        <div className="min-w-0 flex-1 pb-24 lg:pb-0">
          <header className="sticky top-0 z-20 flex min-h-16 items-center justify-between border-b bg-background/95 px-4 backdrop-blur md:px-6">
            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger render={<Button variant="ghost" size="icon" aria-label="باز کردن منو" />}>
                  <Menu />
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <SheetHeader>
                    <SheetTitle>منو</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <BrandMark />
                    <nav className="mt-6 flex flex-col gap-2">
                      {citizenLinks.map((item) => (
                        <Link key={item.href} href={item.href} className="flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium hover:bg-muted">
                          <item.icon aria-hidden />
                          {item.label}
                        </Link>
                      ))}
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            <div className="hidden lg:block">
              <p className="text-sm text-muted-foreground">نسخه نمایشی — اطلاعات واقعی متصل نیست</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" aria-label="اعلان‌ها">
                <Bell />
              </Button>
              <Button variant="outline" className="min-h-10 rounded-xl">
                <User data-icon="inline-start" />
                مریم رضایی
              </Button>
            </div>
          </header>
          <main className="px-4 py-5 md:px-6 lg:px-8">{children}</main>
        </div>
      </div>
      <MobileBottomNav />
    </div>
  );
}

