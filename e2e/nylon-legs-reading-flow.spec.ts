import { expect, test } from "@playwright/test";

test("language switch and chapter age gate flow work", async ({ page }) => {
  await page.goto("/zh", { waitUntil: "networkidle" });

  await page.getByRole("link", { name: "EN" }).click();
  await expect(page).toHaveURL(/\/en$/);
  await expect(page.getByRole("link", { name: /Read Chapter 1/i })).toBeVisible();

  await page.goto("/zh", { waitUntil: "networkidle" });
  await expect(page.getByRole("link", { name: /阅读第 1 话/i })).toBeVisible();

  await page.goto("/zh/chapters", { waitUntil: "networkidle" });
  await expect(page).toHaveURL(/\/zh\/18-plus\?returnTo=/);
  await expect(
    page.getByRole("heading", { name: /成人向章节访问确认/i })
  ).toBeVisible();

  await page.getByRole("button", { name: /我已满 18 岁/i }).click();
  await expect(page).toHaveURL(/\/zh\/chapters$/);
  await expect(page.getByRole("heading", { name: /章节/i })).toBeVisible();

  await page.goto("/zh/chapters/episode-1", { waitUntil: "domcontentloaded" });
  await expect(page).toHaveURL(/\/zh\/chapters\/episode-1$/);
  await expect(page.getByRole("heading", { name: /第 1 话/i })).toBeVisible();

  const chapterImages = page.locator("img[alt^='第 1 话 page']");
  await expect(chapterImages).toHaveCount(2);
  await expect(chapterImages.first()).toBeVisible();
});

test("legacy marketing routes redirect into the new information architecture", async ({
  page,
}) => {
  await page.goto("/en/pricing", { waitUntil: "networkidle" });
  await expect(page).toHaveURL(/\/en\/story$/);

  await page.goto("/en/posts", { waitUntil: "networkidle" });
  await expect(page).toHaveURL(/\/en\/guides$/);
});
