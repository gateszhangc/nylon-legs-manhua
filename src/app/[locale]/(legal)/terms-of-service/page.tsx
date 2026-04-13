import TermsOfServiceContent from "@/app/(legal)/terms-of-service/page.mdx";
import { getSiteUrl } from "@/lib/site-url";
import {
  buildAlternateLanguageUrls,
  getAbsoluteLocalizedUrl,
} from "@/i18n/url";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const siteUrl = getSiteUrl();
  const pathname = "/terms-of-service";

  return {
    title: "Terms of Service | Nylon Legs",
    description:
      "Read the Nylon Legs terms covering age-gated access, licensed content, and acceptable use.",
    alternates: {
      canonical: getAbsoluteLocalizedUrl(siteUrl, locale, pathname),
      languages: buildAlternateLanguageUrls(siteUrl, pathname),
    },
  };
}

export default function TermsOfServicePage() {
  return <TermsOfServiceContent />;
}
