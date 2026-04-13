import { SiteContent } from "@/content/nylon-legs/site-content";
import { getSiteUrl } from "@/lib/site-url";
import { getAbsoluteLocalizedUrl } from "@/i18n/url";

const LANGUAGE_BY_LOCALE: Record<string, string> = {
  en: "en-US",
  zh: "zh-Hans",
};

export default function HomeStructuredData({
  locale,
  content,
}: {
  locale: string;
  content: SiteContent;
}) {
  const siteUrl = getSiteUrl();
  const homeUrl = getAbsoluteLocalizedUrl(siteUrl, locale, "/");
  const logoUrl = new URL("/nylon-legs/brand/logo.svg", siteUrl).toString();
  const posterUrl = new URL("/nylon-legs/brand/poster.svg", siteUrl).toString();

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${homeUrl}#website`,
        name: content.brandName,
        url: homeUrl,
        description: content.defaultDescription,
        inLanguage: LANGUAGE_BY_LOCALE[locale] || locale,
        publisher: {
          "@type": "Organization",
          name: content.brandName,
          url: siteUrl,
          logo: {
            "@type": "ImageObject",
            url: logoUrl,
          },
        },
        sameAs: content.officialLinks.map((link) => link.href),
      },
      {
        "@type": "CollectionPage",
        "@id": `${homeUrl}#webpage`,
        url: homeUrl,
        name: content.defaultTitle,
        description: content.home.description,
        isPartOf: {
          "@id": `${homeUrl}#website`,
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: posterUrl,
        },
        about: {
          "@type": "CreativeWorkSeries",
          name: content.brandName,
          alternateName: "Nylon Legs manhwa",
          author: {
            "@type": "Person",
            name: "ARROZ",
          },
          genre: ["Manhwa", "Webtoon"],
          contentRating: "19+",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
