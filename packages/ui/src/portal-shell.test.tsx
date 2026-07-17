import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { PortalShell } from "./portal-shell";

describe("PortalShell", () => {
  it("renders the portal boundary and foundation safety copy", () => {
    const html = renderToStaticMarkup(
      <PortalShell
        portalName="پرتال عمومی"
        serviceLabel="public-web"
        navigation={[{ label: "خانه", href: "/" }]}
      />,
    );
    expect(html).toContain("پرتال عمومی");
    expect(html).toContain("بدون داده پزشکی");
    expect(html).toContain('href="#main-content"');
  });
});
