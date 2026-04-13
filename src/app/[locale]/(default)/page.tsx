import { HomePage } from "@/components/nylon-legs/site-sections";
import { getSiteContent } from "@/content/nylon-legs/site-content";
import { buildNylonLegsMetadata } from "@/lib/nylon-legs-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const content = getSiteContent(locale);

  return buildNylonLegsMetadata({
    locale,
    pathname: "/",
    description: content.defaultDescription,
    keywords: content.defaultKeywords,
  });
}

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const content = getSiteContent(locale);

  return <HomePage locale={locale} content={content} />;
}
