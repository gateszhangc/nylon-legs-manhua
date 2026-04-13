import { expect, test } from "@playwright/test";

test("root path resolves to the localized homepage", async ({ page }) => {
  const response = await page.goto("/");

  expect(response?.ok()).toBeTruthy();
  await expect(page).toHaveURL(/\/zh$/);
  await expect(page.locator("h1", { hasText: "Nylon Legs" })).toBeVisible();
  await expect(page.getByRole("link", { name: /阅读第 1 话/i })).toBeVisible();
});
