import { expect, test } from "@playwright/test";

test("public foundation shell is Persian RTL and keyboard reachable", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "fa");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "پایه‌ای امن برای خدمات خودمراقبتی",
  );
  await expect(
    page.getByRole("navigation", { name: "ناوبری پرتال عمومی" }),
  ).toBeVisible();
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "رفتن به محتوای اصلی" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main-content$/);
});

test("shell has no horizontal overflow on the configured viewport", async ({
  page,
}) => {
  await page.goto("/");
  const overflow = await page.evaluate(
    () =>
      document.documentElement.scrollWidth -
      document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(1);
});
