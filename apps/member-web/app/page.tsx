import { PortalShell } from "@selfcare/ui";

const navigation = [
  { label: "خانه", href: "/" },
  { label: "کارهای امروز", href: "#system-status" },
  { label: "تیم سلامت", href: "#foundation-title" },
  { label: "پرونده من", href: "#privacy" },
] as const;
export default function MemberHome() {
  return (
    <PortalShell
      portalName="پرتال خدمت‌گیرنده"
      serviceLabel="member-web / foundation"
      navigation={navigation}
    />
  );
}
