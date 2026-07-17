import { AppShell } from "@/components/app/app-shell";

export default function CitizenLayout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}

