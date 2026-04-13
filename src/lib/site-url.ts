const DEFAULT_SITE_URL = "https://nylon-legs-manhua.lol";

const stripTrailingSlash = (value: string) => value.replace(/\/+$/, "");

const normalizeSiteUrl = (value: string) => {
  const normalized = value.startsWith("http") ? value : `https://${value}`;
  const url = new URL(normalized);

  return stripTrailingSlash(url.toString());
};

export const getSiteUrl = () => {
  const envUrl =
    process.env.NEXT_PUBLIC_WEB_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_VERCEL_URL ||
    process.env.VERCEL_URL ||
    DEFAULT_SITE_URL;

  return normalizeSiteUrl(envUrl);
};
