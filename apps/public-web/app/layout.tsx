import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "@selfcare/ui/styles.css";

export const metadata: Metadata = {
  title: "پرتال عمومی | همراه سلامت",
  description: "پایه امن و دسترس‌پذیر سامانه خودمراقبتی",
  robots: { index: false, follow: false },
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
