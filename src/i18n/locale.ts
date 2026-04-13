export const locales = ["en", "zh"] as string[];

export const defaultLocale = "zh";
// All app pages live under the [locale] segment, so the default locale must
// stay prefixed as well. Using "as-needed" caused / -> /en rewrites to fight
// with /en -> / canonical redirects and produced a 404 homepage.
export const localePrefix = "always";
export const localeDetection = false;
export const localeSwitcherEnabled = false;

export const localeCookieName = "NEXT_LOCALE";
export const localeCookie = {
  name: localeCookieName,
  maxAge: 60 * 60 * 24 * 365, // 1 year
};

export const localeNames: Record<string, string> = {
  en: "English",
  zh: "简体中文",
};

export const rtlLocales: string[] = [];

export const localeToFileLocale: Record<string, string> = {
  zh: "zh-cn",
  "zh-Hant": "zh-tw",
};

const localeAliases: Record<string, string> = {
  en: "en",
  "en-us": "en",
  "en-gb": "en",
  zh: "zh",
  "zh-cn": "zh",
  "zh-sg": "zh",
  "zh-hans": "zh",
  "zh-hant": "zh-Hant",
  "zh-tw": "zh-Hant",
  "zh-hk": "zh-Hant",
  "zh-mo": "zh-Hant",
};

export const countryToLocaleMap: Record<string, string> = {
  CN: "zh",
  SG: "zh",
  US: "en",
  GB: "en",
};

export const isSupportedLocale = (value: string): boolean =>
  (locales as readonly string[]).includes(value);

export const normalizeLocale = (value?: string | null): string | null => {
  if (!value) {
    return null;
  }

  const normalized = value.replace(/_/g, "-").trim();
  if (!normalized) {
    return null;
  }

  if (isSupportedLocale(normalized)) {
    return normalized;
  }

  const lower = normalized.toLowerCase();
  if (localeAliases[lower]) {
    return localeAliases[lower];
  }

  for (const locale of locales) {
    if (locale.toLowerCase() === lower) {
      return locale;
    }
  }

  const base = lower.split("-")[0];
  for (const locale of locales) {
    if (locale.toLowerCase() === base) {
      return locale;
    }
  }

  return null;
};

export const toFileLocale = (locale?: string | null): string => {
  const normalized = normalizeLocale(locale) ?? defaultLocale;
  return localeToFileLocale[normalized] ?? normalized.toLowerCase();
};

export const resolveLocaleFromCountry = (country?: string | null): string => {
  const key = (country || "").trim().toUpperCase();
  if (!key) {
    return defaultLocale;
  }
  return countryToLocaleMap[key] ?? defaultLocale;
};
