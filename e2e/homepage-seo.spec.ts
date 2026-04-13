import { expect, test } from "@playwright/test";

test("homepage exposes canonical metadata and structured data", async ({ page }) => {
  await page.goto("/en", { waitUntil: "networkidle" });

  await expect(page).toHaveTitle(/Nylon Legs/);
  const canonicalHref = await page.locator('link[rel="canonical"]').getAttribute("href");
  expect(canonicalHref).toBeTruthy();
  const canonicalUrl = new URL(canonicalHref || "", "http://localhost:3000");
  expect(canonicalUrl.pathname).toBe("/en");
  expect(["localhost", "nylon-legs-manhua.lol"]).toContain(canonicalUrl.hostname);
  await expect(page.locator('link[rel="alternate"][hreflang="zh"]')).toHaveCount(1);
  await expect(page.getByAltText("Nylon Legs editorial poster")).toBeVisible();
  await expect
    .poll(async () =>
      page.getByAltText("Nylon Legs editorial poster").evaluate((image) => {
        if (!(image instanceof HTMLImageElement)) {
          return 0;
        }

        return image.naturalWidth;
      })
    )
    .toBeGreaterThan(0);

  const structuredData = await page.locator('script[type="application/ld+json"]').first().textContent();
  expect(structuredData).toContain("WebSite");
  expect(structuredData).toContain("Nylon Legs");
});

test("chapter listing stays noindex after age verification", async ({ page }) => {
  await page.goto("/en/chapters", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: /I am 18 or older/i }).click();

  await expect(page).toHaveURL(/\/en\/chapters$/);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/i);
});
