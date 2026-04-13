import { describe, expect, it } from "vitest";
import {
  getAllChapterSlugs,
  getAllGuideSlugs,
  getChapter,
  getChapterPagePath,
  getGuide,
  getSiteContent,
} from "./site-content";

describe("nylon legs site content", () => {
  it("serves english by default and chinese explicitly", () => {
    expect(getSiteContent("en").locale).toBe("en");
    expect(getSiteContent("zh").locale).toBe("zh");
    expect(getSiteContent(undefined).locale).toBe("en");
  });

  it("keeps chapter slugs shared across locales", () => {
    const englishSlugs = getAllChapterSlugs();
    expect(englishSlugs).toHaveLength(6);
    expect(getChapter("zh", englishSlugs[0])?.title).toBe("第 1 话");
  });

  it("builds stable reader page urls", () => {
    expect(getChapterPagePath("en", "episode-1", 1)).toBe(
      "/api/reader-page/en/episode-1/1"
    );
    expect(getChapterPagePath("zh", "episode-6", 2)).toBe(
      "/api/reader-page/zh/episode-6/2"
    );
  });

  it("exposes guides for both locales", () => {
    const guideSlug = getAllGuideSlugs()[0];
    expect(getGuide("en", guideSlug)?.slug).toBe(guideSlug);
    expect(getGuide("zh", guideSlug)?.slug).toBe(guideSlug);
  });
});
