import { PortalShell } from "@selfcare/ui";

const navigation = [
  { label: "خانه", href: "/" },
  { label: "خدمات", href: "#system-status" },
  { label: "آموزش‌ها", href: "#foundation-title" },
  { label: "پرسش‌های متداول", href: "#contact" },
] as const;

export default function PublicHome() {
  return (
    <PortalShell
      portalName="پرتال عمومی"
      serviceLabel="public-web / foundation"
      navigation={navigation}
    />
  );
}
