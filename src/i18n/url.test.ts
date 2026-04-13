import { describe, expect, it } from "vitest";
import {
  buildAlternateLanguageUrls,
  getAbsoluteLocalizedUrl,
  localizePathname,
} from "./url";

describe("localized url helpers", () => {
  it("prefixes the default zh locale in public paths", () => {
    expect(localizePathname("zh", "/")).toBe("/zh");
    expect(localizePathname("zh", "/story")).toBe("/zh/story");
  });

  it("keeps english on its own prefixed path", () => {
    expect(localizePathname("en", "/")).toBe("/en");
    expect(getAbsoluteLocalizedUrl("https://nylon-legs-manhua.lol", "en", "/faq")).toBe(
      "https://nylon-legs-manhua.lol/en/faq"
    );
  });

  it("sets x-default to the chinese homepage", () => {
    const alternates = buildAlternateLanguageUrls(
      "https://nylon-legs-manhua.lol",
      "/story"
    );

    expect(alternates.zh).toBe("https://nylon-legs-manhua.lol/zh/story");
    expect(alternates.en).toBe("https://nylon-legs-manhua.lol/en/story");
    expect(alternates["x-default"]).toBe(
      "https://nylon-legs-manhua.lol/zh/story"
    );
  });
});
