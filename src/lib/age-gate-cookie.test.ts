import { describe, expect, it } from "vitest";
import {
  AGE_GATE_COOKIE,
  buildAgeGateHref,
  getAgeGateCookieMaxAge,
} from "./age-gate-cookie";

describe("age gate cookie helpers", () => {
  it("builds a locale-safe age gate path", () => {
    expect(buildAgeGateHref("en", "/en/chapters")).toBe(
      "/en/18-plus?returnTo=%2Fen%2Fchapters"
    );
    expect(buildAgeGateHref("zh", "/zh/chapters/episode-1")).toBe(
      "/zh/18-plus?returnTo=%2Fzh%2Fchapters%2Fepisode-1"
    );
  });

  it("uses a stable cookie name and ttl", () => {
    expect(AGE_GATE_COOKIE).toBe("nl_age_verified");
    expect(getAgeGateCookieMaxAge()).toBe(60 * 60 * 24 * 365);
  });
});
