import { PortalShell } from "@selfcare/ui";

const navigation = [
  { label: "خانه", href: "/" },
  { label: "سازمان من", href: "#system-status" },
  { label: "درخواست‌ها", href: "#foundation-title" },
  { label: "راهنما", href: "#contact" },
] as const;
export default function ProviderHome() {
  return (
    <PortalShell
      portalName="پرتال ارائه‌دهنده"
      serviceLabel="provider-web / foundation"
      navigation={navigation}
    />
  );
}
