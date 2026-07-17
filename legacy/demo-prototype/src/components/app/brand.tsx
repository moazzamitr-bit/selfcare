import { HeartPulse, MessageCircle } from "lucide-react";

export function BrandMark() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative grid size-11 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
        <MessageCircle aria-hidden />
        <HeartPulse aria-hidden className="absolute -bottom-1 -left-1 rounded-full bg-background p-0.5 text-primary" />
      </div>
      <div className="leading-tight">
        <p className="text-base font-bold text-foreground">همراه سلامت خانواده</p>
        <p className="text-xs text-muted-foreground">نسخه نمایشی خدمات پزشک خانواده</p>
      </div>
    </div>
  );
}

