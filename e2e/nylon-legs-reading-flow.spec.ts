import { expect, test } from "@playwright/test";

const chapterOneExternalUrl = "https://sbti-test.lat";
const ageGateCookieName = "nl_age_verified";

test("language switch and chapter age gate flow work", async ({ page, baseURL }) => {
  await page.goto("/zh", { waitUntil: "networkidle" });

  await page.getByRole("link", { name: "EN" }).click();
  await expect(page).toHaveURL(/\/en$/);
  const englishHeroCta = page.getByRole("link", { name: /Read Chapter 1/i });
  await expect(englishHeroCta).toBeVisible();
  await expect(englishHeroCta).toHaveAttribute("href", chapterOneExternalUrl);
  await expect(englishHeroCta).toHaveAttribute("target", "_blank");
  await expect(englishHeroCta).toHaveAttribute("rel", "noreferrer");

  await page.goto("/zh", { waitUntil: "networkidle" });
  const chineseHeroCta = page.getByRole("link", { name: /阅读第 1 话/i });
  await expect(chineseHeroCta).toBeVisible();
  await expect(chineseHeroCta).toHaveAttribute("href", chapterOneExternalUrl);
  await expect(chineseHeroCta).toHaveAttribute("target", "_blank");
  await expect(chineseHeroCta).toHaveAttribute("rel", "noreferrer");

  const [chapterOnePopup] = await Promise.all([
    page.waitForEvent("popup"),
    chineseHeroCta.click(),
  ]);
  await chapterOnePopup.waitForURL(/^https:\/\/sbti-test\.lat\/?/, {
    timeout: 45_000,
  });
  await chapterOnePopup.close();

  await page.goto("/zh/chapters", { waitUntil: "domcontentloaded" });
  await expect(page).toHaveURL(/\/zh\/18-plus\?returnTo=/);
  await expect(
    page.getByRole("heading", { name: /成人向章节访问确认/i })
  ).toBeVisible();
  await expect(page.getByRole("button", { name: /我已满 18 岁/i })).toBeVisible();

  await page.context().addCookies([
    {
      name: ageGateCookieName,
      value: "1",
      url: baseURL ?? "http://localhost:3002",
    },
  ]);
  await page.goto("/zh/chapters", { waitUntil: "domcontentloaded" });
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
