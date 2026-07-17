import { PortalShell } from "@selfcare/ui";

const navigation = [
  { label: "خانه", href: "/" },
  { label: "صف کار", href: "#system-status" },
  { label: "پیگیری‌ها", href: "#foundation-title" },
  { label: "گزارش پایه", href: "#contact" },
] as const;
export default function CareTeamHome() {
  return (
    <PortalShell
      portalName="پرتال تیم سلامت"
      serviceLabel="care-team-web / foundation"
      navigation={navigation}
    />
  );
}
