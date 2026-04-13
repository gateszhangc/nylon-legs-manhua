import { ChaptersPage } from "@/components/nylon-legs/site-sections";
import { getSiteContent } from "@/content/nylon-legs/site-content";
import { requireAgeVerification } from "@/lib/age-gate";
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
    pathname: "/chapters",
    title: content.chapters.title,
    description: content.chapters.description,
    noIndex: true,
  });
}

export default async function ChaptersRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  await requireAgeVerification(locale, `/${locale}/chapters`);
  const content = getSiteContent(locale);

  return <ChaptersPage locale={locale} content={content} />;
}
