import { expect, test } from "@playwright/test";

const chapterOneExternalUrl = "https://sbti-test.lat";

test("root path resolves to the localized homepage", async ({ page }) => {
  const response = await page.goto("/");
  const heroCta = page.getByRole("link", { name: /阅读第 1 话/i });

  expect(response?.ok()).toBeTruthy();
  await expect(page).toHaveURL(/\/zh$/);
  await expect(page.locator("h1", { hasText: "Nylon Legs" })).toBeVisible();
  await expect(heroCta).toBeVisible();
  await expect(heroCta).toHaveAttribute("href", chapterOneExternalUrl);
  await expect(heroCta).toHaveAttribute("target", "_blank");
  await expect(heroCta).toHaveAttribute("rel", "noreferrer");
});
