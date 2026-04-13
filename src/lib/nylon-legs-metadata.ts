import { getSiteContent } from "@/content/nylon-legs/site-content";
import { getSiteUrl } from "@/lib/site-url";
import {
  buildAlternateLanguageUrls,
  getAbsoluteLocalizedUrl,
} from "@/i18n/url";

type MetadataInput = {
  locale: string;
  pathname: string;
  title?: string;
  description?: string;
  keywords?: string;
  noIndex?: boolean;
};

export const buildNylonLegsMetadata = ({
  locale,
  pathname,
  title,
  description,
  keywords,
  noIndex = false,
}: MetadataInput) => {
  const content = getSiteContent(locale);
  const siteUrl = getSiteUrl();
  const canonicalUrl = getAbsoluteLocalizedUrl(siteUrl, locale, pathname);
  const languages = buildAlternateLanguageUrls(siteUrl, pathname);
  const resolvedTitle = title ? `${title} | ${content.brandName}` : content.defaultTitle;
  const resolvedDescription = description || content.defaultDescription;
  const resolvedKeywords = keywords || content.defaultKeywords;
  const posterUrl = new URL("/nylon-legs/brand/poster.svg", siteUrl).toString();
  const openGraphLocale = locale === "zh" ? "zh_CN" : "en_US";
  const alternateLocale = locale === "zh" ? ["en_US"] : ["zh_CN"];

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    keywords: resolvedKeywords,
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    robots: noIndex
      ? {
          index: false,
          follow: true,
        }
      : {
          index: true,
          follow: true,
        },
    openGraph: {
      type: "website",
      url: canonicalUrl,
      title: resolvedTitle,
      description: resolvedDescription,
      siteName: content.brandName,
      locale: openGraphLocale,
      alternateLocale,
      images: [
        {
          url: posterUrl,
          alt: `${content.brandName} poster`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
      images: [posterUrl],
    },
  };
};
