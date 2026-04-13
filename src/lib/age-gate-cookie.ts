export const AGE_GATE_COOKIE = "nl_age_verified";
const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365;

export const buildAgeGateHref = (locale: string, returnTo: string) =>
  `/${locale === "zh" ? "zh" : "en"}/18-plus?returnTo=${encodeURIComponent(
    returnTo
  )}`;

export const getAgeGateCookieMaxAge = () => ONE_YEAR_IN_SECONDS;
