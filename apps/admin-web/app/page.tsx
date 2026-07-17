import { PortalShell } from "@selfcare/ui";

const navigation = [
  { label: "خانه", href: "/" },
  { label: "راهبری", href: "#system-status" },
  { label: "سازمان‌ها", href: "#foundation-title" },
  { label: "حسابرسی", href: "#privacy" },
] as const;
export default function AdminHome() {
  return (
    <PortalShell
      portalName="پرتال مدیریت"
      serviceLabel="admin-web / foundation"
      navigation={navigation}
    />
  );
}
