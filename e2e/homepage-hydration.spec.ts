import { expect, test } from "@playwright/test";

test("homepage hydrates without missing next chunks", async ({ page }) => {
  const missingChunkRequests: string[] = [];

  page.on("response", (response) => {
    if (
      response.status() === 404 &&
      response.url().includes("/_next/static/chunks/")
    ) {
      missingChunkRequests.push(response.url());
    }
  });

  const response = await page.goto("/zh", { waitUntil: "networkidle" });

  expect(response?.ok()).toBeTruthy();

  await expect(page.locator("h1", { hasText: "Nylon Legs" })).toBeVisible();
  await page.goto("/zh/story", { waitUntil: "networkidle" });
  await expect(page).toHaveURL(/\/zh\/story$/);
  await expect(page.getByRole("heading", { name: /剧情/i })).toBeVisible();

  expect(missingChunkRequests).toEqual([]);
});
